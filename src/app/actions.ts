"use server";

import { headers } from "next/headers";
import { specialties } from "@/lib/specialties";
import type { LeadFormValues, LeadState } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";
import { isValidPreferredDate } from "@/lib/lead-dates";
import { isChildBirthDate } from "@/lib/booking-patient";
import { parsePersonnummer } from "@/lib/personnummer";

const validSpecialtySlugs = new Set([
  ...specialties.map((s) => s.slug),
  "vet-inte",
  // Bilddiagnostik – inte en specialitet, men ett eget val i formuläret (/privat-mr).
  "privat-mr",
]);

// Maxlängder per fält – hindrar att någon fyller disk/e-post med enorma svar.
const MAX = {
  name: 100,
  email: 160,
  phone: 40,
  personnummer: 20,
  city: 80,
  specialty: 40,
  message: 2000,
};

/** FormData kan innehålla File även för fält som gränssnittet visar som text. */
function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nextAttempt(previous: { attempt: number }): number {
  return Number.isSafeInteger(previous.attempt) && previous.attempt >= 0
    ? previous.attempt + 1
    : 1;
}

/** Behåll riktiga datumvärden, men skicka aldrig tillbaka godtycklig text till ett datumfält. */
function safeDateValue(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value
    ? value
    : "";
}

function isEmail(value: string) {
  // DNS-delen får inte innehålla URI-avgränsare som `?bcc=...`. Förutom att
  // vara ogiltigt som domän kunde det annars få en mailto-länk i internrapporten
  // att förifylla extra mottagare.
  const at = value.lastIndexOf("@");
  if (at <= 0 || at !== value.indexOf("@")) return false;

  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)
  ) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) return false;
  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label),
  );
}

function isPhone(value: string) {
  return /^[+0-9 ()-]+$/.test(value) && value.replace(/\D/g, "").length >= 6;
}

// Rate-limits i minnet mot spam och missbruk. Nollställs vid omstart, vilket
// är ok som grundskydd; nginx/Cloudflare kan komplettera.
//
// Nycklar (säkerhetsgranskning 2026-11-01): IPv4 per adress, IPv6 per /64 –
// ett abonnemang får ofta ett helt /64 – och dessutom en bredare IPv6-nyckel
// per /48 med högre tak, så att ett tunnel- eller hostingnät inte ger tusentals
// gratis nycklar.
type Limiter = { windowMs: number; max: number; hits: Map<string, number[]> };
const RL_MAX_KEYS = 5000;
const limiter = (windowMs: number, max: number): Limiter => ({ windowMs, max, hits: new Map() });

// Försök (alla formulärposter): 6 per nyckel och 60 per /48 på tio minuter.
const attemptsNet = limiter(10 * 60 * 1000, 6);
const attemptsWide = limiter(10 * 60 * 1000, 60);
// Genomförda bokningar: 3 per nyckel och 30 per /48 per dygn. Det är det som
// gör det dyrt att reservera hela kalendern. Ett globalt tak skulle i stället
// låta en enda besökare stänga bokningen för alla.
const bookingsNet = limiter(24 * 60 * 60 * 1000, 3);
const bookingsWide = limiter(24 * 60 * 60 * 1000, 30);

function recentHits(l: Limiter, key: string, now: number): number[] {
  return (l.hits.get(key) || []).filter((t) => now - t < l.windowMs);
}

function isOverLimit(l: Limiter, key: string, now: number): boolean {
  const recent = recentHits(l, key, now);
  if (recent.length < l.max) return false;
  // Flytta en spärrad nyckel till slutet av kartan. Annars är den äldst och
  // skulle kastas först när kartan fylls – och då få nya gratis försök.
  l.hits.delete(key);
  l.hits.set(key, recent);
  return true;
}

function addHit(l: Limiter, key: string, now: number): void {
  const recent = recentHits(l, key, now);
  l.hits.delete(key);
  if (l.hits.size >= RL_MAX_KEYS) {
    // Släpp utgångna nycklar först, annars den minst nyligen använda. Att neka
    // alla nya nycklar när kartan är full lät vem som helst stänga formulären.
    for (const [k, hits] of l.hits) {
      if (!hits.some((t) => now - t < l.windowMs)) l.hits.delete(k);
      if (l.hits.size < RL_MAX_KEYS) break;
    }
    if (l.hits.size >= RL_MAX_KEYS) {
      const oldest = l.hits.keys().next().value;
      if (oldest !== undefined) l.hits.delete(oldest);
    }
  }
  recent.push(now);
  l.hits.set(key, recent);
}

