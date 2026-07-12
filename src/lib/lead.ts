// Typer och konstanter för lead-formuläret. Hålls separat från actions.ts
// eftersom en "use server"-fil endast får exportera async-funktioner –
// vanliga värden (som initialLeadState) måste bo i en vanlig modul.

export type LeadState = {
  status: "idle" | "success" | "error";
  message: string;
  // Fältspecifika fel som visas inline i formuläret.
  errors: Record<string, string>;
};

export const initialLeadState: LeadState = {
  status: "idle",
  message: "",
  errors: {},
};
