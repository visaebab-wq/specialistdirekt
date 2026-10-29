// Hjälpare som bygger schema.org-objekt. Centraliserat så att all
// strukturerad data är konsekvent och lätt att underhålla.

import { site } from "./site";
import type { Specialty } from "./specialties";
import type { City } from "./cities-types";
import type { Article } from "./articles-types";
import { getArticleVisuals } from "./medical-visuals";
import { medicalReviewerFor } from "./medical-reviewer";

const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

// Kontaktuppgifterna i Organization kommer från site.ts:
// postadressen är bolagets postadress och numret är en separat arbetslinje.
// Samtliga visas också synligt på sajten – schema som inte
// motsvarar synligt innehåll är fel enligt Googles egna riktlinjer.
//
// PostalAddress beskriver BOLAGETS kontor. Den är medvetet INTE en besöksadress
// och får aldrig återanvändas som mottagningsadress: ortopedibesöket sker hos
// läkaren i Göteborg. Av samma skäl typas sajten fortfarande som Organization,
// aldrig som MedicalBusiness eller LocalBusiness med öppettider.

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
    // Verifierat registrerat firmanamn (Visaeb Medical Group AB).
    legalName: site.legalName,
    url: site.url,
    logo: abs("/icon.svg"),
    image: abs("/opengraph-image"),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      areaServed: "SE",
      availableLanguage: ["sv"],
    },
    foundingDate: String(site.foundingYear),
    description: site.description,
    areaServed: { "@type": "Country", name: "Sverige" },
    knowsLanguage: ["sv"],
    sameAs: site.social,
  });
}

// MedicalBusiness-schemat är borttaget. Specialistdirekt är inte vårdgivare och
// koordinator; vården ges av mottagningen. MedicalBusiness beskriver en enhet
// som själv bedriver vård, och att typa sajten så vore felaktig strukturerad
// data på en YMYL-sajt. Sajtentiteten beskrivs enbart som Organization + WebSite.

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

/** Service-schema för boknings- och informationstjänsten. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bokning och information om specialistläkare",
    serviceType: "Boknings- och informationstjänst",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Sverige" },
    description: site.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      description: "Det kostar inget att skicka en förfrågan.",
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
    // Källorna som artikeln vilar på. Ett granskat YMYL-innehåll utan angivna
    // källor är svårt att verifiera – för både läsare och sökmotor.
    ...(article.sources && article.sources.length > 0
      ? {
          citation: article.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.label,
            url: s.url,
            publisher: { "@type": "Organization", name: s.publisher },
          })),
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
  /** @id för det sidan handlar om, t.ex. sidans Service (`…#service`). */
  aboutId?: string;
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
    about: opts.aboutId ? { "@id": opts.aboutId } : undefined,
  });
}

/**
 * Service-schema för ett besök med egna tider och fast pris (ortoped i
 * Göteborg). Läkaren är `provider` via sin publicerade profilsida. Priset måste
 * vara samma siffra som syns på sidan – schema som inte motsvarar synligt
 * innehåll är fel enligt Googles egna riktlinjer. Ingen adress, inga
 * öppettider, ingen AggregateRating/Review.
 */
export function bookableServiceSchema(opts: {
  path: string;
  name: string;
  description: string;
  areaServed: string;
  price?: { name: string; amount: number; currency: string };
  providerProfilePath?: string;
}) {
  const url = abs(opts.path);
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url,
    areaServed: { "@type": "City", name: opts.areaServed },
    provider: opts.providerProfilePath
      ? { "@id": `${abs(opts.providerProfilePath)}#person` }
      : { "@id": `${site.url}/#organization` },
    audience: { "@type": "Patient" },
    offers: opts.price
      ? {
          "@type": "Offer",
          name: opts.price.name,
          price: opts.price.amount,
          priceCurrency: opts.price.currency,
          url,
        }
      : undefined,
  });
}

/**
 * Service-schema för en stad×specialitet-informationssida. Provider är ALLTID
 * Specialistdirekt (Organization) – aldrig den anonyma mottagningen eller
 * läkaren. Ingen AggregateRating/Review och inget Offer med okänt medicinskt
 * pris; det enda priset är den kostnadsfria tjänsten.
 */
export function citySpecialtyServiceSchema(specialty: Specialty, city: City, path: string) {
  const title = specialty.title.toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Bokning och information om privat ${title} i ${city.name}`,
    serviceType: "Boknings- och informationstjänst",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "City", name: city.name },
    url: abs(path),
    description: `Specialistdirekt hjälper dig till privat ${title} i ${city.name}. Specialistdirekt är en boknings- och informationstjänst.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      description: "Kostnadsfri förfrågan.",
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
