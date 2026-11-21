// maila-bokningar.mjs — skickar en sammanställning av ALLA bokningar
// (booking-klick + inkomna tidsförfrågningar) till din inkorg.
//
// Kör på servern, från projektmappen:
//   1) Sätt SMTP_PASS i .env.local (app-lösenord, inte ditt vanliga lösenord).
//   2) node maila-bokningar.mjs
//
// Val (miljövariabler):
//   TO=nagon@annan.se     – explicit mottagare (annars BOOKING_TO_EMAIL/LEAD_TO_EMAIL)
//   MONTH=2026-08         – filtrera på månad (default: alla)
//   DRY=1                 – visa bara antal, utan personuppgifter eller mottagare
//   LEAD_LOG_FILE=/tmp/... och BOOKING_CLICK_LOG_FILE=/tmp/... – isolerad körning
//   SKIP_JOURNAL=1        – hoppa över import av historiska journald-leads
//
// Källor: .data/booking-clicks.jsonl, .data/leads.jsonl och journalctl
// (äldre leads som bara hann logga innan .data/leads.jsonl fanns).

import { execFileSync } from "node:child_process";
import { readFileSync, writeSync } from "node:fs";
import { resolve } from "node:path";
import nodemailer from "nodemailer";
import {
  LEGACY_LEAD_JOURNAL_ARGS,
  parseLegacyJournalLeads,
} from "./booking-journal.mjs";

const ROOT = new URL(".", import.meta.url).pathname;
const MONTH = process.env.MONTH || "";
const DRY = process.env.DRY === "1";
const SKIP_JOURNAL = process.env.SKIP_JOURNAL === "1";

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
const SMTP_HOST = process.env.SMTP_HOST || env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || env.SMTP_PORT || "587";
const SMTP_USER = process.env.SMTP_USER || env.SMTP_USER;
// Avsändaradress. Behövs när inloggningskontot (t.ex. Zoho) skiljer sig från
// adressen patienten ska se; utan SMTP_FROM används inloggningen som förut.
const SMTP_FROM = process.env.SMTP_FROM || env.SMTP_FROM || SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS || env.SMTP_PASS;
const configuredRecipient =
  process.env.TO ||
  process.env.BOOKING_TO_EMAIL ||
  process.env.LEAD_TO_EMAIL ||
  env.BOOKING_TO_EMAIL ||
  env.LEAD_TO_EMAIL ||
  "";
const TO = /[\r\n]/.test(configuredRecipient) ? "" : configuredRecipient.trim();
const configuredPath = (value, fallback) => resolve(ROOT, value || fallback);
const LEAD_LOG_FILE = configuredPath(
  process.env.LEAD_LOG_FILE || env.LEAD_LOG_FILE,
  ".data/leads.jsonl",
);
const BOOKING_CLICK_LOG_FILE = configuredPath(
  process.env.BOOKING_CLICK_LOG_FILE || env.BOOKING_CLICK_LOG_FILE,
  ".data/booking-clicks.jsonl",
);

// --- 2. Hjälpare ---
const sv = (iso) =>
  new Date(iso).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", hour12: false });

// Bot-mönster: samma som i route.ts PLUS crawlers vars UA saknar ordet "bot"
// (GoogleOther, AhrefsSiteAudit m.fl.) – de räknades tidigare som människor.
const BOT_UA =
  // OBS: "googleo" (inte "googleother") – UA:t kapas till 160 tecken vid loggning,
  // så GoogleOther-crawlern står som "(compatible; GoogleO" i filen.
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview|curl|wget|python|go-http|java\/|okhttp|node-fetch|axios|libwww|httpclient|headless|phantom|puppeteer|playwright|scrapy|monitor|uptime|dataforseo|semrush|googleo|google-|ahrefs|amazonbot|petalbot|yandex|applebot|perplexity|bytespider|meta-external/i;
const isBot = (d) =>
  typeof d.bot === "boolean" ? d.bot : !d.ua || BOT_UA.test(d.ua);

const readJsonl = (file) => {
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    return [];
  }

  const records = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) records.push(parsed);
    } catch {
      // En trasig eller partiell rad får inte dölja alla övriga poster.
    }
  }
  return records;
};

