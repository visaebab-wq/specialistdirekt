// Datatyp för artiklar (kunskapsbanken /artiklar). En artikel = ett objekt
// som matchar denna typ. Innehållet skrivs som strukturerade sektioner så att
// sidan kan rendera semantisk HTML (h1/h2), innehållsförteckning och schema.

export type ArticleSection = {
  /** Ankar-id för innehållsförteckning + djuplänkning (kebab-case). */
  id: string;
  /** Sektionsrubrik (renderas som <h2>). */
  heading: string;
  /**
   * Stycken. Stöder enkel, säker inline-markup:
   *   [länktext](/intern/sökväg)  → intern länk (endast sökvägar som börjar med /)
   *   **fet text**                → <strong>
   * HTML escapas alltid först, så detta kan inte injicera skript.
   */
  body: string[];
  /** Valfri punktlista efter styckena. */
  bullets?: string[];
  /**
   * Ton på punktlistan. Standard är en positiv bock (✓) som passar råd och
   * fördelar. Sätt "warning" för röda flaggor och sök-vård-akut-listor – en
   * grön bock intill "kan inte stödja på benet" läser fel.
   */
  bulletTone?: "warning";
};

export type ArticleFaq = { question: string; answer: string };

/**
 * En källa artikeln vilar på. Visas som en "Källor"-lista sist i artikeln och
 * som `citation` i schemat.
 *
 * Två regler, båda av samma skäl – en påhittad källa är värre än ingen alls:
 *   1. Länka bara till sidor som du faktiskt öppnat och sett innehållet på.
 *   2. Bara myndighets- eller vårdgivarkällor (1177, Socialstyrelsen,
 *      Läkemedelsverket, nationella vårdprogram). Inga bloggar, inga
 *      konkurrenter, inga AI-genererade sammanfattningar.
 */
export type ArticleSource = {
  /** Sidans titel, som den står hos källan. */
  label: string;
  url: string;
  /** Utgivare, t.ex. "1177 Vårdguiden". */
  publisher: string;
};

export type Article = {
  slug: string;
  /** H1 på sidan. */
  title: string;
  /** <title>-taggen (kan vara kortare/keyword-optimerad). */
  metaTitle: string;
  metaDescription: string;
  category: string;
  /** Det primära sökordet artikeln ska ranka på (unikt per artikel). */
  primaryKeyword: string;
  keywords: string[];
  /** Kort sammanfattning för listor, OG och excerpt. */
  excerpt: string;
  /** ISO-datum (YYYY-MM-DD). */
  published: string;
  updated: string;
  readMinutes: number;
  /** Ungefärligt antal ord – används för att undvika tunt/dubbelt innehåll. */
  wordCount: number;
  /** Valfri koppling till en specialitet (slug i specialties.ts). */
  relatedSpecialty?: string;
  /**
   * Sätt false för en artikel som ännu INTE har granskats av den medicinska
   * granskaren. Då visas varken byline eller `reviewedBy` i schemat. Utelämnad
   * = granskad (gäller sajtens befintliga artiklar). Etiketten får aldrig sättas
   * innan den faktiska slutversionen är godkänd.
   */
  medicallyReviewed?: boolean;
  /**
   * Källor artikelns medicinska innehåll vilar på. Utelämnad = inga källor
   * visas (gäller t.ex. rena pris- och vägledningsartiklar som inte gör några
   * medicinska påståenden).
   */
  sources?: ArticleSource[];
  /**
   * "Snabb sammanfattning" – punktlista högst upp. Mycket viktig för att
   * AI-sökmotorer (ChatGPT, Perplexity, Google AI) lätt ska kunna citera sidan.
   */
  summary?: string[];
  /** Pristabell – rader med tjänst + ungefärligt pris. Bra för SEO och AI. */
  priceTable?: { label: string; price: string }[];
  /** "Vem passar detta för?" – punktlista (konvertering). */
  suitableFor?: string[];
  /**
   * Ersätter den generiska specialitets-CTA:n ("Behöver du en ortoped?") när
   * artikeln har en egen målgrupp eller väg vidare. Utan detta får en sida om
   * barn samma uppmaning som en sida om vuxna, vilket varken matchar läsarens
   * situation eller den faktiska mottagningens villkor.
   */
  cta?: {
    heading: string;
    body: string;
    label: string;
    href: string;
    /**
     * Valfri andrahandsväg. Används på symtomartiklarna för att leda vidare
     * till ämnesnavet utan att konkurrera med den primära bokningslänken.
     */
    secondary?: { label: string; href: string };
  };
  /** Inledande stycken (före första h2). */
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
};
