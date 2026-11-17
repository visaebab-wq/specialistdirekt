import Link from "next/link";
import type { Metadata } from "next";
import {
  BOOKING_CLINIC,
  BOOKING_CLINIC_ADDRESS,
  BOOKING_DOCTOR,
  BOOKING_SPECIALTY,
  bookingMapUrl,
} from "@/lib/booking-appointment";
import {
  BOOKING_SLOT_MINUTES,
  formatPrice,
  formatSlot,
} from "@/lib/booking-slots";
import { readBookingReceipt } from "@/lib/booking-receipt";

export const metadata: Metadata = {
  title: "Din tid är bokad – Specialistdirekt",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// Sidan läser en kortlivad, patientspecifik cookie och får aldrig cachelagras.
export const dynamic = "force-dynamic";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="content-shell">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="form-panel overflow-hidden">
          <div className="border-b border-brand-100 bg-brand-50 px-6 py-6 sm:px-8">
            <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">
              Bokningsbekräftelse
            </p>
            <h1 className="mt-1 text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h1>
          </div>
          <div className="p-6 sm:p-8">{children}</div>
        </div>
      </section>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink-100 py-4 last:border-0">
      <dt className="text-xs font-bold tracking-wider text-ink-500 uppercase">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-ink-900">{children}</dd>
    </div>
  );
}

export default async function BookedPage() {
  const receipt = await readBookingReceipt();

  if (!receipt) {
    return (
      <Shell title="Ingen ny bokning att visa">
        <p className="text-ink-700">
          Bekräftelsen visas direkt efter en genomförd bokning. Om du redan har bokat finns
          uppgifterna och den personliga avbokningslänken i ditt bekräftelsemejl.
        </p>
        <Link
          href="/boka-tid"
          className="mt-7 inline-flex rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Gå till bokningen
        </Link>
      </Shell>
    );
  }

  const cancelHref = `/boka-tid/avboka?id=${encodeURIComponent(receipt.id)}&sig=${encodeURIComponent(receipt.signature)}`;

  if (receipt.status === "cancelled") {
    return (
      <Shell title="Tiden är avbokad">
        <p className="text-ink-700">
          <strong className="capitalize">{formatSlot(receipt.slot)}</strong> är avbokad. Du
          behöver inte göra något mer.
        </p>
        <Link
          href={receipt.bookingType === "child" ? "/boka-tid/barn" : "/boka-tid"}
          className="mt-7 inline-flex rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Boka en ny tid
        </Link>
      </Shell>
    );
  }

  return (
    <Shell title="Din tid är bokad">
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
        >
          ✓
        </span>
        <div>
          <p className="font-bold">Bokningen är klar.</p>
          <p className="mt-1 text-sm">
            {receipt.confirmationEmailSent
              ? "Samma uppgifter och din personliga avbokningslänk har skickats till din e-post."
              : "Tiden är bokad, men bekräftelsemejlet kunde inte skickas. Spara uppgifterna på den här sidan och kontakta oss om du behöver hjälp."}
          </p>
        </div>
      </div>

      <dl className="mt-7 rounded-2xl border border-ink-100 bg-white px-5 sm:px-6">
        <Detail label="Datum och tid">
          <span className="capitalize">{formatSlot(receipt.slot)}</span>
        </Detail>
        <Detail label="Läkare">{BOOKING_DOCTOR}</Detail>
        <Detail label="Besök">{BOOKING_SPECIALTY}</Detail>
        <Detail label="Längd">{BOOKING_SLOT_MINUTES} minuter</Detail>
        <Detail label="Bokning för">
          {receipt.bookingType === "child" ? "Barn eller ungdom 0–17 år" : "Vuxen"}
        </Detail>
        <Detail label="Pris och betalning">
          {formatPrice(receipt.priceSek)} kr · betalas på plats vid besöket
        </Detail>
        <Detail label="Mottagning och adress">
          <span className="block">{BOOKING_CLINIC}</span>
          <a
            href={bookingMapUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex font-medium text-brand-700 underline"
          >
            {BOOKING_CLINIC_ADDRESS} · visa vägbeskrivning
          </a>
        </Detail>
      </dl>

      <div className="mt-7 rounded-2xl border border-ink-100 bg-ink-50 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-ink-900">Om du behöver avboka</h2>
        <p className="mt-2 text-sm leading-6 text-ink-700">
          Avbokning är kostnadsfri senast {receipt.freeCancelHours} timmar före besöket. Länken
          öppnar först en kontrollsida – tiden avbokas inte förrän du bekräftar där.
        </p>
        <Link
          href={cancelHref}
          className="mt-4 inline-flex rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-50"
        >
          Avboka tiden
        </Link>
      </div>

      <p className="mt-6 text-sm text-ink-500">
        Inte en akuttjänst – ring 112 vid nödfall.
      </p>
    </Shell>
  );
}
