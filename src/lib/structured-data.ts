// Hjälpare som bygger schema.org-objekt. Centraliserat så att all
// strukturerad data är konsekvent och lätt att underhålla.

import { site } from "./site";
import type { Specialty } from "./specialties";
import type { City } from "./cities-types";
import type { Article } from "./articles-types";
import { getArticleVisuals } from "./medical-visuals";
import { medicalReviewerFor } from "./medical-reviewer";

const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

// OBS: Vi publicerar medvetet inget telefonnummer och ingen fysisk adress.
// Därför finns här varken telephone, address/PostalAddress eller contactPoint.
// Den enda kontaktuppgiften i strukturerad data är den verifierade e-postadressen,
// som också visas synligt på sajten. Lägg inte tillbaka phone/address/contactPoint
// utan verifierade företagsuppgifter.

// Tar bort fält som är undefined/tomma så att schemat aldrig innehåller
// platshållare eller tomma värden.
function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  ) as T;
}

/** Organisationen bakom sajten – läggs i layouten på varje sida. */
export function organizationSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    // Verifierat registrerat firmanamn (ViSaeb AB) och organisationsnummer.
    legalName: site.legalName,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Organisationsnummer",
      value: site.orgNumber,
    },
    url: site.url,
    logo: abs("/icon.svg"),
    image: abs("/opengraph-image"),
    email: site.email,
    foundingDate: String(site.foundingYear),
    description: site.description,
    areaServed: { "@type": "Country", name: "Sverige" },
    knowsLanguage: ["sv"],
    sameAs: site.social,
  });
}

// MedicalBusiness-schemat är borttaget: Specialistdirekt är en förmedlare/
// koordinator, inte en vårdgivare, klinik eller MedicalBusiness. Att typa sajten
// som en medicinsk enhet är felaktig strukturerad data på en YMYL-sajt.
// Sajtentiteten beskrivs enbart som Organization + WebSite.

/** WebSite-objekt med SearchAction – ger ev. sitelinks-sökruta i Google. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: site.lang,
    publisher: { "@id": `${site.url}/#organization` },
    // Ger möjlighet till sitelinks-sökruta direkt i Googles sökresultat.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/sok?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * HowTo-schema för "Så fungerar det" – kan ge utökade sökresultat med steg.
 */
export function howToSchema(steps: { title: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Så hittar du rätt specialistläkare med Specialistdirekt",
    description: site.description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
}

/** Service-schema för förmedlingstjänsten. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Förmedling av specialistläkare",
    serviceType: "Vårdförmedling",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Sverige" },
    description: site.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      description: "Kostnadsfri förmedling till patienter.",
    },
  };
}

/** Brödsmulor för bättre sökresultat och navigering. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

// Tar bort den säkra inline-markup som svaren kan innehålla
// ([länktext](/sökväg) → länktext, **fet** → fet) så att JSON-LD alltid
// innehåller ren text som matchar det besökaren ser i FAQ-listan.
function stripInlineMarkup(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(\/[^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** FAQ-schema – kan ge utökade sökresultat (rich results). */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: stripInlineMarkup(f.answer) },
    })),
  };
}

/**
 * Artikel-schema. Vi använder MedicalWebPage (vård/YMYL) som tydligt
 * signalerar ämne och syfte till både Google och AI-assistenter.
 */
export function articleSchema(article: Article) {
  const url = abs(`/artiklar/${article.slug}`);
  const visuals = getArticleVisuals(article);
  const reviewer = medicalReviewerFor(article);
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "MedicalWebPage"],
    headline: article.title,
    ...(reviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            "@id": `${abs(reviewer.url)}#person`,
            name: reviewer.name,
            jobTitle: reviewer.title,
            url: abs(reviewer.url),
          },
          lastReviewed: article.updated,
        }
      : {}),
    description: article.metaDescription,
    inLanguage: site.lang,
    datePublished: article.published,
    dateModified: article.updated,
    ...(article.summary && article.summary.length > 0
      ? { abstract: stripInlineMarkup(article.summary.join(" ")) }
      : {}),
    wordCount: article.wordCount,
    image: visuals.map((visual) => abs(visual.src)),
    keywords: article.keywords.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "MedicalSpecialty", name: article.category },
    // Innehållet är informativt, inte en ersättning för vårdkontakt.
    audience: { "@type": "Patient" },
  };
}

/**
 * WebPage-schema för en enskild sida. Beskriver ENBART det som faktiskt är
 * synligt på sidan (Google varnar uttryckligen för schema som inte matchar
 * synligt innehåll). Ingen medicinsk granskare eller Physician/Person läggs in.
 */
export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  primaryImage?: string;
  breadcrumbId?: string;
}) {
  const url = abs(opts.path);
  return clean({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: site.lang,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    primaryImageOfPage: opts.primaryImage ? abs(opts.primaryImage) : undefined,
  });
}

/**
 * Service-schema för en stad×specialitet-förmedlingssida. Provider är ALLTID
 * Specialistdirekt (Organization) – aldrig den anonyma mottagningen eller
 * läkaren. Ingen AggregateRating/Review och inget Offer med okänt medicinskt
 * pris; det enda priset är den kostnadsfria förmedlingen.
 */
export function citySpecialtyServiceSchema(specialty: Specialty, city: City, path: string) {
  const title = specialty.title.toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Förmedling av privat ${title} i ${city.name}`,
    serviceType: "Vårdförmedling",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "City", name: city.name },
    url: abs(path),
    description: `Specialistdirekt hjälper dig till privat ${title} i ${city.name}. Specialistdirekt är en förmedlingstjänst och inte vårdgivare.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      description: "Kostnadsfri förmedling.",
    },
  };
}

/** Tjänsteschema för en specialitetssida. */
export function specialtyServiceSchema(specialty: Specialty) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    name: specialty.name,
    url: abs(`/specialiteter/${specialty.slug}`),
    description: specialty.short,
    provider: { "@id": `${site.url}/#organization` },
  };
}
