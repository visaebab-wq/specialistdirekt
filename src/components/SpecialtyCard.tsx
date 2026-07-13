import Link from "next/link";
import type { Specialty } from "@/lib/specialties";

export function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  return (
    <Link
      href={`/specialiteter/${specialty.slug}`}
      className="readable-card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <h3 className="font-semibold text-ink-900 group-hover:text-brand-700">
        {specialty.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-600">{specialty.short}</p>
      <span className="mt-4 text-sm font-medium text-brand-600">
        Läs mer
        <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
