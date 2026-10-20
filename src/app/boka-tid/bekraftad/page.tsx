import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import { BookingConfirmedEvent } from "@/components/BookingConfirmedEvent";
import { singleSearchParam, type SearchParamValue } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Tiden är bekräftad – Specialistdirekt",
  robots: { index: false, follow: false },
};

// Bekräftelsemarkören ligger i en kortlivad cookie och får inte fastna i en
// statisk sida eller delas mellan besökare via en mellanliggande cache.
export const dynamic = "force-dynamic";

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: SearchParamValue }>;
}) {
  const event = singleSearchParam((await searchParams).event);
  const marker = (await cookies()).get("sd-booking-confirmed")?.value;
  const [status = "", markerEvent = ""] = marker?.split(":", 2) ?? [];
  const validTransition =
    /^[a-f0-9]{32}$/.test(event) &&
    event === markerEvent &&
    (status === "confirmed" || status === "conflict");

  return (
    <main className="content-shell">
      {validTransition && <BookingConfirmedEvent eventId={event} />}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="readable-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-ink-900">
            {validTransition ? "Tiden är bekräftad" : "Ingen ny bekräftelse att visa"}
          </h1>
          <div className="mt-4 grid gap-3 text-ink-700">
            {!validTransition ? (
              <p>
                Öppna den personliga länken i bokningsmejlet om du vill kontrollera status eller
                hantera din bokning.
              </p>
            ) : status === "conflict" ? (
              <p className="warning-card p-4 text-sm">
                Tiden hade hunnit bli upptagen. Vi har tagit emot din bekräftelse och hör av oss
                för att ordna en tid åt dig – du behöver inte göra något mer.
              </p>
            ) : (
              <p>
                Vi har noterat din bekräftelse. Uppgifterna om besöket och din personliga
                avbokningslänk finns i mejlet.
              </p>
            )}
            <p className="text-sm text-ink-500">Inte en akuttjänst – ring 112 vid nödfall.</p>
          </div>
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
