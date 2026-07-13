import type { Specialty } from "./specialties";

export type SpecialtyVisual = {
  src: string;
  alt: string;
};

const specialtyVisuals: Record<string, SpecialtyVisual> = {
  ortoped: {
    src: "/specialist-neon/ortoped-real-hero.png",
    alt: "Ortoped undersöker ett knä i en modern klinik med röntgenbild i bakgrunden",
  },
};

export function getSpecialtyVisual(specialty: Specialty): SpecialtyVisual | undefined {
  return specialtyVisuals[specialty.slug];
}
