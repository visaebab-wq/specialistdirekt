import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withClickSource } from "@/lib/click-source";
import { getSpecialty } from "@/lib/specialties";
import {
  cities,
  getCity,
  publishesPair,
  citiesForSpecialty,
  specialtySlugsForCity,
  CITY_SPECIALTY_SLUGS,
} from "@/lib/cities";
import { articlesForSpecialty } from "@/lib/articles";
import { specialties } from "@/lib/specialties";
import { site } from "@/lib/site";
import { BookingCtaBanner } from "@/components/BookingCtaBanner";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose, renderInline } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
  citySpecialtyServiceSchema,
  localServiceSchema,
} from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";
import { TrackedCta } from "@/components/TrackedCta";
import { getCitySpecialtyVisual, getVisualDimensions } from "@/lib/medical-visuals";

// Prerendera alla giltiga stad × specialitet-kombinationer vid bygget.
export function generateStaticParams() {
  const params: { slug: string; stad: string }[] = [];
  for (const slug of CITY_SPECIALTY_SLUGS) {
    for (const c of cities) {
      // En stad kan publicera bara en delmängd av specialiteterna. Resten
      // genereras inte alls – med dynamicParams = false blir de 404, vilket är
      // meningen: hellre ingen sida än en tunn mallsida.
      if (!publishesPair(c, slug)) continue;
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
  if (!specialty || !city || !publishesPair(city, slug)) return {};

  const local = city.specialtyLocal?.[slug];
  // Fallback-titeln säger "Privat" eftersom sidan riktar sig mot privatvård och
  // redan bygger sökordet "privat <specialitet> <stad>" nedan. Lova inget sidan
  // inte håller (t.ex. pris eller remiss) – då skriver Google om titeln ändå.
  const title = local?.metaTitle ?? `Privat ${specialty.title.toLowerCase()} i ${city.name} – hitta och boka`;
  const path = `/specialiteter/${slug}/${stad}`;
  const visual = getCitySpecialtyVisual(specialty, city.slug, city.name);
  const description =
    local?.metaDescription ??
    `Privat ${specialty.title.toLowerCase()} i ${city.name}. Skicka en kostnadsfri förfrågan så återkommer vi med besked.`;

  // hreflang endast där en språkversion faktiskt finns. Varje sida canonical
  // mot sig själv – den engelska sidan får aldrig canonical mot den svenska.
  const alternates: Metadata["alternates"] = { canonical: path };
  if (slug === "ortoped" && stad === "goteborg") {
    alternates.languages = {
      "sv-SE": path,
      "en-SE": "/en/private-orthopedist-gothenburg",
      "x-default": path,
    };
  }

  return {
    title,
    description,
    keywords: [
      `${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      `privat ${specialty.title.toLowerCase()} ${city.name.toLowerCase()}`,
      ...specialty.keywords.map((k) => `${k} ${city.name.toLowerCase()}`),
    ],
    alternates,
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
  if (!specialty || !city || !publishesPair(city, slug)) notFound();

  const pairIntro =
    city.specialtyIntros[slug] ??
    `Söker du en ${specialty.title.toLowerCase()} i ${city.name}? Skicka en kostnadsfri bokningsförfrågan för ett privat besök inom ${specialty.name.toLowerCase()}.`;

  const path = `/specialiteter/${specialty.slug}/${city.slug}`;

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Specialiteter", path: "/specialiteter" },
    { name: specialty.title, path: `/specialiteter/${specialty.slug}` },
    { name: city.name, path: `/specialiteter/${specialty.slug}/${city.slug}` },
  ];

  const local = city.specialtyLocal?.[slug];
  // Länka ALDRIG till kombinationer som inte genereras – de är 404.
  const otherCities = citiesForSpecialty(specialty.slug).filter((c) => c.slug !== city.slug);
  const publishedHere = new Set(specialtySlugsForCity(city));
  const otherSpecialties = specialties.filter(
    (s) => s.slug !== specialty.slug && publishedHere.has(s.slug),
  );
  const relatedArticles = articlesForSpecialty(specialty.slug);
  const visual = getCitySpecialtyVisual(specialty, city.slug, city.name);
  // Sido-metadata till CTA-mätningen. Ingen besökardata – bara vilken sida och
  // vilken CTA på sidan som klickades.
  const ctaParams = { specialty: specialty.slug, city: city.slug };
  const ctaSource = `/specialiteter/${specialty.slug}/${city.slug}`;

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
              {local?.h1 ?? `${specialty.title} i ${city.name}`}
            </h1>
          </div>
          <p className="internal-hero-text">{pairIntro}</p>

          {/* Kommersiell svarsruta överst: pris, utbud och bokningsväg ska gå att
              läsa av direkt. Snabbfakta ligger först i artikelspalten och hamnar
              därför under sidans bild – för sent på en landningssida. */}
          {local?.hero && (
            <div className="mt-8 max-w-3xl rounded-2xl border-2 border-brand-300 bg-white p-5 shadow-[0_16px_40px_rgba(13,148,136,0.18)] sm:p-6">
              {local.hero.price && (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-bold tracking-[0.14em] text-brand-700 uppercase">
                      {local.hero.price.label}
                    </span>
                    <span className="text-3xl font-extrabold text-ink-900">
                      {local.hero.price.value}
                    </span>
                  </div>
                  {local.hero.price.note && (
                    <p className="mt-1 text-sm text-ink-600">{renderInline(local.hero.price.note)}</p>
                  )}
                </>
              )}

              {local.hero.highlights && local.hero.highlights.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {local.hero.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800 ring-1 ring-brand-100 ring-inset"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {local.hero.cta && (
                <div className="mt-5">
                  <TrackedCta
                    href={local.hero.cta.href}
                    label={local.hero.cta.label}
                    note={local.hero.cta.note}
                    sourcePath={ctaSource}
                    params={{ ...ctaParams, placement: "hero" }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-7 py-4 text-center text-base font-bold text-white shadow-[0_12px_28px_rgba(13,148,136,0.3)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 sm:w-auto"
                  />
                </div>
              )}
            </div>
          )}

          {/* Bara stad/specialitet-par som har egna tider (i praktiken ortoped
              i Göteborg). Övriga par har ingen kalender att skicka någon till. */}
          {local?.bookingCta && (
            <BookingCtaBanner
              href={withClickSource(local.bookingCta.url, ctaSource, "hero-banner")}
              label={local.bookingCta.label}
              note={local.bookingCta.note}
            />
          )}

          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <article className="article-body readable-card p-6 sm:p-8">
            {/* Manuell språkväxlare (ingen auto-omdirigering). */}
            {local?.altLanguage && (
              <p className="mb-6 text-sm">
                <Link
                  href={local.altLanguage.href}
                  hrefLang="en"
                  className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"
                >
                  <span aria-hidden>🌐</span>
                  {local.altLanguage.label}
                </Link>
              </p>
            )}

            {/* Skannbar svarsruta högst upp – viktigast för både besökare och
                AI-svarssystem. Renderas bara på prioriterade sidor. */}
            {local?.quickFacts && local.quickFacts.length > 0 && (
              <section
                aria-label={`Snabbfakta om ${specialty.title.toLowerCase()} i ${city.name}`}
                className="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"
              >
                <h2 className="text-lg font-bold text-ink-900">
                  {local.quickFactsHeading ?? `${specialty.title} i ${city.name} – snabbfakta`}
                </h2>
                <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {local.quickFacts.map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <dt className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                        {f.label}
                      </dt>
                      <dd className="text-sm text-ink-800">{renderInline(f.value)}</dd>
                    </div>
                  ))}
                </dl>
                {local.quickFactsCta && (
                  <div className="mt-5">
                    <TrackedCta
                      href={local.quickFactsCta.href}
                      label={local.quickFactsCta.label}
                      note={local.quickFactsCta.note}
                      sourcePath={ctaSource}
                    params={{ ...ctaParams, placement: "overview" }}
                    />
                  </div>
                )}
              </section>
            )}

            {!local?.hideCityIntro && (
              <>
                <h2 className="article-section-title text-2xl font-bold">
                  Specialistvård i {city.name}
                </h2>
                <p className="mt-3">{city.intro}</p>
                {city.hospitals.length > 0 && (
                  <p className="mt-3">
                    <strong>Vårdnav i området:</strong> {city.hospitals.join(", ")}.
                  </p>
                )}
              </>
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

            {/* Röda flaggor – patientsäkerhet FÖRE första CTA på YMYL-sidor. */}
            {local?.redFlag && (
              <section
                aria-label="När du ska söka akut vård"
                className="warning-card mt-10 p-6"
              >
                <h2 className="text-xl font-bold text-ink-900">{local.redFlag.heading}</h2>
                <p className="mt-2 text-ink-700">{renderInline(local.redFlag.body)}</p>
                <ul className="mt-4 space-y-2">
                  {local.redFlag.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-ink-700">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                      />
                      <span>{renderInline(b)}</span>
                    </li>
                  ))}
                </ul>
                {local.redFlag.footnote && (
                  <p className="mt-4 text-sm text-ink-600">{renderInline(local.redFlag.footnote)}</p>
                )}
              </section>
            )}

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

                {/* Riktig tabell, inte en punktlista som ser ut som en tabell:
                    utbud och priser ska gå att läsa av i ett svep, och en
                    <table> är dessutom det enda en skärmläsare kan navigera
                    som tabell. Första cellen är radens rubrik. */}
                {s.table && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                      {s.table.caption && (
                        <caption className="mb-2 text-left text-sm text-ink-600">
                          {s.table.caption}
                        </caption>
                      )}
                      <thead>
                        <tr>
                          {s.table.columns.map((c) => (
                            <th
                              key={c}
                              scope="col"
                              className="border-b border-brand-200 px-3 py-2 text-xs font-bold tracking-wide text-brand-800 uppercase"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, ri) => (
                          <tr key={ri} className="odd:bg-brand-50/40">
                            {row.map((cell, ci) =>
                              ci === 0 ? (
                                <th
                                  key={ci}
                                  scope="row"
                                  className="border-b border-brand-100 px-3 py-2 text-left align-top font-semibold text-ink-900"
                                >
                                  {renderInline(cell)}
                                </th>
                              ) : (
                                <td
                                  key={ci}
                                  className="border-b border-brand-100 px-3 py-2 align-top text-ink-800"
                                >
                                  {renderInline(cell)}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.table?.note && (
                  <p className="mt-2 text-sm text-ink-600">{renderInline(s.table.note)}</p>
                )}

                {/* Underrubriker (h3) – t.ex. en undersökning per rubrik, så att
                    varje undersökning blir sökbar och länkbar för sig. */}
                {s.subsections?.map((sub) => (
                  <div key={sub.id} id={sub.id} className="mt-6 scroll-mt-24">
                    <h3 className="text-xl font-bold text-ink-900">{sub.heading}</h3>
                    <Prose paragraphs={sub.body} />
                    {sub.bullets && sub.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {sub.bullets.map((b, i) => (
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
                  </div>
                ))}

                {s.cta && (
                  <div className="mt-6">
                    <TrackedCta
                      href={s.cta.href}
                      label={s.cta.label}
                      note={s.cta.note}
                      sourcePath={ctaSource}
                    params={{ ...ctaParams, placement: s.id }}
                    />
                  </div>
                )}
              </section>
            ))}

            {/* Primär CTA i innehållsflödet. Vid direktbokning → bokningsknapp,
                annars → hoppa till tidsförfrågan-formuläret. */}
            {local?.bookingCta ? (
              <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Boka tid direkt</h2>
                <p className="mt-2 text-ink-700">
                  Välj en ledig tid direkt i kalendern. Du bekräftar tiden via en länk i mejlet, och
                  kan avboka kostnadsfritt fram till 3 timmar före besöket.
                </p>
                <a
                  href={withClickSource(local.bookingCta.url, ctaSource, "content")}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  {local.bookingCta.label}
                </a>
              </section>
            ) : (
              local?.leadCta && (
                <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-ink-900">{local.leadCta.heading}</h2>
                  <p className="mt-2 text-ink-700">{renderInline(local.leadCta.body)}</p>
                  <a
                    href="#tidsforfragan"
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    {local.leadCta.buttonLabel}
                  </a>
                </section>
              )
            )}

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
              {local?.bookingCta ? (
                <>
                  <h2 className="text-xl font-bold text-ink-900">
                    Boka {specialty.title.toLowerCase()} i {city.name}
                  </h2>
                  <p className="mt-2 text-ink-600">
                    Boka tid direkt i kalendern. Du bekräftar tiden via en länk i mejlet och kan
                    avboka kostnadsfritt fram till 3 timmar före besöket. Läs mer på vår översikt om{" "}
                    <Link
                      href={`/specialiteter/${specialty.slug}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {specialty.name.toLowerCase()}
                    </Link>
                    .
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-ink-900">
                    Så hittar du en {specialty.title.toLowerCase()} i {city.name}
                  </h2>
                  <p className="mt-2 text-ink-600">
                    Beskriv ditt behov i formuläret och skicka en kostnadsfri förfrågan, så återkommer vi med besked om{" "}
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
                </>
              )}
            </div>

            {/* Generisk säkerhetsrad – utelämnas när sidan har ett eget, mer
                specifikt rödflaggsblock (undviker dubblering). */}
            {!local?.redFlag && (
              <div className="warning-card mt-8 p-5 text-sm">
                <strong>Viktigt:</strong> Specialistdirekt ger inte medicinsk rådgivning. Vid akuta
                besvär – ring 112. För sjukvårdsrådgivning, ring 1177.
              </div>
            )}

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

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {local?.bookingCta && (
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Boka tid direkt</h2>
                {/* Ingen target="_blank": bokningen ligger på sajten själv. */}
                <a
                  href={withClickSource(local.bookingCta.url, ctaSource, "sidebar")}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  {local.bookingCta.label}
                </a>
                {local.bookingCta.note && (
                  <p className="mt-2 text-xs text-ink-500">{local.bookingCta.note}</p>
                )}
              </div>
            )}
            {!local?.bookingCta && (
              <div id="tidsforfragan" className="form-panel scroll-mt-24 p-6">
                <h2 className="text-lg font-bold text-ink-900">
                  Skicka tidsförfrågan i {city.name}
                </h2>
                <p className="mt-1 text-sm text-ink-600">Det kostar inget att skicka en förfrågan.</p>
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
          // Service + WebPage endast på prioriterade sidor med fördjupat
          // innehåll. Provider är alltid Specialistdirekt – aldrig mottagningen.
          ...(local
            ? [
                webPageSchema({
                  path,
                  name: local.metaTitle ?? `${specialty.title} i ${city.name}`,
                  description: local.metaDescription ?? pairIntro,
                  primaryImage: visual.src,
                  // Kopplar sidan till tjänsten med namngiven läkare (ortoped
                  // Göteborg). Övriga sidor lämnas som de är.
                  aboutId: local.service ? `${site.url}${path}#service` : undefined,
                }),
                local.service
                  ? localServiceSchema({
                      path,
                      name: local.service.name,
                      description: local.service.description,
                      areaServed: city.name,
                      price: local.service.price,
                      examinations: local.service.examinations,
                      providerProfilePath: local.service.providerProfilePath,
                    })
                  : citySpecialtyServiceSchema(specialty, city, path),
              ]
            : []),
          ...(local?.faqs && local.faqs.length > 0 ? [faqSchema(local.faqs)] : []),
        ]}
      />
    </>
  );
}
