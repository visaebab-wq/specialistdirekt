import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose } from "@/components/RichText";
import { LeadForm } from "@/components/LeadForm";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import type { Faq } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Privat gastroskopi – pris, väntetid och utan remiss",
  description:
    "Boka privat gastroskopi utan remiss. Läs om pris, väntetid, förberedelser och hur undersökningen går till – och hitta en mottagning som passar dig.",
  alternates: { canonical: "/privat-gastroskopi" },
  openGraph: {
    type: "article",
    title: "Privat gastroskopi – pris, väntetid och utan remiss",
    description:
      "Boka privat gastroskopi utan remiss. Läs om pris, väntetid, förberedelser och hur undersökningen går till.",
    url: "/privat-gastroskopi",
  },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Privat gastroskopi", path: "/privat-gastroskopi" },
];

const faqs: Faq[] = [
  {
    question: "Kan jag boka gastroskopi utan remiss?",
    answer:
      "Som självbetalande kan du oftast boka en gastroskopi direkt hos en privat mottagning, utan remiss. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Vad som gäller varierar mellan mottagningar – kontrollera i förväg.",
  },
  {
    question: "Vad kostar en privat gastroskopi?",
    answer:
      "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Kostnaden kan påverkas av läkarkonsultation, eventuell lugnande medicin, provtagning, analys av vävnadsprover och uppföljning. Be alltid mottagningen om ett samlat pris i förväg och fråga vad som ingår.",
  },
  {
    question: "Gör en gastroskopi ont?",
    answer:
      "De flesta upplever inte undersökningen som smärtsam, men den kan kännas obehaglig. Tryckkänsla och kväljningar kan förekomma. Bedövningsspray i svalget och ibland lugnande medicin gör undersökningen lättare. Hur du upplever den är individuellt.",
  },
  {
    question: "Hur lång är väntetiden för en privat gastroskopi?",
    answer:
      "Privata tider kan ofta erbjudas snabbare än inom regionfinansierad vård, men exakt väntetid varierar mellan mottagningar och beror på efterfrågan. Vi kan inte garantera en viss tid, men hjälper dig att hitta en mottagning.",
  },
  {
    question: "Hur förbereder jag mig inför en gastroskopi?",
    answer:
      "Du behöver vanligtvis fasta enligt mottagningens instruktioner och ibland justera vissa mediciner. Blodförtunnande och diabetesmediciner ska stämmas av med mottagningen i förväg. Har du fått lugnande medicin bör du inte köra bil efteråt. Följ alltid klinikens exakta instruktioner.",
  },
];

