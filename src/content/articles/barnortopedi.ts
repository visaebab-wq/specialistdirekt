import type { Article } from "@/lib/articles-types";
import { BARN_SCOPE } from "@/lib/barn-scope";
import { BOOKING_PRICE_SEK, BOOKING_SLOT_MINUTES, formatPrice } from "@/lib/booking-slots";
import { DR_SORKHABI_REVIEWER } from "@/lib/medical-reviewer";

// Innehållsägande (ägarbeslut 2026-10-31): den här artikeln är huvudsidan för
// "barnortoped göteborg", "barnortopedi göteborg" och "ortoped för barn
// göteborg". /boka-tid/barn är bokningssidan (val av tid). Text skriven av
// ägaren 2026-10-31.
//
// Formulering om läkaren: Dr. Sorkhabi beskrivs ENDAST som "specialist i
// ortopedi och ryggkirurgi som även tar emot barn". Han får aldrig kallas
// barnortoped – den specialisttiteln är inte dokumenterad.
//
// Pris, besökslängd och åldersspann kommer från bokningens egna konstanter.
const PRIS = `${formatPrice(BOOKING_PRICE_SEK)} kr`;
const MIN = `${BOOKING_SLOT_MINUTES} minuter`;
const LAKARE = `[${DR_SORKHABI_REVIEWER.name}, ${DR_SORKHABI_REVIEWER.title.toLowerCase()}](/lakare/masoud-sorkhabi)`;

