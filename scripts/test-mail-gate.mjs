// test-mail-gate.mjs — tester för mejlgrinden (mail-gate.mjs), dess CLI och
// skripten som skickar genom den.
//
// Kör ALLTID nätverkslöst och utan SMTP, t.ex.:
//   unshare -n -- node scripts/test-mail-gate.mjs
// Testet vägrar starta (exit 90) om SMTP_* finns i miljön eller om en extern
// anslutning går att öppna. Alla "utskick" går till en testsänka (MAIL_GATE_SINK),
// en fil – grinden öppnar då aldrig någon socket.
//
// Miljö:
//   MAIL_GATE_UNDER_TEST=/väg/mail-gate.mjs  – testa en annan kopia (mutationstest)
//   EXTRA_SCRIPTS_DIR=/väg                   – katalog med specialistdirekt-check-mail.mjs
//                                              och resend-lost-leads.mjs (utanför git)

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { connect } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const GATE = process.env.MAIL_GATE_UNDER_TEST || join(project, "mail-gate.mjs");
const GATE_DIR = dirname(GATE);
const EXTRA = process.env.EXTRA_SCRIPTS_DIR || "";

// ---------------------------------------------------------------------------
// Isolering först – inget får skrivas eller "skickas" innan den är bevisad.
for (const key of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "RESEND_API_KEY"]) {
  if (process.env[key]) {
    console.error(`ISOLERING EJ BEVISAD: ${key} är satt i miljön – avbryter.`);
    process.exit(90);
  }
}
const reachable = await new Promise((resolve) => {
  const socket = connect({ host: "1.1.1.1", port: 443 });
  const done = (value) => {
    socket.destroy();
    resolve(value);
  };
  socket.setTimeout(2000, () => done(false));
  socket.on("connect", () => done(true));
  socket.on("error", () => done(false));
});
if (reachable) {
  console.error("ISOLERING EJ BEVISAD: extern anslutning gick att öppna – kör med unshare -n.");
  process.exit(90);
}
console.log("isolering: ingen SMTP i miljön, inget externt nätverk");

const scratch = mkdtempSync(join(tmpdir(), "sd-mailgate-test-"));
const SINK = join(scratch, "sink.jsonl");
process.env.MAIL_GATE_SINK = SINK;
delete process.env.MAIL_HELD_FILE;
delete process.env.BOOKING_LOG_FILE;

const gate = await import(pathToFileURL(GATE).href);
const {
  OWNER_ALERT_TO,
  HELD_KINDS,
  approveAndSend,
  bookingCheck,
  discardHeld,
  readHeld,
  sendGated,
  validateHeld,
} = gate;

const NO_SMTP = { host: "", port: 465, user: "", pass: "", allowInsecureTls: false };
let storeCounter = 0;
const freshStore = () => join(scratch, `store-${++storeCounter}`, ".data", "held-mails.jsonl");
const sinkLines = () =>
  existsSync(SINK)
    ? readFileSync(SINK, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l))
    : [];
const resetSink = () => rmSync(SINK, { force: true });
const heldList = (file) => [...readHeld(file).byId.values()];
const mail = (over = {}) => ({
  to: "patient@example.test",
  subject: "Ämne-123",
  text: "BODY-SECRET-7f3a hela texten",
  html: "<p>BODY-SECRET-7f3a</p>",
  ...over,
});

let passed = 0;
async function test(name, fn) {
  resetSink();
  try {
    await fn();
    passed++;
    console.log(`ok   ${name}`);
  } catch (err) {
    console.error(`FAIL ${name}`);
    throw err;
  }
}

