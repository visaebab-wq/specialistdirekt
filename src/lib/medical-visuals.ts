import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import type { Article } from "./articles-types";
import type { Specialty } from "./specialties";

export type MedicalVisual = {
  src: string;
  alt: string;
};

export type VisualDimensions = { width: number; height: number };

const baseImages = {
  cardiology: "/real-medical/cardiology.webp",
  neurology: "/real-medical/neurology.webp",
  gastroenterology: "/real-medical/gastroenterology.webp",
  dermatology: "/real-medical/dermatology.webp",
  womensHealth: "/real-medical/womens-health.webp",
  ophthalmology: "/real-medical/ophthalmology.webp",
  ent: "/real-medical/ent.webp",
  urology: "/real-medical/urology.webp",
  radiology: "/real-medical/radiology.webp",
  orthopedics: "/real-medical/orthopedics.webp",
  generalCare: "/real-medical/general-care.webp",
} as const;

const pageImage = (name: string) => `/page-visuals/${name}.webp`;

// Sidbilderna genereras manuellt och släpar därför efter när nytt innehåll läggs
// till. Utan kontroll pekar en ny sida på en fil som inte finns -> 404-bild i både
// <img> och schemat. Vi väljer därför första kandidat som faktiskt ligger i public/.
// Endast server-side: alla sidor är statiskt genererade vid build.
const publicDir = join(process.cwd(), "public");
const fileExists = (src: string) => existsSync(join(publicDir, src));

/** Första kandidaten som finns på disk. Sista kandidaten måste vara en garanterad basbild. */
const resolveVisual = (...candidates: string[]) =>
  candidates.find(fileExists) ?? candidates[candidates.length - 1];

/**
 * Läser faktisk storlek ur WebP-headern. Tidigare hårdkodades 1536×844 i
 * og:image:width/height, men 11 av bilderna är något lägre (819–831 px). Fel
 * dimensioner är värre än inga: sociala plattformar reserverar utrymme efter dem
 * och beskär sedan bilden. Vi läser därför verkligheten i stället för att gissa.
 * Körs bara vid bygget (alla sidor är statiskt genererade).
 */
function readWebpDimensions(src: string): VisualDimensions | undefined {
  try {
    const b = readFileSync(join(publicDir, src));
    if (b.length < 30 || b.toString("ascii", 0, 4) !== "RIFF") return undefined;
    const format = b.toString("ascii", 12, 16);
    if (format === "VP8X") {
      return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
    }
    if (format === "VP8 ") {
      const i = b.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
      if (i < 0) return undefined;
      return { width: b.readUInt16LE(i + 3) & 0x3fff, height: b.readUInt16LE(i + 5) & 0x3fff };
    }
    if (format === "VP8L") {
      const n = b.readUInt32LE(21);
      return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
    }
  } catch {
    // Saknad/trasig fil ska inte fälla bygget – vi utelämnar då bara måtten.
  }
  return undefined;
}

/** Verkliga mått för en bild, eller undefined om de inte går att läsa. */
export function getVisualDimensions(src: string): VisualDimensions | undefined {
  return readWebpDimensions(src);
}

const specialtyBaseImages: Record<string, string> = {
  kardiolog: baseImages.cardiology,
  neurolog: baseImages.neurology,
  ortoped: baseImages.orthopedics,
  hudlakare: baseImages.dermatology,
  gynekolog: baseImages.womensHealth,
  psykiater: baseImages.generalCare,
  ogonlakare: baseImages.ophthalmology,
  "oron-nasa-hals": baseImages.ent,
  urolog: baseImages.urology,
  gastroenterolog: baseImages.gastroenterology,
  endokrinolog: baseImages.generalCare,
  reumatolog: baseImages.orthopedics,
  allmanmedicin: baseImages.generalCare,
  hematolog: baseImages.cardiology,
};

const articleImagesBySlug: Record<string, string> = {
  "hitta-ratt-specialistlakare-guide": baseImages.generalCare,
  "boka-specialist-utan-remiss": baseImages.generalCare,
  "vantetid-specialist-vardgaranti": baseImages.generalCare,
  "privat-vard-vs-offentlig": baseImages.generalCare,
  "vilken-lakare-knasmarta": baseImages.orthopedics,
  "privat-kardiolog-kostnad": baseImages.cardiology,
  "brostsmarta-kardiolog-eller-akut-vard": baseImages.cardiology,
  "hjartklappning-vilken-lakare": baseImages.cardiology,
  "privat-aderbracksbehandling-kostnad": baseImages.cardiology,
  "privat-neurolog-utredning": baseImages.neurology,
  "yrsel-vilken-lakare": baseImages.neurology,
  "domningar-hander-fotter-vilken-lakare": baseImages.neurology,
  "adhd-utredning-vuxen": baseImages.neurology,
  "privat-smartlakare-kostnad": baseImages.neurology,
  "privat-gastroenterolog-kostnad": baseImages.gastroenterology,
  "ont-i-magen-vilken-lakare": baseImages.gastroenterology,
  "privat-koloskopi-kostnad": baseImages.gastroenterology,
  "privat-gastroskopi-kostnad": baseImages.gastroenterology,
  "blod-i-avforingen-gastroenterolog-koloskopi-akut-vard": baseImages.gastroenterology,
  "uppblast-mage": baseImages.gastroenterology,
  "privat-dietist-kostnad": baseImages.gastroenterology,
  "privat-hudlakare-priser": baseImages.dermatology,
  "privat-allergolog-kostnad": baseImages.dermatology,
  "privat-gynekolog-boka": baseImages.womensHealth,
  "privat-fertilitetslakare-kostnad": baseImages.womensHealth,
  "privat-ogonlakare-kostnad": baseImages.ophthalmology,
  "gra-starr-operation-vantetid": baseImages.ophthalmology,
  "privat-onh-lakare-kostnad": baseImages.ent,
  "privat-somnapneutredning-kostnad": baseImages.ent,
  "privat-urolog-kostnad": baseImages.urology,
  "hogt-psa-urolog-prostatakontroll": baseImages.urology,
  "privat-mr-kostnad": baseImages.radiology,
  "privat-mr-rygg-kostnad": baseImages.radiology,
  "privat-ortoped-kostnad": baseImages.orthopedics,
  "ont-i-ryggen-vilken-lakare": baseImages.orthopedics,
  "privat-handkirurg-kostnad": baseImages.orthopedics,
  "privat-reumatolog-kostnad": baseImages.orthopedics,
  "privat-kirurg-kostnad": baseImages.gastroenterology,
  "privat-lunglakare-kostnad": baseImages.cardiology,
  "privat-barnlakare-kostnad": baseImages.generalCare,
  "privat-endokrinolog-kostnad": baseImages.generalCare,
  "privat-psykiater-kostnad": baseImages.generalCare,
};

