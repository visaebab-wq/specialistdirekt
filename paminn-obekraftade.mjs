// paminn-obekraftade.mjs — påminner den som bokat men ännu inte bekräftat.
//
// En obekräftad bokning håller sin lucka i två timmar (BOOKING_PENDING_TTL_MS i
// src/lib/booking-slots.ts) och släpps sedan automatiskt. Det här skriptet
// skickar EN påminnelse innan dess, med bekräftelselänken, så att ingen förlorar
// sin tid för att mejlet drunknade. Skriptet släpper aldrig en lucka och rör
// aldrig bokningsloggen – det läser den och skickar mejl.
//
// Körs av systemd-timern paminn-obekraftade.timer var tionde minut.
// Manuellt, från projektmappen:
//   node paminn-obekraftade.mjs          # skickar
//   DRY=1 node paminn-obekraftade.mjs    # visar antal utan personuppgifter
//
// Miljövariabler:
//   DRY=1               – skicka inte; skriv bara en säker sammanfattning
//   REMIND_AFTER_MIN=60 – ålder då påminnelsen skickas (default 60)
//   BOOKING_LOG_FILE=... – alternativ bokningslogg (statusfilen följer med)
//   REMINDER_LOG_FILE=... – explicit alternativ statusfil
//
// Idempotens: skickade påminnelser loggas i .data/booking-reminders.jsonl.
// Medvetet en EGEN fil – bookings.jsonl är bokningssystemets händelselogg och
// ska bara innehålla created/verified/cancelled. En okänd händelsetyp där skulle
// vara en risk för allBookings() utan att ge oss något.

