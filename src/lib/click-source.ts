/**
 * Lägger till intern källa på en länk som går till en server-loggad bokningsrutt.
 *
 * Varför inte Referer-headern: den sätts av klienten och uteblir helt normalt
 * vid direktnavigering, bokmärken, vissa in-app-webbläsare och
 * integritetstillägg. I historiken saknades den i 61 % av de mänskliga
 * bokningsklicken, och webbläsarfördelningen motsvarade INTE hypotesen om
 * integritetsbrowsers (Chrome/Windows var största gruppen utan referer).
 * CTA:n vet däremot alltid var den själv sitter, så källan skickas explicit.
 *
 * Endast `/boka/`-rutter berörs; övriga länkar returneras oförändrade.
 * Inga uppgifter om besökaren följer med – bara sidans sökväg och ett CTA-id.
 */
export function withClickSource(
  href: string,
  pathname: string | null,
  cta?: string | number,
): string {
  if (!href.startsWith("/boka/")) return href;
  const [path, existingQuery] = href.split("?");
  const q = new URLSearchParams(existingQuery);
  if (pathname && !q.has("src")) q.set("src", pathname);
  if (cta !== undefined && !q.has("cta")) q.set("cta", String(cta));
  const query = q.toString();
  return query ? `${path}?${query}` : path;
}