const articleImagesByCategory: Record<string, string> = {
  Guide: baseImages.generalCare,
  Patienträttigheter: baseImages.generalCare,
  Kardiologi: baseImages.cardiology,
  Neurologi: baseImages.neurology,
  Gastroenterologi: baseImages.gastroenterology,
  "Mage och tarm": baseImages.gastroenterology,
  Dermatologi: baseImages.dermatology,
  Allergologi: baseImages.dermatology,
  Gynekologi: baseImages.womensHealth,
  Fertilitet: baseImages.womensHealth,
  Oftalmologi: baseImages.ophthalmology,
  "Öron-näsa-hals": baseImages.ent,
  Sömnmedicin: baseImages.ent,
  Urologi: baseImages.urology,
  Ortopedi: baseImages.orthopedics,
  Reumatologi: baseImages.orthopedics,
  Handkirurgi: baseImages.orthopedics,
  Bilddiagnostik: baseImages.radiology,
  Radiologi: baseImages.radiology,
  Psykiatri: baseImages.generalCare,
  Endokrinologi: baseImages.generalCare,
  Barnmedicin: baseImages.generalCare,
  "Kost & hälsa": baseImages.gastroenterology,
  Smärta: baseImages.neurology,
  Kirurgi: baseImages.gastroenterology,
  Lungmedicin: baseImages.cardiology,
  Kärlkirurgi: baseImages.cardiology,
};

export function getSpecialtyVisual(specialty: Specialty): MedicalVisual {
  return {
    src: resolveVisual(pageImage(`specialty-${specialty.slug}-hero`), getSpecialtyBaseImage(specialty)),
    alt: `Privat ${specialty.title.toLowerCase()} - realistisk vårdbild med människa från specialistmottagning`,
  };
}

export function getArticleVisual(article: Article): MedicalVisual {
  return {
    src: resolveVisual(pageImage(`article-${article.slug}-hero`), getArticleBaseImage(article)),
    alt: `${article.title} - realistisk vårdbild med människa för ${article.category.toLowerCase()}`,
  };
}

export function getArticleCardVisual(
  article: Article,
  scope: "articles" | "articles-featured" | "home",
): MedicalVisual {
  return {
    src: resolveVisual(
      pageImage(`${scope}-article-${article.slug}`),
      pageImage(`article-${article.slug}-hero`),
      getArticleBaseImage(article),
    ),
    alt: `${article.title} - realistisk vårdbild för artikelkort`,
  };
}

export function getCitySpecialtyVisual(
  specialty: Specialty,
  citySlug: string,
  cityName: string,
): MedicalVisual {
  return {
    src: resolveVisual(
      pageImage(`city-${specialty.slug}-${citySlug}`),
      pageImage(`specialty-${specialty.slug}-hero`),
      getSpecialtyBaseImage(specialty),
    ),
    alt: `${specialty.title} i ${cityName} - realistisk vårdbild från specialistvård`,
  };
}

export function getArticleVisuals(article: Article): MedicalVisual[] {
  const primary = getArticleVisual(article);
  const count = article.wordCount >= 1600 ? 3 : 1;

  return Array.from({ length: count }, (_, index) => ({
    src: index === 0 ? primary.src : pageImage(`article-${article.slug}-inline-${index}`),
    alt:
      index === 0
        ? primary.alt
        : `${article.title} - kompletterande realistisk vårdbild med människa ${index + 1}`,
  }));
}

export function getArticleBaseImage(article: Article): string {
  return (
    articleImagesBySlug[article.slug] ??
    (article.relatedSpecialty ? specialtyBaseImages[article.relatedSpecialty] : undefined) ??
    articleImagesByCategory[article.category] ??
    baseImages.generalCare
  );
}

export function getSpecialtyBaseImage(specialty: Specialty): string {
  return specialtyBaseImages[specialty.slug] ?? baseImages.generalCare;
}
