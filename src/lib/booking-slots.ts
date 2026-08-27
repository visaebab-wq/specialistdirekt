// Tidsluckor för direktbokning hos Dr Masoud Sorkhabi.
//
// Öppettider: lördag och söndag 10:00–16:00, 40 minuter per besök.
// Det ger nio luckor per dag: 10:00, 10:40, 11:20, 12:00, 12:40, 13:20, 14:00,
// 14:40 och 15:20 (den sista slutar exakt 16:00).
//
// ALLT lagras och jämförs som UTC-instanter (ISO). Endast presentationen sker i
// svensk tid. Anledningen är sommartid: 10:00 svensk tid är 08:00 UTC på
// sommaren men 09:00 UTC på vintern. Lagrar man "10:00" som text flyttar sig
// tiden när klockan ställs om, och då dyker patienten upp fel timme.

export const BOOKING_TZ = "Europe/Stockholm";

/** Veckodagar som tas emot (0 = söndag). Lördag och söndag. */
export const BOOKING_WEEKDAYS = [6, 0];

export const BOOKING_START_HOUR = 10;
export const BOOKING_END_HOUR = 16;
export const BOOKING_SLOT_MINUTES = 40;

/** Priset patienten godkänner i bekräftelsemejlet. */
export const BOOKING_PRICE_SEK = 2000;

/**
 * "2000" -> "2 000". Egen formatering i stället för toLocaleString: strängen
 * blir bitvis identisk på server och klient (Intl-data kan skilja mellan
 * Node och webbläsare), så priset aldrig orsakar en hydration mismatch.
 */
export function formatPrice(sek: number): string {
  return String(sek).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

/**
 * Kostnadsfri avbokning gäller fram till så här långt före besöket. Samma
 * gräns används i mejlet, på avbokningssidan och i själva avbokningen – ändras
 * den här ändras allt, så att texten aldrig kan säga något annat än koden gör.
 */
export const BOOKING_FREE_CANCEL_HOURS = 3;
export const BOOKING_FREE_CANCEL_MS = BOOKING_FREE_CANCEL_HOURS * 60 * 60 * 1000;

/**
 * Hur långt i förväg en lucka måste ligga för att gå att boka. Mottagningen
 * behöver framförhållning: en tid som börjar om en timme hinner ingen förbereda.
 *
 * Samma gräns styr att passerade tider aldrig visas – generateSlots och
 * isValidSlot mäter båda mot `now + BOOKING_MIN_LEAD_MS`, så en tid som varit
 * försvinner ur kalendern av sig själv och går inte heller att posta in.
 */
export const BOOKING_MIN_LEAD_HOURS = 5;
export const BOOKING_MIN_LEAD_MS = BOOKING_MIN_LEAD_HOURS * 60 * 60 * 1000;

/** Hur länge en obekräftad bokning håller sin lucka innan den släpps. */
export const BOOKING_PENDING_TTL_MS = 2 * 60 * 60 * 1000;

/** Hur många veckor framåt som visas. */
export const BOOKING_WEEKS_AHEAD = 2;

/**
 * Skillnaden mellan svensk lokaltid och UTC vid en given tidpunkt.
 * Använder Intl i stället för hårdkodade offset, så sommartid alltid stämmer.
 */
function tzOffsetMs(instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asIfUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second"),
  );
  return asIfUtc - instant.getTime();
}

/**
 * Svensk lokaltid → UTC-instant. Två iterationer, eftersom offseten i sig beror
 * på vilken tidpunkt man frågar om (viktigt just vid omställningshelgerna).
 */
export function stockholmToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const naive = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  let instant = naive - tzOffsetMs(new Date(naive));
  instant = naive - tzOffsetMs(new Date(instant));
  return new Date(instant);
}

/** Datumdelarna i svensk tid för en UTC-instant. */
export function stockholmParts(instant: Date) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: BOOKING_TZ,
    hour12: false,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  const val = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: val("weekday"),
    year: Number(val("year")),
    month: Number(val("month")),
    day: Number(val("day")),
    hour: Number(val("hour")) % 24,
    minute: Number(val("minute")),
  };
}

/** "lördag 22 augusti kl. 10:40" – används i mejl och på sidan. */
export function formatSlot(iso: string): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: BOOKING_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  const time = new Intl.DateTimeFormat("sv-SE", {
    timeZone: BOOKING_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return `${date} kl. ${time}`;
}

/** Veckodag (0–6) i svensk tid för en UTC-instant. */
function stockholmWeekday(instant: Date): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TZ,
    weekday: "short",
  }).format(instant);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name);
}

/**
 * Alla luckor från `from` och `weeks` veckor framåt, som UTC-ISO.
 * Luckor som ligger närmare än BOOKING_MIN_LEAD_MS utelämnas.
 */
export function generateSlots(from: Date = new Date(), weeks = BOOKING_WEEKS_AHEAD): string[] {
  const out: string[] = [];
  const earliest = from.getTime() + BOOKING_MIN_LEAD_MS;
  const perDay = Math.floor(
    ((BOOKING_END_HOUR - BOOKING_START_HOUR) * 60) / BOOKING_SLOT_MINUTES,
  );

  // Gå dag för dag i svensk tid. 12:00 UTC som ankare gör att vi aldrig hamnar
  // på fel datum vid omställning (då midnatt kan saknas eller finnas två gånger).
  const cursor = new Date(from.getTime());
  cursor.setUTCHours(12, 0, 0, 0);

  for (let i = 0; i <= weeks * 7 + 1; i++) {
    const day = new Date(cursor.getTime() + i * 86_400_000);
    if (!BOOKING_WEEKDAYS.includes(stockholmWeekday(day))) continue;

    const p = stockholmParts(day);
    for (let s = 0; s < perDay; s++) {
      const minutes = BOOKING_START_HOUR * 60 + s * BOOKING_SLOT_MINUTES;
      const slot = stockholmToUtc(p.year, p.month, p.day, Math.floor(minutes / 60), minutes % 60);
      if (slot.getTime() < earliest) continue;
      out.push(slot.toISOString());
    }
  }

  return out.sort();
}

/** Kontrollerar att en ISO-sträng verkligen är en giltig lucka i schemat. */
export function isValidSlot(iso: string, now: Date = new Date()): boolean {
  if (!iso || Number.isNaN(Date.parse(iso))) return false;
  const d = new Date(iso);
  if (!BOOKING_WEEKDAYS.includes(stockholmWeekday(d))) return false;

  const p = stockholmParts(d);
  const minutes = p.hour * 60 + p.minute;
  const start = BOOKING_START_HOUR * 60;
  const end = BOOKING_END_HOUR * 60;
  if (minutes < start || minutes + BOOKING_SLOT_MINUTES > end) return false;
  if ((minutes - start) % BOOKING_SLOT_MINUTES !== 0) return false;

  // Måste ligga tillräckligt långt fram i tiden.
  return d.getTime() >= now.getTime() + BOOKING_MIN_LEAD_MS;
}

/** Grupperar luckor per svensk dag, för presentation. */
export function groupSlotsByDay(slots: string[]): { key: string; label: string; slots: string[] }[] {
  const map = new Map<string, string[]>();
  for (const iso of slots) {
    const p = stockholmParts(new Date(iso));
    const key = `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
    const list = map.get(key) ?? [];
    list.push(iso);
    map.set(key, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, list]) => ({
      key,
      label: new Intl.DateTimeFormat("sv-SE", {
        timeZone: BOOKING_TZ,
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date(list[0])),
      slots: list.sort(),
    }));
}

/** Klockslag i svensk tid, t.ex. "10:40". */
export function slotTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: BOOKING_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
