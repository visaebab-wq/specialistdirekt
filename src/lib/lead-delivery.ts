// Levererar inkomna lead-förfrågningar till din inkorg. Körs ENDAST på servern.
//
// Två leveranssätt (miljövariabler, se .env.example) – det första som är
// konfigurerat används:
//   1. Gmail/SMTP:  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//   2. Resend:      RESEND_API_KEY
// Mottagare: LEAD_TO_EMAIL (annars site.email).
//
// Utan konfiguration loggas förfrågan på servern så att inget tappas.

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { site } from "./site";
import { sendMail, smtpConfigured } from "./smtp";
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
    const file = process.env.LEAD_LOG_FILE || join(process.cwd(), ".data", "leads.jsonl");
    mkdirSync(dirname(file), { recursive: true });
    appendFileSync(file, JSON.stringify({ receivedAt: new Date().toISOString(), ...lead }) + "\n");
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
  channel: "smtp" | "email" | "log";
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

  // Logga att flödet körts, men aldrig patientens namn, kontaktuppgifter eller
  // fritext i serverloggen. Hela förfrågan sparas i den skyddade lead-filen.
  console.info("[lead] Ny förfrågan", {
    specialty: lead.specialty,
    city: lead.city,
    preferredDateCount: lead.preferredDates.length,
    timePreference: lead.timePreference,
  });

  // Skriv ALLTID ner hela förfrågan till disk först – oberoende av e-post.
  const persisted = persistLead(lead);

  // 1) SMTP (t.ex. Gmail) – skickar till din inkorg.
  if (smtpConfigured()) {
    const result = await sendMail({ to, replyTo: lead.email, subject, text, html }, "lead");
    if (result.sent) return { delivered: true, persisted, channel: "smtp" };
    return { delivered: false, persisted, channel: "smtp", error: result.error };
  }

  // 2) Resend (HTTP API) – alternativ.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const from = process.env.LEAD_FROM_EMAIL || "Specialistdirekt <onboarding@resend.dev>";
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, html, text }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[lead] Resend-fel", res.status, body);
        return { delivered: false, persisted, channel: "email", error: `Resend ${res.status}` };
      }
      return { delivered: true, persisted, channel: "email" };
    } catch (err) {
      console.error("[lead] Resend-fel", err);
      return { delivered: false, persisted, channel: "email", error: String(err) };
    }
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
