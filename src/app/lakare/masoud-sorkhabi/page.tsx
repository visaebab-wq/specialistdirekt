import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getSpecialty } from "@/lib/specialties";
import { getCitySpecialtyVisual } from "@/lib/medical-visuals";
import { BOOKING_CTA_NOTE, BookingCtaBanner } from "@/components/BookingCtaBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PageVisual } from "@/components/PageVisual";
import { RecoReviews } from "@/components/RecoReviews";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { recoProfileUrl } from "@/lib/reco-reviews";
import { articles } from "@/lib/articles";
import { medicalReviewerFor } from "@/lib/medical-reviewer";

const PATH = "/lakare/masoud-sorkhabi";
const BOOKING = "/boka/ortoped-goteborg";
const MONEY_PAGE = "/specialiteter/ortoped/goteborg";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Dr. Masoud Sorkhabi – privat ortoped och ryggkirurg i Göteborg",
  description:
    "Dr. Masoud Sorkhabi är specialist i ortopedi och ryggkirurgi i Göteborg med över 20 års erfarenhet av ortopedi och kirurgi – nack- och ryggbesvär, diskbråck samt kronisk och oförklarlig smärta. Besök i Göteborg 2 000 kr – utan remiss.",
  keywords: [
    "Masoud Sorkhabi",
    "Dr Masoud Sorkhabi ortoped",
    "privat ortoped Göteborg",
    "Masoud Sorkhabi ryggkirurg",
    "ortoped ryggkirurgi Göteborg",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "profile",
    title: "Dr. Masoud Sorkhabi – privat ortoped och ryggkirurg i Göteborg",
    description:
      "Specialist i ortopedi och ryggkirurgi i Göteborg med över 20 års erfarenhet av ortopedi och kirurgi. Besök i Göteborg 2 000 kr – utan remiss.",
    url: PATH,
  },
};

const facts: { label: string; value: string }[] = [
  { label: "Läkare", value: "Dr. Masoud Sorkhabi" },
  // Titeln står här därför att artiklarnas byline ("Masoud Sorkhabi, överläkare")
  // länkar hit. Påstår bylinen en titel måste sidan den pekar på bekräfta den.
  { label: "Titel", value: "Överläkare" },
  { label: "Specialitet", value: "Specialist i ortopedi och ryggkirurgi" },
  {
    label: "Erfarenhet",
    value: "Över 20 års erfarenhet av ortopedi och kirurgi – har arbetat med både vuxna och barn",
  },
  {
    label: "Inriktning",
    value:
      "Nacke och ryggbesvär, diskbråck, kronisk och oförklarlig smärta, huvudvärk och migrän, axel- och armbågssmärta, höft/bäcken/knä",
  },
  { label: "Ort", value: "Göteborg" },
  { label: "Pris", value: "2 000 kr – betalas på plats vid besöket" },
  { label: "Remiss", value: "Behövs inte för självbetalande" },
  { label: "Publikt omdöme", value: "4,9 av 5 · 63 omdömen på Reco" },
];

const faqs = [
  {
    question: "Vad är Dr. Masoud Sorkhabi specialist i?",
    answer:
      "Han är specialist i ortopedi och ryggkirurgi och har över 20 års erfarenhet av ortopedi och kirurgi. Under sin karriär har han behandlat patienter med rygg-, nack-, höft-, knä- och fotoperationer, och hans erfarenhet är omfattande inom både kirurgiska och icke-kirurgiska behandlingsmetoder.",
  },
];

