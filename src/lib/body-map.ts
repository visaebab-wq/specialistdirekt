// Kroppskartans innehållskonfiguration – "Var har du besvär?".
//
// ALL koppling mellan ett kroppsområde och en destination bor här. UI-komponenterna
// innehåller inga hårdkodade länkar.
//
// Viktigt: destinationer anges som referenser (artikel-slug / specialitet-slug),
// aldrig som fria URL:er. `resolveRegionLinks()` slår upp dem i sajtens verkliga
// register och släpper igenom endast det som faktiskt finns. En felstavad eller
// borttagen slug ger därmed en utelämnad länk – aldrig en död länk.
// `scripts/check-body-map-routes.mjs` verifierar dessutom hela kartan vid test.

import { articles } from "./articles";
import { specialties } from "./specialties";

export type BodyView = "framsida" | "baksida";
export type Gender = "kvinna" | "man";

/**
 * Sida på kroppen. Innehållet är i dag identiskt för höger och vänster, så båda
 * pekar på samma semantiska region – men urvalet bär med sig sidan, så att
 * `leftKnee`/`rightKnee` senare kan särskiljas utan att bygga om komponenten.
 */
export type BodySide = "left" | "right";

export type BodyRegionId =
  | "huvud"
  | "nacke"
  | "axel"
  | "armbage"
  | "hand"
  | "brostkorg"
  | "mage"
  | "ovre-rygg"
  | "landrygg"
  | "hoft"
  | "lar"
  | "kna"
  | "underben"
  | "fot";

export type BodySelection = { region: BodyRegionId; side?: BodySide };

/**
 * En destination refererar till befintligt innehåll. `article` och `specialty`
 * valideras mot sajtens register; `page` mot listan över verifierade sidor nedan.
 */
export type BodyDestination =
  | { kind: "article"; slug: string }
  | { kind: "specialty"; slug: string }
  | { kind: "page"; href: string; label: string };

/**
 * Statiska sidor som fått bekräftas mot app-routern innan de får användas här.
 * Håll listan kort och verifierad – `check-body-map-routes.mjs` läser den.
 */
const VERIFIED_PAGES: Record<string, string> = {
  "/kontakt": "Skicka bokningsförfrågan",
  "/specialiteter": "Alla specialiteter",
  "/artiklar": "Alla guider och artiklar",
  "/privat-gastroenterolog": "Privat gastroenterolog",
  "/privat-koloskopi": "Privat koloskopi",
  "/specialiteter/smartlakare": "Smärtläkare",
};

