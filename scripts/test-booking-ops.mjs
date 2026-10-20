import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LEGACY_LEAD_JOURNAL_ARGS,
  parseLegacyJournalLeads,
} from "../booking-journal.mjs";

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const scratch = mkdtempSync(join(tmpdir(), "specialistdirekt-booking-ops-"));
const clearedKeys = [
  "BOOKING_BASE_URL",
  "BOOKING_CLICK_LOG_FILE",
  "BOOKING_LOG_FILE",
  "BOOKING_SECRET",
  "BOOKING_TO_EMAIL",
  "DRY",
  "FORCE",
  "LEAD_LOG_FILE",
  "LEAD_TO_EMAIL",
  "MONTH",
  "REMINDER_LOG_FILE",
  "REMIND_AFTER_MIN",
  "SKIP_JOURNAL",
  "SMTP_HOST",
  "SMTP_PASS",
  "SMTP_PORT",
  "SMTP_TEST_DELAY_MS",
  "SMTP_TEST_LOG",
  "SMTP_USER",
  "TO",
];

function cleanEnv(overrides = {}) {
  const env = { ...process.env };
  for (const key of clearedKeys) delete env[key];
  return { ...env, ...overrides };
}

function sandbox(name, files, { linkDependencies = true } = {}) {
  const root = join(scratch, name);
  mkdirSync(root, { recursive: true });
  for (const file of files) copyFileSync(join(project, file), join(root, basename(file)));
  if (linkDependencies) {
    symlinkSync(join(project, "node_modules"), join(root, "node_modules"), "dir");
  }
  return root;
}

function run(script, args = [], options = {}) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: options.cwd || dirname(script),
    env: cleanEnv(options.env),
    encoding: "utf8",
    timeout: 10_000,
  });
}

function writeJsonl(path, records) {
  writeFileSync(path, records.map((record) => JSON.stringify(record)).join("\n") + "\n");
}

