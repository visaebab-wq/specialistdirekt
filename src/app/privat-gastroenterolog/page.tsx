import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose } from "@/components/RichText";
import { LeadForm } from "@/components/LeadForm";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import type { Faq } from "@/lib/faq";
import { PageVisual } from "@/components/PageVisual";
import { getVisualDimensions } from "@/lib/medical-visuals";

const visual = {
  src: "/page-visuals/static-privat-gastroenterolog.webp",
  alt: "Privat gastroenterolog - realistisk vårdbild med människa i specialistmottagning",
};

export const metadata: Metadata = {
  title: "Privat gastroenterolog – specialist på mage och tarm",
  description:
    "Träffa en privat gastroenterolog utan remiss. Vilka besvär en mag- och tarmspecialist utreder, hur utredningen går till och vad som styr väntetiden.",
  alternates: { canonical: "/privat-gastroenterolog" },
  openGraph: {
    type: "article",
    title: "Privat gastroenterolog – specialist på mage och tarm",
    description:
      "Träffa en privat gastroenterolog utan remiss. Vilka besvär en mag- och tarmspecialist utreder och hur utredningen går till.",
    url: "/privat-gastroenterolog",
    images: [{ url: visual.src, alt: visual.alt, ...getVisualDimensions(visual.src) }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: visual.src, alt: visual.alt }],
  },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Privat gastroenterolog", path: "/privat-gastroenterolog" },
];

const faqs: Faq[] = [
  {
    question: "Kan jag träffa en gastroenterolog utan remiss?",
    answer:
      "Som självbetalande kan du oftast kontakta en privat mottagning direkt, utan remiss. Har du en sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast en remiss från vårdcentralen. Vad som gäller varierar mellan mottagningar – du får besked om vad som gäller när du skickar en förfrågan.",
  },
  {
    question: "Vad kostar ett besök hos en privat gastroenterolog?",
    answer:
      "Priser varierar mellan mottagningar och beror bland annat på om det är ett nybesök eller återbesök och vilka undersökningar som ingår. Konsultation, provtagning och eventuell endoskopi prissätts ofta separat. Be alltid mottagningen om ett samlat pris i förväg och kontrollera vad som ingår.",
  },
  {
    question: "Vad är skillnaden mellan en magspecialist och en gastroenterolog?",
    answer:
      "Det är i praktiken samma sak. Gastroenterolog är den formella titeln, medan magspecialist, mag- och tarmläkare och tarmspecialist är vardagliga benämningar på samma läkare som utreder besvär i mage, tarm, lever och matsmältning.",
  },
  {
    question: "Vilka symtom bör utredas av en mag- och tarmspecialist?",
    answer:
      "Långvariga eller återkommande besvär bör bedömas – till exempel magsmärta, uppblåsthet, ändrade avföringsvanor, långvarig diarré eller förstoppning, halsbränna som inte ger med sig, sväljningssvårigheter eller oförklarlig viktnedgång. Blod i avföringen bör alltid tas på allvar.",
  },
  {
    question: "Kan en gastroenterolog hjälpa vid IBS?",
    answer:
      "Ja. IBS (känslig tarm) är en av de vanligaste anledningarna att söka en gastroenterolog. Specialisten kan bekräfta diagnosen, utesluta andra orsaker och tillsammans med dig lägga upp en plan för att hantera besvären.",
  },
  {
    question: "Hur snabbt kan jag få en tid hos en privat specialist?",
    answer:
      "Privata tider kan ofta erbjudas snabbare än regionfinansierad vård, men exakt väntetid varierar mellan mottagningar och beror på efterfrågan. Vi kan inte garantera en viss tid, men du får besked om den tidigaste tid som finns.",
  },
];