type ClientKeys = { net: string; wide: string | null };

/** Ett formulärförsök: spärrat om nyckeln (eller dess /48) har nått taket. */
function attemptLimited(keys: ClientKeys, now = Date.now()): boolean {
  if (isOverLimit(attemptsNet, keys.net, now)) return true;
  if (keys.wide && isOverLimit(attemptsWide, keys.wide, now)) return true;
  addHit(attemptsNet, keys.net, now);
  if (keys.wide) addHit(attemptsWide, keys.wide, now);
  return false;
}

function bookingQuotaExceeded(keys: ClientKeys, now = Date.now()): boolean {
  return (
    recentHits(bookingsNet, keys.net, now).length >= bookingsNet.max ||
    (keys.wide !== null && recentHits(bookingsWide, keys.wide, now).length >= bookingsWide.max)
  );
}

function recordBooking(keys: ClientKeys, now = Date.now()): void {
  addHit(bookingsNet, keys.net, now);
  if (keys.wide) addHit(bookingsWide, keys.wide, now);
}

async function clientKeys(): Promise<ClientKeys> {
  const h = await headers();
  // Produktionsproxyn skriver alltid över X-Real-IP med den verifierade
  // klientadressen. CF-Connecting-IP och X-Forwarded-For kan däremot skickas
  // fritt av en klient som når origin direkt och får därför aldrig styra en
  // produktionsbucket. Fallbacken finns bara för lokal utveckling utan nginx.
  const candidate =
    h.get("x-real-ip") ||
    (process.env.NODE_ENV !== "production"
      ? h.get("cf-connecting-ip") || h.get("x-forwarded-for")?.split(",")[0]
      : null) ||
    "unknown";
  const normalized = candidate.trim();
  const ip = /^[0-9a-f:.]{2,64}$/i.test(normalized) ? normalized : "unknown";
  return rateLimitKeys(ip);
}

async function isRateLimited(): Promise<boolean> {
  return attemptLimited(await clientKeys());
}

