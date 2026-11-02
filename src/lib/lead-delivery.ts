// Levererar inkomna lead-förfrågningar till din inkorg. Körs ENDAST på servern.
//
// Leverans: SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) via mejlgrinden
// i mail-gate.mjs. Mottagare: LEAD_TO_EMAIL (annars site.email). Notisen är av
// typen lead_owner_notice och går bara ut automatiskt när ALLA mottagare är
// ägarens egna adresser – pekar LEAD_TO_EMAIL någon annanstans hålls den för
// godkännande. (Resend-vägen togs bort 2026-11-02: den gick förbi grinden och
// var inte konfigurerad i produktion.)
//
// Hela förfrågan sparas alltid på disk först, så att inget tappas.

import { appendFileSync, chmodSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { site } from "./site";
import { sendMail } from "./smtp";
import { specialties } from "./specialties";

/**
 * Slug → läsbar titel i mejlet. Formuläret skickar slugar ("ortoped"), och
 * "vet-inte" är ett riktigt svar sedan specialitet blev obligatoriskt.
 */
function specialtyLabel(slug: string): string {
  if (!slug) return "(ej angivet)";
  if (slug === "vet-inte") return "Vet inte / annat";
  if (slug === "privat-mr") return "Privat MR";
  return specialties.find((s) => s.slug === slug)?.title ?? slug;
}

// Durabel fallback: skriv ALLTID ner varje lead till en fil på disk, oavsett om
// e-postleveransen lyckas. Så tappas en förfrågan aldrig spårlöst igen, även om
// SMTP/Resend inte är konfigurerat (vilket hände: leads fastnade bara i loggen).
// Filen ligger utanför public/ (webbservern serverar den aldrig) och är
// gitignorerad. Sökväg kan överstyras med LEAD_LOG_FILE.
function persistLead(lead: LeadData): boolean {
  try {
    const file =
      process.env.LEAD_LOG_FILE || join(process.cwd(), ".data", "leads.jsonl");
    const parent = dirname(file);
    const parentExisted = existsSync(/* turbopackIgnore: true */ parent);
    mkdirSync(/* turbopackIgnore: true */ parent, { recursive: true, mode: 0o700 });
    if (!parentExisted || !process.env.LEAD_LOG_FILE)
      chmodSync(/* turbopackIgnore: true */ parent, 0o700);
    if (existsSync(/* turbopackIgnore: true */ file))
      chmodSync(/* turbopackIgnore: true */ file, 0o600);
    appendFileSync(
      /* turbopackIgnore: true */ file,
      JSON.stringify({ receivedAt: new Date().toISOString(), ...lead }) + "\n",
      { mode: 0o600 },
    );
    chmodSync(/* turbopackIgnore: true */ file, 0o600);
    return true;
  } catch (err) {
    console.error("[lead] Kunde inte spara lead till fil", err);
    return false;
  }
}

export type LeadData = {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  city: string;
  message: string;
  preferredDates: string[];
  timePreference: string;
};

export type DeliveryResult = {
  delivered: boolean;
  /** Hela förfrågan är durabelt sparad även om e-postkanalen fallerar. */
  persisted: boolean;
  channel: "smtp" | "log";
  error?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(lead: LeadData) {
  const timePreference =
    lead.timePreference === "before-noon"
      ? "Före lunch"
      : lead.timePreference === "after-noon"
        ? "Efter lunch"
        : lead.timePreference;
  const rows: [string, string][] = [
    ["Namn", lead.name],
    ["E-post", lead.email],
    ["Telefon", lead.phone],
    ["Stad", lead.city],
    ["Specialitet", specialtyLabel(lead.specialty)],
    ["Möjliga datum", lead.preferredDates.join(", ")],
    ["Tid på dagen", timePreference],
    ["Vad personen vill boka tid för", lead.message || "(ej angivet)"],
  ];
  const html = `
    <h2>Ny förfrågan via ${site.name}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;vertical-align:top">${k}</td><td>${escapeHtml(
              v,
            ).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="color:#64748b;font-size:12px">Skickat automatiskt från ${site.url}</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

export async function deliverLead(lead: LeadData): Promise<DeliveryResult> {
  const to = process.env.LEAD_TO_EMAIL || site.email;
  const subject = `Ny tidsförfrågan: ${specialtyLabel(lead.specialty)} – ${lead.name}`;
  const { html, text } = buildEmail(lead);

  // Skriv ALLTID ner hela förfrågan till disk först – oberoende av e-post.
  const persisted = persistLead(lead);
  // Journalen får bara visa driftstatus. Specialitet, ort och tidsönskemål är
  // hälsorelaterade uppgifter och hör enbart hemma i den skyddade lead-filen.
  console.info("[lead] Förfrågan mottagen", { persisted });

  // Via mejlgrinden. Utan SMTP loggar grinden "SMTP saknas" och inget skickas.
  const result = await sendMail(
    { to, replyTo: lead.email, subject, text, html },
    "lead",
    { kind: "lead_owner_notice" },
  );
  if (result.sent) return { delivered: true, persisted, channel: "smtp" };
  if (result.error !== "smtp-not-configured") {
    return { delivered: false, persisted, channel: "smtp", error: result.error };
  }

  return {
    delivered: false,
    persisted,
    channel: "log",
    error: persisted
      ? "Ingen e-postleverans konfigurerad – sparad till .data/leads.jsonl"
      : "Ingen leverans – varken e-post eller fil",
  };
}
