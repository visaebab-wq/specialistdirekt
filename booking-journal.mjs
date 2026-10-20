// journalctl filtrerar i journalmotorn innan data skickas till Node. Det
// undviker att en stor, långlivad unit-logg fyller maxBuffer trots att bara ett
// fåtal historiska lead-poster är relevanta. Argumenten är fasta och körs utan
// shell.
export const LEGACY_LEAD_JOURNAL_ARGS = Object.freeze([
  "-u",
  "specialistdirekt",
  "--no-pager",
  "-o",
  "short-iso",
  "--case-sensitive=true",
  String.raw`--grep=\[lead\] Ny förfrågan`,
]);

/**
 * Tolkar de äldre lead-poster som skrevs till journald innan JSONL-lagringen
 * infördes. Varje block valideras separat så att en trasig tidsstämpel eller
 * ofullständig post inte döljer senare, giltiga poster.
 *
 * @param {string} raw
 * @returns {Array<Record<string, string | string[]>>}
 */
export function parseLegacyJournalLeads(raw) {
  const blocks = [];
  let remainingContextLines = 0;
  for (const line of String(raw).split("\n")) {
    if (line.includes("[lead] Ny förfrågan")) {
      blocks.push({ at: line.split(/\s+/)[0], text: line });
      // Behåll samma tydliga kontextgräns som den äldre grep -A9-importen,
      // annars kan orelaterade loggrader blandas in i en flerradig post.
      remainingContextLines = 9;
    } else if (blocks.length && remainingContextLines > 0 && line.trim() !== "--") {
      blocks[blocks.length - 1].text += `\n${line}`;
      remainingContextLines--;
    } else if (line.trim() === "--" || remainingContextLines === 0) {
      remainingContextLines = 0;
    }
  }

  const leads = [];
  for (const { at, text: block } of blocks) {
    if (typeof at !== "string" || !Number.isFinite(Date.parse(at))) continue;
    const field = (key) =>
      (block.match(new RegExp(`${key}:\\s*'([^']*)'`)) || [])[1] || "";
    const preferredDates = (
      (block.match(/preferredDates:\s*\[([^\]]*)\]/) || [])[1] || ""
    )
      .split(",")
      .map((value) => value.trim().replace(/'/g, ""))
      .filter(Boolean);
    if (!field("name") && !field("email")) continue;

    leads.push({
      receivedAt: new Date(at).toISOString(),
      name: field("name"),
      email: field("email"),
      phone: field("phone"),
      specialty: field("specialty"),
      city: field("city"),
      message: field("message"),
      preferredDates,
      timePreference: field("timePreference"),
      källa: "journal (message avkortat till 80 tecken)",
    });
  }

  return leads;
}
