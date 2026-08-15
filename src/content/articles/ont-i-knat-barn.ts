import type { Article } from "@/lib/articles-types";

// Spoke i barnortopedi-klustret. Äger intentionen "ont i knät hos barn".
//
// AVGRÄNSNINGAR (se docs/seo-reports/barnortopedi-spoke-spec-2026-08-15.md):
// - Pelaren /artiklar/barnortopedi äger "barnortopedi"/"barnortoped" – den här
//   sidan får inte konkurrera om dem. Varken barnortoped, barnortopedi eller
//   Göteborg förekommer i metaTitle eller title.
// - /artiklar/vilken-lakare-knasmarta äger vuxen-/generell knäsmärta.
// - /artiklar/mr-kna-vad-visar äger vad MR av knät visar; här sägs bara NÄR
//   bilddiagnostik kan bli aktuell.
// - INGEN kommersiell barn-CTA. Åldersgolv och pediatrisk scope för den
//   anslutna kapaciteten är inte verifierade, och tills de är det ska
//   vårdrouting hållas neutral (vårdcentral/1177/fysioterapeut/akut).
//   Konverteringsvägen ligger hos pelaren, inte här.
export const article: Article = {
  slug: "ont-i-knat-barn",
  title: "Ont i knät hos barn – orsaker och när barnet bör undersökas",
  metaTitle: "Ont i knät hos barn – när bör barnet undersökas?",
  metaDescription:
    "Barn får ofta ont i knät vid idrott och under växtperioder. Läs om vanliga orsaker, vad som brukar gå över av sig själv och när barnet bör bedömas av vården.",
  category: "Ortopedi",
  primaryKeyword: "ont i knät hos barn",
  keywords: [
    "ont i knät hos barn",
    "ont i knät barn",
    "knäsmärta barn",
    "barn ont i knät",
    "knäbesvär hos barn",
    "knäsmärta tonåring",
    "barn ont i knät efter träning",
  ],
  excerpt:
    "Knäsmärta är vanligt hos barn och tonåringar och går ofta över. Så känner du igen vad som brukar vara ofarligt, vad som bör undersökas och när det är bråttom.",
  published: "2026-08-15",
  updated: "2026-08-15",
  readMinutes: 9,
  wordCount: 1900,
  relatedSpecialty: "ortoped",
  summary: [
    "Knäsmärta hos barn och tonåringar är vanligt och hänger ofta ihop med idrott och växande.",
    "De flesta besvär går över av sig själva med anpassad belastning.",
    "**Sök vård samma dag om knät har låst sig så att det inte går att sträcka eller böja.**",
    "Boka tid på vårdcentral om smärtan inte blir bättre av vila, eller om knät är svullet.",
    "Svullnad i knävecket som funnits mer än två veckor bör bedömas.",
    "Röntgen behövs ibland – men inte vid alla knäbesvär.",
    "Ett barn som haltar utan tydlig förklaring bör alltid bedömas medicinskt.",
  ],
  intro: [
    "**Ont i knät är en av de vanligaste anledningarna till att föräldrar söker vård för sitt barn.** Besvären hänger ofta ihop med idrott, hopp och löpning, eller med perioder då barnet växer snabbt. De allra flesta blir bra av att anpassa belastningen.",
    "Samtidigt finns det lägen där knäsmärta behöver undersökas – och några få där det är bråttom. Den här guiden går igenom vad som är vanligt, vad som brukar gå över av sig självt och var gränsen går.",
    "**Kort svar:** ont i knät är vanligt hos barn och tonåringar och går ofta över av sig självt. Barnet bör bedömas om smärtan inte blir bättre av vila, om knät är svullet, om barnet haltar eller om besvären tydligt påverkar idrott och vardag. Har knät låst sig så att det inte går att sträcka eller böja ska ni söka vård samma dag.",
  ],
  sections: [
    {
      id: "varfor-far-barn-ont-i-knat",
      heading: "Varför får barn ont i knät?",
      body: [
        "Knät är en led som belastas hårt vid hopp, löpning, snabba vändningar och trappgång. Hos barn och tonåringar tillkommer två saker som vuxna inte har: **tillväxtzonerna är fortfarande aktiva**, och skelettet kan under en växtperiod växa snabbare än musklerna och senorna hinner anpassa sig.",
        "Det gör att en stor del av barns knäbesvär är belastningsrelaterade snarare än orsakade av en skada. Barnet kan alltså ha ordentligt ont utan att något har hänt vid ett bestämt tillfälle.",
        "Enligt 1177 är knäbesvär vanliga hos barn och ungdomar och uppstår ofta i samband med fysisk aktivitet.",
      ],
    },
    {
      id: "vanliga-orsaker",
      heading: "Vanliga orsaker till knäsmärta hos barn",
      body: [
        "Vilken orsak som är mest sannolik beror mycket på barnets ålder och på var det gör ont. 1177 beskriver bland annat följande orsaker:",
      ],
      bullets: [
        "**Främre knäsmärta** – ont framtill i knät, som kan bero på ojämnheter i brosket på baksidan av knäskålen.",
        "**Schlatters sjukdom** – ömhet och en öm knöl strax nedanför knäskålen, vanligast mellan 8 och 15 års ålder vid snabb växt och mycket belastning.",
        "**Sinding-Larsens sjukdom (höjdhopparknä)** – små bristningar i senan under knäskålen.",
        "**Bakercysta** – en vätskefylld svullnad i knävecket, vanligast före sju års ålder.",
        "**Osteokondrit** – en liten bit brosk och ben lossnar i leden; förekommer framför allt mellan 12 och 19 år.",
        "**Knäskålen ur led** – knäskålen glider ur sitt läge, ofta vid en vridning.",
      ],
    },
    {
      id: "ar-det-farligt",
      heading: "Är det farligt att ett barn har ont i knät?",
      body: [
        "Oftast inte. De flesta knäbesvär hos barn är belastningsrelaterade och läker med tid och anpassad aktivitet. Att barnet har ont betyder alltså inte att något är trasigt.",
        "Schlatters sjukdom är ett bra exempel: det är ett av de vanligaste knäproblemen hos växande barn, de flesta behöver ingen behandling alls, och enligt 1177 **blir de flesta bra inom två år**. Operation är ovanligt och blir aktuellt först om besvären är svåra eller inte förbättras av annan behandling.",
        "Det som avgör om något behöver undersökas är därför sällan hur ont barnet har just idag, utan **hur besvären utvecklas över tid** och om de påverkar hur barnet använder benet.",
      ],
    },
    {
      id: "soka-vard-snabbt",
      heading: "När ska man söka vård snabbt?",
      body: [
        "De flesta knäbesvär är inte akuta. Men vissa situationer ska inte vänta.",
        "**Sök vård samma dag** – vårdcentral, jouröppen mottagning eller akutmottagning – om barnets knä har fastnat i ett visst läge så att det **inte alls går att sträcka eller böja**. Det är den tydligaste varningssignalen 1177 lyfter fram vid knäbesvär hos barn.",
        "Sök också vård utan att vänta om barnet efter en skada:",
      ],
      bulletTone: "warning",
      bullets: [
        "inte kan stödja på benet",
        "har mycket ont",
        "har en tydligt felställd knäskål eller ett felställt ben",
        "svullnar kraftigt i knät kort efter skadan.",
      ],
    },
    {
      id: "nar-bor-barnet-undersokas",
      heading: "När bör barnet undersökas – utan att det är akut?",
      body: [
        "Här går den gräns som är svårast för föräldrar att sätta själv. 1177 anger att du bör kontakta en vårdcentral om barnet har ont i knät och **det inte blir bättre av vila**, om knät är svullet, eller om en svullnad i knävecket funnits i mer än två veckor.",
        "Ett barn som **haltar utan tydlig förklaring** bör alltid bedömas medicinskt, även om barnet inte klagar särskilt mycket. Hälta kan ha orsaker på flera nivåer i rörelseapparaten – i leder, muskler, nerver eller skelett – och behöver därför undersökas snarare än tolkas hemma. Besvär från höftleden kan dessutom ge smärta som känns vid knät, vilket är ett skäl att läsa om [ont i höften hos barn](/artiklar/ont-i-hoften-hos-barn) om barnet både haltar och pekar på knät. Vid hälta i kombination med feber eller påverkat allmäntillstånd bör barnet bedömas samma dag.",
        "Utöver det är det rimligt att låta barnet bli undersökt om:",
      ],
      bullets: [
        "smärtan återkommer varje gång barnet är aktivt",
        "barnet har slutat med en idrott eller aktivitet på grund av knät",
        "besvären har funnits i flera veckor utan förbättring",
        "knät känns instabilt eller viker sig",
        "barnet undviker att belasta benet normalt",
        "ni är osäkra och vill ha en bedömning.",
      ],
    },
    {
      id: "vilken-vardniva",
      heading: "Vilken vårdnivå passar?",
      body: [
        "Det beror på problemet, inte på hur ont barnet har.",
        "**Vårdcentralen** är normalt första steget vid knäbesvär som inte är akuta. Där kan barnet undersökas kliniskt och vid behov remitteras vidare. Är ni osäkra på vart ni ska vända er kan ni ringa **1177** för rådgivning dygnet runt.",
        "**Fysioterapeut** är ofta central vid belastningsrelaterade besvär – både för att anpassa träning och för att komma tillbaka till idrott. Vid flera av de vanliga tillstånden är just stretching, muskelträning och anpassad belastning huvudbehandlingen.",
        "**Ortoped** blir aktuellt när det finns misstanke om en strukturell skada, när besvären inte förbättras trots åtgärder, eller när en bedömning behövs inför beslut om vidare utredning. Mer om när barn kan behöva sådan bedömning finns i vår guide om [ortopedisk bedömning för barn](/artiklar/barnortopedi).",
        "**Akutmottagning** vid de situationer som beskrivs ovan. Ring 112 vid ett allvarligt eller livshotande tillstånd.",
      ],
    },
    {
      id: "rontgen-eller-mr",
      heading: "Behövs röntgen eller MR?",
      body: [
        "**Inte alltid.** Undersökningen börjar med barnets symtom och en klinisk undersökning: läkaren känner på knät och kontrollerar rörlighet, styrka och stabilitet. 1177 anger att barnet **ibland** behöver göra en röntgenundersökning – inte att det behövs vid alla knäbesvär.",
        "Det är därför sällan meningsfullt att på egen hand bestämma att barnet ska göra en viss bildundersökning innan det har blivit undersökt. Vilken undersökning som är rätt beror på frågeställningen.",
        "Om MR blir aktuellt beskriver vi vad undersökningen kan visa i guiden om [vad MR av knät kan visa](/artiklar/mr-kna-vad-visar). Har barnet redan gjort röntgen eller MR är det bra att ha svar och bilder tillgängliga inför besöket.",
      ],
    },
    {
      id: "vad-kan-man-gora-hemma",
      heading: "Vad kan man göra hemma under tiden?",
      body: [
        "Vid belastningsrelaterade knäbesvär handlar egenvård framför allt om att **anpassa belastningen i stället för att vila helt**. 1177 nämner bland annat stretching och muskelträning, receptfria smärtstillande läkemedel, fysioterapi, bandagering eller tejpning inför aktivitet, samt att pausa de aktiviteter som gör ont och under tiden pröva en idrott som belastar knät mindre.",
        "Två saker är värda att säga till barnet och till tränaren: besvären brukar bli bättre, och det är sällan farligt att röra sig så länge det inte gör ordentligt ont. Total inaktivitet är oftast inte lösningen.",
        "Blir det inte bättre trots anpassad belastning är det ett skäl att låta barnet bli undersökt.",
      ],
    },
    {
      id: "nar-ar-ortopedbedomning-aktuell",
      heading: "När kan en ortopedbedömning vara aktuell?",
      body: [
        "En ortopedisk bedömning kan vara relevant när knäbesvären kvarstår trots anpassad belastning och fysioterapi, när det finns misstanke om en strukturell skada i leden, när knät låser sig eller viker sig återkommande, eller när barnet redan har gjort en bildundersökning och fynden behöver sättas i sitt sammanhang.",
        "Vägen dit går normalt via vårdcentralen, som kan remittera vidare. Det finns också privata alternativ där en ortopedisk bedömning kan bokas utan remiss – vad som gäller för barn, och vilka besvär som lämpar sig för vilken vårdnivå, beskriver vi i guiden om [barnortopedi](/artiklar/barnortopedi).",
        "Vissa tillstånd hos barn – medfödda felställningar, mer komplicerade höftproblem och ortopediska besvär vid neuromuskulär sjukdom – utreds inom specialiserad barnsjukvård och inte på en allmän ortopedmottagning.",
        "Söker du information om knäsmärta hos vuxna i stället finns den i guiden om [vilken läkare du ska söka för knäsmärta](/artiklar/vilken-lakare-knasmarta).",
      ],
    },
    {
      id: "kallor-ont-i-knat-barn",
      heading: "Källor",
      body: [
        "Innehållet är allmän information och ersätter inte en individuell medicinsk bedömning. Informationen bygger på offentliga primärkällor:",
      ],
      bullets: [
        "[1177 – Knäbesvär hos barn och tonåringar](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/leder/knabesvar-hos-barn-och-tonaringar/)",
        "[1177 – Schlatters sjukdom](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/ben-och-fotter/schlatters-sjukdom/)",
        "[1177 – Växtvärk](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/vaxtvark/)",
        "[1177 för vårdpersonal – Hälta hos barn](https://vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/halta-hos-barn/)",
      ],
    },
  ],
  faqs: [
    {
      question: "Är det vanligt att barn har ont i knät?",
      answer:
        "Ja. Knäbesvär är vanliga hos barn och tonåringar och uppstår ofta i samband med idrott, hopp och löpning eller under perioder då barnet växer snabbt. De flesta besvär går över av sig själva.",
    },
    {
      question: "När ska ett barn med ont i knät söka vård samma dag?",
      answer:
        "Om knät har fastnat i ett visst läge så att det inte alls går att sträcka eller böja. Sök också vård utan att vänta om barnet efter en skada inte kan stödja på benet, har mycket ont, har en tydlig felställning eller svullnar kraftigt kort efter skadan.",
    },
    {
      question: "Mitt barn har ont i knät men har inte skadat sig – är det oroande?",
      answer:
        "Oftast inte. Mycket av barns knäsmärta är belastningsrelaterad och uppstår utan att något hänt vid ett bestämt tillfälle. Blir smärtan inte bättre av vila, är knät svullet eller haltar barnet bör det ändå bedömas.",
    },
    {
      question: "Vad är Schlatters sjukdom?",
      answer:
        "Ett vanligt belastningsrelaterat tillstånd vid senfästet strax under knäskålen hos växande barn, vanligast mellan 8 och 15 års ålder och särskilt hos barn som idrottar. Enligt 1177 blir de flesta bra inom två år, och operation är ovanligt.",
    },
    {
      question: "Behöver barnet röntgen eller MR för ont i knät?",
      answer:
        "Inte alltid. Bedömningen börjar med symtom och en klinisk undersökning där läkaren kontrollerar rörlighet, styrka och stabilitet. Röntgen behövs ibland, men inte vid alla knäbesvär, och vilken undersökning som är rätt beror på frågeställningen.",
    },
    {
      question: "Ska barnet sluta idrotta helt tills knät blir bra?",
      answer:
        "Oftast inte. Vanligare är att anpassa belastningen: pausa de aktiviteter som gör ont, pröva en idrott som belastar knät mindre och arbeta med stretching och muskelträning. Blir det inte bättre trots anpassning bör barnet undersökas.",
    },
    {
      question: "Mitt barn haltar – räcker det att avvakta?",
      answer:
        "Nej. Ett barn som haltar utan tydlig förklaring bör bedömas medicinskt, eftersom hälta kan ha orsaker i leder, muskler, nerver eller skelett. Vid hälta tillsammans med feber eller påverkat allmäntillstånd bör barnet bedömas samma dag. Mer om [barn som haltar](/artiklar/barn-haltar).",
    },
  ],
};
