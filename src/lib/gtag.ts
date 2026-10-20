"use client";

import { site } from "./site";
import {
  analyticsConsentGranted,
  CONSENT_CHANGE_EVENT,
  CONSENT_SYNC_EVENT,
} from "./analytics-consent";

type Gtag = (...args: unknown[]) => void;

/**
 * Händelser med ett slumpat event-id dedupliceras bara i den aktuella fliken
 * och först efter samtycke. Äldre kod skrev bokningsmarkörer permanent i
 * localStorage även när besökaren hade nekat mätning.
 */
function markEventOnce(name: string, params?: Record<string, string | number>): boolean {
  const eventId = params?.event_id ?? params?.transaction_id;
  if (eventId === undefined) return true;
  try {
    const key = `sd-analytics-event:${name}:${String(eventId).slice(0, 128)}`;
    if (window.sessionStorage.getItem(key)) return false;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Blockerad sessionslagring får inte slå ut mätning som användaren godkänt.
  }
  return true;
}

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
  let finished = false;
  let waitingForGtag = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let deadline = 0;

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };

  const finish = () => {
    finished = true;
    waitingForGtag = false;
    clearTimer();
    window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    window.removeEventListener(CONSENT_SYNC_EVENT, onConsentChange);
  };

  const send = () => {
    if (stopped || finished) return;
    // Samtycket kan ha återkallats medan vi väntade på att gtag skulle laddas.
    if (!analyticsConsentGranted()) {
      waitingForGtag = false;
      clearTimer();
      return;
    }
    if (typeof w.gtag === "function") {
      if (!markEventOnce(name, params)) {
        finish();
        return;
      }
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
      finish();
      return;
    }
    if (Date.now() > deadline) {
      finish();
      return;
    }
    timer = setTimeout(send, 200);
  };

  function startAfterConsent() {
    if (stopped || finished || waitingForGtag || !analyticsConsentGranted()) return;
    waitingForGtag = true;
    deadline = Date.now() + 10_000;
    send();
  }

  function onConsentChange() {
    if (!analyticsConsentGranted()) {
      waitingForGtag = false;
      clearTimer();
      return;
    }
    startAfterConsent();
  }

  window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  window.addEventListener(CONSENT_SYNC_EVENT, onConsentChange);
  startAfterConsent();

  return () => {
    stopped = true;
    clearTimer();
    window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    window.removeEventListener(CONSENT_SYNC_EVENT, onConsentChange);
  };
}
