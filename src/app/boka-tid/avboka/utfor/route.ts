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
  const freeAtConfirmation = form.get("free");

  if (!id || !sig || !verifySignature(id, sig)) {
    return NextResponse.redirect(destination("/boka-tid/avboka?fel=lank"), 303);
  }

  // En äldre eller manipulerad formulärversion saknar ett entydigt besked om
  // vilka villkor patienten såg. Avboka inte förrän den aktuella sidan har
  // visats och bekräftats.
  if (freeAtConfirmation !== "0" && freeAtConfirmation !== "1") {
    const detailsUrl = destination("/boka-tid/avboka");
    detailsUrl.searchParams.set("id", id);
    detailsUrl.searchParams.set("sig", sig);
    detailsUrl.searchParams.set("fel", "villkor");
    return NextResponse.redirect(detailsUrl, 303);
  }

  const result = cancelBooking(id, { expectedFree: freeAtConfirmation === "1" });
  if (!result.ok) {
    if (result.reason !== "unknown") {
      const detailsUrl = destination("/boka-tid/avboka");
      detailsUrl.searchParams.set("id", id);
      detailsUrl.searchParams.set("sig", sig);
      if (result.reason === "unavailable") detailsUrl.searchParams.set("fel", "tekniskt");
      if (result.reason === "terms-changed") detailsUrl.searchParams.set("fel", "villkor");
      return NextResponse.redirect(detailsUrl, 303);
    }
    return NextResponse.redirect(destination("/boka-tid/avboka?fel=lank"), 303);
  }

  if (!result.already) {
    try {
      const notice = await sendOwnerCancelled(result.record, result.free);
      if (!notice.sent) {
        console.error("[booking] Kunde inte skicka avbokningsnotis", {
          code: notice.error ?? "unknown",
        });
      }
    } catch {
      // Avbokningen är redan beständig; ett fel i mejlmall eller formattering
      // får inte hindra omdirigeringen till den uppdaterade detaljvyn.
      console.error("[booking] Kunde inte skicka avbokningsnotis", {
        code: "unexpected-mail-error",
      });
    }
  }

  const successUrl = destination("/boka-tid/avboka");
  successUrl.searchParams.set("id", id);
  successUrl.searchParams.set("sig", sig);
  return NextResponse.redirect(successUrl, 303);
}