const textField = (value) => (typeof value === "string" ? value : "");
const validTimestamp = (value) => {
  if (typeof value !== "string" || value === "") return false;
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString() === value;
};
const dateList = (value) =>
  Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];

// Filtrera på svensk kalendermånad, inte UTC (annars hamnar t.ex. 1 aug 00:30
// svensk tid i juli).
const inMonth = (iso) => !MONTH || sv(iso).startsWith(MONTH);

// Kort namn på crawlern, för läsbarhet i mejlet.
const botName = (ua = "") =>
  (ua.match(
    /(ClaudeBot|GPTBot|Googlebot|GoogleOther|GoogleO|AhrefsSiteAudit|AhrefsBot|SERankingBacklinksBot|Amazonbot|MJ12bot|bingbot|SemrushBot|PetalBot|YandexBot|Applebot|curl|wget|python)/i,
  ) || ["okänd bot/verktyg"])[0];

const botLabel = (event) =>
  typeof event.bot_reason === "string" && /^[a-z0-9_]{1,60}$/i.test(event.bot_reason)
    ? event.bot_reason.replaceAll("_", " ")
    : botName(event.ua);

// --- 3. Booking-klick ---
const clicks = readJsonl(BOOKING_CLICK_LOG_FILE)
  .filter((d) => validTimestamp(d.at) && inMonth(d.at))
  .map((d) => ({
    at: d.at,
    target: textField(d.target),
    source_path: textField(d.source_path),
    cta: textField(d.cta),
    bot: typeof d.bot === "boolean" ? d.bot : undefined,
    bot_reason: textField(d.bot_reason),
    ua: textField(d.ua),
  }));
const human = clicks.filter((d) => !isBot(d));
const botClicks = clicks.filter(isBot);

// --- 4. Tidsförfrågningar: .data/leads.jsonl + äldre ur journalen ---
const fileLeads = readJsonl(LEAD_LOG_FILE)
  .filter((l) => validTimestamp(l.receivedAt))
  .map((l) => ({
    receivedAt: l.receivedAt,
    name: textField(l.name),
    email: textField(l.email),
    phone: textField(l.phone),
    specialty: textField(l.specialty),
    city: textField(l.city),
    message: textField(l.message),
    preferredDates: dateList(l.preferredDates),
    timePreference: textField(l.timePreference),
    källa: "leads.jsonl",
  }))
  .filter((lead) => lead.name || lead.email);

let journalLeads = [];
try {
  if (SKIP_JOURNAL) throw new Error("journal import disabled");
  // -o short-iso ger tidsstämpel per rad ("2026-08-06T11:34:59+0200 …"),
  // annars går månadsfiltret inte att tillämpa på journal-leads.
  const raw = execFileSync(
    "journalctl",
    LEGACY_LEAD_JOURNAL_ARGS,
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  journalLeads = parseLegacyJournalLeads(raw);
} catch (error) {
  // Journalen kan ha roterats bort – då får vi bara det som finns i filen.
  if (!SKIP_JOURNAL) {
    const code =
      typeof error?.code === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(error.code)
        ? error.code
        : "unavailable";
    console.error(`[bokningsarkiv] journalimport hoppades över (code=${code}).`);
  }
}

// Slå ihop: journal-leads som redan finns i leads.jsonl (samma e-post + datum) hoppas över.
const key = (l) => `${(l.email || "").toLowerCase()}|${(l.preferredDates || []).join(",")}`;
const seen = new Set(fileLeads.map(key));
const leads = [...journalLeads.filter((l) => !seen.has(key(l))), ...fileLeads].filter(
  (l) => !l.receivedAt || inMonth(l.receivedAt),
);

// DRY är en driftkontroll, inte en alternativ exportkanal. Skriv aldrig
// patientuppgifter, signerade länkar eller mottagaradresser till terminal/
// journald där loggar ofta sparas längre och läses av fler än inkorgen.
if (DRY) {
  writeSync(
    1,
    `DRY: ${leads.length} tidsförfrågningar och ${clicks.length} bokningsklick; ` +
      "inget mejl skickades och inga personuppgifter visas.\n",
  );
  process.exit(0);
}

if (!TO) {
  writeSync(
    2,
    "Kan inte skicka: ange en behörig mottagare via TO, BOOKING_TO_EMAIL eller LEAD_TO_EMAIL.\n",
  );
  process.exit(1);
}

// --- 5. Bygg mejlet ---
const tid = (l) =>
  l.timePreference === "before-noon" ? "Före lunch" : l.timePreference === "after-noon" ? "Efter lunch" : l.timePreference || "";

const period = MONTH ? `för ${MONTH}` : "(alla hittills)";
const plain = (value = "") =>
  String(value)
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[\r\n\u2028\u2029]+/g, " ");

