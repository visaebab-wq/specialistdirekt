// held-mails.mjs — granska och godkänn mejl som mejlgrinden (mail-gate.mjs) håller.
//
//   node scripts/held-mails.mjs --list [--all]
//   node scripts/held-mails.mjs --show ID
//   node scripts/held-mails.mjs --check ID                 # kontrollera utan att skicka
//   node scripts/held-mails.mjs --send ID --approved-by NAMN [--retry-failed]
//   node scripts/held-mails.mjs --discard ID --by NAMN [--reason TEXT]
//
// --send kör om kontrollerna (utgången länk, ändrad eller avbokad bokning,
// för gammalt mejl) och skickar EXAKT den sparade texten, högst en gång. Ett
// mejl som inte längre stämmer skickas inte; det markeras "rejected".
//
// Lagringen är .data/held-mails.jsonl i projektroten (MAIL_HELD_FILE överstyr).

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  approveAndSend,
  discardHeld,
  heldStoreFile,
  readHeld,
  smtpFromEnv,
  validateHeld,
} from "../mail-gate.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const env = {};
try {
  for (const line of readFileSync(join(ROOT, ".env.local"), "utf8").split("\n")) {
    if (line.trim().startsWith("#")) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // Utan .env.local går det fortfarande att lista och granska.
}
const envValue = (key) => process.env[key] || env[key];
const STORE = heldStoreFile({ root: ROOT, env: envValue });

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length && !args[i + 1].startsWith("--") ? args[i + 1] : "";
};

function usage(code = 2) {
  console.error(
    "Användning:\n" +
      "  node scripts/held-mails.mjs --list [--all]\n" +
      "  node scripts/held-mails.mjs --show ID\n" +
      "  node scripts/held-mails.mjs --check ID\n" +
      "  node scripts/held-mails.mjs --send ID --approved-by NAMN [--retry-failed]\n" +
      "  node scripts/held-mails.mjs --discard ID --by NAMN [--reason TEXT]",
  );
  process.exit(code);
}

function load(id) {
  const rec = readHeld(STORE).byId.get(id);
  if (!rec) {
    console.error(`Okänt id: ${id}`);
    process.exit(1);
  }
  return rec;
}

const recipients = (m) =>
  [m.to.join(", "), m.cc.length ? `cc ${m.cc.join(", ")}` : "", m.bcc.length ? `bcc ${m.bcc.length} st` : ""]
    .filter(Boolean)
    .join(" · ");

if (flag("--list")) {
  const all = flag("--all");
  const rows = [...readHeld(STORE).byId.values()].filter((r) => all || r.status === "held" || r.status === "failed");
  if (rows.length === 0) {
    console.log(all ? "Inga hållna mejl." : "Inga mejl väntar på godkännande.");
    process.exit(0);
  }
  for (const r of rows) {
    const v = r.status === "held" ? validateHeld(r) : null;
    console.log(
      [
        r.id,
        r.status + (v && !v.ok ? ` (skulle inte skickas: ${v.reason})` : ""),
        r.kind,
        r.at,
        `till ${recipients(r.message)}`,
        `ämne: ${r.message.subject}`,
        `godkänn senast ${r.notAfter}`,
      ].join(" | "),
    );
  }
  process.exit(0);
}

if (flag("--show")) {
  const id = value("--show") || usage();
  const r = load(id);
  const v = validateHeld(r);
  console.log(`Id:        ${r.id}`);
  console.log(`Status:    ${r.status}`);
  console.log(`Typ:       ${r.kind} (hölls: ${r.reason}; källa ${r.source})`);
  console.log(`Hölls:     ${r.at}`);
  console.log(`Senast:    ${r.notAfter}`);
  console.log(`Kontroll:  ${v.ok ? "OK – kan skickas" : `skulle INTE skickas (${v.reason})`}`);
  console.log(`Från:      ${r.message.from}`);
  console.log(`Till:      ${recipients(r.message)}`);
  if (r.message.replyTo) console.log(`Svar till: ${r.message.replyTo}`);
  console.log(`Ämne:      ${r.message.subject}`);
  if (r.message.attachments.length)
    console.log(`Bilagor:   ${r.message.attachments.map((a) => a.filename).join(", ")}`);
  if (r.message.html) console.log(`HTML:      ja (${r.message.html.length} tecken; texten nedan skickas som textdel)`);
  for (const h of r.history) console.log(`Händelse:  ${h.type} ${h.at || ""} ${h.by || ""} ${h.reason || h.error || ""}`.trimEnd());
  console.log("\n----- text -----\n" + r.message.text + "\n----------------");
  process.exit(0);
}

if (flag("--check")) {
  const id = value("--check") || usage();
  const r = load(id);
  const v = r.status === "held" ? validateHeld(r) : { ok: false, reason: `status-${r.status}` };
  console.log(v.ok ? `OK – ${id} kan skickas` : `${id} skulle inte skickas: ${v.reason}`);
  process.exit(v.ok ? 0 : 1);
}

if (flag("--send")) {
  const id = value("--send") || usage();
  const by = value("--approved-by");
  if (!by) {
    console.error("--approved-by NAMN krävs – vem godkände utskicket?");
    process.exit(2);
  }
  const result = await approveAndSend(id, {
    approvedBy: by,
    storeFile: STORE,
    smtp: smtpFromEnv(envValue),
    retryFailed: flag("--retry-failed"),
  });
  if (result.ok) {
    console.log(`Skickat: ${id} (godkänt av ${by}).`);
    process.exit(0);
  }
  console.error(`Inte skickat: ${id} – ${result.reason}${result.status ? ` (status ${result.status})` : ""}`);
  process.exit(1);
}

if (flag("--discard")) {
  const id = value("--discard") || usage();
  const by = value("--by");
  if (!by) {
    console.error("--by NAMN krävs.");
    process.exit(2);
  }
  const result = discardHeld(id, { by, storeFile: STORE, reason: value("--reason") });
  if (result.ok) {
    console.log(`Slängt: ${id}. Inget skickades.`);
    process.exit(0);
  }
  console.error(`Kunde inte slänga ${id}: ${result.reason}`);
  process.exit(1);
}

usage();
