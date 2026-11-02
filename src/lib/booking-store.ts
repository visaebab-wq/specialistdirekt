// Lagring av bokningar. Körs ENDAST på servern.
//
// Designprinciper, i den ordning de spelar roll:
//
// 1. INGEN BOKNING FÅR FÖRSVINNA. Filen är en append-only logg (JSONL). Vi
//    skriver aldrig om eller trunkerar den. Tillståndet räknas fram genom att
//    spela upp loggen. Går e-postutskicket fel finns bokningen ändå kvar.
// 2. INGEN DUBBELBOKNING. Att ta en lucka sker under ett exklusivt fillås, så
//    att två samtidiga bokningar av samma tid inte kan lyckas båda två.
// 3. Äldre obekräftade bokningar håller sin lucka i BOOKING_PENDING_TTL_MS och
//    släpps sedan. Nya bokningar bekräftas direkt i formuläret.

import {
  appendFileSync,
  chmodSync,
  closeSync,
  existsSync,
  fstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  statSync,
} from "node:fs";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { dirname, join } from "node:path";
import { BookingStoreBusyError, withBookingLock } from "../../booking-lock.mjs";
import {
  BOOKING_FREE_CANCEL_HOURS,
  BOOKING_PENDING_TTL_MS,
  BOOKING_PRICE_SEK,
  isValidSlot,
} from "./booking-slots";

export type BookingStatus = "pending" | "verified" | "cancelled";

// Poster skapade före villkors-snapshotten saknar fälten nedan. Lås deras
// historiska villkor här så att en framtida ändring av standarderna inte
// retroaktivt ändrar redan gjorda bokningar.
const LEGACY_BOOKING_PRICE_SEK = 2000;
const LEGACY_FREE_CANCEL_HOURS = 3;

export type BookingRecord = {
  id: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Barnbokningar delar kalender med vuxenbesök men har egna patientuppgifter. */
  bookingType?: "adult" | "child";
  childName?: string;
  childBirthDate?: string;
  /** Villkor vid bokningstillfället. Äldre poster saknar dem och använder fallback. */
  priceSek?: number;
  freeCancelHours?: number;
  status: BookingStatus;
  createdAt: string;
  verifiedAt?: string;
  cancelledAt?: string;
  /** Sätts när en bekräftelse kom in efter att luckan redan tagits av någon annan. */
  conflict?: boolean;
};

