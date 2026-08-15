// maila-bokningar.mjs — skickar en sammanställning av ALLA bokningar
// (booking-klick + inkomna tidsförfrågningar) till din inkorg.
//
// Kör på servern, från projektmappen:
//   1) Sätt SMTP_PASS i .env.local (app-lösenord, inte ditt vanliga lösenord).
//   2) node maila-bokningar.mjs
//
// Val (miljövariabler):
//   TO=nagon@annan.se     – annan mottagare (default: visaeb.ab@gmail.com)
//   MONTH=2026-08         – filtrera på månad (default: alla)
//   DRY=1                 – skriv ut mejlet i terminalen istället för att skicka
//
// Källor: .data/booking-clicks.jsonl, .data/leads.jsonl och journalctl
// (äldre leads som bara hann logga innan .data/leads.jsonl fanns).

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

const TO = process.env.TO || "visaeb.ab@gmail.com";
const MONTH = process.env.MONTH || "";
const DRY = process.env.DRY === "1";

// --- 1. Läs .env.local (enkel KEY=VALUE-parser) ---
const env = {};
try {
  for (const line of readFileSync(new URL("./.env.local", import.meta.url), "utf8").split("\n")) {
    if (line.trim().startsWith("#")) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("Kunde inte läsa .env.local – kör skriptet från projektmappen.");
  process.exit(1);
}
const { SMTP_HOST, SMTP_PORT = "587", SMTP_USER, SMTP_PASS } = env;

// --- 2. Hjälpare ---
const sv = (iso) =>
  new Date(iso).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", hour12: false });

// Bot-mönster: samma som i route.ts PLUS crawlers vars UA saknar ordet "bot"
// (GoogleOther, AhrefsSiteAudit m.fl.) – de räknades tidigare som människor.
const BOT_UA =
  // OBS: "googleo" (inte "googleother") – UA:t kapas till 160 tecken vid loggning,
  // så GoogleOther-crawlern står som "(compatible; GoogleO" i filen.
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview|curl|wget|python|go-http|java\/|okhttp|node-fetch|axios|libwww|httpclient|headless|phantom|puppeteer|playwright|scrapy|monitor|uptime|dataforseo|semrush|googleo|google-|ahrefs|amazonbot|petalbot|yandex|applebot|perplexity|bytespider|meta-external/i;
const isBot = (d) => d.bot === true || !d.ua || BOT_UA.test(d.ua);

const readJsonl = (file) => {
  try {
    return readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch {
    return [];
  }
};

// Filtrera på svensk kalendermånad, inte UTC (annars hamnar t.ex. 1 aug 00:30
// svensk tid i juli).
const inMonth = (iso) => !MONTH || sv(iso).startsWith(MONTH);

// Kort namn på crawlern, för läsbarhet i mejlet.
const botName = (ua = "") =>
  (ua.match(
    /(ClaudeBot|GPTBot|Googlebot|GoogleOther|GoogleO|AhrefsSiteAudit|AhrefsBot|SERankingBacklinksBot|Amazonbot|MJ12bot|bingbot|SemrushBot|PetalBot|YandexBot|Applebot|curl|wget|python)/i,
  ) || ["okänd bot/verktyg"])[0];

// --- 3. Booking-klick ---
const clicks = readJsonl(".data/booking-clicks.jsonl").filter((d) => inMonth(d.at));
const human = clicks.filter((d) => !isBot(d));
const botClicks = clicks.filter(isBot);

// --- 4. Tidsförfrågningar: .data/leads.jsonl + äldre ur journalen ---
const fileLeads = readJsonl(".data/leads.jsonl").map((l) => ({ ...l, källa: "leads.jsonl" }));

let journalLeads = [];
try {
  // -o short-iso ger tidsstämpel per rad ("2026-08-06T11:34:59+0200 …"),
  // annars går månadsfiltret inte att tillämpa på journal-leads.
  const raw = execSync(
    `journalctl -u specialistdirekt --no-pager -o short-iso 2>/dev/null | grep -A9 "\\[lead\\] Ny förfrågan"`,
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024, shell: "/bin/bash" },
  );
  // Dela upp i block: en ny lead börjar på varje "[lead] Ny förfrågan"-rad,
  // och tidsstämpeln är första ordet på just den raden.
  const blocks = [];
  for (const line of raw.split("\n")) {
    if (line.includes("[lead] Ny förfrågan")) {
      blocks.push({ at: line.split(/\s+/)[0], text: line });
    } else if (blocks.length && line.trim() !== "--") {
      blocks[blocks.length - 1].text += "\n" + line;
    }
  }
  for (const { at, text: block } of blocks) {
    const g = (k) => (block.match(new RegExp(`${k}:\\s*'([^']*)'`)) || [])[1] || "";
    const dates = ((block.match(/preferredDates:\s*\[([^\]]*)\]/) || [])[1] || "")
      .split(",")
      .map((s) => s.trim().replace(/'/g, ""))
      .filter(Boolean);
    if (!g("name") && !g("email")) continue;
    journalLeads.push({
      receivedAt: new Date(at).toISOString(),
      name: g("name"),
      email: g("email"),
      phone: g("phone"),
      specialty: g("specialty"),
      city: g("city"),
      message: g("message"),
      preferredDates: dates,
      timePreference: g("timePreference"),
      källa: "journal (message avkortat till 80 tecken)",
    });
  }
} catch {
  // Journalen kan ha roterats bort – då får vi bara det som finns i filen.
}

// Slå ihop: journal-leads som redan finns i leads.jsonl (samma e-post + datum) hoppas över.
const key = (l) => `${(l.email || "").toLowerCase()}|${(l.preferredDates || []).join(",")}`;
const seen = new Set(fileLeads.map(key));
const leads = [...journalLeads.filter((l) => !seen.has(key(l))), ...fileLeads].filter(
  (l) => !l.receivedAt || inMonth(l.receivedAt),
);

// --- 5. Bygg mejlet ---
const tid = (l) =>
  l.timePreference === "before-noon" ? "Före lunch" : l.timePreference === "after-noon" ? "Efter lunch" : l.timePreference || "";

const period = MONTH ? `för ${MONTH}` : "(alla hittills)";

const textLines = [
  `SPECIALISTDIREKT – sammanställning av bokningar ${period}`,
  ``,
  `1) TIDSFÖRFRÅGNINGAR VIA FORMULÄRET: ${leads.length} st`,
  ``,
  ...leads.flatMap((l, i) => [
    `#${i + 1}  ${l.receivedAt ? sv(l.receivedAt) : "(tid ur journalen)"}`,
    `    Namn:        ${l.name}`,
    `    E-post:      ${l.email}`,
    `    Telefon:     ${l.phone}`,
    `    Stad:        ${l.city || "(ej angivet)"}`,
    `    Specialitet: ${l.specialty || "(ej angivet)"}`,
    `    Datum:       ${(l.preferredDates || []).join(" / ") || "(ej angivet)"}   ${tid(l)}`,
    `    Meddelande:  ${l.message}`,
    `    Källa:       ${l.källa}`,
    ``,
  ]),
  `2) BOKNINGSKLICK (till patient.nu-kalendern): ${clicks.length} loggade`,
  `    Riktiga människor: ${human.length}`,
  `    Bots/verktyg:      ${botClicks.length}`,
  ``,
  ...human.map((d) => `    MÄNNISKA  ${sv(d.at)}  ${d.target}  ref: ${d.ref || "(ingen)"}\n              ${d.ua}`),
  ``,
  `    Exkluderade (bots/verktyg):`,
  ...botClicks.map((d) => `      ${sv(d.at)}  ${botName(d.ua)}`),
  ``,
  `OBS: detta är KLICK vidare till bokningskalendern. Vilka som faktiskt`,
  `bokade en tid ser du i ditt konto hos patient.nu.`,
];
const text = textLines.join("\n");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const html = `
<div style="font-family:sans-serif;max-width:760px">
  <h2>Specialistdirekt – bokningar ${esc(period)}</h2>

  <h3>1) Tidsförfrågningar via formuläret (${leads.length} st)</h3>
  ${
    leads.length === 0
      ? "<p>Inga.</p>"
      : leads
          .map(
            (l, i) => `
    <table cellpadding="6" style="border-collapse:collapse;margin-bottom:18px;border:1px solid #e2e8f0">
      <tr><td colspan="2" style="background:#f1f5f9;font-weight:bold">#${i + 1} · ${
        l.receivedAt ? esc(sv(l.receivedAt)) : "(tid ur journalen)"
      }</td></tr>
      <tr><td style="font-weight:bold">Namn</td><td>${esc(l.name)}</td></tr>
      <tr><td style="font-weight:bold">E-post</td><td><a href="mailto:${esc(l.email)}">${esc(l.email)}</a></td></tr>
      <tr><td style="font-weight:bold">Telefon</td><td><a href="tel:${esc(l.phone)}">${esc(l.phone)}</a></td></tr>
      <tr><td style="font-weight:bold">Stad</td><td>${esc(l.city || "(ej angivet)")}</td></tr>
      <tr><td style="font-weight:bold">Specialitet</td><td>${esc(l.specialty || "(ej angivet)")}</td></tr>
      <tr><td style="font-weight:bold">Datum</td><td>${esc((l.preferredDates || []).join(" / ") || "(ej angivet)")} — ${esc(tid(l))}</td></tr>
      <tr><td style="font-weight:bold">Meddelande</td><td>${esc(l.message)}</td></tr>
      <tr><td style="font-weight:bold">Källa</td><td style="color:#64748b">${esc(l.källa)}</td></tr>
    </table>`,
          )
          .join("")
  }

  <h3>2) Bokningsklick till patient.nu (${clicks.length} loggade)</h3>
  <p><b>Riktiga människor: ${human.length}</b> · Bots/verktyg: ${botClicks.length}</p>
  <table cellpadding="6" style="border-collapse:collapse;border:1px solid #e2e8f0">
    <tr style="background:#f1f5f9"><th align="left">Tid</th><th align="left">Vem</th><th align="left">Referrer</th></tr>
    ${human
      .map(
        (d) =>
          `<tr><td>${esc(sv(d.at))}</td><td>Människa — ${esc(d.ua)}</td><td>${esc(d.ref || "(ingen)")}</td></tr>`,
      )
      .join("")}
    ${botClicks
      .map(
        (d) =>
          `<tr style="color:#94a3b8"><td>${esc(sv(d.at))}</td><td>${esc(botName(d.ua))}</td><td>${esc(d.ref || "")}</td></tr>`,
      )
      .join("")}
  </table>

  <p style="color:#64748b;font-size:12px">
    Detta är <b>klick</b> vidare till bokningskalendern. Vilka som faktiskt bokade tid
    ser du i ditt konto hos patient.nu.
  </p>
</div>`;

const subject = `Specialistdirekt – bokningar ${MONTH || "hittills"}: ${leads.length} förfrågningar, ${human.length} bokningsklick`;

// --- 6. Skicka ---
if (DRY) {
  console.log(`TILL: ${TO}\nÄMNE: ${subject}\n\n${text}`);
  process.exit(0);
}

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  const saknas = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !env[k]);
  console.error(`Kan inte skicka: ${saknas.join(", ")} saknas/är tom i .env.local.`);
  console.error(`Kör "DRY=1 node maila-bokningar.mjs" för att se innehållet utan att skicka.`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.sendMail({
    from: `"Specialistdirekt" <${SMTP_USER}>`,
    to: TO,
    subject,
    text,
    html,
  });
  console.log(`Klart: skickade ${leads.length} förfrågningar + ${clicks.length} klick till ${TO}.`);
} catch (err) {
  console.error("Kunde inte skicka mejlet:", err.message);
  process.exit(1);
}
