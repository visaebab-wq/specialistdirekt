import { todayInStockholm } from "./lead-dates";

/** Ett verkligt ISO-datum för en patient som ännu inte har fyllt 18 år. */
export function isChildBirthDate(value: string, now: Date = new Date()): boolean {
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

  // Åldersregeln är kalenderbaserad, inte timbaserad. Jämför därför med
  // dagens svenska datum; annars blir ett barn fött i dag felaktigt avvisat
  // före kl. 12 UTC och en 18-åring godkänd en del av födelsedagen.
  const today = todayInStockholm(now);
  if (value > today) return false;

  const [todayYear, todayMonth, todayDay] = today.split("-").map(Number);
  const birthdayHasPassed =
    todayMonth > month || (todayMonth === month && todayDay >= day);
  const age = todayYear - year - (birthdayHasPassed ? 0 : 1);
  return age >= 0 && age < 18;
}
