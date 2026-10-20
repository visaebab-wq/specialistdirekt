import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BARN_SCOPE } from "@/lib/barn-scope";
import {
  BOOKING_PRICE_SEK,
  formatPrice,
  generateSlots,
  groupSlotsByDay,
  slotTimeLabel,
} from "@/lib/booking-slots";
import { takenSlots } from "@/lib/booking-store";
import { BookingFlow, BookingForm, BookingSteps, type DayGroup } from "../BookingForm";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Boka ortoped för barn i Göteborg – Specialistdirekt",
  description:
    "Boka ortopedisk bedömning för barn och ungdomar 0–17 år hos Dr Masoud Sorkhabi i Göteborg. 40 minuter, 2 000 kr, utan remiss.",
  path: "/boka-tid/barn",
});

export const dynamic = "force-dynamic";

export default function BokaTidBarnPage() {
  const taken = takenSlots();
  const free = generateSlots().filter((iso) => !taken.has(iso));
  const days: DayGroup[] = groupSlotsByDay(free).map((day) => ({
    key: day.key,
    label: day.label,
    slots: day.slots.map((iso) => ({ iso, time: slotTimeLabel(iso) })),
  }));

  return (
    <div className="content-shell">
      <section className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              { name: "Barnortopedi", path: "/artiklar/barnortopedi" },
              { name: "Boka tid", path: "/boka-tid/barn" },
            ]}
          />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="internal-hero-kicker">Ortopedisk bedömning för barn · Göteborg</p>
              <h1 className="internal-hero-title">Boka tid hos ortoped för barn</h1>
              <p className="internal-hero-text">
                Välj en ledig tid för ditt barn direkt i kalendern. Besöket sker hos Dr Masoud
                Sorkhabi, specialist i ortopedi och ryggkirurgi som även tar emot barn och
                ungdomar, {BARN_SCOPE.label}. Bokningen bekräftas tryggt via mejl.
              </p>
            </div>
            <dl className="grid gap-3 rounded-2xl border border-white/80 bg-white/80 p-5 lg:min-w-[19rem] shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Ålder", BARN_SCOPE.short],
                ["Besök", "Fysiskt i Göteborg"],
                ["Besökstid", "40 minuter"],
                ["Fast pris", `${formatPrice(BOOKING_PRICE_SEK)} kr`],
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
          <BookingFlow className="form-panel overflow-hidden">
            <BookingSteps patientType="child" />
            <div className="border-b border-brand-100 bg-brand-50/60 px-6 py-5 sm:px-8">
              <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Lediga tider</p>
              <h2 className="mt-1 text-2xl font-bold text-ink-900">Välj tid och fyll i uppgifterna</h2>
              <p className="mt-1 text-sm text-ink-600">Endast tider som går att boka visas.</p>
            </div>
            <div className="p-6 sm:p-8">
              <BookingForm days={days} price={BOOKING_PRICE_SEK} patientType="child" />
            </div>
          </BookingFlow>

          <aside className="grid gap-6 lg:sticky lg:top-24">
            <section className="readable-card p-6">
              <h2 className="text-lg font-bold text-ink-900">Inför barnets besök</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink-700">
                <li>Ta med legitimation för vårdnadshavare.</li>
                <li>Ta gärna med tidigare röntgen- eller MR-svar.</li>
                <li>Beskriv kort barnets besvär i formuläret.</li>
                <li>Betalning sker på plats vid besöket.</li>
              </ul>
            </section>
            <section className="soft-info-card p-6">
              <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Rätt vårdnivå</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                Medfödda eller komplicerade tillstånd och behov av barnkirurgi hör hemma i
                specialiserad barnsjukvård.
              </p>
            </section>
            <div className="warning-card p-5 text-sm leading-relaxed">
              <strong>Inte en akuttjänst.</strong> Vid akut skada, kraftig smärta, oförmåga att
              belasta eller feber med svullen led – sök akut vård. Ring 112 vid livshotande
              tillstånd och 1177 vid osäkerhet.
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
