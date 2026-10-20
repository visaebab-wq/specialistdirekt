"use server";

import { headers } from "next/headers";
import { specialties } from "@/lib/specialties";
import type { LeadFormValues, LeadState } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";
import { isValidPreferredDate } from "@/lib/lead-dates";
import { isChildBirthDate } from "@/lib/booking-patient";

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

// Enkel rate-limit i minnet (per IP) mot spam/abuse. Nollställs vid omstart,
// vilket är ok för ett grundläggande skydd. Cloudflare/nginx kan komplettera.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 6;
const RL_MAX_IPS = 5000;
const rlHits = new Map<string, number[]>();

/**
 * Kartan hålls i ordning efter senast GODKÄNDA träff. Blockerade anrop flyttar
 * aldrig en post och lägger aldrig till en tidsstämpel. Därför kan vi rensa
 * utgångna poster från början utan att skanna en växande karta på varje anrop.
 */
function pruneExpiredRateLimitBuckets(now: number): void {
  for (const [key, hits] of rlHits) {
    const latest = hits[hits.length - 1];
    if (latest !== undefined && now - latest < RL_WINDOW_MS) break;
    rlHits.delete(key);
  }
}

function isIpRateLimited(ip: string, now = Date.now()): boolean {
  const previous = rlHits.get(ip);
  const recent = (previous || []).filter((t) => now - t < RL_WINDOW_MS);

  // Exakt samma gräns som tidigare: sex godkända anrop per rullande
  // tiominutersfönster. Blockerade anrop får inte göra bucketen större.
  if (recent.length >= RL_MAX) {
    if (previous && recent.length !== previous.length) rlHits.set(ip, recent);
    return true;
  }

  if (!previous) {
    if (rlHits.size >= RL_MAX_IPS) pruneExpiredRateLimitBuckets(now);
    // Alla platser används av aktiva IP:n. Neka en ny nyckel i stället för att
    // kasta bort en aktiv bucket och därmed ge dess IP nya kostnadsfria försök.
    if (rlHits.size >= RL_MAX_IPS) return true;
  } else {
    // Mapens insättningsordning fungerar som LRU efter senaste godkända träff.
    rlHits.delete(ip);
  }

  recent.push(now);
  rlHits.set(ip, recent);
  return false;
}

async function isRateLimited(): Promise<boolean> {
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
  return isIpRateLimited(ip);
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
    errors.preferredDate1 = "Ange ett giltigt datum från och med idag.";
  }
  if (!isValidPreferredDate(preferredDate2)) {
    errors.preferredDate2 = "Ange ett giltigt datum från och med idag.";
  } else if (preferredDate2 === preferredDate1) {
    errors.preferredDate2 = "Välj ett annat datum än det första.";
  }
  if (preferredDate3) {
    if (!isValidPreferredDate(preferredDate3)) {
      errors.preferredDate3 = "Ange ett giltigt datum från och med idag.";
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
  consent: boolean;
};

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  attempt: number;
  confirmationEmailSent: boolean;
  bookingPersisted: boolean;
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
  const { sendPatientConfirmation, sendOwnerPending } = await import("@/lib/booking-email");

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
  const childBirthDate = formString(formData, "childBirthDate");
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
  if (bookingType === "child") {
    if (childName.length < 2 || childName.length > MAX.name)
      errors.childName = "Fyll i barnets namn.";
    if (!isChildBirthDate(childBirthDate)) {
      errors.childBirthDate = "Barnet behöver vara 0–17 år vid bokningen.";
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

  const claim = claimSlot({
    slot,
    name,
    email,
    phone,
    message,
    bookingType,
    ...(bookingType === "child" ? { childName, childBirthDate } : {}),
  });
  if (!claim.ok) {
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
    sendSafely(() => sendOwnerPending(rec)),
  ]);

  if (!toOwner.sent) {
    console.error("[booking] Ägarnotis kunde inte skickas", {
      code: toOwner.error ?? "unknown",
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
        "Din tid är preliminärt reserverad, men bekräftelsemejlet kunde inte skickas. Kontakta oss så snart som möjligt för att bekräfta bokningen.",
      errors: {},
      attempt,
      confirmationEmailSent: false,
      bookingPersisted: true,
    };
  }

  return {
    status: "success",
    message:
      "Tack! Vi har skickat ett mejl till dig. Klicka på länken i mejlet för att bekräfta tiden och priset.",
    errors: {},
    attempt,
    confirmationEmailSent: true,
    bookingPersisted: true,
  };
}
