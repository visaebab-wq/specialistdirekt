import {
  chmodSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  rmdirSync,
  statSync,
  unlinkSync,
} from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";

const WAIT_BUFFER = new Int32Array(new SharedArrayBuffer(4));
const EMPTY_LOCK_STALE_MS = 30_000;
const OWNER_PATTERN = /^owner-(\d+)-(\d+|unknown)-([0-9a-f-]+)$/i;

export class BookingStoreBusyError extends Error {
  constructor() {
    super("booking-store-busy");
    this.name = "BookingStoreBusyError";
  }
}

/**
 * Linux process-start identifier (fält 22 i /proc/<pid>/stat). Tillsammans
 * med pid hindrar det att ett återanvänt pid misstas för den gamla ägaren.
 *
 * @param {number} pid
 * @returns {string | null}
 */
function processStartId(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const commandEnd = stat.lastIndexOf(") ");
    if (commandEnd < 0) return null;
    return stat.slice(commandEnd + 2).trim().split(/\s+/)[19] || null;
  } catch {
    return null;
  }
}

/**
 * @param {string} marker
 * @returns {{ pid: number, startId: string } | null}
 */
function parseOwner(marker) {
  const match = OWNER_PATTERN.exec(marker);
  if (!match) return null;

  const pid = Number.parseInt(match[1], 10);
  if (!Number.isSafeInteger(pid) || pid <= 0) return null;
  return { pid, startId: match[2] };
}

/**
 * Returnerar true bara när operativsystemet säkert visar att ägaren är borta.
 * Osäkra fall lämnas låsta (fail closed).
 *
 * @param {{ pid: number, startId: string }} owner
 */
function ownerIsGone(owner) {
  try {
    process.kill(owner.pid, 0);
  } catch (error) {
    if (error?.code === "ESRCH") return true;
    return false;
  }

  if (owner.startId === "unknown") return false;
  const currentStartId = processStartId(owner.pid);
  return currentStartId !== null && currentStartId !== owner.startId;
}

/**
 * Försöker återställa endast ett bevisat övergivet lås. Ett exakt, unikt
 * ägarnamn tas bort före katalogen, så en konkurrerande städare aldrig kan
 * radera en ny ägares markör.
 *
 * @param {string} lockDir
 */
function reapAbandonedLock(lockDir) {
  /** @type {string[]} */
  let entries;
  try {
    entries = readdirSync(lockDir);
  } catch (error) {
    if (error?.code === "ENOENT") return true;
    throw error;
  }

  if (entries.length === 0) {
    try {
      const ageMs = Date.now() - statSync(lockDir).mtimeMs;
      if (ageMs < EMPTY_LOCK_STALE_MS) return false;
      rmdirSync(lockDir);
      return true;
    } catch (error) {
      if (error?.code === "ENOENT") return true;
      if (error?.code === "ENOTEMPTY" || error?.code === "EEXIST") return false;
      throw error;
    }
  }

  if (entries.length !== 1) return false;
  const marker = entries[0];
  const owner = parseOwner(marker);
  if (!owner || !ownerIsGone(owner)) return false;

  try {
    unlinkSync(join(lockDir, marker));
  } catch (error) {
    if (error?.code === "ENOENT") return true;
    throw error;
  }

  try {
    rmdirSync(lockDir);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return true;
    if (error?.code === "ENOTEMPTY" || error?.code === "EEXIST") return false;
    throw error;
  }
}

/**
 * Exklusivt, processgemensamt lås för bokningsloggen.
 *
 * Låset är en katalog med en unik ägarmarkör som innehåller pid och processens
 * start-id. Ett lås efter SIGKILL kan därför återtas utan att ett långvarigt,
 * levande jobb raderas på grund av ålder. En väntare som når sin tidsgräns
 * returnerar busy och lämnar alltid den levande ägarens lås orört.
 *
 * @template T
 * @param {string} storeFile
 * @param {() => T} fn
 * @param {{ timeoutMs?: number }} [options]
 * @returns {T}
 */
export function withBookingLock(storeFile, fn, { timeoutMs = 5000 } = {}) {
  const lockDir = `${storeFile}.lock`;
  const parent = dirname(lockDir);
  const parentExisted = existsSync(parent);
  mkdirSync(parent, { recursive: true, mode: 0o700 });
  if (!parentExisted) chmodSync(parent, 0o700);

  const startId = processStartId(process.pid) || "unknown";
  const marker = `owner-${process.pid}-${startId}-${randomUUID()}`;
  const markerPath = join(lockDir, marker);
  const deadline = Date.now() + timeoutMs;

  for (;;) {
    try {
      mkdirSync(lockDir, { mode: 0o700 });
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      if (reapAbandonedLock(lockDir)) continue;
      if (Date.now() >= deadline) throw new BookingStoreBusyError();
      Atomics.wait(WAIT_BUFFER, 0, 0, 15);
      continue;
    }

    try {
      const fd = openSync(markerPath, "wx", 0o600);
      closeSync(fd);
    } catch (error) {
      try {
        rmdirSync(lockDir);
      } catch {
        // Katalogen kan ha fått en post; lämna den då fail-closed.
      }
      throw error;
    }
    break;
  }

  try {
    return fn();
  } finally {
    try {
      unlinkSync(markerPath);
    } catch (error) {
      if (error?.code !== "ENOENT") {
        const code = typeof error?.code === "string" ? error.code : "unknown";
        console.error("[booking] Kunde inte ta bort låsmarkören", { code });
      }
    }

    try {
      rmdirSync(lockDir);
    } catch (error) {
      if (error?.code !== "ENOENT") {
        const code = typeof error?.code === "string" ? error.code : "unknown";
        console.error("[booking] Kunde inte städa låskatalogen", { code });
      }
    }
  }
}
