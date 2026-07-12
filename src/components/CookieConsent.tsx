"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// GDPR-cookiebanner med Google Consent Mode. Analys-cookies sätts först när
// besökaren klickar "Acceptera". Valet sparas i localStorage.

type GtagFn = (...args: unknown[]) => void;

function updateConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (gtag) {
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) setShow(true);
    } catch {
      // localStorage otillgängligt – visa inte bannern.
    }
  }, []);

  function choose(granted: boolean) {
    try {
      localStorage.setItem("cookie-consent", granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    updateConsent(granted);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-samtycke"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-ink-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-700">
          Vi använder cookies för anonym besöksstatistik för att förbättra sajten. Du väljer själv.
          Läs mer i vår{" "}
          <Link href="/integritetspolicy" className="font-medium text-brand-700 underline">
            integritetspolicy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-full border border-ink-300 bg-white px-5 py-2 text-sm font-semibold text-ink-700 hover:border-ink-400"
          >
            Neka
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Acceptera
          </button>
        </div>
      </div>
    </div>
  );
}
