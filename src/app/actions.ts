"use server";

import { headers } from "next/headers";
import { specialties } from "@/lib/specialties";
import type { LeadState } from "@/lib/lead";
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

function isEmail(value: string) {
  // Enkel men robust e-postkontroll – tillräcklig för formulärvalidering.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

// Enkel rate-limit i minnet (per IP) mot spam/abuse. Nollställs vid omstart,
// vilket är ok för ett grundläggande skydd. Cloudflare/nginx kan komplettera.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 6;
const rlHits = new Map<string, number[]>();

async function isRateLimited(): Promise<boolean> {
  const h = await headers();
  const ip = (
    h.get("cf-connecting-ip") ||
    h.get("x-forwarded-for") ||
    h.get("x-real-ip") ||
    "unknown"
  )
    .split(",")[0]
    .trim();
  const now = Date.now();
  const recent = (rlHits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  recent.push(now);
  rlHits.set(ip, recent);
  // Håll kartan liten: rensa gamla nycklar då och då.
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) {
      if (v.every((t) => now - t >= RL_WINDOW_MS)) rlHits.delete(k);
    }
  }
  return recent.length > RL_MAX;
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  // Honungsfälla mot bottar: fältet är dolt och ska vara tomt.
  if (formString(formData, "company")) {
    return { status: "success", message: "Tack! Vi hör av oss snart.", errors: {} };
  }

  // Rate-limit mot spam/abuse.
  if (await isRateLimited()) {
    return {
      status: "error",
      message: "För många förfrågningar just nu. Vänta en liten stund och försök igen.",
      errors: {},
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

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > MAX.name) errors.name = "Ange ditt namn.";
  if (!isEmail(email) || email.length > MAX.email) errors.email = "Ange en giltig e-postadress.";
  if (phone.length > MAX.phone || phone.replace(/\D/g, "").length < 6)
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
    return { status: "error", message: "Kontrollera fälten nedan.", errors };
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
    };
  }

  return {
    status: "success",
    message:
      "Tack! Din tidsförfrågan är mottagen. Vi återkommer normalt inom en arbetsdag med besked om möjliga bokningsalternativ.",
    errors: {},
  };
}

// ---------------------------------------------------------------------------
// Direktbokning hos Dr Masoud Sorkhabi
// ---------------------------------------------------------------------------

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
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
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const { isValidSlot } = await import("@/lib/booking-slots");
  const { bookingSigningConfigured, claimSlot } = await import("@/lib/booking-store");
  const { sendPatientConfirmation, sendOwnerPending } = await import("@/lib/booking-email");

  if (formString(formData, "company")) {
    return { status: "success", message: "Tack! Du får ett bekräftelsemejl.", errors: {} };
  }
  if (await isRateLimited()) {
    return {
      status: "error",
      message: "För många försök just nu. Vänta en stund och försök igen.",
      errors: {},
    };
  }
  if (!bookingSigningConfigured()) {
    console.error("[booking] BOOKING_SECRET saknas eller är för kort");
    return {
      status: "error",
      message: "Bokningssystemet är tillfälligt otillgängligt. Ingen tid har reserverats.",
      errors: {},
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

  const errors: Record<string, string> = {};
  if (bookingTypeInput !== "adult" && bookingTypeInput !== "child")
    errors.bookingType = "Bokningstypen är inte giltig. Ladda om sidan och försök igen.";
  if (!slot) errors.slot = "Välj en tid.";
  else if (slot.length > 40) errors.slot = "Tiden är inte längre giltig. Välj en annan.";
  else if (!isValidSlot(slot)) errors.slot = "Tiden är inte längre giltig. Välj en annan.";
  if (name.length < 2 || name.length > MAX.name) errors.name = "Fyll i ditt namn.";
  if (email.length > MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Fyll i en giltig e-postadress.";
  if (phone.length > MAX.phone || phone.replace(/\D/g, "").length < 6)
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
  if (formData.get("consent") !== "on")
    errors.consent = "Du behöver godkänna villkoren.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Kontrollera fälten nedan.", errors };
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
      };
    }
    return {
      status: "error",
      message: "Tyvärr, någon hann boka den tiden precis före dig. Välj en annan tid.",
      errors: { slot: "Tiden är upptagen." },
    };
  }

  const rec = claim.record;
  const [toPatient] = await Promise.all([
    sendPatientConfirmation(rec),
    sendOwnerPending(rec).catch(() => ({ sent: false })),
  ]);

  if (!toPatient.sent) {
    // Bokningen ÄR sparad. Säg det rakt ut i stället för att låtsas att allt gick bra.
    console.error("[booking] Bekräftelsemejl kunde inte skickas", rec.id, toPatient.error);
    return {
      status: "success",
      message:
        "Din tid är preliminärt reserverad, men bekräftelsemejlet kunde inte skickas. Kontakta oss så snart som möjligt för att bekräfta bokningen.",
      errors: {},
    };
  }

  return {
    status: "success",
    message:
      "Tack! Vi har skickat ett mejl till dig. Klicka på länken i mejlet för att bekräfta tiden och priset.",
    errors: {},
  };
}
