// Klick-spårning för direktbokning. Loggar varje klick server-side (durabelt,
// funkar även med adblock) och skickar sedan vidare till bokningskalendern.
// Så kan vi räkna HUR MÅNGA som går från sajten till bokningen.
// (Själva den slutförda bokningen sker hos patient.nu – den statistiken finns där.)

import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const TARGET = "https://patient.nu/portal/calendar/2f36b293-a438-4f6d-ad10-1bc749b788fa";

// Route-handler måste köras per anrop (aldrig cachas).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const file = join(process.cwd(), ".data", "booking-clicks.jsonl");
    mkdirSync(dirname(file), { recursive: true });
    const ua = req.headers.get("user-agent") || "";
    const isBot = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview/i.test(ua);
    appendFileSync(
      file,
      JSON.stringify({
        at: new Date().toISOString(),
        target: "ortoped-goteborg",
        ref: req.headers.get("referer") || "",
        bot: isBot,
        ua: ua.slice(0, 160),
      }) + "\n",
    );
  } catch {
    // Spårning får aldrig blockera själva bokningen.
  }
  return NextResponse.redirect(TARGET, 302);
}
