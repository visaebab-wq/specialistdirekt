import type { Article } from "./articles-types";

type ArticleVisual = {
  src: string;
  alt: string;
};

const specialtyImages: Record<string, string> = {
  kardiolog: "/specialist-neon/popular-kardiolog.png",
  neurolog: "/specialist-neon/popular-neurolog.png",
  ortoped: "/specialist-neon/02-ortoped.png",
  hudlakare: "/specialist-neon/03-hudlakare.png",
  gynekolog: "/specialist-neon/04-gynekolog.png",
  psykiater: "/specialist-neon/06-psykiater.png",
  ogonlakare: "/specialist-neon/07-ogonlakare.png",
  "oron-nasa-hals": "/specialist-neon/08-onh-specialist.png",
  urolog: "/specialist-neon/09-urolog.png",
  gastroenterolog: "/specialist-neon/popular-gastroenterolog.png",
  endokrinolog: "/specialist-neon/11-endokrinolog.png",
  reumatolog: "/specialist-neon/12-reumatolog.png",
};

const imageBySlug: Record<string, string> = {
  "hitta-ratt-specialistlakare-guide": "/specialist-neon/popular-allmanmedicin.png",
  "boka-specialist-utan-remiss": "/specialist-neon/popular-allmanmedicin.png",
  "vantetid-specialist-vardgaranti": "/specialist-neon/popular-allmanmedicin.png",
  "privat-vard-vs-offentlig": "/specialist-neon/popular-allmanmedicin.png",
  "privat-mr-kostnad": "/specialist-neon/05-neurolog.png",
  "privat-mr-rygg-kostnad": "/specialist-neon/02-ortoped.png",
  "privat-smartlakare-kostnad": "/specialist-neon/05-neurolog.png",
  "privat-kirurg-kostnad": "/specialist-neon/popular-gastroenterolog.png",
  "privat-lunglakare-kostnad": "/specialist-neon/popular-kardiolog.png",
  "privat-allergolog-kostnad": "/specialist-neon/03-hudlakare.png",
  "privat-handkirurg-kostnad": "/specialist-neon/02-ortoped.png",
  "privat-fertilitetslakare-kostnad": "/specialist-neon/04-gynekolog.png",
  "privat-barnlakare-kostnad": "/specialist-neon/popular-allmanmedicin.png",
  "privat-somnapneutredning-kostnad": "/specialist-neon/08-onh-specialist.png",
  "privat-dietist-kostnad": "/specialist-neon/popular-gastroenterolog.png",
  "privat-aderbracksbehandling-kostnad": "/specialist-neon/popular-kardiolog.png",
  "uppblast-mage": "/specialist-neon/popular-gastroenterolog.png",
};

const imageByCategory: Record<string, string> = {
  Guide: "/specialist-neon/popular-allmanmedicin.png",
  Patienträttigheter: "/specialist-neon/popular-allmanmedicin.png",
  Bilddiagnostik: "/specialist-neon/05-neurolog.png",
  Radiologi: "/specialist-neon/02-ortoped.png",
  Smärta: "/specialist-neon/05-neurolog.png",
  Kärlkirurgi: "/specialist-neon/popular-kardiolog.png",
  Allergologi: "/specialist-neon/03-hudlakare.png",
  Barnmedicin: "/specialist-neon/popular-allmanmedicin.png",
  Fertilitet: "/specialist-neon/04-gynekolog.png",
  Handkirurgi: "/specialist-neon/02-ortoped.png",
  Kirurgi: "/specialist-neon/popular-gastroenterolog.png",
  Lungmedicin: "/specialist-neon/popular-kardiolog.png",
  Sömnmedicin: "/specialist-neon/08-onh-specialist.png",
  "Kost & hälsa": "/specialist-neon/popular-gastroenterolog.png",
  "Mage och tarm": "/specialist-neon/popular-gastroenterolog.png",
};

export function getArticleVisual(article: Article): ArticleVisual {
  const src =
    imageBySlug[article.slug] ??
    (article.relatedSpecialty ? specialtyImages[article.relatedSpecialty] : undefined) ??
    imageByCategory[article.category] ??
    "/specialist-neon/popular-allmanmedicin.png";

  return {
    src,
    alt: `${article.title} - medicinsk illustration för ${article.category.toLowerCase()}`,
  };
}

function relatedImagePool(article: Article): string[] {
  const primary = getArticleVisual(article).src;
  const specialty = article.relatedSpecialty ? specialtyImages[article.relatedSpecialty] : undefined;
  const base = [
    primary,
    specialty,
    imageByCategory[article.category],
    "/specialist-neon/popular-allmanmedicin.png",
    "/specialist-neon/popular-gastroenterolog.png",
    "/specialist-neon/popular-kardiolog.png",
    "/specialist-neon/popular-neurolog.png",
    "/specialist-neon/02-ortoped.png",
  ].filter((src): src is string => Boolean(src));

  return Array.from(new Set(base));
}

export function getArticleVisuals(article: Article): ArticleVisual[] {
  const pool = relatedImagePool(article);
  const count = article.wordCount >= 1600 ? 3 : 1;

  return pool.slice(0, count).map((src, index) => ({
    src,
    alt:
      index === 0
        ? `${article.title} - medicinsk illustration för ${article.category.toLowerCase()}`
        : `${article.title} - kompletterande illustration ${index + 1} om ${article.category.toLowerCase()}`,
  }));
}
