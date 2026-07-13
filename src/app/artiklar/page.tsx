import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artiklar – guider om specialistvård",
  description:
    "Guider och svar om specialistvård i Sverige: kostnader, väntetider, remiss och hur du hittar rätt specialistläkare – från Specialistdirekts redaktion.",
  alternates: { canonical: "/artiklar" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Artiklar", path: "/artiklar" },
];

const MONTHS = [
  "jan", "feb", "mars", "apr", "maj", "juni",
  "juli", "aug", "sep", "okt", "nov", "dec",
];
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Artiklar & guider</h1>
          <p className="internal-hero-text">
            Tydliga guider om specialistvård i Sverige – kostnader, väntetider, remiss och hur du
            hittar rätt läkare. Skrivna för att hjälpa dig fatta trygga beslut.
          </p>
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Utvald pelarartikel */}
        <Link
          href={`/artiklar/${featured.slug}`}
          className="readable-card group block p-8 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Utvald guide · {featured.category}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-ink-900 group-hover:text-brand-700">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl text-ink-600">{featured.excerpt}</p>
          <span className="mt-4 inline-block text-sm font-medium text-brand-700">
            Läs guiden →
          </span>
        </Link>

        {/* Övriga artiklar */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/artiklar/${a.slug}`}
              className="readable-card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {a.category}
              </span>
              <h3 className="mt-2 font-semibold text-ink-900 group-hover:text-brand-700">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{a.excerpt}</p>
              <span className="mt-4 text-xs text-ink-500">
                {formatDate(a.updated)} · {a.readMinutes} min
              </span>
            </Link>
          ))}
        </div>
      </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} – Artiklar`,
            url: `${site.url}/artiklar`,
            inLanguage: site.lang,
            publisher: { "@id": `${site.url}/#organization` },
            blogPost: articles.map((a) => ({
              "@type": "BlogPosting",
              headline: a.title,
              url: `${site.url}/artiklar/${a.slug}`,
              datePublished: a.published,
              dateModified: a.updated,
            })),
          },
        ]}
      />
    </>
  );
}
