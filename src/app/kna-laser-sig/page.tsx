import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm, BookingSteps, type DayGroup } from "@/app/boka-tid/BookingForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { RecoTrust } from "@/components/RecoTrust";
import {
  BOOKING_FREE_CANCEL_HOURS,
  BOOKING_PRICE_SEK,
  BOOKING_SLOT_MINUTES,
  formatPrice,
  generateSlots,
  groupSlotsByDay,
  slotTimeLabel,
} from "@/lib/booking-slots";
import { takenSlots } from "@/lib/booking-store";
import { DR_SORKHABI_REVIEWER } from "@/lib/medical-reviewer";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

// Symtomledd landningssida (Google Ads): "knä låser sig", "knät hakar upp sig".
// Sidan säljer EN sak – en ortopedisk bedömning. Den ställer ingen diagnos,
// lovar ingen MR och lovar ingen operation; sådant avgörs kliniskt.
//
// Slug följer sajtens konvention för kommersiella landningssidor: ASCII i
// sökvägen (jfr /privat-mr, /privat-koloskopi, /artiklar/mr-kna-vad-visar) och
// en egen rot-URL i stället för ett /ortopedi/-segment som inte finns här.
const PATH = "/kna-laser-sig";

// Pris och besökslängd kommer från bokningens källa till sanning, aldrig från
// en text som kan hamna ur synk med det patienten faktiskt bokar.
const PRICE = formatPrice(BOOKING_PRICE_SEK);
const DOCTOR = DR_SORKHABI_REVIEWER.name;
const DOCTOR_TITLE = DR_SORKHABI_REVIEWER.title.toLowerCase();

const TITLE = "Knät låser sig? Ortopedisk bedömning i Göteborg";
const DESCRIPTION =
  "Låser sig knät eller hakar det upp sig? Boka en ortopedisk bedömning i Göteborg – 40 minuter, 2 000 kr, utan remiss. Få hjälp att förstå orsaken och nästa steg.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "knä låser sig",
    "knät låser sig",
    "låsning i knä",
    "knä hakar upp sig",
    "knäspecialist Göteborg",
    "ortoped Göteborg knä",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "article",
  },
};

// Lediga tider ändras hela tiden – sidan får aldrig serveras från cache.
export const dynamic = "force-dynamic";

const faqs = [
  {
    question: "Vad kan det bero på att knät låser sig?",
    answer:
      "Det kan finnas flera förklaringar. En meniskskada är en möjlig orsak, men låsningar och upphakningar kan också hänga ihop med broskskador, en lös kropp i leden, artros, besvär runt knäskålen eller svullnad som begränsar rörligheten. Vilken förklaring som stämmer går inte att avgöra utifrån en symtombeskrivning – det kräver en klinisk bedömning.",
  },
  {
    question: "Är det farligt om knät låser sig?",
    answer:
      "Det beror på hur det yttrar sig. Om knät är helt låst och inte går att räta ut eller böja på vanligt sätt, om det svullnade kraftigt direkt efter en skada, om du inte kan stödja på benet eller om knät är rött och varmt med feber – då behöver besvären bedömas snabbt via 1177 eller akut vård. Hakar knät upp sig då och då och släpper igen är en planerad ortopedisk bedömning ofta en rimlig väg.",
  },
  {
    question: "Vilken läkare ska jag söka när knät hakar upp sig?",
    answer:
      "En ortoped är specialistläkare på rörelseapparaten och bedömer bland annat låsningar, instabilitet och knäsmärta som inte ger med sig. Läs mer i vår guide [vilken läkare ska jag söka för knäsmärta?](/artiklar/vilken-lakare-knasmarta).",
  },
  {
    question: "Behöver jag remiss för att boka?",
    answer:
      "Nej. Som självbetalande patient behöver du ingen remiss för att boka en ortopedisk bedömning.",
  },
  {
    question: "Vad kostar en ortopedisk bedömning i Göteborg?",
    answer:
      "Besöket är 40 minuter och kostar 2 000 kr, som du betalar på plats vid besöket. Du ser priset innan du bokar och bekräftar tiden och priset via en länk i mejlet.",
  },
  {
    question: "Behövs magnetkamera (MR) för att utreda ett knä som låser sig?",
    answer:
      "Inte automatiskt. Behovet av bilddiagnostik avgörs av den kliniska bedömningen – mycket går att bedöma genom samtal och undersökning. Vad en magnetkamera kan visa beskriver vi i [MR knä – vad visar magnetkameran?](/artiklar/mr-kna-vad-visar).",
  },
  {
    question: "Kan jag avboka tiden?",
    answer:
      "Ja. Du avbokar kostnadsfritt fram till 3 timmar före besöket, via länken i bekräftelsemejlet.",
  },
];

