import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpecialty } from "@/lib/specialties";
import { cities, getCity, hasCityPages, CITY_SPECIALTY_SLUGS } from "@/lib/cities";
import { articlesForSpecialty } from "@/lib/articles";
import { specialties } from "@/lib/specialties";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose, renderInline } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";
import { getCitySpecialtyVisual, getVisualDimensions } from "@/lib/medical-visuals";

// Prerendera alla giltiga stad × specialitet-kombinationer vid bygget.
export function generateStaticParams() {
  const params: { slug: string; stad: string }[] = [];
  for (const slug of CITY_SPECIALTY_SLUGS) {
    for (const c of cities) {
      params.push({ slug, stad: c.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; stad: string }>;
}): Promise<Metadata> {
  const { slug, stad } = await params;
  const specialty = getSpecialty(slug);
  const city = getCity(stad);
  if (!specialty || !city || !hasCityPages(slug)) return {};

  const local = city.specialtyLocal?.[slug];
  // Fallback-titeln säger "Privat" eftersom sidan riktar sig mot privatvård och
  // redan bygger sökordet "privat <specialitet> <stad>" nedan. Lova inget sidan
  // inte håller (t.ex. pris eller remiss) – då skriver Google om titeln ändå.
  const title = local?.metaTitle ?? `Privat ${specialty.title.toLowerCase()} i ${city.name} – hitta och boka`;
  const path = `/specialiteter/${slug}/${stad}`;
  const visual = getCitySpecialtyVisual(specialty, city.slug, city.name);
  const description =
    local?.metaDescription ??
    `Privat ${specialty.title.toLowerCase()} i ${city.name}. Vi matchar dig kostnadsfritt med rätt specialist inom ${specialty.name.toLowerCase()} i ${city.region}.`;
  return {
    title,
    description,
    keywords: [
      `${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      `privat ${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      ...specialty.keywords.map((k) => `${k} ${city.name.toLowerCase()}`),
    ],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
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

export default async function CitySpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string; stad: string }>;
}) {
  const { slug, stad } = await params;
  const specialty = getSpecialty(slug);
  const city = getCity(stad);
  if (!specialty || !city || !hasCityPages(slug)) notFound();

  const pairIntro =
    city.specialtyIntros[slug] ??
    `Söker du en ${specialty.title.toLowerCase()} i ${city.name}? Vi hjälper dig hitta rätt specialist inom ${specialty.name.toLowerCase()}.`;

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Specialiteter", path: "/specialiteter" },
    { name: specialty.title, path: `/specialiteter/${specialty.slug}` },
    { name: city.name, path: `/specialiteter/${specialty.slug}/${city.slug}` },
  ];

  const local = city.specialtyLocal?.[slug];
  const otherCities = cities.filter((c) => c.slug !== city.slug);
  const otherSpecialties = specialties.filter(
    (s) => s.slug !== specialty.slug && hasCityPages(s.slug),
  );
  const relatedArticles = articlesForSpecialty(specialty.slug);
  const visual = getCitySpecialtyVisual(specialty, city.slug, city.name);

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">
              {specialty.name} · {city.region}
            </p>
            <h1 className="internal-hero-title">
              {specialty.title} i {city.name}
            </h1>
          </div>
          <p className="internal-hero-text">{pairIntro}</p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">
              Specialistvård i {city.name}
            </h2>
            <p className="mt-3">{city.intro}</p>
            {city.hospitals.length > 0 && (
              <p className="mt-3">
                <strong>Vårdnav i området:</strong> {city.hospitals.join(", ")}.
              </p>
            )}

            <h2 className="article-section-title mt-8 text-2xl font-bold">
              När bör du träffa en {specialty.title.toLowerCase()}?
            </h2>
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

            {/* Fördjupande, unikt lokalt innehåll för prioriterade sidor. */}
            {local?.sections.map((s) => (
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

            {local && local.faqs && local.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">
                  Vanliga frågor om {specialty.title.toLowerCase()} i {city.name}
                </h2>
                <div className="mt-6">
                  <FaqList items={local.faqs} />
                </div>
              </section>
            )}

            <div className="soft-info-card mt-8 p-6">
              <h2 className="text-xl font-bold text-ink-900">
                Så hittar du en {specialty.title.toLowerCase()} i {city.name}
              </h2>
              <p className="mt-2 text-ink-600">
                Beskriv ditt behov i formuläret, så matchar vi dig kostnadsfritt med en{" "}
                {specialty.title.toLowerCase()} i {city.name} eller {city.region}. Läs mer på vår
                översikt om{" "}
                <Link
                  href={`/specialiteter/${specialty.slug}`}
                    className="font-semibold text-brand-700 hover:underline"
                >
                  {specialty.name.toLowerCase()}
                </Link>
                .
              </p>
            </div>

            <div className="warning-card mt-8 p-5 text-sm">
              <strong>Viktigt:</strong> Specialistdirekt ger inte medicinsk rådgivning. Vid akuta
              besvär – ring 112. För sjukvårdsrådgivning, ring 1177.
            </div>

            {/* Lokal internlänkning: samma specialitet i andra städer */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-ink-900">
                {specialty.title} i andra städer
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherCities.map((c) => (
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

            {/* Andra specialiteter i samma stad */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-ink-900">
                Andra specialister i {city.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherSpecialties.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/specialiteter/${s.slug}/${city.slug}`}
                    className="internal-chip"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-ink-900">Läs mer</h2>
                <ul className="mt-4 space-y-3">
                  {relatedArticles.map((a) => (
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
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="form-panel p-6">
              <h2 className="text-lg font-bold text-ink-900">
                Hitta en {specialty.title.toLowerCase()} i {city.name}
              </h2>
              <p className="mt-1 text-sm text-ink-600">Kostnadsfritt och utan förpliktelser.</p>
              <div className="mt-6">
                <LeadForm defaultSpecialty={specialty.slug} />
              </div>
            </div>
          </aside>
        </div>
      </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...(local?.faqs && local.faqs.length > 0 ? [faqSchema(local.faqs)] : []),
        ]}
      />
    </>
  );
}
