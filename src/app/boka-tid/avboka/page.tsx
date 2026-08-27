import Link from "next/link";
import type { Metadata } from "next";
import {
  BOOKING_FREE_CANCEL_HOURS,
  BOOKING_FREE_CANCEL_MS,
  formatSlot,
} from "@/lib/booking-slots";
import { findBooking, verifySignature } from "@/lib/booking-store";

export const metadata: Metadata = {
  title: "Avboka din tid – Specialistdirekt",
  robots: { index: false, follow: false },
};

// Statusen ändras vid varje avbokning – sidan får aldrig serveras från cache.
export const dynamic = "force-dynamic";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="content-shell">
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="form-panel overflow-hidden">
          <div className="border-b border-brand-100 bg-brand-50 px-6 py-5 sm:px-8">
            <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Hantera bokning</p>
            <h1 className="mt-1 text-2xl font-bold text-ink-900">{title}</h1>
          </div>
          <div className="p-6 sm:p-8">
          <div className="mt-4 grid gap-3 text-ink-700">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function AvbokaPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; sig?: string; fel?: string }>;
}) {
  const { id = "", sig = "" } = await searchParams;

  // Signaturen måste stämma – annars skulle vem som helst kunna avboka andras
  // tider genom att gissa id.
  if (!id || !sig || !verifySignature(id, sig)) {
    return (
      <Shell title="Länken gäller inte">
        <p>
          Länken är ofullständig eller har ändrats. Öppna den direkt från bekräftelsemejlet, eller{" "}
          <Link href="/kontakt" className="font-semibold text-brand-700 hover:underline">
            kontakta oss
          </Link>{" "}
          så hjälper vi dig.
        </p>
      </Shell>
    );
  }

  const rec = findBooking(id);
  if (!rec) {
    return (
      <Shell title="Bokningen hittades inte">
        <p>Vi hittar ingen bokning för den här länken.</p>
        <p>
          <Link href="/boka-tid" className="font-semibold text-brand-700 hover:underline">
            Välj en ny tid
          </Link>
        </p>
      </Shell>
    );
  }

  if (rec.status === "cancelled") {
    const rebookPath = rec.bookingType === "child" ? "/boka-tid/barn" : "/boka-tid";
    return (
      <Shell title="Tiden är avbokad">
        <p>
          <strong>{formatSlot(rec.slot)}</strong> är avbokad. Du behöver inte göra något mer – vi
          har meddelat mottagningen.
        </p>
        <p>
          <Link
            href={rebookPath}
            className="mt-3 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Boka en ny tid
          </Link>
        </p>
      </Shell>
    );
  }

  const free = Date.parse(rec.slot) - Date.now() >= BOOKING_FREE_CANCEL_MS;

  return (
    <Shell title="Vill du avboka din tid?">
      <dl className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
        <div>
          <dt className="text-xs font-bold tracking-wider text-brand-700 uppercase">Datum och tid</dt>
          <dd className="mt-1 text-lg font-bold capitalize text-ink-900">{formatSlot(rec.slot)}</dd>
        </div>
        <div className="mt-4 border-t border-brand-100 pt-4">
          <dt className="text-xs font-bold tracking-wider text-brand-700 uppercase">Besök</dt>
          <dd className="mt-1 font-semibold text-ink-800">Dr Masoud Sorkhabi · Göteborg</dd>
        </div>
      </dl>
      {free ? (
        <p>
          Avbokningen är kostnadsfri – det är mer än {BOOKING_FREE_CANCEL_HOURS} timmar kvar till
          besöket.
        </p>
      ) : (
        <p className="warning-card p-4 text-sm">
          Det är mindre än {BOOKING_FREE_CANCEL_HOURS} timmar kvar till besöket, så den
          kostnadsfria avbokningen gäller inte längre. Du kan avboka ändå – mottagningen hör av sig
          om vad som gäller för din tid.
        </p>
      )}

      {/* Avbokningen sker med POST, aldrig av att länken öppnas: mejlklienter
          förhandshämtar länkar, och ett felklick ska inte radera tiden.
          Primärknappen behåller tiden – avbokningen är den dämpade knappen. */}
      <form action="/boka-tid/avboka/utfor" method="post" className="mt-4 grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={rec.id} />
        <input type="hidden" name="sig" value={sig} />
        <Link
          href="/"
          className="order-1 rounded-xl bg-brand-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:order-2"
        >
          Nej, jag behåller tiden
        </Link>
        <button
          type="submit"
          className="order-2 rounded-xl border border-red-200 px-6 py-3.5 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-50 sm:order-1"
        >
          Ja, avboka tiden
        </button>
      </form>

    </Shell>
  );
}
