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
   * "Snabb sammanfattning" – punktlista högst upp. Mycket viktig för att
   * AI-sökmotorer (ChatGPT, Perplexity, Google AI) lätt ska kunna citera sidan.
   */
  summary?: string[];
  /** Pristabell – rader med tjänst + ungefärligt pris. Bra för SEO och AI. */
  priceTable?: { label: string; price: string }[];
  /** "Vem passar detta för?" – punktlista (konvertering). */
  suitableFor?: string[];
  /** Inledande stycken (före första h2). */
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
};
