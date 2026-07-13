import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { PageVisual } from "@/components/PageVisual";

export const metadata: Metadata = {
  title: "Kontakt – skicka din förfrågan",
  description:
    "Skicka en kostnadsfri förfrågan så hjälper vi dig att hitta rätt specialistläkare. Vi återkommer normalt inom en arbetsdag.",
  alternates: { canonical: "/kontakt" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Kontakt", path: "/kontakt" },
];

const visual = {
  src: "/page-visuals/static-kontakt.webp",
  alt: "Kontakt med specialistmottagning - realistisk vårdbild med människa",
};

export default function ContactPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Hitta din specialist</h1>
          <p className="internal-hero-text">
            Fyll i formuläret så matchar vi dig med rätt specialistläkare. Det är kostnadsfritt
            och utan förpliktelser – vi återkommer normalt inom en arbetsdag.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <div className="readable-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink-900">Andra sätt att nå oss</h2>
            <p className="mt-3 text-ink-600">
              Kontakt sker tills vidare via e-post eller formuläret på webbplatsen. Vi återkommer
              normalt inom en arbetsdag.
            </p>
            <dl className="mt-8 space-y-6">
              <div className="flex gap-4">
                <span aria-hidden className="text-2xl">
                  ✉️
                </span>
                <div>
                  <dt className="font-semibold text-ink-900">E-post</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="warning-card mt-8 p-5 text-sm">
              <strong>Akut?</strong> Specialistdirekt är inte en akuttjänst. Vid livshotande
              tillstånd – ring <strong>112</strong>. För sjukvårdsrådgivning, ring{" "}
              <strong>1177</strong>.
            </div>
          </div>

          <div className="form-panel p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink-900">Skicka din förfrågan</h2>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
