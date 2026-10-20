"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions";
import { initialLeadState } from "@/lib/lead";
import { specialties } from "@/lib/specialties";
import { TrackEvent } from "@/components/TrackEvent";
import {
  maxPreferredDateInStockholm,
  todayInStockholm,
} from "@/lib/lead-dates";

/**
 * Värdet i specialitetsväljaren som betyder "det här är en MR-förfrågan".
 * Samma sträng som <option value="privat-mr"> längre ned – ändras den ena
 * måste den andra följa med, annars slutar mätningen tyst att räkna MR.
 */
const MR_SPECIALTY = "privat-mr";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_16px_34px_rgba(13,148,136,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Skickar…" : "Skicka tidsförfrågan"}
    </button>
  );
}

const fieldClass =
  "w-full rounded-xl border border-ink-500 bg-white px-4 py-3 text-ink-900 shadow-sm placeholder:text-ink-500 focus:border-brand-700 focus:ring-2 focus:ring-brand-200 focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

/** Förvald specialitet kan sättas från en specialitetssida. */
export function LeadForm({ defaultSpecialty }: { defaultSpecialty?: string }) {
  const [state, formAction] = useActionState(submitLead, initialLeadState);
  const formRef = useRef<HTMLFormElement>(null);
  const [dateBounds, setDateBounds] = useState<{ min: string; max: string } | null>(null);

  // Speglar VALD specialitet enbart för mätning. Fältet förblir okontrollerat
  // (defaultValue, inte value), så det som skickas till servern är oförändrat
  // DOM-värdet – den här state:en ligger vid sidan av och rör inte payloaden.
  const [selectedSpecialty, setSelectedSpecialty] = useState(defaultSpecialty ?? "");

  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current
      ?.querySelector<HTMLElement>('[data-error-focus="true"], [aria-invalid="true"]')
      ?.focus();
  }, [state]);

  useEffect(() => {
    const refreshDateBounds = () => {
      const now = new Date();
      setDateBounds({
        min: todayInStockholm(now),
        max: maxPreferredDateInStockholm(now),
      });
    };

    refreshDateBounds();
    window.addEventListener("focus", refreshDateBounds);
    const timer = window.setInterval(refreshDateBounds, 60_000);
    return () => {
      window.removeEventListener("focus", refreshDateBounds);
      window.clearInterval(timer);
    };
  }, []);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center"
      >
        {/* Mätning av genomförd MR-förfrågan. Renderas ENDAST i success-grenen,
            dvs. efter att serveråtgärden svarat status "success" – aldrig vid
            sidladdning, CTA-klick eller valideringsfel. TrackEvent skickar en
            gång vid montering och kan inte kasta vidare in i formuläret;
            förfrågan är redan inskickad när den monteras. Inga fältvärden
            följer med – enbart händelsenamnet.

            HÄNDELSENS BETYDELSE, exakt: förfrågan har minst en hållbar
            leveransväg. Den är antingen sparad i .data/leads.jsonl eller
            levererad via e-post (oftast båda). Om båda vägarna fallerar
            returnerar serveråtgärden error och den här grenen monteras aldrig.
            Händelsen betyder inte nödvändigtvis att e-post har levererats. */}
        {state.accepted && selectedSpecialty === MR_SPECIALTY && (
          <TrackEvent name="mr_request_submitted" />
        )}
        <div
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-2xl text-white"
        >
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink-900">Tack för din tidsförfrågan!</h3>
        <p className="mt-2 text-ink-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      key={state.attempt}
      ref={formRef}
      action={formAction}
      className="space-y-4"
      noValidate
    >
      {state.status === "error" && state.message && (
        <p
          role="alert"
          tabIndex={Object.keys(state.errors).length === 0 ? -1 : undefined}
          data-error-focus={Object.keys(state.errors).length === 0 ? "true" : undefined}
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      {/* Honungsfälla – dold för människor, lockar bottar. */}
      <div aria-hidden className="absolute left-[-9999px]" hidden>
        <label>
          Lämna tomt
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink-700">
            Namn <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            defaultValue={state.values?.name ?? ""}
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="name-error" message={state.errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-700">
            E-post <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
            defaultValue={state.values?.email ?? ""}
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="email-error" message={state.errors.email} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-700">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            required
            defaultValue={state.values?.phone ?? ""}
            aria-invalid={Boolean(state.errors.phone)}
            aria-describedby={state.errors.phone ? "phone-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="phone-error" message={state.errors.phone} />
        </div>
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium text-ink-700">
            Stad <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            maxLength={80}
            required
            defaultValue={state.values?.city ?? ""}
            aria-invalid={Boolean(state.errors.city)}
            aria-describedby={state.errors.city ? "city-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="city-error" message={state.errors.city} />
        </div>
      </div>

      <div>
        <label htmlFor="specialty" className="mb-1 block text-sm font-medium text-ink-700">
          Specialitet <span className="text-red-500">*</span>
        </label>
        <select
          id="specialty"
          name="specialty"
          defaultValue={state.values?.specialty ?? defaultSpecialty ?? ""}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          required
          aria-invalid={Boolean(state.errors.specialty)}
          aria-describedby={state.errors.specialty ? "specialty-error" : undefined}
          className={fieldClass}
        >
          {/* Tomt värde är bara en platshållare – ett aktivt val krävs. Den som
              inte vet väljer "Vet inte / annat", vilket är ett svar i sig. */}
          <option value="" disabled>
            Välj specialitet
          </option>
          <option value="vet-inte">Vet inte / annat</option>
          {specialties.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} – {s.name}
            </option>
          ))}
          {/* Bilddiagnostik är ingen specialitet i specialties.ts, men måste gå att
              välja direkt – annars måste den som söker MR gissa specialistkategori.
              Avgränsat till rörelseapparaten: uppföljningen görs av ortoped, så vi
              tar medvetet inte in t.ex. MR hjärna som vi inte kan följa upp. */}
          {/* Utan "och": etiketten kapades annars i den stängda selecten på
              mobil (275px text i 250px utrymme vid 390px viewport). */}
          <option value="privat-mr">Privat MR – rygg, knä, axel, höft</option>
        </select>
        <FieldError id="specialty-error" message={state.errors.specialty} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
          Vad vill du boka tid för? <span className="text-ink-500">(valfritt)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          defaultValue={state.values?.message ?? ""}
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? "message-error" : undefined}
          placeholder="Beskriv kort besväret eller vilken undersökning/specialist du vill boka tid för."
          className={fieldClass}
        />
        <FieldError id="message-error" message={state.errors.message} />
      </div>

      <fieldset className="rounded-xl border border-brand-100 bg-white/70 p-4">
        <legend className="px-1 text-sm font-semibold text-ink-800">
          Möjliga datum <span className="text-red-500">*</span>
        </legend>
        <p className="mt-1 text-sm text-ink-600">
          Ange minst två dagar inom de kommande 12 månaderna, så blir det lättare för mottagningen
          att hitta en tid.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="preferredDate1" className="mb-1 block text-sm font-medium text-ink-700">
              Datum 1 <span className="text-red-500">*</span>
            </label>
            <input
              id="preferredDate1"
              name="preferredDate1"
              type="date"
              min={dateBounds?.min}
              max={dateBounds?.max}
              required
              defaultValue={state.values?.preferredDate1 ?? ""}
              aria-invalid={Boolean(state.errors.preferredDate1)}
              aria-describedby={state.errors.preferredDate1 ? "preferred-date-1-error" : undefined}
              className={fieldClass}
            />
            <FieldError id="preferred-date-1-error" message={state.errors.preferredDate1} />
          </div>
          <div>
            <label htmlFor="preferredDate2" className="mb-1 block text-sm font-medium text-ink-700">
              Datum 2 <span className="text-red-500">*</span>
            </label>
            <input
              id="preferredDate2"
              name="preferredDate2"
              type="date"
              min={dateBounds?.min}
              max={dateBounds?.max}
              required
              defaultValue={state.values?.preferredDate2 ?? ""}
              aria-invalid={Boolean(state.errors.preferredDate2)}
              aria-describedby={state.errors.preferredDate2 ? "preferred-date-2-error" : undefined}
              className={fieldClass}
            />
            <FieldError id="preferred-date-2-error" message={state.errors.preferredDate2} />
          </div>
          <div>
            <label htmlFor="preferredDate3" className="mb-1 block text-sm font-medium text-ink-700">
              Datum 3 <span className="text-ink-500">(valfritt)</span>
            </label>
            <input
              id="preferredDate3"
              name="preferredDate3"
              type="date"
              min={dateBounds?.min}
              max={dateBounds?.max}
              defaultValue={state.values?.preferredDate3 ?? ""}
              aria-invalid={Boolean(state.errors.preferredDate3)}
              aria-describedby={state.errors.preferredDate3 ? "preferred-date-3-error" : undefined}
              className={fieldClass}
            />
            <FieldError id="preferred-date-3-error" message={state.errors.preferredDate3} />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="timePreference" className="mb-1 block text-sm font-medium text-ink-700">
          Tid på dagen <span className="text-red-500">*</span>
        </label>
        <select
          id="timePreference"
          name="timePreference"
          required
          defaultValue={state.values?.timePreference ?? ""}
          aria-invalid={Boolean(state.errors.timePreference)}
          aria-describedby={state.errors.timePreference ? "time-preference-error" : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            Välj tid
          </option>
          <option value="before-noon">Före lunch</option>
          <option value="after-noon">Efter lunch</option>
        </select>
        <FieldError id="time-preference-error" message={state.errors.timePreference} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            required
            defaultChecked={state.values?.consent ?? false}
            aria-required="true"
            aria-invalid={Boolean(state.errors.consent)}
            aria-describedby={state.errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-ink-500 text-brand-700 focus:ring-brand-700"
          />
          <span>
            Jag godkänner att Specialistdirekt behandlar mina uppgifter för att kunna hjälpa
            mig, enligt{" "}
            <a href="/integritetspolicy" className="text-brand-700 underline">
              integritetspolicyn
            </a>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        <FieldError id="consent-error" message={state.errors.consent} />
      </div>

      <SubmitButton />
      <p className="text-center text-xs text-ink-500">
        Kostnadsfri tidsförfrågan. Inte en akuttjänst – ring 112 vid nödfall.
      </p>
    </form>
  );
}
