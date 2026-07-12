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
  const title = local?.metaTitle ?? `${specialty.title} i ${city.name} – hitta och boka`;
  const path = `/specialiteter/${slug}/${stad}`;
  const description =
    local?.metaDescription ??
    `Hitta en ${specialty.title.toLowerCase()} i ${city.name}. Vi matchar dig kostnadsfritt med rätt specialist inom ${specialty.name.toLowerCase()} i ${city.region}.`;
  return {
    title,
    description,
    keywords: [
      `${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      `privat ${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      ...specialty.keywords.map((k) => `${k} ${city.name.toLowerCase()}`),
    ],
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, type: "article" },
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

  return (
    <>
      <div className="bg-section">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {specialty.name} · {city.region}
            </p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-ink-900">
              {specialty.title} i {city.name}
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{pairIntro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <article>
            <h2 className="text-2xl font-bold text-ink-900">
              Specialistvård i {city.name}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">{city.intro}</p>
            {city.hospitals.length > 0 && (
              <p className="mt-3 text-ink-700">
                <strong>Vårdnav i området:</strong> {city.hospitals.join(", ")}.
              </p>
            )}

            <h2 className="mt-8 text-2xl font-bold text-ink-900">
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
                <h2 className="text-2xl font-bold text-ink-900">{s.heading}</h2>
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

            <div className="mt-8 rounded-2xl border border-ink-200 bg-ink-50 p-6">
              <h2 className="text-xl font-bold text-ink-900">
                Så hittar du en {specialty.title.toLowerCase()} i {city.name}
              </h2>
              <p className="mt-2 text-ink-600">
                Beskriv ditt behov i formuläret, så matchar vi dig kostnadsfritt med en{" "}
                {specialty.title.toLowerCase()} i {city.name} eller {city.region}. Läs mer på vår
                översikt om{" "}
                <Link
                  href={`/specialiteter/${specialty.slug}`}
                  className="font-medium text-brand-700 hover:underline"
                >
                  {specialty.name.toLowerCase()}
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 text-sm text-amber-900">
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
                    className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
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
                    className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
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
                        className="font-medium text-brand-700 hover:underline"
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
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-lg">
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

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...(local?.faqs && local.faqs.length > 0 ? [faqSchema(local.faqs)] : []),
        ]}
      />
    </>
  );
}
