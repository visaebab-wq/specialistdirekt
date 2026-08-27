import { BOOKING_FREE_CANCEL_HOURS, BOOKING_SLOT_MINUTES } from "@/lib/booking-slots";

// Direktbokningens CTA, placerad ÖVERST i hero på varje ortopedisida.
//
// Varför överst: bokningspanelen bor i sidospalten, och på mobil staplas grid:en
// så att den hamnar efter hela artikeln – längst ned på en flera skärmar lång
// sida. Den som redan bestämt sig ska inte behöva leta.
//
// Banner ersätter INTE sidospaltens panel; den ligger kvar och är sticky på
// desktop. Det här är ingången för den som kommer in och vill boka direkt.
//
// Texten beskriver bara sådant som bokningsflödet faktiskt gör: du väljer en
// tid, bekräftar via länk i mejlet, och kan avboka kostnadsfritt fram till
// gränsen i BOOKING_FREE_CANCEL_HOURS. Inga betalningsvillkor påstås här –
// bokningen tar inte betalt. Minuter och timmar kommer från bokningens egen
// källa till sanning, så texten aldrig kan hamna ur synk med kalendern.

export const BOOKING_CTA_NOTE =
  `Du väljer en tid och bekräftar den via en länk i mejlet. ` +
  `Kostnadsfri avbokning fram till ${BOOKING_FREE_CANCEL_HOURS} timmar före besöket.`;

export function BookingCtaBanner({
  href,
  label,
  note = BOOKING_CTA_NOTE,
}: {
  href: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="mt-8 max-w-3xl rounded-2xl border-2 border-brand-300 bg-white p-5 shadow-[0_16px_40px_rgba(13,148,136,0.18)] sm:flex sm:items-center sm:justify-between sm:gap-7 sm:p-6">
      <div>
        <p className="text-xs font-bold tracking-[0.14em] text-brand-700 uppercase">
          Direktbokning · {BOOKING_SLOT_MINUTES} minuter
        </p>
        <p className="mt-1.5 text-lg font-bold text-ink-900">Boka tid direkt</p>
        <p className="mt-1 text-sm text-ink-600">{note}</p>
      </div>
      {/* Ingen target="_blank": bokningen ligger på sajten själv. */}
      <a
        href={href}
        className="mt-5 block w-full shrink-0 rounded-full bg-brand-600 px-7 py-4 text-center text-base font-bold text-white shadow-[0_12px_28px_rgba(13,148,136,0.3)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 sm:mt-0 sm:w-auto"
      >
        {label}
      </a>
    </div>
  );
}