export const article: Article = {
  slug: "barnortopedi",
  title: "Ortoped för barn i Göteborg – när behövs en bedömning?",
  metaTitle: "Ortoped för barn i Göteborg – bedömning, pris och bokning",
  metaDescription:
    "När kan barn behöva ortoped? Läs om bedömning, förberedelser och rätt vårdväg. Boka ett planerat besök i Göteborg utan remiss.",
  category: "Ortopedi",
  primaryKeyword: "barnortoped göteborg",
  keywords: [
    "barnortoped göteborg",
    "barnortopedi göteborg",
    "ortoped för barn göteborg",
    "barnortopedi",
    "barnortoped",
    "ortoped för barn",
    "privat ortoped barn Göteborg",
    "ortopedisk bedömning barn",
  ],
  excerpt:
    "När kan barn behöva ortoped? Läs om bedömning, förberedelser och rätt vårdväg. Boka ett planerat besök i Göteborg utan remiss.",
  published: "2026-08-15",
  updated: "2026-10-31",
  readMinutes: 9,
  wordCount: 1750,
  relatedSpecialty: "ortoped",
  // Ny text 2026-10-31. Byline och reviewedBy visas först när läkaren har
  // granskat just den här versionen – en tidigare granskning gäller inte den.
  medicallyReviewed: false,
  // Bokningsrutan efter artikeln ("Boka en planerad bedömning i Göteborg").
  // Faktaraden (ålder, minuter, pris, remiss, lördag) byggs av komponenten.
  cta: {
    heading: "Boka en planerad bedömning i Göteborg",
    body: "Om ditt barn behöver en planerad ortopedisk bedömning kan du se tillgängliga tider i vår bokningskalender.",
    label: "Se lediga tider för barn och ungdomar",
    href: "/boka-tid/barn",
  },
  intro: [
    "När ett barn får ont, börjar röra sig annorlunda eller slutar med en aktivitet som tidigare fungerade vill man som förälder förstå varför. Behövs en läkare, en fysioterapeut eller en mer specialiserad bedömning?",
    "Barnortopedi handlar om besvär i barnets skelett, leder och övriga rörelseapparat. Vilken vård som passar beror på barnets ålder, symtomen och hur besvären har utvecklats. Alla barn med ont behöver inte en specialist, men återkommande eller ihållande besvär kan behöva bedömas.",
    `**Hos oss i Göteborg tar Dr. Masoud Sorkhabi emot barn och ungdomar för planerad ortopedisk bedömning. Besöket kostar ${PRIS}, den avsatta tiden är ${MIN} och ingen remiss behövs.**`,
  ],
  sections: [
    {
      id: "soka-vard-snabbt",
      heading: "När ska ni söka vård snabbt?",
      body: [
        "**Vänta inte på ett planerat privat besök om barnet har akuta symtom.**",
        "Sök akut bedömning om barnet har feber och är tydligt påverkat samtidigt som det haltar eller har svårt att röra en led. Om barnet plötsligt inte kan stödja på benet, har kraftig smärta eller har skadats behöver ni få hjälp att bedöma hur bråttom det är.",
        "Ett knä som har låst sig och inte går att böja eller sträcka ska bedömas skyndsamt.",
        "Ring 1177 för hjälp med rätt vårdnivå. Vid ett livshotande tillstånd eller en allvarlig olycka, ring 112.",
      ],
    },
    {
      id: "privat-ortoped-for-barn-goteborg",
      heading: "Planerad ortopedisk bedömning i Göteborg",
      body: [
        "För besvär som inte kräver akut vård kan ett planerat besök vara ett sätt att få barnets problem undersökta och diskutera nästa steg.",
      ],
      table: {
        columns: ["Uppgift", "Besöket hos oss"],
        rows: [
          ["Läkare", LAKARE],
          ["Plats", "Göteborg"],
          ["Besök", "Planerad ortopedisk bedömning"],
          ["Ålder", BARN_SCOPE.short],
          ["Pris", PRIS],
          ["Avsatt tid", MIN],
          ["Remiss", "Behövs inte"],
        ],
      },
      bodyAfter: [
        "[Se tider för ortopedisk bedömning av barn](/boka-tid/barn)",
        "Kontrollera bokningssidans aktuella information om ålder och vilka besvär mottagningen tar emot. Om du är osäker på om besöket passar ditt barn kan du [kontakta oss före bokning](/kontakt).",
      ],
    },
    {
      id: "nar-behover-barn-ortoped",
      heading: "Vilka besvär kan behöva bedömas?",
      body: [
        "Det som spelar roll är inte bara var barnet har ont, utan också hur besvären påverkar vardagen. Berätta om barnet exempelvis undviker att gå, avstår från idrott eller får återkommande problem vid samma aktivitet.",
        "Här är några situationer där det kan finnas anledning att söka vård.",
      ],
      subsections: [
        {
          id: "mitt-barn-haltar",
          heading: "Barnet haltar eller går annorlunda",
          body: [
            "Hälta är ett symtom, inte en diagnos. Det kan vara svårt för ett barn att visa exakt var det gör ont. Oförklarlig hälta behöver bedömas av läkare; utgå inte från att barnet bara har växtvärk.",
            "Hur snabbt ni behöver söka beror bland annat på om hältan kom plötsligt, om barnet kan belasta benet och om barnet har feber eller verkar sjukt.",
            "Läs mer om [barn som haltar](/artiklar/barn-haltar).",
          ],
        },
        {
          id: "knasmarta-hos-barn",
          heading: "Barnet har ont i knät",
          body: [
            "Knäbesvär kan uppstå i samband med idrott eller annan fysisk aktivitet. Kontakta vårdcentral om smärtan inte blir bättre av vila eller om knäleden är svullen.",
            "Inför bedömningen är det värdefullt att veta vilka rörelser som gör ont, om barnet har skadat sig och om besvären påverkar gång eller träning.",
            "Läs mer om [ont i knät hos barn](/artiklar/ont-i-knat-barn).",
          ],
        },
        {
          id: "fotbesvar-och-plattfot",
          heading: "Barnet har återkommande besvär från fot, häl eller rygg",
          body: [
            "Beskriv vad barnet faktiskt har svårt att göra. Handlar det om smärta vid löpning, besvär i vissa skor eller att barnet undviker en rörelse?",
            "En bedömning behöver ta hänsyn till både symtom och funktion. Det går inte att avgöra behovet av behandling enbart utifrån en bild på foten eller hur barnet står.",
            "Fördjupa dig i våra guider om [plattfot hos barn](/artiklar/plattfot-hos-barn), [ont i hälen hos barn](/artiklar/ont-i-halen-hos-barn) och [ryggont hos barn](/artiklar/ryggont-hos-barn).",
            // Vägvisning (ingen ny medicinsk text): navet länkar till alla guider i klustret.
            "Läs också om [ont i höften hos barn](/artiklar/ont-i-hoften-hos-barn) och [skolios hos barn](/artiklar/skolios-hos-barn).",
          ],
        },
        {
          id: "vaxtvark-eller-inte",
          heading: "Är det växtvärk?",
          body: [
            "Typisk växtvärk kommer på kvällen eller natten, medan barnet är utan besvär under dagen. Smärta som sitter kvar på dagen, återkommer på samma ställe eller gör att barnet haltar bör inte automatiskt förklaras med växtvärk.",
            "Kontakta vårdcentral för bedömning av sådana besvär.",
            "Läs mer om [växtvärk hos barn](/artiklar/vaxtvark-hos-barn).",
          ],
        },
      ],
    },
    {
      id: "barnortoped-eller-ortoped",
      heading: "Barnortoped eller ortoped som tar emot barn?",
      body: [
        "När föräldrar söker efter en barnortoped kan de mena olika saker: en första bedömning av ett barns besvär eller högspecialiserad vård för ett känt tillstånd.",
        "Kontrollera därför vad den aktuella mottagningen erbjuder, vilka åldrar den tar emot och vilken erfarenhet läkaren har av barnets typ av problem.",
        "**Besöket hos oss är en planerad ortopedisk bedömning.** Det innebär inte att mottagningen erbjuder alla former av barnortopedisk utredning, operation eller långvarig uppföljning. Om barnet behöver annan kompetens eller en annan vårdnivå behöver fortsatt vård planeras utifrån det.",
        "För ett barn som redan följs av ett specialistteam är det viktigt att den pågående vårdplanen tas med i bedömningen.",
      ],
    },
    {
      id: "hur-gar-undersokningen-till",
      heading: "Hur går ett ortopedbesök för barn till?",
      body: [
        "Besöket brukar börja med att ni beskriver besvären. Barnet behöver också få möjlighet att berätta med egna ord, utifrån sin ålder och sina förutsättningar.",
        "Läkaren anpassar undersökningen efter frågeställningen. Det kan exempelvis handla om att se hur barnet går eller rör sig och att undersöka området där besvären finns.",
        "Förbered gärna svar på följande frågor:",
      ],
      bullets: [
        "När märkte ni problemet första gången?",
        "Började det efter en skada eller en förändring i träningen?",
        "Kommer besvären vid aktivitet, i vila eller på natten?",
        "Vad har barnet slutat göra eller börjat undvika?",
        "Har ni redan sökt vård eller provat någon behandling?",
      ],
      bodyAfter: [
        "Målet är att förstå vad som behöver göras härnäst. Det kan krävas ytterligare underlag innan läkaren kan ge ett säkert besked.",
      ],
    },
    {
      id: "rontgen-eller-mr",
      heading: "Behöver barnet röntgen eller MR?",
      body: [
        "**Inte automatiskt.** Behovet av bilddiagnostik bedöms utifrån frågeställningen och undersökningen. Att boka en ortoped innebär inte att barnet samtidigt har bokats för MR eller röntgen.",
        "Beställ inte en undersökning enbart för att ha något att ta med. Om barnet redan har undersökts, ta med svaren och kontrollera hur tidigare bilder kan göras tillgängliga.",
        "Om en ny undersökning föreslås, fråga vad den ska klarlägga, var den utförs och vilka kostnader som gäller.",
      ],
    },
    {
      id: "vad-kostar-ortoped-barn",
      heading: "Vad kostar ett privat ortopedbesök för barn?",
      body: [
        `Hos oss är priset **${PRIS} för ett planerat besök på ${MIN}**.`,
        "Avgiftsfri barnsjukvård inom regionfinansierad vård innebär inte att ett helt privat, självbetalt besök är kostnadsfritt. Kontrollera därför priset och bokningsvillkoren innan du bekräftar tiden.",
        "Räkna inte med att bilddiagnostik, återbesök eller andra åtgärder ingår automatiskt. Be om information om eventuella ytterligare kostnader om fortsatt utredning eller behandling blir aktuell.",
      ],
    },
    {
      id: "forbered-besoket",
      heading: "Så förbereder ni barnet",
      body: [
        "Berätta enkelt varför ni ska träffa läkaren: för att få hjälp att förstå det som gör ont eller är svårt. Undvik att lova att besöket kommer att innehålla, eller inte innehålla, en viss undersökning.",
        "Inför besöket kan ni:",
      ],
      bullets: [
        "skriva en kort tidslinje över besvären,",
        "samla relevanta undersökningssvar och tidigare vårdplaner,",
        "ta med en aktuell läkemedelslista,",
        "välja kläder som gör det lätt att undersöka det aktuella området,",
        "skriva ner de frågor ni och barnet vill ställa.",
      ],
      bodyAfter: [
        "Om besväret bara syns ibland kan ni fråga mottagningen om en kort film av barnets vanliga rörelsemönster är användbar. Be inte barnet upprepa något som gör ont för att filma det.",
      ],
    },
    {
      id: "efter-undersokningen",
      heading: "Vad händer efter bedömningen?",
      body: ["Be om en tydlig förklaring av nästa steg. Innan ni lämnar besöket är det bra att veta:"],
      ordered: true,
      bullets: [
        "Vad bedömningen talar för och vad som fortfarande är osäkert.",
        "Om fler undersökningar behövs.",
        "Vilka råd som gäller för vardag och aktivitet.",
        "Om uppföljning behövs och vem som ansvarar för den.",
        "Vilka förändringar som ska göra att ni söker vård tidigare.",
      ],
      bodyAfter: [
        "Om barnet behöver vård på en annan mottagning, fråga hur ni ska gå vidare. Ett första besök innebär inte automatiskt att hela den fortsatta vården sker hos samma läkare.",
      ],
    },
  ],
  outro: [
    "Texten ger allmän information och ersätter inte en individuell medicinsk bedömning.",
    "**Källunderlag:** 1177 – Växtvärk; Knäbesvär hos barn och tonåringar; Patientavgifter och högkostnadsskydd. Rikshandboken i barnhälsovård – Hälta.",
  ],
  faqHeading: "Vanliga frågor om ortoped för barn",
  faqs: [
    {
      question: "Behöver barnet remiss?",
      answer:
        "Nej, inte för ett planerat privat ortopedbesök hos oss i Göteborg. Andra mottagningar kan ha andra remisskrav.",
    },
    {
      question: "Kan jag boka om jag inte vet vad besvären beror på?",
      answer:
        "Ja, en känd diagnos är inte ett krav. Kontrollera att barnets ålder och typ av besvär omfattas av mottagningens verksamhet. Vid akuta symtom ska ni välja akut vård i stället.",
    },
    {
      question: "Är besöket gratis eftersom patienten är ett barn?",
      answer: `Nej. Det annonserade privata besöket hos oss kostar ${PRIS}. Avgiftsfrihet inom regionfinansierad barnsjukvård gäller inte automatiskt här.`,
    },
    {
      question: "Är hälta samma sak som växtvärk?",
      answer:
        "Nej. Hälta ska inte förklaras med växtvärk utan bedömning. Typisk växtvärk ger inte besvär när barnet går och rör sig på dagen.",
    },
    {
      question: "Måste barnet ha gjort röntgen före besöket?",
      answer:
        "Nej. Ta med tidigare underlag om det finns. Behovet av nya undersökningar avgörs utifrån den medicinska frågeställningen.",
    },
    {
      question: "Vad gör vi om barnet blir sämre före den bokade tiden?",
      answer:
        "Vänta inte på tiden om symtomen kräver snabbare vård. Kontakta 1177 för vägledning eller sök akut vid allvarliga symtom.",
    },
  ],
};
