// Stadsregister. Varje stad bor i en egen fil under src/content/cities/.

import type { City } from "./cities-types";
import { CITY_SPECIALTY_SLUGS } from "./cities-types";

import { city as stockholm } from "@/content/cities/stockholm";
import { city as goteborg } from "@/content/cities/goteborg";
import { city as malmo } from "@/content/cities/malmo";
import { city as uppsala } from "@/content/cities/uppsala";
import { city as linkoping } from "@/content/cities/linkoping";
import { city as orebro } from "@/content/cities/orebro";
import { city as molndal } from "@/content/cities/molndal";
import { city as karlstad } from "@/content/cities/karlstad";
import { city as lund } from "@/content/cities/lund";

export const cities: City[] = [stockholm, goteborg, molndal, malmo, uppsala, linkoping, orebro, karlstad, lund];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Är denna specialitet aktiverad för stadssidor? */
export function hasCityPages(specialtySlug: string): boolean {
  return (CITY_SPECIALTY_SLUGS as readonly string[]).includes(specialtySlug);
}

export { CITY_SPECIALTY_SLUGS };

/**
 * Publiceras kombinationen stad × specialitet?
 *
 * En stad utan egen `specialties`-lista publicerar alla specialiteter i
 * CITY_SPECIALTY_SLUGS (så fungerade sajten innan listan fanns). En stad MED
 * lista publicerar bara det som står där – resten genereras inte, hamnar inte i
 * sitemapen och länkas inte till.
 *
 * Den här funktionen är den enda källan till svaret. Frågar generering, sitemap
 * och internlänkning på olika sätt hamnar de förr eller senare i otakt, och då
 * länkar sajten till sidor som inte finns.
 */
export function publishesPair(city: City, specialtySlug: string): boolean {
  if (!hasCityPages(specialtySlug)) return false;
  return city.specialties ? city.specialties.includes(specialtySlug) : true;
}

/** Städer som publicerar den här specialiteten (för internlänkning). */
export function citiesForSpecialty(specialtySlug: string): City[] {
  return cities.filter((c) => publishesPair(c, specialtySlug));
}

/** Specialitetsslugar som publiceras i den här staden (för internlänkning). */
export function specialtySlugsForCity(city: City): string[] {
  return (CITY_SPECIALTY_SLUGS as readonly string[]).filter((slug) => publishesPair(city, slug));
}
