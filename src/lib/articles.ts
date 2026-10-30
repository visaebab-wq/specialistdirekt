// Artikelregister. Varje artikel bor i en egen fil under src/content/articles/
// och importeras här. Lägg till en ny artikel = skapa filen + importera den nedan.

import type { Article } from "./articles-types";

import { article as guide } from "@/content/articles/hitta-ratt-specialistlakare-guide";
import { article as kardiolog } from "@/content/articles/privat-kardiolog-kostnad";
import { article as knasmarta } from "@/content/articles/vilken-lakare-knasmarta";
import { article as vantetid } from "@/content/articles/vantetid-specialist-vardgaranti";
import { article as utanRemiss } from "@/content/articles/boka-specialist-utan-remiss";
import { article as hudlakare } from "@/content/articles/privat-hudlakare-priser";
import { article as adhd } from "@/content/articles/adhd-utredning-vuxen";
import { article as privatVsOffentlig } from "@/content/articles/privat-vard-vs-offentlig";
import { article as ortoped } from "@/content/articles/privat-ortoped-kostnad";
import { article as gynekolog } from "@/content/articles/privat-gynekolog-boka";
import { article as neurolog } from "@/content/articles/privat-neurolog-utredning";
import { article as neurologUtanRemiss } from "@/content/articles/neurolog-utan-remiss";
import { article as migranNeurolog } from "@/content/articles/migran-neurolog";
import { article as tremorNeurolog } from "@/content/articles/tremor-skakningar-neurolog";
import { article as graStarr } from "@/content/articles/gra-starr-operation-vantetid";
import { article as ontIMagen } from "@/content/articles/ont-i-magen-vilken-lakare";
import { article as ontIRyggen } from "@/content/articles/ont-i-ryggen-vilken-lakare";
import { article as yrsel } from "@/content/articles/yrsel-vilken-lakare";
import { article as hjartklappning } from "@/content/articles/hjartklappning-vilken-lakare";
import { article as domningar } from "@/content/articles/domningar-hander-fotter-vilken-lakare";
import { article as urolog } from "@/content/articles/privat-urolog-kostnad";
import { article as gastroenterolog } from "@/content/articles/privat-gastroenterolog-kostnad";
import { article as ogonlakare } from "@/content/articles/privat-ogonlakare-kostnad";
import { article as reumatolog } from "@/content/articles/privat-reumatolog-kostnad";
import { article as endokrinolog } from "@/content/articles/privat-endokrinolog-kostnad";
import { article as psykiater } from "@/content/articles/privat-psykiater-kostnad";
import { article as dietist } from "@/content/articles/privat-dietist-kostnad";
import { article as mr } from "@/content/articles/privat-mr-kostnad";
import { article as onh } from "@/content/articles/privat-onh-lakare-kostnad";
import { article as smartlakare } from "@/content/articles/privat-smartlakare-kostnad";
import { article as kirurg } from "@/content/articles/privat-kirurg-kostnad";
import { article as lunglakare } from "@/content/articles/privat-lunglakare-kostnad";
import { article as allergolog } from "@/content/articles/privat-allergolog-kostnad";
import { article as handkirurg } from "@/content/articles/privat-handkirurg-kostnad";
import { article as fertilitetslakare } from "@/content/articles/privat-fertilitetslakare-kostnad";
import { article as barnlakare } from "@/content/articles/privat-barnlakare-kostnad";
import { article as koloskopi } from "@/content/articles/privat-koloskopi-kostnad";
import { article as somnapne } from "@/content/articles/privat-somnapneutredning-kostnad";
import { article as mrRygg } from "@/content/articles/privat-mr-rygg-kostnad";
import { article as brostsmarta } from "@/content/articles/brostsmarta-kardiolog-eller-akut-vard";
import { article as gastroskopi } from "@/content/articles/privat-gastroskopi-kostnad";
import { article as blodIAvforingen } from "@/content/articles/blod-i-avforingen-gastroenterolog-koloskopi-akut-vard";
import { article as hogtPsa } from "@/content/articles/hogt-psa-urolog-prostatakontroll";
import { article as aderbrack } from "@/content/articles/privat-aderbracksbehandling-kostnad";
import { article as uppblastMage } from "@/content/articles/uppblast-mage";
import { article as forhojdaLevervarden } from "@/content/articles/forhojda-levervarden-vilken-specialist";
import { article as hogtBlodtryck } from "@/content/articles/hogt-blodtryck-nar-behovs-kardiolog";
import { article as ortopedUtanRemiss } from "@/content/articles/ortoped-utan-remiss";
import { article as ryggsmartaFysio } from "@/content/articles/ryggsmarta-ortoped-eller-fysioterapeut";
import { article as langvarigSmarta } from "@/content/articles/langvarig-smarta-vilken-lakare";
import { article as gorKoloskopiOnt } from "@/content/articles/gor-koloskopi-ont";
import { article as forberedelseKoloskopi } from "@/content/articles/forberedelse-infor-koloskopi";
import { article as mrUtanRemiss } from "@/content/articles/mr-utan-remiss";
import { article as mrKna } from "@/content/articles/mr-kna-vad-visar";
import { article as barnortopedi } from "@/content/articles/barnortopedi";
import { article as ontIKnatBarn } from "@/content/articles/ont-i-knat-barn";
import { article as ryggontHosBarn } from "@/content/articles/ryggont-hos-barn";
import { article as ontIHalenHosBarn } from "@/content/articles/ont-i-halen-hos-barn";
import { article as barnHaltar } from "@/content/articles/barn-haltar";
import { article as ontIHoftenHosBarn } from "@/content/articles/ont-i-hoften-hos-barn";
import { article as skoliosHosBarn } from "@/content/articles/skolios-hos-barn";
import { article as plattfotHosBarn } from "@/content/articles/plattfot-hos-barn";
import { article as vaxtvarkHosBarn } from "@/content/articles/vaxtvark-hos-barn";

