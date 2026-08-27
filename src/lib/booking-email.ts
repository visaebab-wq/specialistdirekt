// Mejlutskick för direktbokning. Körs ENDAST på servern.
//
// Tre utskick:
//   1. Till patienten – bekräftelselänk med tid och pris.
//   2. Till mottagaren – direkt när en tid tagits (obekräftad).
//   3. Till mottagaren – när patienten klickat i bekräftelselänken.
//
// Utskick två finns för att ingen bokning ska kunna gå förlorad om patienten
// aldrig hinner bekräfta. Loggen på disk är den yttersta garantin, men ett mejl
// direkt gör att det syns utan att någon läser filer.

import { site } from "./site";
import { sendMail } from "./smtp";
import {
  BOOKING_FREE_CANCEL_HOURS,
  BOOKING_PRICE_SEK,
  BOOKING_SLOT_MINUTES,
  formatSlot,
} from "./booking-slots";
import type { BookingRecord } from "./booking-store";
import { signBookingId } from "./booking-store";

const DOCTOR = "Dr Masoud Sorkhabi";
const SPECIALTY = "Specialist i ortopedi och ryggkirurgi";
const CLINIC = "NoPainClinic";
const CLINIC_ADDRESS = "Karl Johansgatan 100, 414 55 Göteborg";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function recipient(): string {
  return process.env.BOOKING_TO_EMAIL || process.env.LEAD_TO_EMAIL || site.email;
}

function linkBase(): string {
  return process.env.BOOKING_BASE_URL || site.url;
}

export function confirmUrl(rec: BookingRecord): string {
  return `${linkBase()}/boka-tid/bekrafta?id=${rec.id}&sig=${signBookingId(rec.id)}`;
}

/**
 * Avbokningslänken leder till en sida där avbokningen måste bekräftas med en
 * knapp – den avbokar aldrig bara av att länken öppnas. Både för att mejlklienter
 * och skannrar förhandshämtar länkar, och för att ett felklick i mejlet annars
 * skulle radera tiden direkt.
 */
export function cancelUrl(rec: BookingRecord): string {
  return `${linkBase()}/boka-tid/avboka?id=${rec.id}&sig=${signBookingId(rec.id)}`;
}