type Event =
  | ({ type: "created" } & BookingRecord)
  | { type: "verified"; id: string; at: string; conflict?: boolean }
  | { type: "cancelled"; id: string; at: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isIsoDate(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString() === value;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isOptionalDate(value: unknown): value is string | undefined {
  return value === undefined || isIsoDate(value);
}

function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || (typeof value === "number" && Number.isFinite(value));
}

/**
 * JSON.parse kontrollerar bara syntaxen. En rad som `null` eller `{}` är
 * giltig JSON men inte en bokningshändelse och får därför inte nå replay-koden.
 */
function isEvent(value: unknown): value is Event {
  if (!isRecord(value) || !isNonEmptyString(value.id)) return false;

  if (value.type === "verified") {
    return (
      isIsoDate(value.at) &&
      (value.conflict === undefined || typeof value.conflict === "boolean")
    );
  }

  if (value.type === "cancelled") return isIsoDate(value.at);
  if (value.type !== "created") return false;

  return (
    isIsoDate(value.slot) &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.phone === "string" &&
    typeof value.message === "string" &&
    (value.bookingType === undefined ||
      value.bookingType === "adult" ||
      value.bookingType === "child") &&
    isOptionalString(value.childName) &&
    isOptionalString(value.childBirthDate) &&
    isOptionalNumber(value.priceSek) &&
    isOptionalNumber(value.freeCancelHours) &&
    (value.status === "pending" ||
      value.status === "verified" ||
      value.status === "cancelled") &&
    isIsoDate(value.createdAt) &&
    isOptionalDate(value.verifiedAt) &&
    isOptionalDate(value.cancelledAt) &&
    (value.conflict === undefined || typeof value.conflict === "boolean")
  );
}

function storeFile(): string {
  return process.env.BOOKING_LOG_FILE || join(process.cwd(), ".data", "bookings.jsonl");
}

type EventCache = {
  file: string;
  fingerprint: string;
  events: Event[];
};

let eventCache: EventCache | undefined;
let replayedEvents: Event[] | undefined;
let replayedBookings: BookingRecord[] = [];

function clearBookingCache(): void {
  eventCache = undefined;
  replayedEvents = undefined;
  replayedBookings = [];
}

function append(event: Event): void {
  const file = storeFile();
  const parent = dirname(file);
  const parentExisted = existsSync(/* turbopackIgnore: true */ parent);
  mkdirSync(/* turbopackIgnore: true */ parent, { recursive: true, mode: 0o700 });
  if (!parentExisted || !process.env.BOOKING_LOG_FILE)
    chmodSync(/* turbopackIgnore: true */ parent, 0o700);
  if (existsSync(/* turbopackIgnore: true */ file))
    chmodSync(/* turbopackIgnore: true */ file, 0o600);
  appendFileSync(/* turbopackIgnore: true */ file, JSON.stringify(event) + "\n", {
    encoding: "utf8",
    mode: 0o600,
  });
  chmodSync(/* turbopackIgnore: true */ file, 0o600);
  clearBookingCache();
}

function readEvents(): Event[] {
  const file = storeFile();
  const parent = dirname(file);
  if (!existsSync(/* turbopackIgnore: true */ file)) {
    if (eventCache?.file !== file || eventCache.events.length > 0) clearBookingCache();
    if (!eventCache) eventCache = { file, fingerprint: "missing", events: [] };
    return eventCache.events;
  }
  if (!process.env.BOOKING_LOG_FILE)
    chmodSync(/* turbopackIgnore: true */ parent, 0o700);
  let stat = statSync(/* turbopackIgnore: true */ file);
  if ((stat.mode & 0o077) !== 0) {
    chmodSync(/* turbopackIgnore: true */ file, 0o600);
    stat = statSync(/* turbopackIgnore: true */ file);
  }

  const fingerprint = `${stat.dev}:${stat.ino}:${stat.size}:${stat.mtimeMs}`;
  if (eventCache?.file === file && eventCache.fingerprint === fingerprint) {
    return eventCache.events;
  }

  // Läs och kontrollera samma öppna filbeskrivare. Om en återställning atomiskt
  // ersätter sökvägen under läsningen kan vi annars råka märka inode A:s innehåll
  // med inode B:s fingerprint och behålla fel snapshot i cachen.
  const fd = openSync(/* turbopackIgnore: true */ file, "r");
  let raw = "";
  let beforeRead = stat;
  let after = stat;
  try {
    beforeRead = fstatSync(fd);
    raw = readFileSync(fd, "utf8");
    after = fstatSync(fd);
  } finally {
    closeSync(fd);
  }
  const stableRead =
    beforeRead.dev === after.dev &&
    beforeRead.ino === after.ino &&
    beforeRead.size === after.size &&
    beforeRead.mtimeMs === after.mtimeMs &&
    Buffer.byteLength(raw, "utf8") === after.size;

  const out: Event[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed: unknown = JSON.parse(line);
      if (!isEvent(parsed)) {
        console.error("[booking] Ogiltig rad i bokningsloggen");
        continue;
      }
      out.push(parsed);
    } catch {
      // En trasig rad får aldrig dölja resten av bokningarna.
      console.error("[booking] Kunde inte tolka rad i bokningsloggen");
    }
  }
  eventCache = {
    file,
    // Om filen ändrades under läsningen tvingar en avvikande fingerprint nästa
    // anrop att läsa om. Byttes själva sökvägen får dess inode ett annat
    // fingerprint än den öppna filbeskrivaren och upptäcks också nästa gång.
    fingerprint: stableRead
      ? `${after.dev}:${after.ino}:${after.size}:${after.mtimeMs}`
      : `unstable:${Buffer.byteLength(raw, "utf8")}`,
    events: out,
  };
  return eventCache.events;
}

/** Nuvarande tillstånd, framräknat ur loggen. */
export function allBookings(): BookingRecord[] {
  const events = readEvents();
  if (events === replayedEvents) return replayedBookings.map((record) => ({ ...record }));

  const byId = new Map<string, BookingRecord>();
  for (const ev of events) {
    if (ev.type === "created") {
      const { type: _type, ...rec } = ev;
      byId.set(rec.id, { ...rec });
    } else {
      const rec = byId.get(ev.id);
      if (!rec) continue;
      if (ev.type === "verified") {
        rec.status = "verified";
        rec.verifiedAt = ev.at;
        if (ev.conflict) rec.conflict = true;
      } else if (ev.type === "cancelled") {
        rec.status = "cancelled";
        rec.cancelledAt = ev.at;
      }
    }
  }
  replayedEvents = events;
  replayedBookings = [...byId.values()];
  // Anropare uppdaterar ibland sin lokala post. Returnera därför kopior så
  // att den delade cachen aldrig kan muteras utanför den här modulen.
  return replayedBookings.map((record) => ({ ...record }));
}

