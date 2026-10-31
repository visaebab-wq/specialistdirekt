import type { Article } from "@/lib/articles-types";
import {
  BOOKING_PRICE_SEK,
  BOOKING_SLOT_MINUTES,
  BOOKING_WEEKDAYS,
  formatPrice,
} from "@/lib/booking-slots";

// Text skriven av ägaren 2026-10-31. Den här artikeln äger frågan "vilken läkare
// vid ryggont?"; ryggsmarta-ortoped-eller-fysioterapeut ska inte upprepa den.
// Pris och besökslängd kommer från bokningens egna konstanter, och
// lördagsfrågan visas bara så länge kalendern tar emot på lördagar (6).
const PRIS = `${formatPrice(BOOKING_PRICE_SEK)} kr`;
const MIN = `${BOOKING_SLOT_MINUTES} minuter`;
const LORDAG = BOOKING_WEEKDAYS.includes(6);

export const article: Article = {
  slug: "ont-i-ryggen-vilken-lakare",
  title: "Ont i ryggen – vilken läkare ska jag söka?",
  metaTitle: "Ont i ryggen – vilken läkare ska jag söka?",
  metaDescription:
    "Vårdcentral, fysioterapeut eller ortoped vid ryggont? Läs hur du väljer vård och när det är bråttom. Boka ortoped i Göteborg utan remiss.",
  category: "Ortopedi",
  primaryKeyword: "ont i ryggen vilken läkare",
  keywords: [
    "ont i ryggen vilken läkare",
    "ryggont vilken läkare",
    "ont i ländryggen läkare",
    "ischias vilken läkare",
    "diskbråck läkare",
    "ryggsmärta ortoped",
    "fysioterapeut ryggont",
    "långvarig ryggsmärta",
  ],
  excerpt:
    "Vårdcentral, fysioterapeut eller ortoped vid ryggont? Läs hur du väljer vård och när det är bråttom. Boka ortoped i Göteborg utan remiss.",
  published: "2026-06-08",
  updated: "2026-10-31",
  readMinutes: 9,
  wordCount: 1500,
  relatedSpecialty: "ortoped",
  // Ny text 2026-10-31. Byline och reviewedBy visas först när läkaren har
  // granskat just den här versionen – en tidigare granskning gäller inte den.
  medicallyReviewed: false,
  // Sidans topp: ingress → när du ska söka vård direkt → vårdkontakter →
  // bokningskort. Innehållsförteckningen kommer efter (ägarens ordning).
  leadIntro: true,
  intro: [
    "**Vid ryggont är vårdcentral eller fysioterapeut ofta första steget. En ortopedisk bedömning kan bli aktuell när besvären behöver utredas vidare, exempelvis efter behandling som inte hjälpt tillräckligt eller inför ställningstagande till operation. Vissa symtom kräver vård direkt.**",
    "Det avgörande är hur besvären påverkar dig, hur de har utvecklats och vad som redan har undersökts. Här får du hjälp att välja nästa steg och förbereda ett besök.",
  ],
  sections: [
    {
      id: "varningstecken",
      heading: "När ska du söka vård direkt?",
      beforeToc: true,
      body: [
        "Sök vård direkt på vårdcentral eller jouröppen mottagning om du har ryggont tillsammans med något av följande:",
      ],
      bulletTone: "warning",
      bullets: [
        "Du känner inte när du behöver kissa eller har nytillkommet urinläckage.",
        "Du har nedsatt känsel kring könsorganen eller ändtarmen.",
        "Du har domningar, stickningar eller svaghet i båda benen.",
        "Smärtan började efter ett fall eller en annan olycka.",
        "Du har samtidig smärta i bröstkorgen eller magen.",
        "Du har feber eller känner dig tydligt sjuk.",
      ],
      bodyAfter: [
        "Om mottagningarna är stängda eller inte kan ta emot dig, sök akutmottagning. Ring 1177 om du behöver hjälp att välja vårdnivå. Vid ett livshotande tillstånd, ring 112.",
        "**Vänta inte på en bokad privat tid vid sådana symtom.**",
      ],
    },
    {
      id: "vart-borjar-jag",
      heading: "Vilken vårdkontakt passar vid ryggont?",
      beforeToc: true,
      body: [],
      table: {
        columns: ["Vårdkontakt", "Vad kontakten kan hjälpa dig med"],
        rows: [
          ["Vårdcentral", "En första läkarbedömning och ställningstagande till fortsatt utredning."],
          ["Fysioterapeut", "Bedömning av rörelse och funktion samt individuellt anpassad rehabilitering."],
          ["Ortoped", "Specialistbedömning när det finns en ortopedisk frågeställning som behöver utredas vidare."],
        ],
      },
      bodyAfter: [
        "Kontakta vårdcentral om ryggvärken inte går över inom två till tre veckor. Sök tidigare om du försämras eller får varningssymtom.",
      ],
    },
    {
      id: "privat-alternativ",
      heading: "Planerat ortopedbesök i Göteborg",
      beforeToc: true,
      body: [
        "Vill du boka en ortopedisk bedömning av dina ryggbesvär? Hos oss träffar du **Dr. Masoud Sorkhabi i Göteborg**.",
      ],
      bullets: [
        `**Pris:** ${PRIS}.`,
        `**Avsatt besökstid:** ${MIN}.`,
        "**Remiss:** behövs inte.",
        "**Bokning:** välj en ledig tid direkt i kalendern.",
      ],
      bookingCard: { label: "Se lediga tider och boka ortopedbesök", href: "/boka-tid" },
      bodyAfter: [
        "Läs mer om läkaren och besöket på sidan om [ortoped i Göteborg](/specialiteter/ortoped/goteborg). Bokningen gäller ett planerat besök, inte akutvård.",
      ],
    },
    {
      id: "nar-ortopedisk-bedomning",
      heading: "När är en ortopedisk bedömning relevant?",
      body: [
        "En ortopedisk bedömning är mest användbar när det finns en tydlig fråga att ta ställning till. Det kan handla om att klargöra om fortsatt ortopedisk utredning är motiverad eller om ett kirurgiskt behandlingsalternativ behöver övervägas.",
        "Inför bokningen kan du formulera vad du behöver hjälp med:",
      ],
      bullets: [
        "Besvären fortsätter trots att jag har följt en behandlingsplan. Vad är nästa steg?",
        "Jag har redan undersökts, men behöver förstå hur resultatet påverkar fortsatt behandling.",
        "Min läkare eller fysioterapeut har rekommenderat en specialistbedömning.",
        "Jag vill få bedömt om mina besvär hör till ortopedins område.",
      ],
      bodyAfter: [
        "Att du bokar en ortoped innebär inte att operation behövs. Besöket innebär inte heller en garanti för MR, en viss behandling eller en säker förklaring till all smärta.",
        "Om du är osäker på om mottagningen passar din frågeställning kan du [kontakta oss före bokning](/kontakt).",
      ],
    },
    {
      id: "efter-fysioterapeut",
      heading: "Jag har redan gått hos fysioterapeut – vad ska jag ta med?",
      body: [
        "Beskriv vad rehabiliteringen har bestått av och hur du har reagerat på den. ”Jag har provat träning” ger mindre information än en kort sammanfattning av övningar, tidsperiod och resultat.",
        "Anteckna gärna:",
      ],
      table: {
        columns: ["Fråga", "Exempel på information att ta med"],
        rows: [
          ["Vad har du gjort?", "Övningar, behandlingar och förändringar i aktivitet."],
          ["Under hur lång tid?", "När du började och hur regelbundet du följt planen."],
          ["Vad har blivit bättre?", "Exempelvis gångsträcka, sömn eller möjlighet att arbeta."],
          ["Vad är fortfarande svårt?", "Konkreta rörelser eller aktiviteter som begränsas."],
          ["Vad har förändrats?", "Nya symtom eller en tydlig försämring."],
        ],
      },
      bodyAfter: ["Syftet är att nästa bedömning ska bygga vidare på det som redan är gjort."],
    },
    {
      id: "mr-fore-besok",
      heading: "Behöver jag göra MR innan jag träffar läkaren?",
      body: [
        "**Nej, du behöver inte ordna en MR på egen hand för att boka besöket.** Behovet av bilddiagnostik avgörs utifrån symtom och undersökning. Vid kortvariga ryggbesvär behövs bilddiagnostik ofta inte.",
        "Om du redan har gjort MR eller röntgen, ta med utlåtandet och kontrollera hur bilderna kan göras tillgängliga. Utlåtandet och själva bilderna är två olika underlag.",
        "Fråga läkaren:",
      ],
      bullets: [
        "Vilken fråga skulle en ny undersökning besvara?",
        "Skulle resultatet kunna ändra behandlingsplanen?",
        "Räcker de undersökningar som redan finns?",
        "Var sker undersökningen och vilka kostnader gäller?",
      ],
      bodyAfter: [
        "Räkna inte med att bilddiagnostik ingår i priset för läkarbesöket. Be om ett kostnadsbesked om ytterligare undersökningar föreslås.",
      ],
    },
    {
      id: "utstralande-smarta",
      heading: "Om smärtan strålar ner i benet",
      body: [
        "Utstrålande smärta, domningar eller stickningar kan förekomma vid diskbråck. Symtomen behöver bedömas tillsammans med undersökningsfynd; utstrålning räcker inte för att själv ställa diagnosen.",
        "Vid misstänkt diskbråck kan läkaren bland annat undersöka styrka, känsel och reflexer. Många blir bättre utan operation, och behandlingen kan omfatta rörelse, fysioterapi och smärtlindring.",
        "Kontakta vårdcentral om du har mycket ont trots smärtstillande behandling eller om besvären inte förbättras. Nytillkomna problem med blåsa eller tarm, eller nedsatt känsel i underlivet, kräver omedelbar vårdkontakt.",
      ],
    },
    {
      id: "forbered-besok-rygg",
      heading: "Så förbereder du ett besök för ryggbesvär",
      body: [
        "En kort sammanfattning gör det lättare att använda besökstiden till det som är viktigast för dig.",
      ],
      subsections: [
        {
          id: "hur-det-borjade",
          heading: "Beskriv hur det började",
          body: [
            "När kom besvären? Började de plötsligt eller gradvis? Har du haft liknande problem tidigare?",
          ],
        },
        {
          id: "vad-du-inte-kan-gora",
          heading: "Beskriv vad du inte kan göra som vanligt",
          body: [
            "Skriv exempelvis hur länge du kan sitta, gå eller stå. Berätta om sömnen eller arbetet påverkas.",
          ],
        },
        {
          id: "tidigare-underlag",
          heading: "Samla tidigare underlag",
          body: [
            "Ta med relevanta journalutdrag, undersökningssvar och en aktuell läkemedelslista. Anteckna tidigare behandlingar och eventuella operationer.",
          ],
        },
        {
          id: "viktigaste-fragor",
          heading: "Välj dina viktigaste frågor",
          body: ["Det kan vara:"],
          bullets: [
            "Vad behöver undersökas vidare?",
            "Vilken behandling är rimlig att börja med eller fortsätta med?",
            "Hur ska förbättring följas upp?",
            "Vem kontaktar jag om besvären förändras?",
          ],
        },
      ],
      bodyAfter: ["Du behöver inte själv veta vilken diagnos du har för att söka hjälp."],
    },
    {
      id: "vagen-till-specialist",
      heading: "Vad kostar besöket och behövs remiss?",
      body: [
        `Ett ortopedbesök hos Dr. Masoud Sorkhabi i Göteborg kostar **${PRIS}**, med **${MIN} avsatt tid**. Du bokar utan remiss.`,
        "Om fortsatt utredning, behandling eller återbesök blir aktuellt behöver du få separat information om innehåll och kostnad.",
        "Läs mer om [kostnaden för privat ortoped](/artiklar/privat-ortoped-kostnad) eller [hur du bokar ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
        "[Se aktuella tider i kalendern](/boka-tid)",
      ],
    },
    {
      id: "fragor-innan-besoket-avslutas",
      heading: "Frågor att få besvarade innan besöket avslutas",
      body: [
        "Försök lämna besöket med en tydlig bild av nästa steg, även om utredningen inte är färdig.",
      ],
      ordered: true,
      bullets: [
        "Vad visar bedömningen hittills?",
        "Vad är fortfarande osäkert?",
        "Behövs fler undersökningar?",
        "Vilken plan gäller nu?",
        "När och av vem ska planen följas upp?",
        "Vilka förändringar innebär att jag ska söka vård tidigare?",
      ],
      bodyAfter: [
        "Be om en förklaring om något är oklart. Det är särskilt värdefullt att veta vem som ansvarar för fortsatt kontakt om flera mottagningar är inblandade.",
      ],
    },
  ],
  outro: [
    "Informationen är ett stöd när du väljer vårdkontakt och förbereder ett besök. Den ersätter inte en individuell medicinsk bedömning.",
    "**Medicinskt faktaunderlag:** 1177 – Ont i ryggen och Diskbråck. Pris, besökstid och bokningsinformation avser besöket hos oss i Göteborg.",
  ],
  // Avslutande bokningsruta ("Boka en planerad bedömning av dina ryggbesvär").
  cta: {
    heading: "Boka en planerad bedömning av dina ryggbesvär",
    body: `Om du vill boka ett planerat ortopedbesök i Göteborg kan du välja tid direkt i kalendern. Dr. Masoud Sorkhabi · ${MIN} · ${PRIS} · utan remiss`,
    label: "Se lediga tider och boka",
    href: "/boka-tid",
  },
  faqHeading: "Vanliga frågor om ryggont och val av läkare",
  faqs: [
    {
      question: "Måste jag träffa ortoped för att jag har ont i ryggen?",
      answer:
        "Nej. Vårdcentral och fysioterapeut är ofta lämpliga första kontakter. Specialistbedömning blir aktuell utifrån besvären och vad tidigare bedömning visar.",
    },
    {
      question: "Kan jag boka ortoped direkt utan remiss?",
      answer:
        "Ja, till det privata besöket hos oss i Göteborg behöver du ingen remiss. Du väljer tid i bokningskalendern.",
    },
    {
      question: "Kan en ortoped bedöma ryggen även om jag inte vill opereras?",
      answer:
        "Ja. En ortopedisk bedömning innebär inte att du tackar ja till operation. Berätta vad du vill få hjälp med och vilka frågor du har.",
    },
    {
      question: "Behöver jag ett MR-svar för att boka?",
      answer:
        "Nej. Har du redan ett svar är det bra att ta med det. Behovet av nya undersökningar bedöms individuellt.",
    },
    ...(LORDAG
      ? [
          {
            question: "Finns det tider på lördagar?",
            answer: "Vi erbjuder även ortopedbesök på lördagar. Aktuella lediga tider visas i kalendern.",
          },
        ]
      : []),
    {
      question: "Gäller den här guiden även barn?",
      answer:
        "Guiden riktar sig främst till vuxna. För barn, läs om [ryggont hos barn](/artiklar/ryggont-hos-barn) och [ortopedisk bedömning för barn i Göteborg](/artiklar/barnortopedi).",
    },
  ],
};
