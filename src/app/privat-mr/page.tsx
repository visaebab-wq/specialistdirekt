import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { AnatomyHeroVisual } from "@/components/AnatomyHeroVisual";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

// Transaktionell startsida för MR. Sökordet "privat MR" ägs av artikeln
// /artiklar/privat-mr-kostnad – den här sidan riktar sig mot bokningsintentionen
// ("boka privat MR") för att undvika kannibalisering av det informativa sökordet.
const PATH = "/privat-mr";
const COST = "/artiklar/privat-mr-kostnad";
const UTAN_REMISS = "/artiklar/mr-utan-remiss";
const MR_RYGG = "/artiklar/privat-mr-rygg-kostnad";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Boka privat MR – magnetkamera, bedömning och remiss",
  description:
    "Skicka en förfrågan om privat MR. En läkare gör en medicinsk bedömning och kan utfärda remiss när det behövs. Efter undersökningen går en specialistläkare i ortopedi igenom MR-svaret med dig.",
  keywords: [
    "boka privat MR",
    "privat magnetkamera",
    "MR undersökning boka",
    "magnetkameraundersökning privat",
    "MR remiss",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Boka privat MR – magnetkamera, bedömning och remiss",
    description:
      "Skicka en förfrågan om privat MR. Bedömning, remiss när det behövs och genomgång av MR-svaret med ortopedläkare.",
    url: PATH,
    type: "website",
  },
};

// Patientresan. Formuleringarna skiljer medvetet på vem som gör vad:
// radiologen granskar bilderna och skriver utlåtandet, specialistläkaren går
// igenom resultatet kliniskt. Inga löften om tider, garantier eller geografi.
const steps = [
  {
    title: "1. Du skickar en förfrågan",
    text: "Du beskriver dina besvär, vilken kroppsdel det gäller och när du kan komma.",
  },
  {
    title: "2. Medicinsk bedömning",
    text: "En läkare går igenom dina uppgifter och bedömer om MR är en relevant undersökning för dina besvär. När det behövs kan läkaren utfärda en remiss.",
  },
  {
    title: "3. Undersökningen genomförs på röntgenmottagning",
    text: "Själva magnetkameraundersökningen görs på en röntgenmottagning. Du får besked om vad som gäller och vad som ingår innan du bestämmer dig.",
  },
  {
    title: "4. Radiologiskt utlåtande",
    text: "Röntgenläkare (radiolog) på mottagningen granskar bilderna och skriver det radiologiska utlåtandet.",
  },
  {
    title: "5. Genomgång med ortopedläkare",
    text: "En specialistläkare i ortopedi går igenom MR-svaret med dig och sätter fynden i sammanhang med dina symtom.",
  },
  {
    title: "6. Nästa steg",
    text: "Du får vägledning om vad som kan vara ett lämpligt nästa steg utifrån fynden. Vad det blir avgörs av den medicinska bedömningen.",
  },
];

