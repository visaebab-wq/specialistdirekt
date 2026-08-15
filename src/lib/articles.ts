// Artikelregister. Varje artikel bor i en egen fil under src/content/articles/
// och importeras här. Lägg till en ny artikel = skapa filen + importera den nedan.

import type { Article } from "./articles-types";

import { article as guide } from "@/content/articles/hitta-ratt-specialistlakare-guide";
import { article as ontIKnatBarn } from "@/content/articles/ont-i-knat-barn";
import { article as ryggontHosBarn } from "@/content/articles/ryggont-hos-barn";
import { article as ontIHalenHosBarn } from "@/content/articles/ont-i-halen-hos-barn";
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

// Ordning: pelarguiden först, sedan nyast överst.
export const articles: Article[] = [
  guide,
  ontIHalenHosBarn,
  ryggontHosBarn,
  ontIKnatBarn,
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
 * en förmedlingstjänst – en utlänk till en vårdgivare skickar bort läsaren, kan
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
 * Relevansrankade relaterade artiklar (smart internlänkning). Poängsätter varje
 * annan artikel efter gemensam specialitet, kategori och delade sökord – så att
 * "Läs vidare" alltid visar de mest relevanta artiklarna, inte bara de första.
 */
function specialtySet(a: Article): Set<string> {
  const s = new Set<string>();
  if (a.relatedSpecialty) s.add(a.relatedSpecialty);
  for (const x of ARTICLE_EXTRA_SPECIALTIES[a.slug] ?? []) s.add(x);
  return s;
}

export function relatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.filter((a) => a.slug !== slug).slice(0, limit);

  const currentKeywords = new Set(current.keywords.map((k) => k.toLowerCase()));
  const currentSpecialties = specialtySet(current);

  return articles
    .filter((a) => a.slug !== slug)
    .map((a) => {
      let score = 0;
      // Delade specialiteter (egna + korsreferenser) väger tyngst.
      for (const sp of specialtySet(a)) if (currentSpecialties.has(sp)) score += 4;
      if (a.category === current.category) score += 3;
      for (const k of a.keywords) if (currentKeywords.has(k.toLowerCase())) score += 1;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score || y.a.updated.localeCompare(x.a.updated))
    .slice(0, limit)
    .map((x) => x.a);
}
