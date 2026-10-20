"use client";

import { useActionState, useState } from "react";
import { submitBooking, type BookingState } from "@/app/actions";
import { TrackEvent } from "@/components/TrackEvent";
import { formatPrice } from "@/lib/booking-slots";

const initial: BookingState = { status: "idle", message: "", errors: {} };

export type DayGroup = { key: string; label: string; slots: { iso: string; time: string }[] };

const field =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-ink-900 shadow-sm transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 focus:outline-none";

/**
 * Kalendern öppnar två månader framåt, men alla datum på en gång blir en lång rad
 * att bläddra i – särskilt på mobil. Därför visas bara den första veckan räknat
 * från första lediga dagen (i praktiken närmaste helgen); resten ligger bakom
 * "Visa fler datum".
 */
const FIRST_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** `key` är "ÅÅÅÅ-MM-DD" och tolkas som UTC-midnatt – differensen blir exakt. */
export function splitFirstWeek(days: DayGroup[]): { firstWeek: DayGroup[]; later: DayGroup[] } {
  if (days.length === 0) return { firstWeek: [], later: [] };
  const start = Date.parse(days[0].key);
  const cut = days.findIndex((day) => Date.parse(day.key) - start >= FIRST_WEEK_MS);
  if (cut === -1) return { firstWeek: days, later: [] };
  return { firstWeek: days.slice(0, cut), later: days.slice(cut) };
}

