const LEAD_TIME_ZONE = "Europe/Stockholm";
export const PREFERRED_DATE_MAX_DAYS = 365;

/** Datumet i Sverige, oberoende av serverns eller webbläsarens lokala tidszon. */
export function todayInStockholm(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LEAD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Sista valbara kalenderdatum räknat från dagens svenska datum. */
export function maxPreferredDateInStockholm(now: Date = new Date()): string {
  const [year, month, day] = todayInStockholm(now).split("-").map(Number);
  const max = new Date(Date.UTC(year, month - 1, day + PREFERRED_DATE_MAX_DAYS));
  return max.toISOString().slice(0, 10);
}

/** Ett verkligt kalenderdatum inom det tillåtna året från dagens datum. */
export function isValidPreferredDate(value: string, now: Date = new Date()): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return false;
  }

  return value >= todayInStockholm(now) && value <= maxPreferredDateInStockholm(now);
}
