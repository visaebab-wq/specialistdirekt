import type { Article } from "@/lib/articles-types";

// Spoke i barnortopedi-klustret. Äger intentionen "ont i hälen hos barn" /
// "Severs sjukdom".
//
// SERP-läget som motiverar sidan: topplistan består nästan uteslutande av
// kliniker och produktförsäljare (hälkoppor, inlägg, naprapati) – 1177 syns inte
// alls i toppen. Sidans värde ligger i att koppla ihop söktermen "Severs" med
// 1177:s faktiska beskrivning, och att vara tydlig med att tillståndet normalt
// inte kräver medicinsk behandling.
//
// AVGRÄNSNINGAR:
// - Pelaren /artiklar/barnortopedi behåller sitt korta hälavsnitt.
// - INGEN kommersiell barn-CTA (åldersgolv/scope overifierat).
// - medicallyReviewed: false tills Dr. Sorkhabi granskat slutversionen.
// - Siffror från kommersiella aktörer (t.ex. "15 % av alla barn") används INTE.
export const article: Article = {
  slug: "ont-i-halen-hos-barn",
  title: "Ont i hälen hos barn – Severs sjukdom, orsaker och vad som hjälper",
  metaTitle: "Ont i hälen hos barn – vad är Severs sjukdom?",
  metaDescription:
    "Ont i hälen är mycket vanligt hos aktiva barn, särskilt pojkar 11–14 år. Läs vad Severs sjukdom är, hur länge det håller i sig och varför det sällan behöver behandlas.",
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
    "Ont i hälen är mycket vanligt hos aktiva barn. Så känner du igen Severs, vad som faktiskt hjälper – och varför besvären sällan kräver medicinsk behandling.",
  published: "2026-08-15",
  updated: "2026-08-15",
  readMinutes: 7,
  wordCount: 1500,
  relatedSpecialty: "ortoped",
  medicallyReviewed: false,
  summary: [
    "Ont i hälen är **mycket vanligt** hos barn, framför allt hos pojkar mellan 11 och 14 år.",
    "Vanligast hos barn som är mycket fysiskt aktiva, särskilt inom fotboll och basket.",
    "Smärtan sitter oftast baktill i hälen och märks tydligast på kvällen efter aktivitet.",
    "**Tillståndet kräver enligt 1177 ingen medicinsk behandling och ger inga framtida komplikationer.**",
    "Besvären avtar successivt, men kan finnas kvar i varierande grad i två till tre år.",
    "Skorna spelar roll: träningsskor med dämpning är bättre än fotbollsskor, och silikoninlägg kan lindra.",
    "Haltar barnet utan tydlig förklaring, eller har feber samtidigt, bör det bedömas.",
  ],
  intro: [
    "**Ont i hälen hos barn kallas ofta Severs sjukdom – men det är varken en sjukdom i vanlig mening eller något som brukar kräva behandling.** Det handlar om att hälbenets tillväxtzon belastas mer än den tål under en period då barnet växer och tränar mycket.",
    "Söker man på Severs möts man snabbt av hälkoppor, inlägg och behandlingsupplägg. Därför är det värt att börja i den andra änden: vad besvären faktiskt är, hur länge de brukar hålla i sig, och vad som är rimligt att göra.",
    "**Kort svar:** ont i hälen är mycket vanligt hos aktiva barn, särskilt pojkar mellan 11 och 14 år. Enligt 1177 kräver det ingen medicinsk behandling och ger inga framtida komplikationer. Besvären avtar successivt men kan hålla i sig i varierande grad i två till tre år. Skobyte och silikoninlägg kan lindra.",
  ],
  sections: [
    {
      id: "vad-ar-severs",
      heading: "Vad är Severs sjukdom?",
      body: [
        "Severs är namnet som ofta används när ett barn får ont baktill i hälen under en period av tillväxt och hög belastning. 1177 beskriver besvären utan att använda diagnosnamnet – där heter det helt enkelt att barnet har **ont i hälarna**.",
        "Det är alltså samma sak: söktermen kommer från kliniker och behandlingsaktörer, medan beskrivningen av besvären är densamma. Namnet i sig säger ingenting om hur allvarligt det är.",
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
      heading: "Behöver barnet behandling?",
      body: [
        "**Nej.** 1177 är tydlig på den punkten: tillståndet **kräver ingen medicinsk behandling och ger inga framtida komplikationer**.",
        "Det är värt att hålla fast vid, eftersom mycket av det som syns när man söker på Severs är produkter och behandlingsupplägg. Att lindra besvären är rimligt – men det är något annat än att besvären måste behandlas för att barnet ska bli bra.",
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
        "Råden ovan handlar om att göra belastningen mer tålig – inte om att barnet ska sluta röra på sig. Att anpassa underlag, skor och träningsmängd under de perioder då hälen är öm är oftast en rimligare väg än ett totalstopp.",
        "Blir barnet däremot allt sämre trots anpassning, eller börjar halta, är det ett skäl att låta undersöka hälen i stället för att fortsätta prova på egen hand.",
      ],
    },
    {
      id: "nar-bor-barnet-undersokas",
      heading: "När bör barnet undersökas?",
      body: [
        "Vanlig hälsmärta hos ett aktivt barn behöver normalt ingen akut bedömning. Ring 1177 om ni är osäkra på besvären eller på vart ni ska vända er.",
        "Låt barnet bli bedömt om något av följande stämmer:",
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
        "Eftersom hälsmärta hos växande barn normalt inte kräver behandling är en ortopedisk bedömning sällan första steget. Den kan däremot bli aktuell om besvären inte stämmer med den vanliga bilden, om de förvärras trots anpassning, eller om något annat behöver uteslutas.",
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
        "Nej. Enligt 1177 kräver tillståndet ingen medicinsk behandling och ger inga framtida komplikationer. Skobyte och silikoninlägg kan däremot lindra besvären.",
    },
    {
      question: "Vilka skor är bäst vid hälsmärta?",
      answer:
        "1177 lyfter fram att träningsskor med dämpning är bättre än fotbollsskor, att silikoninlägg i hälen kan minska besvären och att skor med tjockare sula minskar belastningen på en öm häl.",
    },
    {
      question: "Måste barnet sluta med fotboll?",
      answer:
        "Oftast inte. Att anpassa skor, underlag och träningsmängd under perioder då hälen är öm är vanligtvis rimligare än ett totalstopp. Förvärras besvären trots anpassning bör hälen bedömas.",
    },
    {
      question: "När ska barnet undersökas för hälsmärta?",
      answer:
        "Om barnet haltar utan tydlig förklaring, har feber eller är påverkat i allmäntillståndet, inte kan stödja på foten, fick smärtan plötsligt vid en skada, har en svullen, röd eller varm häl, eller om besvären förvärras trots anpassning.",
    },
  ],
};
