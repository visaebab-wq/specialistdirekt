// Specialiteter driver både navigering och de SEO-optimerade landningssidorna
// under /specialiteter/[slug]. Lägg till fler objekt för att skapa fler sidor.

export type Specialty = {
  slug: string;
  /** Specialitetens namn, t.ex. "Kardiologi". */
  name: string;
  /** Läkartiteln, t.ex. "Kardiolog". Bra för sök ("hitta kardiolog"). */
  title: string;
  /** Kort beskrivning för kort och listor. */
  short: string;
  /** Längre, sökmotorvänlig introtext för landningssidan. */
  intro: string;
  /** Vanliga besvär – hjälper både besökare och long-tail-SEO. */
  reasons: string[];
  /** Söknyckelord som vävs in i metadata. */
  keywords: string[];
};

export const specialties: Specialty[] = [
  {
    slug: "kardiolog",
    name: "Kardiologi",
    title: "Kardiolog",
    short: "Hjärt- och kärlsjukdomar, högt blodtryck och hjärtklappning.",
    intro:
      "En kardiolog är specialist på hjärtat och blodkärlen. Vi hjälper dig att hitta en kardiolog för utredning av hjärtklappning, bröstsmärta, högt blodtryck eller uppföljning av en känd hjärtsjukdom – utan långa väntetider.",
    reasons: [
      "Hjärtklappning eller oregelbunden puls",
      "Bröstsmärta eller andfåddhet vid ansträngning",
      "Högt blodtryck som behöver utredas",
      "Uppföljning efter hjärtinfarkt",
    ],
    keywords: ["kardiolog", "hjärtläkare", "hjärtspecialist", "EKG", "högt blodtryck"],
  },
  {
    slug: "ortoped",
    name: "Ortopedi",
    title: "Ortoped",
    short: "Besvär i leder, skelett, muskler, senor och ryggrad.",
    intro:
      "En ortoped behandlar problem i rörelseapparaten – leder, skelett, muskler och senor. Vi matchar dig med en ortoped för utredning av knä- och höftsmärta, idrottsskador, artros eller ryggbesvär.",
    reasons: [
      "Långvarig knä-, höft- eller axelsmärta",
      "Idrottsskador och meniskskador",
      "Artros och ledförslitning",
      "Bedömning inför eventuell operation",
    ],
    keywords: ["ortoped", "ortopedi", "knäsmärta", "höftsmärta", "idrottsskada", "artros"],
  },
  {
    slug: "hudlakare",
    name: "Dermatologi",
    title: "Hudläkare",
    short: "Hudåkommor, eksem, akne, födelsemärken och hudcancerkontroll.",
    intro:
      "En hudläkare (dermatolog) utreder och behandlar sjukdomar i hud, hår och naglar. Vi hjälper dig att snabbt få tid för bedömning av misstänkta födelsemärken, eksem, akne, psoriasis eller andra hudbesvär.",
    reasons: [
      "Förändrade födelsemärken och hudkontroll",
      "Eksem, psoriasis eller nässelutslag",
      "Akne och ärrbehandling",
      "Återkommande klåda eller utslag",
    ],
    keywords: ["hudläkare", "dermatolog", "hudcancer", "eksem", "akne", "födelsemärke"],
  },
  {
    slug: "gynekolog",
    name: "Gynekologi",
    title: "Gynekolog",
    short: "Kvinnohälsa, menshälsa, klimakteriet och cellprover.",
    intro:
      "En gynekolog är specialist på kvinnans underliv och reproduktiva hälsa. Vi matchar dig med en gynekolog för rådgivning kring menscykel, klimakteriebesvär, preventivmedel eller gynekologiska undersökningar.",
    reasons: [
      "Oregelbunden eller smärtsam mens",
      "Klimakteriebesvär",
      "Preventivmedelsrådgivning",
      "Cellprov och gynekologisk hälsokontroll",
    ],
    keywords: ["gynekolog", "kvinnohälsa", "klimakteriet", "cellprov", "preventivmedel"],
  },
  {
    slug: "neurolog",
    name: "Neurologi",
    title: "Neurolog",
    short: "Sjukdomar i hjärna, nerver och nervsystem – migrän, yrsel m.m.",
    intro:
      "En neurolog utreder sjukdomar i nervsystemet, hjärnan och ryggmärgen. Vi hjälper dig att hitta en neurolog för utredning av återkommande huvudvärk, migrän, yrsel, domningar eller minnesbesvär.",
    reasons: [
      "Migrän och svår återkommande huvudvärk",
      "Yrsel och balansproblem",
      "Domningar eller stickningar",
      "Minnes- och koncentrationssvårigheter",
    ],
    keywords: ["neurolog", "migrän", "huvudvärk", "yrsel", "nervsystem"],
  },
  {
    slug: "psykiater",
    name: "Psykiatri",
    title: "Psykiater",
    short: "Psykisk hälsa – nedstämdhet, ångest, ADHD-utredning och stress.",
    intro:
      "En psykiater är läkare specialiserad på psykisk hälsa. Vi matchar dig diskret med en psykiater för bedömning av nedstämdhet, ångest, sömnproblem, utmattning eller utredning av ADHD och andra tillstånd.",
    reasons: [
      "Nedstämdhet eller depression",
      "Ångest och oro",
      "Stress och utmattning",
      "Frågor om ADHD- eller neuropsykiatrisk utredning",
    ],
    keywords: ["psykiater", "psykiatri", "ångest", "depression", "ADHD", "utmattning"],
  },
  {
    slug: "ogonlakare",
    name: "Oftalmologi",
    title: "Ögonläkare",
    short: "Syn, ögonsjukdomar, grå starr och torra ögon.",
    intro:
      "En ögonläkare (oftalmolog) utreder och behandlar sjukdomar och besvär i ögat. Vi hjälper dig att hitta en ögonläkare för synförändringar, torra ögon, grå starr eller kontroll av ögonbottnen.",
    reasons: [
      "Försämrad eller dimmig syn",
      "Torra eller irriterade ögon",
      "Grå starr-bedömning",
      "Ögonkontroll vid diabetes",
    ],
    keywords: ["ögonläkare", "oftalmolog", "grå starr", "syn", "torra ögon"],
  },
  {
    slug: "oron-nasa-hals",
    name: "Öron-näsa-hals (ÖNH)",
    title: "ÖNH-specialist",
    short: "Öron, näsa, hals, hörsel, bihålor och kronisk heshet.",
    intro:
      "En ÖNH-specialist behandlar besvär i öron, näsa och hals. Vi matchar dig med en specialist för utredning av nedsatt hörsel, tinnitus, kroniska bihålebesvär, snarkning eller långvarig heshet.",
    reasons: [
      "Nedsatt hörsel eller tinnitus",
      "Återkommande bihåleinflammation",
      "Snarkning och sömnapné",
      "Långvarig heshet eller halsont",
    ],
    keywords: ["ÖNH", "öronläkare", "hörsel", "tinnitus", "bihålor", "snarkning"],
  },
  {
    slug: "urolog",
    name: "Urologi",
    title: "Urolog",
    short: "Urinvägar, prostata, njurar och vattenkastningsbesvär.",
    intro:
      "En urolog är specialist på urinvägarna och de manliga könsorganen. Vi hjälper dig att hitta en urolog för besvär med vattenkastning, prostata, njursten eller andra urologiska frågor.",
    reasons: [
      "Täta trängningar eller svårt att kissa",
      "Prostatabesvär och PSA-kontroll",
      "Blod i urinen",
      "Njursten",
    ],
    keywords: ["urolog", "prostata", "urinvägar", "njursten", "vattenkastning"],
  },
  {
    slug: "gastroenterolog",
    name: "Gastroenterologi",
    title: "Gastroenterolog",
    short: "Mage, tarm och matsmältning – IBS, reflux och magont.",
    intro:
      "En gastroenterolog utreder sjukdomar i mage, tarm, lever och matsmältningssystem. Vi matchar dig med en specialist för utredning av långvarig magsmärta, IBS, reflux eller förändrade tarmvanor.",
    reasons: [
      "Återkommande magont eller uppblåsthet",
      "IBS och känslig mage",
      "Halsbränna och sura uppstötningar",
      "Förändrade tarmvanor",
    ],
    keywords: ["gastroenterolog", "magläkare", "IBS", "reflux", "magont", "tarm"],
  },
  {
    slug: "endokrinolog",
    name: "Endokrinologi",
    title: "Endokrinolog",
    short: "Hormoner och ämnesomsättning – sköldkörtel och diabetes.",
    intro:
      "En endokrinolog är specialist på hormoner och ämnesomsättning. Vi hjälper dig att hitta en endokrinolog för utredning av sköldkörtelproblem, diabetes, trötthet eller hormonella obalanser.",
    reasons: [
      "Sköldkörtelbesvär (hög eller låg)",
      "Diabetes och blodsockerkontroll",
      "Oförklarlig trötthet eller viktförändring",
      "Hormonella obalanser",
    ],
    keywords: ["endokrinolog", "sköldkörtel", "diabetes", "hormoner", "ämnesomsättning"],
  },
  {
    slug: "reumatolog",
    name: "Reumatologi",
    title: "Reumatolog",
    short: "Inflammatoriska led- och muskelsjukdomar samt reumatism.",
    intro:
      "En reumatolog behandlar inflammatoriska sjukdomar i leder, muskler och bindväv. Vi matchar dig med en reumatolog för utredning av ledvärk, stelhet, reumatism eller misstänkt autoimmun sjukdom.",
    reasons: [
      "Ledvärk och morgonstelhet",
      "Svullna leder",
      "Misstänkt reumatoid artrit",
      "Långvarig muskelvärk",
    ],
    keywords: ["reumatolog", "reumatism", "ledvärk", "artrit", "inflammation"],
  },
  {
    slug: "allmanmedicin",
    name: "Allmänmedicin",
    title: "Allmänläkare",
    short: "Bred medicinsk bedömning när du behöver rätt första väg vidare.",
    intro:
      "En specialist i allmänmedicin kan göra en bred medicinsk bedömning och hjälpa dig vidare när symtomen är oklara eller berör flera områden. Vi matchar dig med rätt mottagning för en planerad privat bedömning.",
    reasons: [
      "Oklara symtom som behöver första bedömning",
      "Trötthet, återkommande besvär eller allmän oro",
      "Genomgång av provsvar och tidigare utredning",
      "Vägledning till rätt specialist vid behov",
    ],
    keywords: ["allmänmedicin", "allmänläkare", "privat läkare", "medicinsk bedömning"],
  },
];

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}
