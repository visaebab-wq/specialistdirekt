"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { isSensitivePath, outboundFilterSnippet } from "@/lib/sensitive-routes";
import { AnalyticsGuard } from "@/components/AnalyticsGuard";
import {
  clearLegacyBookingEventMarkers,
  CONSENT_BROADCAST_CHANNEL,
  CONSENT_CHANGE_EVENT,
  CONSENT_KEY,
  CONSENT_SYNC_EVENT,
  readAnalyticsConsent,
} from "@/lib/analytics-consent";

// Webbanalys. Två alternativ stöds:
//  - Google Analytics 4 (site.gaMeasurementId) – sätter cookies.
//  - Plausible (NEXT_PUBLIC_PLAUSIBLE_DOMAIN) – cookiefritt, ingen banner krävs.
//
// KOMPONENTEN ÄR EN KLIENTKOMPONENT ENBART för att kunna läsa sökvägen och
// avstå från att rendera taggen på token-bärande bokningsvyer. Den gör inget
// annat klientarbete, och sidorna fortsätter förrenderas statiskt.
//
// VARFÖR INTE consent=denied ELLER send_page_view=false I STÄLLET:
// Google-taggen skickar ändå anrop i alla samtyckeslägen – uppmätt lokalt: även
// med samtycke nekat gick två collect-anrop iväg, båda med hela sidadressen och
// därmed bokningsnyckeln. Det enda som håller är att taggen aldrig laddas på de
// vyerna. Att rensa URL:en efteråt hjälper inte heller: då har anropet redan gått.
export function Analytics() {
  const pathname = usePathname();
  const sensitive = isSensitivePath(pathname);
  // SSR och den första hydreringsrenderingen är alltid avstängda. Först ett
  // verifierat, uttryckligt "granted" i webbläsaren får montera tredjepartstaggar.
  const [consented, setConsented] = useState(false);
  const analyticsWasActive = useRef(false);

  useEffect(() => {
    if (consented) analyticsWasActive.current = true;
  }, [consented]);

  useEffect(() => {
    clearLegacyBookingEventMarkers();
    setConsented(readAnalyticsConsent() === "granted");

    const notifyQueuedEvents = (value: "granted" | "denied") => {
      // `storage` skickas bara till andra flikar. Spegla därför det effektiva
      // valet som en lokal händelse så att konverteringar som väntar i den här
      // fliken kan starta eller avbrytas direkt.
      window.dispatchEvent(new CustomEvent(CONSENT_SYNC_EVENT, { detail: value }));
    };

    const applyConsent = (forceDenied = false, notifyLocal = false) => {
      if (!forceDenied && readAnalyticsConsent() === "granted") {
        // Viktigt även mellan flikar: Next kan ha deduplicerat ett redan laddat
        // Script, så en remontering ensam garanterar inte att gtag lämnar denied.
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "denied",
        });
        setConsented(true);
        if (notifyLocal) notifyQueuedEvents("granted");
        return;
      }

      // En tagg som redan har körts kan inte göras ogjord genom att bara ta
      // bort dess <script>-element. Stoppa Google omedelbart och ladda sedan om
      // dokumentet; nästa dokument monterar varken Google eller Plausible.
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      setConsented(false);
      if (notifyLocal) notifyQueuedEvents("denied");
      if (analyticsWasActive.current) {
        analyticsWasActive.current = false;
        window.location.reload();
      }
    };

    const onConsentChange = (event: Event) => {
      // Ett uttryckligt avslag gäller även om webbläsaren vägrade skriva om
      // localStorage. Ett "granted" accepteras däremot bara om det kan läsas
      // tillbaka ur den versionerade samtyckesnyckeln.
      const denied = (event as CustomEvent<unknown>).detail === "denied";
      applyConsent(denied);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) applyConsent(false, true);
    };
    const onBroadcast = (event: MessageEvent<unknown>) => {
      applyConsent(event.data === "denied", true);
    };
    const recheckConsent = () => applyConsent(false, true);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") applyConsent(false, true);
    };

    let consentChannel: BroadcastChannel | null = null;
    try {
      consentChannel = new BroadcastChannel(CONSENT_BROADCAST_CHANNEL);
      consentChannel.addEventListener("message", onBroadcast);
    } catch {
      // Fokus/visibility-kontrollerna nedan är fail-closed reservväg.
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", recheckConsent);
    window.addEventListener("pageshow", recheckConsent);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", recheckConsent);
      window.removeEventListener("pageshow", recheckConsent);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      consentChannel?.removeEventListener("message", onBroadcast);
      consentChannel?.close();
    };
  }, []);

  // På känsliga vyer renderas ingen tagg alls – varken GA4, Ads eller Plausible.
  // AnalyticsGuard täcker fallet att taggen redan laddats på en tidigare sida.
  if (sensitive) return <AnalyticsGuard pathname={pathname} />;

  // Basic consent mode: utan ett uttryckligt ja laddas inget Google- eller
  // Plausible-skript alls och därmed skickas inte heller cookieless-pingar.
  if (!consented) return null;

  const ga = site.gaMeasurementId;
  const ads = site.adsConversionId;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`// Utgångsfiltret FÖRST: inget gtag('config') – och därmed inget anrop –
// kan ske innan det är installerat. Se sensitive-routes.ts.
${outboundFilterSnippet()}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
// Consent Mode v2: allt nekat som standard tills besökaren samtycker (GDPR).
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
// Återställ tidigare val direkt (om besökaren redan samtyckt).
//
// ad_personalization förblir 'denied' ÄVEN vid samtycke. Samtycket gäller
// mätning – att se vilka annonser som leder till en bokningsförfrågan – inte
// personaliserad annonsering eller remarketing. ad_user_data krävs för
// konverteringsmätningen; ad_personalization gör det inte.
//
// Nyckeln är versionerad: den som samtyckte till den tidigare bannern (som bara
// nämnde besöksstatistik) har inte samtyckt till annonsmätning och måste
// tillfrågas igen. Byt nyckel igen om omfattningen ändras.
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'denied'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${ga}');${
              ads
                ? `
// Google Ads-taggen laddas vid sidan av GA4 på samma gtag.js. Den behövs för att
// konverteringen ska kunna knytas till annonsklicket (och för att _gcl_aw ska
// sättas när ad_storage är beviljat).
// allow_ad_personalization_signals: false – vi mäter resultat, vi bygger inga
// målgrupper. Samma sak som consent-signalen ad_personalization: 'denied' säger,
// satt även här så att det inte hänger på en enda inställning.
gtag('config', '${ads}', { allow_ad_personalization_signals: false });`
                : ""
            }`}
          </Script>
        </>
      )}

      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
