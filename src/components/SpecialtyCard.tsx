import Link from "next/link";
import type { Specialty } from "@/lib/specialties";
import { getSpecialtyVisual } from "@/lib/medical-visuals";

export function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const visual = getSpecialtyVisual(specialty);

  return (
    <Link
      href={`/specialiteter/${specialty.slug}`}
      className="readable-card group flex flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <span className="article-card-visual aspect-[1.7]">
        <img
          src={visual.src}
          alt=""
          className="medical-card-image h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-700">
          {specialty.name}
        </span>
        <h3 className="mt-1 font-semibold text-ink-900 group-hover:text-brand-700">
          {specialty.title}
        </h3>
        <span className="mt-1 flex-1 text-sm leading-relaxed text-ink-600">{specialty.short}</span>
        <span className="mt-4 text-sm font-medium text-brand-700">
          Läs mer
          <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
