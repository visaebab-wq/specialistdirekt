"use client";

import { CONSENT_KEY, CONSENT_REOPEN_EVENT } from "./CookieConsent";

// Låter besökaren ändra eller återkalla sitt cookie-samtycke i efterhand, utan
// att behöva rensa webbläsarens lagring. Ett samtycke som inte går att ta
// tillbaka lika enkelt som det gavs är inget giltigt samtycke.
//
// Vi nollställer valet och öppnar bannern igen, i stället för att bygga en egen
// panel: bannern är redan platsen där omfattningen står beskriven.
export function CookieSettingsButton({
  className,
  label = "Cookie-inställningar",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {
          /* ignore */
        }
        // Ta bort samtycket direkt – valet ska gälla från klicket, inte först
        // när besökaren svarat i bannern igen.
        const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        gtag?.("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
      }}
    >
      {label}
    </button>
  );
}
