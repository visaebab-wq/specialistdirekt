// Medicinsk granskare för sajtens artiklar. Dr. Masoud Sorkhabi har granskat
// samtliga artiklar medicinskt (bekräftat av uppdragsgivaren). Ger ett äkta
// E-E-A-T-signal: namngiven specialist som granskat YMYL-innehållet.

import type { Article } from "./articles-types";

export const DR_SORKHABI_REVIEWER = {
  name: "Dr. Masoud Sorkhabi",
  title: "Specialist i ortopedi och ryggkirurgi",
  url: "/lakare/masoud-sorkhabi",
};

/**
 * Returnerar den medicinska granskaren för en artikel, eller `undefined` om
 * artikeln ännu inte är granskad (`medicallyReviewed: false`). Då utelämnas
 * både bylinen och `reviewedBy`/`lastReviewed` i schemat – vi påstår aldrig att
 * en text är granskad innan slutversionen faktiskt är godkänd.
 */
export function medicalReviewerFor(article: Article) {
  if (article.medicallyReviewed === false) return undefined;
  return DR_SORKHABI_REVIEWER;
}
