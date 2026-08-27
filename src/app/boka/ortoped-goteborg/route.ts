// Klick-spårning för direktbokning. Loggar varje klick server-side (durabelt,
// funkar även med adblock) och skickar sedan vidare till bokningssidan.
// Så kan vi räkna HUR MÅNGA som går från sajten till bokningen.

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

// Pekar numera på sajtens egen bokning i stället för patient.nu. Klickspårningen
// nedan behålls oförändrad, så siffrorna går att jämföra före och efter bytet.
const TARGET = "/boka-tid";

// Route-handler måste köras per anrop (aldrig cachas).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const file = join(process.cwd(), ".data", "booking-clicks.jsonl");
    mkdirSync(dirname(file), { recursive: true });
    const ua = req.headers.get("user-agent") || "";
    // Bot/automatiserat om UA saknas eller matchar crawler-/verktygsmönster
    // (curl, wget, python, headless m.fl. – så att egna tester inte räknas som riktiga klick).
    //
    // Andra raden: crawlers vars UA INTE innehåller ordet "bot" och som därför
    // räknades som riktiga besökare. GoogleOther var värst – den såg ut som en
    // vanlig Android-Chrome ända fram till "(compatible; GoogleOther)" på slutet.
    const isBot =
      ua === "" ||
      /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview|curl|wget|python|go-http|java\/|okhttp|node-fetch|axios|libwww|httpclient|headless|phantom|puppeteer|playwright|scrapy|monitor|uptime|dataforseo|semrush/i.test(
        ua,
      ) ||
      /googleother|google-|ahrefs|amazonbot|petalbot|yandex|applebot|perplexity|bytespider|meta-external|dotbot|barkrowler|imagesift/i.test(
        ua,
      );
    appendFileSync(
      file,
      JSON.stringify({
        at: new Date().toISOString(),
        target: "ortoped-goteborg",
        ref: req.headers.get("referer") || "",
        bot: isBot,
        // 300, inte 160: crawlern skriver sitt namn SIST i UA-strängen, och vid
        // 160 kapades det bort ("…(compatible; GoogleO") så att loggen inte gick
        // att analysera i efterhand.
        ua: ua.slice(0, 300),
      }) + "\n",
    );
  } catch {
    // Spårning får aldrig blockera själva bokningen.
  }
  // RELATIV Location, avsiktligt. Appen kör bakom nginx på 127.0.0.1:3000, så
  // req.url innehåller den interna adressen – en absolut omdirigering skickade
  // besökaren till localhost:3000 och bokningen dog där. Webbläsaren löser en
  // relativ Location mot den publika värden och hamnar rätt oavsett miljö.
  return new Response(null, { status: 302, headers: { Location: TARGET } });
}
