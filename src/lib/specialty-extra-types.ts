// Fördjupande, unikt innehåll för utvalda specialiteter (prioriterade sidor).
// Gör de viktigaste specialitetssidorna djupare och mer auktoritativa (E-E-A-T)
// utan att tynga den gemensamma specialties.ts.

export type SpecialtyExtra = {
  /**
   * Fördjupande sektioner som visas under standardinnehållet på
   * specialitetssidan. body-strängar stöder samma säkra inline-markup som
   * artiklar: [text](/intern/sökväg) och **fet**.
   */
  sections: { id: string; heading: string; body: string[]; bullets?: string[] }[];
  /** Specialitetsspecifik FAQ (renderas + ger FAQPage-schema). */
  faqs: { question: string; answer: string }[];
  /**
   * Direktbokning hos en namngiven läkare (extern bokningsportal). Renderas som
   * en "Boka direkt"-knapp vid sidan av tidsförfrågan. url öppnas i ny flik.
   */
  bookingCta?: { label: string; url: string; note?: string };
  /**
   * Framhävd ruta nära sidans topp (t.ex. en stad med namngiven läkare + pris)
   * som för authority vidare till en money page. ctaHref är en intern sökväg.
   */
  featureBox?: { heading: string; body: string; ctaLabel: string; ctaHref: string };
};
