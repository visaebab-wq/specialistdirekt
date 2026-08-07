import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getSpecialty } from "@/lib/specialties";
import { getCitySpecialtyVisual } from "@/lib/medical-visuals";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageVisual } from "@/components/PageVisual";
import { RecoReviews } from "@/components/RecoReviews";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

const PATH = "/smartbehandling/goteborg";
const BOOKING = "/boka/ortoped-goteborg";
const MONEY_PAGE = "/specialiteter/ortoped/goteborg";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Ortopedisk smärtbehandling i Göteborg – utan remiss",
  description:
    "Privat ortopedisk smärtbehandling i Göteborg hos Dr. Masoud Sorkhabi – rygg-, nack-, knä- och nervrelaterad samt långvarig smärta. Fysiskt 2 000 kr, digitalt 1 000 kr, utan remiss.",
  keywords: [
    "ortopedisk smärtbehandling Göteborg",
    "privat smärtbehandling Göteborg",
    "långvarig smärta Göteborg",
    "ryggsmärta specialist Göteborg",
    "nervrelaterad smärta Göteborg",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: "Ortopedisk smärtbehandling i Göteborg – utan remiss",
    description:
      "Privat ortopedisk smärtbehandling i Göteborg hos Dr. Masoud Sorkhabi. Fysiskt 2 000 kr, digitalt 1 000 kr, utan remiss.",
    url: PATH,
  },
};

const faqs = [
  {
    question: "Vad är ortopedisk smärtbehandling?",
    answer:
      "Det är bedömning och behandling av smärta från rörelseapparaten – till exempel rygg, nacke, knä och nervrelaterad smärta – hos en specialistläkare i ortopedi. Bedömningen utgår från dina aktuella besvär och en klinisk undersökning.",
  },
  {
    question: "Kan jag få behandling för långvarig smärta utan remiss?",
    answer:
      "Ja. Som självbetalande patient behöver du ingen remiss för att boka tid hos Dr. Masoud Sorkhabi. Ett fysiskt besök i Göteborg kostar 2 000 kr och ett digitalt videobesök 1 000 kr.",
  },
  {
    question: "Kan ortopeden bedöma nervrelaterad och utstrålande smärta?",
    answer:
      "Ja. Diskrelaterade besvär och nervrelaterad, utstrålande smärta i arm eller ben hör till inriktningen. Läkaren bedömer dina aktuella symtom och vad som är rimliga nästa steg. Sidan ställer ingen diagnos.",
  },
  {
    question: "Kan jag få ett digitalt besök för min smärta?",
    answer:
      "Ja. Ett digitalt videobesök (1 000 kr) kan bokas från hela Sverige och passar bra för en första bedömning. Vissa besvär kan behöva ett fysiskt besök i Göteborg (2 000 kr).",
  },
  {
    question: "När ska jag söka akut vård i stället?",
    answer:
      "Sök vård direkt – ring 112 – vid plötslig svår ryggsmärta med domningar kring underlivet eller svårt att kissa, plötslig kraftnedsättning i arm eller ben, eller smärta efter kraftigt våld. Är du osäker kan du ringa 1177.",
  },
];