// Ordning: pelarguiden först, sedan nyast överst.
export const articles: Article[] = [
  guide,
  vaxtvarkHosBarn,
  plattfotHosBarn,
  skoliosHosBarn,
  ontIHoftenHosBarn,
  barnHaltar,
  ontIHalenHosBarn,
  ryggontHosBarn,
  ontIKnatBarn,
  barnortopedi,
  mrKna,
  mrUtanRemiss,
  gorKoloskopiOnt,
  forberedelseKoloskopi,
  langvarigSmarta,
  ortopedUtanRemiss,
  ryggsmartaFysio,
  forhojdaLevervarden,
  hogtBlodtryck,
  uppblastMage,
  kardiolog,
  knasmarta,
  vantetid,
  utanRemiss,
  hudlakare,
  adhd,
  privatVsOffentlig,
  ortoped,
  gynekolog,
  neurolog,
  neurologUtanRemiss,
  migranNeurolog,
  tremorNeurolog,
  graStarr,
  ontIMagen,
  ontIRyggen,
  yrsel,
  hjartklappning,
  domningar,
  urolog,
  gastroenterolog,
  ogonlakare,
  reumatolog,
  endokrinolog,
  psykiater,
  dietist,
  mr,
  onh,
  smartlakare,
  kirurg,
  lunglakare,
  allergolog,
  handkirurg,
  fertilitetslakare,
  barnlakare,
  koloskopi,
  somnapne,
  mrRygg,
  brostsmarta,
  gastroskopi,
  blodIAvforingen,
  hogtPsa,
  aderbrack,
];

// Skydd mot dubbletter (körs vid bygget): kasta hellre ett byggfel än att
// publicera två artiklar med samma slug eller samma primära sökord
// (sökordskannibalisering). Detta garanterar att vi aldrig råkar göra om jobbet.
{
  const seenSlugs = new Set<string>();
  const seenKeywords = new Map<string, string>();
  for (const a of articles) {
    if (seenSlugs.has(a.slug)) throw new Error(`Dubbel artikel-slug: "${a.slug}"`);
    seenSlugs.add(a.slug);
    const key = a.primaryKeyword.toLowerCase().trim();
    const existing = seenKeywords.get(key);
    if (existing) {
      throw new Error(
        `Dubbelt primärt sökord "${a.primaryKeyword}" i både "${existing}" och "${a.slug}". ` +
          `Välj ett unikt sökord för att undvika kannibalisering.`,
      );
    }
    seenKeywords.set(key, a.slug);
  }
}

