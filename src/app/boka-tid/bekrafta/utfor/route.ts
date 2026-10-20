import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "node:crypto";
import { sendOwnerVerified } from "@/lib/booking-email";
import { verifyBooking, verifySignature } from "@/lib/booking-store";

function destination(request: NextRequest, path: string): URL {
  return new URL(path, request.nextUrl.origin);
}

// En bokning får aldrig bekräftas av GET. Mejlklienter och säkerhetsskannrar
// öppnar ofta länkar automatiskt; bara patientens uttryckliga POST ska ändra
// bokningens status.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const id = String(form.get("id") || "").trim().slice(0, 80);
  const sig = String(form.get("sig") || "").trim().slice(0, 80);

  if (!id || !sig || !verifySignature(id, sig)) {
    return NextResponse.redirect(destination(request, "/boka-tid/bekrafta?fel=lank"), 303);
  }

  const result = verifyBooking(id);
  if (!result.ok) {
    if (result.reason === "unavailable") {
      const detailsUrl = destination(request, "/boka-tid/bekrafta");
      detailsUrl.searchParams.set("id", id);
      detailsUrl.searchParams.set("sig", sig);
      detailsUrl.searchParams.set("fel", "tekniskt");
      return NextResponse.redirect(detailsUrl, 303);
    }
    if (result.reason === "expired" || result.reason === "invalid-slot") {
      const detailsUrl = destination(request, "/boka-tid/bekrafta");
      detailsUrl.searchParams.set("id", id);
      detailsUrl.searchParams.set("sig", sig);
      return NextResponse.redirect(detailsUrl, 303);
    }
    return NextResponse.redirect(destination(request, "/boka-tid/bekrafta?fel=lank"), 303);
  }

  if (!result.already) {
    await sendOwnerVerified(result.record, result.conflict).catch((error) =>
      console.error("[booking] Kunde inte skicka bekräftelsenotis", error),
    );
  }

  // En redan bekräftad bokning går tillbaka till detaljvyn. Ingen ny
  // konvertering ska registreras för en upprepad POST.
  if (result.already) {
    const detailsUrl = destination(request, "/boka-tid/bekrafta");
    detailsUrl.searchParams.set("id", id);
    detailsUrl.searchParams.set("sig", sig);
    return NextResponse.redirect(detailsUrl, 303);
  }

  // Efter en verklig statusövergång går besökaren till en tokenfri sida. Där
  // kan analytics laddas utan att bokningsnyckeln riskerar att följa med i ett
  // page_view. Den kortlivade HttpOnly-cookien gör att ett godtyckligt GET-anrop
  // till successidan inte räknas som en bekräftad bokning. Ett slumpat id
  // binder dessutom just den här övergången till cookien och används för
  // deduplicering i webbläsaren och annonsmätningen.
  const eventId = randomBytes(16).toString("hex");
  const status = result.conflict ? "conflict" : "confirmed";
  const successUrl = destination(request, "/boka-tid/bekraftad");
  successUrl.searchParams.set("event", eventId);
  const response = NextResponse.redirect(successUrl, 303);
  response.cookies.set({
    name: "sd-booking-confirmed",
    value: `${status}:${eventId}`,
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/boka-tid/bekraftad",
    maxAge: 120,
  });
  return response;
}
