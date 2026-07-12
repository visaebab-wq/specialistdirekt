import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { mainNav } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { articles } from "@/lib/articles";
import { cities, CITY_SPECIALTY_SLUGS } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    ...mainNav.map((n) => ({
      path: n.href,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/for-vardgivare", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/integritetspolicy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const specialtyPaths = specialties.map((s) => ({
    path: `/specialiteter/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: now,
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
      lastModified: now,
    })),
  );

  return [
    ...staticPaths.map((e) => ({ ...e, lastModified: now })),
    ...specialtyPaths,
    ...articlePaths,
    ...cityPaths,
  ].map((entry) => ({
    url: `${site.url}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