export function BookingSteps({ patientType = "adult" }: { patientType?: "adult" | "child" }) {
  const steps = [
    ["1", "Välj tid"],
    ["2", patientType === "child" ? "Barnets uppgifter" : "Dina uppgifter"],
    ["3", "Bekräfta via mejl"],
  ];

  return (
    <div className="grid grid-cols-3 border-b border-brand-100 bg-white text-center text-xs sm:text-sm" aria-label="Bokningens steg">
      {steps.map(([number, label], index) => (
        <div key={number} className={`px-2 py-4 ${index === 0 ? "bg-brand-50 font-bold text-brand-800" : "text-ink-500"}`}>
          <span className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full ${index === 0 ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"}`}>{number}</span>
          {label}
        </div>
      ))}
    </div>
  );
}

export function BookingForm({
  days,
  price,
  patientType = "adult",
}: {
  days: DayGroup[];
  price: number;
  patientType?: "adult" | "child";
}) {
  const [state, action, pending] = useActionState(submitBooking, initial);
  const [slot, setSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState(days[0]?.key ?? "");
  const [showAllDays, setShowAllDays] = useState(false);
  const priceLabel = formatPrice(price);
  const activeDay = days.find((day) => day.key === selectedDay) ?? days[0];
  const { firstWeek, later } = splitFirstWeek(days);
  // Utökningen går bara åt ett håll: ett valt datum kan aldrig försvinna ur listan.
  const visibleDays = showAllDays ? days : firstWeek;

  if (state.status === "success") {
    return (
      <div className="soft-info-card p-6 sm:p-8">
        {/* Bokningen är skickad (tiden reserverad, ej bekräftad ännu). */}
        <TrackEvent name="booking_submitted" />
        <h2 className="text-xl font-bold text-ink-900">Tack!</h2>
        <p className="mt-3 text-ink-700">{state.message}</p>
        <p className="mt-4 text-sm text-ink-500">
          Hittar du inte mejlet? Titta i skräpposten. Tiden är preliminär tills du bekräftat den.
        </p>
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="soft-info-card p-6">
        <p className="text-ink-700">
          Just nu finns inga lediga tider. Nya bokningsbara tider visas här i kalendern när de blir
          tillgängliga.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-9">
      {/* Honungsfälla mot bottar – dold för människor. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="slot" value={slot} />
      <input type="hidden" name="bookingType" value={patientType} />

      <fieldset className="min-w-0">
        <legend className="flex items-center gap-3 text-lg font-bold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-sm text-white">1</span>
          Välj en tid
        </legend>
        <p className="mt-1 text-sm text-ink-600">
          Fysiskt besök i Göteborg hos Dr Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi
          {patientType === "child" ? " som även tar emot barn och ungdomar 0–17 år" : ""}.
          Besöket är 40 minuter långt och kostar {priceLabel} kr. Du betalar på plats.
        </p>
        {state.errors.slot && (
          <p className="mt-2 text-sm font-semibold text-red-700">{state.errors.slot}</p>
        )}
        <div className="mt-5">
          <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Välj datum</p>
          <div className="-mx-1 mt-2 flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]" role="tablist" aria-label="Lediga datum">
            {visibleDays.map((day) => (
              <button
                key={day.key}
                type="button"
                role="tab"
                aria-selected={activeDay.key === day.key}
                onClick={() => {
                  setSelectedDay(day.key);
                  setSlot("");
                }}
                className={`min-w-max snap-start rounded-xl border px-4 py-3 text-left text-sm transition ${
                  activeDay.key === day.key
                    ? "border-brand-600 bg-brand-50 font-bold text-brand-800 shadow-sm"
                    : "border-ink-200 bg-white font-semibold text-ink-700 hover:border-brand-400 hover:bg-brand-50"
                }`}
              >
                <span className="block capitalize">{day.label}</span>
                <span className="mt-0.5 block text-xs font-normal text-ink-500">
                  {day.slots.length} {day.slots.length === 1 ? "ledig tid" : "lediga tider"}
                </span>
              </button>
            ))}
          </div>

          {!showAllDays && later.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAllDays(true)}
              className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
            >
              Visa fler datum
              <span className="font-normal text-ink-500">({later.length})</span>
              <span aria-hidden>↓</span>
            </button>
          )}

          <div className="mt-5 rounded-2xl border border-ink-100 bg-ink-50/50 p-4 sm:p-5">
            <h3 className="text-xs font-bold tracking-wider text-ink-500 uppercase">Välj klockslag</h3>
            <p className="mt-1 text-sm font-semibold capitalize text-ink-800">{activeDay.label}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {activeDay.slots.map((s) => (
                  <label key={s.iso} className="cursor-pointer">
                    <input
                      type="radio"
                      name="slotChoice"
                      value={s.iso}
                      checked={slot === s.iso}
                      onChange={() => setSlot(s.iso)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-11 items-center justify-center rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-700 shadow-sm transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 hover:border-brand-400 hover:bg-brand-50">
                      {s.time}
                    </span>
                  </label>
                ))}
            </div>
            {slot && (
              <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800" role="status">
                Vald tid: <span className="capitalize">{activeDay.label}</span> kl. {activeDay.slots.find((item) => item.iso === slot)?.time}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 border-t border-ink-100 pt-8">
        <legend className="flex items-center gap-3 text-lg font-bold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-sm text-white">2</span>
          {patientType === "child" ? "Barnets uppgifter" : "Dina uppgifter"}
        </legend>
        {patientType === "child" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-child-name" className="mb-1 block text-sm font-medium text-ink-700">
                Barnets namn <span className="text-red-500">*</span>
              </label>
              <input id="bk-child-name" name="childName" required maxLength={100} className={field} autoComplete="off" />
              {state.errors.childName && <p className="mt-1 text-sm text-red-700">{state.errors.childName}</p>}
            </div>
            <div>
              <label htmlFor="bk-child-birth" className="mb-1 block text-sm font-medium text-ink-700">
                Barnets födelsedatum <span className="text-red-500">*</span>
              </label>
              <input id="bk-child-birth" name="childBirthDate" type="date" required className={field} />
              <p className="mt-1 text-xs text-ink-500">Barn och ungdomar 0–17 år tas emot.</p>
              {state.errors.childBirthDate && <p className="mt-1 text-sm text-red-700">{state.errors.childBirthDate}</p>}
            </div>
          </div>
        )}
        {patientType === "child" && (
          <p className="text-sm font-semibold text-ink-800">Vårdnadshavarens kontaktuppgifter</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bk-name" className="mb-1 block text-sm font-medium text-ink-700">
              {patientType === "child" ? "Vårdnadshavarens namn" : "Namn"} <span className="text-red-500">*</span>
            </label>
            <input id="bk-name" name="name" required maxLength={100} className={field} autoComplete="name" />
            {state.errors.name && <p className="mt-1 text-sm text-red-700">{state.errors.name}</p>}
          </div>
          <div>
            <label htmlFor="bk-phone" className="mb-1 block text-sm font-medium text-ink-700">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input id="bk-phone" name="phone" required maxLength={40} className={field} autoComplete="tel" />
            {state.errors.phone && <p className="mt-1 text-sm text-red-700">{state.errors.phone}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="bk-email" className="mb-1 block text-sm font-medium text-ink-700">
            E-post <span className="text-red-500">*</span>
          </label>
          <input id="bk-email" name="email" type="email" required maxLength={160} className={field} autoComplete="email" />
          <p className="mt-1 text-xs text-ink-500">Bekräftelselänken skickas hit.</p>
          {state.errors.email && <p className="mt-1 text-sm text-red-700">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="bk-message" className="mb-1 block text-sm font-medium text-ink-700">
            Vad gäller besöket? (frivilligt)
          </label>
          <textarea id="bk-message" name="message" rows={3} maxLength={2000} className={field} />
          {state.errors.message && <p className="mt-1 text-sm text-red-700">{state.errors.message}</p>}
        </div>
      </fieldset>

      <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0 accent-brand-600" />
          <span>
            Jag godkänner att {patientType === "child" ? "barnets och mina" : "mina"} uppgifter behandlas för att boka besöket, och att priset är{" "}
            {priceLabel} kr.
          </span>
        </label>
        {state.errors.consent && (
          <p className="mt-1 text-sm text-red-700">{state.errors.consent}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {state.message}
        </p>
      )}

      <div className="border-t border-ink-100 pt-6">
        <button
          type="submit"
          disabled={pending || !slot}
          className="w-full rounded-xl bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_24px_rgba(13,148,136,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {pending ? "Skickar…" : "Boka tiden"}
        </button>
        <p className="mt-3 text-sm text-ink-500">
          Tiden är preliminär tills du bekräftat den via mejl. Inte en akuttjänst – ring 112 vid
          nödfall.
        </p>
      </div>
    </form>
  );
}
