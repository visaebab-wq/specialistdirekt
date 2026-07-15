// Datatyp för stadssidor (programmatisk lokal-SEO: specialitet × stad).
// Varje stad har UNIKT lokalt innehåll så att sidorna ger verkligt värde och
// inte blir tunna "doorway"-sidor (vilket Google straffar).

// Specialiteter som får stadssidor (de med högst lokal sökefterfrågan).
// Måste matcha slugs i specialties.ts.
export const CITY_SPECIALTY_SLUGS = [
  "kardiolog",
  "ortoped",
  "hudlakare",
  "gynekolog",
  "psykiater",
  "neurolog",
  "allmanmedicin",
  "gastroenterolog",
] as const;

/**
 * Fördjupande, unikt lokalt innehåll för en specifik stad×specialitet-sida.
 * Lyfter en prioriterad sida från "en substituerad mening ovanpå en mall" till
 * en sida med verkligt specialitets- OCH lokalanpassat djup (undviker tunna
 * doorway-sidor). Renderas av /specialiteter/[slug]/[stad] när det finns.
 * body-strängar stöder samma säkra inline-markup som artiklar:
 * [text](/intern/sökväg) och **fet**.
 */
export type CitySpecialtyLocal = {
  /** Titel-override (<title>). Sätt endast när pris, remiss och bokning verkligen tas upp. */
  metaTitle?: string;
  /** Meta-description-override. */
  metaDescription?: string;
  /** Fördjupande sektioner (renderas som <h2> + stycken/punktlista). */
  sections: { id: string; heading: string; body: string[]; bullets?: string[] }[];
  /** Lokala vanliga frågor (renderas + ger FAQPage-schema). */
  faqs?: { question: string; answer: string }[];
};

export type City = {
  /** URL-slug, t.ex. "stockholm". */
  slug: string;
  /** Visningsnamn, t.ex. "Stockholm". */
  name: string;
  /** Region/sjukvårdshuvudman, t.ex. "Region Stockholm". */
  region: string;
  /** Län, t.ex. "Stockholms län". */
  county: string;
  /** Unik lokal beskrivning av specialistvården i staden (2-4 meningar). */
  intro: string;
  /** Kända sjukhus/vårdnav i staden (för lokal trovärdighet). */
  hospitals: string[];
  /**
   * Unik introtext PER specialitet i denna stad (slug → text).
   * Detta är det som gör varje stad×specialitet-sida unik.
   */
  specialtyIntros: Record<string, string>;
  /**
   * Valfritt fördjupande lokalt innehåll PER specialitet (slug → block).
   * Sätts bara för prioriterade sidor med hög lokal sökefterfrågan.
   */
  specialtyLocal?: Record<string, CitySpecialtyLocal>;
};
