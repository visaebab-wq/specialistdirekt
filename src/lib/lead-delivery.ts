// Levererar inkomna lead-förfrågningar till din inkorg. Körs ENDAST på servern.
//
// Två leveranssätt (miljövariabler, se .env.example) – det första som är
// konfigurerat används:
//   1. Gmail/SMTP:  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//   2. Resend:      RESEND_API_KEY
// Mottagare: LEAD_TO_EMAIL (annars site.email).
//
// Utan konfiguration loggas förfrågan på servern så att inget tappas.

import nodemailer from "nodemailer";
import { site } from "./site";

export type LeadData = {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  region: string;
  message: string;
};

export type DeliveryResult = {
  delivered: boolean;
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
  const rows: [string, string][] = [
    ["Namn", lead.name],
    ["E-post", lead.email],
    ["Telefon", lead.phone || "(ej angivet)"],
    ["Specialitet", lead.specialty || "(ej angivet)"],
    ["Ort/region", lead.region || "(ej angivet)"],
    ["Meddelande", lead.message],
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
  const subject = `Ny förfrågan: ${lead.specialty || "specialist"} – ${lead.name}`;
  const { html, text } = buildEmail(lead);

  // Logga alltid (så att en förfrågan aldrig försvinner spårlöst).
  console.info("[lead] Ny förfrågan", { ...lead, message: `${lead.message.slice(0, 80)}…` });

  // 1) SMTP (t.ex. Gmail) – skickar till din inkorg.
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"${site.name}" <${process.env.SMTP_USER}>`,
        to,
        replyTo: lead.email,
        subject,
        text,
        html,
      });
      return { delivered: true, channel: "smtp" };
    } catch (err) {
      console.error("[lead] SMTP-fel", err);
      return { delivered: false, channel: "smtp", error: String(err) };
    }
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
        return { delivered: false, channel: "email", error: `Resend ${res.status}` };
      }
      return { delivered: true, channel: "email" };
    } catch (err) {
      console.error("[lead] Resend-fel", err);
      return { delivered: false, channel: "email", error: String(err) };
    }
  }

  return { delivered: false, channel: "log", error: "Ingen e-postleverans konfigurerad" };
}
