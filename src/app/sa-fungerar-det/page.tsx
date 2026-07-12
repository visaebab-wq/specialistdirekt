import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks, steps } from "@/components/HowItWorks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Så fungerar det",
  description:
    "Så fungerar Specialistdirekt: beskriv ditt behov, vi matchar dig med rätt specialistläkare och du kommer i kontakt – kostnadsfritt och utan förpliktelser.",
  alternates: { canonical: "/sa-fungerar-det" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Så fungerar det", path: "/sa-fungerar-det" },
];

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
      <div className="bg-section">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900">
            Så fungerar det
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">
            Vägen från behov till rätt specialist ska vara enkel. Så här går det till – från det
            att du fyller i formuläret tills du har en tid bokad.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <h2 className="text-2xl font-bold text-ink-900">Bra att veta</h2>
        <dl className="mt-6 space-y-6">
          {details.map((d) => (
            <div key={d.q} className="rounded-2xl border border-ink-200 bg-white p-6">
              <dt className="font-semibold text-ink-900">{d.q}</dt>
              <dd className="mt-2 text-ink-600">{d.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-3xl bg-brand-700 px-6 py-10 text-center text-white">
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

      <JsonLd data={[breadcrumbSchema(crumbs), howToSchema(steps)]} />
    </>
  );
}
