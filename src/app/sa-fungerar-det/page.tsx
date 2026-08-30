import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks, steps } from "@/components/HowItWorks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";

export const metadata: Metadata = {
  title: "Så fungerar Specialistdirekt – steg för steg",
  description:
    "Så fungerar Specialistdirekt: se lediga tider direkt i kalendern, eller skicka en kostnadsfri förfrågan om ingen tid passar.",
  alternates: { canonical: "/sa-fungerar-det" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Så fungerar det", path: "/sa-fungerar-det" },
];

const visual = {
  src: "/page-visuals/static-sa-fungerar-det.webp",
  alt: "Så fungerar Specialistdirekt - realistisk vårdbild med patient och vårdkoordinator",
};

const details = [
  {
    q: "Vad händer efter att jag skickat in?",
    a: "En av våra koordinatorer läser din förfrågan och letar upp en eller flera specialister som passar ditt behov och din ort.",
  },
  {
    q: "Hur får jag förslagen?",
    a: "Vi hör av oss via e-post eller telefon – det sätt du föredrar – med konkreta förslag och hur du går vidare för att boka tid.",
  },
  {
    q: "Vad kostar det?",
    a: "Vår förmedling är helt kostnadsfri. Du betalar bara för själva vårdbesöket, enligt mottagningens ordinarie priser eller patientavgift.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Så fungerar det</h1>
          <p className="internal-hero-text">
            Vägen från behov till rätt specialist ska vara enkel. Så här går det till – från det
            att du fyller i formuläret tills du har en tid bokad.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <h2 className="text-2xl font-bold text-ink-900">Bra att veta</h2>
        <dl className="mt-6 space-y-6">
          {details.map((d) => (
            <div key={d.q} className="readable-card p-6">
              <dt className="font-semibold text-ink-900">{d.q}</dt>
              <dd className="mt-2 text-ink-600">{d.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-3xl bg-navy-800 px-6 py-10 text-center text-white shadow-[0_22px_50px_rgba(15,23,42,0.16)]">
          <h2 className="text-2xl font-bold">Kom igång nu</h2>
          <p className="mx-auto mt-2 max-w-md text-brand-50">
            Det tar bara någon minut att skicka en förfrågan.
          </p>
          <Link
            href="/kontakt"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-700 hover:scale-[1.02]"
          >
            Skicka din förfrågan
          </Link>
        </div>
      </section>
      </div>

      <JsonLd data={[breadcrumbSchema(crumbs), howToSchema(steps)]} />
    </>
  );
}
