import type { Article } from "@/lib/articles-types";

// Spoke i barnortopedi-klustret. Äger intentionen "ont i hälen hos barn" /
// "Severs sjukdom".
//
// SERP-läget som motiverar sidan: topplistan består nästan uteslutande av
// kliniker och produktförsäljare (hälkoppor, inlägg, naprapati) – 1177 syns inte
// alls i toppen. Sidans värde ligger i att koppla ihop söktermen "Severs" med
// 1177:s faktiska beskrivning.
//
// KÄLLDISCIPLIN: 1177 säger att ont i hälen "sällan är tecken på något
// allvarligt", att symtomen "går efter hand över av sig själva" och att
// tillståndet "leder inte till några komplikationer i framtiden" – men INTE att
// medicinsk behandling är onödig. Sidan får därför inte påstå det. 1177 anger
// också att symtomen "kan lindras" med hälinlägg och tjocksulade skor.
//
// AVGRÄNSNINGAR:
// - Pelaren /artiklar/barnortopedi behåller sitt korta hälavsnitt.
// - INGEN kommersiell barn-CTA (åldersgolv/scope overifierat).
// - Siffror från kommersiella aktörer (t.ex. "15 % av alla barn") används INTE.
export const article: Article = {
  slug: "ont-i-halen-hos-barn",
  title: "Ont i hälen hos barn – Severs sjukdom, orsaker och vad som hjälper",
  metaTitle: "Ont i hälen hos barn – vad är Severs sjukdom?",
  metaDescription:
    "Ont i hälen är mycket vanligt hos aktiva barn, särskilt pojkar 11–14 år. Läs vad Severs sjukdom är, hur länge besvären brukar hålla i sig och när barnet bör bedömas.",
  category: "Ortopedi",
  primaryKeyword: "ont i hälen hos barn",
  keywords: [
    "ont i hälen hos barn",
    "ont i hälen barn",
    "severs sjukdom",
    "severs skada",
    "hälsmärta barn",
    "barn ont i hälen efter fotboll",
    "hälsmärta växande barn",
  ],
  excerpt:
    "Ont i hälen är mycket vanligt hos aktiva barn. Så känner du igen den typiska bilden vid Severs, vad som lindrar – och när besvären bör bedömas av vården.",
  published: "2026-08-15",
  updated: "2026-08-15",
  readMinutes: 7,
  wordCount: 1500,
  relatedSpecialty: "ortoped",
  summary: [
    "Ont i hälen är **mycket vanligt** hos barn, framför allt hos pojkar mellan 11 och 14 år.",
    "Vanligast hos barn som är mycket fysiskt aktiva, särskilt inom fotboll och basket.",
    "Smärtan sitter oftast baktill i hälen och märks tydligast på kvällen efter aktivitet.",
    "Enligt 1177 är ont i hälen **sällan tecken på något allvarligt**, och tillståndet leder inte till några komplikationer i framtiden.",
    "Symtomen kan samtidigt vara ganska intensiva och finnas kvar i varierande grad i två till tre år.",
    "Skorna spelar roll: träningsskor med dämpning är bättre än fotbollsskor, och silikoninlägg kan lindra.",
    "**All hälsmärta hos barn är inte Severs** – vid långdragna, oklara eller funktionspåverkande besvär kan en bedömning behövas.",
    "Haltar barnet utan tydlig förklaring, eller har feber samtidigt, bör det bedömas.",
  ],
  intro: [
    "**Ont i hälen hos barn kallas ofta Severs sjukdom, eller calcaneal apofysit.** Det handlar om att tillväxtzonen i hälbenet belastas mer än den tål under en period då barnet växer och tränar mycket. Enligt 1177 är ont i hälen sällan tecken på något allvarligt.",
    "Söker man på Severs möts man snabbt av hälkoppor, inlägg och behandlingsupplägg. Därför är det värt att börja i den andra änden: vad besvären faktiskt är, hur länge de brukar hålla i sig, och vad som är rimligt att göra.",
    "**Kort svar:** ont i hälen är mycket vanligt hos aktiva barn, särskilt pojkar mellan 11 och 14 år. Enligt 1177 går besvären efter hand över av sig själva och leder inte till några komplikationer i framtiden – men symtomen kan under tiden vara ganska intensiva och hålla i sig i varierande grad i två till tre år. Hälinlägg av silikon och skor med tjock sula kan lindra. All hälsmärta hos barn är däremot inte Severs: är besvären långdragna, oklara eller påverkar gång och idrott kan en medicinsk bedömning behövas.",
  ],
  sections: [
    {
      id: "vad-ar-severs",
      heading: "Vad är Severs sjukdom?",
      body: [
        "Severs sjukdom, även kallad **calcaneal apofysit**, innebär att tillväxtzonen i hälbenet belastas mer än den tål under en period av snabb tillväxt och hög aktivitet. Smärtan sitter typiskt baktill i hälen.",
        "1177 använder inte diagnosnamnet Severs på sin sida om fotbesvär hos barn, utan beskriver besvären som **ont i hälarna** hos barn. Beskrivningen där – belastningsrelaterad hälsmärta hos aktiva barn i en viss ålder – överlappar den typiska bilden vid Severs.",
        "**All hälsmärta hos barn är däremot inte Severs.** Smärta i hälen kan också ha andra orsaker, till exempel en skada, och den typiska bilden stämmer inte alltid. Det är ett av skälen till att långdragna eller oklara besvär bör bedömas.",
      ],
    },
    {
      id: "vem-far-ont-i-halen",
      heading: "Vem får ont i hälen?",
      body: [
        "Enligt 1177 är ont i hälen **mycket vanligt**, framför allt hos **pojkar mellan 11 och 14 år**. Det drabbar särskilt barn som är mycket fysiskt aktiva – fotboll och basket nämns särskilt.",
        "Att besvären kommer just i den åldern är ingen slump: det sammanfaller med en period av snabb tillväxt samtidigt som träningsmängden ofta ökar.",
      ],
    },
    {
      id: "hur-kanns-det",
      heading: "Hur känns det – och när gör det ont?",
      body: [
        "Smärtan sitter oftast **baktill i hälen**. Den märks tydligast på kvällen efter aktivitet, men barnet kan också ha ont på morgonen och tycka att det är svårt att gå.",
        "Ett typiskt mönster är alltså att barnet klarar träningen någorlunda, men blir öm efteråt – och att det svänger från dag till dag beroende på hur mycket det har belastats.",
      ],
    },
    {
      id: "hur-lange-haller-det-i-sig",
      heading: "Hur länge håller besvären i sig?",
      body: [
        "Det här är den fråga föräldrar oftast blir förvånade över svaret på. Besvären avtar successivt, men enligt 1177 kan barnet ha ont i **varierande grad i två till tre år**.",
        "Det betyder inte att barnet har ont hela tiden under de åren, utan att besvären kan komma och gå i perioder – ofta i takt med träningsbelastning och tillväxt. Att det tar tid är alltså i sig inget tecken på att något är fel.",
      ],
    },
    {
      id: "behover-barnet-behandling",
      heading: "Behöver besvären behandlas?",
      body: [
        "Enligt 1177 går symtomen **efter hand över av sig själva**, och tillståndet **leder inte till några komplikationer i framtiden**. Samtidigt kan symtomen vara ganska intensiva under perioder.",
        "Behandlingen handlar därför i första hand om att lindra och avlasta snarare än att bota. 1177 anger att symtomen **kan lindras** med hälinlägg av silikon, och att skor med tjock sula under hälen kan minska belastningen på den ömma hälen.",
        "En medicinsk bedömning kan ändå vara motiverad – inte för att besvären ovillkorligen måste behandlas, utan för att få klarhet i vad smärtan beror på, utesluta andra orsaker och få råd om belastning och återgång till idrott. Det är särskilt rimligt om bilden inte stämmer med den typiska.",
      ],
    },
    {
      id: "vad-kan-man-gora-hemma",
      heading: "Vad kan man göra hemma?",
      body: [
        "Det mest konkreta rådet handlar om skorna. 1177 lyfter fram att man bör titta på barnets skor och att:",
      ],
      bullets: [
        "träningsskor med dämpning är bättre än fotbollsskor",
        "silikoninlägg i hälen kan minska besvären",
        "skor med tjockare sula minskar belastningen på en öm häl.",
      ],
    },
    {
      id: "maste-barnet-sluta-idrotta",
      heading: "Måste barnet sluta idrotta?",
      body: [
        "Barnet behöver inte automatiskt sluta med all idrott. Belastningen bör anpassas efter smärtan, och aktiviteter som tydligt förvärrar besvären kan behöva minskas tillfälligt.",
        "1177:s skoråd pekar åt samma håll: träningsskor med stötdämpning för hälen är bättre än fotbollsskor med dobbar, som inte alltid är uppbyggda inne i skon.",
        "Blir barnet sämre trots anpassning, eller börjar halta, är det ett skäl att låta undersöka hälen i stället för att fortsätta prova på egen hand.",
      ],
    },
    {
      id: "nar-bor-barnet-undersokas",
      heading: "När bör barnet undersökas?",
      body: [
        "Vanlig hälsmärta hos ett aktivt barn kräver sällan akut vård – 1177 anger att ont i hälen sällan är tecken på något allvarligt. Ring 1177 om ni är osäkra på besvären eller på vart ni ska vända er.",
        "En bedömning är rimlig om besvären är långdragna eller återkommande, om de tydligt påverkar gång och idrott, eller om ni är osäkra på om bilden verkligen stämmer med Severs. Då kan orsaken klarläggas, andra orsaker uteslutas och belastningen anpassas.",
        "Låt barnet bli bedömt utan att vänta om något av följande stämmer:",
      ],
      bulletTone: "warning",
      bullets: [
        "barnet **haltar utan tydlig förklaring** – hälta hos barn bör alltid bedömas medicinskt",
        "barnet har feber eller är tydligt påverkat i sitt allmäntillstånd samtidigt som det har ont",
        "barnet kan inte stödja på foten",
        "smärtan kom plötsligt i samband med en skada",
        "hälen är svullen, röd eller varm",
        "besvären förvärras trots anpassade skor och belastning.",
      ],
    },
    {
      id: "nar-ar-ortopedbedomning-aktuell",
      heading: "När kan en ortopedbedömning vara aktuell?",
      body: [
        "Vid en typisk bild av Severs är vårdcentral eller fysioterapeut oftast första steget. En ortopedisk bedömning kan bli aktuell om besvären inte stämmer med den vanliga bilden, om de är långdragna eller förvärras trots anpassning, eller om något annat behöver uteslutas.",
        "Vägen dit går normalt via vårdcentralen. Mer om när barn kan behöva en ortopedisk bedömning finns i guiden om [barnortopedi](/artiklar/barnortopedi).",
        "Har barnet i stället besvär från knät eller ryggen finns egna guider om [ont i knät hos barn](/artiklar/ont-i-knat-barn) och [ryggont hos barn](/artiklar/ryggont-hos-barn) – båda är, precis som hälsmärta, ofta belastnings- och tillväxtrelaterade.",
      ],
    },
    {
      id: "kallor-ont-i-halen-hos-barn",
      heading: "Källor",
      body: [
        "Innehållet är allmän information och ersätter inte en individuell medicinsk bedömning. Informationen bygger på offentliga primärkällor:",
      ],
      bullets: [
        "[1177 – Fotbesvär hos barn](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/ben-och-fotter/fotbesvar-hos-barn/)",
        "[1177 för vårdpersonal – Hälta hos barn](https://vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/halta-hos-barn/)",
      ],
    },
  ],
  faqs: [
    {
      question: "Vad är Severs sjukdom?",
      answer:
        "Severs är det namn som ofta används när ett barn får ont baktill i hälen under en period av tillväxt och hög belastning. 1177 beskriver samma besvär utan diagnosnamn, som ont i hälarna hos barn.",
    },
    {
      question: "Hur vanligt är det att barn har ont i hälen?",
      answer:
        "Mycket vanligt, framför allt hos pojkar mellan 11 och 14 år, och särskilt hos barn som är mycket fysiskt aktiva – till exempel inom fotboll och basket.",
    },
    {
      question: "Hur länge har man ont i hälen?",
      answer:
        "Besvären avtar successivt, men enligt 1177 kan barnet ha ont i varierande grad i två till tre år. Det innebär oftast perioder som kommer och går, inte konstant smärta.",
    },
    {
      question: "Behöver Severs behandlas?",
      answer:
        "Enligt 1177 går symtomen efter hand över av sig själva och tillståndet leder inte till några komplikationer i framtiden. Symtomen kan lindras med hälinlägg av silikon och skor med tjock sula. En medicinsk bedömning kan ändå vara motiverad vid långdragna, oklara eller funktionspåverkande besvär.",
    },
    {
      question: "Vilka skor är bäst vid hälsmärta?",
      answer:
        "1177 lyfter fram att träningsskor med dämpning är bättre än fotbollsskor, att silikoninlägg i hälen kan minska besvären och att skor med tjockare sula minskar belastningen på en öm häl.",
    },
    {
      question: "Måste barnet sluta med fotboll?",
      answer:
        "Barnet behöver inte automatiskt sluta med all idrott. Belastningen bör anpassas efter smärtan, och aktiviteter som tydligt förvärrar besvären kan behöva minskas tillfälligt. Förvärras besvären trots anpassning bör hälen bedömas.",
    },
    {
      question: "Är all hälsmärta hos barn Severs sjukdom?",
      answer:
        "Nej. Beskrivningen av belastningsrelaterad hälsmärta hos aktiva barn överlappar den typiska bilden vid Severs, men hälsmärta kan också ha andra orsaker, till exempel en skada. Stämmer inte bilden, eller är besvären långdragna, bör barnet bedömas.",
    },
    {
      question: "När ska barnet undersökas för hälsmärta?",
      answer:
        "Om barnet haltar utan tydlig förklaring, har feber eller är påverkat i allmäntillståndet, inte kan stödja på foten, fick smärtan plötsligt vid en skada, har en svullen, röd eller varm häl, eller om besvären förvärras trots anpassning.",
    },
  ],
};
