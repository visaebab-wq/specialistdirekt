// Mejlutskick för direktbokning. Körs ENDAST på servern.
//
// Patienten får en enkel bokningsbekräftelse med sin personliga avbokningslänk.
// Mottagaren får en notis direkt när bokningen sparats och en ny notis om
// patienten senare avbokar. Äldre väntande bokningar kan fortfarande använda
// den tidigare bekräftelsevägen tills deras länkar har löpt ut.

import { site } from "./site";
import { sendMail } from "./smtp";
import { formatPersonnummer } from "./personnummer";
import {
  BOOKING_CLINIC,
  BOOKING_CLINIC_ADDRESS,
  BOOKING_DOCTOR,
  BOOKING_SPECIALTY,
  bookingMapUrl,
} from "./booking-appointment";
import {
  BOOKING_SLOT_MINUTES,
  formatPrice,
  formatSlot,
} from "./booking-slots";
import type { BookingRecord } from "./booking-store";
import {
  bookingFreeCancelHours,
  bookingPriceSek,
  signBookingId,
} from "./booking-store";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function recipient(): string {
  return process.env.BOOKING_TO_EMAIL || process.env.LEAD_TO_EMAIL || site.email;
}

function linkBase(): string {
  const configured = (process.env.BOOKING_BASE_URL || site.url).trim();
  const canonical = new URL(site.url);
  let parsed: URL;

  try {
    parsed = new URL(configured);
  } catch {
    throw new Error("invalid-booking-base-url");
  }

  if (
    configured.replace(/\/$/, "").toLowerCase() !== canonical.origin.toLowerCase() ||
    parsed.protocol !== "https:" ||
    parsed.origin !== canonical.origin ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    (parsed.href !== parsed.origin && parsed.href !== `${parsed.origin}/`)
  ) {
    throw new Error("invalid-booking-base-url");
  }

  return canonical.origin;
}

function signedBookingUrl(pathname: string, rec: BookingRecord): string {
  const url = new URL(pathname, `${linkBase()}/`);
  url.searchParams.set("id", rec.id);
  url.searchParams.set("sig", signBookingId(rec.id));
  return url.toString();
}

/**
 * Avbokningslänken leder till en sida där avbokningen måste bekräftas med en
 * knapp – den avbokar aldrig bara av att länken öppnas. Både för att mejlklienter
 * och skannrar förhandshämtar länkar, och för att ett felklick i mejlet annars
 * skulle radera tiden direkt.
 */
