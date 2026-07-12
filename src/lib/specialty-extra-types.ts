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
};
