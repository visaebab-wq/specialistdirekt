import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { Prose } from "@/components/RichText";
import { LeadForm } from "@/components/LeadForm";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import type { Faq } from "@/lib/faq";
import { PageVisual } from "@/components/PageVisual";

const visual = {
  src: "/page-visuals/static-privat-koloskopi.webp",
  alt: "Privat koloskopi - realistisk vårdbild med människa och mag-tarmspecialist",
};

export const metadata: Metadata = {
  title: "Privat koloskopi – pris, väntetid och utan remiss",
  description:
    "Boka privat koloskopi utan remiss. Läs om pris, väntetid, laxering och hur undersökningen går till – och hitta en mottagning nära dig.",
  alternates: { canonical: "/privat-koloskopi" },
  openGraph: {
    type: "article",
    title: "Privat koloskopi – pris, väntetid och utan remiss",
    description:
      "Boka privat koloskopi utan remiss. Läs om pris, väntetid, laxering och hur undersökningen går till.",
    url: "/privat-koloskopi",
  },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Privat koloskopi", path: "/privat-koloskopi" },
];

const faqs: Faq[] = [
  {
    question: "Kan jag boka koloskopi utan remiss?",
    answer:
      "Som självbetalande kan du oftast boka en koloskopi direkt hos en privat mottagning, utan remiss. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Reglerna varierar mellan mottagningar – kontrollera i förväg.",
  },
  {
    question: "Vad kostar en privat koloskopi?",
    answer:
      "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Kostnaden kan påverkas av läkarkonsultation, lugnande medicin eller smärtlindring, vävnadsprover, borttagning av polyper, analys av prover och uppföljning. Be alltid mottagningen om ett samlat pris i förväg.",
  },
  {
    question: "Hur lång är väntetiden för en privat koloskopi?",
    answer:
      "Privata tider kan ofta erbjudas snabbare än inom regionfinansierad vård, men exakt väntetid varierar mellan mottagningar och beror på efterfrågan. Vi kan inte garantera en viss tid, men hjälper dig att hitta en mottagning som kan ta emot dig.",
  },
  {
    question: "Gör en koloskopi ont?",
    answer:
      "Undersökningen kan kännas obehaglig och ge kramp eller tryckkänsla när instrumentet förs fram, men de flesta klarar den bra. Lugnande medicin eller smärtlindring erbjuds ofta och gör undersökningen lättare. Hur du upplever den är individuellt.",
  },
  {
    question: "Hur går laxeringen inför koloskopi till?",
    answer:
      "Tarmen måste tömmas och rengöras före undersökningen. Du får ett laxermedel och ett exakt schema från mottagningen, och dricker klara vätskor enligt instruktionerna. En väl genomförd laxering är avgörande för att läkaren ska kunna se tarmens slemhinna ordentligt.",
  },
];

