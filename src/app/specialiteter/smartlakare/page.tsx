import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getSpecialty } from "@/lib/specialties";
import { getSpecialtyVisual } from "@/lib/medical-visuals";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PageVisual } from "@/components/PageVisual";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

const PATH = "/specialiteter/smartlakare";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Smärtläkare och smärtmottagning – hitta rätt specialist",
  description:
    "Vad är en smärtläkare och smärtmottagning, och när är de rätt? Så hittar du rätt specialist vid långvarig smärta – ortoped, neurolog, reumatolog eller smärtmottagning.",
  keywords: [
    "smärtläkare",
    "smärtmottagning",
    "smärtspecialist",
    "specialist på långvarig smärta",
    "privat smärtmottagning",
    "smärtklinik",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Smärtläkare och smärtmottagning – hitta rätt specialist",
    description:
      "Vad en smärtläkare och smärtmottagning är, och när de är rätt väg vid långvarig smärta.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    question: "Vad gör en smärtläkare?",
    answer:
      "En smärtläkare är en läkare med kompetens att bedöma och behandla smärta, särskilt långvarig eller komplex smärta. Fokus ligger på att se till helheten och lägga en plan – inte enbart att behandla ett enskilt organ.",
  },
  {
    question: "Vad är en smärtmottagning?",
    answer:
      "En smärtmottagning är en mottagning som är inriktad på bedömning och behandling av smärta, oftast långvarig smärta. Där kan flera möjliga orsaker vägas samman, i stället för att smärtan ses ur en enskild organspecialitets synvinkel.",
  },
  {
    question: "Vilken läkare är specialist på långvarig smärta?",
    answer:
      "Det finns läkare med särskild kompetens inom smärta, men även ortopeder, neurologer och reumatologer bedömer smärta inom sina områden. Vilken som passar beror på typen av besvär. Se vår guide om [långvarig smärta – vilken läkare?](/artiklar/langvarig-smarta-vilken-lakare).",
  },
  {
    question: "När ska man gå till en smärtmottagning?",
    answer:
      "En smärtmottagning passar särskilt vid långvarig eller komplex smärta där flera faktorer behöver bedömas samtidigt – till exempel när smärtan pågått länge, sitter på flera ställen eller är svår att härleda till en enskild orsak.",
  },
  {
    question: "Måste jag ha en diagnos för att gå till en smärtmottagning?",
    answer:
      "Nej. Du behöver inte veta orsaken i förväg. En bred bedömning kan hjälpa till att reda ut vad som bör utredas vidare och av vem.",
  },
  {
    question: "Vad är skillnaden mellan en smärtläkare och en smärtmottagning?",
    answer:
      "En smärtläkare är en läkare med särskild kompetens inom smärta och smärtbehandling. En smärtmottagning är verksamheten där patienter med långvariga eller komplexa smärttillstånd bedöms och behandlas. Begreppen används ibland nära varandra, men beskriver inte exakt samma sak.",
  },
  {
    question: "Ska jag gå till ortoped, neurolog eller smärtmottagning?",
    answer:
      "Vid ett tydligt problem från led, skelett eller sena kan en ortoped vara rätt, vid nervsymtom en neurolog, och vid långvarig eller komplex smärta en smärtmottagning. Vår guide [långvarig smärta – vilken läkare?](/artiklar/langvarig-smarta-vilken-lakare) hjälper dig välja.",
  },
];