try {
  // -------------------------------------------------------------------------
  // Automatiska typer
  await test("requested: patientens bekräftelse till en mottagare går ut", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "booking_patient_confirmation", storeFile: store, smtp: NO_SMTP });
    assert.equal(r.sent, true);
    assert.equal(r.held, false);
    const out = sinkLines();
    assert.equal(out.length, 1);
    assert.deepEqual(out[0].to, ["patient@example.test"]);
    assert.equal(out[0].text, "BODY-SECRET-7f3a hela texten");
    assert.equal(existsSync(store), false);
  });

  await test("requested: två mottagare, cc eller bcc hålls", async () => {
    for (const over of [
      { to: "a@example.test, b@example.test" },
      { to: ["a@example.test", "b@example.test"] },
      { cc: "c@example.test" },
      { bcc: "d@example.test" },
      { to: "" },
    ]) {
      const store = freshStore();
      resetSink();
      const r = await sendGated(mail(over), { kind: "booking_patient_confirmation", storeFile: store, smtp: NO_SMTP });
      assert.equal(r.sent, false, JSON.stringify(over));
      assert.equal(r.held, true, JSON.stringify(over));
      assert.equal(sinkLines().filter((m) => m.kind !== "held_mail_alert").length, 0);
    }
  });

  await test("owner: bara ägarens adresser går ut, även med namn och versaler", async () => {
    for (const over of [
      { to: "Ägaren <VISAEB.AB@gmail.com>" },
      { to: "info@specialistdirekt.se", cc: "visaeb.ab@gmail.com" },
    ]) {
      resetSink();
      const store = freshStore();
      const r = await sendGated(mail(over), { kind: "booking_owner_notice", storeFile: store, smtp: NO_SMTP });
      assert.equal(r.sent, true, JSON.stringify(over));
      assert.equal(sinkLines().length, 1);
      assert.equal(existsSync(store), false);
    }
  });

  await test("owner: en enda främmande mottagare gör att hela mejlet hålls", async () => {
    for (const over of [
      { to: "maryam@example.test" },
      { to: "visaeb.ab@gmail.com, klinik@example.test" },
      { to: "visaeb.ab@gmail.com", bcc: "spion@example.test" },
      { to: "visaeb.ab@gmail.com.evil.test" },
      { to: "visaeb.ab@gmail.com\r\nBcc: x@example.test" },
    ]) {
      resetSink();
      const store = freshStore();
      for (const kind of ["booking_owner_notice", "lead_owner_notice", "booking_backup"]) {
        const r = await sendGated(mail(over), { kind, storeFile: store, smtp: NO_SMTP });
        assert.equal(r.sent, false, `${kind} ${JSON.stringify(over)}`);
        assert.equal(r.held, true, `${kind} ${JSON.stringify(over)}`);
      }
      const delivered = sinkLines().filter((m) => m.kind !== "held_mail_alert");
      assert.equal(delivered.length, 0);
    }
  });

  // -------------------------------------------------------------------------
  // Hållna typer
  await test("utan typ, okänd typ, förfalskad godkänd-typ och alla kända hållna typer hålls", async () => {
    const store = freshStore();
    const kinds = [undefined, "", "foo", "held_approved", "approved", "APPROVED", ...HELD_KINDS];
    for (const kind of kinds) {
      const r = await sendGated(mail({ to: "visaeb.ab@gmail.com" }), { kind, storeFile: store, smtp: NO_SMTP });
      assert.equal(r.sent, false, String(kind));
      assert.equal(r.held, true, String(kind));
      assert.match(r.id, /^hm-/);
    }
    const rows = heldList(store);
    assert.equal(rows.length, kinds.length);
    assert.equal(rows[0].kind, "unclassified");
    assert.equal(rows[0].reason, "no-kind");
    assert.equal(rows[1].kind, "unclassified");
    assert.ok(rows.every((r) => r.status === "held"));
    // Inga riktiga utskick – bara ägarnotiser.
    assert.ok(sinkLines().every((m) => m.kind === "held_mail_alert"));
  });

  await test("hållet mejl sparas med läge 600 i en katalog med läge 700", async () => {
    const store = freshStore();
    await sendGated(mail(), { kind: "booking_reminder", storeFile: store, smtp: NO_SMTP });
    assert.equal(statSync(store).mode & 0o777, 0o600);
    assert.equal(statSync(dirname(store)).mode & 0o777, 0o700);
    const [row] = heldList(store);
    assert.equal(row.message.text, "BODY-SECRET-7f3a hela texten");
    assert.equal(row.message.html, "<p>BODY-SECRET-7f3a</p>");
  });

  await test("ägarnotis: bara till ägaren, med typ/mottagare/ämne/kommando men utan brödtext", async () => {
    const store = freshStore();
    const r = await sendGated(
      mail({ to: "klinik@example.test", attachments: [{ filename: "x.csv", content: "BODY-SECRET-7f3a" }] }),
      { kind: "booking_summary", storeFile: store, smtp: NO_SMTP },
    );
    const out = sinkLines();
    assert.equal(out.length, 1);
    const alert = out[0];
    assert.equal(alert.kind, "held_mail_alert");
    assert.deepEqual(alert.to, [OWNER_ALERT_TO]);
    assert.deepEqual(alert.cc, []);
    assert.deepEqual(alert.bcc, []);
    assert.match(alert.subject, /booking_summary/);
    assert.match(alert.text, new RegExp(r.id));
    assert.match(alert.text, /klinik@example\.test/);
    assert.match(alert.text, /Ämne-123/);
    assert.match(alert.text, new RegExp(`--send ${r.id} --approved-by`));
    assert.doesNotMatch(JSON.stringify(alert), /BODY-SECRET-7f3a/);
    assert.equal(alert.attachments.length, 0);
    assert.equal(alert.html, "");
    const events = readFileSync(store, "utf8").trim().split("\n").map((l) => JSON.parse(l));
    assert.ok(events.some((e) => e.type === "alerted" && e.id === r.id && e.ok === true));
  });

  await test("ägarnotiser begränsas till 20 per timme; mejlen hålls ändå", async () => {
    const store = freshStore();
    for (let i = 0; i < 22; i++) {
      const r = await sendGated(mail(), { kind: "booking_reminder", storeFile: store, smtp: NO_SMTP });
      assert.equal(r.held, true);
    }
    assert.equal(sinkLines().length, 20);
    assert.equal(heldList(store).length, 22);
  });

  // -------------------------------------------------------------------------
  // Godkännande
  await test("godkännande skickar exakt den sparade texten, en gång", async () => {
    const store = freshStore();
    const att = [
      { filename: "a.csv", content: "rad1;rad2", contentType: "text/csv" },
      { filename: "b.bin", content: Buffer.from([0, 1, 2, 250]) },
    ];
    const r = await sendGated(
      mail({ to: "third@example.test", replyTo: "svar@example.test", attachments: att }),
      { kind: "booking_summary", storeFile: store, smtp: NO_SMTP },
    );
    resetSink();
    assert.deepEqual(await approveAndSend(r.id, { storeFile: store, smtp: NO_SMTP }), {
      ok: false,
      reason: "approved-by-required",
    });
    assert.equal(sinkLines().length, 0);
    const first = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    assert.deepEqual(first, { ok: true, status: "sent" });
    const out = sinkLines();
    assert.equal(out.length, 1);
    const stored = heldList(store)[0].message;
    for (const key of ["from", "to", "cc", "bcc", "replyTo", "subject", "text", "html", "attachments"]) {
      assert.deepEqual(out[0][key], stored[key], key);
    }
    assert.equal(out[0].text, "BODY-SECRET-7f3a hela texten");
    assert.deepEqual(Buffer.from(out[0].attachments[1].content, "base64"), Buffer.from([0, 1, 2, 250]));
    const second = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    assert.equal(second.ok, false);
    assert.equal(second.reason, "status-sent");
    assert.equal(sinkLines().length, 1);
    assert.equal(heldList(store)[0].status, "sent");
    assert.deepEqual(
      heldList(store)[0].history.map((h) => h.type),
      ["alerted", "approved", "sent"],
    );
  });

  await test("samtidiga godkännanden skickar bara en gång", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "lead_resend", storeFile: store, smtp: NO_SMTP });
    resetSink();
    const results = await Promise.all([
      approveAndSend(r.id, { approvedBy: "A", storeFile: store, smtp: NO_SMTP }),
      approveAndSend(r.id, { approvedBy: "B", storeFile: store, smtp: NO_SMTP }),
    ]);
    assert.equal(results.filter((x) => x.ok).length, 1);
    assert.equal(sinkLines().length, 1);
  });

  await test("utgånget mejl skickas inte", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), {
      kind: "booking_summary",
      storeFile: store,
      smtp: NO_SMTP,
      notAfter: Date.now() + 60_000,
    });
    resetSink();
    const later = () => Date.now() + 2 * 60_000;
    const res = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP, now: later });
    assert.deepEqual(res, { ok: false, reason: "expired", status: "rejected" });
    assert.equal(sinkLines().length, 0);
    assert.equal(heldList(store)[0].status, "rejected");
    // Ett avvisat mejl kan inte heller skickas senare.
    const again = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    assert.equal(again.ok, false);
    assert.equal(sinkLines().length, 0);
  });

  await test("maxålder: utan egen gräns kan ett mejl godkännas högst 7 dygn", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "booking_summary", storeFile: store, smtp: NO_SMTP, notAfter: Date.now() + 30 * 86_400_000 });
    resetSink();
    const res = await approveAndSend(r.id, {
      approvedBy: "Ägaren",
      storeFile: store,
      smtp: NO_SMTP,
      now: () => Date.now() + 8 * 86_400_000,
    });
    assert.equal(res.reason, "expired");
    assert.equal(sinkLines().length, 0);
  });

  await test("bokningskontroll: länk giltig → skickas; ändrad bokning eller utgången länk → skickas inte", async () => {
    const bookings = join(scratch, "bookings-check.jsonl");
    const now = Date.now();
    const created = (id, ageMin, slotDays = 7) => ({
      type: "created",
      id,
      email: "patient@example.test",
      name: "Syntetisk",
      createdAt: new Date(now - ageMin * 60_000).toISOString(),
      slot: new Date(now + slotDays * 86_400_000).toISOString(),
      status: "pending",
    });
    const recs = {
      ok: created("b-ok", 30),
      verified: created("b-verified", 30),
      cancelled: created("b-cancelled", 30),
      old: created("b-old", 116),
      moved: created("b-moved", 30),
      gone: created("b-gone", 30),
      passed: created("b-passed", 30, 7),
    };
    writeFileSync(bookings, Object.values(recs).filter((r) => r.id !== "b-gone").map((r) => JSON.stringify(r)).join("\n") + "\n");
    const store = freshStore();
    const ids = {};
    for (const [name, rec] of Object.entries(recs)) {
      const r = await sendGated(mail(), {
        kind: "booking_reminder",
        storeFile: store,
        smtp: NO_SMTP,
        checks: [bookingCheck(rec, bookings)],
      });
      ids[name] = r.id;
    }
    // Händelser efter att mejlen hölls.
    appendFileSync(bookings, JSON.stringify({ type: "verified", id: "b-verified", at: new Date().toISOString() }) + "\n");
    appendFileSync(bookings, JSON.stringify({ type: "cancelled", id: "b-cancelled", at: new Date().toISOString() }) + "\n");
    appendFileSync(bookings, JSON.stringify({ ...recs.moved, slot: new Date(now + 9 * 86_400_000).toISOString() }) + "\n");
    resetSink();
    const expect = {
      ok: true,
      verified: "booking-status-verified",
      cancelled: "booking-status-cancelled",
      old: "booking-link-expired",
      moved: "booking-slot-changed",
      gone: "booking-missing",
    };
    for (const [name, want] of Object.entries(expect)) {
      const res = await approveAndSend(ids[name], { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
      if (want === true) assert.equal(res.ok, true, name);
      else assert.equal(res.reason, want, name);
    }
    // Tiden har passerat (simulerad klocka efter besöket).
    const passed = await approveAndSend(ids.passed, {
      approvedBy: "Ägaren",
      storeFile: store,
      smtp: NO_SMTP,
      now: () => now + 6 * 86_400_000 + 23 * 3_600_000 + 59 * 60_000 + 59_000 + 2 * 86_400_000,
    });
    assert.equal(passed.ok, false);
    assert.equal(sinkLines().length, 1);
  });

  await test("okänd kontrolltyp gör mejlet ogiltigt (fail-closed)", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "booking_summary", storeFile: store, smtp: NO_SMTP, checks: [{ type: "mystery" }] });
    assert.equal(validateHeld(heldList(store)[0]).ok, false);
    resetSink();
    const res = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    assert.equal(res.ok, false);
    assert.equal(sinkLines().length, 0);
  });

  await test("slängt mejl kan inte skickas", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "booking_summary", storeFile: store, smtp: NO_SMTP });
    assert.equal(discardHeld(r.id, { storeFile: store }).ok, false);
    assert.deepEqual(discardHeld(r.id, { by: "Ägaren", storeFile: store }), { ok: true, status: "discarded" });
    resetSink();
    const res = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    assert.equal(res.reason, "status-discarded");
    assert.equal(sinkLines().length, 0);
  });

  await test("misslyckad sändning markeras failed och skickas bara om med --retry-failed", async () => {
    const store = freshStore();
    const r = await sendGated(mail(), { kind: "booking_summary", storeFile: store, smtp: NO_SMTP });
    delete process.env.MAIL_GATE_SINK; // ingen sänka och ingen SMTP → kan inte skickas
    const fail = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP });
    process.env.MAIL_GATE_SINK = SINK;
    assert.equal(fail.status, "failed");
    assert.equal(fail.reason, "smtp-not-configured");
    resetSink();
    assert.equal((await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP })).reason, "status-failed");
    assert.equal(sinkLines().length, 0);
    const retry = await approveAndSend(r.id, { approvedBy: "Ägaren", storeFile: store, smtp: NO_SMTP, retryFailed: true });
    assert.equal(retry.ok, true);
    assert.equal(sinkLines().length, 1);
  });

  // -------------------------------------------------------------------------
  // Fail-closed
  await test("kan mejlet inte sparas skickas det inte heller", async () => {
    const blocker = join(scratch, "not-a-dir");
    writeFileSync(blocker, "x");
    const store = join(blocker, "held-mails.jsonl");
    const r = await sendGated(mail(), { kind: "booking_reminder", storeFile: store, smtp: NO_SMTP });
    assert.deepEqual(r, { sent: false, held: false, error: "held-store-failed" });
    assert.equal(sinkLines().length, 0);
  });

  await test("utan SMTP och utan sänka skickas inget och 'SMTP saknas' loggas", async () => {
    delete process.env.MAIL_GATE_SINK;
    const warnings = [];
    const original = console.warn;
    console.warn = (...a) => warnings.push(a.join(" "));
    try {
      const r = await sendGated(mail(), { kind: "booking_patient_confirmation", storeFile: freshStore(), smtp: NO_SMTP, tag: "booking" });
      assert.equal(r.sent, false);
      assert.equal(r.error, "smtp-not-configured");
    } finally {
      console.warn = original;
      process.env.MAIL_GATE_SINK = SINK;
    }
    assert.ok(warnings.some((w) => w.includes("[booking] SMTP saknas – mejl skickades inte")));
  });

  await test("lagringsplats följer omdirigerad bokningslogg (staging skriver aldrig i prod-kön)", async () => {
    assert.equal(gate.heldStoreFile({ root: "/x", env: { BOOKING_LOG_FILE: "/t/q/bookings.jsonl" } }), "/t/q/held-mails.jsonl");
    assert.equal(gate.heldStoreFile({ root: "/x", env: { MAIL_HELD_FILE: "/m.jsonl", BOOKING_LOG_FILE: "/t/b" } }), "/m.jsonl");
    assert.equal(gate.heldStoreFile({ root: "/x", env: {} }), "/x/.data/held-mails.jsonl");
  });

  // -------------------------------------------------------------------------
  // Statisk vakt: ingen annan kod får nå nodemailer eller ett mejl-API.
  await test("ingen fil utom mail-gate.mjs importerar nodemailer eller anropar ett mejl-API", async () => {
    const offenders = [];
    const pattern = /from\s+["']nodemailer["']|require\(\s*["']nodemailer["']\s*\)|import\(\s*["']nodemailer["']\s*\)|createTransport\s*\(|api\.resend\.com|\/usr\/sbin\/sendmail|\bsendmail\s+-/;
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if ([".git", ".next", "node_modules", ".data", "docs", "output"].includes(entry.name)) continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(m?js|cjs|tsx?|mts)$/.test(entry.name)) {
          const rel = relative(project, full);
          if (rel === "mail-gate.mjs" || /^scripts\/test-[^/]+\.mjs$/.test(rel)) continue;
          if (pattern.test(readFileSync(full, "utf8"))) offenders.push(rel);
        }
      }
    };
    walk(project);
    if (EXTRA) {
      for (const f of readdirSync(EXTRA)) {
        if (f.endsWith(".mjs") && pattern.test(readFileSync(join(EXTRA, f), "utf8"))) offenders.push(`extra/${f}`);
      }
    }
    assert.deepEqual(offenders, []);
    // Och varje utskick i appen deklarerar sin typ.
    const be = readFileSync(join(project, "src/lib/booking-email.ts"), "utf8");
    assert.equal((be.match(/"booking_patient_confirmation", rec\)/g) || []).length, 1);
    assert.equal((be.match(/"booking_owner_notice", rec\)/g) || []).length, 3);
    assert.match(readFileSync(join(project, "src/lib/lead-delivery.ts"), "utf8"), /kind: "lead_owner_notice"/);
  });

  // -------------------------------------------------------------------------
  // Skripten genom grinden (sandlådor; sänka; inget nätverk).
  const cleanEnv = (over = {}) => {
    const env = { ...process.env };
    for (const k of Object.keys(env)) {
      if (/^(SMTP_|BOOKING_|LEAD_|MAIL_HELD_FILE|REMIND|TO$|DRY$|FORCE$|MONTH$|SKIP_JOURNAL$|RESEND)/.test(k)) delete env[k];
    }
    return { ...env, MAIL_GATE_SINK: SINK, ...over };
  };
  const sandbox = (name, files) => {
    const root = join(scratch, `sb-${name}`);
    mkdirSync(root, { recursive: true });
    for (const f of files) copyFileSync(join(project, f), join(root, f.split("/").pop()));
    copyFileSync(GATE, join(root, "mail-gate.mjs"));
    copyFileSync(join(GATE_DIR, "booking-lock.mjs"), join(root, "booking-lock.mjs"));
    symlinkSync(join(project, "node_modules"), join(root, "node_modules"), "dir");
    return root;
  };
  const run = (script, env, args = [], cwd) =>
    spawnSync(process.execPath, [script, ...args], { cwd: cwd || dirname(script), env: cleanEnv(env), encoding: "utf8", timeout: 20_000 });
  const fakeSmtpEnv = ["SMTP_HOST=smtp.example.test", "SMTP_PORT=465", "SMTP_USER=sender@example.test", "SMTP_PASS=synthetic-secret"];
  const cli = join(project, "scripts", "held-mails.mjs");
  const cliRun = (store, args, extraEnv = {}) =>
    spawnSync(process.execPath, [cli, ...args], {
      env: cleanEnv({ MAIL_HELD_FILE: store, ...extraEnv }),
      encoding: "utf8",
      timeout: 20_000,
    });

  await test("paminn-obekraftade: påminnelsen hålls, ägaren notifieras, CLI skickar en gång", async () => {
    const root = sandbox("reminder", ["paminn-obekraftade.mjs"]);
    const bookings = join(root, "bookings.jsonl");
    const store = join(root, "held-mails.jsonl");
    const createdAt = new Date(Date.now() - 70 * 60_000).toISOString();
    const slot = new Date(Date.now() + 7 * 86_400_000).toISOString();
    writeFileSync(bookings, JSON.stringify({ type: "created", id: "rem-1", email: "patient@example.test", name: "Syntetisk", createdAt, slot }) + "\n");
    writeFileSync(
      join(root, ".env.local"),
      [`BOOKING_LOG_FILE=${bookings}`, "BOOKING_SECRET=synthetic-secret-at-least-16", "BOOKING_BASE_URL=https://specialistdirekt.se", ...fakeSmtpEnv].join("\n"),
    );
    const r1 = run(join(root, "paminn-obekraftade.mjs"));
    assert.equal(r1.status, 0, r1.stderr);
    assert.match(r1.stdout, /0 skickade, 1 hålls för godkännande, 0 misslyckade/);
    let out = sinkLines();
    assert.equal(out.length, 1);
    assert.equal(out[0].kind, "held_mail_alert");
    assert.deepEqual(out[0].to, [OWNER_ALERT_TO]);
    const [held] = heldList(store);
    assert.equal(held.kind, "booking_reminder");
    assert.deepEqual(held.message.to, ["patient@example.test"]);
    assert.match(held.message.text, /bekrafta\?id=rem-1&sig=/);
    const reminders = readFileSync(join(root, "booking-reminders.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l));
    assert.deepEqual(reminders, [{ id: "rem-1", held: held.id }]);
    // Andra varvet håller inte en ny påminnelse.
    const r2 = run(join(root, "paminn-obekraftade.mjs"));
    assert.equal(r2.status, 0, r2.stderr);
    assert.equal(heldList(store).length, 1);
    assert.equal(sinkLines().length, 1);

    resetSink();
    const list = cliRun(store, ["--list"]);
    assert.equal(list.status, 0, list.stderr);
    assert.match(list.stdout, new RegExp(held.id));
    const check = cliRun(store, ["--check", held.id]);
    assert.equal(check.status, 0, check.stdout + check.stderr);
    assert.equal(sinkLines().length, 0);
    const noName = cliRun(store, ["--send", held.id]);
    assert.equal(noName.status, 2);
    const send = cliRun(store, ["--send", held.id, "--approved-by", "Ägaren"]);
    assert.equal(send.status, 0, send.stderr);
    out = sinkLines();
    assert.equal(out.length, 1);
    assert.deepEqual(out[0].to, ["patient@example.test"]);
    assert.equal(out[0].text, held.message.text);
    const again = cliRun(store, ["--send", held.id, "--approved-by", "Ägaren"]);
    assert.equal(again.status, 1);
    assert.match(again.stderr, /status-sent/);
    assert.equal(sinkLines().length, 1);
  });

  await test("paminn-obekraftade: bokningen bekräftas innan godkännandet → påminnelsen skickas inte", async () => {
    const root = sandbox("reminder2", ["paminn-obekraftade.mjs"]);
    const bookings = join(root, "bookings.jsonl");
    const store = join(root, "held-mails.jsonl");
    const createdAt = new Date(Date.now() - 70 * 60_000).toISOString();
    const slot = new Date(Date.now() + 7 * 86_400_000).toISOString();
    writeFileSync(bookings, JSON.stringify({ type: "created", id: "rem-2", email: "patient@example.test", name: "S", createdAt, slot }) + "\n");
    writeFileSync(
      join(root, ".env.local"),
      [`BOOKING_LOG_FILE=${bookings}`, "BOOKING_SECRET=synthetic-secret-at-least-16", ...fakeSmtpEnv].join("\n"),
    );
    assert.equal(run(join(root, "paminn-obekraftade.mjs")).status, 0);
    const [held] = heldList(store);
    appendFileSync(bookings, JSON.stringify({ type: "verified", id: "rem-2", at: new Date().toISOString() }) + "\n");
    resetSink();
    const send = cliRun(store, ["--send", held.id, "--approved-by", "Ägaren"]);
    assert.equal(send.status, 1);
    assert.match(send.stderr, /booking-status-verified/);
    assert.equal(sinkLines().length, 0);
    assert.equal(heldList(store)[0].status, "rejected");
    // Godkännandefönstret för en påminnelse är högst 20 minuter.
    assert.ok(Date.parse(held.notAfter) - Date.parse(held.at) <= 20 * 60_000 + 1000);
  });

  await test("maila-bokningar: sammanställningen hålls även till ägaren", async () => {
    const root = sandbox("summary", ["maila-bokningar.mjs", "booking-journal.mjs"]);
    mkdirSync(join(root, "fixtures"));
    writeFileSync(join(root, "fixtures", "leads.jsonl"), JSON.stringify({ receivedAt: "2030-01-01T09:00:00.000Z", name: "Lead", email: "lead@example.test" }) + "\n");
    writeFileSync(join(root, "fixtures", "clicks.jsonl"), JSON.stringify({ at: "2030-01-01T09:00:00.000Z", bot: false }) + "\n");
    const store = join(root, "held.jsonl");
    writeFileSync(
      join(root, ".env.local"),
      ["LEAD_LOG_FILE=fixtures/leads.jsonl", "BOOKING_CLICK_LOG_FILE=fixtures/clicks.jsonl", "BOOKING_TO_EMAIL=visaeb.ab@gmail.com", `MAIL_HELD_FILE=${store}`, ...fakeSmtpEnv].join("\n"),
    );
    const r = run(join(root, "maila-bokningar.mjs"), { SKIP_JOURNAL: "1" });
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /hålls för godkännande/);
    const [held] = heldList(store);
    assert.equal(held.kind, "booking_summary");
    assert.ok(Date.parse(held.notAfter) - Date.parse(held.at) <= 2 * 86_400_000 + 1000);
    assert.ok(sinkLines().every((m) => m.kind === "held_mail_alert"));
  });

  await test("backup-bokningar: till ägaren går ut; till annan adress hålls", async () => {
    const root = sandbox("backup", ["backup-bokningar.mjs"]);
    const script = join(root, "backup-bokningar.mjs");
    const dest = join(root, "backups");
    const original = readFileSync(script, "utf8");
    const patched = original.replace('const DEST = "/root/backups/bokningsdata";', `const DEST = ${JSON.stringify(dest)};`);
    assert.notEqual(patched, original);
    writeFileSync(script, patched);
    mkdirSync(join(root, "fixtures"));
    writeFileSync(
      join(root, "fixtures", "b.jsonl"),
      JSON.stringify({ type: "created", id: "bk", slot: "2030-01-05T09:00:00.000Z", name: "Syntetisk Patient", email: "p@example.test", phone: "070", status: "pending", createdAt: "2030-01-01T09:00:00.000Z" }) + "\n",
    );
    writeFileSync(join(root, "fixtures", "l.jsonl"), "");
    writeFileSync(join(root, "fixtures", "c.jsonl"), "");
    const store = join(root, "held.jsonl");
    writeFileSync(
      join(root, ".env.local"),
      ["BOOKING_LOG_FILE=fixtures/b.jsonl", "LEAD_LOG_FILE=fixtures/l.jsonl", "BOOKING_CLICK_LOG_FILE=fixtures/c.jsonl", "BOOKING_TO_EMAIL=visaeb.ab@gmail.com", `MAIL_HELD_FILE=${store}`, ...fakeSmtpEnv].join("\n"),
    );
    const own = run(script, { FORCE: "1" });
    assert.equal(own.status, 0, own.stderr);
    let out = sinkLines();
    assert.equal(out.length, 1);
    assert.equal(out[0].kind, "booking_backup");
    assert.deepEqual(out[0].to, ["visaeb.ab@gmail.com"]);
    assert.match(out[0].attachments.find((a) => a.filename.startsWith("bokningar-")).content, /Syntetisk Patient/);
    assert.equal(existsSync(store), false);
    resetSink();
    const other = run(script, { FORCE: "1", TO: "maryam@example.test" });
    assert.equal(other.status, 0, other.stderr);
    assert.match(other.stdout, /hålls för godkännande/);
    out = sinkLines();
    assert.equal(out.length, 1);
    assert.equal(out[0].kind, "held_mail_alert");
    const [held] = heldList(store);
    assert.equal(held.kind, "booking_backup");
    assert.equal(held.reason, "not-owner-only");
    assert.equal(held.message.attachments.length, 2);
  });

  if (EXTRA && existsSync(join(EXTRA, "specialistdirekt-check-mail.mjs"))) {
    await test("booking-check-mejlet (Maryam) hålls alltid", async () => {
      const root = sandbox("check", []);
      writeFileSync(join(root, ".env.local"), fakeSmtpEnv.join("\n"));
      const store = join(root, "held.jsonl");
      const r = spawnSync(process.execPath, [join(EXTRA, "specialistdirekt-check-mail.mjs"), "maryam@example.test", "Specialistdirekt: problem"], {
        input: "FEL: syntetisk rapport BODY-SECRET-7f3a",
        env: cleanEnv({ SPECIALISTDIREKT_ROOT: root, MAIL_HELD_FILE: store }),
        encoding: "utf8",
        timeout: 20_000,
      });
      assert.equal(r.status, 0, r.stderr);
      assert.match(r.stdout, /hålls för godkännande: hm-/);
      const [held] = heldList(store);
      assert.equal(held.kind, "booking_check_alert");
      const out = sinkLines();
      assert.equal(out.length, 1);
      assert.equal(out[0].kind, "held_mail_alert");
      assert.doesNotMatch(JSON.stringify(out[0]), /BODY-SECRET/);
      // Även till ägaren hålls typen.
      resetSink();
      const own = spawnSync(process.execPath, [join(EXTRA, "specialistdirekt-check-mail.mjs"), "visaeb.ab@gmail.com", "x"], {
        input: "y",
        env: cleanEnv({ SPECIALISTDIREKT_ROOT: root, MAIL_HELD_FILE: store }),
        encoding: "utf8",
      });
      assert.equal(own.status, 0, own.stderr);
      assert.match(own.stdout, /hålls/);
    });

    await test("resend-lost-leads hålls", async () => {
      const root = sandbox("resend", []);
      copyFileSync(join(EXTRA, "resend-lost-leads.mjs"), join(root, "resend-lost-leads.mjs"));
      const store = join(root, "held.jsonl");
      writeFileSync(join(root, ".env.local"), ["LEAD_TO_EMAIL=info@specialistdirekt.se", `MAIL_HELD_FILE=${store}`, ...fakeSmtpEnv].join("\n"));
      const bin = join(root, "bin");
      mkdirSync(bin);
      writeFileSync(join(bin, "journalctl"), "#!/bin/sh\necho 'Nov 01 host app: [lead] Ny förfrågan { name: Syntetisk }'\n");
      chmodSync(join(bin, "journalctl"), 0o755);
      const r = spawnSync(process.execPath, [join(root, "resend-lost-leads.mjs")], {
        cwd: root,
        env: cleanEnv({ PATH: `${bin}:${process.env.PATH}` }),
        encoding: "utf8",
      });
      assert.equal(r.status, 0, r.stderr);
      assert.match(r.stdout, /hålls för godkännande/);
      assert.equal(heldList(store)[0].kind, "lead_resend");
      assert.ok(sinkLines().every((m) => m.kind === "held_mail_alert"));
    });
  } else {
    console.log("skip extra/ (EXTRA_SCRIPTS_DIR ej satt)");
  }

  console.log(`mail gate: ${passed} tester godkända`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