/** Bokningens avtalade pris; äldre poster använder det låsta historiska priset. */
export function bookingPriceSek(rec: BookingRecord): number {
  const value = rec.priceSek;
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 1_000_000
    ? value
    : LEGACY_BOOKING_PRICE_SEK;
}

/** Bokningens avtalade fria avbokningsgräns; äldre poster använder historisk gräns. */
export function bookingFreeCancelHours(rec: BookingRecord): number {
  const value = rec.freeCancelHours;
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 24 * 365
    ? value
    : LEGACY_FREE_CANCEL_HOURS;
}

function bookingFreeCancelMs(rec: BookingRecord): number {
  return bookingFreeCancelHours(rec) * 60 * 60 * 1000;
}

/**
 * Håller en bokning fortfarande sin lucka?
 * Bekräftade gör det alltid; obekräftade bara under sin TTL.
 */
function holdsSlot(rec: BookingRecord, now: number): boolean {
  if (rec.status === "cancelled") return false;
  if (rec.status === "verified") return true;
  return now - Date.parse(rec.createdAt) < BOOKING_PENDING_TTL_MS;
}

/** Luckor som är upptagna just nu. */
export function takenSlots(now: Date = new Date()): Set<string> {
  const t = now.getTime();
  const taken = new Set<string>();
  for (const rec of allBookings()) {
    if (holdsSlot(rec, t)) taken.add(rec.slot);
  }
  return taken;
}

/** Exklusivt fillås som delas med det administrativa blockeringsskriptet. */
function withLock<T>(fn: () => T): T {
  return withBookingLock(storeFile(), fn);
}

function isStoreFailure(error: unknown): boolean {
  return (
    error instanceof BookingStoreBusyError ||
    (typeof error === "object" && error !== null && typeof (error as { code?: unknown }).code === "string")
  );
}

function logStoreFailure(operation: string, error: unknown): void {
  const code =
    error instanceof BookingStoreBusyError
      ? "busy"
      : typeof error === "object" && error !== null && typeof (error as { code?: unknown }).code === "string"
        ? String((error as { code: string }).code).slice(0, 40)
        : "unknown";
  console.error("[booking] Lagringsfel", { operation, code });
}

export type ClaimResult =
  | { ok: true; record: BookingRecord }
  | { ok: false; reason: "taken" | "invalid-slot" | "unavailable" | "contact-limit" };

// Tak per kontakt (säkerhetsgranskning 2026-11-01), kontrollerat under samma
// fillås som skrivningen: högst så här många kommande, aktiva bokningar per
// e-postadress – en förälder med egen tid och två barn ryms. Bara e-posten
// räknas: telefonnumret verifieras aldrig, så en spärr på det kunde användas för
// att låsa ute någon annan. Taket mot att reservera hela kalendern ligger per
// klientnät i actions.ts; ett globalt tak här skulle låta en enda besökare
// stänga bokningen för alla, så hög volym loggas bara.
const MAX_ACTIVE_PER_EMAIL = 3;
const HIGH_VOLUME_WINDOW_MS = 2 * 60 * 60 * 1000;
const HIGH_VOLUME_WARN = 24;

const contactEmail = (v: string) => v.trim().toLowerCase();

function bookingLimitReason(input: { email: string }, now: Date): "contact-limit" | null {
  const t = now.getTime();
  const email = contactEmail(input.email);
  let sameEmail = 0;
  let recent = 0;
  for (const rec of allBookings()) {
    // Manuella blockeringar (blockera-tid.mjs, telefonbokningar) har ingen
    // e-post och räknas aldrig.
    if (!rec.email || rec.status === "cancelled") continue;
    if (t - Date.parse(rec.createdAt) < HIGH_VOLUME_WINDOW_MS) recent++;
    if (holdsSlot(rec, t) && Date.parse(rec.slot) > t && contactEmail(rec.email) === email) sameEmail++;
  }
  if (recent >= HIGH_VOLUME_WARN) console.warn("[booking] Ovanligt många nya bokningar", { recent });
  return sameEmail >= MAX_ACTIVE_PER_EMAIL ? "contact-limit" : null;
}