/** IPv4 som den är; IPv6 per /64 plus en bredare /48-nyckel. */
function rateLimitKeys(ip: string): ClientKeys {
  const mapped = ip.match(/^(?:::ffff:|64:ff9b::)(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped) return { net: mapped[1], wide: null };
  if (!ip.includes(":")) return { net: ip, wide: null };
  const [head, tail] = ip.toLowerCase().split("::");
  const left = head ? head.split(":") : [];
  const right = tail !== undefined && tail !== "" ? tail.split(":") : [];
  const groups =
    tail === undefined ? left : [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"), ...right];
  const g = groups.map((x) => x.replace(/^0+(?=.)/, "") || "0");
  return { net: `${g.slice(0, 4).join(":")}::/64`, wide: `${g.slice(0, 3).join(":")}::/48` };
}

export async function submitLead(
  previous: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const attempt = nextAttempt(previous);

  // Honungsfälla mot bottar: fältet är dolt och ska vara tomt.
  if (formString(formData, "company")) {
    return {
      status: "success",
      message: "Tack! Vi hör av oss snart.",
      errors: {},
      attempt,
      accepted: false,
    };
  }

  const name = formString(formData, "name");
  const email = formString(formData, "email");
  const phone = formString(formData, "phone");
  const specialty = formString(formData, "specialty");
  const message = formString(formData, "message");
  const city = formString(formData, "city");
  const preferredDate1 = formString(formData, "preferredDate1");
  const preferredDate2 = formString(formData, "preferredDate2");
  const preferredDate3 = formString(formData, "preferredDate3");
  const timePreference = formString(formData, "timePreference");
  const consent = formData.get("consent") === "on";
  const values: LeadFormValues = {
    name: name.slice(0, MAX.name),
    email: email.slice(0, MAX.email),
    phone: phone.slice(0, MAX.phone),
    city: city.slice(0, MAX.city),
    specialty: validSpecialtySlugs.has(specialty) ? specialty : "",
    message: message.slice(0, MAX.message),
    preferredDate1: safeDateValue(preferredDate1),
    preferredDate2: safeDateValue(preferredDate2),
    preferredDate3: safeDateValue(preferredDate3),
    timePreference: ["before-noon", "after-noon"].includes(timePreference)
      ? timePreference
      : "",
    consent,
  };

  // Rate-limit mot spam/abuse. Värdena samlas in först så att även detta
  // fel kan visas utan att Reacts formuläråterställning raderar användarens svar.
  if (await isRateLimited()) {
    return {
      status: "error",
      message: "För många förfrågningar just nu. Vänta en liten stund och försök igen.",
      errors: {},
      attempt,
      accepted: false,
      values,
    };
  }

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > MAX.name) errors.name = "Ange ditt namn.";
  if (!isEmail(email) || email.length > MAX.email) errors.email = "Ange en giltig e-postadress.";
  if (phone.length > MAX.phone || !isPhone(phone))
    errors.phone = "Ange ett telefonnummer.";
  if (city.length < 2 || city.length > MAX.city) errors.city = "Ange stad.";
  if (!specialty || !validSpecialtySlugs.has(specialty) || specialty.length > MAX.specialty)
    errors.specialty = "Välj en specialitet i listan.";
  // Beskrivningen är frivillig – uppgifterna räcker för att kunna återkomma.
  if (message.length > MAX.message)
    errors.message = `Beskrivningen får vara högst ${MAX.message} tecken.`;
  if (!isValidPreferredDate(preferredDate1)) {
    errors.preferredDate1 = "Ange ett giltigt datum inom de kommande 12 månaderna.";
  }
  if (!isValidPreferredDate(preferredDate2)) {
    errors.preferredDate2 = "Ange ett giltigt datum inom de kommande 12 månaderna.";
  } else if (preferredDate2 === preferredDate1) {
    errors.preferredDate2 = "Välj ett annat datum än det första.";
  }
  if (preferredDate3) {
    if (!isValidPreferredDate(preferredDate3)) {
      errors.preferredDate3 = "Ange ett giltigt datum inom de kommande 12 månaderna.";
    } else if (preferredDate3 === preferredDate1 || preferredDate3 === preferredDate2) {
      errors.preferredDate3 = "Välj ett datum som skiljer sig från de andra.";
    }
  }
  if (!["before-noon", "after-noon"].includes(timePreference))
    errors.timePreference = "Välj före lunch eller efter lunch.";
  if (!consent) errors.consent = "Du behöver godkänna att vi behandlar dina uppgifter.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Kontrollera fälten nedan.",
      errors,
      attempt,
      accepted: false,
      values,
    };
  }

  // Leverera förfrågan (e-post via Resend om konfigurerat, annars loggas den).
  const result = await deliverLead({
    name,
    email,
    phone,
    specialty,
    city,
    message,
    preferredDates: [preferredDate1, preferredDate2, preferredDate3].filter(Boolean),
    timePreference,
  });
  if (!result.delivered) {
    // Logga tydligt – i produktion bör RESEND_API_KEY vara satt.
    console.warn("[lead] Ej levererad via e-post:", result.error ?? "okänt fel");
  }

  if (!result.delivered && !result.persisted) {
    return {
      status: "error",
      message:
        "Vi kunde inte ta emot tidsförfrågan just nu. Försök igen om en stund eller kontakta oss direkt.",
      errors: {},
      attempt,
      accepted: false,
      values,
    };
  }

  return {
    status: "success",
    message:
      "Tack! Din tidsförfrågan är mottagen. Vi återkommer normalt inom en arbetsdag med besked om möjliga bokningsalternativ.",
    errors: {},
    attempt,
    accepted: true,
  };
}

// ---------------------------------------------------------------------------
// Direktbokning hos Dr Masoud Sorkhabi
// ---------------------------------------------------------------------------

export type BookingFormValues = {
  slot: string;
  bookingType: "adult" | "child" | "";
  name: string;
  email: string;
  phone: string;
  message: string;
  childName: string;
  childBirthDate: string;
  personnummer: string;
  consent: boolean;
};

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  attempt: number;
  confirmationEmailSent: boolean;
  bookingPersisted: boolean;
  /** En kortlivad HttpOnly-kvittens finns och den privata bekräftelsesidan kan öppnas. */
  confirmationPageReady?: boolean;
  values?: BookingFormValues;
};

