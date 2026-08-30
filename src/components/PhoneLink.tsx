"use client";

import { site } from "@/lib/site";

type Gtag = (...args: unknown[]) => void;

/**
 * Telefonlänk med klickmätning.
 *
 * NAMNGIVNING: sajtens tre befintliga händelser (booking_submitted,
 * booking_confirmed, mr_request_submitted) mäter alla ett UTFALL och skickas när
 * något faktiskt har hänt. Det finns i dag ingen klickmätning alls. Därför heter
 * den här `phone_call_started` och inte `phone_click` – ett påbörjat samtal är
 * ett utfall från besökarens sida, och namnet håller ihop med de andra tre.
 *
 * Ingen Ads-etikett: numret finns inte i site.adsConversionLabels, så ingen
 * Ads-konvertering utlöses. Vill man räkna samtal som konvertering är det ett
 * eget beslut i Ads-gränssnittet, inte något den här komponenten avgör.
 *
 * Mätningen får aldrig hindra samtalet: gtag-anropet ligger i try/catch och
 * länken är en vanlig <a href="tel:">, så den fungerar även utan JavaScript.
 */
export function PhoneLink({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phone}`}
      className={className}
      onClick={() => {
        try {
          const w = window as unknown as { gtag?: Gtag };
          w.gtag?.("event", "phone_call_started");
        } catch {
          /* mätning får aldrig stoppa ett samtal */
        }
      }}
    >
      {site.phoneDisplay}
    </a>
  );
}
