import Script from "next/script";
import { site } from "@/lib/site";

// Webbanalys. Två alternativ stöds:
//  - Google Analytics 4 (site.gaMeasurementId) – sätter cookies.
//  - Plausible (NEXT_PUBLIC_PLAUSIBLE_DOMAIN) – cookiefritt, ingen banner krävs.
export function Analytics() {
  const ga = site.gaMeasurementId;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
// Consent Mode v2: allt nekat som standard tills besökaren samtycker (GDPR).
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
// Återställ tidigare val direkt (om besökaren redan samtyckt).
try {
  if (localStorage.getItem('cookie-consent') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${ga}');`}
          </Script>
        </>
      )}

      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
