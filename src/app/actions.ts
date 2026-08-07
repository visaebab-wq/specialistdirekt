"use server";

import { specialties } from "@/lib/specialties";
import type { LeadState } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";

const validSpecialtySlugs = new Set([
  ...specialties.map((s) => s.slug),
  "vet-inte",
]);

function isEmail(value: string) {
  // Enkel men robust e-postkontroll – tillräcklig för formulärvalidering.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  // Honungsfälla mot bottar: fältet är dolt och ska vara tomt.
  if ((formData.get("company") as string)?.trim()) {
    return { status: "success", message: "Tack! Vi hör av oss snart.", errors: {} };
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
  if (name.length < 2) errors.name = "Ange ditt namn.";
  if (!isEmail(email)) errors.email = "Ange en giltig e-postadress.";
  if (phone.length < 6) errors.phone = "Ange ett telefonnummer.";
  if (city.length < 2) errors.city = "Ange stad.";
  if (specialty && !validSpecialtySlugs.has(specialty))
    errors.specialty = "Välj en specialitet i listan.";
  if (message.length < 10)
    errors.message = "Beskriv vad du vill boka tid för med minst 10 tecken.";
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
