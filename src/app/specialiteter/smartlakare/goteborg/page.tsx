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

const PATH = "/specialiteter/smartlakare/goteborg";
const BOOKING = "/boka/ortoped-goteborg";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Privat smärtläkare i Göteborg – ortoped och ryggkirurg",
  description:
    "Privat smärtläkare i Göteborg vid långvarig eller komplex smärta. Boka Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi. Besök i Göteborg 2 000 kr, utan remiss.",
  keywords: [
    "privat smärtmottagning Göteborg",
    "smärtläkare Göteborg",
    "smärtklinik Göteborg",
    "specialist inom smärta Göteborg",
    "privat smärtläkare Göteborg",
    "långvarig smärta Göteborg",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Privat smärtläkare i Göteborg – ortoped och ryggkirurg",
    description:
      "Privat smärtläkare i Göteborg vid långvarig eller komplex smärta. Boka Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    question: "Finns det privat smärtmottagning i Göteborg?",
    answer:
      "Ja. Vid långvarig eller oförklarlig smärta kan du i Göteborg boka Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi. Besöket kostar 2 000 kr och betalas på plats vid besöket.",
  },
  {
    question: "Vilken kompetens har Dr. Sorkhabi för smärta?",
    answer:
      "Dr. Masoud Sorkhabi är specialist i ortopedi och ryggkirurgi med över 20 års erfarenhet av ortopedi och kirurgi. Han bedömer och behandlar bland annat smärta som blivit kronisk eller oförklarlig samt nack- och ryggbesvär och diskbråck – ofta rätt kompetens vid långvarig smärta från nacke, rygg och rörelseapparaten.",
  },
  {
    question: "Kan jag boka smärtmottagning i Göteborg utan remiss?",
    answer:
      "Ja. Som självbetalande patient behöver du ingen remiss för att boka tid. Du bekräftar tiden via en länk i mejlet och kan avboka kostnadsfritt fram till 3 timmar före besöket.",
  },
  {
    question: "Vad kostar ett privat besök hos en specialist inom smärta i Göteborg?",
    answer:
      "Ett besök i Göteborg kostar 2 000 kr, som du betalar på plats vid besöket. Priset är fast och du ser det innan du bokar. En generell guide finns i privat smärtläkare: kostnad.",
  },
  {
    question: "Passar Dr. Sorkhabi för min smärta?",
    answer:
      "Hans inriktning passar särskilt vid smärta från nacke och rygg, diskbråck och smärta som blivit kronisk eller oförklarlig, med över 20 års erfarenhet av ortopedi och kirurgi. Vill du läsa mer om olika vägar vid långvarig smärta finns vår guide långvarig smärta – vilken läkare?",
  },
  {
    question: "När ska jag söka akut vård i stället?",
    answer:
      "Ring 112 vid plötslig svår smärta efter våld, plötslig kraftnedsättning eller domning i arm eller ben, ryggsmärta med domningar kring underlivet eller svårt att kissa, eller smärta med hög feber. Är du osäker kan du ringa 1177.",
  },
];