const textLines = [
  `SPECIALISTDIREKT – sammanställning av bokningar ${period}`,
  ``,
  `1) TIDSFÖRFRÅGNINGAR VIA FORMULÄRET: ${leads.length} st`,
  ``,
  ...leads.flatMap((l, i) => [
    `#${i + 1}  ${l.receivedAt ? sv(l.receivedAt) : "(tid ur journalen)"}`,
    `    Namn:        ${plain(l.name)}`,
    `    E-post:      ${plain(l.email)}`,
    `    Telefon:     ${plain(l.phone)}`,
    `    Stad:        ${plain(l.city || "(ej angivet)")}`,
    `    Specialitet: ${plain(l.specialty || "(ej angivet)")}`,
    `    Datum:       ${plain((l.preferredDates || []).join(" / ") || "(ej angivet)")}   ${plain(tid(l))}`,
    `    Meddelande:  ${plain(l.message)}`,
    `    Källa:       ${plain(l.källa)}`,
    ``,
  ]),
  `2) BOKNINGSKLICK (till bokningssidan): ${clicks.length} loggade`,
  `    Riktiga människor: ${human.length}`,
  `    Bots/verktyg:      ${botClicks.length}`,
  ``,
  ...human.map(
    (d) =>
      `    MÄNNISKA  ${sv(d.at)}  ${plain(d.target)}` +
      `${d.source_path ? `  källa: ${plain(d.source_path)}` : ""}` +
      `${d.cta ? `  cta: ${plain(d.cta)}` : ""}`,
  ),
  ``,
  `    Exkluderade (bots/verktyg):`,
  ...botClicks.map((d) => `      ${sv(d.at)}  ${plain(botLabel(d))}`),
  ``,
  `OBS: detta är KLICK vidare till bokningssidan. Genomförda bokningar`,
  `finns i den separata bokningsjournalen.`,
];
const text = textLines.join("\n");

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function safeMailto(email) {
  const value = String(email ?? "").trim();
  const at = value.lastIndexOf("@");
  if (at <= 0 || at !== value.indexOf("@")) return "";

  const local = value.slice(0, at);
  const labels = value.slice(at + 1).split(".");
  const validLocal =
    local.length <= 64 &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local);
  const validDomain =
    labels.length >= 2 &&
    labels.every(
      (label) =>
        label.length >= 1 &&
        label.length <= 63 &&
        /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label),
    );
  if (!validLocal || !validDomain) return "";

  // Koda URI-avgränsare även i en syntaktiskt giltig local-part.
  return `mailto:${encodeURIComponent(local)}@${labels.map(encodeURIComponent).join(".")}`;
}

function emailCell(email) {
  const href = safeMailto(email);
  return href ? `<a href="${esc(href)}">${esc(email)}</a>` : esc(email);
}

