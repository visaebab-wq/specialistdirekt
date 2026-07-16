import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { PageVisual } from "@/components/PageVisual";

export const metadata: Metadata = {
  title: "Om Specialistdirekt – vilka vi är och hur vi arbetar",
  description:
    "Specialistdirekt är en oberoende förmedlingstjänst som hjälper dig att hitta rätt specialistläkare i Sverige – snabbt, tryggt och kostnadsfritt.",
  alternates: { canonical: "/om-oss" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Om oss", path: "/om-oss" },
];

const visual = {
  src: "/page-visuals/static-om-oss.webp",
  alt: "Specialistdirekt - realistisk vårdbild med människa och vårdteam",
};

const values = [
  {
    icon: "🎯",
    title: "Oberoende",
    text: "Vi kontaktar flera anslutna mottagningar och föreslår den tidigaste tid vi hittar hos en som passar dina besvär.",
  },
  {
    icon: "🛡️",
    title: "Trygghet",
    text: "Vi förmedlar endast kontakt med legitimerade specialister och hanterar dina uppgifter enligt GDPR.",
  },
  {
    icon: "❤️",
    title: "Personligt",
    text: "Bakom varje matchning finns en människa som läser din förfrågan och bryr sig om att det blir rätt.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">
            Om Specialistdirekt
          </h1>
          <p className="internal-hero-text">
            Vi gör det enklare och tryggare att hitta rätt specialistvård i Sverige.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="readable-card space-y-5 p-6 text-lg leading-relaxed text-ink-700 sm:p-8">
          <p>
            Att veta vart man ska vända sig med ett medicinskt besvär kan vara svårt. Vårdköer är
            långa, och det är inte alltid lätt att hitta just den specialist man behöver.
            Specialistdirekt grundades {site.foundingYear} för att lösa det problemet.
          </p>
          <p>
            Vi är en oberoende förmedlingstjänst. Du beskriver ditt behov, och vi använder vårt
            nätverk för att matcha dig med en passande, legitimerad specialist – kostnadsfritt och
            utan förpliktelser. Du behåller alltid full kontroll och väljer själv om och med vem du
            går vidare.
          </p>
          <p>
            Vi ställer inga diagnoser och ger ingen medicinsk rådgivning. Vår roll är att vara
            länken som snabbt och tryggt för dig vidare till rätt vård.
          </p>
          <p>
            Du behöver aldrig ta vårt ord för att en läkare är legitimerad. Socialstyrelsen för ett
            offentligt register över legitimerad hälso- och sjukvårdspersonal, där du själv kan
            kontrollera vilken legitimation en läkare har – gratis och när som helst. Du hittar det
            på{" "}
            <a
              href="https://legitimation.socialstyrelsen.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 hover:underline"
            >
              Socialstyrelsens register
            </a>
            .
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-ink-900">Det vi står för</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="readable-card p-6">
              <span aria-hidden className="text-3xl">
                {v.icon}
              </span>
              <h3 className="mt-3 font-semibold text-ink-900">{v.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="form-panel mt-12 p-8">
          <h2 className="text-xl font-bold text-ink-900">Företagsuppgifter och kontakt</h2>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm font-semibold text-ink-900">Tjänst</dt>
              <dd className="mt-0.5 text-ink-700">{site.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink-900">Företag</dt>
              <dd className="mt-0.5 text-ink-700">{site.legalName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink-900">Organisationsnummer</dt>
              <dd className="mt-0.5 text-ink-700">{site.orgNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink-900">E-post</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-ink-600">
            Kontakt sker tills vidare via e-post eller formuläret på webbplatsen. Vi publicerar för
            närvarande inget telefonnummer eller någon besöksadress.
          </p>
          <Link
            href="/kontakt"
            className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Skicka en förfrågan
          </Link>
        </div>
      </section>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
