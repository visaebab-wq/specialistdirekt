import type { Article } from "./articles-types";
import type { Specialty } from "./specialties";

export type MedicalVisual = {
  src: string;
  alt: string;
};

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
    src: pageImage(`specialty-${specialty.slug}-hero`),
    alt: `Privat ${specialty.title.toLowerCase()} - realistisk vårdbild med människa från specialistmottagning`,
  };
}

export function getArticleVisual(article: Article): MedicalVisual {
  return {
    src: pageImage(`article-${article.slug}-hero`),
    alt: `${article.title} - realistisk vårdbild med människa för ${article.category.toLowerCase()}`,
  };
}

export function getArticleCardVisual(
  article: Article,
  scope: "articles" | "articles-featured" | "home",
): MedicalVisual {
  return {
    src: pageImage(`${scope}-article-${article.slug}`),
    alt: `${article.title} - unik realistisk vårdbild för artikelkort`,
  };
}

export function getCitySpecialtyVisual(specialty: Specialty, citySlug: string): MedicalVisual {
  return {
    src: pageImage(`city-${specialty.slug}-${citySlug}`),
    alt: `${specialty.title} i ${citySlug} - unik realistisk vårdbild från specialistvård`,
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
