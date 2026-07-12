import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { specialties } from "@/lib/specialties";
import { cities, CITY_SPECIALTY_SLUGS } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Sök",
  description: "Sök bland specialiteter, städer och artiklar på Specialistdirekt.",
  // Sökresultatsidor ska inte indexeras (tunt/dynamiskt innehåll).
  robots: { index: false, follow: true },
  alternates: { canonical: "/sok" },
};

type Hit = { title: string; url: string; type: string; haystack: string };

// Bygger ett enkelt sökindex över sajtens sidor.
function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const s of specialties) {
    hits.push({
      title: `${s.title} – ${s.name}`,
      url: `/specialiteter/${s.slug}`,
      type: "Specialitet",
      haystack: [s.title, s.name, s.short, ...s.keywords].join(" ").toLowerCase(),
    });
  }
  for (const a of articles) {
    hits.push({
      title: a.title,
      url: `/artiklar/${a.slug}`,
      type: "Artikel",
      haystack: [a.title, a.excerpt, a.primaryKeyword, ...a.keywords].join(" ").toLowerCase(),
    });
  }
  for (const slug of CITY_SPECIALTY_SLUGS) {
    const sp = specialties.find((s) => s.slug === slug);
    if (!sp) continue;
    for (const c of cities) {
      hits.push({
        title: `${sp.title} i ${c.name}`,
        url: `/specialiteter/${slug}/${c.slug}`,
        type: "Stad",
        haystack: `${sp.title} ${sp.name} ${c.name} ${c.region}`.toLowerCase(),
      });
    }
  }
  return hits;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query
    ? buildIndex()
        .filter((h) => query.split(/\s+/).every((term) => h.haystack.includes(term)))
        .slice(0, 30)
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">Sök</h1>
      <form action="/sok" method="get" className="mt-6 flex gap-3" role="search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Sök specialitet, stad eller ämne…"
          aria-label="Sök"
          className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-ink-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Sök
        </button>
      </form>

      {query && (
        <p className="mt-6 text-sm text-ink-500">
          {results.length} träff{results.length === 1 ? "" : "ar"} för “{q}”
        </p>
      )}

      <ul className="mt-4 divide-y divide-ink-200">
        {results.map((h) => (
          <li key={h.url}>
            <Link href={h.url} className="flex items-center justify-between gap-4 py-4 group">
              <span className="font-medium text-ink-800 group-hover:text-brand-700">
                {h.title}
              </span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-600">
                {h.type}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {query && results.length === 0 && (
        <p className="mt-8 text-ink-600">
          Inga träffar. Prova ett annat ord, eller{" "}
          <Link href="/kontakt" className="font-medium text-brand-700 underline">
            skicka en förfrågan
          </Link>{" "}
          så hjälper vi dig.
        </p>
      )}
    </div>
  );
}
