import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getSpecialty } from "@/lib/specialties";
import { getCitySpecialtyVisual } from "@/lib/medical-visuals";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PageVisual } from "@/components/PageVisual";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

const PATH = "/privat-koloskopi/goteborg";
const COST = "/artiklar/privat-koloskopi-kostnad";
const abs = (p: string) => `${site.url}${p}`;

export const metadata: Metadata = {
  title: "Privat koloskopi Göteborg – tidsförfrågan och information",
  description:
    "Söker du privat koloskopi i Göteborg? Skicka en tidsförfrågan via Specialistdirekt. Så går undersökningen till, förberedelser, sedering och vad du behöver veta.",
  keywords: [
    "privat koloskopi Göteborg",
    "koloskopi Göteborg",
    "koloskopi privat Göteborg",
    "boka koloskopi Göteborg",
    "tarmundersökning Göteborg",
    "koloskopi Göteborg pris",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Privat koloskopi Göteborg – tidsförfrågan och information",
    description:
      "Söker du privat koloskopi i Göteborg? Skicka en tidsförfrågan via Specialistdirekt.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    question: "Kan jag boka privat koloskopi i Göteborg?",
    answer:
      "Ja. Via Specialistdirekt kan du skicka en tidsförfrågan för privat koloskopi i Göteborg. Du beskriver kort dina besvär, så återkommer vi med information om möjlig tid, aktuellt pris och vad som ingår innan du bestämmer dig. Specialistdirekt är en förmedlingstjänst och inte vårdgivare.",
  },
  {
    question: "Var kan jag göra privat koloskopi i Göteborg?",
    answer:
      "Du kan skicka en tidsförfrågan här på sidan, så förmedlar vi kontakt till en ansluten mottagning i Göteborgsområdet. Du får besked om tid, pris och vad som ingår innan du väljer att gå vidare.",
  },
  {
    question: "Vad kostar privat koloskopi i Göteborg?",
    answer:
      "Du får information om aktuellt pris och vad som ingår innan du bestämmer dig. Vad som kan påverka priset – till exempel om vävnadsprov (biopsi) eller borttagning av polyper blir aktuellt – går vi igenom i vår guide om vad privat koloskopi kan kosta.",
  },
  {
    question: "Hur snabbt kan jag få tid för privat koloskopi?",
    answer:
      "Privata tider kan ofta erbjudas snabbare än i den offentliga vården, men exakt väntetid varierar beroende på mottagning och efterfrågan. Vi kan inte utlova en viss tid, men återkommer så snart som möjligt med besked om möjlig tid.",
  },
  {
    question: "Kan jag boka koloskopi utan remiss?",
    answer:
      "Det beror på den aktuella mottagningens bokningsrutiner. Du får information om ett eventuellt remisskrav innan du går vidare. Som självbetalande kan du hos många privata mottagningar boka mer direkt, medan regionfinansierad vård oftast kräver remiss.",
  },
  {
    question: "Behöver jag träffa en gastroenterolog före koloskopin?",
    answer:
      "Ibland görs en läkarbedömning först, ibland bokas undersökningen direkt – det beror på dina besvär och mottagningens rutiner. Du får besked om vad som gäller i ditt fall innan bokningen bekräftas.",
  },
  {
    question: "Hur går en koloskopi till?",
    answer:
      "Efter tarmrensning (laxering) undersöker läkaren tjocktarmen med ett böjligt instrument (koloskop) med kamera. Vid behov kan läkaren ta vävnadsprov. Själva undersökningen tar ofta ungefär 20–45 minuter, men tiden varierar.",
  },
  {
    question: "Gör koloskopi ont, och kan jag få lugnande?",
    answer:
      "Upplevelsen varierar från person till person; en del känner tryck eller kramp, andra tycker att det går bra. Vilken smärtlindring eller sedering som kan erbjudas beror på mottagningens rutiner och din medicinska situation. Du får information om alternativen innan undersökningen bokas.",
  },
  {
    question: "Kan man bli sövd vid koloskopi?",
    answer:
      "Alternativen skiljer sig mellan mottagningar – från ingen eller lätt lugnande till djupare sedering. Vi kan inte utlova narkos. Du får besked om vilka alternativ som finns hos den aktuella mottagningen innan du bokar.",
  },
  {
    question: "Kan polyper tas bort under koloskopin?",
    answer:
      "Polyper kan i vissa fall tas bort under en koloskopi, men om det är möjligt beror på fyndet och på den aktuella mottagningens rutiner. Du får information om vad som gäller innan du bestämmer dig.",
  },
  {
    question: "Kan läkaren ta biopsi (vävnadsprov) samtidigt?",
    answer:
      "Ja, läkaren kan ta vävnadsprov när det är medicinskt motiverat. Provet skickas då för analys (patologi). Om biopsi eller analys påverkar priset får du information om det innan bokningen bekräftas.",
  },
  {
    question: "När får jag svar efter koloskopin?",
    answer:
      "En del fynd kan läkaren se direkt under undersökningen och berätta om på plats. Om vävnadsprov tas skickas de på analys, och svaret på det kommer senare. Hur lång tid analysen tar varierar mellan mottagningar.",
  },
  {
    question: "Hur förbereder jag mig inför koloskopin?",
    answer:
      "Tarmen behöver tömmas med laxermedel enligt mottagningens instruktioner, och du får kostråd inför undersökningen. Tar du blodförtunnande läkemedel är det särskilt viktigt att informera vårdgivaren – sluta aldrig med läkemedel på egen hand. Följ alltid mottagningens exakta instruktioner.",
  },
  {
    question: "Kan jag köra bil efter koloskopin?",
    answer:
      "Det beror särskilt på om du fått lugnande/sedering. Har du fått det bör du inte köra bil efteråt. Följ mottagningens instruktioner om vad som gäller för dig.",
  },
  {
    question: "Kan jag använda privat sjukvårdsförsäkring för koloskopi?",
    answer:
      "Det beror på ditt försäkringsbolag och dina villkor. Kontakta bolaget för godkännande först. Vi hjälper dig att reda ut vad som gäller innan bokningen.",
  },
  {
    question: "Jag har blod i avföringen – behöver jag koloskopi?",
    answer:
      "Blod i avföringen bör alltid bedömas av vården, men det avgör en läkare – inte den här sidan. Läs mer i vår guide om [blod i avföringen](/artiklar/blod-i-avforingen-gastroenterolog-koloskopi-akut-vard). Vid större blödning, svart avföring eller kraftig påverkan: sök vård akut.",
  },
];