export default function SmartlakareGoteborgPage() {
  const ortoped = getSpecialty("ortoped");
  const visual = ortoped
    ? getCitySpecialtyVisual(ortoped, "goteborg", "Göteborg")
    : { src: "/real-medical/orthopedics.webp", alt: "Privat smärtmottagning i Göteborg" };

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Smärtläkare", path: "/specialiteter/smartlakare" },
    { name: "Göteborg", path: PATH },
  ];

  const facts = [
    { label: "Specialist", value: "Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi" },
    {
      label: "Inriktning",
      value: "Kronisk och oförklarlig smärta, nack- och ryggbesvär, diskbråck, huvudvärk och migrän",
    },
    { label: "Besök", value: "Fysiskt besök i Göteborg" },
    { label: "Pris", value: "2 000 kr – betalas på plats vid besöket" },
    { label: "Remiss", value: "Behövs inte för självbetalande" },
    { label: "Avbokning", value: "Kostnadsfritt fram till 3 timmar före besöket" },
    { label: "Publikt omdöme", value: "4,9 av 5 · 63 omdömen på Reco" },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">Smärta · Göteborg</p>
            <h1 className="internal-hero-title">
              Privat smärtläkare i Göteborg
            </h1>
          </div>
          <p className="internal-hero-text">
            Söker du en privat smärtläkare i Göteborg? Dr. Masoud Sorkhabi är specialist i ortopedi
            och ryggkirurgi med över 20 års erfarenhet av ortopedi och kirurgi. Inriktningen omfattar
            bland annat kronisk och oförklarlig smärta, nack- och ryggbesvär och diskbråck. Besöket är ett
            fysiskt besök i Göteborg, utan remiss för självbetalande.
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
                <h2 className="text-lg font-bold text-ink-900">
                  Privat smärtläkare i Göteborg – snabbfakta
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
                Var kan jag träffa en specialist inom smärta i Göteborg?
              </h2>
              <p className="mt-3">
                I Göteborg kan du boka{" "}
                <strong>Dr. Masoud Sorkhabi</strong>, specialist i ortopedi och ryggkirurgi med över
                20 års erfarenhet av ortopedi och kirurgi. Inriktningen omfattar nack- och
                ryggbesvär, diskbråck samt kronisk och oförklarlig smärta. En bedömning bygger på ett
                samtal om dina besvär och en klinisk undersökning, med genomgång av din sjukhistoria
                och aktuella radiologiska undersökningar. Den här sidan ger allmän information och
                ställer ingen diagnos.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Så kan Dr. Sorkhabi hjälpa dig med din smärta
              </h2>
              <p className="mt-3">
                Dr. Sorkhabi är specialist i ortopedi och ryggkirurgi med över 20 års erfarenhet av
                ortopedi och kirurgi. Hans inriktning passar särskilt när rörelseapparaten är
                involverad – nacke, rygg och diskbråck – och när smärtan blivit kronisk eller är
                oförklarlig. Vill du läsa mer om hur du hittar rätt vid långvarig smärta finns vår
                guide{" "}
                <Link
                  href="/artiklar/langvarig-smarta-vilken-lakare"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  långvarig smärta – vilken läkare?
                </Link>{" "}
                Se även{" "}
                <Link href="/specialiteter/smartlakare" className="font-semibold text-brand-700 hover:underline">
                  smärtläkare och smärtmottagning
                </Link>
                .
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Pris och bokning</h2>
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
                Du bekräftar tiden via en länk i mejlet och kan avboka kostnadsfritt fram till 3
                timmar före besöket. Mer om
                pris, remiss och väntetid finns i{" "}
                <Link
                  href="/artiklar/privat-smartlakare-kostnad"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  privat smärtläkare: kostnad
                </Link>
                .
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Omdömen</h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi har fått mycket starka patientomdömen – <strong>4,9 av 5</strong>{" "}
                baserat på 63 publicerade omdömen på{" "}
                <a
                  href={recoProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Reco
                </a>
                . Betyget gäller läkaren och inte Specialistdirekt, och är ingen garanti för ett visst
                medicinskt resultat.
              </p>

              <section aria-label="När du ska söka akut vård" className="warning-card mt-10 p-6">
                <h2 className="text-xl font-bold text-ink-900">När ska du söka akut vård i stället?</h2>
                <p className="mt-2 text-ink-700">
                  Ring <strong>112</strong> vid plötslig svår smärta efter våld, plötslig
                  kraftnedsättning eller domning i arm eller ben, ryggsmärta med domningar kring
                  underlivet eller svårt att kissa, eller smärta med hög feber och kraftig
                  allmänpåverkan. Är du osäker kan du ringa <strong>1177</strong>.
                </p>
              </section>

              <div className="soft-info-card mt-8 p-6 text-sm text-ink-600">
                Har du redan fått en bedömning eller behandling och vill få den tidigare bedömningen
                omprövad? Då söker du en annan typ av tjänst – läs om andra bedömning vid långvarig
                smärta på{" "}
                <a
                  href="https://www.andrabedomning.se/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Andrabedömning.se
                </a>
                . Specialistdirekt är en förmedlingstjänst och inte vårdgivare; den medicinska
                bedömningen görs av Dr. Masoud Sorkhabi.
              </div>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
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
            "@type": "WebPage",
            "@id": `${abs(PATH)}#webpage`,
            url: abs(PATH),
            name: "Privat smärtläkare i Göteborg – ortoped och ryggkirurg",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Förmedling till privat smärtmottagning i Göteborg",
            serviceType: "Vårdförmedling",
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: "Göteborg" },
            url: abs(PATH),
            description:
              "Bokning hos Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi i Göteborg. Specialistdirekt är en förmedlingstjänst, inte vårdgivare.",
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
