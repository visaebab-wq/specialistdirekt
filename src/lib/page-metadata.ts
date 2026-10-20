import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
  robots?: Metadata["robots"];
};

/**
 * Keeps each page's canonical, Open Graph and X/Twitter metadata in sync.
 * Nested metadata objects are replaced rather than deeply merged by Next.js,
 * so every page must provide the complete social fields it needs.
 */
export function createPageMetadata({
  title,
  description,
  path,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(robots === undefined ? {} : { robots }),
  };
}
