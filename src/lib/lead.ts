// Typer och konstanter för lead-formuläret. Hålls separat från actions.ts
// eftersom en "use server"-fil endast får exportera async-funktioner –
// vanliga värden (som initialLeadState) måste bo i en vanlig modul.

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  city: string;
  specialty: string;
  message: string;
  preferredDate1: string;
  preferredDate2: string;
  preferredDate3: string;
  timePreference: string;
  consent: boolean;
};

export type LeadState = {
  status: "idle" | "success" | "error";
  message: string;
  // Fältspecifika fel som visas inline i formuläret.
  errors: Record<string, string>;
  // Ökar för varje serversvar så att ett fel kan montera om formuläret
  // med de värden som servern har granskat och godkänt att skicka tillbaka.
  attempt: number;
  accepted: boolean;
  values?: LeadFormValues;
};

export const initialLeadState: LeadState = {
  status: "idle",
  message: "",
  errors: {},
  attempt: 0,
  accepted: false,
};
