import Link from "next/link";
import { HowItWorks, steps } from "@/components/HowItWorks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Så fungerar Specialistdirekt – steg för steg",
  description:
    "Så fungerar Specialistdirekt: se lediga tider direkt i kalendern, eller skicka en kostnadsfri förfrågan om ingen tid passar.",
  path: "/sa-fungerar-det",
});

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Så fungerar det", path: "/sa-fungerar-det" },
];

const visual = {
  src: "/page-visuals/static-sa-fungerar-det.webp",
  alt: "Så fungerar Specialistdirekt – patient i samtal inför ett specialistbesök",
};

const details = [
  {
    q: "Vad är skillnaden mellan direktbokning och bokningsförfrågan?",
    a: "Vid direktbokning – i dag ortopedbesök hos Dr. Masoud Sorkhabi i Göteborg – väljer du en ledig tid i kalendern och bekräftar den via länken i mejlet. En bokningsförfrågan är ingen bokad tid: du beskriver ditt behov och får besked om möjlig tid och pris innan något bokas.",
  },
  {
    q: "Vad händer efter att jag skickat en bokningsförfrågan?",
    a: "Vi läser din förfrågan och hör av oss via e-post eller telefon – det sätt du föredrar – med besked om möjlig tid, pris och hur du bokar.",
  },
  {
    q: "Vad kostar det?",
    a: "Det kostar inget att skicka en bokningsförfrågan. Du betalar bara för själva läkarbesöket, och priset framgår innan du bokar. Ortopedbesöket i Göteborg kostar 2 000 kr och betalas på plats.",
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
            Så bokar du ett specialistläkarbesök via Specialistdirekt – från val av specialistområde
            till besöket hos läkaren.
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