export default function PrivatGastroenterologPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <p className="internal-hero-kicker mt-6">Mage &amp; tarm</p>
          <h1 className="internal-hero-title">Privat gastroenterolog – specialist på mage och tarm</h1>
          <p className="internal-hero-text">
            En gastroenterolog utreder och behandlar besvär i mage, tarm, lever och matsmältning.
            Här går vi igenom vad specialisten gör, när du bör söka, hur det fungerar utan remiss
            och vad vården kan kosta – så att du kan ta nästa steg med rätt förväntningar.
          </p>
          <PageVisual visual={visual} className="mt-10" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">Vad gör en gastroenterolog?</h2>
            <Prose
              paragraphs={[
                "En **gastroenterolog** är en specialistläkare inom mag- och tarmsjukdomar. Området kallas ofta med vardagliga ord: **magspecialist**, **mag- och tarmspecialist**, **mag tarmspecialist**, **tarmspecialist** eller **mag- och tarmläkare** syftar alla på samma sak. Vissa mottagningar beskriver sig som **gastroklinik**.",
                "En gastroenterolog utreder hela matsmältningskanalen – från matstrupe och magsäck till tunntarm, tjocktarm och ändtarm – samt lever, gallvägar och bukspottkörtel. Arbetet börjar med ett samtal om dina besvär och en kroppsundersökning, och kompletteras vid behov med prover, bilddiagnostik eller endoskopiska undersökningar som gastroskopi och koloskopi.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När bör du träffa en mag- och tarmspecialist?
            </h2>
            <Prose
              paragraphs={[
                "Många magbesvär är ofarliga och går över av sig själva. Men när besvären är långvariga, återkommande eller påverkar din vardag kan en specialistbedömning hjälpa dig vidare. Vanliga anledningar att söka är:",
              ]}
            />
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Långvarig eller återkommande magont</li>
              <li>Uppblåst mage som inte ger med sig</li>
              <li>Ändrade avföringsvanor</li>
              <li>Blod i avföringen</li>
              <li>Långvarig diarré</li>
              <li>Långvarig förstoppning</li>
              <li>Halsbränna och sura uppstötningar (reflux)</li>
              <li>Sväljningssvårigheter</li>
              <li>Oförklarlig viktnedgång</li>
            </ul>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Privat gastroenterolog utan remiss – så fungerar det
            </h2>
            <Prose
              paragraphs={[
                "Vägen in i vården ser olika ut beroende på hur besöket finansieras. Som **självbetalande** patient kan du oftast kontakta en privat mottagning direkt, utan att först gå via vårdcentralen. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som avgör vad som täcks och ibland kräver en bedömning först. Inom **regionfinansierad vård** krävs vanligtvis en remiss och besöket följer regionens regler och avgifter.",
                "Reglerna kan skilja sig åt mellan mottagningar, så kontrollera alltid vad som gäller innan du bokar. Du får besked om vad som gäller när du skickar en förfrågan.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vad kostar en privat gastroenterolog?
            </h2>
            <Prose
              paragraphs={[
                "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Det som påverkar kostnaden är bland annat om det gäller ett nybesök eller ett återbesök, hur lång konsultationen är och vilka undersökningar som behövs. Konsultation och utredningar prissätts ofta **separat**.",
                "Laboratorieprover, bilddiagnostik och endoskopiska undersökningar som **gastroskopi** och **koloskopi** kan tillkomma utöver själva besöket. Vad som ingår skiljer sig mellan mottagningar – be därför alltid om ett samlat pris i förväg. Läs mer om kostnaderna för de vanligaste undersökningarna på våra sidor om [privat gastroskopi](/privat-gastroskopi) och [privat koloskopi](/privat-koloskopi), samt i vår guide om [vad en gastroenterolog kostar](/artiklar/privat-gastroenterolog-kostnad).",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Undersökningar hos en gastroenterolog
            </h2>
            <h3 className="mt-6 text-xl font-bold text-ink-900">Gastroskopi</h3>
            <Prose
              paragraphs={[
                "Vid en gastroskopi undersöks matstrupe, magsäck och tolvfingertarm med en böjlig kamera, och vävnadsprover kan tas vid behov. Undersökningen är aktuell vid till exempel envis halsbränna, misstänkt magsår eller sväljningssvårigheter. Läs mer på vår sida om [privat gastroskopi](/privat-gastroskopi).",
              ]}
            />
            <h3 className="mt-6 text-xl font-bold text-ink-900">Koloskopi</h3>
            <Prose
              paragraphs={[
                "Vid en koloskopi undersöks tjocktarm och ändtarm, ofta för att utreda blod i avföringen, ändrade avföringsvanor eller misstänkt inflammation. Ibland kan polyper tas bort under undersökningen. Läs mer på vår sida om [privat koloskopi](/privat-koloskopi).",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vanliga besvär och diagnoser
            </h2>
            <h3 className="mt-6 text-xl font-bold text-ink-900">IBS – känslig tarm</h3>
            <Prose
              paragraphs={[
                "IBS (irritable bowel syndrome) är en av de vanligaste orsakerna att söka en gastroenterolog, och många letar specifikt efter en **IBS-specialist** eller **IBS-läkare** för en **IBS-utredning**. Besvären kan vara buksmärta, uppblåsthet och växlande avföringsvanor. Specialisten bekräftar diagnosen, utesluter andra orsaker och hjälper dig att hitta strategier som lindrar.",
              ]}
            />
            <h3 className="mt-6 text-xl font-bold text-ink-900">
              IBD – Crohns sjukdom och ulcerös kolit
            </h3>
            <Prose
              paragraphs={[
                "IBD är samlingsnamnet för inflammatoriska tarmsjukdomar, framför allt Crohns sjukdom och ulcerös kolit. Till skillnad från IBS handlar det om en kronisk inflammation i tarmen som ofta kräver uppföljning hos specialist. Symtom som blod i avföringen, långvarig diarré och viktnedgång bör alltid utredas.",
              ]}
            />
            <h3 className="mt-6 text-xl font-bold text-ink-900">Reflux och halsbränna</h3>
            <Prose
              paragraphs={[
                "Sura uppstötningar och halsbränna beror ofta på att magsyra kommer upp i matstrupen. Enstaka besvär är vanliga, men återkommande reflux som inte lindras av egenvård bör bedömas, ibland med gastroskopi.",
              ]}
            />
            <h3 className="mt-6 text-xl font-bold text-ink-900">Celiaki och glutenrelaterade besvär</h3>
            <Prose
              paragraphs={[
                "Celiaki är en autoimmun sjukdom där gluten skadar tunntarmens slemhinna, och den bekräftas med blodprov och oftast vävnadsprov via gastroskopi. Celiaki är **inte** detsamma som all glutenintolerans eller glutenkänslighet – flera olika tillstånd kan ge liknande besvär, och det är därför utredningen är viktig för att veta vad som faktiskt ligger bakom.",
              ]}
            />
            <h3 className="mt-6 text-xl font-bold text-ink-900">Leversjukdomar</h3>
            <Prose
              paragraphs={[
                "En gastroenterolog kan också utreda vissa leverbesvär, och ordet **leverspecialist** används ibland i det sammanhanget. Alla leversjukdomar handläggs dock inte av alla gastroenterologer – mer komplexa tillstånd kan kräva särskild kompetens. Avvikande leverprover eller misstänkt leversjukdom bör bedömas medicinskt.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Uppblåst mage och andra vanliga symtom
            </h2>
            <Prose
              paragraphs={[
                "Uppblåsthet är ett av de vanligaste magbesvären och beror ofta på gas, kost eller tarmfunktion. Oftast är det ofarligt, men ihållande besvär eller besvär tillsammans med varningssymtom bör utredas. Vi har samlat orsaker, egenvårdstips och råd om när du bör söka vård i artikeln [uppblåst mage](/artiklar/uppblast-mage).",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När ska du söka vård direkt?
            </h2>
            <div className="warning-card mt-4 p-5">
              <p className="text-ink-800">
                Vissa symtom ska inte vänta på en planerad specialisttid. Sök akut vård eller ring
                112 vid:
              </p>
              <ul className="mt-3 space-y-2 text-ink-800">
                <li>Kraftig eller ihållande buksmärta</li>
                <li>Större mängder blod i avföringen</li>
                <li>Svart eller tjärliknande avföring</li>
                <li>Blodiga kräkningar</li>
                <li>Hög feber tillsammans med buksmärta</li>
                <li>Att du inte kan svälja alls</li>
                <li>Svimning, kraftig svaghet eller tecken på påverkad cirkulation</li>
                <li>Akut och snabb försämring</li>
              </ul>
              <p className="mt-3 text-ink-800">
                Vid akut fara – ring 112 eller sök akutmottagning. Är du osäker på icke-akuta
                besvär, ring 1177 eller kontakta en vårdcentral. Skicka aldrig en akut situation
                via vårt formulär.
              </p>
            </div>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Så hjälper Specialistdirekt dig
            </h2>
            <Prose
              paragraphs={[
                "Det kostar inget att skicka en bokningsförfrågan via Specialistdirekt. Du beskriver ditt behov och får besked om möjlig tid och pris för privat specialistvård inom mage och tarm. Diagnos och medicinsk bedömning görs av läkaren vid besöket. Specialistdirekt är inte en akutverksamhet.",
                "Vill du hellre läsa mer om specialiteten först? Se vår översikt om [gastroenterologi](/specialiteter/gastroenterolog).",
              ]}
            />
            <div className="mt-6">
              <LeadForm defaultSpecialty="gastroenterolog" />
            </div>

            <MedicalDisclaimer />
          </article>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-ink-900">Vanliga frågor</h2>
            <div className="mt-6">
              <FaqList items={faqs} />
            </div>
          </section>
        </div>
      </div>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
