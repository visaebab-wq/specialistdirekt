import type { Article } from "@/lib/articles-types";
import { BOOKING_PRICE_SEK, BOOKING_SLOT_MINUTES, formatPrice } from "@/lib/booking-slots";

// Text skriven av ägaren 2026-10-31. Sidan täcker hälta hos barn; den lokala
// sökningen "barnortoped göteborg" ägs av /artiklar/barnortopedi. Förklarande
// länkar går dit, bokningslänkar direkt till /boka-tid/barn. Pris och
// besökslängd kommer från bokningens egna konstanter.
const PRIS = `${formatPrice(BOOKING_PRICE_SEK)} kr`;
const MIN = `${BOOKING_SLOT_MINUTES} minuter`;

export const article: Article = {
  slug: "barn-haltar",
  title: "Barn haltar – när ska man söka vård?",
  metaTitle: "Barn haltar – när ska man söka vård?",
  metaDescription:
    "Haltar ditt barn med eller utan smärta? Läs när ni ska söka vård direkt, vad läkaren undersöker och när en planerad bedömning kan passa.",
  category: "Ortopedi",
  primaryKeyword: "barn haltar",
  keywords: [
    "barn haltar",
    "barn haltar utan smärta",
    "hälta hos barn",
    "barn haltar efter förkylning",
    "höftsnuva barn",
    "coxitis simplex",
    "barn haltar plötsligt",
  ],
  excerpt:
    "Haltar ditt barn med eller utan smärta? Läs när ni ska söka vård direkt, vad läkaren undersöker och när en planerad bedömning kan passa.",
  published: "2026-08-15",
  updated: "2026-10-31",
  readMinutes: 9,
  wordCount: 1500,
  relatedSpecialty: "ortoped",
  // Texten 2026-10-31 är granskad och godkänd av läkaren (ägaren 2026-11-01).
  // Bokningsrutan efter artikeln ("Nästa steg för ditt barn"): primär länk till
  // bokningen, sekundär till navet. Faktaraden byggs av komponenten.
  cta: {
    heading: "Nästa steg för ditt barn",
    body: "Vid nytillkommen eller oförklarlig hälta: kontakta vården för bedömning och rätt prioritering. För besvär som lämpar sig för ett planerat ortopedbesök i Göteborg kan du läsa om mottagningen eller se bokningsbara tider.",
    label: "Se lediga tider för barn och ungdomar",
    href: "/boka-tid/barn",
    secondary: {
      label: "Läs om ortoped för barn i Göteborg",
      href: "/artiklar/barnortopedi",
    },
  },
  // Varningen om när barnet behöver vård direkt ligger högst upp, före
  // innehållsförteckningen (ägarens ordning).
  leadIntro: true,
  intro: [
    "**Oförklarlig hälta hos barn behöver bedömas av läkare. Sök vård genast om barnet samtidigt har feber eller inte kan stå på benet. Att barnet inte säger att det gör ont utesluter inte att något behöver undersökas.**",
    "Barnet kanske har börjat gå försiktigt, avlastar ena benet eller vill bli buret oftare. För dig som förälder är den första frågan hur snabbt ni behöver söka hjälp. Därefter handlar det om att förstå orsaken och få en plan.",
  ],
  sections: [
    {
      id: "soka-vard-snabbt",
      heading: "När behöver barnet vård direkt?",
      beforeToc: true,
      body: [
        "Kontakta genast vårdcentral eller jouröppen mottagning om barnet haltar och har feber eller inte kan stå på benet. Är det stängt, sök akutmottagning.",
        "Ett barn som verkar tydligt sjukt eller har kraftig smärta behöver också snabb bedömning. Efter en skada kan även ett till synes mindre fall vara relevant.",
        "**Vänta inte på en planerad privat tid vid akuta symtom.** Ring 1177 om du är osäker på vart ni ska vända er. Vid en allvarlig olycka eller ett livshotande tillstånd, ring 112.",
      ],
    },
    {
      id: "undersokas-icke-akut",
      heading: "Barnet haltar utan feber – behöver vi ändå söka?",
      body: [
        "Ja, om hältan saknar tydlig förklaring behöver barnet undersökas. Frånvaro av feber räcker inte för att avgöra att det är ofarligt.",
        "Kontakta vårdcentral för hjälp med bedömningen, särskilt om hältan fortsätter eller kommer tillbaka. Berätta när den började, om barnet har skadat sig och hur barnet belastar benet.",
        "Du behöver inte själv avgöra om problemet sitter i foten, knät eller höften innan du kontaktar vården.",
      ],
    },
    {
      id: "haltar-utan-att-ha-ont",
      heading: "Barnet haltar men säger att det inte gör ont",
      body: [
        "Yngre barn kan ha svårt att beskriva både smärtan och var den sitter. Förändringen kan i stället märkas genom att barnet undviker att springa, går annorlunda eller inte vill belasta benet.",
        "Beskriv det du faktiskt ser när du kontaktar vården. ”Hon går på tå på ena sidan sedan i går” eller ”han vill bli buren efter några steg” är mer användbart än att försöka sätta en diagnos.",
        "Be inte barnet gå eller hoppa upprepade gånger för att testa om det fortfarande gör ont.",
      ],
    },
    {
      id: "vanliga-orsaker",
      heading: "Vad kan hältan bero på?",
      body: [
        "Hälta kan ha flera orsaker. Det går inte att avgöra vilken som gäller enbart genom att titta på gången.",
      ],
      subsections: [
        {
          id: "skada",
          heading: "En skada",
          body: [
            "Ett fall, en vridning eller annan skada kan ligga bakom. Berätta även om händelser som först verkade obetydliga. Det är läkaren som bedömer om skadan kan förklara besvären och om vidare undersökning behövs.",
          ],
        },
        {
          id: "halta-efter-forkylning",
          heading: "Höftsnuva efter en infektion",
          body: [
            "En tillfällig inflammation i höftleden, coxitis simplex eller höftsnuva, kan förekomma efter en virusinfektion.",
            "Men en nylig förkylning räcker inte för att fastställa den diagnosen. Feber, allmäntillstånd och barnets förmåga att belasta behöver vägas in så att andra orsaker inte missas.",
          ],
        },
        {
          id: "andra-besvar",
          heading: "Andra besvär från leder eller skelett",
          body: [
            "Även andra tillstånd kan påverka hur barnet går. Därför behöver en oförklarlig hälta bedömas, snarare än behandlas utifrån en gissning hemma.",
          ],
        },
      ],
      bodyAfter: [
        "Det viktiga är att få rätt undersökning, inte att själv välja mellan olika diagnoser före besöket.",
      ],
    },
    {
      id: "knasmarta-fran-hoften",
      heading: "Kan smärtan komma från höften om barnet pekar på knät?",
      body: [
        "**Ja. Smärta från höften kan upplevas kring knät.** Läkaren kan därför behöva undersöka mer än den plats barnet pekar på.",
        "Berätta både var barnet säger att det gör ont och vilka rörelser som har förändrats. Läs mer i guiderna om [ont i höften hos barn](/artiklar/ont-i-hoften-hos-barn) och [ont i knät hos barn](/artiklar/ont-i-knat-barn).",
      ],
    },
    {
      id: "ar-vaxtvark-en-orsak",
      heading: "Är det växtvärk?",
      body: [
        "Hälta ska inte automatiskt förklaras med växtvärk.",
        "Typisk växtvärk kommer på kvällen eller natten och barnet är utan besvär under dagen. Kontakta vårdcentral om barnet börjar halta, har ont på dagen eller återkommande har ont på samma ställe.",
        "Läs mer om [växtvärk hos barn](/artiklar/vaxtvark-hos-barn).",
      ],
    },
    {
      id: "vad-undersoker-lakaren",
      heading: "Vad undersöker läkaren?",
      body: [
        "Bedömningen utgår från hur besvären började och hur barnet mår och rör sig. Läkaren kan undersöka gången, ledernas rörlighet och om det finns ömhet eller svullnad.",
        "Beroende på fynden kan prover eller bilddiagnostik bli aktuella. Röntgen, ultraljud och MR besvarar olika frågor; valet görs utifrån vad läkaren behöver undersöka vidare.",
        "Ett tidigare normalt röntgensvar utesluter inte alla orsaker. Om hältan fortsätter eller barnet försämras behöver ni följa upp besvären enligt vårdens råd.",
      ],
    },
    {
      id: "forbered-beskrivning",
      heading: "Förbered en kort beskrivning inför vårdkontakten",
      body: [
        "Du behöver inte skriva en lång sjukdomshistoria. Följande uppgifter hjälper er att få fram det viktigaste:",
      ],
      table: {
        columns: ["Uppgift", "Vad du kan anteckna"],
        rows: [
          ["När det började", "Datum och om förändringen kom plötsligt eller gradvis."],
          ["Hur barnet går", "Vilket ben barnet avlastar och om barnet kan stå på det."],
          ["Smärta", "Var barnet pekar och när besvären märks."],
          ["Andra symtom", "Exempelvis uppmätt feber, svullnad eller förändrat allmäntillstånd."],
          ["Tidigare händelser", "Fall, idrott, annan skada eller nylig infektion."],
          ["Tidigare vård", "Vad som undersökts och vilka råd ni fått."],
        ],
      },
      bodyAfter: [
        "Anteckningarna ska inte fördröja vårdkontakten om barnet behöver hjälp direkt.",
      ],
    },
    {
      id: "ortopedisk-bedomning",
      heading: "När kan en planerad ortopedisk bedömning passa?",
      body: [
        "En planerad bedömning kan vara relevant för kvarstående eller återkommande besvär som inte kräver akut vård. Det kan exempelvis finnas en fråga om fortsatt ortopedisk utredning efter en tidigare vårdkontakt.",
        "Om barnet nyligen har börjat halta och orsaken är oklar, kontakta vården för att få rätt prioritering. Välj inte en senare kalenderbokning som ersättning för den bedömningen.",
        "Inför ett planerat besök kan ni formulera vad ni behöver hjälp med:",
      ],
      bullets: [
        "Vad behöver undersökas vidare?",
        "Hur ska vi följa upp att barnet fortfarande går annorlunda?",
        "Hur ska tidigare undersökningssvar användas?",
        "Vem ansvarar för nästa steg?",
      ],
      bodyAfter: [
        "Läs mer om [ortopedisk bedömning för barn i Göteborg](/artiklar/barnortopedi).",
      ],
    },
    {
      id: "planerat-besok-barn-goteborg",
      heading: "Planerat besök för barn i Göteborg",
      body: ["Hos oss träffar ni Dr. Masoud Sorkhabi för en planerad ortopedisk bedömning."],
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
      bodyAfter: [
        "Kontrollera bokningssidans information om vilka åldrar och besvär mottagningen tar emot. Besökspriset innebär inte att eventuell bilddiagnostik eller fortsatt behandling automatiskt ingår.",
        "[Se tider för planerad ortopedisk bedömning av barn](/boka-tid/barn)",
        "Är du osäker på om mottagningen passar barnets frågeställning kan du [kontakta oss före bokning](/kontakt). För bedömning av hur bråttom symtomen är, kontakta 1177.",
      ],
    },
    {
      id: "efter-undersokningen",
      heading: "Efter undersökningen: be om en tydlig uppföljningsplan",
      body: ["Innan ni lämnar besöket är det bra att få svar på:"],
      ordered: true,
      bullets: [
        "Vad visar undersökningen hittills?",
        "Finns det något som behöver utredas vidare?",
        "Vilka råd gäller för gång, lek och idrott?",
        "När ska barnet följas upp om hältan fortsätter?",
        "Vilka förändringar innebär att ni ska söka vård tidigare?",
      ],
      bodyAfter: [
        "Om ni redan har fått en plan men barnet får nya symtom, kontakta vården igen. Berätta vad som har förändrats sedan undersökningen.",
      ],
    },
  ],
  outro: [
    "Informationen är ett stöd inför vårdkontakt och ersätter inte en individuell medicinsk bedömning.",
    "**Medicinskt faktaunderlag:** 1177 – Höftbesvär hos barn och Växtvärk; 1177 för vårdpersonal – Hälta hos barn; Rikshandboken i barnhälsovård – Hälta.",
  ],
  faqHeading: "Vanliga frågor om barn som haltar",
  faqs: [
    {
      question: "Kan barnet behöva undersökas även om det inte har ont?",
      answer:
        "Ja. Barn kan ha svårt att beskriva besvären. Oförklarlig hälta behöver bedömas även utan tydligt beskriven smärta.",
    },
    {
      question: "Barnet har varit förkylt. Är det höftsnuva?",
      answer:
        "Det är en möjlig förklaring, men det går inte att avgöra hemma utifrån förkylningen. Barnets symtom och undersökningen behöver vägas samman.",
    },
    {
      question: "Kan vi vänta till en bokad tid nästa vecka?",
      answer:
        "Inte om barnet har symtom som behöver snabbare vård. Vid feber eller oförmåga att stå på benet ska ni söka genast. Ring 1177 vid osäkerhet.",
    },
    {
      question: "Behöver barnet MR före ett ortopedbesök?",
      answer:
        "Nej, beställ inte MR enbart för att förbereda besöket. Läkaren bedömer vilken undersökning som i så fall behövs. Ta med befintliga svar och information om tidigare utredning.",
    },
    {
      question: "Behöver vi remiss för ett planerat besök hos er?",
      answer:
        "Nej. Till det privata ortopedbesöket hos oss i Göteborg behövs ingen remiss. Det förändrar inte råden om att söka snabbare vård vid akuta symtom.",
    },
    {
      question: "Vad kostar besöket?",
      answer: `Det planerade ortopedbesöket kostar ${PRIS} och den avsatta tiden är ${MIN}. Be om separat kostnadsinformation om ytterligare undersökningar eller besök föreslås.`,
    },
  ],
};