export default function PrivatGastroskopiPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <p className="internal-hero-kicker mt-6">Undersökning</p>
          <h1 className="internal-hero-title">Privat gastroskopi – utan remiss</h1>
          <p className="internal-hero-text">
            En gastroskopi undersöker matstrupe, magsäck och tolvfingertarm med en böjlig kamera.
            Här går vi igenom när undersökningen behövs, hur den går till, förberedelser, pris och
            väntetid – och hur du hittar en privat mottagning.
          </p>
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">Vad är en gastroskopi?</h2>
            <Prose
              paragraphs={[
                "En **gastroskopi** är en undersökning av övre delen av magtarmkanalen: **matstrupe**, **magsäck** och **tolvfingertarm** (tarmens första del). Läkaren för ner ett tunt, böjligt instrument med en kamera i änden genom munnen, och kan se slemhinnan direkt på en skärm.",
                "Vid behov kan **vävnadsprover** (biopsier) tas för analys, till exempel vid misstanke om inflammation eller celiaki. Hur lång tid ett besök tar varierar, men själva kameraundersökningen är ofta kortvarig. Exakt tid går inte att lova på förhand eftersom det beror på fynd och mottagning.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När behövs en gastroskopi?
            </h2>
            <Prose
              paragraphs={[
                "En gastroskopi kan vara aktuell när symtom från övre magtarmkanalen är långvariga eller behöver utredas närmare. Vanliga anledningar är:",
              ]}
            />
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Långvariga besvär i övre delen av magen</li>
              <li>Reflux eller halsbränna som inte förbättras</li>
              <li>Sväljningssvårigheter</li>
              <li>Misstänkt magsår</li>
              <li>Misstänkt inflammation i magsäck eller matstrupe</li>
              <li>Oförklarligt illamående</li>
              <li>Utredning av celiaki när det är medicinskt motiverat</li>
              <li>Blodbrist eller misstanke om blödning när det är kliniskt relevant</li>
            </ul>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Gastroskopi utan remiss – så fungerar det privat
            </h2>
            <Prose
              paragraphs={[
                "Som **självbetalande** kan du ofta boka en gastroskopi direkt hos en privat mottagning utan remiss. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som avgör vad som täcks. Inom **regionfinansierad vård** krävs oftast en remiss och undersökningen följer regionens rutiner. Reglerna varierar, så kontrollera alltid vad som gäller hos den mottagning du väljer.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vad kostar en privat gastroskopi?
            </h2>
            <Prose
              paragraphs={[
                "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Vi anger inga fasta belopp här, eftersom kostnaden skiljer sig åt beroende på mottagning och vad som ingår. Be alltid mottagningen om ett samlat pris i förväg.",
                "Priset kan bero på flera delar: läkarkonsultationen, eventuell **lugnande medicin** (sedering), **vävnadsprovtagning**, **analys av prover** (patologi), övriga provsvar och en eventuell uppföljning. Fråga specifikt vad som ingår i det pris du får, så att du kan jämföra mottagningar rättvist.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Väntetid för gastroskopi – privat jämfört med offentlig vård
            </h2>
            <Prose
              paragraphs={[
                "En av de vanligaste anledningarna att välja en privat gastroskopi är väntetiden. Privata tider kan ofta erbjudas snabbare än inom regionfinansierad vård, men hur mycket snabbare varierar mellan mottagningar och beror på efterfrågan. Vi lovar ingen specifik tid, men hjälper dig att hitta en mottagning som kan ta emot dig.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">Så går undersökningen till</h2>
            <Prose
              paragraphs={[
                "Inför undersökningen får du oftast en **bedövningsspray** i svalget, och ibland erbjuds **lugnande medicin**. Ett litet **bitskydd** placeras mellan tänderna för att skydda instrumentet och dina tänder. Läkaren för sedan ner det böjliga instrumentet genom munnen och ner i matstrupen.",
                "Du kan **andas som vanligt** under hela undersökningen. Tillfälligt obehag, tryckkänsla eller kväljningsreflex kan förekomma, men de flesta upplever undersökningen som hanterbar. Efteråt får du vila en stund, särskilt om du fått lugnande medicin.",
                "Efter undersökningen kan svalget kännas lite bedövat en kort stund, och du bör vänta med att äta och dricka tills bedövningen släppt enligt mottagningens råd. Har du fått lugnande medicin behöver du någon som följer dig hem, och du bör inte köra bil eller fatta viktiga beslut samma dag. Vissa fynd, som synliga förändringar, kan läkaren berätta om direkt, medan svar på vävnadsprover tar längre tid. När och hur du får dina provsvar varierar mellan mottagningar – fråga gärna redan vid besöket hur återkopplingen går till.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Förberedelser inför gastroskopi
            </h2>
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Fasta enligt mottagningens instruktioner (magen behöver vara tom)</li>
              <li>Följ mottagningens råd om mediciner</li>
              <li>Diabetes- och blodförtunnande mediciner ska stämmas av med vårdgivaren i förväg</li>
              <li>Ingen bilkörning efter lugnande medicin – ordna transport</li>
              <li>Följ alltid den mottagande klinikens exakta instruktioner</li>
            </ul>
            <Prose
              paragraphs={[
                "Instruktionerna kan variera mellan mottagningar. Ersätt aldrig klinikens specifika råd med en allmän regel – det är mottagningen som känner till just din undersökning.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">När ska du söka vård direkt?</h2>
            <div className="warning-card mt-4 p-5">
              <p className="text-ink-800">Sök akut vård eller ring 112 vid:</p>
              <ul className="mt-3 space-y-2 text-ink-800">
                <li>Blodiga kräkningar</li>
                <li>Svart eller tjärliknande avföring</li>
                <li>Att du inte kan svälja alls</li>
                <li>Kraftig bröst- eller buksmärta</li>
                <li>Andningssvårigheter</li>
                <li>Akut och snabb försämring</li>
              </ul>
              <p className="mt-3 text-ink-800">
                Vid akuta symtom – ring 112 eller sök akutmottagning. Använd aldrig vårt formulär i
                en akut situation.
              </p>
            </div>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Hitta mottagning för gastroskopi
            </h2>
            <Prose
              paragraphs={[
                "Specialistdirekt är en kostnadsfri förmedlingstjänst. Du beskriver ditt behov, så hjälper vi dig att hitta en privat mottagning för gastroskopi. Tillgång och pris beror på mottagningen, och vi ger ingen medicinsk rådgivning. Vill du läsa mer om specialisten bakom undersökningen? Se [privat gastroenterolog](/privat-gastroenterolog). Ska även tjocktarmen undersökas kan en [koloskopi](/privat-koloskopi) vara aktuell.",
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
