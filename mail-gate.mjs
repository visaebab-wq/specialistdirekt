// mail-gate.mjs — den ENDA vägen ut för e-post från Specialistdirekt.
//
// Ägarregel 2026-11-02: "Inget mejl skickas någonsin utan mitt tillstånd."
// Godkänd uppdelning (samma som Skönhetskollens clinicportal/gated_backend.py):
//
//   AUTOMATISKT (går ut utan godkännande per mejl)
//     a) "requested": ett mejl som dess ENDA mottagare själv begärt i stunden,
//        t.ex. patientens bekräftelse av bokningen hen just skickat in.
//        Kräver exakt en To-adress och ingen Cc/Bcc.
//     b) "owner": notiser som BARA går till ägarens egna adresser
//        (OWNER_ADDRESSES nedan, hårdkodade – en miljövariabel kan aldrig vidga
//        listan). Varje mottagare kontrolleras per meddelande.
//
//   HÅLLS FÖR GODKÄNNANDE: allt annat – mejl till kliniker, läkare, personal och
//   andra tredje parter, påminnelser, sammanställningar, omsändningar, och
//   ALLT som saknar en deklarerad typ (kind). Fail-closed: okänd typ = hålls.
//
// Ett hållet mejl sparas i .data/held-mails.jsonl (läge 600, katalog 700) och
// ägaren får en kort notis (typ, mottagare, ämne, hur man godkänner – aldrig
// själva texten). Godkännande sker med scripts/held-mails.mjs, som kontrollerar
// mejlet på nytt (utgångna länkar, ändrad bokning) och skickar exakt den sparade
// texten högst en gång.
//
// Ingen annan fil i projektet får importera nodemailer eller anropa ett
// mejl-API. scripts/test-mail-gate.mjs kontrollerar det.

