import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, relatedArticles } from "@/lib/articles";
import { getSpecialty } from "@/lib/specialties";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose, renderInline } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

// Formatterar ISO-datum (YYYY-MM-DD) till svenskt format utan Date-beroende.
const MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = `/artiklar/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${article.metaTitle} | ${site.name}`,
      description: article.metaDescription,
      url: path,
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Artiklar", path: "/artiklar" },
    { name: article.title, path: `/artiklar/${article.slug}` },
  ];
  const specialty = article.relatedSpecialty ? getSpecialty(article.relatedSpecialty) : undefined;
  const related = relatedArticles(article.slug, 4);

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <p className="internal-hero-kicker mt-6">{article.category}</p>
          <h1 className="internal-hero-title">{article.title}</h1>
          <p className="internal-hero-text">{article.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            <span>
              Uppdaterad <time dateTime={article.updated}>{formatDate(article.updated)}</time>
            </span>
            <span aria-hidden>·</span>
            <span>{article.readMinutes} min läsning</span>
            <span aria-hidden>·</span>
            <span>Av {site.name}s redaktion</span>
          </div>
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Snabb sammanfattning – AI-/citatvänligt block högst upp. */}
        {article.summary && article.summary.length > 0 && (
          <aside className="soft-info-card mb-8 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Snabb sammanfattning
            </h2>
            <ul className="mt-3 space-y-2">
              {article.summary.map((s, i) => (
                <li key={i} className="flex gap-2 text-ink-800">
                  <span aria-hidden className="mt-1 text-brand-600">
                    •
                  </span>
                  <span>{renderInline(s)}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Pristabell – tydlig prisöversikt (bra för SEO och AI). */}
        {article.priceTable && article.priceTable.length > 0 && (
          <div className="readable-card mb-8 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50 text-ink-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Undersökning / tjänst</th>
                  <th className="px-4 py-3 font-semibold">Ungefärlig privat kostnad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {article.priceTable.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-ink-800">{row.label}</td>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vem passar detta för? – konverteringsvänligt. */}
        {article.suitableFor && article.suitableFor.length > 0 && (
          <section className="readable-card mb-10 p-6">
            <h2 className="text-lg font-bold text-ink-900">Vem passar detta för?</h2>
            <ul className="mt-3 space-y-2">
              {article.suitableFor.map((s, i) => (
                <li key={i} className="flex gap-3 text-ink-700">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700"
                  >
                    ✓
                  </span>
                  <span>{renderInline(s)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Innehållsförteckning – hjälper läsare och kan ge sitelinks i sök. */}
        {article.sections.length > 2 && (
          <nav
            aria-label="Innehåll"
            className="soft-info-card mb-10 p-5"
          >
            <p className="text-sm font-semibold text-ink-800">Innehåll</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {article.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-brand-700 hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article className="article-body readable-card p-6 sm:p-8">
          <Prose paragraphs={article.intro} />

          {article.sections.map((section) => (
            <section key={section.id} className="mt-10 scroll-mt-24" id={section.id}>
              <h2 className="article-section-title text-2xl font-bold">{section.heading}</h2>
              <Prose paragraphs={section.body} />
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b, i) => (
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

          {/* Ansvarsfriskrivning – YMYL/E-E-A-T och förtroende. */}
          <div className="warning-card mt-10 p-5 text-sm">
            <strong>Observera:</strong> Den här artikeln är allmän information och ersätter inte
            individuell medicinsk bedömning. Vid akuta besvär – ring 112. För sjukvårdsrådgivning,
            ring 1177. Specialistdirekt är en kostnadsfri förmedlingstjänst och ger inte medicinsk
            rådgivning.
          </div>

          {/* Internlänkning: artikel → specialitet → formulär. Placeras efter artikelns
              innehåll och medicinska säkerhetsinformation (röda flaggor + 112/1177),
              så att en kommersiell CTA aldrig visas före akutvägledningen. */}
          {specialty && (
            <div className="soft-info-card mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-ink-700">
                Söker du en {specialty.title.toLowerCase()}? Vi matchar dig kostnadsfritt – läs
                mer om{" "}
                <Link
                  href={`/specialiteter/${specialty.slug}`}
                  className="font-medium text-brand-700 hover:underline"
                >
                  {specialty.name.toLowerCase()}
                </Link>{" "}
                eller skicka en förfrågan direkt.
              </p>
              <Link
                href={`/specialiteter/${specialty.slug}`}
                className="shrink-0 rounded-full bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700"
              >
                Hitta en {specialty.title.toLowerCase()}
              </Link>
            </div>
          )}
        </article>

        {/* CTA till lead-formuläret */}
        <div className="mt-10 rounded-3xl bg-navy-800 px-6 py-10 text-center text-white shadow-[0_22px_50px_rgba(15,23,42,0.16)]">
          <h2 className="text-2xl font-bold">
            {specialty
              ? `Behöver du en ${specialty.title.toLowerCase()}?`
              : "Behöver du hjälp att hitta rätt specialist?"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-50">
            Skicka en kostnadsfri förfrågan så matchar vi dig med rätt specialist.
          </p>
          <Link
            href={specialty ? `/specialiteter/${specialty.slug}` : "/kontakt"}
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-700 hover:scale-[1.02]"
          >
            {specialty ? `Hitta en ${specialty.title.toLowerCase()}` : "Skicka din förfrågan"}
          </Link>
        </div>

        {/* FAQ */}
        {article.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor</h2>
            <div className="mt-6">
              <FaqList items={article.faqs} />
            </div>
          </section>
        )}

        {/* Relaterade artiklar */}
        {related.length > 0 && (
        <section className="mt-12 border-t border-ink-200 pt-8">
            <h2 className="text-xl font-bold text-ink-900">Läs vidare</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/artiklar/${r.slug}`}
                    className="font-medium text-brand-700 hover:underline"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema(article),
          ...(article.faqs.length > 0 ? [faqSchema(article.faqs)] : []),
        ]}
      />
    </>
  );
}
