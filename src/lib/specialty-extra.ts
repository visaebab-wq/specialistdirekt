// Register för fördjupningsinnehåll per specialitet. Lägg till fler genom att
// skapa en fil under src/content/specialty-extra/ och importera den här.

import type { SpecialtyExtra } from "./specialty-extra-types";

import { extra as kardiolog } from "@/content/specialty-extra/kardiolog";
import { extra as ortoped } from "@/content/specialty-extra/ortoped";
import { extra as neurolog } from "@/content/specialty-extra/neurolog";
import { extra as gastroenterolog } from "@/content/specialty-extra/gastroenterolog";
import { extra as psykiater } from "@/content/specialty-extra/psykiater";
import { extra as hudlakare } from "@/content/specialty-extra/hudlakare";
import { extra as urolog } from "@/content/specialty-extra/urolog";
import { extra as ogonlakare } from "@/content/specialty-extra/ogonlakare";
import { extra as gynekolog } from "@/content/specialty-extra/gynekolog";
import { extra as oronNasaHals } from "@/content/specialty-extra/oron-nasa-hals";
import { extra as endokrinolog } from "@/content/specialty-extra/endokrinolog";
import { extra as reumatolog } from "@/content/specialty-extra/reumatolog";

const registry: Record<string, SpecialtyExtra> = {
  kardiolog,
  ortoped,
  neurolog,
  gastroenterolog,
  psykiater,
  hudlakare,
  urolog,
  ogonlakare,
  gynekolog,
  "oron-nasa-hals": oronNasaHals,
  endokrinolog,
  reumatolog,
};

export function getSpecialtyExtra(slug: string): SpecialtyExtra | undefined {
  return registry[slug];
}
