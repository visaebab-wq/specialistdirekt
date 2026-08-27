"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

type Gtag = (...args: unknown[]) => void;

/**
 * Skickar en GA4-händelse en gång, när komponenten monteras.
 *
 * Använder det gtag som laddas av <Analytics /> – inga nya mät-ID:n införs här.
 *
 * VÄNTAR IN gtag i stället för att skicka rakt av. Analytics-skriptet laddas med
 * strategin afterInteractive, och på en sida som monterar den här komponenten
 * direkt vid sidladdning (bekräftelsesidan) hinner React köra effekten INNAN
 * window.gtag finns. Ett enkelt gtag?.(...) blev då en tyst no-op och
 * konverteringen registrerades aldrig – exakt det som hände i skarp miljö.
 */
export function TrackEvent({
  name,
  params,
}: {
  name: string;
  params?: Record<string, string | number>;
}) {
  useEffect(() => {
    const w = window as unknown as { gtag?: Gtag };
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Ger upp efter ~10 s. Då är GA antingen blockerat eller avstängt, och en
    // händelse som skickas långt senare säger ändå inget om besöket.
    const deadline = Date.now() + 10_000;

    const send = () => {
      if (stopped) return;
      if (typeof w.gtag === "function") {
        w.gtag("event", name, params ?? {});

        // Google Ads-konvertering, för de händelser som har en etikett i
        // site.adsConversionLabels. Skickas som ett EGET anrop: GA4-händelsen och
        // Ads-konverteringen är två olika mottagare, och ett `send_to` på
        // GA4-händelsen hade skickat den till Ads i stället för till båda.
        const label = site.adsConversionLabels[name];
        if (site.adsConversionId && label) {
          w.gtag("event", "conversion", {
            send_to: `${site.adsConversionId}/${label}`,
          });
        }
        return;
      }
      if (Date.now() > deadline) return;
      timer = setTimeout(send, 200);
    };
    send();

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
    // Endast vid montering – händelsen ska inte skickas om vid varje omrendering.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
