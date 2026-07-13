"use client";

import { PageVisual } from "@/components/PageVisual";

const visual = {
  src: "/page-visuals/static-error.webp",
  alt: "Specialistdirekt - tillfälligt fel med trygg vårdbild",
};

// Global felgräns. Visas om något oväntat går fel vid rendering.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-5xl">😕</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Något gick fel</h1>
      <p className="mt-3 text-ink-600">
        Ett oväntat fel uppstod. Försök igen, eller gå tillbaka till startsidan.
      </p>
      <PageVisual visual={visual} className="mt-8 w-full" />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Försök igen
        </button>
        <a
          href="/"
          className="rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
        >
          Till startsidan
        </a>
      </div>
    </div>
  );
}
