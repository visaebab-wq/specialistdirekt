// Medicinsk granskare för sajtens artiklar. Dr. Masoud Sorkhabi har granskat
// samtliga artiklar medicinskt (bekräftat av uppdragsgivaren). Ger en äkta
// E-E-A-T-signal: namngiven läkare som granskat YMYL-innehållet.

import type { Article } from "./articles-types";

/**
 * Läkarens kliniska identitet – används där sajten presenterar honom som
 * behandlande läkare (t.ex. bokningssidorna). Här står specialiteten, eftersom
 * det är den som säger något om vad han faktiskt bedömer.
 */
export const DR_SORKHABI_REVIEWER = {
  name: "Dr. Masoud Sorkhabi",
  title: "Specialist i ortopedi och ryggkirurgi",
  url: "/lakare/masoud-sorkhabi",
};

/**
 * Bylinen under artiklarna – och ENBART där. Uppdragsgivaren har bestämt
 * formen: för- och efternamn utan "Dr.", och titeln Överläkare.
 *
 * Titeln är ett faktapåstående om en namngiven person i YMYL-innehåll. Ändra
 * den aldrig på eget bevåg och skriv aldrig in en titel som inte är bekräftad
 * av uppdragsgivaren – sajten har haft en påhittad titel förut.
 */
export const ARTICLE_REVIEWER = {
  name: "Masoud Sorkhabi",
  title: "Överläkare",
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
  return ARTICLE_REVIEWER;
}
