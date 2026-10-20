// backup-bokningar.mjs — säkerhetskopierar bokningar och tidsförfrågningar och
// mejlar uppgifterna till inkorgen.
//
// Körs var sjätte timme av booking-backup.timer. Manuellt:
//   node backup-bokningar.mjs
//
// Val (miljövariabler):
//   DRY=1     – skicka inte mejl; skriv bara ut antal poster
//   FORCE=1   – mejla även om inget ändrats sedan förra utskicket
//   TO=...    – annan mottagare än BOOKING_TO_EMAIL
//
// Två saker händer:
//   1. Datafilerna kopieras till /root/backups/bokningsdata/ med tidsstämpel.
//   2. Uppgifterna mejlas som CSV-bilagor. Mejlet är också den enda kopian som
//      hamnar UTANFÖR servern – dör disken finns bokningarna kvar i inkorgen.
//
// Mejlet skickas bara när något faktiskt ändrats sedan förra utskicket. Varje
// bokning notifieras redan direkt när den kommer in; det här är arkivet, och ett
// identiskt mejl var sjätte timme skulle bara göra att man slutar läsa dem.

import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import nodemailer from "nodemailer";

const PROJECT = new URL("./", import.meta.url).pathname;
const DATA = join(PROJECT, ".data");
const DEST = "/root/backups/bokningsdata";
const STATE = join(DEST, ".senast-mailad");
const KEEP = 120; // 30 dygn med fyra körningar per dygn
const TZ = "Europe/Stockholm";

const DRY = process.env.DRY === "1";
const FORCE = process.env.FORCE === "1";