export function cancelUrl(rec: BookingRecord): string {
  return signedBookingUrl("/boka-tid/avboka", rec);
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
  const price = formatPrice(bookingPriceSek(rec));
  const freeCancelHours = bookingFreeCancelHours(rec);
  const cancel = cancelUrl(rec);
  const map = bookingMapUrl();
  const childLine = rec.bookingType === "child" && rec.childName
    ? `Barn: ${rec.childName}${rec.childBirthDate ? ` (${rec.childBirthDate})` : ""}`
    : "";
  const cancelHref = escapeHtml(cancel);
  const mapHref = escapeHtml(map);
  const text = [
    `Hej ${rec.name},`,
    "",
    "Din bokning är bekräftad:",
    "",
    `Datum och tid: ${when}`,
    `Läkare: ${BOOKING_DOCTOR}`,
    `Besök: ${BOOKING_SPECIALTY}`,
    `Längd: ${BOOKING_SLOT_MINUTES} minuter`,
    `Pris: ${price} kr`,
    "Betalning: På plats vid besöket",
    `Mottagning: ${BOOKING_CLINIC}`,
    `Adress: ${BOOKING_CLINIC_ADDRESS}`,
    ...(childLine ? [childLine] : []),
    "",
    `Visa vägbeskrivning: ${map}`,
    "",
    `Kan du inte komma? Avboka kostnadsfritt senast ${freeCancelHours} timmar före besöket:`,
    "",
    cancel,
    "",
    "Tiden avbokas först när du bekräftar på nästa sida.",
    "",
    `${site.name} – ${site.url}`,
    "Inte en akuttjänst – ring 112 vid nödfall.",
  ].join("\n");

  const html = `<!doctype html><html lang="sv"><head><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @media only screen and (max-width:480px) {
        .email-shell { width:100% !important; }
        .mobile-pad { padding-left:20px !important; padding-right:20px !important; }
        .mobile-title { font-size:25px !important; line-height:31px !important; }
        .mobile-date { font-size:20px !important; line-height:27px !important; }
      }
    </style></head>
  <body style="margin:0;padding:0;background-color:#edf3f5">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">Din tid är bokad. I mejlet finns också din personliga avbokningslänk.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#edf3f5">
      <tr><td align="center" style="padding:32px 10px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" class="email-shell" style="width:100%;max-width:620px;background-color:#ffffff;border:1px solid #dce6e9;border-radius:18px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#172033;box-shadow:0 12px 32px rgba(15,50,72,0.08)">
          <tr><td style="height:5px;background-color:#14b8a6;font-size:0;line-height:0">&nbsp;</td></tr>
          <tr><td bgcolor="#15324a" class="mobile-pad" style="padding:28px 34px 30px;background-color:#15324a;color:#ffffff">
            <div style="font-size:13px;font-weight:bold;letter-spacing:1.7px;color:#5eead4">SPECIALISTDIREKT</div>
            <div class="mobile-title" style="padding-top:16px;font-size:29px;line-height:36px;font-weight:bold">Din tid är bokad</div>
            <div style="padding-top:7px;font-size:15px;line-height:22px;color:#d6e9ef">Här är din bokningsbekräftelse.</div>
          </td></tr>

          <tr><td class="mobile-pad" style="padding:28px 34px 10px;font-size:16px;line-height:25px;color:#172033">Hej ${escapeHtml(rec.name)},</td></tr>
          <tr><td class="mobile-pad" style="padding:0 34px 24px;font-size:15px;line-height:24px;color:#526273">
            Vi har bokat följande besökstid åt dig.
          </td></tr>

          <tr><td class="mobile-pad" style="padding:0 34px 22px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#effcf9" style="background-color:#effcf9;border:1px solid #bdece3;border-radius:14px">
              <tr><td style="padding:18px 20px 6px;font-size:11px;font-weight:bold;letter-spacing:1.2px;color:#0f766e">DATUM OCH TID</td></tr>
              <tr><td class="mobile-date" style="padding:0 20px 16px;font-size:22px;line-height:30px;font-weight:bold;color:#12283c">${escapeHtml(when)}</td></tr>
              <tr><td style="padding:14px 20px;border-top:1px solid #cceee7;font-size:14px;line-height:21px;color:#334155">
                <strong>${BOOKING_SLOT_MINUTES} minuter</strong><span style="color:#94a3b8"> &nbsp;•&nbsp; </span><strong>${price} kr</strong><br>
                <span style="color:#64748b">Betalas på plats vid besöket</span>
              </td></tr>
              <tr><td style="padding:14px 20px;border-top:1px solid #cceee7;font-size:14px;line-height:22px;color:#334155">
                <strong style="color:#172033">${BOOKING_DOCTOR}</strong><br>
                ${BOOKING_SPECIALTY}<br>
                ${childLine ? `<strong>Barn:</strong> ${escapeHtml(rec.childName || "")}${rec.childBirthDate ? ` (${escapeHtml(rec.childBirthDate)})` : ""}<br>` : ""}
                <strong>${BOOKING_CLINIC}</strong><br>
                <a href="${mapHref}" style="color:#0f766e;text-decoration:underline">${BOOKING_CLINIC_ADDRESS}</a>
              </td></tr>
            </table>
          </td></tr>

          <tr><td class="mobile-pad" style="padding:0 34px 30px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e1e8ec;border-radius:14px">
              <tr><td style="padding:17px 18px 7px;font-size:14px;font-weight:bold;color:#334155">Kan du inte komma?</td></tr>
              <tr><td style="padding:0 18px 13px;font-size:13px;line-height:21px;color:#64748b">
                Avboka kostnadsfritt senast ${freeCancelHours} timmar före besöket.
              </td></tr>
              <tr><td style="padding:0 18px 9px">
                <a href="${cancelHref}" style="display:inline-block;padding:11px 16px;border:1px solid #f0b8b8;border-radius:9px;color:#b42318;font-size:13px;font-weight:bold;text-decoration:none">Avboka tiden</a>
              </td></tr>
              <tr><td style="padding:0 18px 17px;font-size:11px;line-height:18px;color:#7c8996">
                Tiden avbokas först när du bekräftar på nästa sida.
              </td></tr>
            </table>
          </td></tr>

          <tr><td bgcolor="#f5f8fa" class="mobile-pad" style="padding:17px 34px;background-color:#f5f8fa;border-top:1px solid #e1e8ec;font-size:11px;line-height:18px;color:#7c8996">
            ${site.name} · <a href="${escapeHtml(site.url)}" style="color:#516b7b;text-decoration:underline">${site.url}</a><br>
            Inte en akuttjänst – ring 112 vid nödfall.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;

  return send({
    to: rec.email,
    subject: `Bokningsbekräftelse – ${when}`,
    html,
    text,
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
    [
      rec.bookingType === "child" ? "Barnets personnummer" : "Personnummer",
      rec.personnummer ? formatPersonnummer(rec.personnummer) : "(saknas)",
    ],
    ["E-post", rec.email],
    ["Telefon", rec.phone],
    ["Ärende", rec.message || "(inget angivet)"],
    ["Pris", `${bookingPriceSek(rec)} kr`],
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
  const freeCancelHours = bookingFreeCancelHours(rec);
  const timingLabel = free
    ? "Avbokningen gjordes inom den kostnadsfria gränsen."
    : `Avbokningen gjordes mindre än ${freeCancelHours} timmar före besöket.`;
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
            Detta är ett automatiskt meddelande från ${site.name}. Bokningen är markerad som avbokad i systemet.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

function cancelledText(rec: BookingRecord, free: boolean): string {
  const freeCancelHours = bookingFreeCancelHours(rec);
  const timing = free
    ? "Avbokningen gjordes inom den kostnadsfria gränsen."
    : `Avbokningen gjordes mindre än ${freeCancelHours} timmar före besöket.`;
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
    "Bokningen är markerad som avbokad i systemet.",
  ].join("\n");
}

/** Äldre flöde: notis för en väntande bokning som ännu inte bekräftats. */
export async function sendOwnerPending(rec: BookingRecord) {
  const heading = `Ny tid tagen (ej bekräftad) – ${formatSlot(rec.slot)}`;
  const note = "Bokningen är sparad som preliminär och är ännu inte bekräftad av patienten.";
  return send({
    to: recipient(),
    replyTo: rec.email,
    subject: `Ny bokning (ej bekräftad): ${formatSlot(rec.slot)} – ${rec.name}`,
    html: ownerHtml(heading, rec, note),
    text: ownerText(heading, rec, note),
  });
}

/** Notis när en bokning är bekräftad. */
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