function phoneCell(phone) {
  const value = String(phone ?? "").trim();
  const valid = /^[+0-9 ()-]+$/.test(value) && value.replace(/\D/g, "").length >= 6;
  return valid
    ? `<a href="tel:${esc(encodeURIComponent(value))}">${esc(value)}</a>`
    : esc(value);
}

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
      <tr><td style="font-weight:bold">E-post</td><td>${emailCell(l.email)}</td></tr>
      <tr><td style="font-weight:bold">Telefon</td><td>${phoneCell(l.phone)}</td></tr>
      <tr><td style="font-weight:bold">Stad</td><td>${esc(l.city || "(ej angivet)")}</td></tr>
      <tr><td style="font-weight:bold">Specialitet</td><td>${esc(l.specialty || "(ej angivet)")}</td></tr>
      <tr><td style="font-weight:bold">Datum</td><td>${esc((l.preferredDates || []).join(" / ") || "(ej angivet)")} — ${esc(tid(l))}</td></tr>
      <tr><td style="font-weight:bold">Meddelande</td><td>${esc(l.message)}</td></tr>
      <tr><td style="font-weight:bold">Källa</td><td style="color:#64748b">${esc(l.källa)}</td></tr>
    </table>`,
          )
          .join("")
  }

  <h3>2) Bokningsklick till bokningssidan (${clicks.length} loggade)</h3>
  <p><b>Riktiga människor: ${human.length}</b> · Bots/verktyg: ${botClicks.length}</p>
  <table cellpadding="6" style="border-collapse:collapse;border:1px solid #e2e8f0">
    <tr style="background:#f1f5f9"><th align="left">Tid</th><th align="left">Typ</th><th align="left">Intern källa</th></tr>
    ${human
      .map(
        (d) =>
          `<tr><td>${esc(sv(d.at))}</td><td>Människa</td><td>${esc(d.source_path || "(saknas)")}${d.cta ? ` · ${esc(d.cta)}` : ""}</td></tr>`,
      )
      .join("")}
    ${botClicks
      .map(
        (d) =>
          `<tr style="color:#94a3b8"><td>${esc(sv(d.at))}</td><td>${esc(botLabel(d))}</td><td>${esc(d.source_path || "")}</td></tr>`,
      )
      .join("")}
  </table>

  <p style="color:#64748b;font-size:12px">
    Detta är <b>klick</b> vidare till bokningssidan. Genomförda bokningar finns i
    den separata bokningsjournalen.
  </p>
</div>`;

const subject = `Specialistdirekt – bokningar ${MONTH || "hittills"}: ${leads.length} förfrågningar, ${human.length} bokningsklick`;

// --- 6. Skicka ---
if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  const configured = { SMTP_HOST, SMTP_USER, SMTP_PASS };
  const saknas = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !configured[k]);
  console.error(`Kan inte skicka: ${saknas.join(", ")} saknas/är tom i miljön.`);
  console.error(`Kör "DRY=1 node maila-bokningar.mjs" för att se innehållet utan att skicka.`);
  process.exit(1);
}

const smtpPort = Number(SMTP_PORT);
const baseTransport = {
  host: SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort !== 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
};

const errorSummary = (err) => {
  const safe = (value) =>
    typeof value === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(value) ? value : undefined;
  const code = safe(err?.code) || "unknown";
  const command = safe(err?.command);
  const responseCode = Number.isInteger(err?.responseCode) ? err.responseCode : undefined;
  return [
    `code=${code}`,
    ...(command ? [`command=${command}`] : []),
    ...(responseCode !== undefined ? [`responseCode=${responseCode}`] : []),
  ].join(";");
};

const message = {
  from: `"Specialistdirekt" <${SMTP_FROM}>`,
  to: TO,
  subject,
  text,
  html,
};

async function send() {
  try {
    await nodemailer.createTransport(baseTransport).sendMail(message);
    return;
  } catch (err) {
    const allowInsecureTls =
      (process.env.SMTP_ALLOW_INSECURE_TLS || env.SMTP_ALLOW_INSECURE_TLS) === "1" &&
      (process.env.SMTP_STRICT_TLS || env.SMTP_STRICT_TLS) !== "1";
    const certificateError = /certificate|self.signed|altname/i.test(
      `${err?.reason ?? ""} ${err?.message ?? ""}`,
    );
    if (!allowInsecureTls || !certificateError) throw err;
    console.warn(
      `SMTP-certifikatet på ${SMTP_HOST} gick inte att verifiera (${errorSummary(err)}). ` +
        "Ett uttryckligen tillåtet nödförsök görs utan certifikatkontroll.",
    );
  }

  await nodemailer
    .createTransport({ ...baseTransport, tls: { rejectUnauthorized: false } })
    .sendMail(message);
}

try {
  await send();
  console.log(`Klart: skickade ${leads.length} förfrågningar + ${clicks.length} klick till ${TO}.`);
} catch (err) {
  // Nodemailer-fel kan innehålla mottagare eller SMTP-svar med meddelandedata.
  console.error("Kunde inte skicka mejlet:", errorSummary(err));
  process.exit(1);
}
