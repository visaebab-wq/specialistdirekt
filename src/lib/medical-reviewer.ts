// Medicinsk granskare för sajtens artiklar. Dr. Masoud Sorkhabi har granskat
// samtliga artiklar medicinskt (bekräftat av uppdragsgivaren). Ger ett äkta
// E-E-A-T-signal: namngiven specialist som granskat YMYL-innehållet.

import type { Article } from "./articles-types";

export const DR_SORKHABI_REVIEWER = {
  name: "Dr. Masoud Sorkhabi",
  title: "Specialist i ortopedi och ryggkirurgi",
  url: "/lakare/masoud-sorkhabi",
};

/** Returnerar den medicinska granskaren för en artikel. Samtliga artiklar är
 *  granskade av Dr. Masoud Sorkhabi. */
export function medicalReviewerFor(_article: Article) {
  return DR_SORKHABI_REVIEWER;
}
