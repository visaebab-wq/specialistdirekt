// Medicinsk granskare för ortopedi-/smärtartiklar. Dr. Masoud Sorkhabi har
// granskat dessa artiklar medicinskt (bekräftat av uppdragsgivaren). Ger ett
// äkta E-E-A-T-signal: namngiven specialist som granskat YMYL-innehållet.

import type { Article } from "./articles-types";

export const DR_SORKHABI_REVIEWER = {
  name: "Dr. Masoud Sorkhabi",
  title: "Specialistläkare i ortopedi",
  url: "/lakare/masoud-sorkhabi",
};

/** Returnerar den medicinska granskaren för en artikel, eller undefined. */
export function medicalReviewerFor(article: Article) {
  return article.category === "Ortopedi" || article.category === "Smärta"
    ? DR_SORKHABI_REVIEWER
    : undefined;
}
