import { todayInStockholm } from "./lead-dates";

export type ParsedPersonnummer = {
  /** Normaliserat till 12 siffror: ÅÅÅÅMMDDNNNN. */
  digits: string;
  /** Verkligt födelsedatum (ÅÅÅÅ-MM-DD), även för samordningsnummer. */
  birthDate: string;
};

function luhnOk(tenDigits: string): boolean {
  let sum = 0;
  for (let i = 0; i < tenDigits.length; i += 1) {
    let n = Number(tenDigits[i]);
    if (i % 2 === 0) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}

/**
 * Tolkar ett svenskt personnummer eller samordningsnummer.
 * Godtar ÅÅÅÅMMDD-NNNN, ÅÅMMDD-NNNN, ÅÅMMDD+NNNN (100 år eller äldre) och
 * varianter utan bindestreck eller med mellanslag. Kräver giltigt datum som
 * inte ligger i framtiden och korrekt kontrollsiffra.
 */
export function parsePersonnummer(input: string, now: Date = new Date()): ParsedPersonnummer | null {
  const compact = input.replace(/\s+/g, "");
  const match = /^(\d{2})?(\d{2})(\d{2})(\d{2})([-+]?)(\d{4})$/.exec(compact);
  if (!match) return null;
  const [, centuryInput, yy, mm, ddRaw, separator, last4] = match;

  const today = todayInStockholm(now);
  const currentYear = Number(today.slice(0, 4));

  let year: number;
  if (centuryInput) {
    if (separator === "+") return null;
    year = Number(centuryInput + yy);
  } else {
    year = Math.floor(currentYear / 100) * 100 + Number(yy);
    if (year > currentYear) year -= 100;
    if (separator === "+") year -= 100;
  }

  const month = Number(mm);
  let day = Number(ddRaw);
  if (day > 60) day -= 60; // samordningsnummer
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  const birthDate = `${String(year).padStart(4, "0")}-${mm}-${String(day).padStart(2, "0")}`;
  if (birthDate > today) return null;
  if (currentYear - year > 120) return null;
  if (!luhnOk(yy + mm + ddRaw + last4)) return null;

  return { digits: `${String(year).padStart(4, "0")}${mm}${ddRaw}${last4}`, birthDate };
}

/** ÅÅÅÅMMDDNNNN → ÅÅÅÅMMDD-NNNN för visning till ägaren. */
export function formatPersonnummer(digits: string): string {
  return /^\d{12}$/.test(digits) ? `${digits.slice(0, 8)}-${digits.slice(8)}` : digits;
}
