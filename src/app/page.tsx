import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { articles } from "@/lib/articles";
import { faqs } from "@/lib/faq";
import { AreaSelector } from "@/components/AreaSelector";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/structured-data";
import { getArticleVisual } from "@/lib/article-visuals";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

const homeFaqs = faqs.slice(0, 5);

// Stegen i hero (ikon + etikett).
const heroSteps = [
  {
    label: "Välj specialist",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </>
    ),
  },
  {
    label: "Välj område",
    icon: (
      <>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: "Skicka bokningsförfrågan",
    icon: <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3z" />,
  },
];

const trustPoints = [
  "Vi är inte en vårdgivare",
  "Vi ställer inte diagnos",
  "Vi hjälper dig hitta rätt mottagning",
  "Bokningsförfrågan skickas vidare till passande privat mottagning",
  "Vid akuta symtom ska du söka akut vård – ring 112",
];

const valueProps = [
  {
    title: "Kostnadsfritt",
    text: "Att skicka en förfrågan är gratis och utan förpliktelser.",
    icon: <path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" />,
  },
  {
    title: "Snabbt svar",
    text: "Vi återkommer normalt redan inom en arbetsdag.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
  {
    title: "Tryggt & privat",
    text: "Dina uppgifter hanteras enligt GDPR och delas bara med vald mottagning.",
    icon: <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />,
  },
];

const specialistNeonImages: Record<string, string> = {
  kardiolog: "/specialist-neon/01-kardiolog.png",
  ortoped: "/specialist-neon/02-ortoped.png",
  hudlakare: "/specialist-neon/03-hudlakare.png",
  gynekolog: "/specialist-neon/04-gynekolog.png",
  neurolog: "/specialist-neon/05-neurolog.png",
  psykiater: "/specialist-neon/06-psykiater.png",
  ogonlakare: "/specialist-neon/07-ogonlakare.png",
  "oron-nasa-hals": "/specialist-neon/08-onh-specialist.png",
  urolog: "/specialist-neon/09-urolog.png",
  gastroenterolog: "/specialist-neon/10-gastroenterolog.png",
  endokrinolog: "/specialist-neon/11-endokrinolog.png",
  reumatolog: "/specialist-neon/12-reumatolog.png",
  hematolog: "/specialist-neon/popular-hematolog.png",
  allmanmedicin: "/specialist-neon/popular-allmanmedicin.png",
};

const popularSpecialties = [
  {
    slug: "kardiolog",
    label: "Kardiolog",
    image: "/specialist-neon/popular-kardiolog.png",
  },
  {
    slug: "neurolog",
    label: "Neurolog",
    image: "/specialist-neon/popular-neurolog.png",
  },
  {
    slug: "gastroenterolog",
    label: "Gastroenterolog",
    image: "/specialist-neon/popular-gastroenterolog.png",
  },
  {
    slug: "hematolog",
    label: "Hematolog",
    image: "/specialist-neon/popular-hematolog.png",
  },
  {
    slug: "allmanmedicin",
    label: "Allmänmedicin",
    image: "/specialist-neon/popular-allmanmedicin.png",
  },
];

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Hitta rätt privat specialist
              <span className="block text-brand-300">– enkelt och tryggt</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sky-100/90">
              Välj specialist, välj område och skicka en bokningsförfrågan. Specialistdirekt
              hjälper dig vidare till rätt privata mottagning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#valj-specialist"
                className="rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
              >
                Hitta specialist
              </Link>
              <Link
                href="/sa-fungerar-det"
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Så fungerar det
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {heroSteps.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" {...ico} aria-hidden>
                      {s.icon}
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-sky-100">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dekorativ komposition av specialitetsbilder (inga läkarfoton) */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
            <p className="text-sm font-medium text-sky-100/80">Populära specialiteter</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {popularSpecialties.map((specialty) => (
                <Link
                  key={specialty.slug}
                  href={`/specialiteter/${specialty.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/95 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                >
                  <span className="relative block aspect-[1.45] overflow-hidden bg-navy-900">
                    <img
                      src={specialty.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-white/5"
                    />
                  </span>
                  <span className="block px-2 py-3 text-xs font-semibold text-ink-800 group-hover:text-brand-700">
                    {specialty.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Välj specialist */}
      <section id="valj-specialist" className="scroll-mt-20 bg-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-ink-900">Välj specialist</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {specialties.map((s) => (
              <Link
                key={s.slug}
                href={`/specialiteter/${s.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-sky-100 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <span className="specialist-motion-media">
                  <img
                    src={specialistNeonImages[s.slug]}
                    alt=""
                    className="specialist-motion-image"
                    loading="lazy"
                  />
                </span>
                <span className="mt-3 text-sm font-semibold text-ink-800 group-hover:text-brand-700">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Välj område */}
      <section id="valj-omrade" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-ink-900">
            Välj område som passar dig
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-600">
            Välj specialist och stad så visar vi rätt mottagningar i ditt område.
          </p>
          <div className="mt-10 rounded-3xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
            <AreaSelector />
          </div>
        </div>
      </section>

      {/* Så fungerar det */}
      <section className="bg-sky-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-ink-900">Så fungerar det</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {heroSteps.map((s, i) => (
              <li key={s.label} className="flex flex-col items-center text-center">
                <span className="neon-icon-badge neon-icon-badge-lg">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" {...ico} aria-hidden>
                    {s.icon}
                  </svg>
                </span>
                <p className="mt-4 font-semibold text-ink-900">
                  {i + 1}. {s.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Förtroende / ansvar */}
      <section className="bg-ink-100">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
          <span
            aria-hidden
            className="neon-icon-badge neon-icon-badge-md shrink-0"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" {...ico}>
              <path d="M12 20.5C7 17 3.5 13.8 3.5 9.8 3.5 7 5.7 5 8.2 5c1.7 0 3.1.9 3.8 2.2C12.7 5.9 14 5 15.8 5 18.3 5 20.5 7 20.5 9.8c0 4-3.5 7.2-8.5 10.7z" />
            </svg>
          </span>
          <ul className="grid gap-2 text-ink-700 sm:grid-cols-2">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 text-brand-600">
                  •
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Värde / varför oss (ersätter foton med tematiska kort) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {valueProps.map((v) => (
            <div key={v.title} className="rounded-2xl border border-ink-200 bg-white p-7">
              <span className="neon-icon-badge neon-icon-badge-card">
                <svg viewBox="0 0 24 24" className="h-6 w-6" {...ico} aria-hidden>
                  {v.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{v.title}</h3>
              <p className="mt-1 text-ink-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guider & artiklar */}
      <section className="bg-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-ink-900">Guider & artiklar</h2>
              <p className="mt-3 text-ink-600">
                Tydliga svar om kostnader, väntetider och vägen till rätt specialist.
              </p>
            </div>
            <Link
              href="/artiklar"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Se alla artiklar →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/artiklar/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all hover:border-brand-300 hover:shadow-md"
              >
                <span className="article-card-visual aspect-[1.55]">
                  <img
                    src={getArticleVisual(a).src}
                    alt={getArticleVisual(a).alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {a.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-ink-900 group-hover:text-brand-700">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{a.excerpt}</p>
                  <span className="mt-4 text-sm font-medium text-brand-700">Läs mer →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ink-900">Vanliga frågor</h2>
        </div>
        <div className="mt-10">
          <FaqList items={homeFaqs} />
        </div>
        <p className="mt-6 text-center text-sm text-ink-600">
          Fler frågor?{" "}
          <Link href="/vanliga-fragor" className="font-semibold text-brand-700">
            Se alla vanliga frågor
          </Link>
        </p>
      </section>

      {/* Slut-CTA */}
      <section className="bg-navy-800">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Redo att hitta rätt specialist?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sky-100/90">
            Välj specialist och område, så hjälper vi dig vidare.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Skicka bokningsförfrågan
          </Link>
        </div>
      </section>

      <JsonLd data={[faqSchema(homeFaqs), serviceSchema()]} />
    </>
  );
}