export default function SmartlakareHubPage() {
  const ortoped = getSpecialty("ortoped");
  const visual = ortoped
    ? getSpecialtyVisual(ortoped)
    : { src: "/real-medical/orthopedics.webp", alt: "Specialist inom smärta" };

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Specialiteter", path: "/specialiteter" },
    { name: "Smärtläkare", path: PATH },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">Smärta</p>
            <h1 className="internal-hero-title">
              Smärtläkare och smärtmottagning – hitta rätt specialist
            </h1>
          </div>
          <p className="internal-hero-text">
            En smärtläkare eller smärtmottagning arbetar med bedömning och behandling av smärta,
            särskilt långvarig eller komplex smärta. Men rätt vårdkontakt beror på typen av besvär –
            ibland är en ortoped, neurolog eller reumatolog en bättre väg. Specialistdirekt hjälper
            dig att hitta rätt privat specialist eller mottagning att kontakta.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <article className="article-body readable-card p-6 sm:p-8">
              <h2 className="article-section-title text-2xl font-bold">
                Vad är en smärtläkare och en smärtmottagning?
              </h2>
              <p className="mt-3">
                En <strong>smärtläkare</strong> är en läkare med kompetens att bedöma och behandla
                smärta, med särskilt fokus på långvarig eller komplex smärta. En{" "}
                <strong>smärtmottagning</strong> (ibland kallad smärtklinik) är verksamheten där
                bedömning och behandling sker. Målet är att bedöma flera faktorer samtidigt
                och lägga en rimlig plan – inte att enbart behandla ett enskilt symtom.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                När är en smärtmottagning relevant?
              </h2>
              <p className="mt-3">
                En smärtmottagning passar särskilt vid <strong>långvarig eller komplex smärta</strong>{" "}
                där flera möjliga orsaker behöver vägas samman – till exempel när smärtan pågått
                länge, sitter på flera ställen, är svår att härleda till en enskild orsak eller
                påverkar sömn och vardag. Det betyder inte att all smärta ska till en smärtmottagning;
                vid ett tydligt problem från exempelvis en led är ofta rätt organspecialist ett bättre
                första steg.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Smärtmottagning, ortoped, neurolog eller reumatolog?
              </h2>
              <p className="mt-3">
                Vilken specialist som är relevant beror på typen av smärta. En kort orientering:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  ["Tydligt problem från led, skelett eller sena", "ortoped", "/specialiteter/ortoped"],
                  ["Nervsymtom som domningar, utstrålning eller svaghet", "neurolog", "/specialiteter/neurolog"],
                  ["Inflammatoriska besvär i flera leder", "reumatolog", "/specialiteter/reumatolog"],
                  ["Långvarig eller komplex smärta som behöver bredare bedömning", "smärtmottagning", null],
                ].map(([sit, spec, href]) => (
                  <li key={sit as string} className="flex gap-3 text-ink-700">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>
                      {sit} →{" "}
                      {href ? (
                        <Link href={href as string} className="font-semibold text-brand-700 hover:underline">
                          {spec}
                        </Link>
                      ) : (
                        <strong>{spec}</strong>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Osäker? Vår guide{" "}
                <Link
                  href="/artiklar/langvarig-smarta-vilken-lakare"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  långvarig smärta – vilken läkare ska jag söka?
                </Link>{" "}
                går igenom valet steg för steg.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Privat smärtmottagning – pris, remiss och bokning
              </h2>
              <p className="mt-3">
                Vill du söka privat kan du ofta boka utan remiss som självbetalande. Pris, remiss och
                väntetid går vi igenom i{" "}
                <Link
                  href="/artiklar/privat-smartlakare-kostnad"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  privat smärtläkare: kostnad, remiss och hur du bokar
                </Link>
                . Bor du i Göteborgsområdet, se{" "}
                <Link
                  href="/specialiteter/smartlakare/goteborg"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  privat smärtmottagning i Göteborg
                </Link>
                .
              </p>

              <div className="warning-card mt-10 p-5 text-sm">
                <strong>Viktigt:</strong> Specialistdirekt ger inte medicinsk rådgivning och ställer
                inga diagnoser. Vid akuta besvär – ring 112. För sjukvårdsrådgivning, ring 1177.
              </div>

              <div className="soft-info-card mt-8 p-6">
                <h2 className="text-xl font-bold text-ink-900">
                  Har du redan fått en bedömning du vill ompröva?
                </h2>
                <p className="mt-2 text-ink-600">
                  Den här sidan hjälper dig hitta en läkare eller mottagning att söka nu. Vill du i
                  stället få en tidigare bedömning, diagnos eller behandling omprövad söker du en
                  annan typ av tjänst – läs om andra bedömning vid långvarig smärta på{" "}
                  <a
                    href="https://www.andrabedomning.se/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-700 hover:underline"
                  >
                    Andrabedömning.se
                  </a>
                  .
                </p>
              </div>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor om smärtläkare</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Vet du inte vilken specialist du behöver?</h2>
                <p className="mt-1 text-sm text-ink-600">
                  Beskriv dina besvär, så hjälper vi dig hitta rätt. Kostnadsfritt och utan
                  förpliktelser.
                </p>
                <div className="mt-6">
                  <LeadForm />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${abs(PATH)}#webpage`,
            url: abs(PATH),
            name: "Smärtläkare och smärtmottagning – hitta rätt specialist",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Förmedling till privat smärtläkare och smärtmottagning",
            serviceType: "Vårdförmedling",
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "Country", name: "Sverige" },
            url: abs(PATH),
            description:
              "Specialistdirekt hjälper dig att hitta rätt privat specialist eller mottagning vid smärta. Specialistdirekt är en förmedlingstjänst och inte vårdgivare.",
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