/**
 * Tar emot en bokning. Ordningen är medveten:
 *   1. validera
 *   2. ta luckan och SKRIV NER bokningen (under lås)
 *   3. skicka mejl
 *
 * Steg 3 får aldrig kunna radera steg 2. Går mejlet fel finns bokningen kvar
 * på disk och notisen syns i serverloggen – ingen patient försvinner tyst.
 */
export async function submitBooking(
  previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const attempt = nextAttempt(previous);
  const { isValidSlot } = await import("@/lib/booking-slots");
  const { bookingSigningConfigured, claimSlot } = await import("@/lib/booking-store");
  const { sendPatientConfirmation, sendOwnerVerified } = await import("@/lib/booking-email");

  if (formString(formData, "company")) {
    return {
      status: "success",
      message: "Tack! Din bokningsförfrågan är mottagen.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
    };
  }

  const slot = formString(formData, "slot");
  const name = formString(formData, "name");
  const email = formString(formData, "email");
  const phone = formString(formData, "phone");
  const message = formString(formData, "message");
  const bookingTypeInput = formString(formData, "bookingType");
  const bookingType = bookingTypeInput === "child" ? "child" : "adult";
  const childName = formString(formData, "childName");
  const personnummerInput = formString(formData, "personnummer");
  const pnr = parsePersonnummer(personnummerInput);
  // Barnets födelsedatum läses ur barnets personnummer – ett fält mindre att fylla i.
  const childBirthDate = bookingType === "child" ? (pnr?.birthDate ?? "") : "";
  const consent = formData.get("consent") === "on";
  const values: BookingFormValues = {
    slot: slot.slice(0, 40),
    bookingType:
      bookingTypeInput === "adult" || bookingTypeInput === "child" ? bookingTypeInput : "",
    name: name.slice(0, MAX.name),
    email: email.slice(0, MAX.email),
    phone: phone.slice(0, MAX.phone),
    message: message.slice(0, MAX.message),
    childName: childName.slice(0, MAX.name),
    childBirthDate: safeDateValue(childBirthDate),
    personnummer: personnummerInput.slice(0, MAX.personnummer),
    consent,
  };

  if (await isRateLimited()) {
    return {
      status: "error",
      message: "För många försök just nu. Vänta en stund och försök igen.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
      values,
    };
  }
  if (!bookingSigningConfigured()) {
    console.error("[booking] BOOKING_SECRET saknas eller är för kort");
    return {
      status: "error",
      message: "Bokningssystemet är tillfälligt otillgängligt. Ingen tid har reserverats.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
      values,
    };
  }

  const errors: Record<string, string> = {};
  if (bookingTypeInput !== "adult" && bookingTypeInput !== "child")
    errors.bookingType = "Bokningstypen är inte giltig. Ladda om sidan och försök igen.";
  if (!slot) errors.slot = "Välj en tid.";
  else if (slot.length > 40) errors.slot = "Tiden är inte längre giltig. Välj en annan.";
  else if (!isValidSlot(slot)) errors.slot = "Tiden är inte längre giltig. Välj en annan.";
  if (name.length < 2 || name.length > MAX.name) errors.name = "Fyll i ditt namn.";
  if (email.length > MAX.email || !isEmail(email))
    errors.email = "Fyll i en giltig e-postadress.";
  if (phone.length > MAX.phone || !isPhone(phone))
    errors.phone = "Fyll i ett telefonnummer.";
  if (message.length > MAX.message)
    errors.message = `Beskrivningen får vara högst ${MAX.message} tecken.`;
  if (personnummerInput.length > MAX.personnummer || !pnr) {
    errors.personnummer =
      bookingType === "child"
        ? "Fyll i barnets personnummer (ÅÅÅÅMMDD-NNNN)."
        : "Fyll i ett giltigt personnummer (ÅÅÅÅMMDD-NNNN).";
  }
  if (bookingType === "child") {
    if (childName.length < 2 || childName.length > MAX.name)
      errors.childName = "Fyll i barnets namn.";
    if (pnr && !isChildBirthDate(childBirthDate)) {
      errors.personnummer = "Barnet behöver vara 0–17 år vid bokningen.";
    }
  }
  if (!consent) errors.consent = "Du behöver godkänna villkoren.";
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Kontrollera fälten nedan.",
      errors,
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
      values,
    };
  }

  const keys = await clientKeys();
  if (bookingQuotaExceeded(keys)) {
    return {
      status: "error",
      message:
        "Vi kan inte ta emot fler bokningar härifrån just nu. Kontakta oss så hjälper vi dig att boka.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
      values,
    };
  }

  const claim = claimSlot({
    slot,
    name,
    email,
    phone,
    message,
    bookingType,
    personnummer: pnr?.digits ?? "",
    ...(bookingType === "child" ? { childName, childBirthDate } : {}),
  });
  if (!claim.ok) {
    if (claim.reason === "invalid-slot") {
      return {
        status: "error",
        message: "Tiden är inte längre bokningsbar. Välj en annan tid.",
        errors: { slot: "Tiden är inte längre giltig." },
        attempt,
        confirmationEmailSent: false,
        bookingPersisted: false,
        values,
      };
    }
    if (claim.reason === "contact-limit") {
      return {
        status: "error",
        message:
          "Vi kan inte ta emot fler bokningar med de här uppgifterna just nu. Kontakta oss så hjälper vi dig att boka.",
        errors: {},
        attempt,
        confirmationEmailSent: false,
        bookingPersisted: false,
        values,
      };
    }
    if (claim.reason === "unavailable") {
      return {
        status: "error",
        message:
          "Bokningssystemet svarar inte just nu. Ingen tid har reserverats – försök igen om en stund.",
        errors: {},
        attempt,
        confirmationEmailSent: false,
        bookingPersisted: false,
        values,
      };
    }
    return {
      status: "error",
      message: "Tyvärr, någon hann boka den tiden precis före dig. Välj en annan tid.",
      errors: { slot: "Tiden är upptagen." },
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: false,
      values,
    };
  }

  recordBooking(keys);
  const rec = claim.record;
  const sendSafely = async (
    operation: () => Promise<{ sent: boolean; error?: string }>,
  ): Promise<{ sent: boolean; error?: string }> => {
    try {
      return await operation();
    } catch {
      // Mallbygge och formattering sker före SMTP-lagrets egen felhantering.
      // Ett oväntat fel där får aldrig göra en redan sparad bokning till 500.
      return { sent: false, error: "unexpected-mail-error" };
    }
  };
  const [toPatient, toOwner] = await Promise.all([
    sendSafely(() => sendPatientConfirmation(rec)),
    sendSafely(() => sendOwnerVerified(rec, false)),
  ]);

  if (!toOwner.sent) {
    console.error("[booking] Ägarnotis kunde inte skickas", {
      code: toOwner.error ?? "unknown",
    });
  }

  let confirmationPageReady = false;
  try {
    const { writeBookingReceipt } = await import("@/lib/booking-receipt");
    await writeBookingReceipt(rec, toPatient.sent);
    confirmationPageReady = true;
  } catch {
    // Bokningen och eventuellt mejlet är redan klara. En misslyckad webbkvitto-
    // cookie får därför bara ge inline-bekräftelsen, aldrig ett 500-svar.
    console.error("[booking] Bekräftelsesidan kunde inte förberedas", {
      code: "receipt-cookie-error",
    });
  }

  if (!toPatient.sent) {
    // Bokningen ÄR sparad. Säg det rakt ut i stället för att låtsas att allt gick bra.
    console.error("[booking] Bekräftelsemejl kunde inte skickas", {
      code: toPatient.error ?? "unknown",
    });
    return {
      status: "success",
      message:
        "Din tid är bokad, men bekräftelsemejlet kunde inte skickas. Kontakta oss så hjälper vi dig med bokningsuppgifterna.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: true,
      confirmationPageReady,
    };
  }

  return {
    status: "success",
    message: "Din tid är bokad. Vi har skickat en bekräftelse med avbokningslänk till din e-post.",
    errors: {},
    attempt,
    confirmationEmailSent: true,
    bookingPersisted: true,
    confirmationPageReady,
  };
}
