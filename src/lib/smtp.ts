// Gemensam mejlkanal för lead- och bokningsmejl. Körs ENDAST på servern.
//
// Sedan 2026-11-02 går ALLT genom mail-gate.mjs i projektroten (ägarregel:
// "Inget mejl skickas någonsin utan mitt tillstånd"). Grinden skickar bara de
// typer ägaren godkänt för automatiskt utskick – patientens egen bekräftelse
// (en mottagare, begärd i stunden) och notiser enbart till ägarens egna
// adresser. Allt annat, och allt utan typ, sparas i .data/held-mails.jsonl och
// väntar på godkännande (node scripts/held-mails.mjs).
//
// TLS-reglerna är oförändrade och ligger nu i grinden: full certifikatkontroll
// först; ett andra försök utan kontroll bara vid det uttryckliga, tillfälliga
// driftbeslutet SMTP_ALLOW_INSECURE_TLS=1 (och aldrig om SMTP_STRICT_TLS=1).

import {
  sendGated,
  smtpConfigured as gateSmtpConfigured,
  smtpFromEnv,
  type MailCheck,
} from "../../mail-gate.mjs";
import { site } from "./site";

export type SmtpMail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: string; contentType: string }[];
};

export type MailGateOptions = {
  /** Mejltyp enligt mail-gate.mjs. Saknas den hålls mejlet för godkännande. */
  kind?: string;
  /** Kontroller som körs igen om ett hållet mejl godkänns senare. */
  checks?: MailCheck[];
  notAfter?: number | string;
};

export type SmtpResult = {
  sent: boolean;
  /** Mejlet skickades inte utan väntar på ägarens godkännande. */
  held?: boolean;
  heldId?: string;
  error?: string;
  insecureTls?: boolean;
};

export function smtpConfigured(): boolean {
  return gateSmtpConfigured(smtpFromEnv(process.env));
}

/**
 * Skickar (eller håller) ett mejl. Kastar aldrig – anroparen ska kunna spara
 * sin bokning eller sitt lead även när mejlet inte går ut.
 */
export async function sendMail(
  mail: SmtpMail,
  tag = "mail",
  gate: MailGateOptions = {},
): Promise<SmtpResult> {
  const smtp = smtpFromEnv(process.env);
  try {
    const result = await sendGated(
      {
        ...(smtp.user ? { from: `"${site.name}" <${smtp.user}>` } : {}),
        to: mail.to,
        ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        ...(mail.attachments ? { attachments: mail.attachments } : {}),
      },
      {
        kind: gate.kind,
        checks: gate.checks,
        notAfter: gate.notAfter,
        smtp,
        root: process.cwd(),
        tag,
        source: `app:${tag}`,
      },
    );
    return {
      sent: result.sent,
      ...(result.held ? { held: true, heldId: result.id } : {}),
      ...(result.error ? { error: result.error } : {}),
      ...(result.insecureTls ? { insecureTls: true } : {}),
    };
  } catch {
    console.error(`[${tag}] oväntat fel i mejlgrinden – inget skickades`);
    return { sent: false, error: "unexpected-mail-error" };
  }
}