const faqs = [
  {
    question: "Hur bokar jag privat MR?",
    answer:
      "Du skickar en kostnadsfri förfrågan här på sidan och beskriver dina besvär och vilken kroppsdel det gäller. Därefter görs en medicinsk bedömning av om MR är en relevant undersökning, och du får besked om hur du kan gå vidare.",
  },
  {
    question: "Behöver jag remiss för att boka privat MR?",
    answer:
      "Du behöver inte ha ordnat en remiss själv innan du hör av dig. En läkare bedömer dina uppgifter och kan utfärda remiss när det behövs. Om remiss krävs beror på undersökningen och på vilken röntgenmottagning som utför den. Läs mer om vad [MR utan remiss](/artiklar/mr-utan-remiss) innebär.",
  },
  {
    question: "Vem granskar MR-bilderna?",
    answer:
      "Bilderna granskas av röntgenläkare (radiolog) på den mottagning som utför undersökningen. Det är också radiologen som skriver det radiologiska utlåtandet.",
  },
  {
    question: "Vad menas med att en specialistläkare går igenom resultatet?",
    answer:
      "Efter undersökningen går en specialistläkare igenom MR-utlåtandet och resultatet tillsammans med dig och förklarar vad fynden kan betyda i förhållande till dina symtom. Det ersätter inte radiologens bildgranskning utan är den kliniska bedömningen av vad resultatet innebär för dig.",
  },
  {
    question: "Vilken specialist går igenom mitt MR-resultat?",
    answer:
      "Det beror på vad dina besvär gäller. Vid besvär i rygg, knä och rörelseapparaten görs genomgången av Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi. Rör det andra delar av kroppen kan en annan specialistkompetens vara mer relevant, och då får du besked om det.",
  },
  {
    question: "Får jag garanterat göra en MR?",
    answer:
      "Nej. Om MR är en lämplig undersökning avgörs av den medicinska bedömningen. Ibland är en annan undersökning eller en klinisk bedömning ett bättre första steg.",
  },
  {
    question: "Vad kostar en privat MR?",
    answer:
      "Kostnaden varierar beroende på kroppsdel, undersökningens omfattning och om kontrastmedel behövs. Vi har samlat prisbilden separat i guiden om [privat MR – kostnad och väntetid](/artiklar/privat-mr-kostnad).",
  },
  {
    question: "Kan jag skicka en förfrågan vid akuta besvär?",
    answer:
      "Nej. Privat MR är en planerad vårdväg. Vid plötsliga eller allvarliga symtom ska du söka akut vård, och vid livshotande tillstånd ring 112.",
  },
];

