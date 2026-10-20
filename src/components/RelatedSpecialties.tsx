import Link from "next/link";
import type { Article } from "@/lib/articles-types";
import { articlesForSpecialty } from "@/lib/articles";
import { specialties } from "@/lib/specialties";

/**
 * Crawlbara länkar till de specialiteter som artikeln redan är kopplad till i
 * datan (ARTICLE_EXTRA_SPECIALTIES), men som inte redan länkas i brödtexten.
 *
 * Relationen läses via articlesForSpecialty() – ingen slug- eller parlista är
 * hårdkodad här. Tre uteslutningar:
 *   1. artikelns egen relatedSpecialty (den ägs av soft-info-card),
 *   2. specialiteter vars hubb redan länkas i artikelns strukturerade innehåll,
 *   3. allt annat än de specialiteter som har en hubbrutt.
 *
 * Blocket innehåller ingen CTA och ingen egen brödtext: enbart rubriken och
 * specialitetsnamnen ur datan.
 */

/** Exakt hubbsökväg i artikelns renderade fält. /specialiteter/x/y räknas inte. */
function linksToHub(article: Article, slug: string): boolean {
  const content = JSON.stringify([
    article.intro,
    article.summary,
    article.suitableFor,
    article.sections,
    article.faqs,
  ]);
  return new RegExp(`/specialiteter/${slug}(?![a-z0-9/-])`).test(content);
}

export function relatedSpecialtiesFor(article: Article) {
  return specialties.filter(
    (s) =>
      s.slug !== article.relatedSpecialty &&
      articlesForSpecialty(s.slug).some((a) => a.slug === article.slug) &&
      !linksToHub(article, s.slug),
  );
}

export function RelatedSpecialties({ article }: { article: Article }) {
  const items = relatedSpecialtiesFor(article);
  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-ink-200 pt-8">
      <h2 className="text-xl font-bold text-ink-900">Relaterade specialiteter</h2>
      <ul className="mt-4 space-y-3">
        {items.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/specialiteter/${s.slug}`}
              className="font-medium text-brand-700 hover:underline"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
