import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpecialty, specialties } from "@/lib/specialties";
import { articlesForSpecialty, groupArticlesByCluster } from "@/lib/articles";
import { cities, hasCityPages } from "@/lib/cities";
import { getSpecialtyExtra } from "@/lib/specialty-extra";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { FaqList } from "@/components/FaqList";
import { Prose, renderInline } from "@/components/RichText";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, specialtyServiceSchema } from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";
import { getSpecialtyVisual, getVisualDimensions } from "@/lib/medical-visuals";

// Prerendera alla specialitetssidor vid bygget – snabbt och SEO-optimerat.
export function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

// Spärra okända slugs så bara våra sidor existerar.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialty(slug);
  if (!specialty) return {};

  const title = `${specialty.title} – hitta och boka ${specialty.name.toLowerCase()}`;
  const path = `/specialiteter/${specialty.slug}`;
  const visual = getSpecialtyVisual(specialty);
  // Kort meta-description (≤155 tecken) – specialty.intro är för lång för SERP.
  const description = `Hitta rätt ${specialty.title.toLowerCase()} i Sverige. ${specialty.short} Kostnadsfri förmedling – beskriv ditt behov.`;
  return {
    title,
    description,
    keywords: specialty.keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      images: [{ url: visual.src, alt: visual.alt, ...getVisualDimensions(visual.src) }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: visual.src, alt: visual.alt }],
    },
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = getSpecialty(slug);
  if (!specialty) notFound();

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Specialiteter", path: "/specialiteter" },
    { name: specialty.title, path: `/specialiteter/${specialty.slug}` },
  ];

  // Roterar cykliskt i stället för slice(0, 3): annars pekar VARJE hubb på samma
  // tre första specialiteter, så länkkraften samlas där och 9 av 13 hubbar får
  // noll interna länkar. Rotationen ger exakt 3 inlänkar per hubb och 0 självlänkar
  // (förutsatt att specialties har fler än 3 poster).
  const selfIndex = specialties.findIndex((s) => s.slug === specialty.slug);
  const related = [1, 2, 3].map((step) => specialties[(selfIndex + step) % specialties.length]);
  const { clusters: articleClusters, rest: otherArticles } = groupArticlesByCluster(
    articlesForSpecialty(specialty.slug),
  );
  const showCities = hasCityPages(specialty.slug);
  const extra = getSpecialtyExtra(specialty.slug);
  const visual = getSpecialtyVisual(specialty);

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">{specialty.name}</p>
            <h1 className="internal-hero-title">
              Hitta en {specialty.title.toLowerCase()}
            </h1>
          </div>
          <p className="internal-hero-text">{specialty.intro}</p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Innehåll */}
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">
              När kan en {specialty.title.toLowerCase()} hjälpa dig?
            </h2>
            <p className="mt-3">
              Det finns många anledningar att träffa en {specialty.title.toLowerCase()}. Vanliga
              exempel är:
            </p>
            <ul className="mt-4 space-y-3">
              {specialty.reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-ink-700">
                  <span
                    aria-hidden
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700"
                  >
                    ✓
                  </span>
                  {reason}
                </li>
              ))}
            </ul>

            <div className="soft-info-card mt-8 p-6">
              <h2 className="text-xl font-bold text-ink-900">Så hjälper Specialistdirekt dig</h2>
              <p className="mt-2 text-ink-600">
                Du behöver inte själv leta efter rätt mottagning. Beskriv ditt behov i formuläret,
                så matchar vi dig kostnadsfritt med en {specialty.title.toLowerCase()} som passar
                – normalt återkommer vi inom en arbetsdag.
              </p>
            </div>

            {/* Framhävd stad/läkare-ruta som för authority vidare till money page. */}
            {extra?.featureBox && (
              <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
                <h2 className="text-xl font-bold text-ink-900">{extra.featureBox.heading}</h2>
                <p className="mt-2 text-ink-700">{extra.featureBox.body}</p>
                <Link
                  href={extra.featureBox.ctaHref}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  {extra.featureBox.ctaLabel} →
                </Link>
              </div>
            )}

            {/* Fördjupning – unikt innehåll för prioriterade specialiteter. */}
            {extra?.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-10 scroll-mt-24">
                <h2 className="article-section-title text-2xl font-bold">{s.heading}</h2>
                <Prose paragraphs={s.body} />
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-ink-700">
                        <span
                          aria-hidden
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700"
                        >
                          ✓
                        </span>
                        <span>{renderInline(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="warning-card mt-8 p-5 text-sm">
              <strong>Viktigt:</strong> Specialistdirekt ger inte medicinsk rådgivning och ställer
              inga diagnoser. Vid akuta besvär – ring 112. För sjukvårdsrådgivning, ring 1177.
            </div>

            {extra && extra.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">
                  Vanliga frågor om {specialty.name.toLowerCase()}
                </h2>
                <div className="mt-6">
                  <FaqList items={extra.faqs} />
                </div>
              </section>
            )}

            {showCities && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-ink-900">
                  Hitta en {specialty.title.toLowerCase()} i din stad
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/specialiteter/${specialty.slug}/${c.slug}`}
                      className="internal-chip"
                    >
                      {specialty.title} i {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ämneskluster får en egen grupp med pelaren först. I en platt lista
                hamnade barnortopedi-pelaren mellan sina egna spokes, så varken
                läsare eller sökmotor kunde se vilken sida som var huvudresursen. */}
            {articleClusters.map((cluster) => (
              <div key={cluster.id} className="mt-10">
                <h2 className="text-xl font-bold text-ink-900">{cluster.title}</h2>
                <p className="mt-2 text-sm text-ink-600">{cluster.intro}</p>
                <Link
                  href={`/artiklar/${cluster.pillar.slug}`}
                  className="mt-4 block rounded-2xl border border-brand-200 bg-brand-50/60 p-5 transition-colors hover:border-brand-400"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    Börja här
                  </span>
                  <span className="mt-1 block font-semibold text-brand-800">
                    {cluster.pillar.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink-600">
                    {cluster.pillar.excerpt}
                  </span>
                </Link>
                {cluster.spokes.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {cluster.spokes.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/artiklar/${a.slug}`}
                          className="font-semibold text-brand-700 hover:underline"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {otherArticles.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-ink-900">
                  Läs mer om {specialty.name.toLowerCase()}
                </h2>
                <ul className="mt-4 space-y-3">
                  {otherArticles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/artiklar/${a.slug}`}
                      className="font-semibold text-brand-700 hover:underline"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-ink-900">Andra specialiteter</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/specialiteter/${r.slug}`}
                      className="internal-chip"
                    >
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Formulär (sticky på desktop) */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {extra?.bookingCta ? (
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Boka tid direkt</h2>
                <a
                  href={extra.bookingCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  {extra.bookingCta.label}
                </a>
                {extra.bookingCta.note && (
                  <p className="mt-2 text-xs text-ink-500">{extra.bookingCta.note}</p>
                )}
              </div>
            ) : (
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">
                  Skicka tidsförfrågan till {specialty.title.toLowerCase()}
                </h2>
                <p className="mt-1 text-sm text-ink-600">Kostnadsfritt och utan förpliktelser.</p>
                <div className="mt-6">
                  <LeadForm defaultSpecialty={specialty.slug} />
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          specialtyServiceSchema(specialty),
          ...(extra && extra.faqs.length > 0 ? [faqSchema(extra.faqs)] : []),
        ]}
      />
    </>
  );
}