import { appendFileSync, chmodSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { createHmac } from "node:crypto";
import { join, dirname } from "node:path";
import nodemailer from "nodemailer";

const ROOT = new URL(".", import.meta.url).pathname;
const DRY = process.env.DRY === "1";

// Måste matcha src/lib/booking-slots.ts. Ändras TTL:n där ska den ändras här.
const PENDING_TTL_MIN = 120;
// Marginal så en påminnelse aldrig skickas i samma stund som luckan släpps –
// då vore uppmaningen "bekräfta nu" redan osann när mejlet landar.
const REMIND_BEFORE_MIN = PENDING_TTL_MIN - 5;
const REMIND_AFTER_MIN = Number(process.env.REMIND_AFTER_MIN || 60);
if (
  !Number.isFinite(REMIND_AFTER_MIN) ||
  REMIND_AFTER_MIN < 0 ||
  REMIND_AFTER_MIN > REMIND_BEFORE_MIN
) {
  console.error(
    `[paminnelse] REMIND_AFTER_MIN måste vara ett tal mellan 0 och ${REMIND_BEFORE_MIN} – inget skickades.`,
  );
  process.exit(1);
}

const DOCTOR = "Dr Masoud Sorkhabi";

// --- .env.local (samma enkla parser som övriga skript här) ---
const env = {};
try {
  for (const line of readFileSync(join(ROOT, ".env.local"), "utf8").split("\n")) {
    if (line.trim().startsWith("#")) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("Kunde inte läsa .env.local – kör skriptet från projektmappen.");
  process.exit(1);
}
const SMTP_HOST = process.env.SMTP_HOST || env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || env.SMTP_PORT || "465";
const SMTP_USER = process.env.SMTP_USER || env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS || env.SMTP_PASS;
const BASE =
  process.env.BOOKING_BASE_URL || env.BOOKING_BASE_URL || "https://specialistdirekt.se";

// Samma krav som secret() i src/lib/booking-store.ts. En påminnelse får aldrig
// signeras med en offentlig fallback-nyckel.
const SECRET = process.env.BOOKING_SECRET || env.BOOKING_SECRET;
if (!SECRET || SECRET.length < 16) {
  console.error("[paminnelse] BOOKING_SECRET saknas eller är för kort – inget skickades.");
  process.exit(1);
}
const sign = (id) =>
  createHmac("sha256", SECRET).update(id).digest("hex").slice(0, 32);

const configuredBookingLog = process.env.BOOKING_LOG_FILE || env.BOOKING_LOG_FILE;
const configuredReminderLog = process.env.REMINDER_LOG_FILE || env.REMINDER_LOG_FILE;
const BOOKINGS = configuredBookingLog || join(ROOT, ".data", "bookings.jsonl");
// En syntetisk/staging-bokningslogg får aldrig läsa eller skriva projektets
// riktiga påminnelsestatus. Utan uttrycklig override följer statusfilen därför
// med BOOKING_LOG_FILE till samma katalog.
const REMINDERS =
  configuredReminderLog ||
  (configuredBookingLog
    ? join(dirname(BOOKINGS), "booking-reminders.jsonl")
    : join(ROOT, ".data", "booking-reminders.jsonl"));
const reminderPathIsCustom = Boolean(configuredReminderLog || configuredBookingLog);

// --- Läs händelseloggen på samma sätt som allBookings() ---
function isUsableCreatedEvent(event) {
  if (!event || typeof event !== "object") return false;
  for (const field of ["id", "email", "createdAt", "slot"]) {
    if (typeof event[field] !== "string" || event[field].trim() === "") return false;
  }
  return Number.isFinite(Date.parse(event.createdAt)) && Number.isFinite(Date.parse(event.slot));
}

function readBookings() {
  if (!existsSync(BOOKINGS)) return [];
  if (!configuredBookingLog) chmodSync(dirname(BOOKINGS), 0o700);
  chmodSync(BOOKINGS, 0o600);
  const recs = new Map();
  for (const line of readFileSync(BOOKINGS, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let ev;
    try {
      ev = JSON.parse(line);
    } catch {
      continue; // en trasig rad ska inte stoppa påminnelserna
    }
    const type = ev.type || "created";
    if (type === "created") {
      // En syntaktiskt korrekt men ofullständig/ogiltig JSON-rad ska inte kunna
      // stoppa hela körningen i datumformatteringen. Hoppa över den tyst så att
      // varken personuppgifter eller trasigt innehåll hamnar i driftloggen.
      if (!isUsableCreatedEvent(ev)) continue;
      recs.set(ev.id, { ...ev, status: "pending" });
    } else if (recs.has(ev.id)) {
      if (type === "verified") recs.get(ev.id).status = "verified";
      else if (type === "cancelled") recs.get(ev.id).status = "cancelled";
    }
  }
  return [...recs.values()];
}

function alreadyReminded() {
  if (!existsSync(REMINDERS)) return new Set();
  if (!reminderPathIsCustom) chmodSync(dirname(REMINDERS), 0o700);
  chmodSync(REMINDERS, 0o600);
  const ids = new Set();
  for (const line of readFileSync(REMINDERS, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      ids.add(JSON.parse(line).id);
    } catch {
      /* ignorera trasig rad */
    }
  }
  return ids;
}

const formatSlot = (iso) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));

// --- Vilka ska påminnas? ---
const now = Date.now();
const reminded = alreadyReminded();

const due = readBookings().filter((r) => {
  if (r.status !== "pending") return false;          // redan bekräftad eller avbokad
  if (reminded.has(r.id)) return false;              // en påminnelse räcker
  if (!r.email) return false;                        // ingen adress att skriva till
  const ageMin = (now - Date.parse(r.createdAt)) / 60000;
  if (ageMin < REMIND_AFTER_MIN) return false;       // för tidigt – de har gott om tid
  if (ageMin > REMIND_BEFORE_MIN) return false;      // luckan är redan släppt
  if (Date.parse(r.slot) <= now) return false;       // tiden har redan passerat
  return true;
});

if (due.length === 0) {
  console.log(`[paminnelse] inget att skicka (${new Date().toISOString()})`);
  process.exit(0);
}

if (DRY) {
  console.log(
    `[paminnelse] DRY: ${due.length} påminnelse${due.length === 1 ? "" : "r"} skulle skickas; inga personuppgifter visas`,
  );
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  requireTLS: Number(SMTP_PORT) !== 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

let sent = 0;
let failed = 0;
const failureCounts = new Map();

const mailErrorSummary = (err) => {
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

for (const rec of due) {
  const when = formatSlot(rec.slot);
  const confirm = `${BASE}/boka-tid/bekrafta?id=${rec.id}&sig=${sign(rec.id)}`;
  const cancel = `${BASE}/boka-tid/avboka?id=${rec.id}&sig=${sign(rec.id)}`;
  const minutesLeft = Math.max(
    1,
    Math.round(PENDING_TTL_MIN - (now - Date.parse(rec.createdAt)) / 60000),
  );

  const text = [
    `Hej ${rec.name || ""},`.trim(),
    "",
    `Din tid hos ${DOCTOR} är ännu inte bekräftad:`,
    "",
    `    ${when}`,
    "",
    `Tiden är preliminär. Bekräftar du den inte inom cirka ${minutesLeft} minuter`,
    "släpps den automatiskt och kan bokas av någon annan.",
    "",
    "Bekräfta här:",
    "",
    confirm,
    "",
    "Vill du inte längre ha tiden behöver du inte göra något – då släpps den av",
    "sig själv. Du kan också avboka direkt här:",
    "",
    cancel,
    "",
    "Specialistdirekt – https://specialistdirekt.se",
    "Inte en akuttjänst – ring 112 vid nödfall.",
  ].join("\n");

  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `<!doctype html><html lang="sv"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f4f7f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#10161a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
    <table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:12px;padding:28px">
      <tr><td>
        <p style="margin:0 0 16px">Hej ${esc(rec.name || "")},</p>
        <p style="margin:0 0 16px">Din tid hos ${esc(DOCTOR)} är ännu inte bekräftad:</p>
        <p style="margin:0 0 20px;font-size:17px;font-weight:600">${esc(when)}</p>
        <p style="margin:0 0 20px">Tiden är preliminär. Bekräftar du den inte inom cirka
          <strong>${minutesLeft} minuter</strong> släpps den automatiskt och kan bokas av någon annan.</p>
        <p style="margin:0 0 24px">
          <a href="${esc(confirm)}" style="display:inline-block;background:#0d9488;color:#fff;text-decoration:none;padding:13px 26px;border-radius:10px;font-weight:600">Bekräfta tiden</a>
        </p>
        <p style="margin:0 0 8px;font-size:14px;color:#3a474d">Vill du inte längre ha tiden behöver du inte göra något – då släpps den av sig själv.
          Du kan också <a href="${esc(cancel)}" style="color:#0b6c74">avboka direkt här</a>.</p>
        <p style="margin:24px 0 0;font-size:13px;color:#66767d">Specialistdirekt – specialistdirekt.se<br>Inte en akuttjänst – ring 112 vid nödfall.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const subject = `Din tid ${when} är inte bekräftad än – ${DOCTOR}`;

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: rec.email,
      subject,
      text,
      html,
    });
    // Loggas FÖRST efter att mejlet gått iväg – annars kunde en misslyckad
    // sändning markeras som påmind och personen aldrig få någon påminnelse.
    const reminderParent = dirname(REMINDERS);
    const reminderParentExisted = existsSync(reminderParent);
    mkdirSync(reminderParent, { recursive: true, mode: 0o700 });
    if (!reminderParentExisted || !reminderPathIsCustom) chmodSync(reminderParent, 0o700);
    if (existsSync(REMINDERS)) chmodSync(REMINDERS, 0o600);
    // Id:t är allt som behövs för idempotens. Tid och besökstid skulle bara
    // skapa ytterligare hälsorelaterad metadata med egen lagringstid.
    appendFileSync(REMINDERS, JSON.stringify({ id: rec.id }) + "\n", { mode: 0o600 });
    chmodSync(REMINDERS, 0o600);
    sent++;
  } catch (err) {
    failed++;
    const summary = mailErrorSummary(err);
    failureCounts.set(summary, (failureCounts.get(summary) || 0) + 1);
  }
}

console.log(`[paminnelse] klart: ${sent} skickade, ${failed} misslyckade`);
for (const [summary, count] of failureCounts) {
  console.error(`[paminnelse] fel ${summary}; antal=${count}`);
}

// Låt Node tömma stdout/stderr innan processen avslutas; process.exit() kan
// kapa den aggregerade driftloggen när skriptet körs av systemd eller via pipe.
process.exitCode = failed > 0 ? 1 : 0;