import {
  appendFileSync,
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { randomBytes } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import nodemailer from "nodemailer";
import { acquireFileLock } from "./booking-lock.mjs";

/** Ägarens egna adresser. Ändras bara i kod, med granskning. */
export const OWNER_ADDRESSES = Object.freeze(["visaeb.ab@gmail.com", "info@specialistdirekt.se"]);
/** Dit notisen om ett väntande mejl går. */
export const OWNER_ALERT_TO = "visaeb.ab@gmail.com";

/**
 * De enda typerna som får gå ut automatiskt, och vilken regel som gäller.
 * Allt som inte står här hålls.
 */
export const AUTO_KINDS = Object.freeze({
  booking_patient_confirmation: "requested",
  lead_owner_notice: "owner",
  booking_owner_notice: "owner",
  booking_backup: "owner",
  held_mail_alert: "owner",
});

/** Kända typer som ALLTID hålls (dokumentation; allt okänt hålls ändå). */
export const HELD_KINDS = Object.freeze([
  "booking_reminder",
  "booking_summary",
  "lead_resend",
  "booking_check_alert",
]);

/** Längsta tid ett hållet mejl kan godkännas, om inget kortare angetts. */
export const HELD_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
/** Max antal ägarnotiser per timme – en trasig loop ska inte översvämma inkorgen. */
export const ALERTS_PER_HOUR = 20;

// ---------------------------------------------------------------------------
// Konfiguration

/**
 * SMTP-inställningar ur en miljö. `source` är ett objekt eller en funktion
 * (nyckel → värde), så skript kan låta process.env gå före .env.local.
 */
export function smtpFromEnv(source = process.env) {
  const get = typeof source === "function" ? source : (key) => source?.[key];
  const port = Number(get("SMTP_PORT") || 587);
  return {
    host: get("SMTP_HOST") || "",
    port,
    user: get("SMTP_USER") || "",
    pass: get("SMTP_PASS") || "",
    allowInsecureTls: get("SMTP_ALLOW_INSECURE_TLS") === "1" && get("SMTP_STRICT_TLS") !== "1",
  };
}

export function smtpConfigured(smtp) {
  return Boolean(smtp && smtp.host && smtp.user && smtp.pass);
}

/**
 * Var hållna mejl sparas. MAIL_HELD_FILE vinner. Är bokningsloggen omdirigerad
 * (test/staging) följer den hållna lagringen med, så en syntetisk körning aldrig
 * skriver i projektets riktiga kö.
 */
export function heldStoreFile({ root = process.cwd(), env = process.env } = {}) {
  const get = typeof env === "function" ? env : (key) => env?.[key];
  const explicit = get("MAIL_HELD_FILE");
  if (explicit) return resolve(/* turbopackIgnore: true */ root, explicit);
  const bookingLog = get("BOOKING_LOG_FILE");
  if (bookingLog) return join(/* turbopackIgnore: true */ dirname(resolve(/* turbopackIgnore: true */ root, bookingLog)), "held-mails.jsonl");
  return join(/* turbopackIgnore: true */ root, ".data", "held-mails.jsonl");
}

// ---------------------------------------------------------------------------
// Adresser

const ADDRESS = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

/** "Namn <a@b.se>, c@d.se" | string[] → ["a@b.se", "c@d.se"] (gemener). Ogiltigt → null. */
export function parseAddresses(value) {
  if (value === undefined || value === null || value === "") return [];
  const parts = Array.isArray(value) ? value : String(value).split(",");
  const out = [];
  for (const raw of parts) {
    if (typeof raw !== "string") return null;
    if (/[\r\n]/.test(raw)) return null;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const angle = trimmed.match(/<([^<>]+)>\s*$/);
    const addr = (angle ? angle[1] : trimmed).trim().toLowerCase();
    if (!ADDRESS.test(addr)) return null;
    out.push(addr);
  }
  return [...new Set(out)];
}

const OWNER_SET = new Set(OWNER_ADDRESSES.map((a) => a.toLowerCase()));

/**
 * Får det här meddelandet gå ut automatiskt?
 * @returns {{ automatic: boolean, reason: string }}
 */
export function classify(kind, message) {
  if (!kind || typeof kind !== "string") return { automatic: false, reason: "no-kind" };
  const rule = Object.prototype.hasOwnProperty.call(AUTO_KINDS, kind) ? AUTO_KINDS[kind] : undefined;
  if (!rule) return { automatic: false, reason: "kind-needs-approval" };
  const to = parseAddresses(message?.to);
  const cc = parseAddresses(message?.cc);
  const bcc = parseAddresses(message?.bcc);
  if (!to || !cc || !bcc) return { automatic: false, reason: "invalid-recipient" };
  if (rule === "requested") {
    return to.length === 1 && cc.length === 0 && bcc.length === 0
      ? { automatic: true, reason: "requested-by-recipient" }
      : { automatic: false, reason: "requested-needs-single-recipient" };
  }
  if (rule === "owner") {
    const all = [...to, ...cc, ...bcc];
    return all.length > 0 && all.every((a) => OWNER_SET.has(a))
      ? { automatic: true, reason: "owner-only" }
      : { automatic: false, reason: "not-owner-only" };
  }
  return { automatic: false, reason: "unknown-rule" };
}

// ---------------------------------------------------------------------------
// Transport (SMTP eller testsänka). Exporteras INTE – utanför den här filen går
// det bara att skicka via sendGated() eller approveAndSend().

/**
 * Nodemailer-fel kan innehålla mottagare och SMTP-svar. Returnera bara ett
 * litet tekniskt sammandrag.
 */
export function errorSummary(err) {
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
}

const CERT_ERROR_CODES = new Set([
  "CERT_HAS_EXPIRED",
  "CERT_NOT_YET_VALID",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

function isCertError(err) {
  if (!err) return false;
  if (err.code && CERT_ERROR_CODES.has(err.code)) return true;
  return /certificate|self.signed|altname/i.test(`${err.reason ?? ""} ${err.message ?? ""}`);
}

let certKnownBroken = false;

function smtpTransport(smtp, insecure) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    requireTLS: smtp.port !== 465,
    auth: { user: smtp.user, pass: smtp.pass },
    ...(insecure ? { tls: { rejectUnauthorized: false } } : {}),
  });
}

/** Testsänka: skriver meddelandet till en fil och öppnar aldrig någon socket. */
function sinkFile() {
  return process.env.MAIL_GATE_SINK || "";
}

function toNodemailer(message) {
  return {
    from: message.from,
    to: message.to,
    ...(message.cc?.length ? { cc: message.cc } : {}),
    ...(message.bcc?.length ? { bcc: message.bcc } : {}),
    ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    subject: message.subject,
    text: message.text,
    ...(message.html ? { html: message.html } : {}),
    ...(message.attachments?.length
      ? {
          attachments: message.attachments.map((a) => ({
            filename: a.filename,
            content: a.encoding === "base64" ? Buffer.from(a.content, "base64") : a.content,
            ...(a.contentType ? { contentType: a.contentType } : {}),
          })),
        }
      : {}),
  };
}