export default function SmartbehandlingGoteborgPage() {
  const specialty = getSpecialty("ortoped");
  const visual = specialty
    ? getCitySpecialtyVisual(specialty, "goteborg", "Göteborg")
    : { src: "/real-medical/orthopedics.webp", alt: "Ortopedisk smärtbehandling i Göteborg" };

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Ortopedisk smärtbehandling i Göteborg", path: PATH },
  ];

  const facts = [
    { label: "Läkare", value: "Dr. Masoud Sorkhabi, specialist i ortopedi" },
    { label: "Inriktning", value: "Rygg, nacke, knä, nervrelaterad och långvarig smärta" },
    { label: "Besök", value: "Fysiskt i Göteborg eller digitalt i hela Sverige" },
    { label: "Pris", value: "Fysiskt 2 000 kr · digitalt 1 000 kr" },
    { label: "Remiss", value: "Behövs inte för självbetalande" },
    { label: "Publikt omdöme", value: "4,9 av 5 · 63 omdömen på Reco" },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">Ortopedi · Göteborg</p>
            <h1 className="internal-hero-title">Ortopedisk smärtbehandling i Göteborg</h1>
          </div>
          <p className="internal-hero-text">
            Har du långvarig eller nervrelaterad smärta från rygg, nacke eller knä? Hos Dr. Masoud
            Sorkhabi, specialistläkare i ortopedi i Göteborg, kan du få en bedömning av dina aktuella
            besvär – fysiskt i Göteborg eller digitalt i hela Sverige, utan remiss för
            självbetalande.
          </p>
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
                <h2 className="text-lg font-bold text-ink-900">
                  Ortopedisk smärtbehandling i Göteborg – snabbfakta
                </h2>
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

              <h2 className="article-section-title text-2xl font-bold">
                Vad innebär ortopedisk smärtbehandling?
              </h2>
              <p className="mt-3">
                Ortopedisk smärtbehandling handlar om att bedöma och behandla smärta som utgår från
                rörelseapparaten – skelett, leder, muskler, senor och nerver. En specialistläkare i
                ortopedi går igenom dina aktuella besvär, gör en klinisk undersökning och tar
                ställning till rimliga nästa steg. Den här sidan ger allmän information och ställer
                ingen diagnos.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Vanliga smärttillstånd som kan bedömas
              </h2>
              <ul className="mt-4 space-y-2">
                {[
                  "Långvarig rygg- och nacksmärta",
                  "Utstrålande, nervrelaterad smärta i arm eller ben",
                  "Diskrelaterade besvär",
                  "Knä- och belastningssmärta",
                  "SI-ledsbesvär",
                  "Långvarig smärta från rörelseapparaten som inte gått över",
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
              <p className="mt-4">
                Osäker på om dina besvär bör ses av en läkare eller en fysioterapeut? Läs{" "}
                <Link
                  href="/artiklar/ryggsmarta-ortoped-eller-fysioterapeut"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  ryggsmärta: ortoped eller fysioterapeut?
                </Link>
              </p>

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
                  <span>
                    <strong>Digitalt videobesök – 1 000 kr</strong>, från hela Sverige
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                Läs mer om läkaren och besöket på sidan om{" "}
                <Link href={MONEY_PAGE} className="font-semibold text-brand-700 hover:underline">
                  privat ortoped i Göteborg
                </Link>{" "}
                eller på{" "}
                <Link
                  href="/lakare/masoud-sorkhabi"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Dr. Masoud Sorkhabis profil
                </Link>
                .
              </p>

              <section aria-label="När du ska söka akut vård" className="warning-card mt-10 p-6">
                <h2 className="text-xl font-bold text-ink-900">När ska du söka akut vård i stället?</h2>
                <p className="mt-2 text-ink-700">
                  Ortopedisk smärtbehandling är för besvär som inte är akuta. Ring <strong>112</strong>{" "}
                  vid plötslig svår ryggsmärta med domningar kring underlivet eller svårt att kissa,
                  plötslig kraftnedsättning eller domning i arm eller ben, eller smärta efter kraftigt
                  våld. Är du osäker kan du ringa <strong>1177</strong>.
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <div className="soft-info-card mt-8 p-6 text-sm text-ink-600">
                Specialistdirekt är en förmedlingstjänst och inte vårdgivare. Den medicinska
                bedömningen, behandlingen och det medicinska ansvaret ligger hos Dr. Masoud Sorkhabi.
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Boka tid direkt</h2>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Boka tid hos Dr. Masoud Sorkhabi
                </a>
                <p className="mt-2 text-xs text-ink-500">Öppnar bokningskalendern i en ny flik.</p>
                <p className="mt-4 text-center text-sm text-ink-600">
                  eller skicka en tidsförfrågan nedan
                </p>
              </div>
              <div id="tidsforfragan" className="form-panel scroll-mt-24 p-6">
                <h2 className="text-lg font-bold text-ink-900">Skicka tidsförfrågan</h2>
                <p className="mt-1 text-sm text-ink-600">Kostnadsfritt och utan förpliktelser.</p>
                <div className="mt-6">
                  <LeadForm defaultSpecialty="ortoped" />
                </div>
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
            "@type": "WebPage",
            "@id": `${abs(PATH)}#webpage`,
            url: abs(PATH),
            name: "Ortopedisk smärtbehandling i Göteborg",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Ortopedisk smärtbehandling i Göteborg",
            serviceType: "Ortopedisk bedömning och smärtbehandling",
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: "Göteborg" },
            url: abs(PATH),
            description:
              "Förmedling av tidsförfrågan till Dr. Masoud Sorkhabi för ortopedisk bedömning av rygg-, nack-, knä- och nervrelaterad samt långvarig smärta. Specialistdirekt är en förmedlingstjänst, inte vårdgivare.",
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
