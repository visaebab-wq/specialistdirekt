// Gemensam SMTP-kanal för lead- och bokningsmejl. Körs ENDAST på servern.
//
// Varför en egen modul: webbhotellets certifikat för mail.tandakutnu.se gick ut
// 17 aug 2026, och då slutade BÅDA utskicksvägarna att fungera samtidigt
// ("certificate has expired") – tidsförfrågningar och bokningsbekräftelser.
// Ett patientmejl får inte tystna för att ett certifikat inte förnyats hos
// webbhotellet, så vi gör så här:
//
//   1. Försök alltid först med FULL certifikatkontroll.
//   2. Bara om felet är ett certifikatfel – och bara då – görs ett nytt försök
//      utan kontroll av certifikatet. Anslutningen är fortfarande krypterad,
//      men äktheten kontrolleras inte. Det loggas som varning.
//
// Certifikatfel uppstår under TLS-handskakningen, alltså INNAN något meddelande
// skickats. Därför kan andraförsöket aldrig ge ett dubbelmejl. Andra fel
// (auth, timeout, avvisad mottagare) återförsöks aldrig, just av den anledningen.
//
// Sätt SMTP_STRICT_TLS=1 för att stänga av andraförsöket helt.

import nodemailer from "nodemailer";
import { site } from "./site";

export type SmtpMail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: string; contentType: string }[];
};

export type SmtpResult = { sent: boolean; error?: string; insecureTls?: boolean };

/** Felkoder som betyder "certifikatet går inte att lita på" – inget annat. */
const CERT_ERROR_CODES = new Set([
  "CERT_HAS_EXPIRED",
  "CERT_NOT_YET_VALID",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

function isCertError(err: unknown): boolean {
  const e = err as { code?: string; reason?: string; message?: string } | null;
  if (!e) return false;
  if (e.code && CERT_ERROR_CODES.has(e.code)) return true;
  // nodemailer packar ibland in orsaken i `reason` och sätter koden till ESOCKET.
  return /certificate|self.signed|altname/i.test(`${e.reason ?? ""} ${e.message ?? ""}`);
}

/**
 * Nodemailer-fel kan innehålla mottagaradress och hela SMTP-svaret. Logga och
 * returnera därför bara ett litet tekniskt sammandrag, aldrig felobjektet,
 * meddelandets ämnesrad eller andra patientuppgifter.
 */
function errorSummary(err: unknown): string {
  const e = err as { code?: unknown; command?: unknown; responseCode?: unknown } | null;
  const safeToken = (value: unknown) =>
    typeof value === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(value) ? value : undefined;
  const code = safeToken(e?.code) ?? "unknown";
  const command = safeToken(e?.command);
  const responseCode =
    typeof e?.responseCode === "number" && Number.isInteger(e.responseCode)
      ? e.responseCode
      : undefined;
  return [
    `code=${code}`,
    ...(command ? [`command=${command}`] : []),
    ...(responseCode !== undefined ? [`responseCode=${responseCode}`] : []),
  ].join(";");
}

/**
 * Har vi redan konstaterat att certifikatet är trasigt? Då hoppas det strikta
 * försöket över nästa gång – annars kostar varje mejl en extra timeout.
 * Nollställs vid omstart, så ett förnyat certifikat används direkt igen.
 */
let certKnownBroken = false;

function transport(insecure: boolean) {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    ...(insecure ? { tls: { rejectUnauthorized: false } } : {}),
  });
}

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Skickar ett mejl. Kastar aldrig – anroparen ska kunna spara sin bokning eller
 * sitt lead även när mejlet fallerar, och får utfallet tillbaka för loggning.
 */
export async function sendMail(mail: SmtpMail, tag = "mail"): Promise<SmtpResult> {
  if (!smtpConfigured()) {
    console.warn(`[${tag}] SMTP saknas – mejl skickades inte`);
    return { sent: false, error: "smtp-not-configured" };
  }

  const message = {
    from: `"${site.name}" <${process.env.SMTP_USER}>`,
    to: mail.to,
    ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    ...(mail.attachments ? { attachments: mail.attachments } : {}),
  };

  const forceStrict = process.env.SMTP_STRICT_TLS === "1";

  if (!certKnownBroken) {
    try {
      await transport(false).sendMail(message);
      return { sent: true };
    } catch (err) {
      if (forceStrict || !isCertError(err)) {
        const error = errorSummary(err);
        console.error(`[${tag}] SMTP-fel`, error);
        return { sent: false, error };
      }
      certKnownBroken = true;
      console.warn(
        `[${tag}] SMTP-certifikatet på ${process.env.SMTP_HOST} går inte att verifiera ` +
          `(${(err as { code?: string })?.code ?? "certifikatfel"}). ` +
          "Mejlet skickas ändå över krypterad anslutning, men utan äkthetskontroll. " +
          "Be webbhotellet förnya certifikatet.",
      );
    }
  }

  try {
    await transport(true).sendMail(message);
    return { sent: true, insecureTls: true };
  } catch (err) {
    const error = errorSummary(err);
    console.error(`[${tag}] SMTP-fel`, error);
    return { sent: false, error };
  }
}
