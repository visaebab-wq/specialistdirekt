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
   * Rubrik för snabbfakta-rutan. Standard är "{Specialitet} i {Stad} – snabbfakta".
   */
  quickFactsHeading?: string;
  /**
   * Panel HÖGST UPP i hero, före sidans bild. På en kommersiell landningssida
   * måste pris, plats, utbud och bokningsväg gå att läsa av direkt – snabbfakta
   * ligger först i artikelspalten och hamnar därmed under bilden.
   *
   * Publicera ENDAST bekräftade uppgifter. Ett pris här är ett löfte.
   */
  hero?: {
    /** Prisuppgift som ska synas direkt (t.ex. "Kardiologbesök" / "2 500 kr"). */
    price?: { label: string; value: string; note?: string };
    /** Kort utbudslista – vad som faktiskt går att göra på orten. */
    highlights?: string[];
    /** Primär CTA. href är ett ankare på sidan (t.ex. #tidsforfragan) eller en intern sökväg. */
    cta?: { label: string; href: string; note?: string };
  };
  /**
   * Skannbar "svarsruta" högst upp på sidan (label → värde). Ger både besökare
   * och AI-svarssystem de viktigaste fakta på några sekunder. Publicera bara
   * verifierade uppgifter – utelämna okända fält (visa aldrig tomma etiketter).
   */
  quickFacts?: { label: string; value: string }[];
  /**
   * CTA direkt under snabbfakta. Den som redan fått pris, plats och utbud
   * bekräftat i rutan ska kunna gå vidare där – inte leta vidare nedåt. Mellan
   * hero-CTA:n och den här ligger sidans bild, så de krockar inte.
   */
  quickFactsCta?: { label: string; href: string; note?: string };
  /**
   * Röda flaggor / akutsymtom. Renderas tydligt men icke-alarmistiskt och alltid
   * FÖRE den första innehålls-CTA:n (patientsäkerhet på YMYL-sidor).
   */
  redFlag?: { heading: string; body: string; bullets: string[]; footnote?: string };
  /**
   * Fördjupande sektioner (renderas som <h2> + stycken/punktlista).
   *
   * subsections blir <h3> under sektionens <h2> – använd för utbud där varje
   * undersökning behöver en egen, adresserbar rubrik.
   * table renderas som en riktig <table> (t.ex. utbud eller prisrader). Skriv
   * aldrig in ett pris som inte är bekräftat; använd en neutral rad i stället.
   * cta lägger en knapp sist i sektionen (t.ex. efter pris).
   */
  sections: {
    id: string;
    heading: string;
    body: string[];
    bullets?: string[];
    subsections?: { id: string; heading: string; body: string[]; bullets?: string[] }[];
    table?: { caption?: string; columns: string[]; rows: string[][]; note?: string };
    cta?: { label: string; href: string; note?: string };
  }[];
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
   * Underlag för Service-schema. Sätts bara när utbudet på orten är bekräftat
   * och speglar exakt det som syns på sidan. Ingen adress och inga öppettider.
   * Läkaren blir `provider` via providerProfilePath (vår egen läkare); annars
   * står Specialistdirekt som `broker` för den icke namngivna mottagningen.
   * Utan detta fält får sidan det generiska informationsschemat.
   */
  service?: {
    /** t.ex. "Privat ortopedbesök i Göteborg". */
    name: string;
    description: string;
    price?: { name: string; amount: number; currency: string };
    /** Undersökningar som finns på orten (namn utan pris). */
    examinations?: string[];
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
  /**
   * Vilka specialiteter som publiceras för DEN HÄR staden (delmängd av
   * CITY_SPECIALTY_SLUGS). Utelämnat = alla, vilket gäller städerna som fanns
   * innan fältet infördes.
   *
   * Finns för att en ny stad inte ska dra med sig sju tunna mallsidor bara för
   * att en av kombinationerna är värd att publicera. Listan styr generering,
   * sitemap OCH internlänkning – annars länkar sajten till sidor som 404:ar.
   */
  specialties?: readonly string[];
};
