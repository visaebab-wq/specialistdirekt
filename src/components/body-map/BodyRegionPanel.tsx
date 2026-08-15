"use client";

import Link from "next/link";
import type { BodyRegionView } from "@/lib/body-map";

// Endast typer importeras härifrån (raderas vid kompilering). Panelen får inte
// dra in artikelregistret – se kommentaren vid BodyRegionView.

function EmptyState() {
  return (
    <div className="bodymap-panel-empty">
      <span aria-hidden className="bodymap-panel-mark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
      <h3 className="mt-4 text-xl font-bold text-ink-900">Välj ett område</h3>
      <p className="mt-2 text-ink-600">
        <span className="hidden lg:inline">
          Klicka på kroppen för att se relevant information och specialistvård.
        </span>
        <span className="lg:hidden">Tryck på ett område på kroppen.</span>
      </p>
      <p className="mt-4 text-sm text-ink-500">
        Kroppskartan hjälper dig hitta rätt information och specialist – den ställer ingen diagnos.
      </p>
    </div>
  );
}

export function BodyRegionPanel({
  region,
  bookingHref,
  bookingLabel,
}: {
  region: BodyRegionView | null;
  bookingHref: string;
  bookingLabel: string;
}) {
  if (!region) return <EmptyState />;

  return (
    <div className="bodymap-panel-content">
      <h3 className="text-xl font-bold text-ink-900 sm:text-2xl">{region.label}</h3>
      <p className="mt-2 text-ink-600">{region.description}</p>

      {/* Akutnotisen står alltid FÖRE länkarna i DOM-ordning – säkerhet före
          navigering, i linje med sajtens övriga akutblock. */}
      {region.acuteNotice && (
        <p className="bodymap-acute" role="note">
          <span aria-hidden className="bodymap-acute-mark">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 4.5 2.8 20h18.4L12 4.5z" />
              <path d="M12 10.5v4" />
              <path d="M12 17.4h.01" />
            </svg>
          </span>
          <span>{region.acuteNotice}</span>
        </p>
      )}

      {region.links.length > 0 && (
        <ul className="mt-5 grid gap-2.5">
          {region.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="bodymap-link-card">
                <span className="bodymap-link-kind">{l.kind}</span>
                <span className="bodymap-link-label">{l.label}</span>
                <span aria-hidden className="bodymap-link-arrow">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href={bookingHref} className="bodymap-cta">
        {bookingLabel}
      </Link>
    </div>
  );
}
