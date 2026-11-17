// Kortlivad, signerad kvittens för sidan som visas direkt efter en bokning.
// Körs ENDAST på servern.
//
// Boknings-id eller signatur läggs inte i adressfältet. I stället sparas de i
// en HttpOnly-cookie som bara skickas till bekräftelsesidan. Sidan verifierar
// signaturen och läser sedan tillbaka en minimal, visningssäker DTO.

import { cookies } from "next/headers";
import type { BookingRecord, BookingStatus } from "./booking-store";
import {
  bookingFreeCancelHours,
  bookingPriceSek,
  findBooking,
  signBookingId,
  verifySignature,
} from "./booking-store";

const BOOKING_RECEIPT_COOKIE = "sd-booking-receipt";
const BOOKING_RECEIPT_MAX_AGE_SECONDS = 60 * 60;

export type BookingReceipt = {
  id: string;
  signature: string;
  slot: string;
  status: BookingStatus;
  bookingType: "adult" | "child";
  priceSek: number;
  freeCancelHours: number;
  confirmationEmailSent: boolean;
};

export async function writeBookingReceipt(
  rec: BookingRecord,
  confirmationEmailSent: boolean,
): Promise<void> {
  const signature = signBookingId(rec.id);
  const mailStatus = confirmationEmailSent ? "sent" : "failed";
  (await cookies()).set(BOOKING_RECEIPT_COOKIE, `${rec.id}.${signature}.${mailStatus}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/boka-tid/bokad",
    maxAge: BOOKING_RECEIPT_MAX_AGE_SECONDS,
    priority: "high",
  });
}

export async function readBookingReceipt(): Promise<BookingReceipt | undefined> {
  const raw = (await cookies()).get(BOOKING_RECEIPT_COOKIE)?.value;
  if (!raw || raw.length > 160) return undefined;

  const parts = raw.split(".");
  if (parts.length !== 3) return undefined;
  const [id, signature, mailStatus] = parts;
  if (
    !/^[a-f0-9-]{36}$/.test(id) ||
    !/^[a-f0-9]{32}$/.test(signature) ||
    (mailStatus !== "sent" && mailStatus !== "failed") ||
    !verifySignature(id, signature)
  ) {
    return undefined;
  }

  const rec = findBooking(id);
  if (!rec) return undefined;

  return {
    id: rec.id,
    signature,
    slot: rec.slot,
    status: rec.status,
    bookingType: rec.bookingType === "child" ? "child" : "adult",
    priceSek: bookingPriceSek(rec),
    freeCancelHours: bookingFreeCancelHours(rec),
    confirmationEmailSent: mailStatus === "sent",
  };
}
