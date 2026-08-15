"use server";

import { headers } from "next/headers";
import { specialties } from "@/lib/specialties";
import type { LeadState } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";

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

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
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
  if ((specialty && !validSpecialtySlugs.has(specialty)) || specialty.length > MAX.specialty)
    errors.specialty = "Välj en specialitet i listan.";
  if (message.length < 10 || message.length > MAX.message)
    errors.message = `Beskriv vad du vill boka tid för (10–${MAX.message} tecken).`;
  if (!isIsoDate(preferredDate1)) errors.preferredDate1 = "Ange första möjliga datum.";
  if (!isIsoDate(preferredDate2)) errors.preferredDate2 = "Ange andra möjliga datum.";
  if (preferredDate3 && !isIsoDate(preferredDate3))
    errors.preferredDate3 = "Ange ett giltigt tredje datum.";
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

  return {
    status: "success",
    message:
      "Tack! Din tidsförfrågan är mottagen. Vi återkommer normalt inom en arbetsdag med förslag på en passande mottagning.",
    errors: {},
  };
}
