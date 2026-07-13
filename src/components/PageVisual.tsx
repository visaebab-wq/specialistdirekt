import type { MedicalVisual } from "@/lib/medical-visuals";

type PageVisualProps = {
  visual: MedicalVisual;
  className?: string;
  priority?: boolean;
};

export function PageVisual({ visual, className = "", priority = false }: PageVisualProps) {
  return (
    <figure className={`specialty-hero-visual ${className}`}>
      <img
        src={visual.src}
        alt={visual.alt}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </figure>
  );
}
