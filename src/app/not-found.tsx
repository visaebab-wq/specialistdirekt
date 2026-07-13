import Link from "next/link";
import { PageVisual } from "@/components/PageVisual";

const visual = {
  src: "/page-visuals/static-not-found.webp",
  alt: "Specialistdirekt - hjälp att hitta rätt sida och specialistvård",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Sidan kunde inte hittas</h1>
      <p className="mt-3 text-ink-600">
        Sidan du letar efter finns inte eller har flyttats. Låt oss hjälpa dig vidare.
      </p>
      <PageVisual visual={visual} className="mt-8 w-full" />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Till startsidan
        </Link>
        <Link
          href="/specialiteter"
          className="rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
        >
          Se specialiteter
        </Link>
      </div>
    </div>
  );
}
