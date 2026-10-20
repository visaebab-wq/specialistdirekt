"use client";

import {
  CONSENT_REOPEN_EVENT,
  CONSENT_RETURN_FOCUS_KEY,
  withdrawAnalyticsConsent,
} from "@/lib/analytics-consent";

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
      data-cookie-settings-button
      className={className}
      onClick={(event) => {
        try {
          sessionStorage.setItem(CONSENT_RETURN_FOCUS_KEY, "1");
        } catch {
          /* ignore */
        }
        // Ta bort samtycket och mätcookies direkt – analyslyssnaren stoppar
        // befintliga taggar innan bannern öppnas igen.
        withdrawAnalyticsConsent();
        window.dispatchEvent(
          new CustomEvent(CONSENT_REOPEN_EVENT, {
            detail: { returnFocusTo: event.currentTarget },
          }),
        );
      }}
    >
      {label}
    </button>
  );
}
