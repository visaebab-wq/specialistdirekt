import Link from "next/link";
import { BARN_SCOPE } from "@/lib/barn-scope";
import { BOOKING_PRICE_SEK, BOOKING_SLOT_MINUTES, formatPrice } from "@/lib/booking-slots";

/**
 * Bokningsmodul för barnartiklarna.
 *
 * FAKTARADEN HÄMTAS FRÅN SAMMA KÄLLA SOM BOKNINGSSIDAN – aldrig hårdkodad här
 * eller i artikeldatan. Åldersspann, besökslängd och pris bor i barn-scope.ts
 * respektive booking-slots.ts, och om någon av dem ändras följer den här rutan
 * med automatiskt. En faktarad som glider isär från kalendern är värre än ingen
 * faktarad alls.
 *
 * "Ingen remiss" motsvarar bokningssidans egen rad "Remiss: Behövs inte".
 *
 * Avgränsningsraden är obligatorisk: modulen kan stå högt upp på navet, och då
 * måste det framgå att den gäller planerade besök – inte akuta.
 */
export function BarnBookingCta({
  heading,
  body,
  label,
  href,
  secondary,
  variant = "full",
}: {
  heading: string;
  body: string;
  label: string;
  href: string;
  /** Endast på symtomartiklarna: väg vidare till navet. */
  secondary?: { label: string; href: string };
  /** compact = högt upp på navet, full = i artikelns nedre område. */
  variant?: "compact" | "full";
}) {
  const facts = [
    BARN_SCOPE.short,
    `${BOOKING_SLOT_MINUTES} minuter`,
    `${formatPrice(BOOKING_PRICE_SEK)} kr`,
    "Ingen remiss",
  ];

  const compact = variant === "compact";

  return (
    <aside
      data-barn-cta={variant}
      className={
        compact
          ? "mb-8 rounded-2xl border border-brand-200 bg-brand-50/70 p-5 sm:p-6"
          : "mt-10 rounded-3xl border border-brand-200 bg-brand-50/70 p-6 sm:p-8"
      }
    >
      <h2 className={compact ? "text-lg font-bold text-ink-900" : "text-xl font-bold text-ink-900"}>
        {heading}
      </h2>
      <p className="mt-2 text-ink-700">{body}</p>

      <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-ink-800">
        {facts.map((f, i) => (
          <li key={f} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-ink-400">
                ·
              </span>
            )}
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          {label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            {secondary.label}
          </Link>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-600">
        Gäller planerade besök. Följ artikelns råd om när och var ni ska söka vård.
      </p>
    </aside>
  );
}
