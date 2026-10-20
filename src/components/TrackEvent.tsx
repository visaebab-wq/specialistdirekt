"use client";

import { useEffect } from "react";
import { sendGtagEvent } from "@/lib/gtag";

/**
 * Skickar en GA4-händelse en gång, när komponenten monteras.
 *
 * Själva sändningen (inkl. att vänta in gtag och att spegla händelsen som
 * Ads-konvertering) ligger i sendGtagEvent, så att klick-händelser och
 * monterings-händelser aldrig kan hamna i otakt med varandra.
 */
export function TrackEvent({
  name,
  params,
}: {
  name: string;
  params?: Record<string, string | number>;
}) {
  useEffect(() => {
    return sendGtagEvent(name, params);
    // Endast vid montering – händelsen ska inte skickas om vid varje omrendering.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