/**
 * Skickar ett redan normaliserat meddelande. Kastar aldrig.
 * @returns {Promise<{ sent: boolean, error?: string, insecureTls?: boolean, sink?: boolean }>}
 */
async function transmit(message, smtp, tag, kind) {
  const sink = sinkFile();
  if (sink) {
    try {
      appendFileSync(
        /* turbopackIgnore: true */ sink,
        JSON.stringify({ at: new Date().toISOString(), kind, ...message }) + "\n",
        { mode: 0o600 },
      );
      return { sent: true, sink: true };
    } catch {
      return { sent: false, error: "sink-write-failed" };
    }
  }
  if (!smtpConfigured(smtp)) {
    console.warn(`[${tag}] SMTP saknas – mejl skickades inte`);
    return { sent: false, error: "smtp-not-configured" };
  }
  const payload = toNodemailer(message);
  if (!smtp.allowInsecureTls) certKnownBroken = false;
  if (!certKnownBroken) {
    try {
      await smtpTransport(smtp, false).sendMail(payload);
      return { sent: true };
    } catch (err) {
      if (!smtp.allowInsecureTls || !isCertError(err)) {
        const error = errorSummary(err);
        console.error(`[${tag}] SMTP-fel`, error);
        return { sent: false, error };
      }
      certKnownBroken = true;
      console.warn(
        `[${tag}] SMTP-certifikatet på ${smtp.host} går inte att verifiera (${errorSummary(err)}). ` +
          "SMTP_ALLOW_INSECURE_TLS=1 tillåter ett nödförsök utan äkthetskontroll. " +
          "Förnya certifikatet och stäng av nödläget omedelbart.",
      );
    }
  }
  try {
    await smtpTransport(smtp, true).sendMail(payload);
    return { sent: true, insecureTls: true };
  } catch (err) {
    const error = errorSummary(err);
    console.error(`[${tag}] SMTP-fel`, error);
    return { sent: false, error };
  }
}

// ---------------------------------------------------------------------------
// Normalisering och lagring

function normalizeAttachment(a) {
  const filename = String(a?.filename || "bilaga");
  const contentType = a?.contentType ? String(a.contentType) : undefined;
  if (Buffer.isBuffer(a?.content) || a?.content instanceof Uint8Array) {
    return { filename, contentType, content: Buffer.from(a.content).toString("base64"), encoding: "base64" };
  }
  return { filename, contentType, content: String(a?.content ?? "") };
}

function normalize(message, smtp) {
  const list = (value) => {
    if (value === undefined || value === null || value === "") return [];
    return (Array.isArray(value) ? value : String(value).split(",")).map((v) => String(v).trim()).filter(Boolean);
  };
  return {
    from: message.from || `"Specialistdirekt" <${smtp?.user || "info@specialistdirekt.se"}>`,
    to: list(message.to),
    cc: list(message.cc),
    bcc: list(message.bcc),
    replyTo: message.replyTo ? String(message.replyTo) : "",
    subject: String(message.subject ?? ""),
    text: String(message.text ?? ""),
    html: message.html ? String(message.html) : "",
    attachments: Array.isArray(message.attachments) ? message.attachments.map(normalizeAttachment) : [],
  };
}

function append(file, event) {
  const parent = dirname(/* turbopackIgnore: true */ file);
  mkdirSync(/* turbopackIgnore: true */ parent, { recursive: true, mode: 0o700 });
  if (parent.endsWith(`${"/"}.data`)) chmodSync(/* turbopackIgnore: true */ parent, 0o700);
  if (existsSync(/* turbopackIgnore: true */ file)) chmodSync(/* turbopackIgnore: true */ file, 0o600);
  appendFileSync(/* turbopackIgnore: true */ file, JSON.stringify(event) + "\n", { mode: 0o600 });
  chmodSync(/* turbopackIgnore: true */ file, 0o600);
}

function newId() {
  return `hm-${Date.now().toString(36)}-${randomBytes(5).toString("hex")}`;
}

