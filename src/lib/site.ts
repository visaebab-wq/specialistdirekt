// Central platsen för all varumärkes- och kontaktinformation.
// Ändra här så uppdateras hela sajten (header, footer, SEO, structured data).

export const site = {
  name: "Specialistdirekt",
  // Verifierat registrerat firmanamn och organisationsnummer (Bolagsverket).
  // "Specialistdirekt" är varumärket/tjänsten; ViSaeb AB är den juridiska person
  // som driver tjänsten och är personuppgiftsansvarig.
  legalName: "ViSaeb AB",
  orgNumber: "559403-7375",
  // Kanonisk domän (www omdirigeras till apex i nginx).
  url: "https://specialistdirekt.se",
  locale: "sv_SE",
  lang: "sv",
  country: "SE",
  tagline: "Hitta rätt specialistläkare – snabbt och tryggt",
  description:
    "Specialistdirekt hjälper dig hitta rätt specialistläkare i Sverige. Beskriv ditt behov så matchar vi dig kostnadsfritt med en passande specialist.",
  // Kontakt. Vi publicerar tills vidare ENDAST en verifierad e-postadress på egen
  // domän. Telefonnummer och fysisk adress publiceras medvetet inte – varken som
  // synlig text, tel:-länk eller i strukturerad data. Lägg INTE tillbaka phone/
  // address här utan verifierade företagsuppgifter (se kontakt-/integritetspolicy).
  email: "kontakt@specialistdirekt.se",
  // Sociala profiler lämnas tomma tills riktiga URL:er finns – tomt döljs överallt.
  // Lägg till fullständiga profil-URL:er när de finns, t.ex.
  // "https://www.linkedin.com/company/specialistdirekt".
  social: [] as string[],
  // Används i strukturerad data och “Om oss”.
  foundingYear: 2026,
  // Google Analytics 4 (mätnings-ID). Tomt = av.
  gaMeasurementId: "G-NWLDYNC1TK",
};

export type Site = typeof site;

// Huvudnavigering – återanvänds i header, footer och sitemap.
export const mainNav = [
  { href: "/sa-fungerar-det", label: "Så fungerar det" },
  { href: "/specialiteter", label: "Specialiteter" },
  { href: "/artiklar", label: "Artiklar" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/vanliga-fragor", label: "Vanliga frågor" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