function spawnCaptured(script, options = {}) {
  const child = spawn(process.execPath, [script, ...(options.args || [])], {
    cwd: options.cwd || dirname(script),
    env: cleanEnv(options.env),
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });
  const result = new Promise((resolve) => {
    child.on("exit", (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
  return { child, result };
}

async function waitFor(path, timeoutMs = 2_000) {
  const deadline = Date.now() + timeoutMs;
  while (!existsSync(path)) {
    if (Date.now() >= deadline) throw new Error(`Timed out waiting for ${path}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

function nextStockholmWeekend() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Stockholm",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let candidate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  for (let index = 0; index < 8; index++, candidate = new Date(candidate.getTime() + 86_400_000)) {
    const parts = formatter.formatToParts(candidate);
    const get = (type) => parts.find((part) => part.type === type)?.value;
    if (["Sat", "Sun"].includes(get("weekday"))) {
      return `${get("year")}-${get("month")}-${get("day")} 10:00`;
    }
  }
  throw new Error("Could not find a weekend test slot");
}

try {
  // backup-bokningar: .env.local-styrda filer ska läsas, men DRY får inte
  // ens ändra deras filrättigheter.
  {
    const root = sandbox("backup", ["backup-bokningar.mjs"], { linkDependencies: false });
    const backupScript = join(root, "backup-bokningar.mjs");
    const backupDest = join(root, "backups");
    const originalBackupScript = readFileSync(backupScript, "utf8");
    const isolatedBackupScript = originalBackupScript.replace(
      'const DEST = "/root/backups/bokningsdata";',
      `const DEST = ${JSON.stringify(backupDest)};`,
    );
    assert.notEqual(isolatedBackupScript, originalBackupScript);
    writeFileSync(backupScript, isolatedBackupScript);

    const nodemailer = join(root, "node_modules", "nodemailer");
    mkdirSync(nodemailer, { recursive: true });
    writeFileSync(
      join(nodemailer, "package.json"),
      JSON.stringify({ name: "nodemailer", type: "module", exports: "./index.js" }),
    );
    writeFileSync(
      join(nodemailer, "index.js"),
      `import { writeFileSync } from "node:fs";
export default {
  createTransport() {
    return {
      async sendMail(message) {
        writeFileSync(process.env.SMTP_TEST_LOG, JSON.stringify({
          to: message.to,
          attachments: message.attachments.map((item) => ({ filename: item.filename, content: String(item.content) })),
        }));
        return { accepted: [message.to] };
      },
    };
  },
};
`,
    );
    const fixtures = join(root, "fixtures");
    mkdirSync(fixtures);
    const bookings = join(fixtures, "custom-bookings.jsonl");
    const leads = join(fixtures, "custom-leads.jsonl");
    const clicks = join(fixtures, "custom-clicks.jsonl");
    writeJsonl(bookings, [
      null,
      {},
      {
        type: "created",
        id: "impossible-date",
        slot: "2030-04-31T09:00:00.000Z",
        name: "Poison Date",
        email: "poison@example.test",
        phone: "0700000000",
        status: "pending",
        createdAt: "2030-01-01T09:00:00.000Z",
      },
      {
        type: "created",
        id: "synthetic-booking",
        slot: "2030-01-05T09:00:00.000Z",
        name: "Synthetic Patient",
        email: "patient@example.test",
        phone: "0700000000",
        childName: { toString: 5, valueOf: 5 },
        childBirthDate: { toString: 5, valueOf: 5 },
        verifiedAt: { toString: 5, valueOf: 5 },
        cancelledAt: { toString: 5, valueOf: 5 },
        status: "pending",
        createdAt: "2030-01-01T09:00:00.000Z",
      },
    ]);
    writeJsonl(leads, [
      { preferredDates: {} },
      { receivedAt: "2030-01-01T09:00:00.000Z", name: "Synthetic Lead", email: "lead@example.test" },
    ]);
    writeJsonl(clicks, [{ at: "2030-01-01T09:00:00.000Z", bot: false }]);
    for (const path of [bookings, leads, clicks]) chmodSync(path, 0o640);
    writeFileSync(
      join(root, ".env.local"),
      [
        "BOOKING_LOG_FILE=fixtures/custom-bookings.jsonl",
        "LEAD_LOG_FILE=fixtures/custom-leads.jsonl",
        "BOOKING_CLICK_LOG_FILE=fixtures/custom-clicks.jsonl",
        "BOOKING_TO_EMAIL=qa@example.test",
        "SMTP_HOST=smtp.example.test",
        "SMTP_PORT=465",
        "SMTP_USER=sender@example.test",
        "SMTP_PASS=synthetic-secret",
      ].join("\n"),
    );

    const before = [bookings, leads, clicks].map((path) => ({
      path,
      mode: statSync(path).mode & 0o777,
      content: readFileSync(path, "utf8"),
    }));
    const result = run(backupScript, [], { env: { DRY: "1" } });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /DRY: 1 bokningar \(1 aktiva\), 1 förfrågningar/);
    assert.equal(existsSync(join(root, ".data")), false);
    for (const snapshot of before) {
      assert.equal(statSync(snapshot.path).mode & 0o777, snapshot.mode);
      assert.equal(readFileSync(snapshot.path, "utf8"), snapshot.content);
    }

    const sendLog = join(root, "backup-send.json");
    const fullRun = run(backupScript, [], {
      env: { FORCE: "1", SMTP_TEST_LOG: sendLog },
    });
    assert.equal(fullRun.status, 0, fullRun.stderr);
    assert.equal(existsSync(backupDest), true);
    const sent = JSON.parse(readFileSync(sendLog, "utf8"));
    assert.equal(sent.to, "qa@example.test");
    const bookingAttachment = sent.attachments.find((item) =>
      item.filename.startsWith("bokningar-"),
    );
    assert.ok(bookingAttachment);
    assert.match(bookingAttachment.content, /Synthetic Patient/);
    assert.doesNotMatch(bookingAttachment.content, /\[object Object\]/);
  }

  // maila-bokningar: senare giltiga journalblock ska överleva en trasig
  // tidsstämpel och mottagaren får aldrig falla tillbaka till en hårdkodad adress.
  {
    const root = sandbox("mail", ["maila-bokningar.mjs", "booking-journal.mjs"]);
    const fixtures = join(root, "fixtures");
    mkdirSync(fixtures);
    writeJsonl(join(fixtures, "leads.jsonl"), [
      {
        receivedAt: "2030-04-31T09:00:00.000Z",
        name: "Poison File Lead",
        email: "poison@example.test",
      },
      { receivedAt: "2030-01-01T09:00:00.000Z", name: "File Lead", email: "file@example.test" },
    ]);
    writeJsonl(join(fixtures, "clicks.jsonl"), [
      { at: "2030-01-01T09:00:00.000Z", target: "/boka-tid", bot: false },
    ]);
    writeFileSync(
      join(root, ".env.local"),
      [
        "LEAD_LOG_FILE=fixtures/leads.jsonl",
        "BOOKING_CLICK_LOG_FILE=fixtures/clicks.jsonl",
        "SMTP_HOST=smtp.example.test",
        "SMTP_USER=sender@example.test",
        "SMTP_PASS=synthetic-secret",
      ].join("\n"),
    );
    const fileDry = run(join(root, "maila-bokningar.mjs"), [], {
      env: { DRY: "1", SKIP_JOURNAL: "1" },
    });
    assert.equal(fileDry.status, 0, fileDry.stderr);
    assert.match(fileDry.stdout, /DRY: 1 tidsförfrågningar och 1 bokningsklick/);

    const parsed = parseLegacyJournalLeads(`NOT_A_DATE host app: [lead] Ny förfrågan
NOT_A_DATE host app: name: 'Broken Lead'
NOT_A_DATE host app: email: 'broken@example.test'
2030-01-02T10:00:00+0100 host app: [lead] Ny förfrågan
2030-01-02T10:00:00+0100 host app: name: 'Journal Lead'
2030-01-02T10:00:00+0100 host app: email: 'journal@example.test'`);
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].email, "journal@example.test");
    assert.deepEqual(LEGACY_LEAD_JOURNAL_ARGS.slice(0, 5), [
      "-u",
      "specialistdirekt",
      "--no-pager",
      "-o",
      "short-iso",
    ]);
    assert.equal(
      LEGACY_LEAD_JOURNAL_ARGS.includes(String.raw`--grep=\[lead\] Ny förfrågan`),
      true,
    );

    const bounded = parseLegacyJournalLeads(
      [
        "2030-01-03T10:00:00+0100 host app: [lead] Ny förfrågan",
        "host app: name: 'Bounded Lead'",
        ...Array.from({ length: 8 }, (_, index) => `host app: unrelated-${index}`),
        "host app: email: 'must-not-bleed@example.test'",
      ].join("\n"),
    );
    assert.equal(bounded.length, 1);
    assert.equal(bounded[0].email, "");

    const noRecipient = run(join(root, "maila-bokningar.mjs"), [], {
      env: { SKIP_JOURNAL: "1" },
    });
    assert.equal(noRecipient.status, 1);
    assert.match(noRecipient.stderr, /ange en behörig mottagare/);
  }

  // blockera-tid: konfigurationen ska komma från skriptets .env.local även
  // när kommandot startas från en annan arbetskatalog.
  {
    const root = sandbox("block", ["blockera-tid.mjs", "booking-lock.mjs"]);
    const fixtures = join(root, "fixtures");
    mkdirSync(fixtures);
    const customLog = join(fixtures, "manual-bookings.jsonl");
    writeFileSync(join(root, ".env.local"), "BOOKING_LOG_FILE=fixtures/manual-bookings.jsonl\n");

    const impossible = run(
      join(root, "blockera-tid.mjs"),
      ["2027-04-31 10:00", "Impossible normalized date"],
      { cwd: scratch },
    );
    assert.equal(impossible.status, 1);
    assert.match(impossible.stderr, /inte en giltig svensk lokal tid/);
    assert.equal(existsSync(customLog), false);

    const past = run(
      join(root, "blockera-tid.mjs"),
      ["2020-01-04 10:00", "Past synthetic date"],
      { cwd: scratch },
    );
    assert.equal(past.status, 1);
    assert.match(past.stderr, /har redan passerat/);
    assert.equal(existsSync(customLog), false);

    const result = run(
      join(root, "blockera-tid.mjs"),
      [nextStockholmWeekend(), "Synthetic manual booking"],
      { cwd: scratch },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.equal(existsSync(customLog), true);
    assert.equal(existsSync(join(root, ".data", "bookings.jsonl")), false);
    let events = readFileSync(customLog, "utf8").trim().split("\n").map(JSON.parse);
    assert.deepEqual(events.map((event) => event.type), ["created", "verified"]);
    assert.equal(events[0].createdBy, "specialistdirekt:blockera-tid:v1");
    const manualId = events[0].id;

    const legacyManualId = "synthetic-legacy-manual-block";
    const legacyManualAt = new Date().toISOString();
    writeFileSync(
      customLog,
      [
        JSON.stringify({
          type: "created",
          id: legacyManualId,
          slot: new Date(Date.now() + 21 * 24 * 60 * 60_000).toISOString(),
          name: "Legacy synthetic manual block",
          email: "",
          phone: "",
          message: "Blockerad med blockera-tid.mjs – bokad utanför sajten.",
          status: "pending",
          createdAt: legacyManualAt,
        }),
        JSON.stringify({ type: "verified", id: legacyManualId, at: legacyManualAt }),
      ].join("\n") + "\n",
      { flag: "a" },
    );

    const patientId = "synthetic-patient-booking";
    const patientSlot = new Date(Date.now() + 14 * 24 * 60 * 60_000).toISOString();
    const patientCreatedAt = new Date().toISOString();
    writeFileSync(
      customLog,
      [
        JSON.stringify({
          type: "created",
          id: patientId,
          slot: patientSlot,
          name: "Synthetic Patient",
          email: "patient@example.test",
          phone: "0700000000",
          status: "pending",
          createdAt: patientCreatedAt,
        }),
        JSON.stringify({ type: "verified", id: patientId, at: patientCreatedAt }),
      ].join("\n") + "\n",
      { flag: "a" },
    );
    const beforeRefusal = readFileSync(customLog, "utf8");
    const refused = run(join(root, "blockera-tid.mjs"), ["--avblockera", patientId], {
      cwd: scratch,
    });
    assert.equal(refused.status, 1);
    assert.match(refused.stderr, /Vägrar avblockera/);
    assert.equal(readFileSync(customLog, "utf8"), beforeRefusal);

    const reopenedLegacy = run(
      join(root, "blockera-tid.mjs"),
      ["--avblockera", legacyManualId],
      { cwd: scratch },
    );
    assert.equal(reopenedLegacy.status, 0, reopenedLegacy.stderr);

    const reopened = run(join(root, "blockera-tid.mjs"), ["--avblockera", manualId], {
      cwd: scratch,
    });
    assert.equal(reopened.status, 0, reopened.stderr);
    events = readFileSync(customLog, "utf8").trim().split("\n").map(JSON.parse);
    assert.deepEqual(
      events.filter((event) => event.type === "cancelled").map((event) => event.id),
      [legacyManualId, manualId],
    );
  }

  // paminn-obekraftade: validera URL/SMTP, läs om status under bokningslåset
  // och serialisera samtidiga körningar med ett separat lås över SMTP.
  {
    const root = sandbox(
      "reminder",
      ["paminn-obekraftade.mjs", "booking-lock.mjs"],
      { linkDependencies: false },
    );
    const bookings = join(root, "bookings.jsonl");
    const reminders = join(root, "reminders.jsonl");
    const sendLog = join(root, "smtp-sends.log");
    const nodemailer = join(root, "node_modules", "nodemailer");
    mkdirSync(nodemailer, { recursive: true });
    writeFileSync(
      join(nodemailer, "package.json"),
      JSON.stringify({ name: "nodemailer", type: "module", exports: "./index.js" }),
    );
    writeFileSync(
      join(nodemailer, "index.js"),
      `import { appendFileSync } from "node:fs";
export default {
  createTransport() {
    return {
      async sendMail(message) {
        if (process.env.SMTP_TEST_LOG) appendFileSync(process.env.SMTP_TEST_LOG, message.to + "\\n");
        const delay = Number(process.env.SMTP_TEST_DELAY_MS || 0);
        if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
        return { accepted: [message.to] };
      },
    };
  },
};
`,
    );

    const validSmtp = [
      "SMTP_HOST=smtp.example.test",
      "SMTP_PORT=465",
      "SMTP_USER=sender@example.test",
      "SMTP_PASS=synthetic-secret",
    ];
    const envLines = (base, smtp = validSmtp) =>
      [
        `BOOKING_LOG_FILE=${bookings}`,
        `REMINDER_LOG_FILE=${reminders}`,
        "BOOKING_SECRET=synthetic-secret-at-least-16",
        `BOOKING_BASE_URL=${base}`,
        ...smtp,
      ].join("\n");
    const writePending = (id) => {
      const createdAt = new Date(Date.now() - 70 * 60_000).toISOString();
      const slot = new Date(Date.now() + 7 * 24 * 60 * 60_000).toISOString();
      writeJsonl(bookings, [
        null,
        {
          type: "created",
          id,
          email: "patient@example.test",
          name: "Synthetic Patient",
          createdAt,
          slot,
        },
      ]);
    };

    writeFileSync(join(root, ".env.local"), envLines("https://specialistdirekt.se.evil"));
    const invalidBase = run(join(root, "paminn-obekraftade.mjs"), [], { env: { DRY: "1" } });
    assert.equal(invalidBase.status, 1);
    assert.match(invalidBase.stderr, /BOOKING_BASE_URL måste vara den kanoniska HTTPS-adressen/);

    const poisonCreatedAt = new Date(Date.now() - 70 * 60_000).toISOString();
    const poisonValidSlot = new Date(Date.now() + 7 * 24 * 60 * 60_000).toISOString();
    writeJsonl(bookings, [
      {
        type: "created",
        id: "impossible-reminder-slot",
        email: "poison@example.test",
        createdAt: poisonCreatedAt,
        slot: "2027-04-31T10:00:00.000Z",
      },
      {
        type: "created",
        id: "valid-after-poison",
        name: { toString: 5, valueOf: 5 },
        email: "patient@example.test",
        createdAt: poisonCreatedAt,
        slot: poisonValidSlot,
      },
      {
        type: "verified",
        id: "valid-after-poison",
        at: "2027-04-31T10:00:00.000Z",
      },
    ]);
    writeFileSync(join(root, ".env.local"), envLines("https://specialistdirekt.se"));
    const poisonRun = run(join(root, "paminn-obekraftade.mjs"), [], {
      env: { SMTP_TEST_LOG: sendLog },
    });
    assert.equal(poisonRun.status, 0, poisonRun.stderr);
    assert.equal(readFileSync(sendLog, "utf8").trim(), "patient@example.test");
    rmSync(reminders, { force: true });
    rmSync(sendLog, { force: true });

    writePending("missing-smtp");
    writeFileSync(
      join(root, ".env.local"),
      envLines("https://specialistdirekt.se", ["SMTP_PORT=465"]),
    );
    const missingSmtp = run(join(root, "paminn-obekraftade.mjs"));
    assert.equal(missingSmtp.status, 1);
    assert.match(missingSmtp.stderr, /SMTP_HOST, SMTP_USER, SMTP_PASS saknas eller är tom/);

    for (const invalidPort of ["Infinity", "65536", "1.5"]) {
      writePending(`invalid-port-${invalidPort}`);
      writeFileSync(
        join(root, ".env.local"),
        envLines("https://specialistdirekt.se", [
          "SMTP_HOST=smtp.example.test",
          `SMTP_PORT=${invalidPort}`,
          "SMTP_USER=sender@example.test",
          "SMTP_PASS=synthetic-secret",
        ]),
      );
      const invalidSmtpPort = run(join(root, "paminn-obekraftade.mjs"));
      assert.equal(invalidSmtpPort.status, 1);
      assert.match(invalidSmtpPort.stderr, /SMTP_PORT måste vara ett heltal mellan 1 och 65535/);
    }
    assert.equal(existsSync(sendLog), false);

    writeFileSync(join(root, ".env.local"), envLines("https://specialistdirekt.se"));
    writePending("synthetic-reminder");
    const helper = join(root, "verify-under-lock.mjs");
    writeFileSync(
      helper,
      `import { appendFileSync } from "node:fs";
import { withBookingLock } from "./booking-lock.mjs";
const file = process.argv[2];
const wait = new Int32Array(new SharedArrayBuffer(4));
withBookingLock(file, () => {
  Atomics.wait(wait, 0, 0, 2500);
  appendFileSync(file, JSON.stringify({ type: "verified", id: "synthetic-reminder", at: new Date().toISOString() }) + "\\n");
});
`,
    );
    const verifier = spawn(process.execPath, [helper, bookings], {
      cwd: root,
      env: cleanEnv(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    const verifierDone = new Promise((resolve) => {
      verifier.on("exit", (code, signal) => resolve({ code, signal }));
    });
    await waitFor(`${bookings}.lock`);
    const reminder = run(join(root, "paminn-obekraftade.mjs"));
    const verifierResult = await verifierDone;
    assert.deepEqual(verifierResult, { code: 0, signal: null });
    assert.equal(reminder.status, 0, reminder.stderr);
    assert.equal(existsSync(reminders), false);

    writePending("concurrent-reminder");
    rmSync(reminders, { force: true });
    rmSync(sendLog, { force: true });
    const reminderEnv = { SMTP_TEST_LOG: sendLog, SMTP_TEST_DELAY_MS: "800" };
    const first = spawnCaptured(join(root, "paminn-obekraftade.mjs"), { env: reminderEnv });
    await waitFor(`${reminders}.run.lock`);
    const second = spawnCaptured(join(root, "paminn-obekraftade.mjs"), { env: reminderEnv });
    const [firstResult, secondResult] = await Promise.all([first.result, second.result]);
    assert.equal(firstResult.code, 0, firstResult.stderr);
    assert.equal(secondResult.code, 0, secondResult.stderr);
    assert.match(secondResult.stdout, /en annan påminnelsekörning pågår/);
    assert.equal(readFileSync(sendLog, "utf8").trim().split("\n").length, 1);
    const reminderRecords = readFileSync(reminders, "utf8").trim().split("\n").map(JSON.parse);
    assert.deepEqual(reminderRecords, [{ id: "concurrent-reminder" }]);
    assert.equal(existsSync(`${reminders}.run.lock`), false);
  }

  console.log("booking operations: focused safety checks passed");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