export default function PrivatKoloskopiPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <p className="internal-hero-kicker mt-6">Undersökning</p>
          <h1 className="internal-hero-title">Privat koloskopi – utan remiss</h1>
          <p className="internal-hero-text">
            En koloskopi undersöker tjocktarm och ändtarm med en böjlig kamera. Här går vi igenom
            när den behövs, hur den går till, laxeringen inför undersökningen, pris och väntetid –
            och hur du hittar en privat mottagning.
          </p>
          <PageVisual visual={visual} className="mt-10" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">Vad är en koloskopi?</h2>
            <Prose
              paragraphs={[
                "En **koloskopi** är en undersökning av **ändtarm** och **tjocktarm** med ett böjligt instrument som har en kamera i änden. Läkaren för in instrumentet via ändtarmsöppningen och kan se tarmens slemhinna direkt på en skärm.",
                "Under undersökningen kan **vävnadsprover** tas, och ibland kan **polyper** (små utväxter i tarmen) tas bort direkt. Vilka fynd som görs och vilken åtgärd som blir aktuell beror på de kliniska omständigheterna och bedöms av läkaren på plats.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">När behövs en koloskopi?</h2>
            <Prose
              paragraphs={[
                "En koloskopi kan vara aktuell när symtom från tjocktarmen behöver utredas eller när en känd tarmsjukdom ska följas upp. Vanliga anledningar är:",
              ]}
            />
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Blod i avföringen</li>
              <li>Ändrade avföringsvanor</li>
              <li>Långvarig diarré</li>
              <li>Långvarig förstoppning</li>
              <li>Oförklarlig järnbrist</li>
              <li>Uppföljning av inflammatorisk tarmsjukdom (IBD)</li>
              <li>Misstänkt inflammation</li>
              <li>Ärftlig risk för tarmsjukdom</li>
              <li>Andra symtom där en medicinsk bedömning talar för undersökning</li>
            </ul>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Koloskopi utan remiss – så fungerar det privat
            </h2>
            <Prose
              paragraphs={[
                "Vägen in beror på finansieringen. Som **självbetalande** kan du ofta boka direkt hos en privat mottagning utan remiss. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som avgör vad som täcks. Inom **regionfinansierad vård** krävs oftast en remiss och undersökningen följer regionens rutiner. Kontrollera alltid vad som gäller hos den mottagning du väljer.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vad kostar en privat koloskopi?
            </h2>
            <Prose
              paragraphs={[
                "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Vi anger inga fasta belopp här, eftersom kostnaden skiljer sig åt beroende på mottagning och vad som ingår. Be alltid om ett samlat pris i förväg.",
                "Priset kan bero på flera delar: **läkarkonsultationen**, **lugnande medicin eller smärtlindring**, **vävnadsprovtagning** (biopsi), **borttagning av polyper**, **analys av prover** (patologi) och en eventuell **uppföljning**. Fråga specifikt vad som ingår, så att du kan jämföra mottagningar rättvist.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Väntetid för koloskopi – privat jämfört med offentlig vård
            </h2>
            <Prose
              paragraphs={[
                "Väntetiden är ofta ett avgörande skäl att välja privat. Privata tider kan i många fall erbjudas snabbare än inom regionfinansierad vård, vilket kan vara värdefullt när du vill ha ett besked utan lång väntan. Hur mycket snabbare det går varierar dock mellan mottagningar och beror på efterfrågan – vi lovar ingen specifik tid, men hjälper dig att hitta en mottagning.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">Så går undersökningen till</h2>
            <Prose
              paragraphs={[
                "En koloskopi följer vanligen några typiska steg. Efter förberedelse och laxering för läkaren in det böjliga instrumentet via ändtarmen. **Luft eller koldioxid** används ofta för att vidga tarmen så att slemhinnan syns bättre, vilket kan ge en tillfällig känsla av uppblåsthet.",
                "**Kramp eller tryck** kan förekomma när instrumentet förs fram. **Lugnande medicin eller smärtlindring** erbjuds ofta för att göra undersökningen bekvämare. Hur lång tid undersökningen tar varierar beroende på fynd och eventuella åtgärder som provtagning eller borttagning av polyper. Undvik att förvänta dig exakt samma upplägg överallt – det anpassas till dig och mottagningen.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">Förberedelser och laxering</h2>
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Tarmrengöring (laxering) enligt mottagningens schema</li>
              <li>Exakt schema för laxermedlet från kliniken</li>
              <li>Klara vätskor enligt instruktionerna</li>
              <li>Justering av mediciner efter mottagningens råd</li>
              <li>Blodförtunnande mediciner ska stämmas av med vårdgivaren</li>
              <li>Diabetesmediciner ska stämmas av med vårdgivaren</li>
              <li>En tillräcklig rengöring är avgörande för resultatet</li>
              <li>Ordna transport – lugnande medicin kan påverka körförmågan</li>
            </ul>
            <Prose
              paragraphs={[
                "Laxeringen kan upplevas som det jobbigaste momentet, men den är helt central för att undersökningen ska bli tillförlitlig. Följ alltid klinikens exakta instruktioner framför allmänna råd.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">När ska du söka vård direkt?</h2>
            <div className="warning-card mt-4 p-5">
              <p className="text-ink-800">Sök akut vård eller ring 112 vid:</p>
              <ul className="mt-3 space-y-2 text-ink-800">
                <li>Kraftig tarmblödning</li>
                <li>Svart eller tjärliknande avföring</li>
                <li>Kraftig buksmärta</li>
                <li>Feber tillsammans med uttalad buksmärta</li>
                <li>Svimning eller kraftig svaghet</li>
                <li>Akut och snabb försämring</li>
              </ul>
              <p className="mt-3 text-ink-800">
                Vid akuta symtom – ring 112 eller sök akutmottagning. Använd aldrig vårt formulär i
                en akut situation.
              </p>
            </div>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Hitta mottagning för koloskopi
            </h2>
            <Prose
              paragraphs={[
                "Specialistdirekt är en kostnadsfri förmedlingstjänst. Du beskriver ditt behov, så hjälper vi dig att hitta en privat mottagning för koloskopi. Tillgång och pris beror på mottagningen, och vi ger ingen medicinsk rådgivning. Vill du läsa mer om specialisten bakom undersökningen? Se [privat gastroenterolog](/privat-gastroenterolog). Ska övre magtarmkanalen undersökas kan i stället en [gastroskopi](/privat-gastroskopi) vara aktuell.",
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
