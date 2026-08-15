/**
 * Åldersspannet för barn och ungdomar som tas emot för ortopedisk bedömning hos
 * Dr. Masoud Sorkhabi i Göteborg. Uppgiften kommer från mottagningen.
 *
 * Spannet ska aldrig skrivas ut som en hårdkodad siffra i en enskild sida,
 * artikel, FAQ eller CTA. Importera härifrån i stället, så att artikeln,
 * specialitetssidan, stadssidan, formuläret och bokningsflödet inte kan glida
 * isär och börja lova olika saker.
 */
export const BARN_SCOPE = {
  floorYears: 0,
  ceilingYears: 17,
  /** Löptext: "… tar emot barn och ungdomar, nyfödda till och med 17 år." */
  label: "nyfödda till och med 17 år",
  /** Kompakt form för faktarutor, listor och etiketter. */
  short: "0–17 år",
} as const;