function googleCalendarUrl(rec: BookingRecord): string {
  const start = new Date(rec.slot);
  const end = new Date(start.getTime() + BOOKING_SLOT_MINUTES * 60_000);
  const compactUtc = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Besök hos ${DOCTOR}`,
    dates: `${compactUtc(start)}/${compactUtc(end)}`,
    details: `${SPECIALTY}. Boknings-id: ${rec.id}`,
    location: `${CLINIC}, ${CLINIC_ADDRESS}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function mapUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_ADDRESS)}`;
}

function calendarFile(rec: BookingRecord): string {
  const start = new Date(rec.slot);
  const end = new Date(start.getTime() + BOOKING_SLOT_MINUTES * 60_000);
  const utc = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const ics = (value: string) => value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Specialistdirekt//Bokning//SV",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${rec.id}@specialistdirekt.se`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(start)}`,
    `DTEND:${utc(end)}`,
    `SUMMARY:${ics(`Besök hos ${DOCTOR}`)}`,
    `DESCRIPTION:${ics(`${SPECIALTY}. Boknings-id: ${rec.id}`)}`,
    `LOCATION:${ics(`${CLINIC}, ${CLINIC_ADDRESS}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: string; contentType: string }[];
};

/**
 * Skickar via den gemensamma SMTP-kanalen. Kastar aldrig – anroparen ska kunna
 * spara bokningen även när mejlet fallerar, och får tillbaka utfallet för
 * loggning.
 */
async function send(mail: Mail): Promise<{ sent: boolean; error?: string }> {
  return sendMail(mail, "booking");
}

/** 1. Bekräftelsemejl till patienten. */
export async function sendPatientConfirmation(rec: BookingRecord) {
  const when = formatSlot(rec.slot);
  const url = confirmUrl(rec);
  const cancel = cancelUrl(rec);
  const calendar = googleCalendarUrl(rec);
  const map = mapUrl();
  const childLine = rec.bookingType === "child" && rec.childName
    ? `Barn: ${rec.childName}${rec.childBirthDate ? ` (${rec.childBirthDate})` : ""}`
    : "";
  const cancelHref = cancel.replace(/&/g, "&amp;");
  const text = [
    `Hej ${rec.name},`,
    "",
    `Du har fått en tid hos ${DOCTOR}:`,
    "",
    `    ${when}`,
    `    Pris: ${BOOKING_PRICE_SEK} kr`,
    `    Mottagning: ${CLINIC}`,
    `    Adress: ${CLINIC_ADDRESS}`,
    ...(childLine ? [`    ${childLine}`] : []),
    "",
    "Tiden är preliminär tills du bekräftat den. Godkänner du tiden och priset,",
    "klicka på länken nedan:",
    "",
    url,
    "",
    `Lägg till i kalendern: ${calendar}`,
    `Visa vägbeskrivning: ${map}`,
    "",
    "Om du inte bekräftar inom två timmar kan tiden erbjudas till någon annan.",
    "",
    `Kan du inte komma? Fram till ${BOOKING_FREE_CANCEL_HOURS} timmar före besöket avbokar du`,
    "kostnadsfritt här (du får bekräfta avbokningen på sidan):",
    "",
    cancel,
    "",
    `${site.name} – ${site.url}`,
    "Inte en akuttjänst – ring 112 vid nödfall.",
  ].join("\n");

  const html = `<!doctype html><html lang="sv"><head><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media only screen and (max-width:480px) {
        .email-shell { width:100% !important; }
        .mobile-pad { padding-left:18px !important; padding-right:18px !important; }
        .mobile-action { display:block !important; width:100% !important; box-sizing:border-box !important; }
        .mobile-gap { display:block !important; width:100% !important; height:8px !important; line-height:8px !important; }
        .mobile-title { font-size:22px !important; line-height:28px !important; }
      }
    </style></head>
  <body style="margin:0;padding:0;background-color:#eef3f6">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef3f6">
      <tr><td align="center" style="padding:24px 10px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" class="email-shell" style="width:100%;max-width:600px;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#172033">
          <tr><td bgcolor="#18324e" class="mobile-pad" style="padding:24px 28px;background-color:#18324e;color:#ffffff">
            <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#5eead4">SPECIALISTDIREKT</div>
            <div class="mobile-title" style="padding-top:10px;font-size:25px;line-height:31px;font-weight:bold">Bekräfta din tid</div>
            <div style="padding-top:4px;font-size:14px;line-height:20px;color:#d6ecf4">Tiden är reserverad i två timmar</div>
          </td></tr>
          <tr><td class="mobile-pad" style="padding:24px 28px 8px;font-size:16px;line-height:24px">Hej ${escapeHtml(rec.name)},</td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 20px;font-size:15px;line-height:23px;color:#475569">
            Vi har reserverat en tid hos <strong style="color:#172033">${DOCTOR}</strong><br>${SPECIALTY}${childLine ? `<br><strong>Barn:</strong> ${escapeHtml(rec.childName || "")}${rec.childBirthDate ? ` (${escapeHtml(rec.childBirthDate)})` : ""}` : ""}
          </td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0fdfa" style="background-color:#f0fdfa;border:1px solid #cde9e5">
              <tr><td style="padding:16px 18px 5px;font-size:11px;font-weight:bold;letter-spacing:1px;color:#0f766e">DATUM OCH TID</td></tr>
              <tr><td style="padding:0 18px 12px;font-size:19px;line-height:26px;font-weight:bold;color:#172033">${escapeHtml(when)}</td></tr>
              <tr><td style="padding:12px 18px;border-top:1px solid #cde9e5;font-size:14px;color:#334155">${BOOKING_SLOT_MINUTES} minuter&nbsp;&nbsp;•&nbsp;&nbsp;<strong>${BOOKING_PRICE_SEK} kr</strong></td></tr>
            </table>
          </td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 12px;font-size:15px;line-height:23px;color:#334155">Bekräfta tiden och priset för att slutföra bokningen.</td></tr>
          <tr><td align="center" class="mobile-pad" style="padding:4px 28px 20px">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#0d9488" style="background-color:#0d9488;padding:13px 28px">
              <a href="${url}" style="display:inline-block;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none">Bekräfta min tid</a>
            </td></tr></table>
          </td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td width="49%" align="center" class="mobile-action" style="padding:11px 4px;border:1px solid #0d9488"><a href="${calendar}" style="display:block;color:#0f766e;font-size:13px;font-weight:bold;text-decoration:none">Add to calendar</a></td>
              <td width="2%" class="mobile-gap">&nbsp;</td>
              <td width="49%" align="center" class="mobile-action" style="padding:11px 4px;border:1px solid #0d9488"><a href="${map}" style="display:block;color:#0f766e;font-size:13px;font-weight:bold;text-decoration:none">Open in Maps</a></td>
            </tr></table>
          </td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e2e8f0">
              <tr><td style="padding:14px 16px;font-size:14px;line-height:21px;color:#334155">
                <span style="font-size:11px;font-weight:bold;letter-spacing:1px;color:#64748b">BESÖKSADRESS</span><br>
                <strong style="color:#172033">${CLINIC}</strong><br>
                <a href="${map}" style="color:#0f766e;text-decoration:underline">${CLINIC_ADDRESS}</a>
              </td></tr>
            </table>
          </td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 18px;font-size:12px;line-height:19px;color:#9a3412">Bekräfta inom två timmar. Därefter kan tiden erbjudas till någon annan.</td></tr>
          <tr><td class="mobile-pad" style="padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;line-height:19px;color:#64748b">
            Kan du inte komma? Fram till <strong>${BOOKING_FREE_CANCEL_HOURS} timmar</strong> före besöket kan du
            <a href="${cancelHref}" style="color:#64748b;text-decoration:underline">avboka kostnadsfritt</a>.
          </td></tr>
          <tr><td bgcolor="#f8fafc" class="mobile-pad" style="padding:14px 28px;background-color:#f8fafc;font-size:11px;line-height:18px;color:#94a3b8">
            ${site.name} · <a href="${site.url}" style="color:#64748b">${site.url}</a><br>Inte en akuttjänst – ring 112 vid nödfall.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;

  return send({
    to: rec.email,
    subject: `Bekräfta din tid ${when} – ${DOCTOR}`,
    html,
    text,
    attachments: [
      {
        filename: "specialistdirekt-bokning.ics",
        content: calendarFile(rec),
        contentType: "text/calendar; charset=utf-8; method=PUBLISH",
      },
    ],
  });
}

function ownerRows(rec: BookingRecord): [string, string][] {
  return [
    ["Tid", formatSlot(rec.slot)],
    [rec.bookingType === "child" ? "Vårdnadshavare" : "Namn", rec.name],
    ...(rec.bookingType === "child"
      ? ([
          ["Barn", rec.childName || "(saknas)"],
          ["Barnets födelsedatum", rec.childBirthDate || "(saknas)"],
        ] as [string, string][])
      : []),
    ["E-post", rec.email],
    ["Telefon", rec.phone],
    ["Ärende", rec.message || "(inget angivet)"],
    ["Pris", `${BOOKING_PRICE_SEK} kr`],
    ["Boknings-id", rec.id],
  ];
}

function ownerHtml(heading: string, rec: BookingRecord, note?: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;color:#0f172a">
      <h2>${escapeHtml(heading)}</h2>
      ${note ? `<p style="background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 14px">${escapeHtml(note)}</p>` : ""}
      <table cellpadding="6" style="border-collapse:collapse">
        ${ownerRows(rec)
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:700;vertical-align:top">${k}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;
}

function ownerText(heading: string, rec: BookingRecord, note?: string): string {
  return [heading, note ?? "", "", ...ownerRows(rec).map(([k, v]) => `${k}: ${v}`)]
    .filter(Boolean)
    .join("\n");
}

function cancelledHtml(rec: BookingRecord, free: boolean): string {
  const when = formatSlot(rec.slot);
  const timingLabel = free
    ? "Avbokningen gjordes inom den kostnadsfria gränsen."
    : `Avbokningen gjordes mindre än ${BOOKING_FREE_CANCEL_HOURS} timmar före besöket.`;
  const timingColor = free ? "#0f766e" : "#9a3412";
  const timingBackground = free ? "#f0fdfa" : "#fff7ed";
  const timingBorder = free ? "#99f6e4" : "#fed7aa";

  return `<!doctype html><html lang="sv"><head><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media only screen and (max-width:480px) {
        .email-shell { width:100% !important; }
        .mobile-pad { padding-left:18px !important; padding-right:18px !important; }
        .detail-label { display:block !important; width:100% !important; padding-bottom:3px !important; }
        .detail-value { display:block !important; width:100% !important; padding-left:0 !important; }
      }
    </style></head>
  <body style="margin:0;padding:0;background-color:#eef3f6">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef3f6">
      <tr><td align="center" style="padding:24px 10px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" class="email-shell" style="width:100%;max-width:600px;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#172033">
          <tr><td bgcolor="#18324e" class="mobile-pad" style="padding:24px 28px;background-color:#18324e;color:#ffffff">
            <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#5eead4">SPECIALISTDIREKT</div>
            <div style="padding-top:10px;font-size:25px;line-height:31px;font-weight:bold">Tiden är avbokad</div>
            <div style="padding-top:4px;font-size:14px;line-height:20px;color:#d6ecf4">Patienten har avbokat via sin personliga länk</div>
          </td></tr>

          <tr><td class="mobile-pad" style="padding:24px 28px 18px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff1f2" style="background-color:#fff1f2;border:1px solid #fecdd3">
              <tr><td style="padding:16px 18px 5px;font-size:11px;font-weight:bold;letter-spacing:1px;color:#be123c">AVBOKAD BESÖKSTID</td></tr>
              <tr><td style="padding:0 18px 16px;font-size:20px;line-height:27px;font-weight:bold;color:#172033">${escapeHtml(when)}</td></tr>
            </table>
          </td></tr>

          <tr><td class="mobile-pad" style="padding:0 28px 18px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${timingBackground}" style="background-color:${timingBackground};border:1px solid ${timingBorder}">
              <tr><td style="padding:13px 16px;font-size:14px;line-height:21px;color:${timingColor}"><strong>${escapeHtml(timingLabel)}</strong></td></tr>
            </table>
          </td></tr>

          <tr><td class="mobile-pad" style="padding:4px 28px 10px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#64748b">PATIENTUPPGIFTER</td></tr>
          <tr><td class="mobile-pad" style="padding:0 28px 24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:1px solid #e2e8f0">
              ${ownerRows(rec)
                .filter(([label]) => !["Tid", "Pris"].includes(label))
                .map(
                  ([label, value], index) => `<tr>
                    <td class="detail-label" width="120" style="padding:11px 14px;${index ? "border-top:1px solid #e2e8f0;" : ""}font-size:13px;font-weight:bold;vertical-align:top;color:#64748b">${escapeHtml(label)}</td>
                    <td class="detail-value" style="padding:11px 14px;${index ? "border-top:1px solid #e2e8f0;" : ""}font-size:14px;line-height:20px;color:#172033">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
                  </tr>`,
                )
                .join("")}
            </table>
          </td></tr>

          <tr><td bgcolor="#f8fafc" class="mobile-pad" style="padding:14px 28px;background-color:#f8fafc;font-size:11px;line-height:18px;color:#94a3b8">
            Detta är ett automatiskt meddelande från ${site.name}. Den avbokade tiden är nu tillgänglig för bokning igen.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

function cancelledText(rec: BookingRecord, free: boolean): string {
  const timing = free
    ? "Avbokningen gjordes inom den kostnadsfria gränsen."
    : `Avbokningen gjordes mindre än ${BOOKING_FREE_CANCEL_HOURS} timmar före besöket.`;
  return [
    "TIDEN ÄR AVBOKAD",
    "",
    `Besökstid: ${formatSlot(rec.slot)}`,
    timing,
    "",
    "PATIENTUPPGIFTER",
    ...ownerRows(rec)
      .filter(([label]) => !["Tid", "Pris"].includes(label))
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "Den avbokade tiden är nu tillgänglig för bokning igen.",
  ].join("\n");
}

/** 2. Notis när en tid tagits men ännu inte bekräftats. */
export async function sendOwnerPending(rec: BookingRecord) {
  const heading = `Ny tid tagen (ej bekräftad) – ${formatSlot(rec.slot)}`;
  return send({
    to: recipient(),
    replyTo: rec.email,
    subject: `Ny bokning (ej bekräftad): ${formatSlot(rec.slot)} – ${rec.name}`,
    html: ownerHtml(heading, rec, "Patienten har fått bekräftelsemejlet men ännu inte klickat."),
    text: ownerText(heading, rec, "Patienten har fått bekräftelsemejlet men ännu inte klickat."),
  });
}

/** 3. Notis när patienten bekräftat tiden och priset. */
export async function sendOwnerVerified(rec: BookingRecord, conflict: boolean) {
  const heading = `BEKRÄFTAD av patienten – ${formatSlot(rec.slot)}`;
  const note = conflict
    ? "OBS: luckan hade redan tagits av någon annan. Bokningen är sparad men behöver redas ut manuellt."
    : undefined;
  return send({
    to: recipient(),
    replyTo: rec.email,
    subject: `${conflict ? "KROCK – " : ""}Bekräftad bokning: ${formatSlot(rec.slot)} – ${rec.name}`,
    html: ownerHtml(heading, rec, note),
    text: ownerText(heading, rec, note),
  });
}

/** 4. Notis när patienten avbokat själv via länken i mejlet. */
export async function sendOwnerCancelled(rec: BookingRecord, free: boolean) {
  return send({
    to: recipient(),
    replyTo: rec.email,
    subject: `Avbokad tid: ${formatSlot(rec.slot)} – ${rec.name}`,
    html: cancelledHtml(rec, free),
    text: cancelledText(rec, free),
  });
}
