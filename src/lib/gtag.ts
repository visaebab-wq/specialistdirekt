"use client";

import { site } from "./site";

type Gtag = (...args: unknown[]) => void;

/**
 * Skickar en GA4-händelse så snart gtag finns.
 *
 * VÄNTAR IN gtag i stället för att skicka rakt av: Analytics-skriptet laddas med
 * strategin afterInteractive, och en händelse som avfyras vid sidladdning hinner
 * annars före. Ett enkelt gtag?.(…) blev då en tyst no-op och konverteringen
 * registrerades aldrig – exakt det som hände i skarp miljö en gång.
 *
 * Ger upp efter ~10 s. Då är GA antingen blockerat eller avstängt, och en
 * händelse som skickas långt senare säger ändå inget om besöket.
 *
 * Returnerar en avbrytarfunktion (för useEffect-cleanup).
 */
export function sendGtagEvent(
  name: string,
  params?: Record<string, string | number>,
): () => void {
  const w = window as unknown as { gtag?: Gtag };
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
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
        const transactionId = params?.transaction_id ?? params?.event_id;
        w.gtag("event", "conversion", {
          send_to: `${site.adsConversionId}/${label}`,
          ...(transactionId ? { transaction_id: String(transactionId) } : {}),
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
}
