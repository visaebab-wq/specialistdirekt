import type { Article } from "@/lib/articles-types";
import { BOOKING_PRICE_SEK, BOOKING_SLOT_MINUTES, formatPrice } from "@/lib/booking-slots";
import { DR_SORKHABI_REVIEWER } from "@/lib/medical-reviewer";

// Text skriven av ägaren 2026-10-31. Pris och besökslängd för vårt besök kommer
// från bokningens egna konstanter, så artikeln aldrig kan säga något annat än
// kalendern. Läkarens titel kommer från den verifierade profilen.
const PRIS = `${formatPrice(BOOKING_PRICE_SEK)} kr`;
const MIN = `${BOOKING_SLOT_MINUTES} minuter`;
const LAKARE = `[${DR_SORKHABI_REVIEWER.name}, ${DR_SORKHABI_REVIEWER.title.toLowerCase()}](/lakare/masoud-sorkhabi)`;

export const article: Article = {
  slug: "privat-ortoped-kostnad",
  title: "Vad kostar en privat ortoped – och vad ingår i besöket?",
  metaTitle: "Privat ortoped – kostnad, vad som ingår och bokning",
  metaDescription: `Vad kostar en privat ortoped? Läs om besökspris och möjliga tillägg. Hos oss i Göteborg: ${PRIS} för ${MIN}, utan remiss.`,
  category: "Ortopedi",
  primaryKeyword: "privat ortoped kostnad",
  keywords: [
    "privat ortoped kostnad",
    "privat ortoped pris",
    "ortoped utan remiss",
    "ortopedbesök kostnad",
    "MR knä pris privat",
    "röntgen kostnad privat",
    "privat knäoperation pris",
    "ortoped axel höft",
  ],
  excerpt: `Vad kostar en privat ortoped? Läs om besökspris och möjliga tillägg. Hos oss i Göteborg: ${PRIS} för ${MIN}, utan remiss.`,
  published: "2026-05-30",
  updated: "2026-10-31",
  readMinutes: 8,
  wordCount: 1500,
  relatedSpecialty: "ortoped",
  // Texten 2026-10-31 är granskad och godkänd av läkaren (ägaren 2026-11-01).
  leadIntro: true,
  intro: [
    `**Hos oss i Göteborg kostar ett ortopedbesök hos Dr. Masoud Sorkhabi ${PRIS} och den avsatta besökstiden är ${MIN}. Du behöver ingen remiss och bokar direkt i kalendern.**`,
    "När du jämför privata ortopedbesök behöver du skilja mellan priset för själva läkarbesöket och kostnader för eventuell fortsatt utredning eller behandling. Ett besökspris säger inte automatiskt vad röntgen, MR, återbesök eller andra åtgärder kostar.",
    "Här får du hjälp att förstå prisskillnaderna och vilka frågor som är bra att få besvarade före bokning.",
  ],
  sections: [
    {
      id: "privat-ortoped-goteborg-kostnad",
      heading: "Ortopedbesök i Göteborg: pris och bokning",
      beforeToc: true,
      body: [],
      table: {
        columns: ["Uppgift", "Besöket hos oss"],
        rows: [
          ["Läkare", LAKARE],
          ["Plats", "Göteborg"],
          ["Pris för ortopedbesöket", PRIS],
          ["Avsatt besökstid", MIN],
          ["Remiss", "Behövs inte"],
          ["Bokning", "Direkt i kalendern"],
        ],
      },
      bodyAfter: [
        "[Se lediga tider och boka ortopedbesök](/boka-tid)",
        "Vill du först läsa mer om mottagningen och läkaren? Besök sidan om [ortoped i Göteborg](/specialiteter/ortoped/goteborg).",
      ],
    },
    {
      id: "vad-betalar-man-for",
      heading: "Vad betalar man för vid ett ortopedbesök?",
      body: [
        "Ett ortopedbesök är en medicinsk bedömning av dina besvär. Det är inte ett färdigt behandlingspaket som automatiskt omfattar alla undersökningar eller åtgärder som kan bli aktuella.",
        "Inför besöket är det bra att formulera vad du vill få hjälp med. Det kan till exempel vara att förstå nästa steg när besvären har fortsatt, när tidigare behandling inte gett tillräcklig förbättring eller när du är osäker på vilken utredning som behövs.",
        "Frågor att ta med till läkaren:",
      ],
      bullets: [
        "Vad talar undersökningen för?",
        "Behövs ytterligare utredning?",
        "Vilka behandlingsalternativ är relevanta?",
        "Vad kan jag göra fram till eventuell uppföljning?",
        "När och hur ska resultatet följas upp?",
      ],
      bodyAfter: [
        "Det går inte att i förväg lova en viss diagnos, undersökning eller behandling. Vilka åtgärder som är motiverade avgörs vid den medicinska bedömningen.",
      ],
    },
    {
      id: "kostnader-som-kan-tillkomma",
      heading: "Vilka kostnader kan tillkomma?",
      body: [
        "**Utgå inte från att bilddiagnostik, behandling eller återbesök ingår i priset för första besöket.** Be om ett tydligt kostnadsbesked innan du tackar ja till nästa steg.",
      ],
      table: {
        columns: ["Möjlig kostnad", "Fråga innan du går vidare"],
        rows: [
          ["Röntgen eller MR", "Behövs undersökningen, var utförs den och vad kostar den?"],
          ["Återbesök", "Behövs ett nytt besök och vilket pris gäller?"],
          ["Injektion eller annan behandling", "Ingår åtgärden i besökspriset eller debiteras den separat?"],
          ["Rehabilitering", "Vem ansvarar för den och vilka avgifter gäller där?"],
          ["Intyg eller utlåtande", "Kan det utfärdas inom besöket eller krävs en separat tjänst?"],
        ],
      },
      bodyAfter: [
        "Tabellen beskriver kostnader som kan förekomma i en vårdprocess. Den innebär inte att alla åtgärder erbjuds eller behövs hos oss.",
        "Om fortsatt vård sker på en annan mottagning behöver du få besked om den mottagningens priser och villkor.",
      ],
    },
    {
      id: "varfor-olika-pris",
      heading: "Varför kostar privata ortopedbesök olika mycket?",
      body: [
        "Besök med samma namn kan ha olika innehåll. Vid en jämförelse är det därför relevant att kontrollera besökets längd, läkarens kompetens, om det är ett första besök eller ett återbesök och hur fortsatt kontakt hanteras.",
        "Ett lägre pris kan gälla ett kortare återbesök. Ett högre pris behöver inte innebära att fler undersökningar ingår.",
        "Jämför därför konkreta uppgifter:",
      ],
      ordered: true,
      bullets: [
        "Vilken läkare träffar jag?",
        "Hur lång tid är avsatt?",
        "Vad omfattar bokningen?",
        "Vilka möjliga tillägg debiteras separat?",
        "Hur får jag besked om nästa steg?",
      ],
    },
    {
      id: "priser-privat-ortoped",
      heading: "Vad kostar en privat ortoped? Ungefärliga priser",
      body: [
        "Priset för ett privat ortopedbesök varierar med klinik, ort och hur omfattande undersökningen är. Nedan följer **ungefärliga** intervall – betrakta dem som en grov vägledning och be alltid om en offert i förväg.",
        "Ett **förstabesök** hos en privat ortoped landar ofta någonstans runt 1 500–3 500 kronor. Tillkommer bildundersökningar stiger kostnaden. En **röntgen** brukar ligga ungefär i intervallet 1 000–2 500 kronor, medan en **magnetkameraundersökning (MR)** är dyrare och ofta hamnar runt 4 000–8 000 kronor beroende på kroppsdel och klinik.",
        "En **operation** är en helt annan storleksordning. Ingrepp som titthålskirurgi i knät eller en protesoperation i höft eller knä kan privat kosta från tiotusentals kronor upp till över hundra tusen kronor, beroende på ingrepp, klinik och vårdtid. Här är det extra viktigt att få ett skriftligt prisförslag innan du bestämmer dig.",
      ],
      bullets: [
        "Förstabesök hos ortoped: cirka 1 500–3 500 kr (ungefärligt).",
        "Röntgen: cirka 1 000–2 500 kr (ungefärligt).",
        "MR-undersökning: cirka 4 000–8 000 kr (ungefärligt, varierar med kroppsdel).",
        "Operation: från tiotusentals kr och uppåt (mycket varierande).",
      ],
    },
    {
      id: "offentlig-vs-privat",
      heading: "Privat ortoped eller regionfinansierad vård?",
      body: [
        "En privatägd mottagning kan ha avtal med regionen. Då gäller regionens patientavgifter för den vård som omfattas av avtalet.",
        "Helt privat, självbetald vård fungerar annorlunda: du betalar mottagningens pris. Högkostnadsskydd och frikort för regionfinansierad öppenvård gäller inte automatiskt för ett sådant besök.",
        `**Det annonserade besöket hos oss är ett privat besök för ${PRIS}.** Utgå från det priset när du bokar, inte från regionens patientavgift.`,
      ],
    },
    {
      id: "sjukvardsforsakring",
      heading: "Kan sjukvårdsförsäkringen betala?",
      body: [
        "Det beror på din försäkring, vilket besvär du söker för och försäkringsbolagets villkor.",
        "Kontakta bolaget innan du bokar själv. Fråga om besöket behöver godkännas i förväg och om bolaget kan använda den aktuella mottagningen. En egen bokning innebär inte att ersättning är beviljad.",
        "Om bolaget ska ordna vården bör du följa dess bokningsväg.",
      ],
    },
    {
      id: "boka-med-eller-utan-remiss",
      heading: "Behöver jag remiss till en privat ortoped?",
      body: [
        "**Till ortopedbesöket hos oss behöver du ingen remiss.** Du kan välja en ledig tid direkt i kalendern.",
        "Har du redan en remiss, ett tidigare utlåtande eller en genomförd undersökning är informationen ändå relevant. Ta med underlaget så att läkaren kan få en tydligare bild av vad som redan har gjorts.",
        "Läs mer om [att boka ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
      ],
    },
    {
      id: "forbered-besoket",
      heading: "Så förbereder du dig inför besöket",
      body: ["Skriv gärna en kort sammanfattning av besvären:"],
      bullets: [
        "Var har du ont och när började det?",
        "Hur påverkas sömn, arbete, gång eller träning?",
        "Har du provat behandling eller rehabilitering?",
        "Har du tidigare opererats eller undersökts för samma problem?",
        "Vilka frågor är viktigast för dig att få svar på?",
      ],
      bodyAfter: [
        "Ta med en aktuell läkemedelslista och relevanta journalutdrag eller undersökningssvar om du har dem. Har du röntgen- eller MR-bilder från en annan vårdgivare, kontrollera före besöket hur läkaren kan få tillgång till dem. Ett skriftligt svar och själva bilderna är olika underlag.",
        "Du behöver inte beställa en ny MR på egen hand för att kunna boka ett ortopedbesök.",
      ],
    },
  ],
  outro: [
    "Söker du för ditt barn? Läs om [ortopedisk bedömning för barn](/artiklar/barnortopedi).",
    "Informationen hjälper dig att förstå kostnader och förbereda ett besök. Den ersätter inte en individuell medicinsk bedömning.",
    "**Källunderlag:** 1177 – Patientavgifter och högkostnadsskydd. Uppgifter om vårt besök hämtas från mottagningens aktuella bokningsinformation.",
  ],
  // Avslutande bokningsruta ("Boka ortoped i Göteborg").
  cta: {
    heading: "Boka ortoped i Göteborg",
    body: `Vill du boka ett planerat ortopedbesök? Hos oss träffar du Dr. Masoud Sorkhabi i Göteborg. Besöket kostar ${PRIS}, tar ${MIN} och kräver ingen remiss.`,
    label: "Se lediga tider och boka",
    href: "/boka-tid",
  },
  faqHeading: "Vanliga frågor om kostnaden för privat ortoped",
  faqs: [
    {
      question: "Vad kostar besöket hos er?",
      answer: `Ett ortopedbesök hos Dr. Masoud Sorkhabi i Göteborg kostar ${PRIS}. Den avsatta besökstiden är ${MIN}.`,
    },
    {
      question: "Ingår MR eller röntgen i priset?",
      answer:
        "Räkna inte med att bilddiagnostik ingår i besökspriset. Om en undersökning blir aktuell behöver du få besked om kostnad och utförande innan den bokas.",
    },
    {
      question: "Kan jag boka utan remiss?",
      answer: "Ja. Du behöver ingen remiss för att boka ortopedbesöket hos oss.",
    },
    {
      question: "Gäller mitt frikort?",
      answer:
        "Besöket annonseras som privat självbetald vård. Räkna därför inte med att regionens frikort täcker avgiften.",
    },
    {
      question: "Kan jag använda min sjukvårdsförsäkring?",
      answer:
        "Kontakta försäkringsbolaget före bokning. Bolaget behöver bedöma om besöket omfattas och vilken bokningsväg du ska använda.",
    },
    {
      question: "Hur snabbt kan jag få en tid?",
      answer:
        "Aktuella bokningsbara tider visas i kalendern. Tillgängligheten varierar, så kontrollera kalendern för nästa lediga tid.",
    },
  ],
};
