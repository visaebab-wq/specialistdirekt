import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  BOOKING_PRICE_SEK,
  formatPrice,
  generateSlots,
  groupSlotsByDay,
  slotTimeLabel,
} from "@/lib/booking-slots";
import { takenSlots } from "@/lib/booking-store";
import { BookingForm, BookingSteps, type DayGroup } from "./BookingForm";

export const metadata: Metadata = {
  title: "Boka tid hos ortoped i Göteborg – Specialistdirekt",
  description:
    "Direktbokning hos Dr Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi. 40 minuter, 2 000 kr. Välj en ledig tid i kalendern och bekräfta den via mejl.",
  alternates: { canonical: "/boka-tid" },
};

// Lediga tider ändras hela tiden – sidan får aldrig serveras från cache.
export const dynamic = "force-dynamic";

export default function BookaTidPage() {
  const taken = takenSlots();
  const free = generateSlots().filter((iso) => !taken.has(iso));
  const days: DayGroup[] = groupSlotsByDay(free).map((d) => ({
    key: d.key,
    label: d.label,
    slots: d.slots.map((iso) => ({ iso, time: slotTimeLabel(iso) })),
  }));

  return (
    <div className="content-shell">
      <section className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Boka tid", path: "/boka-tid" }]} />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="internal-hero-kicker">Direktbokning · Göteborg</p>
              <h1 className="internal-hero-title">Boka tid hos en ortoped</h1>
              <p className="internal-hero-text">
                Välj en ledig tid direkt i kalendern. Besöket är hos Dr Masoud Sorkhabi,
                specialist i ortopedi och ryggkirurgi. Besöket är fysiskt och äger rum i Göteborg.
                Bokningen bekräftas tryggt via mejl.
              </p>
            </div>
            <dl className="grid gap-3 rounded-2xl border border-white/80 bg-white/80 p-5 lg:min-w-[19rem] shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Besök", "Fysiskt i Göteborg"],
                ["Besökstid", "40 minuter"],
                ["Fast pris", `${formatPrice(BOOKING_PRICE_SEK)} kr`],
                ["Betalning", "På plats vid besöket"],
                ["Remiss", "Behövs inte"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-6 border-brand-100 not-last:border-b not-last:pb-3 sm:block sm:not-last:border-0 sm:not-last:pb-0 lg:flex lg:not-last:border-b lg:not-last:pb-3">
                  <dt className="text-xs font-bold tracking-wider text-brand-700 uppercase">{label}</dt>
                  <dd className="font-semibold text-ink-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="form-panel overflow-hidden">
            <BookingSteps />
            <div className="border-b border-brand-100 bg-brand-50/60 px-6 py-5 sm:px-8">
              <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Lediga tider</p>
              <h2 className="mt-1 text-2xl font-bold text-ink-900">Välj tid och fyll i dina uppgifter</h2>
              <p className="mt-1 text-sm text-ink-600">Endast tider som går att boka visas.</p>
            </div>
            <div className="p-6 sm:p-8">
              <BookingForm days={days} price={BOOKING_PRICE_SEK} />
            </div>
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-24">
            <section className="readable-card p-6" aria-labelledby="booking-process">
              <h2 id="booking-process" className="text-lg font-bold text-ink-900">Så fungerar bokningen</h2>
              <ol className="mt-5 grid gap-5">
                {[
                  ["1", "Välj en ledig tid", "Alla valbara tider är aktuella."],
                  ["2", "Fyll i dina uppgifter", "Vi skickar bekräftelsen via mejl."],
                  ["3", "Bekräfta bokningen", "Tiden reserveras när du skickar formuläret."],
                ].map(([number, title, text]) => (
                  <li key={number} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">{number}</span>
                    <span><strong className="block text-sm text-ink-900">{title}</strong><span className="mt-0.5 block text-sm leading-relaxed text-ink-600">{text}</span></span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="soft-info-card p-6" aria-label="Trygg bokning">
              <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Trygg bokning</p>
              <ul className="mt-4 grid gap-3 text-sm text-ink-700">
                {[
                  "Ingen remiss behövs",
                  "Tydligt pris före bekräftelse",
                  "Kostnadsfri avbokning enligt villkoren",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5"><span aria-hidden className="font-bold text-brand-600">✓</span>{item}</li>
                ))}
              </ul>
            </section>

            <div className="warning-card p-5 text-sm leading-relaxed">
              <strong>Inte en akuttjänst.</strong> Vid akuta besvär, ring 112. För
              sjukvårdsrådgivning, ring 1177. Specialistdirekt hanterar bokningen och gör ingen
              medicinsk bedömning.
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