export default function MasoudSorkhabiPage() {
  const specialty = getSpecialty("ortoped");
  const reviewedArticles = articles.filter((a) => medicalReviewerFor(a));
  const visual = specialty
    ? getCitySpecialtyVisual(specialty, "goteborg", "Göteborg")
    : { src: "/real-medical/orthopedics.webp", alt: "Ortopedisk vård i Göteborg" };

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Dr. Masoud Sorkhabi", path: PATH },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">
              Specialist i ortopedi och ryggkirurgi · Göteborg
            </p>
            <h1 className="internal-hero-title">Dr. Masoud Sorkhabi</h1>
          </div>
          <p className="internal-hero-text">
            Dr. Masoud Sorkhabi är specialist i ortopedi och ryggkirurgi i Göteborg och har över
            20 års erfarenhet av ortopedi och kirurgi. Inriktningen omfattar bland annat nack- och
            ryggbesvär, diskbråck samt kronisk och oförklarlig smärta. Du kan boka ett besök i
            Göteborg – utan remiss för självbetalande.
          </p>
          <BookingCtaBanner href={BOOKING} label="Boka tid hos Dr. Masoud Sorkhabi" />
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <article className="article-body readable-card p-6 sm:p-8">
              <section
                aria-label="Snabbfakta"
                className="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"
              >
                <h2 className="text-lg font-bold text-ink-900">Dr. Masoud Sorkhabi – snabbfakta</h2>
                <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {facts.map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <dt className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                        {f.label}
                      </dt>
                      <dd className="text-sm text-ink-800">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <h2 className="article-section-title text-2xl font-bold">Kompetens och inriktning</h2>
              <p className="mt-3">
                Som specialist i ortopedi och ryggkirurgi bedömer Dr. Masoud Sorkhabi besvär från
                rörelseapparaten – framför allt nacke och rygg – samt smärta som blivit kronisk eller
                är oförklarlig. En bedömning börjar med ett samtal om dina besvär och en klinisk
                undersökning, där läkaren föreslår hur du kan gå vidare.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Nacke- och ryggbesvär",
                  "Diskbråck (ländrygg eller nacke)",
                  "Kronisk och oförklarlig smärta",
                  "Huvudvärk och migrän",
                  "Axel- och armbågssmärta",
                  "Höft-, bäcken- och knäsmärta",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-ink-700">
                    <span
                      aria-hidden
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700"
                    >
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Så arbetar Dr. Masoud Sorkhabi
              </h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi arbetar utifrån en tydlig princip: att försöka identifiera den
                bakomliggande orsaken till smärtan, inte bara behandla symtomen. Undersökningen är
                omfattande och grundlig och inkluderar en noggrann genomgång av din tidigare
                sjukhistoria samt en granskning av aktuella radiologiska undersökningar. Utifrån den
                utvärderingen bedöms om du är kandidat för operation eller om icke-kirurgisk
                behandling är ett bättre alternativ.
              </p>
              <p className="mt-3">
                Under sin karriär har han behandlat patienter med rygg-, nack-, höft-, knä- och
                fotoperationer, och hans erfarenhet är omfattande inom både kirurgiska och
                icke-kirurgiska behandlingsmetoder. Den här sidan ger allmän information och ställer
                ingen diagnos.
              </p>
              <blockquote className="mt-4 border-l-4 border-brand-200 pl-4 text-ink-700 italic">
                ”Jag har alltid haft ett starkt intresse för att analysera smärtproblematik för att
                kunna erbjuda rätt behandling – både för opererade och icke-opererade patienter”, säger
                Dr. Sorkhabi.
              </blockquote>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Besök och pris</h2>
              <p className="mt-3">Fasta priser som du ser innan du bokar:</p>
              <ul className="mt-4 space-y-2">
                <li className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    <strong>Fysiskt besök i Göteborg – 2 000 kr</strong>
                  </span>
                </li>
                <li className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>Betalas på plats vid besöket – ingen betalning sker när du bokar</span>
                </li>
              </ul>
              <p className="mt-4">
                Som självbetalande patient behöver du ingen remiss. Läs mer på sidan om{" "}
                <Link href={MONEY_PAGE} className="font-semibold text-brand-700 hover:underline">
                  privat ortoped i Göteborg
                </Link>
                .
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Omdömen</h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi har fått mycket starka patientomdömen –{" "}
                <strong>4,9 av 5</strong> baserat på 63 publicerade omdömen på{" "}
                <a
                  href={recoProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Reco
                </a>
                . Betyget gäller läkaren och inte Specialistdirekt, och är ingen garanti för ett
                visst medicinskt resultat.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Medicinsk granskare för Specialistdirekt
              </h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi är medicinsk granskare för Specialistdirekts artiklar. Med
                specialistkompetens i ortopedi och ryggkirurgi och över 20 års klinisk erfarenhet
                faktagranskar han innehållet, så att den medicinska informationen ska vara korrekt
                och aktuell. Innehållet är allmän information och ersätter inte en individuell
                medicinsk bedömning.
              </p>
              {reviewedArticles.length > 0 && (
                <>
                  <h3 className="mt-6 text-lg font-bold text-ink-900">
                    Artiklar som Dr. Masoud har granskat
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {reviewedArticles.map((a) => (
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
                </>
              )}

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <section aria-label="När du ska söka akut vård" className="warning-card mt-10 p-6">
                <h2 className="text-xl font-bold text-ink-900">När ska du söka akut vård i stället?</h2>
                <p className="mt-2 text-ink-700">
                  En planerad ortopedtid är inte för akuta tillstånd. Ring <strong>112</strong> vid
                  till exempel plötslig svår ryggsmärta med domningar kring underlivet eller svårt
                  att kissa, plötslig kraftnedsättning i arm eller ben, eller misstänkt fraktur efter
                  kraftigt våld. Är du osäker kan du ringa <strong>1177</strong>.
                </p>
              </section>

              <div className="soft-info-card mt-8 p-6 text-sm text-ink-600">
                Specialistdirekt är en förmedlingstjänst. Den medicinska
                bedömningen, behandlingen och det medicinska ansvaret ligger hos Dr. Masoud Sorkhabi.
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Boka tid direkt</h2>
                <a
                  href={BOOKING}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Boka tid hos Dr. Masoud Sorkhabi
                </a>
                {/* Samma text som bannern överst – sidan får inte säga två olika
                    saker om samma bokning. */}
                <p className="mt-2 text-xs text-ink-500">{BOOKING_CTA_NOTE}</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <RecoReviews />

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${abs(PATH)}#person`,
            // Samma @id används av artiklarnas reviewedBy. Namn och jobTitle måste
            // därför stämma överens med bylinen – annars beskriver två scheman
            // samma entitet på två olika sätt. Båda titlarna är sanna: överläkare
            // är tjänstetiteln, specialist i ortopedi och ryggkirurgi är
            // specialiteten.
            name: "Masoud Sorkhabi",
            honorificPrefix: "Dr.",
            jobTitle: ["Överläkare", "Specialist i ortopedi och ryggkirurgi"],
            description:
              "Specialist i ortopedi och ryggkirurgi i Göteborg med över 20 års erfarenhet av ortopedi och kirurgi – nack- och ryggbesvär, diskbråck samt kronisk och oförklarlig smärta. Medicinsk granskare för Specialistdirekts innehåll inom ortopedi och smärta.",
            knowsAbout: [
              "Ortopedi",
              "Ryggkirurgi",
              "Ryggbesvär",
              "Nackbesvär",
              "Diskbråck",
              "Kronisk smärta",
              "Huvudvärk och migrän",
              "Axel- och armbågssmärta",
              "Höft-, bäcken- och knäsmärta",
            ],
            sameAs: [recoProfileUrl],
            url: abs(PATH),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${abs(PATH)}#webpage`,
            url: abs(PATH),
            name: "Dr. Masoud Sorkhabi – specialist i ortopedi och ryggkirurgi",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
            about: { "@id": `${abs(PATH)}#person` },
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
