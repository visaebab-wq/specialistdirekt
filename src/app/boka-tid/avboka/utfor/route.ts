import { NextResponse, type NextRequest } from "next/server";
import { sendOwnerCancelled } from "@/lib/booking-email";
import { cancelBooking, verifySignature } from "@/lib/booking-store";
import { site } from "@/lib/site";

function destination(path: string): URL {
  return new URL(path, site.url);
}

// En vanlig, stabil POST-endpoint används i stället för en genererad Server
// Action. Då fortsätter en redan öppnad avbokningssida att fungera även om en
// ny version av sajten hinner driftsättas innan patienten trycker på knappen.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const id = String(form.get("id") || "").trim().slice(0, 80);
  const sig = String(form.get("sig") || "").trim().slice(0, 80);

  if (!id || !sig || !verifySignature(id, sig)) {
    return NextResponse.redirect(destination("/boka-tid/avboka?fel=lank"), 303);
  }

  const result = cancelBooking(id);
  if (!result.ok) {
    if (result.reason !== "unknown") {
      const detailsUrl = destination("/boka-tid/avboka");
      detailsUrl.searchParams.set("id", id);
      detailsUrl.searchParams.set("sig", sig);
      if (result.reason === "unavailable") detailsUrl.searchParams.set("fel", "tekniskt");
      return NextResponse.redirect(detailsUrl, 303);
    }
    return NextResponse.redirect(destination("/boka-tid/avboka?fel=lank"), 303);
  }

  if (!result.already) {
    await sendOwnerCancelled(result.record, result.free).catch((error) =>
      console.error("[booking] Kunde inte skicka avbokningsnotis", error),
    );
  }

  const successUrl = destination("/boka-tid/avboka");
  successUrl.searchParams.set("id", id);
  successUrl.searchParams.set("sig", sig);
  return NextResponse.redirect(successUrl, 303);
}
