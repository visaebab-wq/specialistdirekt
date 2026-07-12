"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions";
import { initialLeadState } from "@/lib/lead";
import { specialties } from "@/lib/specialties";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Skickar…" : "Skicka förfrågan"}
    </button>
  );
}

const fieldClass =
  "w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

/** Förvald specialitet kan sättas från en specialitetssida. */
export function LeadForm({ defaultSpecialty }: { defaultSpecialty?: string }) {
  const [state, formAction] = useActionState(submitLead, initialLeadState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center"
      >
        <div
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-2xl text-white"
        >
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink-900">Tack för din förfrågan!</h3>
        <p className="mt-2 text-ink-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
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
          <input id="name" name="name" type="text" autoComplete="name" className={fieldClass} />
          <FieldError message={state.errors.name} />
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
            className={fieldClass}
          />
          <FieldError message={state.errors.email} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-700">
            Telefon <span className="text-ink-400">(valfritt)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="region" className="mb-1 block text-sm font-medium text-ink-700">
            Ort / region <span className="text-ink-400">(valfritt)</span>
          </label>
          <input id="region" name="region" type="text" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="specialty" className="mb-1 block text-sm font-medium text-ink-700">
          Specialitet
        </label>
        <select
          id="specialty"
          name="specialty"
          defaultValue={defaultSpecialty ?? ""}
          className={fieldClass}
        >
          <option value="">Vet inte / annat</option>
          {specialties.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} – {s.name}
            </option>
          ))}
        </select>
        <FieldError message={state.errors.specialty} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
          Beskriv ditt behov <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Berätta kort vad du behöver hjälp med så matchar vi dig med rätt specialist."
          className={fieldClass}
        />
        <FieldError message={state.errors.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
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
        <FieldError message={state.errors.consent} />
      </div>

      <SubmitButton />
      <p className="text-center text-xs text-ink-500">
        Kostnadsfritt och utan förpliktelser. Inte en akuttjänst – ring 112 vid nödfall.
      </p>
    </form>
  );
}
