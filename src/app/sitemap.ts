import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { mainNav } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { articles } from "@/lib/articles";
import { cities, CITY_SPECIALTY_SLUGS } from "@/lib/cities";

// lastModified sätts ENDAST där vi har ett ärligt datum (artiklarnas `updated`).
// Tidigare stämplades övriga URL:er med build-tidpunkten, vilket nollställdes vid
// varje deploy även när innehållet var oförändrat. En lastmod som bevisligen
// ljuger får Google att ignorera signalen för hela sitemapen – och då förlorar
// även artiklarnas riktiga datum sitt värde. Hellre inget datum än ett falskt.
type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Utelämnas medvetet där vi saknar ett verkligt ändringsdatum. */
  lastModified?: Date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    ...mainNav.map((n) => ({
      path: n.href,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/for-vardgivare", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/integritetspolicy", priority: 0.3, changeFrequency: "yearly" as const },
    // Gastro-vertikalens landningssidor (fristående kommersiella sidor).
    { path: "/privat-gastroenterolog", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privat-gastroskopi", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privat-koloskopi", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privat-koloskopi/goteborg", priority: 0.7, changeFrequency: "monthly" as const },
    // Bilddiagnostik – transaktionell startsida för MR.
    { path: "/privat-mr", priority: 0.8, changeFrequency: "monthly" as const },
    // Symtomledd ortopedilandning (Ads + organiskt): "knä låser sig".
    { path: "/kna-laser-sig", priority: 0.8, changeFrequency: "monthly" as const },
    // Engelsk landningssida (egen canonical + hreflang mot den svenska sidan).
    { path: "/en/private-orthopedist-gothenburg", priority: 0.6, changeFrequency: "monthly" as const },
    // Läkarprofil (entity) + ortopedisk smärtbehandling-landning.
    { path: "/lakare/masoud-sorkhabi", priority: 0.7, changeFrequency: "monthly" as const },
    // Smärt-cluster (specialty hub + Göteborg-sida).
    { path: "/specialiteter/smartlakare", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/specialiteter/smartlakare/goteborg", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const specialtyPaths = specialties.map((s) => ({
    path: `/specialiteter/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  // Artiklar använder sitt eget updated-datum (färskhet är en SEO-signal).
  const articlePaths = articles.map((a) => ({
    path: `/artiklar/${a.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: new Date(a.updated),
  }));

  // Lokala stadssidor (specialitet × stad).
  const cityPaths = CITY_SPECIALTY_SLUGS.flatMap((slug) =>
    cities.map((c) => ({
      path: `/specialiteter/${slug}/${c.slug}`,
      priority: 0.5,
      changeFrequency: "monthly" as const,
    })),
  );

  const entries: SitemapEntry[] = [
    ...staticPaths,
    ...specialtyPaths,
    ...articlePaths,
    ...cityPaths,
  ];

  return entries.map((entry) => ({
    url: `${site.url}${entry.path}`,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
