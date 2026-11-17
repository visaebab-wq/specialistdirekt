// Gemensamma, patientvisade uppgifter för direktbokningen.
//
// Bekräftelsesidan och bekräftelsemejlet ska alltid säga samma sak om läkare,
// besök och mottagning. Håll därför uppgifterna här i stället för att kopiera
// dem mellan vyerna.

export const BOOKING_DOCTOR = "Dr Masoud Sorkhabi";
export const BOOKING_SPECIALTY = "Specialist i ortopedi och ryggkirurgi";
export const BOOKING_CLINIC = "NoPainClinic";
export const BOOKING_CLINIC_ADDRESS = "Karl Johansgatan 100, 414 55 Göteborg";

export function bookingMapUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BOOKING_CLINIC_ADDRESS)}`;
}
