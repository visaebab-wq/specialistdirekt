import Link from "next/link";
import { BodyMap } from "./body-map/BodyMap";
import {
  BOOKING_HREF,
  BOOKING_LABEL,
  buildRegionViews,
  crawlableRegionIndex,
} from "@/lib/body-map";

/**
 * "Var har du besvär?" – serverrenderad sektion runt den interaktiva
 * kroppskartan.
 *
 * Sektionen är avsiktligt uppdelad: rubrik, ingress, indexlistan och
 * ansvarsraden renderas på servern som vanlig HTML, medan enbart själva
 * kartan är en klientkomponent. Indexlistan under kartan gör varje områdes
 * primära destinationer krypbara och fungerar samtidigt som fallback när
 * JavaScript inte kört.
 */
export function BodyMapSection() {
  const index = crawlableRegionIndex();
  // Länkarna löses upp här, på servern. Klientkomponenten får färdig data och
  // behöver därmed inte importera artikelregistret.
  const views = {
    framsida: buildRegionViews("framsida"),
    baksida: buildRegionViews("baksida"),
  };

  return (
    <section id="var-har-du-besvar" className="scroll-mt-20 bg-section">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink-900">Var har du besvär?</h2>
          <p className="mt-3 text-ink-600">
            Välj ett område på kroppen för att hitta relevant information och specialistvård.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-ink-200 bg-white p-5 shadow-sm sm:p-8">
          <BodyMap views={views} bookingHref={BOOKING_HREF} bookingLabel={BOOKING_LABEL} />
        </div>

        <nav className="mt-8" aria-labelledby="kroppskarta-index">
          <h3 id="kroppskarta-index" className="text-sm font-semibold text-ink-800">
            Alla områden
          </h3>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {index.map((row) => (
              <li key={row.labels.join("|")} className="text-sm leading-relaxed text-ink-600">
                <span className="font-semibold text-ink-800">{row.labels.join(", ")}:</span>{" "}
                {row.links.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && <span aria-hidden> · </span>}
                    <Link href={l.href} className="text-brand-700 hover:underline">
                      {l.label}
                    </Link>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 text-sm text-ink-500">
          Kroppskartan är en vägvisare till information och specialistvård – den ställer ingen
          diagnos. Inte en akuttjänst – ring 112 vid nödfall.
        </p>
      </div>
    </section>
  );
}
