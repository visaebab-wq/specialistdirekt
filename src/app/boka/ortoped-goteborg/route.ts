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

/**
 * Vilken SPECIALISTDIREKT-SIDA klicket kom ifrån.
 *
 * Fältet `ref` (HTTP Referer) saknades i 61 % av de mänskliga klicken. Orsaken
 * är strukturell: Referer sätts av klienten och uteblir helt normalt vid
 * direktnavigering, bokmärken, vissa in-app-webbläsare och integritetstillägg.
 * Webbläsarfördelningen motsäger dessutom "integritetsbrowser"-hypotesen –
 * Chrome/Windows var den största gruppen UTAN referer medan Safari/iPhone var
 * den största MED. Vi kan alltså inte bygga intern attribution på den headern.
 *
 * CTA:n vet däremot alltid vilken sida den själv sitter på. Den skickar därför
 * med sökvägen explicit som `src`, och den läses här.
 *
 * Värdet är klientstyrt, så det saneras: bara en enkel intern sökväg sparas,
 * aldrig querysträng eller fragment (kan innehålla känsliga parametrar) och
 * aldrig något som inte ser ut som en sökväg på sajten.
 */
const SAFE_PATH = /^\/[A-Za-z0-9À-ſ/_-]{0,80}$/;
function cleanPath(raw: string | null): string {
  if (!raw) return "";
  const path = raw.split("?")[0].split("#")[0];
  return SAFE_PATH.test(path) ? path : "(invalid)";
}

/** CTA-id, t.ex. "hero" eller "doctor-profile". Samma sanering, kortare. */
function cleanCta(raw: string | null): string {
  if (!raw) return "";
  return /^[a-z0-9_-]{1,40}$/i.test(raw) ? raw : "(invalid)";
}

/** Extern hänvisare – bara värdnamnet, aldrig hela URL:en med dess parametrar. */
function referrerHost(ref: string): string {
  if (!ref) return "";
  try {
    const host = new URL(ref).host;
    return host === "specialistdirekt.se" || host === "www.specialistdirekt.se" ? "" : host;
  } catch {
    return "(invalid)";
  }
}

/**
 * Bot-klassning. Returnerar en ORSAK i stället för bara true/false, så att en
 * felklassning går att spåra i efterhand utan att gissa.
 *
 * Tre kända falska negativ hittades i historiken 2026-09-28: naken
 * "Mozilla/5.0" utan plattformsdel, "Mozilla/5.0 SDRecheck" (eget
 * övervakningsskript) och UA:n "pc" (med referer från m.baidu.com). Ingen av
 * dem är en webbläsare, men ingen matchade de tidigare mönstren heller.
 *
 * Reglerna är medvetet konservativa: en riktig patient får hellre räknas som
 * människa än tvärtom. Klassningen styr ENBART analys, aldrig åtkomst.
 */
function classifyBot(ua: string): { bot: boolean; reason: string } {
  if (ua === "") return { bot: true, reason: "no_ua" };
  if (
    /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview|curl|wget|python|go-http|java\/|okhttp|node-fetch|axios|libwww|httpclient|headless|phantom|puppeteer|playwright|scrapy|monitor|uptime|dataforseo|semrush/i.test(
      ua,
    )
  ) {
    return { bot: true, reason: "known_crawler_or_tool" };
  }
  if (
    /googleother|google-|ahrefs|amazonbot|petalbot|yandex|applebot|perplexity|bytespider|meta-external|dotbot|barkrowler|imagesift/i.test(
      ua,
    )
  ) {
    return { bot: true, reason: "known_crawler_no_bot_token" };
  }
  // Eget återkontrollskript – inte en besökare.
  if (/sdrecheck/i.test(ua)) return { bot: true, reason: "internal_check" };
  // En riktig webbläsare skickar alltid en plattformsdel, "Mozilla/5.0 (…".
  // Naken "Mozilla/5.0" och strängar som "pc" är automatiserade anrop.
  if (!/\(/.test(ua) || ua.length < 25) return { bot: true, reason: "non_browser_ua" };
  return { bot: false, reason: "" };
}

export async function GET(req: Request) {
  try {
    const file = join(process.cwd(), ".data", "booking-clicks.jsonl");
    mkdirSync(dirname(file), { recursive: true });
    const ua = req.headers.get("user-agent") || "";
    const ref = req.headers.get("referer") || "";
    const params = new URL(req.url).searchParams;
    const { bot, reason } = classifyBot(ua);
    appendFileSync(
      file,
      JSON.stringify({
        at: new Date().toISOString(),
        target: "ortoped-goteborg",
        // Intern källa: sätts av CTA:n, oberoende av Referer-headern.
        source_path: cleanPath(params.get("src")),
        cta: cleanCta(params.get("cta")),
        // Extern hänvisare hålls åtskild från den interna källan.
        referrer_host: referrerHost(ref),
        bot,
        bot_reason: reason,
        // 300, inte 160: crawlern skriver sitt namn SIST i UA-strängen, och vid
        // 160 kapades det bort ("…(compatible; GoogleO") så att loggen inte gick
        // att analysera i efterhand.
        ua: ua.slice(0, 300),
        // Poster utan detta fält är v1 (före 2026-09-28) och saknar source_path.
        event_version: 2,
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
