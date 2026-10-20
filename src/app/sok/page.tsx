import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { specialties } from "@/lib/specialties";
import { cities, CITY_SPECIALTY_SLUGS } from "@/lib/cities";
import { singleSearchParam, type SearchParamValue } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Sök",
  description: "Sök bland specialiteter, städer och artiklar på Specialistdirekt.",
  // Sökresultatsidor ska inte indexeras (tunt/dynamiskt innehåll).
  robots: { index: false, follow: true },
  alternates: { canonical: "/sok" },
};

type Hit = { title: string; url: string; type: string; haystack: string };

/** Gör "ogonlakare" sökbart som "ögonläkare" utan att ändra visad text. */
function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("sv-SE");
}

// Bygger ett enkelt sökindex över sajtens sidor.
function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const s of specialties) {
    hits.push({
      title: `${s.title} – ${s.name}`,
      url: `/specialiteter/${s.slug}`,
      type: "Specialitet",
      haystack: normalizeSearch([s.slug, s.title, s.name, s.short, ...s.keywords].join(" ")),
    });
  }
  for (const a of articles) {
    hits.push({
      title: a.title,
      url: `/artiklar/${a.slug}`,
      type: "Artikel",
      haystack: normalizeSearch(
        [a.slug, a.title, a.excerpt, a.primaryKeyword, ...a.keywords].join(" "),
      ),
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
        haystack: normalizeSearch(
          `${slug} ${c.slug} ${sp.title} ${sp.name} ${c.name} ${c.region}`,
        ),
      });
    }
  }
  hits.push(
    {
      title: "Smärtläkare och smärtmottagning",
      url: "/specialiteter/smartlakare",
      type: "Specialitet",
      haystack: normalizeSearch(
        "smartlakare smärtläkare smärtmottagning smärtspecialist långvarig smärta",
      ),
    },
    {
      title: "Privat smärtläkare i Göteborg",
      url: "/specialiteter/smartlakare/goteborg",
      type: "Stad",
      haystack: normalizeSearch(
        "smartlakare smärtläkare smärtmottagning smärtspecialist långvarig smärta goteborg Göteborg",
      ),
    },
  );
  return hits;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: SearchParamValue }>;
}) {
  const q = singleSearchParam((await searchParams).q);
  const query = normalizeSearch(q.trim());
  const matchingResults = query
    ? buildIndex()
        .filter((h) => query.split(/\s+/).every((term) => h.haystack.includes(term)))
    : [];
  const results = matchingResults.slice(0, 30);

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
          className="w-full rounded-xl border border-ink-500 bg-white px-4 py-3 text-ink-900 focus:border-brand-700 focus:ring-2 focus:ring-brand-200 focus:outline-none"
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
          {matchingResults.length} träff{matchingResults.length === 1 ? "" : "ar"} för “{q}”
        </p>
      )}

      {matchingResults.length > results.length && (
        <p className="mt-2 text-sm text-ink-500">
          Visar de första {results.length} träffarna. Lägg till fler sökord för att avgränsa sökningen.
        </p>
      )}

      <ul className="mt-4 divide-y divide-ink-200">
        {results.map((h) => (
          <li key={h.url}>
            <Link href={h.url} className="flex items-center justify-between gap-4 py-4 group">
              <span className="font-medium text-ink-800 group-hover:text-brand-700">
                {h.title}
              </span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-700">
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
