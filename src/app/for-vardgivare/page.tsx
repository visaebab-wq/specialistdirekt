import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { PageVisual } from "@/components/PageVisual";

export const metadata: Metadata = {
  title: "För vårdgivare – ta emot fler patienter",
  description:
    "Är du specialist eller driver en mottagning? Anslut dig till Specialistdirekt och få kontakt med patienter som söker just din specialitet – utan bindningstid.",
  alternates: { canonical: "/for-vardgivare" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "För vårdgivare", path: "/for-vardgivare" },
];

const visual = {
  src: "/page-visuals/static-for-vardgivare.webp",
  alt: "Privat mottagning och specialistläkare - realistisk vårdbild med människa",
};

const benefits = [
  {
    icon: "🎯",
    title: "Relevanta patienter",
    text: "Vi matchar dig med patienter som aktivt söker din specialitet i ditt område.",
  },
  {
    icon: "📈",
    title: "Fyll luckor i kalendern",
    text: "Få ett jämnare patientflöde utan att lägga tid och pengar på egen marknadsföring.",
  },
  {
    icon: "🔗",
    title: "Stark synlighet online",
    text: "Vår sajt är byggd för att synas i både Google och AI-assistenter – den synligheten delar du.",
  },
  {
    icon: "🤝",
    title: "Inga bindningar",
    text: "Kom igång utan bindningstid. Du bestämmer själv vilka förfrågningar du tar emot.",
  },
];

const steps = [
  { n: 1, t: "Hör av dig", d: "Berätta om din mottagning och vilka specialiteter du erbjuder." },
  { n: 2, t: "Vi lär känna er", d: "Vi går igenom upptagningsområde, väntetider och vad ni tar emot." },
  { n: 3, t: "Få förfrågningar", d: "Vi skickar matchande patientförfrågningar till er." },
];

export default function ForProvidersPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Anslut min mottagning till Specialistdirekt",
  )}`;

  return (
    <>
      <div className="bg-section">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            För specialister & mottagningar
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Ta emot fler patienter – utan krångel
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600">
            Specialistdirekt kopplar ihop patienter med rätt specialist. Är du specialistläkare
            eller driver en mottagning? Anslut dig så skickar vi relevanta patientförfrågningar
            till dig.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mailto}
              className="rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Anslut din mottagning
            </a>
            <Link
              href="/sa-fungerar-det"
              className="rounded-full border border-ink-300 bg-white px-6 py-3 text-base font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Så fungerar det
            </Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold text-ink-900">Därför ansluter mottagningar sig</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-ink-200 bg-white p-6">
              <span aria-hidden className="text-3xl">
                {b.icon}
              </span>
              <h3 className="mt-3 font-semibold text-ink-900">{b.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-ink-900">Så går det till</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-ink-200 bg-white p-6">
                <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold text-white">
                  Steg {s.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{s.t}</h3>
                <p className="mt-2 text-ink-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">Vill du ta emot fler patienter?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Hör av dig så berättar vi mer om hur ett samarbete kan se ut för just din mottagning.
          </p>
          <a
            href={mailto}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 transition-transform hover:scale-[1.02]"
          >
            Kontakta oss – {site.email}
          </a>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