/**
 * Tar en lucka, bekräftar den och skriver ner bokningen. Allt sker under samma
 * lås, så att två samtidiga bokningar av samma tid inte båda kan lyckas.
 */
export function claimSlot(input: {
  slot: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  bookingType?: "adult" | "child";
  childName?: string;
  childBirthDate?: string;
}): ClaimResult {
  try {
    return withLock(() => {
      const now = new Date();
      // Server Action-valideringen sker före fillåset. Kontrollera igen i
      // samma kritiska sektion som skrivningen, så en tid som hinner passera
      // femtimmarsgränsen aldrig kan reserveras efter en stale kontroll.
      if (!isValidSlot(input.slot, now)) return { ok: false, reason: "invalid-slot" };
      if (takenSlots(now).has(input.slot)) return { ok: false, reason: "taken" };
      const limit = bookingLimitReason(input, now);
      if (limit) return { ok: false, reason: limit };

      const record: BookingRecord = {
        id: randomUUID(),
        slot: input.slot,
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        bookingType: input.bookingType ?? "adult",
        ...(input.childName ? { childName: input.childName } : {}),
        ...(input.childBirthDate ? { childBirthDate: input.childBirthDate } : {}),
        priceSek: BOOKING_PRICE_SEK,
        freeCancelHours: BOOKING_FREE_CANCEL_HOURS,
        status: "verified",
        createdAt: now.toISOString(),
        verifiedAt: now.toISOString(),
      };
      append({ type: "created", ...record });
      return { ok: true, record };
    });
  } catch (error) {
    if (!isStoreFailure(error)) throw error;
    logStoreFailure("claim", error);
    return { ok: false, reason: "unavailable" };
  }
}

export function findBooking(id: string): BookingRecord | undefined {
  return allBookings().find((b) => b.id === id);
}

export type VerifyResult =
  | { ok: true; record: BookingRecord; conflict: boolean; already: boolean }
  | {
      ok: false;
      reason: "unknown" | "cancelled" | "expired" | "invalid-slot" | "unavailable";
    };

export type PendingBookingValidity =
  | { ok: true }
  | { ok: false; reason: "expired" | "invalid-slot" };

/**
 * Kontrollerar att en väntande bokning fortfarande får bekräftas.
 *
 * Schemat och femtimmarsgränsen valideras mot skapandetiden, inte mot
 * klickögonblicket. Annars skulle en korrekt bokad tid kunna bli omöjlig att
 * bekräfta några minuter senare. Tvåtimmarsgränsen är däremot en riktig
 * utgångstid: efter den har luckan släppts och länken får inte ta tillbaka den.
 */
export function pendingBookingValidity(
  rec: BookingRecord,
  now: Date = new Date(),
): PendingBookingValidity {
  const nowMs = now.getTime();
  const createdMs = Date.parse(rec.createdAt);
  const slotMs = Date.parse(rec.slot);

  if (
    !Number.isFinite(nowMs) ||
    !Number.isFinite(createdMs) ||
    createdMs > nowMs ||
    !Number.isFinite(slotMs) ||
    !isValidSlot(rec.slot, new Date(createdMs))
  ) {
    return { ok: false, reason: "invalid-slot" };
  }
  if (slotMs <= nowMs || nowMs - createdMs >= BOOKING_PENDING_TTL_MS) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true };
}

/**
 * Bekräftar en bokning. Om luckan under tiden tagits av någon annan bekräftas
 * den ändå – men flaggas som konflikt, så att den kan redas ut manuellt i
 * stället för att patienten tyst faller bort.
 */
