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

import { appendFileSync, closeSync, existsSync, mkdirSync, openSync, readFileSync, unlinkSync } from "node:fs";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { dirname, join } from "node:path";
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

function lockFile(): string {
  return `${storeFile()}.lock`;
}

function append(event: Event): void {
  const file = storeFile();
  mkdirSync(dirname(file), { recursive: true });
  appendFileSync(file, JSON.stringify(event) + "\n", "utf8");
}

function readEvents(): Event[] {
  const file = storeFile();
  if (!existsSync(file)) return [];
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

/** Enkelt exklusivt fillås. Serialiserar anspråk på luckor. */
function withLock<T>(fn: () => T): T {
  const path = lockFile();
  mkdirSync(dirname(path), { recursive: true });
  let fd: number | undefined;
  const deadline = Date.now() + 5000;

  for (;;) {
    try {
      fd = openSync(path, "wx");
      break;
    } catch {
      if (Date.now() > deadline) {
        // Ett kvarglömt lås får aldrig blockera bokningar för alltid.
        try {
          unlinkSync(path);
        } catch {
          /* någon annan hann före */
        }
        continue;
      }
      // Kort, aktiv väntan. Anspråken tar mikrosekunder.
      const until = Date.now() + 15;
      while (Date.now() < until) {
        /* spinn */
      }
    }
  }

  try {
    return fn();
  } finally {
    if (fd !== undefined) closeSync(fd);
    try {
      unlinkSync(path);
    } catch {
      /* redan borta */
    }
  }
}

export type ClaimResult =
  | { ok: true; record: BookingRecord }
  | { ok: false; reason: "taken" };

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
}

export function findBooking(id: string): BookingRecord | undefined {
  return allBookings().find((b) => b.id === id);
}

export type VerifyResult =
  | { ok: true; record: BookingRecord; conflict: boolean; already: boolean }
  | { ok: false; reason: "unknown" | "cancelled" | "expired" | "invalid-slot" };

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
}

export type CancelResult =
  | { ok: true; record: BookingRecord; free: boolean; already: boolean }
  | { ok: false; reason: "unknown" };

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
  return withLock(() => {
    const rec = allBookings().find((b) => b.id === id);
    if (!rec) return { ok: false, reason: "unknown" };

    const free = Date.parse(rec.slot) - now.getTime() >= BOOKING_FREE_CANCEL_MS;
    if (rec.status === "cancelled") return { ok: true, record: rec, free, already: true };

    const at = now.toISOString();
    append({ type: "cancelled", id, at });
    return { ok: true, record: { ...rec, status: "cancelled", cancelledAt: at }, free, already: false };
  });
}

// ---------------------------------------------------------------------------
// Signerade bekräftelselänkar
// ---------------------------------------------------------------------------

function secret(): string {
  const s = process.env.BOOKING_SECRET;
  if (s && s.length >= 16) return s;
  // Hellre en härledd nyckel än ingen signering alls. Loggas som varning så att
  // det syns i drift att BOOKING_SECRET saknas.
  console.warn("[booking] BOOKING_SECRET saknas – härleder nyckel från SMTP-uppgifter");
  return `fallback:${process.env.SMTP_PASS || ""}:${process.env.SMTP_USER || ""}`;
}

export function signBookingId(id: string): string {
  return createHmac("sha256", secret()).update(id).digest("hex").slice(0, 32);
}

export function verifySignature(id: string, sig: string): boolean {
  const expected = signBookingId(id);
  if (typeof sig !== "string" || sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}
