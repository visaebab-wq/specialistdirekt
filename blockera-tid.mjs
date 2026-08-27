// Blockerar en tid i bokningskalendern – för tider som bokats utanför sajten
// (telefon, på plats, återbesök). Tiden försvinner då ur kalendern så att ingen
// kan boka den igen.
//
//   node blockera-tid.mjs "2026-08-22 15:20" "Bokad via telefon"
//   node blockera-tid.mjs --lista            (visar upptagna tider framåt)
//   node blockera-tid.mjs --avblockera <id>  (öppnar tiden igen)
//
// Tiden anges i SVENSK tid, precis som den står i kalendern.
//
// Skrivsättet följer bokningsloggens egna regler: filen är append-only och
// tillståndet räknas fram genom att spela upp den. Vi skriver därför ett
// "created"- och ett "verified"-event, samma par som en patient som bokat och
// bekräftat – bara bekräftade bokningar håller sin lucka för alltid (obekräftade
// släpps efter två timmar, och då hade tiden dykt upp i kalendern igen).

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";

const TZ = "Europe/Stockholm";
const FILE = process.env.BOOKING_LOG_FILE || join(process.cwd(), ".data", "bookings.jsonl");

// Öppettider – måste stämma med src/lib/booking-slots.ts.
const WEEKDAYS = [6, 0]; // lördag, söndag
const START_HOUR = 10;
const END_HOUR = 16;
const SLOT_MINUTES = 40;

function readEvents() {
  if (!existsSync(FILE)) return [];
  return readFileSync(FILE, "utf8")
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
}

function allBookings() {
  const byId = new Map();
  for (const ev of readEvents()) {
    if (ev.type === "created") {
      const { type, ...rec } = ev;
      byId.set(rec.id, { ...rec });
    } else {
      const rec = byId.get(ev.id);
      if (!rec) continue;
      if (ev.type === "verified") rec.status = "verified";
      if (ev.type === "cancelled") rec.status = "cancelled";
    }
  }
  return [...byId.values()];
}

/** Skillnaden mellan svensk tid och UTC vid en given tidpunkt (klarar sommartid). */
function tzOffsetMs(instant) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (t) => Number(parts.find((p) => p.type === t)?.value ?? "0");
  return (
    Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second")) -
    instant.getTime()
  );
}

/** Svensk lokaltid -> UTC-instant. Två varv, eftersom offseten beror på tidpunkten. */
function stockholmToUtc(y, m, d, hh, mm) {
  const naive = Date.UTC(y, m - 1, d, hh, mm, 0, 0);
  let instant = naive - tzOffsetMs(new Date(naive));
  instant = naive - tzOffsetMs(new Date(instant));
  return new Date(instant);
}

function label(iso) {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  const time = new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return `${date} kl. ${time}`;
}

function weekday(instant) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(instant);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name);
}

function isRealSlot(d) {
  if (!WEEKDAYS.includes(weekday(d))) return "tiden ligger inte på en lördag eller söndag";
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(d);
  const val = (t) => Number(parts.find((p) => p.type === t)?.value ?? "0");
  const minutes = (val("hour") % 24) * 60 + val("minute");
  if (minutes < START_HOUR * 60 || minutes + SLOT_MINUTES > END_HOUR * 60)
    return `tiden ligger utanför öppettiderna ${START_HOUR}:00–${END_HOUR}:00`;
  if ((minutes - START_HOUR * 60) % SLOT_MINUTES !== 0)
    return `tiden ligger inte på en lucka (var ${SLOT_MINUTES}:e minut från ${START_HOUR}:00)`;
  return null;
}

function append(event) {
  mkdirSync(dirname(FILE), { recursive: true });
  appendFileSync(FILE, JSON.stringify(event) + "\n", "utf8");
}

// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args[0] === "--lista") {
  const now = Date.now();
  const upcoming = allBookings()
    .filter((b) => b.status !== "cancelled" && Date.parse(b.slot) > now)
    .sort((a, b) => a.slot.localeCompare(b.slot));
  if (!upcoming.length) {
    console.log("Inga upptagna tider framåt.");
  } else {
    console.log("Upptagna tider framåt:\n");
    for (const b of upcoming) {
      console.log(`  ${label(b.slot)}  –  ${b.name}  [${b.status}]  ${b.id}`);
    }
  }
  process.exit(0);
}

if (args[0] === "--avblockera") {
  const id = args[1];
  const rec = allBookings().find((b) => b.id === id);
  if (!rec) {
    console.error(`Hittar ingen bokning med id ${id}. Kör --lista för att se dem.`);
    process.exit(1);
  }
  if (rec.status === "cancelled") {
    console.log(`${label(rec.slot)} är redan öppen igen.`);
    process.exit(0);
  }
  append({ type: "cancelled", id, at: new Date().toISOString() });
  console.log(`Öppnad igen: ${label(rec.slot)} (${rec.name})`);
  process.exit(0);
}

const when = args[0];
const note = args[1] || "Bokad utanför sajten";

if (!when) {
  console.error('Ange en tid i svensk tid, t.ex.: node blockera-tid.mjs "2026-08-22 15:20"');
  console.error("Andra kommandon: --lista, --avblockera <id>");
  process.exit(1);
}

const m = when.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2})[:.](\d{2})$/);
if (!m) {
  console.error(`Kunde inte tolka tiden "${when}". Formatet är "ÅÅÅÅ-MM-DD HH:MM".`);
  process.exit(1);
}

const instant = stockholmToUtc(+m[1], +m[2], +m[3], +m[4], +m[5]);
const problem = isRealSlot(instant);
if (problem) {
  console.error(`${when} går inte att blockera: ${problem}.`);
  process.exit(1);
}

const iso = instant.toISOString();
const taken = allBookings().find((b) => b.slot === iso && b.status !== "cancelled");
if (taken) {
  console.log(`${label(iso)} är redan upptagen av "${taken.name}" (${taken.status}). Inget gjordes.`);
  process.exit(0);
}

const id = randomUUID();
const now = new Date().toISOString();
append({
  type: "created",
  id,
  slot: iso,
  name: note,
  email: "",
  phone: "",
  message: "Blockerad med blockera-tid.mjs – bokad utanför sajten.",
  status: "pending",
  createdAt: now,
});
// Verified, annars släpps luckan igen efter två timmar.
append({ type: "verified", id, at: now });

console.log(`Blockerad: ${label(iso)}`);
console.log(`  Etikett: ${note}`);
console.log(`  Id:      ${id}   (öppna igen med: node blockera-tid.mjs --avblockera ${id})`);
