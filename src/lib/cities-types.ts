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
  /** H1-override. Standard är "{Specialitet} i {Stad}". */
  h1?: string;
  /** Dölj det generiska "Specialistvård i {stad}"-blocket (låg information gain på prioriterade sidor). */
  hideCityIntro?: boolean;
  /**
   * Skannbar "svarsruta" högst upp på sidan (label → värde). Ger både besökare
   * och AI-svarssystem de viktigaste fakta på några sekunder. Publicera bara
   * verifierade uppgifter – utelämna okända fält (visa aldrig tomma etiketter).
   */
  quickFacts?: { label: string; value: string }[];
  /**
   * Röda flaggor / akutsymtom. Renderas tydligt men icke-alarmistiskt och alltid
   * FÖRE den första innehålls-CTA:n (patientsäkerhet på YMYL-sidor).
   */
  redFlag?: { heading: string; body: string; bullets: string[]; footnote?: string };
  /** Fördjupande sektioner (renderas som <h2> + stycken/punktlista). */
  sections: { id: string; heading: string; body: string[]; bullets?: string[] }[];
  /**
   * Primär CTA-ruta i innehållsflödet. Länkar till formuläret via ankaret
   * #tidsforfragan. Använd för prioriterade konverteringssidor.
   */
  leadCta?: { heading: string; body: string; buttonLabel: string };
  /**
   * Länk till en språkversion av sidan (t.ex. en engelsk landningssida).
   * Renderas som en tydlig, manuell språkväxlare – ingen automatisk omdirigering.
   */
  altLanguage?: { href: string; label: string };
  /**
   * Direktbokning hos en namngiven läkare/mottagning (extern bokningsportal).
   * Renderas som en tydlig "Boka direkt"-knapp vid sidan av tidsförfrågan.
   * url öppnas i ny flik. note visas som liten text under knappen.
   */
  bookingCta?: { label: string; url: string; note?: string };
  /**
   * Underlag för Service-schema för ett besök med egna tider (i praktiken
   * ortoped i Göteborg). Speglar exakt det som syns på sidan. Ingen adress och
   * inga öppettider – besöksadressen är inte publicerad på sajten. Läkaren blir
   * `provider` via providerProfilePath när hans profilsida är publicerad.
   * Utan detta fält får sidan det generiska informationsschemat.
   */
  service?: {
    /** t.ex. "Privat ortopedbesök i Göteborg". */
    name: string;
    description: string;
    price?: { name: string; amount: number; currency: string };
    /** Profilsida för läkaren som utför besöket, t.ex. "/lakare/masoud-sorkhabi". */
    providerProfilePath?: string;
  };
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
