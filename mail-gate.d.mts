// Typer för mail-gate.mjs (används av src/lib/*.ts).

export type MailAttachment = { filename: string; content: string | Buffer; contentType?: string };

export type GateMessage = {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: MailAttachment[];
};

export type SmtpSettings = {
  host: string;
  port: number;
  user: string;
  pass: string;
  allowInsecureTls: boolean;
};

export type MailCheck =
  | { type: "notAfter"; at: string }
  | {
      type: "booking";
      bookingId: string;
      file: string;
      status: string;
      slot: string;
      createdAt?: string;
      email?: string;
      ttlMs?: number;
      marginMs?: number;
    };

export type GateOptions = {
  kind?: string;
  checks?: MailCheck[];
  notAfter?: number | string;
  smtp?: SmtpSettings;
  root?: string;
  env?: Record<string, string | undefined> | ((key: string) => string | undefined);
  storeFile?: string;
  tag?: string;
  source?: string;
};

export type GateResult = {
  sent: boolean;
  held: boolean;
  id?: string;
  error?: string;
  insecureTls?: boolean;
  sink?: boolean;
};

export const OWNER_ADDRESSES: readonly string[];
export const OWNER_ALERT_TO: string;
export const AUTO_KINDS: Readonly<Record<string, "requested" | "owner">>;
export const HELD_KINDS: readonly string[];

export function smtpFromEnv(
  source?: Record<string, string | undefined> | ((key: string) => string | undefined),
): SmtpSettings;
export function smtpConfigured(smtp: SmtpSettings | undefined): boolean;
export function heldStoreFile(options?: GateOptions): string;
export function sendGated(message: GateMessage, options?: GateOptions): Promise<GateResult>;
export function bookingCheck(
  rec: { id: string; status?: string; slot: string; createdAt?: string; email?: string },
  file: string,
  extra?: Partial<MailCheck>,
): MailCheck;
