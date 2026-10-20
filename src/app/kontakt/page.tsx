import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { PhoneLink } from "@/components/PhoneLink";
import { PageVisual } from "@/components/PageVisual";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Kontakt – skicka din förfrågan",
  description:
    "Skicka en kostnadsfri förfrågan så hjälper vi dig att hitta rätt specialistläkare. Vi återkommer normalt inom en arbetsdag.",
  path: "/kontakt",
});

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
            Fyll i formuläret så återkommer vi med besked. Det är kostnadsfritt
            – vi återkommer normalt inom en arbetsdag.
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
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100"
                >
                  @
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
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  ☎
                </span>
                <div>
                  <dt className="font-semibold text-ink-900">Telefon</dt>
                  <dd>
                    <PhoneLink className="text-brand-700 hover:underline" />
                  </dd>
                </div>
              </div>
              {/* Bolagets registrerade adress – ett kontor, inte en mottagning.
                  Står här så att uppgifterna på sajten, i Organization-schemat
                  och i Google Företagsprofil är identiska. */}
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  ⌂
                </span>
                <div>
                  <dt className="font-semibold text-ink-900">Postadress</dt>
                  <dd>
                    <address className="not-italic">
                      {site.legalName}
                      <br />
                      {site.address.street}
                      <br />
                      {site.address.postalCode} {site.address.city}
                    </address>
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
            <h2 className="text-xl font-bold text-ink-900">Skicka din tidsförfrågan</h2>
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
