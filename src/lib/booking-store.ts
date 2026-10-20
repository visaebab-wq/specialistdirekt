// Lagring av bokningar. Körs ENDAST på servern.
//
// Designprinciper, i den ordning de spelar roll:
//
// 1. INGEN BOKNING FÅR FÖRSVINNA. Filen är en append-only logg (JSONL). Vi
//    skriver aldrig om eller trunkerar den. Tillståndet räknas fram genom att
//    spela upp loggen. Går e-postutskicket fel finns bokningen ändå kvar.
// 2. INGEN DUBBELBOKNING. Att ta en lucka sker under ett exklusivt fillås, så
//    att två samtidiga bokningar av samma tid inte kan lyckas båda två.
// 3. En obekräftad bokning håller sin lucka i BOOKING_PENDING_TTL_MS och släpps
//    sedan. Annars skulle en person som ångrar sig blockera tiden för alltid.

import { appendFileSync, chmodSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { dirname, join } from "node:path";
import { BookingStoreBusyError, withBookingLock } from "../../booking-lock.mjs";
import {
  BOOKING_FREE_CANCEL_MS,
  BOOKING_PENDING_TTL_MS,
  isValidSlot,
} from "./booking-slots";

export type BookingStatus = "pending" | "verified" | "cancelled";

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

function storeFile(): string {
  return process.env.BOOKING_LOG_FILE || join(process.cwd(), ".data", "bookings.jsonl");
}

function append(event: Event): void {
  const file = storeFile();
  const parent = dirname(file);
  const parentExisted = existsSync(parent);
  mkdirSync(parent, { recursive: true, mode: 0o700 });
  if (!parentExisted || !process.env.BOOKING_LOG_FILE) chmodSync(parent, 0o700);
  if (existsSync(file)) chmodSync(file, 0o600);
  appendFileSync(file, JSON.stringify(event) + "\n", { encoding: "utf8", mode: 0o600 });
  chmodSync(file, 0o600);
}

function readEvents(): Event[] {
  const file = storeFile();
  if (!existsSync(file)) return [];
  if (!process.env.BOOKING_LOG_FILE) chmodSync(dirname(file), 0o700);
  chmodSync(file, 0o600);
  const out: Event[] = [];
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line) as Event);
    } catch {
      // En trasig rad får aldrig dölja resten av bokningarna.
      console.error("[booking] Kunde inte tolka rad i bokningsloggen");
    }
  }
  return out;
}

/** Nuvarande tillstånd, framräknat ur loggen. */
export function allBookings(): BookingRecord[] {
  const byId = new Map<string, BookingRecord>();
  for (const ev of readEvents()) {
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
  return [...byId.values()];
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
  | { ok: false; reason: "taken" | "unavailable" };

/**
 * Tar en lucka och skriver ner bokningen. Under lås, så att två samtidiga
 * bokningar av samma tid inte båda kan lyckas.
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
      if (takenSlots(now).has(input.slot)) return { ok: false, reason: "taken" };

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
        status: "pending",
        createdAt: now.toISOString(),
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
      reason: "unknown" | "expired" | "invalid-slot" | "past" | "unavailable";
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
  return { ok: true, free: slotMs - now.getTime() >= BOOKING_FREE_CANCEL_MS };
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
export function cancelBooking(id: string, now: Date = new Date()): CancelResult {
  try {
    return withLock(() => {
      const rec = allBookings().find((b) => b.id === id);
      if (!rec) return { ok: false, reason: "unknown" };

      if (rec.status === "cancelled") {
        const slotMs = Date.parse(rec.slot);
        const free = Number.isFinite(slotMs) && slotMs - now.getTime() >= BOOKING_FREE_CANCEL_MS;
        return { ok: true, record: rec, free, already: true };
      }

      const eligibility = cancellationEligibility(rec, now);
      if (!eligibility.ok) return eligibility;

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
