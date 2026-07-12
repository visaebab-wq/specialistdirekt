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
  const region = (formData.get("region") as string)?.trim() ?? "";
  const consent = formData.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Ange ditt namn.";
  if (!isEmail(email)) errors.email = "Ange en giltig e-postadress.";
  if (specialty && !validSpecialtySlugs.has(specialty))
    errors.specialty = "Välj en specialitet i listan.";
  if (message.length < 10)
    errors.message = "Beskriv ditt behov med minst 10 tecken så kan vi hjälpa dig bättre.";
  if (!consent) errors.consent = "Du behöver godkänna att vi behandlar dina uppgifter.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Kontrollera fälten nedan.", errors };
  }

  // Leverera förfrågan (e-post via Resend om konfigurerat, annars loggas den).
  const result = await deliverLead({ name, email, phone, specialty, region, message });
  if (!result.delivered) {
    // Logga tydligt – i produktion bör RESEND_API_KEY vara satt.
    console.warn("[lead] Ej levererad via e-post:", result.error ?? "okänt fel");
  }

  return {
    status: "success",
    message:
      "Tack! Din förfrågan är mottagen. Vi återkommer normalt inom en arbetsdag med förslag på en passande specialist.",
    errors: {},
  };
}
