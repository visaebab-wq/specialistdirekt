import type { Article } from "@/lib/articles-types";
import { BARN_SCOPE } from "@/lib/barn-scope";

// OBS (innehållsägande): den lokala kommersiella intentionen för Göteborg ägs av
// /specialiteter/ortoped/goteborg. Den här artikeln äger den nationella
// barnortopedi-/barnortoped-intentionen och routar bokning vidare dit – den ska
// alltså inte upprepa pris-, betygs- eller bokningsinnehåll. Se
// docs/content-ownership.md.
//
// Formulering om läkaren: Dr. Sorkhabi beskrivs ENDAST som "specialist i
// ortopedi och ryggkirurgi som även tar emot barn". Han får aldrig kallas
// barnortoped – den specialisttiteln är inte dokumenterad.
export const article: Article = {
  slug: "barnortopedi",
  title: "Barnortopedi – ortopedisk bedömning för barn i Göteborg",
  metaTitle: "Barnortopedi Göteborg – privat ortoped för barn",
  metaDescription:
    "Söker du barnortopedi eller ortoped för barn i Göteborg? Läs om hälta, knä-, höft-, fot- och ryggbesvär, skolios, idrottsskador och när ortopedisk bedömning behövs.",
  category: "Ortopedi",
  primaryKeyword: "barnortopedi",
  keywords: [
    "barnortopedi",
    "barnortoped",
    "barnortoped Göteborg",
    "ortoped för barn",
    "privat ortoped barn Göteborg",
    "barnortopedi Göteborg",
    "ortopedisk bedömning barn",
  ],
  excerpt:
    "Barnortopedi handlar om besvär i barnets växande rörelseapparat. Så vet du när hälta, knä-, höft-, fot- eller ryggbesvär behöver bedömas – och när det räcker att avvakta.",
  published: "2026-08-15",
  updated: "2026-08-15",
  readMinutes: 12,
  wordCount: 2600,
  relatedSpecialty: "ortoped",
  // Den generiska CTA:n ("Behöver du en ortoped?") talar till en vuxen patient om
  // sig själv. Läsaren här är en förälder, och besökets villkor – åldersspann,
  // fysisk mottagning, pris – avgör om bokningen alls är relevant. Länken går till
  // barnsektionen på Göteborgssidan, där bokningsknappen och villkoren finns
  // samlade, i stället för rakt in i kalendern.
  cta: {
    heading: "Behöver ditt barn en ortopedisk bedömning?",
    body: `Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi, tar emot barn och ungdomar ${BARN_SCOPE.label} på mottagningen i Göteborg. Ingen remiss behövs och besöket kostar 2 000 kr.`,
    label: "Boka ortopedisk bedömning för barn i Göteborg",
    href: "/specialiteter/ortoped/goteborg#ortoped-for-barn-goteborg",
  },
  summary: [
    "Barnortopedi rör skador och besvär i barnets växande skelett, leder, muskler och rygg.",
    "**Barn är inte små vuxna** – tillväxtzonerna är aktiva, så samma symtom kan betyda olika saker hos barn och vuxna.",
    "Många besvär under uppväxten är övergående och behöver ingen specialistbehandling.",
    "Sök bedömning vid smärta som inte går över, återkommande besvär, hälta, svårighet att belasta ett ben eller besvär efter en skada.",
    "Vid akut skada, kraftig smärta eller oförmåga att belasta ska akut vård väljas – inte ett planerat privat besök.",
    "Komplicerade och medfödda tillstånd hör hemma i specialiserad barnsjukvård, inte på en privat självbetalarväg.",
    `I Göteborg tar Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi, även emot barn och ungdomar – ${BARN_SCOPE.label} – för ortopedisk bedömning på plats.`,
  ],
  intro: [
    "**Barnortopedi handlar om skador, smärta och andra problem i barnets växande skelett, leder, muskler och rörelseapparat.** Ett barn kan behöva ortopedisk bedömning vid exempelvis långvarig knäsmärta, hälta, höftbesvär, fotproblem, ryggsmärta, idrottsskador eller besvär efter en tidigare skada.",
    "Barn är inte små vuxna. Skelettet växer, tillväxtzonerna är fortfarande aktiva och vissa ortopediska problem ser därför annorlunda ut hos barn och ungdomar än hos vuxna.",
    "Samtidigt är många besvär under uppväxten övergående och behöver ingen specialistbehandling. Knäbesvär i samband med fysisk aktivitet är exempelvis vanliga hos barn och tonåringar och går ofta över av sig själva.",
    "**Kort svar:** sök medicinsk bedömning om barnet har smärta som inte går över, återkommande besvär, börjar halta, har svårt att belasta en arm eller ett ben, får problem efter en skada eller om besvären påverkar gång, idrott och vardag. Vid en akut skada eller kraftiga symtom ska akut vård väljas i stället för ett planerat privat besök.",
  ],
  sections: [
    {
      id: "vad-ar-barnortopedi",
      heading: "Vad är barnortopedi?",
      body: [
        "Barnortopedi är den del av ortopedin som rör skador, sjukdomar, felställningar och andra problem i barnets rörelseapparat. Inom den högspecialiserade barnortopedin bedöms även mer komplicerade tillstånd, exempelvis medfödda fotfelställningar, höftinstabilitet och ortopediska problem vid neuromuskulära sjukdomar – sådan vård ges inom specialiserad barnsjukvård.",
        "Det betyder däremot inte att varje barn med ont i ett knä eller en fot behöver träffa en barnortoped. Ofta räcker vårdcentral, fysioterapeut eller annan första medicinsk bedömning.",
        "Besvären kan komma från:",
      ],
      bullets: [
        "knän",
        "höfter",
        "fötter och fotleder",
        "ben och armar",
        "rygg",
        "leder och skelett",
        "muskler och senfästen",
        "gång och benställning",
        "tillväxtrelaterade problem.",
      ],
    },
    {
      id: "nar-behover-barn-ortoped",
      heading: "När kan ett barn behöva träffa ortoped?",
      body: [
        "Det viktigaste är inte enbart **var** barnet har ont, utan hur länge besvären har funnits och hur mycket de påverkar barnet. Barnets ålder, hur snabbt besvären kom och om det finns andra symtom påverkar vilken vårdnivå som är lämplig.",
        "En ortopedisk bedömning kan vara relevant när barnet exempelvis:",
      ],
      bullets: [
        "har ont under längre tid eller får smärta som återkommer",
        "haltar",
        "har kvarstående besvär efter en skada",
        "har svårt att belasta ett ben normalt",
        "inte kan använda en arm eller led som tidigare",
        "får återkommande problem vid idrott",
        "har tydlig asymmetri eller felställning",
        "har ryggbesvär som inte går över, eller misstänkt skolios",
        "har knä-, höft- eller fotproblem som påverkar vardagen",
        "har tidigare röntgen eller MR som behöver bedömas tillsammans med symtomen.",
      ],
    },
    {
      id: "privat-ortoped-for-barn-goteborg",
      heading: "Privat ortoped för barn i Göteborg",
      body: [
        "Föräldrar som söker efter *barnortoped i Göteborg*, *barnortopedi Göteborg* eller *privat ortoped för barn* söker oftast samma sak: någon med ortopedisk specialistkompetens som kan bedöma varför barnet har ont eller inte rör sig som vanligt.",
        "Via Specialistdirekt kan barn få en privat ortopedisk bedömning i Göteborg hos [Dr. Masoud Sorkhabi](/lakare/masoud-sorkhabi), **specialist i ortopedi och ryggkirurgi, som även tar emot barn**. **Dr. Masoud Sorkhabi har över 20 års erfarenhet av ortopedi och har arbetat med både vuxna och barn.** Vi använder medvetet inte titeln barnortoped – hans dokumenterade specialistkompetens är ortopedi och ryggkirurgi.",
        `**Vilka åldrar tas emot?** Barn och ungdomar, ${BARN_SCOPE.label} (${BARN_SCOPE.short}). Från 18 års ålder bokas besöket som vuxen. Mottagningen ligger i Göteborg.`,
        "För den privata självbetalarvägen behövs ingen remiss. Ett fysiskt besök i Göteborg kostar 2 000 kr, samma pris som för vuxna. Mer om prisbilden finns i guiden om [privat ortoped – kostnad, väntetid och hur du bokar](/artiklar/privat-ortoped-kostnad).",
        "Bokning och tider finns på sidan för [privat ortoped i Göteborg](/specialiteter/ortoped/goteborg).",
        "En privat ortopedisk bedömning kan vara relevant vid besvär från:",
      ],
      bullets: [
        "knä",
        "höft",
        "fot och ben",
        "rygg",
        "idrott och belastning",
        "tidigare ortopedisk skada",
        "långvarig eller oklar muskuloskeletal smärta.",
      ],
    },
    {
      id: "barnortoped-eller-ortoped",
      heading: "Barnortoped eller vanlig ortoped – vad är skillnaden?",
      body: [
        "Begreppet **barnortoped** används ofta om en ortoped som arbetar särskilt med ortopediska sjukdomar och skador hos barn. Barnets rörelseapparat förändras under uppväxten, så ålder, tillväxt och skelettets utveckling måste vägas in i bedömningen.",
        "Vissa barn har vanliga ortopediska besvär som kan bedömas av en specialist i ortopedi som tar emot barn. Andra har mer ovanliga eller komplicerade tillstånd – exempelvis medfödda felställningar, höftledsinstabilitet eller ortopediska problem vid neuromuskulär sjukdom – som behöver högspecialiserad barnortopedisk vård inom regionens barnsjukvård.",
        "**Rätt vårdnivå beror alltså på barnets problem – inte bara på ordet barnortopedi.**",
      ],
    },
    {
      id: "knasmarta-hos-barn",
      heading: "Knäsmärta hos barn och tonåringar",
      body: [
        "Ont i knät är en av de vanligaste anledningarna till att föräldrar söker information om barnortopedi. Enligt 1177 är knäbesvär vanliga hos barn och ungdomar, ofta i samband med fysisk aktivitet. Vid undersökning kontrollerar läkaren bland annat rörlighet, styrka och stabilitet, och ibland behövs röntgen.",
        "Om smärtan inte förbättras med vila, om knät är svullet eller om besvären återkommer bör barnet bedömas. Läs mer om [ont i knät hos barn och när besvären bör bedömas](/artiklar/ont-i-knat-barn).",
        "Barn och tonåringar kan få:",
      ],
      bullets: [
        "smärta vid aktivitet",
        "svullnad och ömhet",
        "smärta vid hopp eller löpning",
        "ont när de går i trappor",
        "problem efter en idrottsskada",
        "återkommande belastningsbesvär.",
      ],
    },
    {
      id: "schlatters-sjukdom",
      heading: "Vad är Schlatters sjukdom?",
      body: [
        "Schlatters sjukdom är ett vanligt belastningsrelaterat knäproblem hos växande barn och ungdomar. Besvären sitter typiskt vid senfästet på knölen några centimeter under knäskålen.",
        "Enligt 1177 är Schlatter vanligt mellan ungefär **8 och 15 års ålder**, särskilt hos barn som växer snabbt och samtidigt belastar knäna mycket genom idrott. De flesta behöver varken operation eller annan avancerad behandling, och besvären brukar minska när barnet blir äldre och slutar växa.",
        "Men knäsmärta hos ett barn ska inte automatiskt antas vara Schlatter – det finns flera möjliga orsaker. Det gör ofta ont när barnet:",
      ],
      bullets: [
        "springer",
        "hoppar",
        "tränar",
        "går i trappor",
        "reser sig efter att ha suttit.",
      ],
    },
    {
      id: "mitt-barn-haltar",
      heading: "Mitt barn haltar – behöver vi söka vård?",
      body: [
        "Hälta är ett viktigt symtom eftersom orsaken kan finnas på flera nivåer i rörelseapparaten. 1177:s kliniska kunskapsstöd beskriver att hälta hos barn bland annat kan ha orsaker i leder, muskler, nerver eller skelett.",
        "Ett barn kan halta efter en mindre skada eller överbelastning, men hälta kan också komma från höft, knä, ben eller fot. **Ny och oförklarad hälta bör inte diagnostiseras hemma.** Mer om [varför barn haltar och när det bör undersökas](/artiklar/barn-haltar).",
        "Var extra uppmärksam om barnet:",
      ],
      bullets: [
        "börjar halta utan tydlig anledning",
        "fortsätter halta",
        "får allt mer ont",
        "inte vill eller kan stödja på benet",
        "har besvär även i vila",
        "samtidigt är sjukt eller tydligt påverkat.",
      ],
    },
    {
      id: "hoftsmarta-hos-barn",
      heading: "Höftsmärta hos barn",
      body: [
        "Höftproblem hos barn kan visa sig på flera sätt, och bedömningen påverkas mycket av barnets ålder och symtombild. Ett barn med höftbesvär beskriver ibland smärta längre ned mot lår eller knä, vilket gör att området där barnet säger att det gör ont inte alltid är där problemet sitter.",
        "Mer om [ont i höften hos barn och vad åldern betyder](/artiklar/ont-i-hoften-hos-barn). Det är därför klokt att låta ett barn med kvarstående hälta eller höftbesvär bli undersökt. Barnet kan exempelvis:",
      ],
      bullets: [
        "ha ont i höften eller ljumsken",
        "börja halta",
        "undvika att stödja på ett ben",
        "få begränsad rörlighet",
        "beskriva smärta mot lår eller knä.",
      ],
    },
    {
      id: "fotbesvar-och-plattfot",
      heading: "Fotbesvär och plattfot hos barn",
      body: [
        "Barns fötter utvecklas mycket under uppväxten, och allt som ser annorlunda ut behöver inte vara sjukligt. 1177 beskriver ett brett spektrum av fotbesvär hos barn, från platta fötter som inte behöver behandlas till mer komplicerade tillstånd.",
        "Mer om [plattfot hos barn och om inlägg behövs](/artiklar/plattfot-hos-barn). **Plattfot hos barn** innebär alltså inte automatiskt att behandling behövs – många variationer är normala under uppväxten. Det som är mer relevant är om fotställningen ger **smärta, stelhet eller funktionsproblem**.",
        "Går barnet med fötterna inåt är det bland annat hur uttalad rotationen är, om båda sidor ser likadana ut, barnets ålder, om barnet snubblar mycket och om gången påverkas tydligt som avgör om det behöver undersökas.",
        "En bedömning kan bli aktuell om barnet har:",
      ],
      bullets: [
        "återkommande fotvärk",
        "uttalad asymmetri",
        "stelhet",
        "problem att gå eller springa",
        "smärta vid aktivitet",
        "återkommande hälta",
        "en fotställning som ger tydliga funktionsproblem.",
      ],
    },
    {
      id: "ont-i-halen",
      heading: "Ont i hälen hos barn",
      body: [
        "Hälsmärta är vanligt hos fysiskt aktiva barn och är enligt 1177 oftast övergående. Besvären blir ofta tydligare under perioder med mycket fotboll, löpning, gymnastik, hopp eller annan idrott.",
        "Om smärtan fortsätter, återkommer ofta eller leder till hälta kan barnet behöva bedömas. Mer om [ont i hälen hos barn och Severs](/artiklar/ont-i-halen-hos-barn).",
      ],
    },
    {
      id: "ryggsmarta-hos-barn",
      heading: "Ryggsmärta hos barn och tonåringar",
      body: [
        "Ryggsmärta blir vanligare under tonåren. Hos barn som växer kan värk uppstå i samband med ovan eller tung fysisk belastning, och ryggvärk är enligt 1177 också vanligare bland barn och ungdomar som tävlar i sport och växer snabbt. I vissa fall kan exempelvis skolios ligga bakom besvären.",
        "Mer om [ryggont hos barn och när besvären bör undersökas](/artiklar/ryggont-hos-barn). En ortopedisk bedömning kan vara relevant när ryggsmärtan:",
      ],
      bullets: [
        "inte går över",
        "återkommer ofta",
        "påverkar idrott eller vardag",
        "uppkom efter en skada",
        "kombineras med tydlig felställning",
        "behöver bedömas tillsammans med tidigare röntgen eller MR.",
      ],
    },
    {
      id: "skolios-hos-barn",
      heading: "Skolios hos barn",
      body: [
        "**Skolios innebär att ryggraden är böjd åt sidan.** Många har lindrig skolios utan större besvär, medan en del behöver behandling. Barn undersöks också inom elevhälsan för att skolios ska kunna upptäckas.",
        "Mer om [skolios hos barn – tecken och undersökning](/artiklar/skolios-hos-barn). Misstänkt skolios innebär inte automatiskt att barnet behöver operation. Hur ryggraden ser ut, hur stor krökningen är och hur mycket barnet har kvar att växa påverkar uppföljningen.",
        "Tecken som kan väcka misstanke är exempelvis att:",
      ],
      bullets: [
        "ena axeln står högre än den andra",
        "ryggen ser asymmetrisk ut",
        "ena skulderbladet framträder mer",
        "ena sidan av bröstkorgen eller ryggen står ut mer när barnet böjer sig framåt.",
      ],
    },
    {
      id: "vaxtvark-eller-inte",
      heading: "Växtvärk – eller något som behöver undersökas?",
      body: [
        "Det här är en av de viktigaste frågorna för föräldrar. Typisk växtvärk förekommer framför allt på **kvällen eller natten**, sitter ofta i låren, underbenen eller kring knäna, och barnet är besvärsfritt under dagen. 1177 anger att växtvärk är vanligast mellan ungefär tre och tio års ålder och att smärtan inte brukar finnas på dagen eller när barnet rör sig.",
        "Mer om [växtvärk hos barn och när det är något annat](/artiklar/vaxtvark-hos-barn). **All långvarig bensmärta hos ett växande barn bör alltså inte automatiskt kallas växtvärk.** Det passar sämre med vanlig växtvärk om barnet exempelvis:",
      ],
      bullets: [
        "haltar",
        "har smärta under dagen",
        "får ont vid aktivitet varje gång",
        "har tydlig svullnad",
        "inte använder ett ben normalt",
        "får gradvis ökande besvär.",
      ],
    },
    {
      id: "idrottsskador-hos-barn",
      heading: "Idrottsskador hos barn",
      body: [
        "Fotboll, handboll, gymnastik, innebandy, ishockey, löpning och andra idrotter kan ge både akuta skador och överbelastningsbesvär. Barn och ungdomar som tränar mycket samtidigt som kroppen växer kan också få belastningsrelaterade problem – Schlatter är ett tydligt exempel.",
        "Om barnet inte kan återgå till sin aktivitet, har återkommande smärta eller om funktionen inte återkommer som väntat kan en medicinsk eller ortopedisk bedömning vara lämplig. Vanliga problem är:",
      ],
      bullets: [
        "knäsmärta",
        "stukningar",
        "smärta från senfästen",
        "överbelastning",
        "återkommande problem efter tidigare skada",
        "begränsad rörlighet eller instabilitet.",
      ],
    },
    {
      id: "soka-vard-snabbt",
      heading: "När ska man söka vård snabbt?",
      body: [
        "De flesta ortopediska besvär hos barn är inte akuta, men vissa symtom kräver snabbare bedömning. Vid en misstänkt akut fraktur ska barnet inte vänta på ett planerat privat specialistbesök.",
        "1177 rekommenderar snabb bedömning bland annat när ett barns knä har låst sig helt så att det inte går att böja eller sträcka. Vid osäkerhet kan du ringa 1177. **Ring 112 vid ett allvarligt eller livshotande tillstånd.**",
        "Sök vård skyndsamt om barnet efter en skada exempelvis:",
      ],
      bullets: [
        "inte kan stödja på benet",
        "har mycket ont",
        "har en tydligt felställd arm eller ett ben",
        "har uttalad svullnad",
        "har ett knä som låst sig",
        "får snabbt försämrad funktion",
        "är tydligt allmänpåverkat samtidigt som det har smärta från rörelseapparaten.",
      ],
    },
    {
      id: "hur-gar-undersokningen-till",
      heading: "Hur går en ortopedisk undersökning av ett barn till?",
      body: [
        "Undersökningen anpassas efter barnets ålder och problem. Läkaren går vanligtvis först igenom när besvären började, om barnet skadat sig, exakt var det gör ont, när smärtan kommer, om barnet haltar, vad barnet kan och inte kan göra, vilken idrott barnet håller på med samt tidigare skador, behandlingar och undersökningar.",
        "Därefter görs en klinisk undersökning. Vid knäbesvär beskriver 1177 att läkaren bland annat undersöker rörlighet, styrka och stabilitet. Beroende på problemet kan läkaren undersöka:",
      ],
      bullets: [
        "gång och hållning",
        "rörlighet",
        "muskelstyrka",
        "ledstabilitet",
        "benställning",
        "rygg, höft, knä och fot.",
      ],
    },
    {
      id: "efter-undersokningen",
      heading: "Vad händer efter undersökningen?",
      body: [
        "Läkaren går igenom vad undersökningen visade och vad fynden betyder för just ert barn. Därefter tas ställning till om besvären kan följas med råd om belastning, aktivitet och tid, om fysioterapi är relevant, eller om röntgen, MR eller annan utredning behövs för att komma vidare.",
        "Visar bedömningen att barnets problem kräver en annan vårdnivå kan läkaren rekommendera specialiserad barnsjukvård eller annan specialist. Ett privat besök låser alltså inte fast er i en privat vårdväg.",
      ],
    },
    {
      id: "rontgen-eller-mr",
      heading: "Behöver barnet röntgen eller MR?",
      body: [
        "**Inte alltid.** En ortopedisk utredning börjar normalt med barnets symtom, sjukdomshistoria och klinisk undersökning. Vid knäbesvär hos barn anger 1177 att röntgen ibland behövs, men inte vid alla besvär.",
        "Det är därför sällan en bra idé att försöka bestämma undersökning själv innan barnet har bedömts. Har barnet redan gjort röntgen eller MR är det däremot bra att ha svar och bilder tillgängliga inför besöket. Läs mer om vad [MR av knät kan visa](/artiklar/mr-kna-vad-visar).",
      ],
    },
    {
      id: "ortoped-eller-fysioterapeut",
      heading: "Ortoped eller fysioterapeut för barn?",
      body: [
        "Båda kan vara rätt – men för olika problem. **Fysioterapeut** kan vara lämpligt vid vissa belastningsbesvär, rehabilitering, rörelserelaterade problem, återgång till idrott och muskulära besvär.",
        "**Läkar- eller ortopedbedömning** kan vara mer relevant vid:",
      ],
      bullets: [
        "långvarig eller oklar smärta",
        "hälta",
        "misstänkt skelett- eller ledskada",
        "kvarstående problem efter trauma",
        "tydlig felställning",
        "misstänkt skolios",
        "behov av vidare diagnostik",
        "besvär som inte förbättras trots tidigare åtgärder.",
      ],
    },
    {
      id: "behovs-remiss",
      heading: "Behövs remiss till barnortopedi?",
      body: [
        "Det beror på vilken vårdform ni väljer. Inom den **offentliga** specialistvården kan remiss eller vårdbegäran krävas, och regionens barnsjukvård tar emot barn med besvär från rörelseorganen efter sådan bedömning.",
        "För ett **privat självbetalande** besök hos Dr. Masoud Sorkhabi via Specialistdirekt behövs ingen remiss. Läs mer om den vägen i guiden om [ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
        "Privat ortopedisk bedömning är dock inte rätt väg i alla situationer. Barn med medfödda tillstånd, komplicerade felställningar, neuromuskulära sjukdomar, behov av avancerad kirurgi, allvarliga skador eller behov av multidisciplinär barnsjukvård utreds inom specialiserad barnsjukvård. En privat ortoped kan också efter bedömning rekommendera annan specialist- eller sjukhusvård om barnets problem kräver det.",
      ],
    },
    {
      id: "privat-eller-offentlig-barnortopedi",
      heading: "Privat eller offentlig barnortopedi i Göteborg?",
      body: [
        "Båda vägarna leder till en läkarbedömning. Skillnaden ligger i hur ni kommer dit, vad besöket kostar och vilka tillstånd som hör hemma var.",
        "**Offentlig väg.** Vägen börjar oftast hos vårdcentral, BVC eller elevhälsa, som bedömer barnet och vid behov skickar remiss eller vårdbegäran vidare. Enligt 1177 har barn och ungdomar under 20 år i Västra Götalandsregionen **fri hälso- och sjukvård**. Komplicerade och medfödda tillstånd, neuromuskulära sjukdomar och behov av barnkirurgi eller multidisciplinär vård hör hemma i regionens specialiserade barnsjukvård – de kan inte ersättas av ett privat självbetalarbesök.",
        "Två praktiska detaljer är värda att känna till för Göteborg. Ortopedimottagningen på Östra, som är den barnortopediska mottagningen inom Sahlgrenska Universitetssjukhuset, anger på 1177 att den tar emot *patienter som är 16 år eller yngre* och att nybesök sker efter vårdbegäran. En 17-åring med ortopediska besvär hör alltså inte till den mottagningens åldersspann, och ett nybesök där förutsätter att någon skickat en vårdbegäran.",
        `**Privat självbetalande väg.** Ingen remiss behövs, ni väljer en ledig tid själva i kalendern och ett fysiskt besök i Göteborg kostar 2 000 kr. Åldersspannet är ${BARN_SCOPE.short}. Bedömningen görs av Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi.`,
        "**Så väljer ni.** En privat bedömning kan passa när ni vill få barnets muskuloskeletala besvär bedömda av en ortoped och själva vill bestämma när det sker. Den ersätter varken akut vård eller specialiserad barnsjukvård – och för ett barn med besvär som redan utreds i regionen är det oftast bättre att fortsätta den påbörjade vägen än att starta en parallell.",
      ],
      bulletTone: "warning",
      bullets: [
        "Akut skada, kraftig smärta, feber med svullen led eller oförmåga att belasta → akut vård, inte ett planerat besök.",
        "Misstänkt medfödd eller komplicerad barnortopedisk sjukdom → specialiserad barnsjukvård.",
      ],
    },
    {
      id: "vilken-vard-passar",
      heading: "Vilken vård passar mitt barn?",
      body: [
        "En förenklad vägledning – den ersätter inte en medicinsk bedömning:",
      ],
      bullets: [
        "**Lindrig, kortvarig värk efter aktivitet** → avvakta och anpassa aktiviteten; sök primärvård vid kvarstående besvär.",
        "**Återkommande knä- eller fotproblem** → medicinsk eller fysioterapeutisk bedömning.",
        "**Långvarig ortopedisk smärta** → läkar- eller ortopedbedömning.",
        "**Barn som fortsätter att halta** → medicinsk bedömning.",
        "**Misstänkt skolios** → medicinsk bedömning, vid behov specialist.",
        "**Besvär efter tidigare ortopedisk skada** → ortopedbedömning kan vara relevant.",
        "**Misstänkt komplicerad barnortopedisk sjukdom** → specialiserad barnortopedisk vård.",
        "**Akut skada med kraftig smärta eller oförmåga att belasta** → akut vård.",
      ],
    },
    {
      id: "forbered-besoket",
      heading: "Så förbereder ni er inför ortopedbesöket",
      body: [
        "Filmer som visar hälta eller andra rörelseproblem kan vara värdefulla om symtomet inte alltid syns vid själva besöket. Försök också kunna svara på:",
      ],
      bullets: [
        "När började besvären, och kom de plötsligt eller gradvis?",
        "Har barnet skadat sig?",
        "Var gör det ont – och gör det ont även i vila?",
        "Haltar barnet? Finns svullnad?",
        "Vilka aktiviteter framkallar besvären?",
        "Har barnet behövt sluta med idrott eller lek?",
        "Har problemet blivit bättre, sämre eller oförändrat?",
        "Har barnet haft liknande problem tidigare?",
        "Finns tidigare journaler, röntgen eller MR?",
      ],
    },
    {
      id: "sammanfattning",
      heading: "Sammanfattning",
      body: [
        "**Barnortopedi handlar om ortopediska problem i barnets växande rörelseapparat.** Många besvär är övergående, men ihållande smärta, hälta, funktionsproblem, felställningar eller kvarstående problem efter en skada kan behöva undersökas.",
        "För mer komplicerade barnortopediska tillstånd finns specialiserad offentlig barnsjukvård. För barn med ortopediska besvär där familjen önskar en privat specialistbedömning finns möjlighet att boka hos [Dr. Masoud Sorkhabi i Göteborg](/specialiteter/ortoped/goteborg), specialist i ortopedi och ryggkirurgi som även tar emot barn.",
        "Vid akuta eller allvarliga symtom ska ni söka akut vård i stället för att vänta på en planerad tid.",
      ],
    },
    {
      id: "kallor-barnortopedi",
      heading: "Källor",
      body: [
        "Innehållet är allmän information och ersätter inte en individuell medicinsk bedömning. Informationen bygger på offentliga primärkällor:",
      ],
      bullets: [
        "[1177 – Knäbesvär hos barn och tonåringar](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/leder/knabesvar-hos-barn-och-tonaringar/)",
        "[1177 – Schlatters sjukdom](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/ben-och-fotter/schlatters-sjukdom/)",
        "[1177 – Fotbesvär hos barn](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/ben-och-fotter/fotbesvar-hos-barn/)",
        "[1177 – Ryggbesvär hos barn](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/rygg-och-nacke/ryggbesvar-hos-barn/)",
        "[1177 – Skolios](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/rygg-och-nacke/skolios/)",
        "[1177 – Växtvärk](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/vaxtvark/)",
        "[1177 för vårdpersonal – Hälta hos barn](https://vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/halta-hos-barn/)",
        "[1177 Västra Götaland – Patientavgifter](https://www.1177.se/Vastra-Gotaland/sa-fungerar-varden/kostnader-och-ersattningar/patientavgifter-i-vastra-gotaland/)",
        "[1177 – Ortopedimottagning Östra, Göteborg](https://www.1177.se/hitta-vard/kontaktkort/Ortopedimottagning-Ostra-Goteborg/)",
      ],
    },
  ],
  faqs: [
    {
      question: "Vad är barnortopedi?",
      answer:
        "Barnortopedi handlar om skador, sjukdomar och utvecklingsrelaterade problem i barnets skelett, leder, rygg och övriga rörelseapparat.",
    },
    {
      question: "Vad gör en barnortoped?",
      answer:
        "En barnortoped bedömer ortopediska problem hos barn och ungdomar – exempelvis felställningar, höftproblem, fotproblem, ryggproblem och skador. Högspecialiserade barnortopediska verksamheter inom regionernas barnsjukvård behandlar även mer komplexa diagnoser.",
    },
    {
      question: "Finns privat ortoped för barn i Göteborg?",
      answer:
        "Ja. Via Specialistdirekt kan barn få en privat ortopedisk bedömning i Göteborg hos Dr. Masoud Sorkhabi, specialist i ortopedi och ryggkirurgi. Bokning sker via sidan för [privat ortoped i Göteborg](/specialiteter/ortoped/goteborg).",
    },
    {
      question: "Vilken ålder tar ni emot?",
      answer: `Barn och ungdomar ${BARN_SCOPE.label}, alltså ${BARN_SCOPE.short}. Från 18 års ålder bokas besöket som vuxen – priset är detsamma.`,
    },
    {
      question: "Vad kostar en privat ortopedisk bedömning för barn?",
      answer:
        "Ett fysiskt besök i Göteborg kostar 2 000 kr, samma pris som för vuxna. I Västra Götalandsregionen är offentlig hälso- och sjukvård avgiftsfri för barn och ungdomar under 20 år, så den privata vägen innebär att ni betalar för att själva kunna välja tid utan remiss.",
    },
    {
      question: "Är Dr. Masoud Sorkhabi barnortoped?",
      answer:
        "Dr. Masoud Sorkhabi är specialistläkare i ortopedi och ryggkirurgi och tar emot barn för ortopediska bedömningar. Vi använder inte en annan specialisttitel än hans dokumenterade specialistkompetens.",
    },
    {
      question: "Behöver barnet remiss för att boka privat?",
      answer:
        "Nej. För ett självbetalande privatbesök hos Dr. Masoud Sorkhabi via Specialistdirekt behövs ingen remiss. Inom offentlig specialistvård kan remiss eller vårdbegäran krävas.",
    },
    {
      question: "När ska ett barn träffa ortoped?",
      answer:
        "En ortopedisk bedömning kan vara relevant vid ihållande eller återkommande smärta, hälta, kvarstående problem efter en skada, tydliga felställningar eller besvär från knä, höft, fot eller rygg som påverkar barnets funktion.",
    },
    {
      question: "Är knäsmärta vanligt hos barn?",
      answer:
        "Ja. Knäbesvär är vanliga hos barn och tonåringar och förekommer ofta i samband med fysisk aktivitet. De går ofta över, men kvarstående smärta, svullnad eller andra tydliga besvär bör bedömas.",
    },
    {
      question: "Vad är Schlatters sjukdom?",
      answer:
        "Schlatters sjukdom är ett vanligt belastningsrelaterat tillstånd kring senfästet under knäskålen hos växande barn och ungdomar. Det är vanligt mellan ungefär åtta och femton års ålder och förekommer särskilt hos barn som idrottar.",
    },
    {
      question: "Hur vet jag om det bara är växtvärk?",
      answer:
        "Typisk växtvärk kommer framför allt på kvällen eller natten, och barnet är besvärsfritt under dagen. Smärta som finns på dagen eller som tydligt påverkar barnets gång passar sämre med typisk växtvärk.",
    },
    {
      question: "Ska ett barn som haltar undersökas?",
      answer:
        "Hälta kan ha många orsaker och utgå från bland annat leder, muskler, nerver eller skelett. Ny, oförklarad eller kvarstående hälta bör därför bedömas medicinskt.",
    },
    {
      question: "Är plattfot farligt hos barn?",
      answer:
        "Inte nödvändigtvis. Det finns plattfot hos barn som inte behöver behandlas. Smärta, stelhet och tydlig funktionspåverkan gör en medicinsk bedömning mer relevant.",
    },
    {
      question: "Behöver barn med ryggont träffa ortoped?",
      answer:
        "Inte all ryggsmärta kräver ortoped. Många ryggbesvär är övergående, särskilt hos ungdomar. Om smärtan fortsätter, återkommer, begränsar aktivitet eller om skolios eller annan ortopedisk orsak misstänks kan en läkar- eller ortopedbedömning vara aktuell.",
    },
    {
      question: "Behöver barnet göra MR innan ortopedbesöket?",
      answer:
        "Vanligtvis inte. Ortopeden börjar med sjukdomshistoria och klinisk undersökning och avgör därefter om röntgen, MR eller annan utredning behövs. Vid knäbesvär behöver barn ibland röntgen, men inte alltid.",
    },
    {
      question: "Vart vänder vi oss vid en akut skada?",
      answer:
        "Vid en allvarlig eller akut skada ska barnet inte vänta på ett planerat privat ortopedbesök, utan bedömas akut. Vid osäkerhet kan 1177 ge råd, och vid livshotande tillstånd ska 112 ringas.",
    },
  ],
};
