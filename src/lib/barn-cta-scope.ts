/**
 * Explicit allowlist över de artiklar som ska visa den barnspecifika
 * bokningsmodulen i stället för mallens generiska ortoped-CTA.
 *
 * MEDVETET EN HÅRDKODAD LISTA, inte en substrängmatchning på "barn": ett filter
 * på ordet barn fångar även artiklar som inte handlar om barnortopedi (t.ex.
 * barnmorska eller barn som bisats i en vuxenartikel), och skulle dessutom börja
 * gälla nya artiklar automatiskt utan att någon granskat om mottagningen kan ta
 * emot just den patientgruppen.
 *
 * Lägg till en slug här först när artikeln faktiskt handlar om ortopediska
 * besvär hos barn OCH barnbokningen är rätt väg vidare för den läsaren.
 */

/** Navet – äger den nationella barnortopedi-intentionen. */
export const BARN_NAV_SLUG = "barnortopedi";

/** Symtomartiklar som routar barn vidare till barnbokningen. */
export const BARN_SYMPTOM_SLUGS = [
  "barn-haltar",
  "ont-i-knat-barn",
  "ont-i-hoften-hos-barn",
  "plattfot-hos-barn",
  "ryggont-hos-barn",
  "vaxtvark-hos-barn",
  "ont-i-halen-hos-barn",
  "skolios-hos-barn",
] as const;

const ALL = new Set<string>([BARN_NAV_SLUG, ...BARN_SYMPTOM_SLUGS]);

/** Är artikeln en barnartikel som ska ha barnroutning? */
export function isBarnArticle(slug: string): boolean {
  return ALL.has(slug);
}
