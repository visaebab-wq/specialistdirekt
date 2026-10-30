import type { Article } from "@/lib/articles-types";

// Spoke i barnortopedi-klustret. Äger intentionen "växtvärk hos barn".
//
// VARFÖR SIDAN FINNS: klustret består annars av kroppsdelar (knä, häl, höft,
// rygg, fot). Växtvärk är den godartade förklaring föräldrar oftast landar i –
// och 1177 anger tre konkreta kriterier för när bilden INTE stämmer. Det är den
// beslutsnod klustret saknade. SERP:en toppas av bl.a. en värktablettsajt
// (alvedon.se), en finsk vårdportal och en internationell PDF.
//
// KÄLLDISCIPLIN (1177, Växtvärk – verifierat verbatim 2026-08-15):
// - "Det är fortfarande oklart varför man får växtvärk. Men det förekommer
//   oftare i perioder då barnet växer snabbare."
// - "Växtvärk kan förekomma i alla åldrar men är vanligast mellan tre och tio
//   års ålder."
// - "Det gör ont i låren, underbenen eller runt knäna." / "Det gör ont på
//   kvällen eller natten." / "Det gör oftast ont i båda benen." / "Det brukar
//   göra ont i ett par timmar."
// - "Det finns ingen behandling mot växtvärk." (källan stödjer alltså det
//   negativa påståendet här – till skillnad från Severs-sidan.)
// - Kontakta vårdcentral om: "Värken ger inte med sig, eller om det gör ont på
//   dagen" / "Barnet får svårt att gå, börjar halta" / "Barnet har ont endast i
//   ena benet, eller alltid på samma ställe".
//
// MEDVETET UTELÄMNAT: siffran "10–20 % av alla barn" som cirkulerar i
// kommersiella träffar. Den saknar myndighetskälla.
//
// MEDVETET: ingen varningslista med amber-ikon. 1177:s tre punkter leder till
// vårdcentral, inte till akutvård – warning-ton hade över-triagerat.
//
// AVGRÄNSNINGAR:
// - /artiklar/barn-haltar äger hältan, /artiklar/ont-i-knat-barn knäsmärtan.
//   Den här sidan äger växtvärken som fenomen och länkar dit där 1177:s egna
//   kriterier pekar (halta respektive smärta runt knäna).
// - Pelaren behåller sitt korta växtvärk-avsnitt.
// - INGEN kommersiell barn-CTA (åldersgolv/scope overifierat).
export const article: Article = {
  slug: "vaxtvark-hos-barn",
  title: "Växtvärk hos barn – hur den känns och när det är något annat",
  metaTitle: "Växtvärk hos barn – eller är det något annat?",
  metaDescription:
    "Växtvärk gör ont i benen på kvällen eller natten och är vanligast mellan tre och tio år. Läs vad som lindrar och vilka tecken som talar för något annat.",
  category: "Ortopedi",
  primaryKeyword: "växtvärk hos barn",
  keywords: [
    "växtvärk hos barn",
    "växtvärk barn",
    "växtvärk ålder",
    "växtvärk symtom",
    "ont i benen på natten barn",
    "barn vaknar av ont i benen",
    "är det växtvärk",
  ],
  excerpt:
    "Växtvärk gör ont i benen på kvällen eller natten och går över. Så känner du igen den typiska bilden – och vilka tre tecken som talar för att det är något annat.",
  published: "2026-08-15",
  updated: "2026-08-15",
  readMinutes: 7,
  wordCount: 1400,
  relatedSpecialty: "ortoped",
  // Barnspecifik bokningsmodul. Copy levererad av ChatGPT (logistisk text, inga
  // medicinska påståenden). Faktaraden 0-17 ar / 40 minuter / 2 000 kr /
  // ingen remiss renderas av komponenten fran barn-scope.ts och booking-slots.ts,
  // sa den kan inte glida isar fran bokningssidan.
  cta: {
    heading: "Ortopedisk bedömning för barn i Göteborg",
    body: "Besöket sker på plats hos Dr. Masoud Sorkhabi.",
    label: "Se lediga tider för barn",
    href: "/boka-tid/barn",
    secondary: {
      label: "Läs om ortopedisk bedömning för barn",
      href: "/artiklar/barnortopedi",
    },
  },
  summary: [
    "Växtvärk gör ont i **låren, underbenen eller runt knäna**.",
    "Det gör ont på **kvällen eller natten** – och oftast i **båda benen**.",
    "Värken brukar hålla i sig i ett par timmar.",
    "Växtvärk är vanligast mellan **tre och tio års ålder**, men kan förekomma i alla åldrar.",
    "Massage och värme kan lindra. **Det finns ingen behandling mot växtvärk.**",
    "**Gör det ont på dagen, haltar barnet, eller sitter smärtan bara i ena benet – då talar det emot växtvärk.**",
    "Kontakta vårdcentralen om något av de tecknen stämmer, eller om värken inte ger med sig.",
  ],
  intro: [
    "**Ett barn som vaknar på natten och har ont i benen skrämmer de flesta föräldrar.** Oftast handlar det om växtvärk – ett vanligt och godartat besvär som går över av sig självt.",
    "Men växtvärk har en ganska tydlig profil. När symtomen ser annorlunda ut är det värt att ta reda på varför, i stället för att kalla allt ont i benen för växtvärk.",
    "**Kort svar:** typisk växtvärk gör ont i låren, underbenen eller runt knäna, på kvällen eller natten, oftast i båda benen, och i ett par timmar. Massage och värme kan lindra. **Gör det däremot ont på dagen, börjar barnet halta, eller sitter smärtan bara i ena benet eller alltid på samma ställe – kontakta vårdcentralen.** Det talar emot växtvärk.",
  ],
  sections: [
    {
      id: "vad-ar-vaxtvark",
      heading: "Vad är växtvärk?",
      body: [
        "Växtvärk är värk i benen som kommer i perioder under barndomen och går över av sig självt. Den är godartad, men värken barnet känner är verklig.",
        "1177 anger att **det fortfarande är oklart varför man får växtvärk**, men att den förekommer oftare i perioder då barnet växer snabbare. Namnet beskriver alltså när besvären brukar dyka upp – inte en fastställd orsak.",
      ],
    },
    {
      id: "i-vilken-alder",
      heading: "I vilken ålder är växtvärk vanligast?",
      body: [
        "Enligt 1177 kan växtvärk förekomma i alla åldrar, men är **vanligast mellan tre och tio års ålder**.",
        "Det betyder att åldern i sig sällan avgör något. Ett barn utanför det spannet kan ha växtvärk, och ett barn mitt i spannet kan ha ont av någon annan anledning – det är symtombilden som skiljer.",
      ],
    },
    {
      id: "hur-kanns-vaxtvark",
      heading: "Hur känns växtvärk – och när på dygnet?",
      body: [
        "Den typiska bilden är förvånansvärt konsekvent, och den är också det bästa verktyget föräldrar har. 1177 beskriver att:",
      ],
      bullets: [
        "det gör ont i **låren, underbenen eller runt knäna**",
        "det gör ont på **kvällen eller natten**",
        "det gör **oftast ont i båda benen**",
        "värken brukar hålla i sig **ett par timmar**.",
      ],
    },
    {
      id: "beror-det-pa-tillvaxten",
      heading: "Beror växtvärk på att barnet växer?",
      body: [
        "Inte på det sätt namnet antyder. 1177 är tydlig med att orsaken fortfarande är oklar – det som konstateras är att besvären förekommer oftare under perioder av snabbare tillväxt.",
        "Det är en viktig nyans: växtvärk är en beskrivning av ett mönster, inte en förklaringsmodell. Därför säger namnet i sig ingenting om hur allvarligt något är, och det duger inte som förklaring när symtomen ser annorlunda ut.",
      ],
    },
    {
      id: "vad-kan-man-gora-hemma",
      heading: "Vad kan man göra hemma?",
      body: [
        "Det som hjälper är enkelt. Du kan massera barnets ben, och värme kan också lindra. **Det finns ingen behandling mot växtvärk** – enligt 1177 kan receptfria smärtstillande läkemedel övervägas om massage och värme inte räcker.",
        "Att det inte finns någon behandling är i sammanhanget ett lugnande besked: det finns inget barnet går miste om genom att man avvaktar, så länge bilden stämmer med växtvärk.",
      ],
    },
    {
      id: "nar-ar-det-inte-vaxtvark",
      heading: "När är det inte växtvärk?",
      body: [
        "Här ligger sidans viktigaste besked. 1177 anger tre situationer då du bör kontakta en vårdcentral – och de fungerar samtidigt som en checklista för när bilden **inte** stämmer med växtvärk:",
      ],
      bullets: [
        "**värken ger inte med sig, eller det gör ont på dagen**",
        "**barnet får svårt att gå eller börjar halta**",
        "**barnet har ont endast i ena benet, eller alltid på samma ställe**.",
      ],
    },
    {
      id: "vad-de-tecknen-betyder",
      heading: "Vad betyder de tecknen?",
      body: [
        "Ingen av punkterna betyder att något allvarligt pågår. De betyder att förklaringen sannolikt är en annan än växtvärk, och att den är värd att leta reda på.",
        "**Börjar barnet halta** är det ett symtom i sig som bör bedömas – hälta kan komma från fot, knä eller höft, och barn pekar inte alltid på rätt ställe. Mer om det i guiden om [barn som haltar](/artiklar/barn-haltar).",
        "**Sitter smärtan alltid på samma ställe**, exempelvis runt knät hos ett aktivt barn, kan det handla om ett belastningsrelaterat besvär snarare än växtvärk. Mer om det i guiden om [ont i knät hos barn](/artiklar/ont-i-knat-barn).",
      ],
    },
    {
      id: "nar-bor-barnet-undersokas",
      heading: "När bör barnet undersökas?",
      body: [
        "Kontakta en vårdcentral om något av de tre tecknen ovan stämmer. Ring 1177 om du är osäker på om barnets besvär behöver bedömas eller vart du ska vända dig.",
        "Syftet med en bedömning är inte att leta efter något allvarligt, utan att förstå vad värken faktiskt beror på när mönstret inte stämmer. Ofta räcker en klinisk undersökning för att komma vidare.",
      ],
    },
    {
      id: "ortopedisk-bedomning",
      heading: "När kan en ortopedisk bedömning vara aktuell?",
      body: [
        "Typisk växtvärk är inget skäl att träffa ortoped. Vägen går normalt via vårdcentralen, som kan bedöma om något mer behövs.",
        "En ortopedisk bedömning kan däremot bli aktuell när värken visar sig ha en annan förklaring – exempelvis kvarstående ensidig smärta, hälta som inte går över, eller belastningsbesvär som inte förbättras. Mer om när barn kan behöva en sådan bedömning finns i guiden om [barnortopedi](/artiklar/barnortopedi).",
      ],
    },
    {
      id: "kallor-vaxtvark-hos-barn",
      heading: "Källor",
      body: [
        "Innehållet är generell medicinsk information och ersätter inte en individuell bedömning. Uppgifterna om symtombild, ålder, egenvård och när vård bör sökas är hämtade från 1177.",
      ],
      bullets: [
        "[1177 – Växtvärk](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/vaxtvark/)",
      ],
    },
  ],
  faqs: [
    {
      question: "Hur känns växtvärk hos barn?",
      answer:
        "Det gör ont i låren, underbenen eller runt knäna, på kvällen eller natten, och oftast i båda benen. Värken brukar hålla i sig i ett par timmar.",
    },
    {
      question: "I vilken ålder är växtvärk vanligast?",
      answer:
        "Enligt 1177 kan växtvärk förekomma i alla åldrar, men är vanligast mellan tre och tio års ålder.",
    },
    {
      question: "Beror växtvärk verkligen på att barnet växer?",
      answer:
        "Det är fortfarande oklart varför man får växtvärk. 1177 anger att den förekommer oftare i perioder då barnet växer snabbare, men orsaken är inte fastställd.",
    },
    {
      question: "Vad hjälper mot växtvärk?",
      answer:
        "Massage och värme kan lindra. Det finns ingen behandling mot växtvärk, men receptfria smärtstillande läkemedel kan övervägas om massage och värme inte räcker.",
    },
    {
      question: "När är det inte växtvärk?",
      answer:
        "1177 anger tre tecken som talar emot växtvärk: att värken inte ger med sig eller att det gör ont på dagen, att barnet får svårt att gå eller börjar halta, och att barnet har ont endast i ena benet eller alltid på samma ställe. Kontakta då vårdcentralen.",
    },
    {
      question: "Mitt barn haltar och har ont i benen – är det växtvärk?",
      answer:
        "Hälta talar emot växtvärk. Ett barn som börjar halta bör bedömas, eftersom hälta kan komma från fot, knä eller höft och barn inte alltid pekar på rätt ställe.",
    },
    {
      question: "Behöver barn med växtvärk träffa ortoped?",
      answer:
        "Nej, typisk växtvärk är inget skäl att träffa ortoped. Bedömning kan bli aktuell när värken visar sig ha en annan förklaring, exempelvis ensidig smärta som kvarstår eller hälta som inte går över.",
    },
  ],
};
