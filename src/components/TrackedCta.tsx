"use client";

import { usePathname } from "next/navigation";

import { sendGtagEvent } from "@/lib/gtag";
import { withClickSource } from "@/lib/click-source";

/**
 * CTA-knapp som mäter sitt eget klick (`lead_cta_click`).
 *
 * Finns för att en landningssida har flera CTA:er på olika djup, och utan
 * `placement` går det inte att se VILKEN av dem som bär konverteringen – bara
 * att någon klickades. Parametrarna är enbart sido-metadata (specialitet, stad,
 * placering); inga uppgifter om besökaren följer med.
 *
 * href är oftast ett ankare på samma sida (#tidsforfragan), därför vanlig <a>
 * och ingen <Link>: ingen navigering sker, och klientrouting hade inte hjälpt.
 */
export function TrackedCta({
  href,
  label,
  note,
  className,
  params,
  sourcePath,
}: {
  href: string;
  label: string;
  note?: string;
  className?: string;
  params?: Record<string, string | number>;
  /**
   * Sidan CTA:n sitter på. Skickas explicit av statiskt genererade sidor:
   * `usePathname()` returnerar null under prerendering, så på en SSG-sida hade
   * `src` saknats i den serverrenderade HTML:en och ett klick före hydrering
   * hade tappat källan – vilket drabbade just pengasidan.
   */
  sourcePath?: string;
}) {
  // Sidan CTA:n sitter på. Skickas med till den server-loggade bokningsrutten,
  // eftersom Referer-headern saknades i 61 % av de mänskliga klicken och alltså
  // inte går att bygga intern attribution på.
  const pathname = usePathname();
  const finalHref = withClickSource(href, sourcePath ?? pathname, params?.placement);

  return (
    <>
      <a
        href={finalHref}
        onClick={() => sendGtagEvent("lead_cta_click", params)}
        className={
          className ??
          "inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        }
      >
        {label}
      </a>
      {note && <p className="mt-2 text-sm text-ink-600">{note}</p>}
    </>
  );
}