export default function KnaLaserSigPage() {
  const taken = takenSlots();
  const free = generateSlots().filter((iso) => !taken.has(iso));
  const days: DayGroup[] = groupSlotsByDay(free).map((d) => ({
    key: d.key,
    label: d.label,
    slots: d.slots.map((iso) => ({ iso, time: slotTimeLabel(iso) })),
  }));

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Ortoped", path: "/specialiteter/ortoped" },
    { name: "Knät låser sig", path: PATH },
  ];

  const facts = [
    "Göteborg",
    `${BOOKING_SLOT_MINUTES} minuter`,
    `${PRICE} kr`,
    "Utan remiss",
    `Fri avbokning ${BOOKING_FREE_CANCEL_HOURS} tim före`,
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          faqSchema(faqs),
        ]}
      />

      <div className="internal-hero">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
          <Breadcrumbs items={crumbs} />
          <p className="internal-hero-kicker mt-6">Ortopedisk bedömning · Göteborg</p>
          <h1 className="internal-hero-title">
            Knät låser sig eller hakar upp sig? Få en ortopedisk bedömning i Göteborg
          </h1>
          <p className="internal-hero-text">
            Ett knä som låser sig eller hakar upp sig kan ha flera orsaker. {DOCTOR},{" "}
            {DOCTOR_TITLE}, undersöker knät och reder ut vad som ligger bakom och vad som är
            rimligt nästa steg.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#boka"
              className="block w-full rounded-full bg-brand-600 px-8 py-4 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 sm:w-auto"
            >
              Boka tid
            </a>
            <p className="text-sm text-ink-600">
              Se lediga tider direkt nedan – {BOOKING_SLOT_MINUTES} min, {PRICE} kr, utan remiss.
            </p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {facts.map((f) => (
              <li
                key={f}
                className="rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-ink-700"
              >
                {f}
              </li>
            ))}
          </ul>

        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {/* Bokningen är sidans huvudsyfte och ligger direkt efter hero + säkerhet.
              Samma produktionskomponent och samma server action som /boka-tid –
              inget parallellt bokningssystem. */}
          <section id="boka" className="mt-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
              Boka ortopedisk bedömning i Göteborg
            </h2>
            <p className="mt-3 text-ink-700">
              Besöket är {BOOKING_SLOT_MINUTES} minuter hos {DOCTOR}, {DOCTOR_TITLE}, och kostar{" "}
              <strong>{PRICE} kr</strong>, som du betalar på plats vid besöket. Du väljer en tid här
              och bekräftar den sedan via en länk i mejlet. Kostnadsfri avbokning fram till{" "}
              {BOOKING_FREE_CANCEL_HOURS} timmar före besöket.
            </p>
            <RecoTrust />
            <div className="readable-card mt-6 overflow-hidden p-0">
              <BookingSteps />
              <div className="p-6 sm:p-8">
              {/* Säkerhetsraden står HÄR, inne i bokningskortet, och inte bara i
                  säkerhetsrutan längre upp. "Boka tid"-knappen i hero hoppar
                  direkt till #boka och scrollar förbi allt däremellan – den som
                  kommer den vägen ska ändå se när en planerad tid är fel väg. */}
              <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
                Är knät helt låst och går inte att räta ut? Sök vård samma dag i stället för att
                boka en planerad tid.
              </p>
              <BookingForm days={days} price={BOOKING_PRICE_SEK} />
              </div>
            </div>
          </section>

          <article className="article-body readable-card mt-10 p-6 sm:p-8">
            <h2 className="article-section-title text-2xl font-bold">
              När knät låser sig eller hakar upp sig
            </h2>
            <p className="mt-3">
              Besvären beskrivs på olika sätt, och orden spelar mindre roll än vad som faktiskt
              händer i knät. Vanliga beskrivningar är:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "knät hakar upp sig eller känns som att det fastnar i vissa rörelser",
                "knät låser sig kortvarigt och släpper sedan igen",
                "det knäpper eller klickar, ibland med smärta",
                "knät går inte att böja eller sträcka som vanligt",
                "smärta som kommer vid vridning, huksittande eller trappor",
                "svullnad som kommer och går",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Ortopeder skiljer ofta på ett knä som är <strong>verkligt låst</strong> – där något i
              leden mekaniskt hindrar rörelsen så att knät inte går att räta ut – och{" "}
              <strong>upphakningar</strong>, där smärta, svullnad eller muskelspänning tillfälligt
              begränsar rörligheten. Skillnaden är en av de första sakerna en bedömning reder ut, och
              den går inte att avgöra på förhand utifrån hur det känns.
            </p>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vad kan orsaka att knät låser sig?
            </h2>
            <p className="mt-3">
              Flera tillstånd kan ge låsningar eller upphakningar. Listan nedan är exempel på
              möjliga förklaringar – inte en diagnos:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "meniskbesvär, efter en vridning eller som slitage över tid",
                "brosk- eller ledytesskada",
                "en lös kropp i leden som tillfälligt kommer i kläm",
                "artros, som ofta ger stelhet och värk vid belastning",
                "besvär runt knäskålen eller en känsla av att knät viker sig",
                "svullnad i leden som begränsar rörligheten",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Samma symtom kan alltså ha olika förklaringar, och en meniskskada är bara en av dem.
              Därför utgår en bedömning från din sjukhistoria och en klinisk undersökning i stället
              för från symtombeskrivningen ensam.
            </p>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              När kan en ortopedisk bedömning vara relevant?
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                "besvären återkommer i stället för att gå över",
                "knät hakar upp sig eller låser sig upprepade gånger",
                "symtomen påverkar gång, arbete, träning eller sömn",
                "du har ihållande knäsmärta eller svullnad",
                "besvären kom efter en skada",
                "du är osäker på vad som är rimligt nästa steg",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="article-section-title mt-10 text-2xl font-bold">Så går besöket till</h2>
            <ol className="mt-4 space-y-3">
              {[
                "Du väljer en ledig tid här på sidan och bekräftar den via länken i mejlet.",
                `Du träffar ${DOCTOR}, ${DOCTOR_TITLE}, i Göteborg. Besöket är ${BOOKING_SLOT_MINUTES} minuter.`,
                "Besöket börjar med ett samtal om hur besvären började, vad som utlöser dem och hur de påverkar din vardag.",
                "Därefter undersöks knät kliniskt – rörlighet, stabilitet och de rörelser som framkallar besvären.",
                "Ni går igenom bedömningen och vad som är ett rimligt nästa steg: fortsatt egenvård, träning eller behov av vidare utredning eller behandling.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-600">
              Specialistdirekt förmedlar tiden och är inte vårdgivare. Den medicinska bedömningen
              görs av läkaren vid besöket.
            </p>

            <h2 className="article-section-title mt-10 text-2xl font-bold">Behövs MR?</h2>
            <p className="mt-3">
              Inte automatiskt. En magnetkamera behövs inte vid varje knäbesvär, och den ersätter
              inte undersökningen – behovet av bilddiagnostik avgörs av den kliniska bedömningen.
              Ibland ger samtal och undersökning tillräckligt underlag för att komma vidare, ibland
              behöver bilden kompletteras. Vill du läsa mer om vad en undersökning kan visa finns{" "}
              <Link
                href="/artiklar/mr-kna-vad-visar"
                className="font-semibold text-brand-700 hover:underline"
              >
                MR knä – vad visar magnetkameran?
              </Link>{" "}
              och vår sida om{" "}
              <Link href="/privat-mr" className="font-semibold text-brand-700 hover:underline">
                privat MR
              </Link>
              .
            </p>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Behöver en meniskskada opereras?
            </h2>
            <p className="mt-3">
              Nej, inte per automatik – och en låsning betyder inte i sig att en operation behövs.
              Vid meniskbesvär av degenerativ typ beskriver 1177 fysioterapi som den vanliga
              behandlingen, medan operation kan bli aktuell framför allt vid större skador eller när
              knät låser sig. Vad som gäller för just dina besvär avgörs av den kliniska
              bedömningen, inte av symtomen ensamma.
            </p>
            <p className="mt-4">
              Besöket du bokar här är en <strong>bedömning</strong>. Någon operation utförs inte via
              Specialistdirekt – blir behandling aktuell handlar besöket om att bedöma behovet av
              vidare utredning eller behandling.
            </p>

            <h2 className="article-section-title mt-10 text-2xl font-bold">
              Vem gör bedömningen?
            </h2>
            <p className="mt-3">
              {DOCTOR} är {DOCTOR_TITLE} med över 20 års erfarenhet av ortopedi och kirurgi, och
              tar emot i Göteborg. Läs mer på{" "}
              <Link
                href={DR_SORKHABI_REVIEWER.url}
                className="font-semibold text-brand-700 hover:underline"
              >
                läkarprofilen för {DOCTOR}
              </Link>
              . Söker du en ortoped i Göteborg av andra skäl finns också{" "}
              <Link
                href="/specialiteter/ortoped/goteborg"
                className="font-semibold text-brand-700 hover:underline"
              >
                privat ortoped i Göteborg
              </Link>
              .
            </p>

            <MedicalDisclaimer />
          </article>

          <section aria-labelledby="fragor" className="mt-10">
            <h2 id="fragor" className="text-2xl font-bold text-ink-900">
              Vanliga frågor om knä som låser sig
            </h2>
            <div className="mt-5">
              <FaqList items={faqs} />
            </div>
          </section>

          <section className="soft-info-card mt-10 p-6 text-center sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">
              Redo att få knät bedömt av en ortoped?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-700">
              {BOOKING_SLOT_MINUTES} minuter i Göteborg, {PRICE} kr, utan remiss. Kostnadsfri
              avbokning fram till {BOOKING_FREE_CANCEL_HOURS} timmar före besöket.
            </p>
            <a
              href="#boka"
              className="mt-6 inline-block w-full rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto"
            >
              Boka tid
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
