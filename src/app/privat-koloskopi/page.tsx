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
  src: "/page-visuals/static-privat-koloskopi.webp",
  alt: "Privat koloskopi - realistisk vårdbild med människa och mag-tarmspecialist",
};

export const metadata: Metadata = {
  title: "Privat koloskopi utan remiss – boka en tid",
  description:
    "Boka privat koloskopi utan remiss. Mottagningen gör en medicinsk bedömning inför undersökningen. Skicka en kostnadsfri tidsförfrågan.",
  alternates: { canonical: "/privat-koloskopi" },
  openGraph: {
    type: "article",
    title: "Privat koloskopi utan remiss – boka en tid",
    description:
      "Boka privat koloskopi utan remiss. Skicka en kostnadsfri tidsförfrågan och få information om möjlig tid och aktuellt pris.",
    url: "/privat-koloskopi",
    images: [
      { url: visual.src, alt: visual.alt, ...getVisualDimensions(visual.src) },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: visual.src, alt: visual.alt }],
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
      "Ja. Som självbetalande kan du boka privat koloskopi utan remiss. Mottagningen gör en medicinsk bedömning inför undersökningen för att säkerställa att koloskopi är rätt undersökning för dig. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss.",
  },
  {
    question: "Vad kostar en privat koloskopi?",
    answer:
      "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Kostnaden kan påverkas av läkarkonsultation, lugnande medicin eller smärtlindring, vävnadsprover, borttagning av polyper, analys av prover och uppföljning. Be alltid mottagningen om ett samlat pris i förväg.",
  },
  {
    question: "Hur lång är väntetiden för en privat koloskopi?",
    answer:
      "Privata tider kan ofta erbjudas snabbare än inom regionfinansierad vård, men exakt väntetid varierar mellan mottagningar och beror på efterfrågan. Vi kan inte garantera en viss tid, men du får besked om den tidigaste tid som finns.",
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
          <h1 className="internal-hero-title">
            Privat koloskopi – utan remiss
          </h1>
          <p className="internal-hero-text">
            Som självbetalande kan du boka privat koloskopi utan remiss.
            Mottagningen gör en medicinsk bedömning inför undersökningen för att
            säkerställa att koloskopi är rätt undersökning för dig.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="#tidsforfragan"
              className="inline-flex rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Begär tid utan remiss
            </Link>
            <span className="text-sm font-medium text-ink-700">
              Det kostar inget att skicka en förfrågan
            </span>
          </div>
          <PageVisual visual={visual} className="mt-10" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <article className="article-body readable-card p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">
              Vad är en koloskopi?
            </h2>
            <Prose
              paragraphs={[
                "En **koloskopi** är en undersökning av **ändtarm** och **tjocktarm** med ett böjligt instrument som har en kamera i änden. Läkaren för in instrumentet via ändtarmsöppningen och kan se tarmens slemhinna direkt på en skärm.",
                "Under undersökningen kan **vävnadsprover** tas, och ibland kan **polyper** (små utväxter i tarmen) tas bort direkt. Vilka fynd som görs och vilken åtgärd som blir aktuell beror på de kliniska omständigheterna och bedöms av läkaren på plats.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Privat koloskopi i Göteborg
            </h2>
            <Prose
              paragraphs={[
                "För dig som söker privat koloskopi i Göteborg finns en separat sida med information om tidsförfrågan, pris, förberedelser och vad du behöver veta inför undersökningen. Läs mer på [privat koloskopi i Göteborg](/privat-koloskopi/goteborg).",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När behövs en koloskopi?
            </h2>
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
              <li>
                Andra symtom där en medicinsk bedömning talar för undersökning
              </li>
            </ul>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Koloskopi utan remiss – så fungerar det privat
            </h2>
            <Prose
              paragraphs={[
                "Som **självbetalande** kan du boka privat koloskopi utan remiss. Innan undersökningen gör mottagningen en medicinsk bedömning för att säkerställa att koloskopi är rätt undersökning för dig. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som avgör vad som täcks. Inom **regionfinansierad vård** krävs oftast en remiss och undersökningen följer regionens rutiner.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vad kostar en privat koloskopi?
            </h2>
            <Prose
              paragraphs={[
                "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Vi anger inga fasta belopp här, eftersom kostnaden skiljer sig åt beroende på mottagning och vad som ingår. Be alltid om ett samlat pris i förväg.",
                "Priset kan bero på flera delar: **läkarkonsultationen**, **lugnande medicin eller smärtlindring**, **vävnadsprovtagning** (biopsi), **borttagning av polyper**, **analys av prover** (patologi) och en eventuell **uppföljning**. Fråga specifikt vad som ingår, så att du kan jämföra mottagningar rättvist.",
                "Vill du ha exempel på vad undersökningen brukar kosta och vad som påverkar priset? Läs vår guide [privat koloskopi: kostnad](/artiklar/privat-koloskopi-kostnad).",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Väntetid för koloskopi – privat jämfört med offentlig vård
            </h2>
            <Prose
              paragraphs={[
                "Väntetiden är ofta ett avgörande skäl att välja privat. Privata tider kan i många fall erbjudas snabbare än inom regionfinansierad vård, vilket kan vara värdefullt när du vill ha ett besked utan lång väntan. Hur mycket snabbare det går varierar dock mellan mottagningar och beror på efterfrågan – vi lovar ingen specifik tid, men du får besked om den tidigaste tid som finns.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Så går undersökningen till
            </h2>
            <Prose
              paragraphs={[
                "En koloskopi följer vanligen några typiska steg. Efter förberedelse och laxering för läkaren in det böjliga instrumentet via ändtarmen. **Luft eller koldioxid** används ofta för att vidga tarmen så att slemhinnan syns bättre, vilket kan ge en tillfällig känsla av uppblåsthet.",
                "**Kramp eller tryck** kan förekomma när instrumentet förs fram. **Lugnande medicin eller smärtlindring** erbjuds ofta för att göra undersökningen bekvämare. Hur lång tid undersökningen tar varierar beroende på fynd och eventuella åtgärder som provtagning eller borttagning av polyper. Undvik att förvänta dig exakt samma upplägg överallt – det anpassas till dig och mottagningen.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Förberedelser och laxering
            </h2>
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>Tarmrengöring (laxering) enligt mottagningens schema</li>
              <li>Exakt schema för laxermedlet från kliniken</li>
              <li>Klara vätskor enligt instruktionerna</li>
              <li>Justering av mediciner efter mottagningens råd</li>
              <li>Blodförtunnande mediciner ska stämmas av med vårdgivaren</li>
              <li>Diabetesmediciner ska stämmas av med vårdgivaren</li>
              <li>En tillräcklig rengöring är avgörande för resultatet</li>
              <li>
                Ordna transport – lugnande medicin kan påverka körförmågan
              </li>
            </ul>
            <Prose
              paragraphs={[
                "Laxeringen kan upplevas som det jobbigaste momentet, men den är helt central för att undersökningen ska bli tillförlitlig. Följ alltid klinikens exakta instruktioner framför allmänna råd.",
              ]}
            />

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När ska du söka vård direkt?
            </h2>
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
                Vid akuta symtom – ring 112 eller sök akutmottagning. Använd
                aldrig vårt formulär i en akut situation.
              </p>
            </div>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Hitta mottagning för koloskopi
            </h2>
            <Prose
              paragraphs={[
                "Det kostar inget att skicka en bokningsförfrågan för koloskopi via Specialistdirekt. Du beskriver ditt behov och får besked om möjlig tid och pris. Den medicinska bedömningen görs av läkaren vid undersökningen. Vill du läsa mer om specialisten bakom undersökningen? Se [privat gastroenterolog](/privat-gastroenterolog). Ska övre magtarmkanalen undersökas kan i stället en [gastroskopi](/privat-gastroskopi) vara aktuell.",
              ]}
            />
            <div id="tidsforfragan" className="mt-6 scroll-mt-28">
              <h2 className="text-2xl font-bold text-ink-900">
                Begär tid utan remiss
              </h2>
              <p className="mt-2 text-ink-700">
                Skicka en kostnadsfri tidsförfrågan. Du får information om
                möjlig tid, aktuellt pris och vad som ingår innan du bestämmer
                dig.
              </p>
              <div className="mt-6">
                <LeadForm defaultSpecialty="gastroenterolog" />
              </div>
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