/**
 * Tillåtna externa domäner i artikelinnehåll.
 *
 * VIKTIGT: vi länkar ALDRIG ut till en klinik, mottagning eller vårdgivare. Vi är
 * en boknings- och informationstjänst – en utlänk till en vårdgivare skickar bort läsaren, kan
 * läsas som ett ställningstagande för just den aktören, och undergräver att vi
 * inte är bundna till en enskild klinik. Endast myndigheter och oberoende
 * medicinska kunskapskällor är tillåtna, som stöd för medicinska påståenden.
 *
 * Lägg bara till en domän här om den varken är vårdgivare eller kommersiell aktör.
 */
const ALLOWED_EXTERNAL_DOMAINS = [
  "1177.se",
  "socialstyrelsen.se",
  "legitimation.socialstyrelsen.se",
  "livsmedelsverket.se",
  "folkhalsomyndigheten.se",
  "lakemedelsverket.se",
  "internetmedicin.se",
  // Regionalt kliniskt kunskapsstöd (Region Stockholm). Kunskapsstöd riktat till
  // vårdpersonal – varken vårdgivare eller kommersiell aktör.
  "viss.nu",
  // Systersajt för second opinion – medveten cross-site-router (sekundär).
  "andrabedomning.se",
] as const;

// Build-time-spärr: fångar en utlänk till en klinik innan den når produktion.
{
  const isAllowed = (host: string) =>
    ALLOWED_EXTERNAL_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));

  for (const a of articles) {
    const content = JSON.stringify(a);
    for (const [, url] of content.matchAll(/\]\((https?:\/\/[^)"\s]+)\)/g)) {
      let host: string;
      try {
        host = new URL(url).hostname.replace(/^www\./, "");
      } catch {
        throw new Error(`Ogiltig extern URL i "${a.slug}": ${url}`);
      }
      if (!isAllowed(host)) {
        throw new Error(
          `Otillåten extern länk i artikeln "${a.slug}": ${url}\n` +
            `Vi länkar aldrig ut till kliniker eller vårdgivare. Tillåtna domäner: ` +
            `${ALLOWED_EXTERNAL_DOMAINS.join(", ")}.`,
        );
      }
    }
  }
}

/**
 * Registret över alla primära sökord. Kolla denna lista (eller /artiklar) INNAN
 * du skapar en ny artikel, så att du inte dubblerar ett ämne.
 */
export const primaryKeywords: { slug: string; keyword: string; category: string }[] =
  articles.map((a) => ({ slug: a.slug, keyword: a.primaryKeyword, category: a.category }));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Korsreferenser: artiklar utan en egen relatedSpecialty (eller som rör flera
 * specialiteter) kopplas hit till de specialitetssidor där de är relevanta.
 * Det ger starkare internlänkning så att t.ex. MR- och smärtartiklar syns på
 * ortoped-/neurolog-sidorna, dietist på gastro/endokrin osv.
 */
const ARTICLE_EXTRA_SPECIALTIES: Record<string, string[]> = {
  "privat-mr-kostnad": ["ortoped", "neurolog", "urolog"],
  "mr-utan-remiss": ["ortoped", "neurolog"],
  "privat-smartlakare-kostnad": ["ortoped", "neurolog", "reumatolog"],
  "privat-handkirurg-kostnad": ["ortoped", "neurolog"],
  "privat-kirurg-kostnad": ["gastroenterolog"],
  "privat-lunglakare-kostnad": ["kardiolog"],
  "privat-allergolog-kostnad": ["hudlakare", "oron-nasa-hals"],
  "privat-dietist-kostnad": ["gastroenterolog", "endokrinolog"],
  "privat-fertilitetslakare-kostnad": ["gynekolog"],
  "privat-barnlakare-kostnad": ["hudlakare"],
  "yrsel-vilken-lakare": ["oron-nasa-hals"],
  "ont-i-ryggen-vilken-lakare": ["neurolog"],
  "domningar-hander-fotter-vilken-lakare": ["ortoped"],
  "hjartklappning-vilken-lakare": ["endokrinolog"],
  "gra-starr-operation-vantetid": [],
  "privat-somnapneutredning-kostnad": ["oron-nasa-hals"],
  "privat-mr-rygg-kostnad": ["ortoped", "neurolog"],
  "langvarig-smarta-vilken-lakare": ["ortoped", "neurolog", "reumatolog"],
  // Allmänmedicin är den enda hubben utan egna artiklar, vilket döljer hela dess
  // "Läs mer"-block. Båda guiderna är genuint specialitetsoberoende och hör hemma
  // under bredden – det här är korrekt kategorisering, inte en konstruerad länk.
  "hitta-ratt-specialistlakare-guide": ["allmanmedicin"],
  "boka-specialist-utan-remiss": ["allmanmedicin"],
};

/** Artiklar som hör ihop med en viss specialitet (för korslänkning). */
export function articlesForSpecialty(specialtySlug: string): Article[] {
  return articles.filter(
    (a) =>
      a.relatedSpecialty === specialtySlug ||
      ARTICLE_EXTRA_SPECIALTIES[a.slug]?.includes(specialtySlug),
  );
}

/**
 * Ämneskluster: slug → kluster-id. Ett kluster är en redaktionellt sammanhållen
 * grupp (pelare + spokes) där läsaren naturligt rör sig mellan sidorna. Lägg
 * till nya kluster här – rankningen nedan är generisk och har inga specialfall.
 */
const ARTICLE_CLUSTERS: Record<string, string> = {
  barnortopedi: "barnortopedi",
  "ont-i-knat-barn": "barnortopedi",
  "ryggont-hos-barn": "barnortopedi",
  "ont-i-halen-hos-barn": "barnortopedi",
  "barn-haltar": "barnortopedi",
  "ont-i-hoften-hos-barn": "barnortopedi",
  "skolios-hos-barn": "barnortopedi",
  "plattfot-hos-barn": "barnortopedi",
  "vaxtvark-hos-barn": "barnortopedi",
};

/**
 * Undantag: artiklar utanför ett kluster som ändå får föreslås på klustrets
 * sidor. Kräver att artikeln är genuint tillämplig för klustrets målgrupp – för
 * barnortopedi räcker det alltså INTE att den delar specialiteten ortopedi.
 * Tom lista = klustret håller sig helt inom sig självt.
 */
const CLUSTER_EXTERNAL_ALLOW: Record<string, string[]> = {
  barnortopedi: [],
};

/**
 * Presentationsdata per kluster: rubrik och vilken artikel som är pelare.
 * Används av specialitetssidorna för att visa klustret som en egen grupp med
 * pelaren först, i stället för att lösa upp det i en platt lista där pelaren
 * hamnar mellan sina egna spokes.
 */
const CLUSTER_META: Record<string, { title: string; pillar: string; intro: string }> = {
  barnortopedi: {
    title: "Barnortopedi",
    pillar: "barnortopedi",
    intro: "Ortopediska besvär hos barn och ungdomar – börja med guiden och fördjupa dig i det som liknar ert.",
  },
};

export type ArticleClusterGroup = {
  id: string;
  title: string;
  intro: string;
  pillar: Article;
  spokes: Article[];
};

/**
 * Delar upp en artikellista i kluster + övrigt. Ett kluster tas bara med om
 * dess pelare finns i listan – annars vore gruppen en rubrik utan huvudresurs.
 * Artiklar som inte tillhör något kluster returneras oförändrade i `rest`, med
 * ordningen bevarad.
 */
export function groupArticlesByCluster(list: Article[]): {
  clusters: ArticleClusterGroup[];
  rest: Article[];
} {
  const byCluster = new Map<string, Article[]>();
  const rest: Article[] = [];

  for (const a of list) {
    const cluster = ARTICLE_CLUSTERS[a.slug];
    if (!cluster || !CLUSTER_META[cluster]) {
      rest.push(a);
      continue;
    }
    const bucket = byCluster.get(cluster);
    if (bucket) bucket.push(a);
    else byCluster.set(cluster, [a]);
  }

  const clusters: ArticleClusterGroup[] = [];
  for (const [id, members] of byCluster) {
    const meta = CLUSTER_META[id];
    const pillar = members.find((a) => a.slug === meta.pillar);
    if (!pillar) {
      rest.push(...members);
      continue;
    }
    clusters.push({
      id,
      title: meta.title,
      intro: meta.intro,
      pillar,
      spokes: members.filter((a) => a.slug !== meta.pillar),
    });
  }

  return { clusters, rest };
}

function specialtySet(a: Article): Set<string> {
  const s = new Set<string>();
  if (a.relatedSpecialty) s.add(a.relatedSpecialty);
  for (const x of ARTICLE_EXTRA_SPECIALTIES[a.slug] ?? []) s.add(x);
  return s;
}

/**
 * Artiklar som redan är länkade i den egna brödtexten. "Läs vidare" ska inte
 * upprepa en länk läsaren redan passerat – platsen är mer värd för en artikel
 * som inte nämns i texten. Vi skannar samtliga textbärande fält, inte bara
 * sections.body, och matchar sökvägen i sig så att formatvariationer i den
 * inline-markup som beskrivs i articles-types.ts inte kan missas.
 */
function editorialArticleLinks(a: Article): Set<string> {
  const text = [
    ...(a.summary ?? []),
    ...a.intro,
    ...a.sections.flatMap((s) => [...s.body, ...(s.bullets ?? [])]),
    ...a.faqs.flatMap((f) => [f.question, f.answer]),
  ].join("\n");
  const found = new Set<string>();
  for (const m of text.matchAll(/\/artiklar\/([a-z0-9-]+)/g)) found.add(m[1]);
  return found;
}

/**
 * Relationsnivå mellan två artiklar. Nivåerna är *garanterat* rangordnade:
 * ett gemensamt sökord kan aldrig konkurrera ut en artikel i samma kluster.
 *   4 samma ämneskluster · 3 gemensam specialitet · 2 samma kategori
 *   1 gemensamt sökord   · 0 ingen relation (visas inte)
 */
function relationTier(current: Article, candidate: Article): number {
  const cluster = ARTICLE_CLUSTERS[current.slug];
  if (cluster && ARTICLE_CLUSTERS[candidate.slug] === cluster) return 4;
  const specialties = specialtySet(current);
  for (const sp of specialtySet(candidate)) if (specialties.has(sp)) return 3;
  if (candidate.category === current.category) return 2;
  const keywords = new Set(current.keywords.map((k) => k.toLowerCase()));
  for (const k of candidate.keywords) if (keywords.has(k.toLowerCase())) return 1;
  return 0;
}

function sharedKeywordCount(current: Article, candidate: Article): number {
  const keywords = new Set(current.keywords.map((k) => k.toLowerCase()));
  return candidate.keywords.filter((k) => keywords.has(k.toLowerCase())).length;
}

/**
 * Stabil, källmedveten hash (FNV-1a) som slutgiltig tie-break. Tidigare avgjorde
 * `updated` – och eftersom artiklar publicerade samma dag ger identiskt värde
 * föll sorteringen tillbaka på registerordningen, vilket gjorde att de senast
 * tillagda artiklarna tog nästan alla "Läs vidare"-platser på hela sajten.
 * Hashen är deterministisk, oberoende av publiceringsordning, och ger olika
 * ordning för olika källartiklar i stället för samma topplista överallt.
 */
function stableRank(from: string, to: string): number {
  const s = `${from}|${to}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Relaterade artiklar för "Läs vidare". Relevans går före antal: kandidater utan
 * relation (nivå 0) tas bort helt, så en sida kan visa färre än `limit` länkar –
 * eller inget block alls – i stället för att fyllas ut med orelaterat innehåll.
 */
export function relatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  const alreadyLinked = editorialArticleLinks(current);
  const cluster = ARTICLE_CLUSTERS[current.slug];

  return articles
    .filter((a) => {
      if (a.slug === slug || alreadyLinked.has(a.slug)) return false;
      // En sida inne i ett kluster föreslår bara sitt eget kluster. Utan den
      // regeln föll barnsidorna tillbaka på vuxenartiklar som råkar dela
      // specialiteten ortopedi – barnortopedi-pelaren rekommenderade vuxen
      // ryggsmärta och smärtläkare. Färre länkar är bättre än fel målgrupp.
      if (cluster) {
        return (
          ARTICLE_CLUSTERS[a.slug] === cluster ||
          (CLUSTER_EXTERNAL_ALLOW[cluster] ?? []).includes(a.slug)
        );
      }
      return true;
    })
    .map((a) => ({ a, tier: relationTier(current, a) }))
    .filter((x) => x.tier > 0)
    .sort(
      (x, y) =>
        y.tier - x.tier ||
        sharedKeywordCount(current, y.a) - sharedKeywordCount(current, x.a) ||
        stableRank(slug, x.a.slug) - stableRank(slug, y.a.slug),
    )
    .slice(0, limit)
    .map((x) => x.a);
}
