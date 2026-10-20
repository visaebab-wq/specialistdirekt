import Link from "next/link";

import { PageVisual } from "@/components/PageVisual";

const VISUAL = {
  src: "/page-visuals/static-not-found.webp",
  alt: "Specialistdirekt – hjälp att hitta rätt sida och specialistvård",
};

export function NotFoundContent({ locale }: { locale: "sv" | "en" }) {
  const english = locale === "en";

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">
        {english ? "Page not found" : "Sidan kunde inte hittas"}
      </h1>
      <p className="mt-3 text-ink-600">
        {english
          ? "The page you are looking for does not exist or has moved. Let us help you find the right place."
          : "Sidan du letar efter finns inte eller har flyttats. Låt oss hjälpa dig vidare."}
      </p>
      <PageVisual
        visual={
          english
            ? {
                ...VISUAL,
                alt: "Specialistdirekt – help finding the right page and specialist care",
              }
            : VISUAL
        }
        className="mt-8 w-full"
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={english ? "/en" : "/"}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {english ? "Go to homepage" : "Till startsidan"}
        </Link>
        <Link
          href={english ? "/en/private-orthopedist-gothenburg" : "/specialiteter"}
          className="rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
        >
          {english ? "Orthopedist in Gothenburg" : "Se specialiteter"}
        </Link>
      </div>
    </div>
  );
}