/** Läser händelseloggen och räknar fram varje hållet mejls tillstånd. */
export function readHeld(file) {
  const byId = new Map();
  const alerts = [];
  if (!existsSync(/* turbopackIgnore: true */ file)) return { byId, alerts };
  chmodSync(/* turbopackIgnore: true */ file, 0o600);
  for (const line of readFileSync(/* turbopackIgnore: true */ file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let ev;
    try {
      ev = JSON.parse(line);
    } catch {
      continue;
    }
    if (!ev || typeof ev !== "object" || typeof ev.id !== "string") continue;
    if (ev.type === "held") {
      if (!byId.has(ev.id)) byId.set(ev.id, { ...ev, status: "held", history: [] });
      continue;
    }
    const rec = byId.get(ev.id);
    if (ev.type === "alerted" || ev.type === "alert-skipped") alerts.push(ev);
    if (!rec) continue;
    rec.history.push({ type: ev.type, at: ev.at, by: ev.by, reason: ev.reason, error: ev.error });
    if (ev.type === "approved") rec.status = "sending";
    else if (ev.type === "sent") rec.status = "sent";
    else if (ev.type === "failed") rec.status = "failed";
    else if (ev.type === "rejected") rec.status = "rejected";
    else if (ev.type === "discarded") rec.status = "discarded";
  }
  return { byId, alerts };
}

// ---------------------------------------------------------------------------
// Ägarnotis

async function alertOwner(file, held, smtp) {
  const now = Date.now();
  let recent = 0;
  try {
    recent = readHeld(file).alerts.filter(
      (a) => a.type === "alerted" && now - Date.parse(a.at) < 60 * 60 * 1000,
    ).length;
  } catch {
    recent = 0;
  }
  if (recent >= ALERTS_PER_HOUR) {
    append(file, { type: "alert-skipped", id: held.id, at: new Date().toISOString(), reason: "rate-limit" });
    console.warn(`[mail-gate] ägarnotis hoppades över (fler än ${ALERTS_PER_HOUR} per timme) id=${held.id}`);
    return { sent: false, error: "alert-rate-limit" };
  }
  const expires = held.notAfter ? new Date(held.notAfter).toISOString() : "";
  const message = normalize(
    {
      to: OWNER_ALERT_TO,
      subject: `[Specialistdirekt] Mejl väntar på godkännande: ${held.kind}`,
      text: [
        "Ett mejl väntar på ditt godkännande och har INTE skickats.",
        "",
        `Id: ${held.id}`,
        `Typ: ${held.kind}`,
        `Till: ${held.message.to.join(", ")}${held.message.cc.length ? ` (cc ${held.message.cc.join(", ")})` : ""}${held.message.bcc.length ? ` (+${held.message.bcc.length} bcc)` : ""}`,
        `Ämne: ${held.message.subject}`,
        ...(expires ? [`Kan godkännas till: ${expires}`] : []),
        "",
        "Granska, skicka eller släng på servern:",
        "  cd /root/specialistdirekt",
        `  node scripts/held-mails.mjs --show ${held.id}`,
        `  node scripts/held-mails.mjs --send ${held.id} --approved-by <ditt namn>`,
        `  node scripts/held-mails.mjs --discard ${held.id} --by <ditt namn>`,
      ].join("\n"),
    },
    smtp,
  );
  // Notisen är själv en ägar-notis och måste klara samma kontroll.
  if (!classify("held_mail_alert", message).automatic) return { sent: false, error: "alert-not-owner-only" };
  const result = await transmit(message, smtp, "mail-gate", "held_mail_alert");
  try {
    append(file, {
      type: "alerted",
      id: held.id,
      at: new Date().toISOString(),
      ok: result.sent,
      ...(result.error ? { error: result.error } : {}),
    });
  } catch {
    /* kön är det viktiga; notisloggen är en bekvämlighet */
  }
  if (!result.sent) console.warn(`[mail-gate] ägarnotis om väntande mejl skickades inte id=${held.id} (${result.error})`);
  return result;
}

// ---------------------------------------------------------------------------
// Publikt API

/**
 * Skicka ett mejl genom grinden.
 *
 * @param {object} message { from?, to, cc?, bcc?, replyTo?, subject, text, html?, attachments? }
 * @param {object} options
 *   kind     – mejltyp (se AUTO_KINDS/HELD_KINDS). Saknas den hålls mejlet.
 *   checks   – kontroller som körs igen vid godkännande (se validateHeld).
 *   notAfter – senaste tid (ms eller ISO) då ett hållet mejl får godkännas.
 *   smtp     – resultat av smtpFromEnv().
 *   root/env/storeFile – var hållna mejl sparas (se heldStoreFile).
 *   tag      – loggprefix.
 * @returns {Promise<{ sent: boolean, held: boolean, id?: string, error?: string, insecureTls?: boolean }>}
 */
export async function sendGated(message, options = {}) {
  const { kind, checks = [], notAfter, smtp = smtpFromEnv(process.env), tag = "mail", source = "" } = options;
  const storeFile = options.storeFile || heldStoreFile({ root: options.root, env: options.env });
  let normalized;
  try {
    normalized = normalize(message || {}, smtp);
  } catch {
    return { sent: false, held: false, error: "invalid-message" };
  }
  const decision = classify(kind, normalized);
  if (decision.automatic) {
    try {
      const result = await transmit(normalized, smtp, tag, kind);
      return { held: false, ...result };
    } catch {
      return { sent: false, held: false, error: "unexpected-mail-error" };
    }
  }

  const at = new Date();
  const limit = Math.min(
    at.getTime() + HELD_MAX_AGE_MS,
    notAfter !== undefined && notAfter !== null ? new Date(notAfter).getTime() : Infinity,
  );
  const held = {
    v: 1,
    type: "held",
    id: newId(),
    at: at.toISOString(),
    kind: typeof kind === "string" && kind ? kind.slice(0, 60) : "unclassified",
    reason: decision.reason,
    source: String(source || tag).slice(0, 60),
    notAfter: Number.isFinite(limit) ? new Date(limit).toISOString() : at.toISOString(),
    checks: Array.isArray(checks) ? checks : [],
    message: normalized,
  };
  try {
    append(storeFile, held);
  } catch (err) {
    // Fail-closed: kan mejlet inte sparas för godkännande skickas det inte heller.
    console.error(`[mail-gate] kunde inte spara hållet mejl kind=${held.kind} (${err?.code || "unknown"}) – inget skickades`);
    return { sent: false, held: false, error: "held-store-failed" };
  }
  console.info(`[mail-gate] mejl hålls för godkännande kind=${held.kind} id=${held.id} (${decision.reason})`);
  try {
    await alertOwner(storeFile, held, smtp);
  } catch {
    console.warn(`[mail-gate] ägarnotis misslyckades id=${held.id}`);
  }
  return { sent: false, held: true, id: held.id, error: "held-for-approval" };
}

// --- Bokningskontroller vid godkännande -------------------------------------

const BOOKING_TTL_MS = 2 * 60 * 60 * 1000; // = BOOKING_PENDING_TTL_MS i src/lib/booking-slots.ts

function readBookingState(file, id) {
  if (!file || !existsSync(/* turbopackIgnore: true */ file)) return undefined;
  let rec;
  for (const line of readFileSync(/* turbopackIgnore: true */ file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let ev;
    try {
      ev = JSON.parse(line);
    } catch {
      continue;
    }
    if (!ev || typeof ev !== "object" || ev.id !== id) continue;
    const type = ev.type || "created";
    if (type === "created") rec = { createdAt: ev.createdAt, slot: ev.slot, email: ev.email, status: "pending" };
    else if (rec && type === "verified") rec.status = "verified";
    else if (rec && type === "cancelled") rec.status = "cancelled";
  }
  return rec;
}

/**
 * Är ett hållet mejl fortfarande sant och giltigt? Okänd kontroll = ogiltigt.
 * @returns {{ ok: boolean, reason?: string }}
 */
export function validateHeld(record, now = Date.now()) {
  if (!record || record.type !== "held") return { ok: false, reason: "unknown-id" };
  const limit = Date.parse(record.notAfter);
  if (!Number.isFinite(limit) || now > limit) return { ok: false, reason: "expired" };
  for (const check of record.checks || []) {
    if (!check || typeof check !== "object") return { ok: false, reason: "invalid-check" };
    if (check.type === "notAfter") {
      const t = Date.parse(check.at);
      if (!Number.isFinite(t) || now > t) return { ok: false, reason: "expired" };
    } else if (check.type === "booking") {
      // Bokningen måste se exakt ut som när mejlet skrevs: samma status, samma
      // tid, samma adress, tiden i framtiden – och en obekräftad bokning måste
      // fortfarande hålla sin lucka (bekräftelselänken gäller två timmar).
      const current = readBookingState(check.file, check.bookingId);
      if (!current) return { ok: false, reason: "booking-missing" };
      if (current.status !== check.status) return { ok: false, reason: `booking-status-${current.status}` };
      if (current.slot !== check.slot) return { ok: false, reason: "booking-slot-changed" };
      if (check.createdAt && current.createdAt !== check.createdAt) return { ok: false, reason: "booking-changed" };
      if (check.email && String(current.email || "").toLowerCase() !== String(check.email).toLowerCase())
        return { ok: false, reason: "booking-email-changed" };
      if (!(Date.parse(current.slot) > now)) return { ok: false, reason: "booking-slot-passed" };
      if (current.status === "pending") {
        const margin = Number.isFinite(check.marginMs) ? check.marginMs : 5 * 60 * 1000;
        const ttl = Number.isFinite(check.ttlMs) ? check.ttlMs : BOOKING_TTL_MS;
        if (!(now < Date.parse(current.createdAt) + ttl - margin)) return { ok: false, reason: "booking-link-expired" };
      }
    } else {
      return { ok: false, reason: `unknown-check-${String(check.type).slice(0, 30)}` };
    }
  }
  return { ok: true };
}

/** Bygger en bokningskontroll av en bokningspost. */
export function bookingCheck(rec, file, extra = {}) {
  return {
    type: "booking",
    bookingId: rec.id,
    file,
    status: rec.status || "pending",
    slot: rec.slot,
    createdAt: rec.createdAt,
    email: rec.email || "",
    ...extra,
  };
}

/**
 * Ägarens godkännande: kontrollera igen och skicka EXAKT den sparade texten,
 * högst en gång. Låset hindrar två samtidiga godkännanden.
 */
export async function approveAndSend(id, { approvedBy, storeFile, smtp, now = () => Date.now(), retryFailed = false } = {}) {
  if (!approvedBy || !String(approvedBy).trim()) return { ok: false, reason: "approved-by-required" };
  if (!storeFile) return { ok: false, reason: "store-required" };
  let release;
  try {
    release = acquireFileLock(storeFile, { timeoutMs: 0 });
  } catch {
    return { ok: false, reason: "busy" };
  }
  try {
    const rec = readHeld(storeFile).byId.get(id);
    if (!rec) return { ok: false, reason: "unknown-id" };
    const allowed = rec.status === "held" || (retryFailed && rec.status === "failed");
    if (!allowed) return { ok: false, reason: `status-${rec.status}` };
    const validity = validateHeld(rec, now());
    if (!validity.ok) {
      append(storeFile, { type: "rejected", id, at: new Date(now()).toISOString(), by: String(approvedBy), reason: validity.reason });
      return { ok: false, reason: validity.reason, status: "rejected" };
    }
    append(storeFile, { type: "approved", id, at: new Date(now()).toISOString(), by: String(approvedBy).slice(0, 80) });
    let result;
    try {
      result = await transmit(rec.message, smtp, "held-mail", rec.kind);
    } catch {
      result = { sent: false, error: "unexpected-mail-error" };
    }
    if (result.sent) {
      append(storeFile, { type: "sent", id, at: new Date().toISOString(), ...(result.insecureTls ? { insecureTls: true } : {}) });
      return { ok: true, status: "sent" };
    }
    append(storeFile, { type: "failed", id, at: new Date().toISOString(), error: result.error || "unknown" });
    return { ok: false, reason: result.error || "send-failed", status: "failed" };
  } finally {
    release();
  }
}

export function discardHeld(id, { by, storeFile, reason = "" } = {}) {
  if (!by || !String(by).trim()) return { ok: false, reason: "by-required" };
  let release;
  try {
    release = acquireFileLock(storeFile, { timeoutMs: 0 });
  } catch {
    return { ok: false, reason: "busy" };
  }
  try {
    const rec = readHeld(storeFile).byId.get(id);
    if (!rec) return { ok: false, reason: "unknown-id" };
    if (!["held", "failed", "rejected"].includes(rec.status)) return { ok: false, reason: `status-${rec.status}` };
    append(storeFile, { type: "discarded", id, at: new Date().toISOString(), by: String(by).slice(0, 80), ...(reason ? { reason: String(reason).slice(0, 200) } : {}) });
    return { ok: true, status: "discarded" };
  } finally {
    release();
  }
}
