"use client";

import { useEffect, useRef } from "react";
import { sendGtagEvent } from "@/lib/gtag";

/**
 * Registrerar bara övergången från väntande till bekräftad. Markören tas bort
 * ur adressfältet direkt, så en omladdning inte räknas som en ny konvertering.
 */
export function BookingConfirmedEvent({ eventId }: { eventId: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const url = new URL(window.location.href);
    url.searchParams.delete("event");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);

    // sendGtagEvent väntar på uttryckligt analyssamtycke och deduplicerar först
    // då i sessionStorage. Ingen bokningsmarkör sparas permanent före samtycke.
    return sendGtagEvent("booking_confirmed", {
      event_id: eventId,
      transaction_id: eventId,
    });
  }, [eventId]);

  return null;
}
