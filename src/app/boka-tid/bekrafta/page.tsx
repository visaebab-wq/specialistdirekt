import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_PRICE_SEK, formatSlot } from "@/lib/booking-slots";
import { findBooking, pendingBookingValidity, verifySignature } from "@/lib/booking-store";
import { singleSearchParam, type SearchParamValue } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Bekräfta din tid – Specialistdirekt",
  robots: { index: false, follow: false },
  // URL:en innehåller bokningsnyckeln. no-referrer gäller även när besökaren
  // klickar vidare efter en klientnavigering, då svarsheadern från
  // next.config.ts inte längre är den som styr.
  referrer: "no-referrer",
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
  searchParams: Promise<{
    id?: SearchParamValue;
    sig?: SearchParamValue;
    fel?: SearchParamValue;
  }>;
}) {
  const params = await searchParams;
  const id = singleSearchParam(params.id);
  const sig = singleSearchParam(params.sig);
  const technicalError = singleSearchParam(params.fel) === "tekniskt";

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

  const rec = findBooking(id);

  if (!rec || rec.status === "cancelled") {
    const rebookPath = rec?.bookingType === "child" ? "/boka-tid/barn" : "/boka-tid";
    return (
      <Shell title={rec?.status === "cancelled" ? "Tiden är avbokad" : "Bokningen hittades inte"}>
        <p>
          {rec?.status === "cancelled"
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

  if (rec.status === "pending") {
    const validity = pendingBookingValidity(rec);
    if (!validity.ok) {
      const rebookPath = rec.bookingType === "child" ? "/boka-tid/barn" : "/boka-tid";
      return (
        <Shell title="Bekräftelselänken har gått ut">
          <p>
            Tiden reserverades i två timmar och kan inte längre bekräftas med den här länken.
            Välj en ny ledig tid nedan.
          </p>
          <p>
            <Link href={rebookPath} className="font-semibold text-brand-700 hover:underline">
              Välj en ny tid
            </Link>
          </p>
        </Shell>
      );
    }
  }

  const alreadyVerified = rec.status === "verified";

  return (
    <Shell title={alreadyVerified ? "Tiden är bekräftad" : "Bekräfta din tid"}>
      {technicalError && (
        <p role="alert" className="warning-card p-4 text-sm">
          Bekräftelsen kunde inte sparas just nu. Försök igen om en stund.
        </p>
      )}
      <p>
        <strong>{formatSlot(rec.slot)}</strong>
        <br />
        Dr Masoud Sorkhabi, Göteborg
        <br />
        Pris: {BOOKING_PRICE_SEK} kr
      </p>
      {rec.conflict ? (
        <p className="warning-card p-4 text-sm">
          Tiden hade hunnit bli upptagen. Vi har tagit emot din bekräftelse och hör av oss för att
          ordna en tid åt dig – du behöver inte göra något mer.
        </p>
      ) : alreadyVerified ? (
        <p>Vi har noterat din bekräftelse. Din personliga avbokningslänk finns även i mejlet.</p>
      ) : (
        <>
          <p>Kontrollera uppgifterna ovan och bekräfta sedan bokningen.</p>
          {/* Bekräftelsen sker med POST. Mejlklienter och säkerhetsskannrar kan
              öppna länken automatiskt, men får aldrig bekräfta tiden åt patienten. */}
          <form action="/boka-tid/bekrafta/utfor" method="post" className="mt-4">
            <input type="hidden" name="id" value={rec.id} />
            <input type="hidden" name="sig" value={sig} />
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Bekräfta tiden
            </button>
          </form>
        </>
      )}
      {alreadyVerified && !rec.conflict && (
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