export function verifyBooking(id: string, now: Date = new Date()): VerifyResult {
  try {
    return withLock(() => {
      const bookings = allBookings();
      const rec = bookings.find((b) => b.id === id);
      if (!rec) return { ok: false, reason: "unknown" };
      if (rec.status === "cancelled") return { ok: false, reason: "cancelled" };
      if (rec.status === "verified") {
        return { ok: true, record: rec, conflict: !!rec.conflict, already: true };
      }

      const validity = pendingBookingValidity(rec, now);
      if (validity.ok === false) return validity;

      const clash = bookings.some(
        (b) => b.id !== id && b.slot === rec.slot && b.status === "verified",
      );
      append({ type: "verified", id, at: now.toISOString(), ...(clash ? { conflict: true } : {}) });
      return {
        ok: true,
        record: { ...rec, status: "verified", verifiedAt: now.toISOString(), conflict: clash },
        conflict: clash,
        already: false,
      };
    });
  } catch (error) {
    if (!isStoreFailure(error)) throw error;
    logStoreFailure("verify", error);
    return { ok: false, reason: "unavailable" };
  }
}

export type CancelResult =
  | { ok: true; record: BookingRecord; free: boolean; already: boolean }
  | {
      ok: false;
      reason:
        | "unknown"
        | "expired"
        | "invalid-slot"
        | "past"
        | "terms-changed"
        | "unavailable";
    };

export type CancellationEligibility =
  | { ok: true; free: boolean }
  | { ok: false; reason: "expired" | "invalid-slot" | "past" };

/** Samma avbokningsregel för GET-vyn och den muterande POST-operationen. */
export function cancellationEligibility(
  rec: BookingRecord,
  now: Date = new Date(),
): CancellationEligibility {
  if (rec.status === "pending") {
    const validity = pendingBookingValidity(rec, now);
    if (!validity.ok) return validity;
  }

  const slotMs = Date.parse(rec.slot);
  if (!Number.isFinite(slotMs)) return { ok: false, reason: "invalid-slot" };
  if (slotMs <= now.getTime()) return { ok: false, reason: "past" };
  return { ok: true, free: slotMs - now.getTime() >= bookingFreeCancelMs(rec) };
}

/**
 * Avbokar en tid. Luckan släpps direkt (holdsSlot ignorerar avbokade), så att
 * någon annan kan ta den.
 *
 * `free` säger om avbokningen skedde inom den kostnadsfria gränsen. Vi vägrar
 * ALDRIG en avbokning – en patient som inte kan komma ska inte tvingas låta
 * tiden stå tom. Ligger den för nära besöket avbokas den ändå, men mottagningen
 * får veta det i notismejlet.
 */
export function cancelBooking(
  id: string,
  {
    expectedFree,
    now = new Date(),
  }: { expectedFree?: boolean; now?: Date } = {},
): CancelResult {
  try {
    return withLock(() => {
      const rec = allBookings().find((b) => b.id === id);
      if (!rec) return { ok: false, reason: "unknown" };

      if (rec.status === "cancelled") {
        const slotMs = Date.parse(rec.slot);
        const free =
          Number.isFinite(slotMs) && slotMs - now.getTime() >= bookingFreeCancelMs(rec);
        return { ok: true, record: rec, free, already: true };
      }

      const eligibility = cancellationEligibility(rec, now);
      if (!eligibility.ok) return eligibility;
      // Om GET-vyn lovade kostnadsfri avbokning men gränsen passerade innan
      // POST-anropet ska patienten få se och godkänna de nya villkoren först.
      if (expectedFree === true && !eligibility.free) {
        return { ok: false, reason: "terms-changed" };
      }

      const at = now.toISOString();
      append({ type: "cancelled", id, at });
      return {
        ok: true,
        record: { ...rec, status: "cancelled", cancelledAt: at },
        free: eligibility.free,
        already: false,
      };
    });
  } catch (error) {
    if (!isStoreFailure(error)) throw error;
    logStoreFailure("cancel", error);
    return { ok: false, reason: "unavailable" };
  }
}

// ---------------------------------------------------------------------------
// Signerade bekräftelselänkar
// ---------------------------------------------------------------------------

function secret(): string | undefined {
  const s = process.env.BOOKING_SECRET;
  if (s && s.length >= 16) return s;
  return undefined;
}

export function bookingSigningConfigured(): boolean {
  return secret() !== undefined;
}

export function signBookingId(id: string): string {
  const key = secret();
  if (!key) throw new Error("BOOKING_SECRET is not configured");
  return createHmac("sha256", key).update(id).digest("hex").slice(0, 32);
}

export function verifySignature(id: string, sig: string): boolean {
  const key = secret();
  if (!key) return false;
  const expected = createHmac("sha256", key).update(id).digest("hex").slice(0, 32);
  if (typeof sig !== "string" || sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}