export default function KoloskopiGoteborgPage() {
  const gastro = getSpecialty("gastroenterolog");
  const visual = gastro
    ? getCitySpecialtyVisual(gastro, "goteborg", "Göteborg")
    : { src: "/real-medical/gastroenterology.webp", alt: "Privat koloskopi i Göteborg" };

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Privat koloskopi", path: "/privat-koloskopi" },
    { name: "Göteborg", path: PATH },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6">
            <p className="internal-hero-kicker">Gastroenterologi · Göteborg</p>
            <h1 className="internal-hero-title">Privat koloskopi i Göteborg</h1>
          </div>
          <p className="internal-hero-text">
            Söker du privat koloskopi i Göteborg? Via Specialistdirekt kan du skicka en tidsförfrågan
            för privat koloskopi i Göteborg. Du får information om möjlig tid, aktuellt pris och vad
            som ingår innan du bestämmer dig.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <article className="article-body readable-card p-6 sm:p-8">
              <h2 className="article-section-title text-2xl font-bold">Vad är en koloskopi?</h2>
              <p className="mt-3">
                En koloskopi är en undersökning av tjocktarmen med ett böjligt instrument (koloskop)
                som har en liten kamera. Undersökningen används för att titta på tarmslemhinnan,
                bedöma orsaken till mag- och tarmbesvär och vid behov ta vävnadsprov. Den utförs av
                läkare med kompetens inom gastroenterologi.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                När kan koloskopi bli aktuellt?
              </h2>
              <p className="mt-3">
                Om en koloskopi är aktuell avgörs alltid av en läkare utifrån dina besvär. Exempel på
                situationer där en läkare kan överväga koloskopi:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "blod i avföringen",
                  "förändrade avföringsvanor",
                  "långvarig diarré",
                  "misstänkta polyper",
                  "uppföljning av vissa tidigare fynd",
                  "oförklarliga mag- och tarmsymtom där en läkare bedömer att koloskopi är motiverad",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-ink-700">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Har du blod i avföringen? Läs vår guide om{" "}
                <Link
                  href="/artiklar/blod-i-avforingen-gastroenterolog-koloskopi-akut-vard"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  blod i avföringen – vilken läkare
                </Link>
                . Sidan ställer ingen diagnos och avgör inte om just du behöver en koloskopi.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Hur går en koloskopi till?
              </h2>
              <p className="mt-3">
                Efter att tarmen tömts (laxering) för läkaren försiktigt in koloskopet via ändtarmen
                och undersöker tjocktarmen med hjälp av kameran. När det är medicinskt motiverat kan
                läkaren ta vävnadsprov. Själva undersökningen tar ofta ungefär 20–45 minuter, men
                tiden varierar. Exakt hur det går till hos den aktuella mottagningen får du besked om
                inför besöket.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Hur förbereder man sig inför koloskopi?
              </h2>
              <p className="mt-3">Vanliga delar i förberedelsen:</p>
              <ul className="mt-4 space-y-2">
                {[
                  "tarmrensning med laxermedel enligt mottagningens instruktioner",
                  "kostråd dagarna före och fasta enligt anvisning",
                  "genomgång av dina läkemedel med mottagningen",
                  "särskilt viktigt: informera om du tar blodförtunnande läkemedel",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-ink-700">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Sluta aldrig med läkemedel på egen hand – informera vårdgivaren och följ dina
                individuella instruktioner. Följ alltid mottagningens exakta anvisningar.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Gör koloskopi ont?</h2>
              <p className="mt-3">
                Upplevelsen skiljer sig från person till person. En del känner tryck eller
                krampliknande obehag när instrumentet förs fram, medan andra tycker att det går bra.
                Det finns ofta möjlighet till smärtlindring eller lugnande, men vilka alternativ som
                erbjuds beror på mottagningens rutiner och din medicinska situation.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Kan man få lugnande vid koloskopi?
              </h2>
              <p className="mt-3">
                Vilken smärtlindring eller sedering som kan erbjudas beror på mottagningens rutiner
                och din medicinska situation. Du får information om alternativen innan undersökningen
                bokas.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Polyper och biopsi vid koloskopi
              </h2>
              <p className="mt-3">
                Under en koloskopi kan läkaren ibland <strong>ta bort polyper</strong> och{" "}
                <strong>ta vävnadsprov (biopsi)</strong> när det är medicinskt motiverat. Provet
                skickas då för analys (patologi), och svaret på det kommer senare. Om just den
                aktuella mottagningen erbjuder polypborttagning, och om biopsi eller analys påverkar
                priset, får du information om innan du bestämmer dig.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Vad kostar privat koloskopi i Göteborg?
              </h2>
              <p className="mt-3">
                Du får information om aktuellt pris och vad som ingår innan du bestämmer dig. Vad som
                kan påverka priset – och skillnaden mellan privat och offentlig väg – går vi igenom i
                guiden om{" "}
                <Link href={COST} className="font-semibold text-brand-700 hover:underline">
                  vad privat koloskopi kan kosta
                </Link>
                .
              </p>

              <div className="warning-card mt-10 p-5 text-sm">
                <strong>Viktigt:</strong> Specialistdirekt ger inte medicinsk rådgivning. Vid större
                blödning, svart avföring, svår buksmärta eller kraftigt påverkat allmäntillstånd –
                sök vård akut eller ring 112. För sjukvårdsrådgivning, ring 1177.
              </div>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Hur får jag tid för privat koloskopi i Göteborg?
              </h2>
              <p className="mt-3">
                Beskriv kort dina besvär i formuläret, så förmedlar Specialistdirekt en tidsförfrågan
                till en ansluten mottagning i Göteborgsområdet. Du får besked om möjlig tid, aktuellt
                pris och vad som ingår innan du bestämmer dig om du vill gå vidare. Det medicinska
                ansvaret ligger hos mottagningen – Specialistdirekt är inte vårdgivare.
              </p>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">
                  Vanliga frågor om privat koloskopi i Göteborg
                </h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-ink-900">Läs mer</h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/privat-koloskopi" className="font-semibold text-brand-700 hover:underline">
                      Privat koloskopi – så fungerar det
                    </Link>
                  </li>
                  <li>
                    <Link href={COST} className="font-semibold text-brand-700 hover:underline">
                      Privat koloskopi: kostnad, väntetid och bokning
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/artiklar/gor-koloskopi-ont"
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      Gör koloskopi ont? Om smärtlindring och lugnande
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/artiklar/forberedelse-infor-koloskopi"
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      Förberedelse inför koloskopi – mat, laxering och råd
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/artiklar/blod-i-avforingen-gastroenterolog-koloskopi-akut-vard"
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      Blod i avföringen – gastroenterolog, koloskopi eller akut vård?
                    </Link>
                  </li>
                </ul>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">
                  Skicka tidsförfrågan för koloskopi i Göteborg
                </h2>
                <p className="mt-1 text-sm text-ink-600">
                  Kostnadsfritt och utan förpliktelser. Du får besked om tid och pris innan du
                  bestämmer dig.
                </p>
                <div className="mt-6">
                  <LeadForm defaultSpecialty="gastroenterolog" />
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
            name: "Privat koloskopi i Göteborg",
            inLanguage: site.lang,
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Förmedling av tidsförfrågan för privat koloskopi i Göteborg",
            serviceType: "Vårdförmedling",
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: "Göteborg" },
            url: abs(PATH),
            description:
              "Specialistdirekt förmedlar en tidsförfrågan för privat koloskopi i Göteborg. Specialistdirekt är en förmedlingstjänst, inte vårdgivare.",
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
