import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_PRICE_SEK, formatSlot } from "@/lib/booking-slots";
import { findBooking, verifyBooking, verifySignature } from "@/lib/booking-store";
import { sendOwnerVerified } from "@/lib/booking-email";
import { TrackEvent } from "@/components/TrackEvent";

export const metadata: Metadata = {
  title: "Bekräfta din tid – Specialistdirekt",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="content-shell">
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="readable-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
          <div className="mt-4 grid gap-3 text-ink-700">{children}</div>
          <Link
            href="/"
            className="mt-7 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Till startsidan
          </Link>
        </div>
      </section>
    </main>
  );
}

export default async function BekraftaPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; sig?: string }>;
}) {
  const { id = "", sig = "" } = await searchParams;

  // Signaturen måste stämma. Utan den skulle vem som helst kunna bekräfta
  // andras bokningar genom att gissa id.
  if (!id || !sig || !verifySignature(id, sig)) {
    return (
      <Shell title="Länken gäller inte">
        <p>
          Länken är ofullständig eller har ändrats. Öppna den direkt från mejlet, eller{" "}
          <Link href="/kontakt" className="font-semibold text-brand-700 hover:underline">
            kontakta oss
          </Link>{" "}
          så hjälper vi dig.
        </p>
      </Shell>
    );
  }

  const existing = findBooking(id);
  const alreadyVerified = existing?.status === "verified";
  const result = verifyBooking(id);

  if (!result.ok) {
    const rebookPath = existing?.bookingType === "child" ? "/boka-tid/barn" : "/boka-tid";
    return (
      <Shell title={result.reason === "cancelled" ? "Tiden är avbokad" : "Bokningen hittades inte"}>
        <p>
          {result.reason === "cancelled"
            ? "Den här tiden är avbokad. Vill du boka en ny tid gör du det nedan."
            : "Vi hittar ingen bokning för den här länken."}
        </p>
        <p>
          <Link href={rebookPath} className="font-semibold text-brand-700 hover:underline">
            Välj en ny tid
          </Link>
        </p>
      </Shell>
    );
  }

  // Notisera mottagaren – men bara första gången, så att ett omladdat fönster
  // inte skickar samma mejl om och om igen.
  if (!alreadyVerified) {
    await sendOwnerVerified(result.record, result.conflict).catch((err) =>
      console.error("[booking] Kunde inte skicka bekräftelsenotis", err),
    );
  }

  return (
    <Shell title={alreadyVerified ? "Tiden är redan bekräftad" : "Tack – din tid är bekräftad"}>
      {/* Konvertering: bokningen är bekräftad av patienten. Skickas bara första
          gången, så att en omladdad flik inte räknas som ännu en bokning. */}
      {!alreadyVerified && <TrackEvent name="booking_confirmed" />}
      <p>
        <strong>{formatSlot(result.record.slot)}</strong>
        <br />
        Dr Masoud Sorkhabi, Göteborg
        <br />
        Pris: {BOOKING_PRICE_SEK} kr
      </p>
      {result.conflict ? (
        <p className="warning-card p-4 text-sm">
          Tiden hade hunnit bli upptagen. Vi har tagit emot din bekräftelse och hör av oss för att
          ordna en tid åt dig – du behöver inte göra något mer.
        </p>
      ) : (
        <p>Vi har noterat din bekräftelse. Din personliga avbokningslänk finns även i mejlet.</p>
      )}
      {!result.conflict && (
        <p>
          <Link
            href={`/boka-tid/avboka?id=${encodeURIComponent(id)}&sig=${encodeURIComponent(sig)}`}
            className="inline-flex rounded-full border border-ink-300 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            Avboka tiden
          </Link>
        </p>
      )}
      <p className="text-sm text-ink-500">Inte en akuttjänst – ring 112 vid nödfall.</p>
    </Shell>
  );
}
