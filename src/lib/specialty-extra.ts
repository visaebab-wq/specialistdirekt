// Register för fördjupningsinnehåll per specialitet. Lägg till fler genom att
// skapa en fil under src/content/specialty-extra/ och importera den här.

import type { SpecialtyExtra } from "./specialty-extra-types";

import { extra as kardiolog } from "@/content/specialty-extra/kardiolog";
import { extra as ortoped } from "@/content/specialty-extra/ortoped";
import { extra as neurolog } from "@/content/specialty-extra/neurolog";

const registry: Record<string, SpecialtyExtra> = {
  kardiolog,
  ortoped,
  neurolog,
};

export function getSpecialtyExtra(slug: string): SpecialtyExtra | undefined {
  return registry[slug];
}
