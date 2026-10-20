"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
  if ((formData.get("company") as string)?.trim()) {
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

  const name = (formData.get("name") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const specialty = (formData.get("specialty") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";
  const city = (formData.get("city") as string)?.trim() ?? "";
  const preferredDate1 = (formData.get("preferredDate1") as string)?.trim() ?? "";
  const preferredDate2 = (formData.get("preferredDate2") as string)?.trim() ?? "";
  const preferredDate3 = (formData.get("preferredDate3") as string)?.trim() ?? "";
  const timePreference = (formData.get("timePreference") as string)?.trim() ?? "";
  const consent = formData.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > MAX.name) errors.name = "Ange ditt namn.";
  if (!isEmail(email) || email.length > MAX.email) errors.email = "Ange en giltig e-postadress.";
  if (phone.length < 6 || phone.length > MAX.phone) errors.phone = "Ange ett telefonnummer.";
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
  const { claimSlot } = await import("@/lib/booking-store");
  const { sendPatientConfirmation, sendOwnerPending } = await import("@/lib/booking-email");

  if ((formData.get("company") as string)?.trim()) {
    return { status: "success", message: "Tack! Du får ett bekräftelsemejl.", errors: {} };
  }
  if (await isRateLimited()) {
    return {
      status: "error",
      message: "För många försök just nu. Vänta en stund och försök igen.",
      errors: {},
    };
  }

  const str = (k: string, max: number) =>
    ((formData.get(k) as string) || "").trim().slice(0, max);
  const slot = str("slot", 40);
  const name = str("name", 100);
  const email = str("email", 160);
  const phone = str("phone", 40);
  const message = str("message", 2000);
  const bookingType = formData.get("bookingType") === "child" ? "child" : "adult";
  const childName = str("childName", 100);
  const childBirthDate = str("childBirthDate", 10);

  const errors: Record<string, string> = {};
  if (!slot) errors.slot = "Välj en tid.";
  else if (!isValidSlot(slot)) errors.slot = "Tiden är inte längre giltig. Välj en annan.";
  if (name.length < 2) errors.name = "Fyll i ditt namn.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Fyll i en giltig e-postadress.";
  if (phone.replace(/\D/g, "").length < 6) errors.phone = "Fyll i ett telefonnummer.";
  if (bookingType === "child") {
    if (childName.length < 2) errors.childName = "Fyll i barnets namn.";
    if (!isChildBirthDate(childBirthDate)) {
      errors.childBirthDate = "Barnet behöver vara 0–17 år vid bokningen.";
    }
  }
  if (!formData.get("consent")) errors.consent = "Du behöver godkänna villkoren.";
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
        "Din tid är reserverad, men bekräftelsemejlet kunde inte skickas. Vi kontaktar dig – du behöver inte boka om.",
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

/**
 * Avbokning från länken i bekräftelsemejlet.
 *
 * Körs bara som POST från knappen på avbokningssidan – ALDRIG av att länken
 * öppnas. Mejlklienter och skannrar hämtar länkar i förväg, och ett felklick i
 * mejlet ska inte kunna radera tiden. Signaturen kontrolleras här igen: det
 * dolda fältet i formuläret går att ändra, så sidans kontroll räcker inte.
 */
export async function cancelBookingFromLink(formData: FormData): Promise<void> {
  const { cancelBooking, verifySignature } = await import("@/lib/booking-store");
  const { sendOwnerCancelled } = await import("@/lib/booking-email");

  const id = ((formData.get("id") as string) || "").trim().slice(0, 80);
  const sig = ((formData.get("sig") as string) || "").trim().slice(0, 80);
  if (!id || !sig || !verifySignature(id, sig)) redirect("/boka-tid/avboka?fel=lank");

  const result = cancelBooking(id);
  if (!result.ok) redirect("/boka-tid/avboka?fel=lank");

  // Mottagningen måste få veta – annars står en tom tid kvar i kalendern.
  // Avbokningen är redan skriven till loggen; ett trasigt mejl får inte ångra den.
  if (!result.already) {
    await sendOwnerCancelled(result.record, result.free).catch((err) =>
      console.error("[booking] Kunde inte skicka avbokningsnotis", err),
    );
  }

  redirect(`/boka-tid/avboka?id=${encodeURIComponent(id)}&sig=${encodeURIComponent(sig)}`);
}