export type BodyRegion = {
  id: BodyRegionId;
  /** Svensk etikett (standard). */
  label: string;
  /** Avvikande etikett per vy, t.ex. "Höft och säte" på baksidan. */
  labelByView?: Partial<Record<BodyView, string>>;
  /** Kort, neutral beskrivning. Beskriver navigering – aldrig diagnos. */
  description: string;
  /** Avvikande beskrivning per vy. */
  descriptionByView?: Partial<Record<BodyView, string>>;
  /**
   * Enradig akutnotis. Renderas ALLTID före länkarna i panelen, för områden
   * vars symtom har vanliga akuta presentationer.
   */
  acuteNotice?: string;
  /** I vilka vyer området är valbart. */
  views: BodyView[];
  /** Området är valbart. Sätt false för att stänga av utan att ta bort mappningen. */
  enabled: boolean;
  destinations: BodyDestination[];
};

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: "huvud",
    label: "Huvud",
    description:
      "Besvär från huvudet kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till huvudvärk, yrsel och neurologiska besvär.",
    acuteNotice:
      "Vid plötslig, mycket kraftig huvudvärk eller huvudvärk med feber och nackstelhet – sök akut vård eller ring 112.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "yrsel-vilken-lakare" },
      { kind: "article", slug: "privat-neurolog-utredning" },
      { kind: "specialty", slug: "neurolog" },
      { kind: "specialty", slug: "oron-nasa-hals" },
    ],
  },
  {
    id: "nacke",
    label: "Nacke",
    description:
      "Nackbesvär kan komma från muskler, leder eller nerver. Här hittar du information och specialistvård relaterad till besvär i nacken.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "privat-mr-rygg-kostnad" },
      { kind: "article", slug: "domningar-hander-fotter-vilken-lakare" },
      { kind: "specialty", slug: "ortoped" },
      { kind: "specialty", slug: "neurolog" },
    ],
  },
  {
    id: "axel",
    label: "Axel och överarm",
    description:
      "Axelbesvär kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till besvär i axel och överarm.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ortoped-utan-remiss" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "article", slug: "privat-mr-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "armbage",
    label: "Armbåge och underarm",
    description:
      "Besvär i armbågen kan komma från senor, leder eller nerver. Här hittar du information och specialistvård relaterad till armbåge och underarm.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ortoped-utan-remiss" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "hand",
    label: "Hand och handled",
    description:
      "Besvär i hand och handled kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till händer och handleder.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "privat-handkirurg-kostnad" },
      { kind: "article", slug: "domningar-hander-fotter-vilken-lakare" },
      { kind: "specialty", slug: "ortoped" },
      { kind: "specialty", slug: "reumatolog" },
    ],
  },
  {
    id: "brostkorg",
    label: "Bröstkorg",
    description:
      "Besvär från bröstkorgen kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till bröstkorg och hjärta.",
    acuteNotice:
      "Vid plötslig bröstsmärta, tryck över bröstet eller andnöd – ring 112.",
    views: ["framsida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "brostsmarta-kardiolog-eller-akut-vard" },
      { kind: "article", slug: "hjartklappning-vilken-lakare" },
      { kind: "article", slug: "privat-kardiolog-kostnad" },
      { kind: "specialty", slug: "kardiolog" },
    ],
  },
  {
    id: "mage",
    label: "Mage",
    description:
      "Magbesvär kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till mage och mag-tarmkanalen.",
    acuteNotice: "Vid akut svår buksmärta – sök akut vård eller ring 112.",
    views: ["framsida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ont-i-magen-vilken-lakare" },
      { kind: "article", slug: "uppblast-mage" },
      { kind: "article", slug: "blod-i-avforingen-gastroenterolog-koloskopi-akut-vard" },
      { kind: "specialty", slug: "gastroenterolog" },
    ],
  },
  {
    id: "ovre-rygg",
    label: "Övre rygg",
    description:
      "Besvär i övre delen av ryggen kan komma från muskler, leder eller nerver. Här hittar du information och specialistvård relaterad till ryggbesvär.",
    views: ["baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ont-i-ryggen-vilken-lakare" },
      { kind: "article", slug: "ryggsmarta-ortoped-eller-fysioterapeut" },
      { kind: "article", slug: "privat-mr-rygg-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "landrygg",
    label: "Ländrygg",
    description:
      "Ländryggsbesvär är vanliga och kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till ländryggen.",
    views: ["baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ont-i-ryggen-vilken-lakare" },
      { kind: "article", slug: "privat-mr-rygg-kostnad" },
      { kind: "article", slug: "ryggsmarta-ortoped-eller-fysioterapeut" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "hoft",
    label: "Höft",
    labelByView: { baksida: "Höft och säte" },
    description:
      "Höftbesvär kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till höften.",
    descriptionByView: {
      baksida:
        "Besvär i höft och säte kan komma från leder, muskler eller nerver. Här hittar du information och specialistvård relaterad till området.",
    },
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ortoped-utan-remiss" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "article", slug: "langvarig-smarta-vilken-lakare" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "lar",
    label: "Lår",
    labelByView: { baksida: "Baksida lår" },
    description:
      "Besvär i låret kan komma från muskler, senor eller leder. Här hittar du information och specialistvård relaterad till lårets besvär.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ortoped-utan-remiss" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "kna",
    label: "Knä",
    description:
      "Besvär i knät kan bero på flera olika orsaker. Här hittar du information och specialistvård relaterad till knäbesvär.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "vilken-lakare-knasmarta" },
      // Publiceras med MR-paketet. Filtreras bort automatiskt tills artikeln finns.
      { kind: "article", slug: "mr-kna-vad-visar" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "underben",
    label: "Underben",
    labelByView: { baksida: "Vad och hälsena" },
    description:
      "Besvär i underbenet kan komma från muskler, senor eller skelett. Här hittar du information och specialistvård relaterad till underbenet.",
    descriptionByView: {
      baksida:
        "Besvär i vad och hälsena kan komma från muskler och senor. Här hittar du information och specialistvård relaterad till området.",
    },
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "ortoped-utan-remiss" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
  {
    id: "fot",
    label: "Fot och fotled",
    description:
      "Besvär i fot och fotled kan ha flera olika orsaker. Här hittar du information och specialistvård relaterad till fötter och fotleder.",
    views: ["framsida", "baksida"],
    enabled: true,
    destinations: [
      { kind: "article", slug: "domningar-hander-fotter-vilken-lakare" },
      { kind: "article", slug: "privat-ortoped-kostnad" },
      { kind: "specialty", slug: "ortoped" },
    ],
  },
];

export const BOOKING_HREF = "/kontakt";
export const BOOKING_LABEL = "Skicka bokningsförfrågan";

export type ResolvedLink = {
  href: string;
  label: string;
  /** Typetikett i kortet, t.ex. "Guide" eller "Specialist". */
  kind: "Guide" | "Specialist" | "Tjänst";
};

const articleBySlug = new Map(articles.map((a) => [a.slug, a]));
const specialtyBySlug = new Map(specialties.map((s) => [s.slug, s]));

/**
 * Löser upp en regions destinationer mot de verkliga registren. Allt som inte
 * går att verifiera utelämnas – kartan kan alltså aldrig producera en död länk.
 */
export function resolveDestinations(destinations: BodyDestination[]): ResolvedLink[] {
  const out: ResolvedLink[] = [];

  for (const d of destinations) {
    if (d.kind === "article") {
      const a = articleBySlug.get(d.slug);
      if (a) out.push({ href: `/artiklar/${a.slug}`, label: a.title, kind: "Guide" });
    } else if (d.kind === "specialty") {
      const s = specialtyBySlug.get(d.slug);
      if (s) out.push({ href: `/specialiteter/${s.slug}`, label: s.title, kind: "Specialist" });
    } else if (VERIFIED_PAGES[d.href]) {
      out.push({ href: d.href, label: d.label, kind: "Tjänst" });
    }
  }

  return out;
}

export function regionLabel(region: BodyRegion, view: BodyView): string {
  return region.labelByView?.[view] ?? region.label;
}

export function regionDescription(region: BodyRegion, view: BodyView): string {
  return region.descriptionByView?.[view] ?? region.description;
}

/** Regioner som är valbara i en given vy, i anatomisk ordning uppifrån och ned. */
export function regionsForView(view: BodyView): BodyRegion[] {
  return BODY_REGIONS.filter((r) => r.enabled && r.views.includes(view));
}


/**
 * Serialiserbar vy-modell som skickas till klientkomponenten.
 *
 * VIKTIGT: klientkomponenterna får ALDRIG importera det här modulens
 * körbara delar. `resolveDestinations()` läser artikelregistret, och registret
 * importerar varenda artikelfil – hamnar det i klientbundlen följer hela
 * kunskapsbankens brödtext med (≈190 kB gzip). Servern löser upp länkarna och
 * skickar bara det som faktiskt ska renderas.
 */
export type BodyRegionView = {
  id: BodyRegionId;
  label: string;
  description: string;
  acuteNotice?: string;
  links: ResolvedLink[];
};

/** Bygger vy-modellen för en vy, i anatomisk ordning uppifrån och ned. */
export function buildRegionViews(view: BodyView): BodyRegionView[] {
  return regionsForView(view).map((r) => ({
    id: r.id,
    label: regionLabel(r, view),
    description: regionDescription(r, view),
    ...(r.acuteNotice ? { acuteNotice: r.acuteNotice } : {}),
    links: resolveDestinations(r.destinations),
  }));
}

/**
 * Serverrenderad, krypbar länklista: en rad per område med dess primära
 * verifierade destinationer. Fungerar också som fallback utan JavaScript.
 */
export function crawlableRegionIndex(): { label: string; links: ResolvedLink[] }[] {
  const seen = new Set<BodyRegionId>();
  const rows: { label: string; links: ResolvedLink[] }[] = [];

  for (const view of ["framsida", "baksida"] as BodyView[]) {
    for (const region of regionsForView(view)) {
      if (seen.has(region.id)) continue;
      seen.add(region.id);
      const links = resolveDestinations(region.destinations).slice(0, 2);
      if (links.length > 0) rows.push({ label: region.label, links });
    }
  }

  return rows;
}
