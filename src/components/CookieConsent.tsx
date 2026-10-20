"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// GDPR-cookiebanner med Google Consent Mode v2.
//
// Vad samtycket omfattar: besöksstatistik OCH mätning av annonser – alltså att
// se vilka Google-annonser som leder till en bokningsförfrågan. Det omfattar
// INTE personaliserad annonsering eller remarketing: `ad_personalization`
// lämnas nekad även efter samtycke (se Analytics.tsx). Ändras omfattningen
// måste bannerns text, integritetspolicyn och CONSENT_KEY uppdateras – annars
// är samtycket inte informerat.
//
// Bannern följer PTS vägledning: inget är förvalt, och "Neka" är exakt lika
// lätt att klicka som "Acceptera" (samma storlek, samma placering, samma vikt).
// Valet går att ändra i efterhand via "Cookie-inställningar" i sidfoten.

type GtagFn = (...args: unknown[]) => void;

/** Versionerad – höjs när samtyckets omfattning ändras, så alla tillfrågas på nytt. */
export const CONSENT_KEY = "cookie-consent-v2";

/** Sidfoten skickar det här för att öppna bannern igen. */
export const CONSENT_REOPEN_EVENT = "specialistdirekt:cookie-settings";

function updateConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (!gtag) return;
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    // Aldrig personaliserad annonsering – varken före eller efter samtycke.
    ad_personalization: "denied",
  });
}

export function CookieConsent() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
    } catch {
      // localStorage otillgängligt – visa inte bannern.
    }
    const reopen = () => setShow(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  function choose(granted: boolean) {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    updateConsent(granted);
    setShow(false);
  }

  if (!show) return null;

  const button =
    "w-full rounded-full border px-5 py-2 text-sm font-semibold transition-colors sm:w-auto";

  return (
    <div
      role="dialog"
      aria-label={english ? "Cookie consent" : "Cookie-samtycke"}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-ink-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-700">
          {english
            ? "In addition to necessary cookies, we would like to use cookies for visitor statistics and to measure which ads lead to an appointment request. We do not use them for personalised advertising or remarketing. You can change your choice at any time. "
            : "Utöver nödvändiga cookies vill vi använda cookies för besöksstatistik och för att mäta vilka av våra annonser som leder till en bokningsförfrågan. Vi använder dem inte för personanpassad annonsering eller remarketing. Du väljer själv, och kan ändra dig när som helst. "}
          <Link href="/integritetspolicy" hrefLang="sv" className="font-medium text-brand-700 underline">
            {english ? "Read the privacy policy (in Swedish)" : "Läs mer i integritetspolicyn"}
          </Link>
          .
        </p>
        {/* Lika lätt att neka som att acceptera – samma storlek och vikt. */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => choose(false)}
            className={`${button} border-ink-300 bg-white text-ink-800 hover:border-ink-400`}
          >
            {english ? "Reject" : "Neka"}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className={`${button} border-ink-300 bg-white text-ink-800 hover:border-ink-400`}
          >
            {english ? "Accept" : "Acceptera"}
          </button>
        </div>
      </div>
    </div>
  );
}