// --- .env.local ------------------------------------------------------------
const env = {};
try {
  for (const line of readFileSync(join(PROJECT, ".env.local"), "utf8").split("\n")) {
    if (line.trim().startsWith("#")) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("Kunde inte läsa .env.local – kör skriptet från projektmappen.");
  process.exit(1);
}
const TO = process.env.TO || env.BOOKING_TO_EMAIL || env.LEAD_TO_EMAIL;

// --- hjälpare --------------------------------------------------------------
const readJsonl = (file) => {
  const p = join(DATA, file);
  if (!existsSync(p)) return [];
  return readFileSync(p, "utf8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
};

const sv = (iso) =>
  iso
    ? new Date(iso).toLocaleString("sv-SE", { timeZone: TZ, hour12: false }).replace("T", " ")
    : "";

/** Bokningarnas nuvarande tillstånd, framräknat ur den append-only loggen. */
function bookings() {
  const byId = new Map();
  for (const ev of readJsonl("bookings.jsonl")) {
    if (ev.type === "created") {
      const { type, ...rec } = ev;
      byId.set(rec.id, { ...rec });
    } else {
      const rec = byId.get(ev.id);
      if (!rec) continue;
      if (ev.type === "verified") {
        rec.status = "verified";
        rec.verifiedAt = ev.at;
      }
      if (ev.type === "cancelled") {
        rec.status = "cancelled";
        rec.cancelledAt = ev.at;
      }
    }
  }
  return [...byId.values()].sort((a, b) => a.slot.localeCompare(b.slot));
}

const STATUS = { pending: "Ej bekräftad", verified: "Bekräftad", cancelled: "Avbokad" };

/** CSV med semikolon och BOM – öppnas rätt i svenska Excel. */
function csv(headers, rows) {
  const cell = (v) => {
    let s = String(v ?? "");
    // Kalkylblad kan tolka användarinnehåll som formler även i en CSV-fil.
    // Neutralisera farliga första tecken (också efter inledande blank/control)
    // innan den vanliga CSV-citeringen görs.
    if (/^[\u0000-\u0020]*[=+\-@]/.test(s) || /^[\u0000-\u001f]/.test(s)) s = `'${s}`;
    return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return "﻿" + [headers, ...rows].map((r) => r.map(cell).join(";")).join("\r\n");
}

// --- 1. Kopiera datafilerna ------------------------------------------------
const stamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..*/, "")
  .replace("T", "-");
mkdirSync(DEST, { recursive: true, mode: 0o700 });
chmodSync(DEST, 0o700);
if (existsSync(DATA)) chmodSync(DATA, 0o700);

const copied = [];
for (const file of ["bookings.jsonl", "leads.jsonl", "booking-clicks.jsonl"]) {
  const src = join(DATA, file);
  if (!existsSync(src)) continue;
  chmodSync(src, 0o600);
  const out = join(DEST, `${file.replace(".jsonl", "")}-${stamp}.jsonl`);
  copyFileSync(src, out);
  chmodSync(out, 0o600);
  copied.push(out);
}

// Gallra: behåll de senaste KEEP per filtyp.
for (const prefix of ["bookings-", "leads-", "booking-clicks-"]) {
  const files = readdirSync(DEST, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.startsWith(prefix))
    .map((entry) => entry.name)
    .sort()
    .reverse();
  // Äldre kopior kan ha skapats före de privata filrättigheterna infördes.
  // Härda även dem innan gallringen så att kvarvarande historik blir 0600.
  for (const snapshot of files) chmodSync(join(DEST, snapshot), 0o600);
  for (const old of files.slice(KEEP)) unlinkSync(join(DEST, old));
}

// --- 2. Bygg underlaget ----------------------------------------------------
const bs = bookings();
const active = bs.filter((b) => b.status !== "cancelled");
const leads = readJsonl("leads.jsonl");

const bookingCsv = csv(
  [
    "Tid",
    "Bokningstyp",
    "Kontaktperson",
    "Barnets namn",
    "Barnets födelsedatum",
    "E-post",
    "Telefon",
    "Ärende",
    "Status",
    "Bokad",
    "Bekräftad",
    "Avbokad",
    "Boknings-id",
  ],
  bs.map((b) => [
    sv(b.slot),
    b.bookingType === "child" ? "Barn" : "Vuxen",
    b.name,
    b.childName || "",
    b.childBirthDate || "",
    b.email,
    b.phone,
    b.message,
    STATUS[b.status] ?? b.status,
    sv(b.createdAt),
    sv(b.verifiedAt),
    sv(b.cancelledAt),
    b.id,
  ]),
);

const leadCsv = csv(
  ["Mottagen", "Namn", "E-post", "Telefon", "Specialitet", "Stad", "Önskade datum", "Tidpunkt", "Beskrivning"],
  leads.map((l) => [
    sv(l.receivedAt),
    l.name,
    l.email,
    l.phone,
    l.specialty,
    l.city,
    (l.preferredDates || []).join(", "),
    l.timePreference === "before-noon" ? "Före lunch" : l.timePreference === "after-noon" ? "Efter lunch" : l.timePreference,
    l.message,
  ]),
);

// --- 3. Mejla bara om något ändrats ---------------------------------------
const fingerprint = createHash("sha256").update(bookingCsv + leadCsv).digest("hex");
const previous = existsSync(STATE) ? readFileSync(STATE, "utf8").trim() : "";
const changed = fingerprint !== previous;

const escapeHtml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rows = active
  .map(
    (b) => `<tr>
      <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0">${escapeHtml(sv(b.slot))}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0">${escapeHtml(b.name)}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0">${escapeHtml(b.phone)}<br><span style="color:#64748b">${escapeHtml(b.email)}</span></td>
      <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0">${escapeHtml(b.message) || "<span style='color:#94a3b8'>–</span>"}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0">${escapeHtml(STATUS[b.status] ?? b.status)}</td>
    </tr>`,
  )
  .join("");

const subject = `Bokningsarkiv ${sv(new Date().toISOString()).slice(0, 16)} – ${active.length} aktiva bokningar`;
const html = `
  <div style="font-family:system-ui,Arial,sans-serif;color:#0f172a;line-height:1.55">
    <h2 style="margin:0 0 4px">Bokningar och förfrågningar</h2>
    <p style="margin:0 0 18px;color:#475569">
      Säkerhetskopia ${escapeHtml(sv(new Date().toISOString()))}.
      ${bs.length} bokningar totalt (${active.length} aktiva), ${leads.length} tidsförfrågningar.
      Fullständiga uppgifter finns i de bifogade CSV-filerna – spara mejlet, det är kopian som
      ligger utanför servern.
    </p>
    ${
      active.length
        ? `<table style="border-collapse:collapse;font-size:14px">
            <tr style="text-align:left;background:#f1f5f9">
              <th style="padding:8px 10px">Tid</th><th style="padding:8px 10px">Namn</th>
              <th style="padding:8px 10px">Kontakt</th><th style="padding:8px 10px">Ärende</th>
              <th style="padding:8px 10px">Status</th>
            </tr>${rows}
          </table>`
        : "<p>Inga aktiva bokningar just nu.</p>"
    }
  </div>`;

const text = [
  `Bokningsarkiv ${sv(new Date().toISOString())}`,
  `${bs.length} bokningar (${active.length} aktiva), ${leads.length} tidsförfrågningar.`,
  "",
  ...active.map((b) => `${sv(b.slot)}  ${b.name}  ${b.phone}  ${b.email}  [${STATUS[b.status] ?? b.status}]`),
  "",
  "Fullständiga uppgifter i de bifogade CSV-filerna.",
].join("\n");

console.log(`Kopierade ${copied.length} datafiler till ${DEST}`);
console.log(`${bs.length} bokningar (${active.length} aktiva), ${leads.length} förfrågningar`);

if (DRY) {
  console.log("DRY: inget mejl skickades; personuppgifter och mottagare visas inte.");
  process.exit(0);
}

if (!changed && !FORCE) {
  console.log("Inget nytt sedan förra utskicket – inget mejl skickat. (FORCE=1 mejlar ändå.)");
  process.exit(0);
}

if (!TO || !env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
  console.error("SMTP eller mottagare saknas i .env.local – kunde inte mejla. Filkopiorna finns kvar.");
  process.exit(1);
}

const message = {
  from: `"Specialistdirekt" <${env.SMTP_USER}>`,
  to: TO,
  subject,
  text,
  html,
  attachments: [
    { filename: `bokningar-${stamp}.csv`, content: bookingCsv, contentType: "text/csv; charset=utf-8" },
    { filename: `tidsforfragningar-${stamp}.csv`, content: leadCsv, contentType: "text/csv; charset=utf-8" },
  ],
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

// Full certifikatkontroll är standard. Eftersom bilagorna innehåller patient-
// och hälsouppgifter får ett osäkert andraförsök bara ske efter ett uttryckligt,
// tillfälligt driftbeslut.
async function send() {
  const smtpPort = Number(env.SMTP_PORT || 587);
  const base = {
    host: env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  };
  try {
    await nodemailer.createTransport(base).sendMail(message);
    return "verifierat certifikat";
  } catch (err) {
    const msg = `${err?.reason ?? ""} ${err?.message ?? ""}`;
    const allowInsecureTls =
      (process.env.SMTP_ALLOW_INSECURE_TLS || env.SMTP_ALLOW_INSECURE_TLS) === "1" &&
      (process.env.SMTP_STRICT_TLS || env.SMTP_STRICT_TLS) !== "1";
    if (!allowInsecureTls || !/certificate|self.signed|altname/i.test(msg)) throw err;
    console.warn(
      `Certifikatet på ${env.SMTP_HOST} går inte att verifiera (${errorSummary(err)}). ` +
        "SMTP_ALLOW_INSECURE_TLS=1 tillåter ett nödförsök utan äkthetskontroll.",
    );
    await nodemailer.createTransport({ ...base, tls: { rejectUnauthorized: false } }).sendMail(message);
    return "utan certifikatkontroll";
  }
}

try {
  const how = await send();
  writeFileSync(STATE, fingerprint, { mode: 0o600 });
  chmodSync(STATE, 0o600);
  console.log(`Mejlade uppgifterna till ${TO} (${how}).`);
} catch (err) {
  console.error("Kunde inte mejla:", errorSummary(err));
  console.error("Filkopiorna i /root/backups/bokningsdata/ finns kvar.");
  process.exit(1);
}
