import type { Article } from "@/lib/articles-types";
import {
  BOOKING_PRICE_SEK,
  BOOKING_SLOT_MINUTES,
  BOOKING_WEEKDAYS,
  formatPrice,
} from "@/lib/booking-slots";

// Text skriven av ägaren 2026-10-31. Den här artikeln äger frågan "vilken läkare
// vid knäsmärta?"; /kna-laser-sig (låst knä) och mr-kna-vad-visar (bilddiagnostik)
// behåller sina ämnen. Pris och besökslängd kommer från bokningens egna
// konstanter, och lördagsfrågan visas bara så länge kalendern tar emot på
// lördagar (6).
const PRIS = `${formatPrice(BOOKING_PRICE_SEK)} kr`;
const MIN = `${BOOKING_SLOT_MINUTES} minuter`;
const LORDAG = BOOKING_WEEKDAYS.includes(6);

export const article: Article = {
  slug: "vilken-lakare-knasmarta",
  title: "Ont i knät – vilken läkare ska jag söka?",
  metaTitle: "Ont i knät – vilken läkare ska jag söka?",
  metaDescription:
    "Vårdcentral, fysioterapeut eller ortoped vid knäsmärta? Läs när du ska söka vård och hur du bokar en ortopedisk bedömning i Göteborg.",
  category: "Ortopedi",
  primaryKeyword: "vilken läkare för knäsmärta",
  keywords: [
    "vilken läkare för knäsmärta",
    "knäsmärta läkare",
    "ont i knät vilken läkare",
    "ortoped knä",
    "knäsmärta utan skada",
    "remiss ortoped knä",
    "fysioterapeut knäsmärta",
    "ont i knät vid böj",
  ],
  excerpt:
    "Vårdcentral, fysioterapeut eller ortoped vid knäsmärta? Läs när du ska söka vård och hur du bokar en ortopedisk bedömning i Göteborg.",
  published: "2026-04-18",
  updated: "2026-10-31",
  readMinutes: 10,
  wordCount: 1700,
  relatedSpecialty: "ortoped",
  // Ny text 2026-10-31. Byline och reviewedBy visas först när läkaren har
  // granskat just den här versionen – en tidigare granskning gäller inte den.
  medicallyReviewed: false,
  // Sidans topp: ingress → när du ska söka vård snabbt → vårdkontakter →
  // bokningskort. Innehållsförteckningen kommer efter (ägarens ordning).
  leadIntro: true,
  intro: [
    "**Vid knäsmärta som inte går över är vårdcentral eller fysioterapeut ofta en lämplig första kontakt. En ortoped kan bli aktuell när besvären behöver utredas vidare, rehabilitering inte har hjälpt tillräckligt eller en operation behöver övervägas. Ett låst knä eller en plötsligt svullen och smärtsam led kan behöva snabbare bedömning.**",
    "Vilken vård du behöver beror bland annat på om smärtan började efter en skada, hur knät fungerar och vad du redan har provat. Du behöver inte själv veta om det handlar om menisk, artros eller något annat innan du söker hjälp.",
  ],
  sections: [
    {
      id: "varningstecken",
      heading: "När ska du söka vård snabbt?",
      beforeToc: true,
      body: [],
      subsections: [
        {
          id: "svullnad-och-feber",
          heading: "Sök vård genast vid svullnad tillsammans med feber",
          body: [
            "Kontakta genast vårdcentral eller jouröppen mottagning om knät plötsligt svullnar och du samtidigt har feber eller känner dig sjuk. Detsamma gäller kraftig smärta med svullnad och rodnad i knäleden.",
            "Om mottagningen är stängd, sök akutmottagning.",
          ],
        },
        {
          id: "efter-en-skada",
          heading: "Efter en skada: låsning eller svårighet att belasta behöver bedömas",
          body: ["Sök vård inom något dygn om du har skadat knät och:"],
          bullets: [
            "knät har fastnat i ett läge,",
            "du inte kan stödja på benet,",
            "du har svårt att sträcka ut knät,",
            "knät har svullnat kraftigt inom ett par timmar.",
          ],
        },
      ],
      bodyAfter: [
        "Ring 1177 om du behöver hjälp att bedöma hur bråttom det är eller vart du ska vända dig. Vid en allvarlig olycka eller ett livshotande tillstånd, ring 112.",
        "**Vänta inte på en planerad privat tid om symtomen behöver snabbare vård.**",
      ],
    },
    {
      id: "vart-borjar-jag",
      heading: "Vårdcentral, fysioterapeut eller ortoped?",
      beforeToc: true,
      body: [],
      table: {
        columns: ["Vårdkontakt", "När den kan vara relevant"],
        rows: [
          ["Vårdcentral", "Vid kvarstående eller återkommande knäsmärta, oklar svullnad eller behov av läkarbedömning."],
          ["Fysioterapeut", "För bedömning av funktion och individuellt anpassad rehabilitering, exempelvis vid misstänkt knäledsartros."],
          ["Ortoped", "När en skada eller kvarstående besvär behöver specialistbedömning, eller när kirurgisk behandling övervägs."],
        ],
      },
      bodyAfter: [
        "Kontakterna kan komplettera varandra. En ortopedisk bedömning innebär inte att rehabiliteringen ska avbrytas eller att operation är nästa steg.",
      ],
    },
    {
      id: "privat-ortoped-goteborg",
      heading: "Planerat ortopedbesök i Göteborg",
      beforeToc: true,
      body: ["Hos oss träffar du **Dr. Masoud Sorkhabi** för en planerad ortopedisk bedömning."],
      table: {
        columns: ["Besöksinformation", "Uppgift"],
        rows: [
          ["Plats", "Göteborg"],
          ["Pris", PRIS],
          ["Avsatt besökstid", MIN],
          ["Remiss", "Behövs inte"],
          ["Bokning", "Direkt i kalendern"],
        ],
      },
      bookingCard: { label: "Se lediga tider och boka ortopedbesök", href: "/boka-tid" },
      bodyAfter: [
        "Vill du läsa mer innan du väljer tid? Besök sidan om [ortoped i Göteborg](/specialiteter/ortoped/goteborg).",
      ],
    },
    {
      id: "vid-besoket",
      heading: "När kan en ortoped hjälpa vid knäsmärta?",
      body: [
        "En specialistbedömning kan vara relevant när det finns en fråga som behöver klarläggas för att komma vidare. Det kan exempelvis handla om otillräcklig förbättring efter rehabilitering eller behov av att bedöma om en operation är motiverad.",
        "Inför besöket kan du formulera vad du vill ha hjälp med:",
      ],
      bullets: [
        "Jag har följt en rehabiliteringsplan men har fortfarande tydliga begränsningar.",
        "Jag har undersökts tidigare men behöver förstå nästa steg.",
        "Min läkare eller fysioterapeut har rekommenderat ortopedisk bedömning.",
        "Jag vill diskutera vilka behandlingsalternativ som är relevanta i mitt fall.",
      ],
      bodyAfter: [
        "Ett planerat besök är till för bedömning och fortsatt planering. Det innebär inte att en viss undersökning, injektion eller operation kommer att erbjudas.",
      ],
    },
    {
      id: "vridning-idrottsskada",
      heading: "Knät gör ont efter en vridning eller idrottsskada",
      body: [
        "Berätta hur skadan gick till och vad som hände direkt efteråt. Kunde du fortsätta gå? Svullnade knät snabbt? Har du sedan dess haft svårt att sträcka ut det?",
        "En meniskskada kan ge smärta vid vridning, svullnad eller låsning. Symtomen räcker däremot inte för att själv fastställa vilken struktur som är skadad.",
        "Om besvären efter en misstänkt meniskskada inte minskar under de närmaste dagarna bör du kontakta vårdcentral. Behandlingen kan omfatta fysioterapi; vissa skador behöver opereras.",
        "Beskriv skillnaden mellan att knät känns stelt, tillfälligt hakar upp sig och faktiskt fastnar så att rörelsen inte går att genomföra. Ett kvarstående låst knä ska bedömas skyndsamt.",
      ],
    },
    {
      id: "vanliga-orsaker",
      heading: "Knäsmärtan har kommit gradvis – kan det vara artros?",
      body: [
        "Knäledsartros är en möjlig förklaring till gradvis utvecklad smärta och stelhet, men andra orsaker finns. Diagnosen ställs vanligtvis genom samtal om symtomen och en undersökning. Röntgen behövs inte alltid.",
        "Vid artros är kunskap om tillståndet och individuellt anpassad träning grundläggande behandling. De flesta behöver inte opereras.",
        "Om behandlingen inte ger tillräcklig hjälp behöver planen följas upp. För vissa blir en ortopedisk bedömning aktuell för att diskutera om operation kan vara relevant.",
      ],
    },
    {
      id: "redan-tranat",
      heading: "Jag har redan tränat – varför har jag fortfarande ont?",
      body: [
        "Utebliven förbättring är ett skäl att följa upp behandlingen. Det visar inte i sig att träning är fel eller att operation behövs.",
        "Ta med en konkret sammanfattning till nästa besök:",
      ],
      table: {
        columns: ["Fråga", "Information som hjälper"],
        rows: [
          ["Vilken rehabilitering har du gjort?", "Övningar, belastning och eventuella anpassningar."],
          ["Hur länge och hur regelbundet?", "När du började och hur ofta du har kunnat följa planen."],
          ["Vad har förbättrats?", "Exempelvis gångsträcka, trappgång eller sömn."],
          ["Vad begränsar dig fortfarande?", "De aktiviteter som fortfarande inte fungerar."],
          ["Har något förändrats?", "Nytillkommen svullnad, låsning eller annan försämring."],
        ],
      },
      bodyAfter: [
        "Be om en tydlig förklaring av vad som ska ändras och när effekten ska utvärderas. Om du har fått en rekommendation om specialistbedömning, ta gärna med den.",
      ],
    },
    {
      id: "mr-fore-besok",
      heading: "Behöver jag MR av knät före besöket?",
      body: [
        "**Du behöver inte boka MR på egen hand för att kunna träffa ortopeden.** Valet av undersökning beror på vilken fråga läkaren behöver besvara.",
        "Vid misstänkt artros är MR inte ett rutinmässigt första steg. Om diagnosen är oklar eller utredningen behöver kompletteras väljer vården undersökning utifrån situationen.",
        "Har du redan gjort röntgen eller MR, ta med svaret och kontrollera hur bilderna kan göras tillgängliga. Be läkaren förklara:",
      ],
      bullets: [
        "Hur hänger fynden ihop med mina besvär?",
        "Behöver något undersökas ytterligare?",
        "Skulle en ny undersökning ändra behandlingsplanen?",
        "Vilken kostnad gäller om undersökningen sker privat?",
      ],
      bodyAfter: [
        "Besökspriset innebär inte att bilddiagnostik automatiskt ingår.",
        "Läs mer om [vad MR av knät kan visa](/artiklar/mr-kna-vad-visar).",
      ],
    },
    {
      id: "forbered-besoket",
      heading: "Vad är bra att förbereda inför ortopedbesöket?",
      body: [
        "Skriv gärna ner tre saker: hur besvären började, vad du har provat och vad du vill kunna göra igen.",
        "Ett konkret mål kan vara att kunna gå till arbetet, använda trappor eller återgå till en viss aktivitet. Det gör det lättare att diskutera vad behandlingen ska inriktas på.",
        "Ta med:",
      ],
      bullets: [
        "relevanta journalutdrag och undersökningssvar,",
        "en aktuell läkemedelslista,",
        "information om tidigare knäoperationer eller skador,",
        "din rehabiliteringsplan om du har en,",
        "de frågor du helst vill få besvarade.",
      ],
      bodyAfter: ["Välj gärna kläder som gör det enkelt att undersöka knät."],
    },
    {
      id: "vagen-till-ortoped",
      heading: "Vad kostar besöket och behöver jag remiss?",
      body: [
        `Ett planerat ortopedbesök hos Dr. Masoud Sorkhabi i Göteborg kostar **${PRIS}**. Den avsatta tiden är **${MIN}**, och du behöver **ingen remiss**.`,
        "Om ytterligare utredning, behandling eller återbesök föreslås, be om separat information om kostnaderna innan du går vidare.",
        "Läs mer om [kostnaden för privat ortoped](/artiklar/privat-ortoped-kostnad) och [att boka ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
      ],
    },
    {
      id: "efter-bedomningen",
      heading: "Vad ska vara tydligt efter bedömningen?",
      body: ["Be om en plan som besvarar följande:"],
      ordered: true,
      bullets: [
        "Vad talar undersökningen för?",
        "Finns det något som fortfarande behöver klarläggas?",
        "Vilken behandling eller rehabilitering rekommenderas?",
        "När ska resultatet utvärderas?",
        "Vem ansvarar för uppföljningen?",
        "När ska jag söka vård tidigare?",
      ],
      bodyAfter: [
        "En tydlig uppföljning är särskilt viktig om du har haft besvär länge eller får hjälp från flera vårdgivare.",
      ],
    },
  ],
  outro: [
    "Informationen hjälper dig att välja vårdkontakt och förbereda ett besök. Den ersätter inte en individuell medicinsk bedömning.",
    "**Medicinskt faktaunderlag:** 1177 – Meniskskada, Knäledsartros och Ledvärk; 1177 för vårdpersonal – Knäledsartros; Region Skåne – Degenerativ meniskskada i knäled.",
  ],
  // Avslutande bokningsruta ("Boka en planerad bedömning av dina knäbesvär").
  cta: {
    heading: "Boka en planerad bedömning av dina knäbesvär",
    body: `Vill du boka ett ortopedbesök i Göteborg? Hos oss träffar du Dr. Masoud Sorkhabi. Du väljer tid direkt i kalendern och behöver ingen remiss. ${MIN} · ${PRIS} · Göteborg`,
    label: "Se lediga tider och boka ortopedbesök",
    href: "/boka-tid",
  },
  faqHeading: "Vanliga frågor om knäsmärta",
  faqs: [
    {
      question: "Vilken läkare ska jag söka om jag har ont i knät?",
      answer:
        "Vårdcentral är en lämplig första läkarkontakt vid kvarstående eller återkommande besvär. Fysioterapeut kan hjälpa med bedömning och rehabilitering. Ortoped blir aktuell när specialistbedömning behövs.",
    },
    {
      question: "Kan jag boka ortoped direkt?",
      answer:
        "Ja. Till det privata ortopedbesöket hos oss i Göteborg kan du boka utan remiss. Vid akuta symtom ska du söka vård utifrån hur bråttom besvären är.",
    },
    {
      question: "Betyder meniskskada att jag måste opereras?",
      answer:
        "Nej. Behandlingen beror på skadan och symtomen. Fysioterapi är vanligt, medan vissa skador behöver opereras. Ett låst knä behöver snabb bedömning.",
    },
    {
      question: "Kan jag träffa ortoped även om jag inte vill opereras?",
      answer:
        "Ja. Ett besök är en bedömning, inte ett samtycke till operation. Berätta vilka frågor och önskemål du har.",
    },
    {
      question: "Måste jag ha gjort MR först?",
      answer:
        "Nej. Ta med tidigare undersökningssvar om de finns. Läkaren bedömer om mer bilddiagnostik behövs och vilken metod som är relevant.",
    },
    ...(LORDAG
      ? [
          {
            question: "Finns det tider på lördagar?",
            answer: "Vi erbjuder även ortopedbesök på lördagar. Se kalendern för aktuella bokningsbara tider.",
          },
        ]
      : []),
    {
      question: "Gäller artikeln barn också?",
      answer:
        "Den här guiden riktar sig till vuxna. Läs i stället om [ont i knät hos barn](/artiklar/ont-i-knat-barn) och [ortopedisk bedömning för barn](/artiklar/barnortopedi).",
    },
  ],
};
