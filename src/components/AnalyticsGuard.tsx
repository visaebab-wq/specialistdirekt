"use client";

import { useEffect } from "react";
import { isSensitivePath } from "@/lib/sensitive-routes";

type AnyFn = (...args: unknown[]) => unknown;

/**
 * Håller sajtens EGNA händelser borta från dataLayer på token-bärande vyer.
 *
 * Nätverksskyddet ligger inte här. Det sköts av två andra lager:
 *   1. <Analytics /> renderar ingen tagg alls på de här vägarna (vanlig
 *      sidladdning – så kommer man hit från mejlet).
 *   2. Utgångsfiltret i sensitive-routes.ts kastar anrop i sändningsögonblicket
 *      (klientnavigering i ett dokument där taggen redan finns).
 *
 * Den här komponenten gör en tredje sak: den byter window.gtag mot en funktion
 * som kastar anropet, så att t.ex. `booking_confirmed` aldrig läggs i kö. Ett
 * köat event hade annars följt med till nästa sida. Affärshändelsen – att tiden
 * bekräftas eller avbokas – sker på servern och påverkas inte.
 *
 * Återställs när vyn lämnas, så vanliga sidor behåller sin mätning.
 */
export function AnalyticsGuard({ pathname }: { pathname: string }) {
  useEffect(() => {
    if (!isSensitivePath(pathname)) return;
    const w = window as unknown as Record<string, unknown>;
    const orig = w.gtag as AnyFn | undefined;
    w.gtag = ((..._args: unknown[]) => undefined) as AnyFn;
    return () => {
      if (orig) w.gtag = orig;
      else delete w.gtag;
    };
  }, [pathname]);

  return null;
}
