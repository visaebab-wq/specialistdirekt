// Stadsregister. Varje stad bor i en egen fil under src/content/cities/.

import type { City } from "./cities-types";
import { CITY_SPECIALTY_SLUGS } from "./cities-types";

import { city as stockholm } from "@/content/cities/stockholm";
import { city as goteborg } from "@/content/cities/goteborg";
import { city as malmo } from "@/content/cities/malmo";
import { city as uppsala } from "@/content/cities/uppsala";
import { city as linkoping } from "@/content/cities/linkoping";
import { city as orebro } from "@/content/cities/orebro";

export const cities: City[] = [stockholm, goteborg, malmo, uppsala, linkoping, orebro];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Är denna specialitet aktiverad för stadssidor? */
export function hasCityPages(specialtySlug: string): boolean {
  return (CITY_SPECIALTY_SLUGS as readonly string[]).includes(specialtySlug);
}

export { CITY_SPECIALTY_SLUGS };
