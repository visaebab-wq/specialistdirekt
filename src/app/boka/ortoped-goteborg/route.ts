// Samtyckesstyrd förstapartsmätning för direktbokning. När ett uttryckligt ja
// finns räknas klicket lokalt på servern, och besökaren skickas alltid vidare.

import { Buffer } from "node:buffer";
import { appendFileSync, chmodSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { CONSENT_KEY } from "@/lib/analytics-consent";

// Pekar numera på sajtens egen bokning i stället för patient.nu.
const TARGET = "/boka-tid";
const MAX_CLICK_LOG_BYTES = 5 * 1024 * 1024;

// Route-handler måste köras per anrop (aldrig cachas).
export const dynamic = "force-dynamic";

function redirectToBooking(): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: TARGET,
      "Cache-Control": "private, no-store",
    },
  });
}

// Next skulle annars auto-implementera HEAD genom att köra GET, vilket kan
// registrera en kontroll/prefetch som ett riktigt CTA-klick.
export function HEAD() {
  return redirectToBooking();
}

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

/** Godkänn bara det exakta, versionerade val som vår samtyckesdialog skriver. */
function hasGrantedAnalyticsCookie(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;

  let found = false;
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;

    const name = part.slice(0, separator).trim();
    if (name !== CONSENT_KEY) continue;

    // Flera cookies med samma namn men olika path/domain ska inte kunna göra
    // ett tvetydigt val till ett ja. Ett avvikande värde stänger därför av loggning.
    if (part.slice(separator + 1).trim() !== "granted") return false;
    found = true;
  }

  return found;
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
  const purpose = `${req.headers.get("purpose") || ""} ${req.headers.get("sec-purpose") || ""}`;
  const isPrefetch =
    req.headers.get("next-router-prefetch") === "1" || /\bprefetch\b/i.test(purpose);

  // Next/Browser-prefetch är ingen mänsklig CTA-klickning och får inte
  // förorena konverteringsloggen. Omdirigeringen ska ändå fungera.
  if (isPrefetch || !hasGrantedAnalyticsCookie(req.headers.get("cookie"))) {
    return redirectToBooking();
  }

  try {
    const file =
      process.env.BOOKING_CLICK_LOG_FILE ||
      join(process.cwd(), ".data", "booking-clicks.jsonl");
    const ua = req.headers.get("user-agent") || "";
    const params = new URL(req.url).searchParams;
    const { bot, reason } = classifyBot(ua);
    const line =
      JSON.stringify({
        at: new Date().toISOString(),
        target: "ortoped-goteborg",
        // Intern källa: sätts av CTA:n, oberoende av Referer-headern.
        source_path: cleanPath(params.get("src")),
        cta: cleanCta(params.get("cta")),
        bot,
        bot_reason: reason,
        // v3 lagrar varken User-Agent eller hänvisare och kräver samtyckescookien.
        event_version: 3,
      }) + "\n";

    const fileExists = existsSync(/* turbopackIgnore: true */ file);
    const currentBytes = fileExists
      ? statSync(/* turbopackIgnore: true */ file).size
      : 0;

    // När taket nåtts avstår vi från fler poster. Vi roterar eller skriver aldrig
    // över historiken i en besökares request, och om filkontrollen misslyckas
    // fångas felet nedan så att omdirigeringen ändå alltid fungerar.
    if (currentBytes + Buffer.byteLength(line, "utf8") <= MAX_CLICK_LOG_BYTES) {
      const parent = dirname(file);
      const parentExisted = existsSync(/* turbopackIgnore: true */ parent);
      mkdirSync(/* turbopackIgnore: true */ parent, { recursive: true, mode: 0o700 });
      if (!parentExisted || !process.env.BOOKING_CLICK_LOG_FILE)
        chmodSync(/* turbopackIgnore: true */ parent, 0o700);
      if (fileExists) chmodSync(/* turbopackIgnore: true */ file, 0o600);
      appendFileSync(/* turbopackIgnore: true */ file, line, { mode: 0o600 });
      chmodSync(/* turbopackIgnore: true */ file, 0o600);
    }
  } catch {
    // Spårning får aldrig blockera själva bokningen.
  }
  // RELATIV Location, avsiktligt. Appen kör bakom nginx på 127.0.0.1:3000, så
  // req.url innehåller den interna adressen – en absolut omdirigering skickade
  // besökaren till localhost:3000 och bokningen dog där. Webbläsaren löser en
  // relativ Location mot den publika värden och hamnar rätt oavsett miljö.
  return redirectToBooking();
}