export default function PrivatMrPage() {
  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Privat MR", path: PATH },
  ];

  return (
    <>
      <section className="mr-hero">
        <div className="mx-auto grid min-h-[640px] max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)]">
          <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 lg:py-20 xl:pl-12">
            <Breadcrumbs items={crumbs} />
            <div className="mt-8">
              <p className="internal-hero-kicker">Bilddiagnostik · Magnetkamera</p>
              <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                {/* Mellanslaget är avsiktligt: JSX kapar radbrytningen mellan
                    texten och <span>, så textContent blev "MRmed" – det som
                    Google, skärmläsare och AI-svarsmotorer faktiskt läser.
                    <span> är block, så mellanslaget syns inte i layouten. */}
                Boka privat MR{" "}
                <span className="mt-2 block text-brand-700">med läkarbedömning</span>
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-600 sm:text-xl">
              Skicka en kostnadsfri förfrågan. En läkare bedömer ditt behov och kan utfärda remiss
              när det behövs. Efter undersökningen går en ortoped igenom MR-svaret med dig.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#boka-privat-mr"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Skicka förfrågan
              </Link>
              <Link
                href="#sa-fungerar-det"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink-300 bg-white/75 px-7 py-3.5 text-base font-bold text-ink-800 transition hover:border-brand-400 hover:bg-white"
              >
                Så fungerar det
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink-700">
              {["Kostnadsfri förfrågan", "Svar normalt inom en arbetsdag", "Tydligt besked om nästa steg"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 text-brand-600">
                      <circle cx="10" cy="10" r="9" fill="currentColor" opacity=".12" />
                      <path d="m6.5 10 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <AnatomyHeroVisual />
        </div>
      </section>

      <div className="content-shell">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <article id="sa-fungerar-det" className="article-body readable-card scroll-mt-24 p-6 sm:p-8">
              <h2 className="article-section-title text-2xl font-bold">Så fungerar privat MR</h2>
              <p className="mt-3">
                MR, magnetkamera eller magnetröntgen är samma typ av undersökning. Den använder ett
                starkt magnetfält och radiovågor – inte joniserande strålning – och används bland
                annat för att avbilda mjukdelar, leder, diskar, nervstrukturer och vissa organ.
              </p>
              <ol className="mt-6 space-y-4">
                {steps.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>
                      <strong className="text-ink-900">{s.title}</strong>
                      <span className="block text-ink-700">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Du får inte bara ett MR-utlåtande
              </h2>
              <p className="mt-3">
                Många får sitt radiologiska utlåtande utan att någon går igenom vad det faktiskt
                betyder för just deras besvär. Efter MR-undersökningen går därför en specialistläkare i ortopedi
                igenom MR-svaret med dig, förklarar fynden och hjälper dig vidare med nästa steg.
              </p>
              <p className="mt-4">
                Det är viktigt att skilja på de två delarna:{" "}
                <strong>röntgenläkaren (radiologen)</strong> granskar bilderna och skriver det
                radiologiska utlåtandet, medan <strong>specialistläkaren</strong> gör den kliniska
                bedömningen av vad resultatet innebär i förhållande till dina symtom, din
                sjukdomshistoria och en undersökning av dig.
              </p>
              <p className="mt-4">
                Gäller besvären rygg, knä eller rörelseapparaten görs genomgången av{" "}
                <Link
                  href="/lakare/masoud-sorkhabi"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Dr. Masoud Sorkhabi
                </Link>
                , specialist i ortopedi och ryggkirurgi. Rör besvären andra delar av kroppen kan en
                annan specialistkompetens vara mer relevant, och då får du besked om det.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Behöver du remiss till MR?
              </h2>
              <p className="mt-3">
                Du behöver inte själv ha ordnat en remiss innan du hör av dig. En läkare bedömer dina
                uppgifter och kan utfärda remiss när det behövs. Om remiss krävs beror på
                undersökningen och på den röntgenmottagning som utför den – vissa mottagningar kräver
                en färdig läkarremiss.
              </p>
              <p className="mt-4">
                En djupare genomgång finns i guiden om{" "}
                <Link href={UTAN_REMISS} className="font-semibold text-brand-700 hover:underline">
                  MR utan remiss
                </Link>
                .
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                MR är inte alltid rätt undersökning
              </h2>
              <p className="mt-3">
                Mer bilddiagnostik är inte automatiskt bättre. Ibland ger en klinisk undersökning,
                vanlig röntgen eller ultraljud mer användbar information, och MR visar ibland
                förändringar som inte är orsaken till besvären. Därför avgörs det av den medicinska
                bedömningen om MR är relevant för dig – och vilken kroppsdel som i så fall bör
                undersökas.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Viktigt inför undersökningen
              </h2>
              <p className="mt-3">
                Har du pacemaker, elektroniskt implantat, metallsplitter eller annan metall i kroppen
                måste mottagningen få veta det före undersökningen. Utgå inte själv från att ett
                implantat är säkert – låt mottagningen bedöma det.
              </p>
              <p className="mt-4">
                Vid plötsliga eller allvarliga symtom ska du söka akut vård. Ring 112 vid ett
                livshotande tillstånd.
              </p>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor om privat MR</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-ink-900">Läs mer om MR</h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href={COST} className="font-semibold text-brand-700 hover:underline">
                      Privat MR – kostnad, väntetid och magnetkamera
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={UTAN_REMISS}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      MR utan remiss – så fungerar privat magnetröntgen
                    </Link>
                  </li>
                  <li>
                    <Link href={MR_RYGG} className="font-semibold text-brand-700 hover:underline">
                      Privat MR rygg – remiss, undersökning och bokning
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/artiklar/mr-kna-vad-visar"
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      MR knä – vad visar magnetkameran?
                    </Link>
                  </li>
                </ul>
              </div>
            </article>

            <aside id="boka-privat-mr" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Skicka förfrågan om privat MR</h2>
                <p className="mt-1 text-sm text-ink-600">
                  MR för besvär från rörelseapparaten. Efter undersökningen går en specialistläkare
                  i ortopedi igenom MR-svaret och hjälper dig vidare.
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Det kostar inget att skicka en förfrågan. Beskriv dina besvär och vilken kroppsdel det
                  gäller, så återkommer vi med besked.
                </p>
                <div className="mt-6">
                  <LeadForm defaultSpecialty="privat-mr" />
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
            name: "Boka privat MR",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Privat MR – bedömning, remiss vid behov och undersökning på röntgenmottagning",
            serviceType: "Bokningsförfrågan",
            provider: { "@id": `${site.url}/#organization` },
            url: abs(PATH),
            description:
              "Via Specialistdirekt kan du skicka en förfrågan om privat MR vid besvär från rörelseapparaten – rygg, knä, axel och höft. En läkare gör en medicinsk bedömning och kan utfärda remiss när det behövs. Magnetkameraundersökningen utförs på röntgenmottagning och en specialistläkare i ortopedi går därefter igenom MR-svaret med patienten.",
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
