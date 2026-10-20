"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_REOPEN_EVENT,
  CONSENT_RETURN_FOCUS_KEY,
  CONSENT_SYNC_EVENT,
  persistAnalyticsConsent,
  readAnalyticsConsent,
  readAnalyticsConsentCookie,
  withdrawAnalyticsConsent,
} from "@/lib/analytics-consent";

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

export function CookieConsent() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const [show, setShow] = useState(false);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    let reopenAfterReload = false;
    try {
      reopenAfterReload = sessionStorage.getItem(CONSENT_RETURN_FOCUS_KEY) === "1";
      if (reopenAfterReload) {
        returnFocusRef.current = document.querySelector<HTMLElement>(
          "[data-cookie-settings-button]",
        );
      }
    } catch {
      /* Fokusmarkören är en förbättring, inte ett villkor för dialogen. */
    }

    const storedConsent = readAnalyticsConsent();
    if (storedConsent === null) {
      // Ett saknat eller ogiltigt localStorage-värde får aldrig lämna kvar en
      // äldre granted-cookie eller Google-cookies som kan fortsätta mätningen.
      withdrawAnalyticsConsent();
    } else if (storedConsent === "denied" && readAnalyticsConsentCookie() !== "denied") {
      // Reparera en saknad/motstridig servercookie efter ett nej, men skriv
      // aldrig om ett giltigt ja här – då skulle 12-månadersgränsen börja om.
      persistAnalyticsConsent("denied");
    }
    if (storedConsent === null || reopenAfterReload) setShow(true);

    const reopen = (event: Event) => {
      const target = (event as CustomEvent<{ returnFocusTo?: HTMLElement }>).detail
        ?.returnFocusTo;
      if (target instanceof HTMLElement) returnFocusRef.current = target;
      setShow(true);
    };
    const syncExternalChoice = () => {
      // Analytics har redan läst tillbaka både localStorage och servercookien
      // innan SYNC skickas. Stäng en gammal banner efter ett val i en annan
      // flik; visa den igen när valet i stället har återkallats helt.
      setShow(readAnalyticsConsent() === null);
    };
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    window.addEventListener(CONSENT_SYNC_EVENT, syncExternalChoice);
    return () => {
      window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
      window.removeEventListener(CONSENT_SYNC_EVENT, syncExternalChoice);
    };
  }, []);

  useEffect(() => {
    if (show) {
      wasOpenRef.current = true;
      rejectButtonRef.current?.focus();
      return;
    }

    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;

    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    try {
      sessionStorage.removeItem(CONSENT_RETURN_FOCUS_KEY);
    } catch {
      /* ignore */
    }
    if (target?.isConnected) target.focus();
  }, [show]);

  function choose(granted: boolean) {
    persistAnalyticsConsent(granted ? "granted" : "denied");
    setShow(false);
  }

  if (!show) return null;

  const button =
    "w-full rounded-full border px-5 py-2 text-sm font-semibold transition-colors sm:w-auto";

  return (
    <div
      role="dialog"
      aria-label={english ? "Cookie consent" : "Cookie-samtycke"}
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-ink-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p id="cookie-consent-description" className="text-sm text-ink-700">
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
            ref={rejectButtonRef}
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
