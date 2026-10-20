"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { isSensitivePath, outboundFilterSnippet } from "@/lib/sensitive-routes";
import { AnalyticsGuard } from "@/components/AnalyticsGuard";

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

  // På känsliga vyer renderas ingen tagg alls – varken GA4, Ads eller Plausible.
  // AnalyticsGuard täcker fallet att taggen redan laddats på en tidigare sida.
  if (sensitive) return <AnalyticsGuard pathname={pathname} />;

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
  if (localStorage.getItem('cookie-consent-v2') === 'granted') {
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
