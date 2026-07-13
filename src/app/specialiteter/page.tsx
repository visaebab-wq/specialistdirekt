import type { Metadata } from "next";
import Link from "next/link";
import { specialties } from "@/lib/specialties";
import { SpecialtyCard } from "@/components/SpecialtyCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Specialiteter – hitta rätt specialistläkare",
  description:
    "Bläddra bland specialiteter vi förmedlar – från kardiolog och ortoped till hudläkare och psykiater. Hitta rätt specialistläkare i Sverige, kostnadsfritt.",
  alternates: { canonical: "/specialiteter" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Specialiteter", path: "/specialiteter" },
];

export default function SpecialtiesPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Specialiteter</h1>
          <p className="internal-hero-text">
            Vi förmedlar kontakt med specialistläkare inom en rad områden. Välj en specialitet för
            att läsa mer – eller skicka en förfrågan direkt så hjälper vi dig att hitta rätt.
          </p>
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s) => (
            <SpecialtyCard key={s.slug} specialty={s} />
          ))}
        </div>

        <div className="soft-info-card mt-12 p-8 text-center">
          <h2 className="text-xl font-bold text-ink-900">Hittar du inte din specialitet?</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-600">
            Listan visar de vanligaste områdena, men vi hjälper till med fler. Beskriv ditt behov
            så guidar vi dig rätt.
          </p>
          <Link
            href="/kontakt"
            className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Skicka en förfrågan
          </Link>
        </div>
      </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Specialiteter hos Specialistdirekt",
            itemListElement: specialties.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `${site.url}/specialiteter/${s.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
