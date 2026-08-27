import Link from "next/link";
import { RecoReviews } from "@/components/RecoReviews";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { articles, getArticle } from "@/lib/articles";
import { faqs } from "@/lib/faq";
import { AreaSelector } from "@/components/AreaSelector";
import { AnatomyHeroVisual } from "@/components/AnatomyHeroVisual";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/structured-data";
import { getArticleCardVisual } from "@/lib/medical-visuals";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

const homeFaqs = faqs.slice(0, 5);

// Stegen i hero (ikon + etikett).
const heroSteps = [
  {
    label: "Välj kroppsdel",
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

// Neon-porträtten till specialistrutnätet i hero.
const specialistNeonImages: Record<string, string> = {
  kardiolog: "/specialist-neon/01-kardiolog.webp",
  ortoped: "/specialist-neon/02-ortoped.webp",
  hudlakare: "/specialist-neon/03-hudlakare.webp",
  gynekolog: "/specialist-neon/04-gynekolog.webp",
  neurolog: "/specialist-neon/05-neurolog.webp",
  psykiater: "/specialist-neon/06-psykiater.webp",
  ogonlakare: "/specialist-neon/07-ogonlakare.webp",
  "oron-nasa-hals": "/specialist-neon/08-onh-specialist.webp",
  urolog: "/specialist-neon/09-urolog.webp",
  gastroenterolog: "/specialist-neon/10-gastroenterolog.webp",
  endokrinolog: "/specialist-neon/11-endokrinolog.webp",
  reumatolog: "/specialist-neon/12-reumatolog.webp",
  allmanmedicin: "/specialist-neon/13-allmanmedicin-v2.webp",
  hematolog: "/specialist-neon/14-hematolog-v2.webp",
};

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Startsidans tre guidekort valdes tidigare med articles.slice(0, 3), vilket bara
// speglade registrets ordning. Följden var att två godtyckliga barn-spokes –
// växtvärk och plattfot – fick startsidans länkkraft, medan barnortopedi-pelaren
// som de själva pekar tillbaka på saknade väg in från startsidan helt. Urvalet är
// därför redaktionellt: ett kluster representeras av sin pelare, inte av en spoke.
const HOME_FEATURED_SLUGS = [
  "barnortopedi",
  "privat-ortoped-kostnad",
  "hitta-ratt-specialistlakare-guide",
];

const featuredArticles = (() => {
  const picked = HOME_FEATURED_SLUGS.map((slug) => getArticle(slug)).filter(
    (a) => a !== undefined,
  );
  // Faller tillbaka på registret om en slug skulle försvinna, så kortraden aldrig
  // blir kortare än tre.
  for (const a of articles) {
    if (picked.length >= 3) break;
    if (!picked.some((p) => p.slug === a.slug)) picked.push(a);
  }
  return picked.slice(0, 3);
})();

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Hitta rätt privat specialist
              <span className="block text-brand-300">enkelt och tryggt</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sky-100/90">
              Välj kroppsdel, välj område och skicka en bokningsförfrågan. Specialistdirekt
              hjälper dig vidare till rätt privata mottagning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Egna tider finns bara hos ortopeden – knappen får inte antyda
                  att alla specialiteter går att boka direkt. */}
              <Link
                href="/boka-tid"
                className="rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
              >
                Boka ortoped
              </Link>
              <Link
                href="#valj-specialist"
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Hitta annan specialist
              </Link>
            </div>
            <div className="mt-6 grid max-w-xl gap-2 text-sm text-sky-100/90 sm:grid-cols-2">
              <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                {/* Direktbokning finns bara hos ortopeden – står det inte här
                    tror besökaren att alla specialiteter går att boka direkt. */}
                <strong className="block text-white">Direktbokning: ortoped</strong>
                Göteborg · 40 min · 2 000 kr
              </p>
              <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                <strong className="block text-white">Övriga specialister</strong>
                Skicka en kostnadsfri tidsförfrågan så hjälper vi dig vidare
              </p>
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

          {/* Alla specialiteter, som lista. Ett urval av "populära" gömde de
              övriga: den som söker t.ex. hematolog ska se sin specialist direkt
              i hero, inte behöva leta längre ner på sidan. */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
            <p className="text-xl font-bold text-white sm:text-2xl">Våra specialister</p>
            <p className="mt-1 text-sm text-sky-100/80">
              Alla {specialties.length} specialiteter – välj din direkt.
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
              {specialties.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/specialiteter/${s.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white/95 text-center shadow-sm ring-1 ring-white/20 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                  >
                    <span className="specialist-motion-media rounded-none">
                      <img
                        src={specialistNeonImages[s.slug]}
                        alt=""
                        className="specialist-motion-image transition duration-500 group-hover:scale-105"
                        // De översta korten syns direkt i hero; resten får vänta
                        // så att de inte konkurrerar med sidans LCP.
                        loading={i < 5 ? "eager" : "lazy"}
                      />
                    </span>
                    <span className="block px-2 py-2.5 text-[0.7rem] font-semibold leading-tight text-ink-800 group-hover:text-brand-700 sm:text-xs">
                      {s.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interaktiv kroppsväljare – för den som utgår från besväret. */}
      <section id="valj-specialist" className="scroll-mt-20 bg-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="text-center">
            <p className="internal-hero-kicker">Interaktiv kroppsguide</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
              Var i kroppen har du besvär?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
              Klicka på en kroppsdel eller välj ett område i listan. Vi visar vilken specialist
              som är rätt första väg och hjälper dig vidare.
            </p>
          </div>
          <div className="home-anatomy-explorer mx-auto mt-8">
            <AnatomyHeroVisual />
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

      {/* Privat MR – egen tjänsteingång (bilddiagnostik är ingen specialitet och
          syns därför inte i specialistväljaren ovan). Serverrenderad, vanliga
          länkar – ingen JS krävs för att nå innehållet eller CTA:n. */}
      <section id="privat-mr" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" {...ico}>
                  <rect x="3" y="6" width="18" height="12" rx="3" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M8 3h8M8 21h8" />
                </svg>
              </span>
              <div>
                <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Privat MR</h2>
                <p className="mt-3 max-w-2xl text-ink-700">
                  Få hjälp med medicinsk bedömning och, när det behövs, remiss inför en
                  magnetkameraundersökning. Efter undersökningen går en specialistläkare i ortopedi
                  igenom MR-svaret med dig, förklarar fynden och hjälper dig vidare med nästa steg.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <Link
                  href="/privat-mr"
                  className="rounded-full bg-brand-500 px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
                >
                  Boka privat MR
                </Link>
                <Link
                  href="/artiklar/privat-mr-kostnad"
                  className="rounded-full border border-ink-200 px-6 py-3 text-center text-base font-semibold text-ink-800 transition-colors hover:bg-ink-100"
                >
                  Läs om privat MR
                </Link>
              </div>
            </div>
            <p className="mt-6 text-sm text-ink-600">
              Röntgenläkare granskar bilderna och skriver utlåtandet – ortopedläkaren går sedan
              igenom vad MR-svaret betyder för dina besvär. Undrar du vad det innebär att göra{" "}
              <Link
                href="/artiklar/mr-utan-remiss"
                className="font-semibold text-brand-700 hover:underline"
              >
                MR utan remiss
              </Link>
              ? Läs guiden.
            </p>
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
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm ring-1 ring-sky-100">
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

      {/* Patientomdömen från Reco (riktiga omdömen om läkaren) */}
      <RecoReviews />

      {/* Värde / varför oss (ersätter foton med tematiska kort) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {valueProps.map((v) => (
            <div key={v.title} className="rounded-2xl border border-ink-200 bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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
            {featuredArticles.map((a) => {
              const visual = getArticleCardVisual(a, "home");

              return (
                <Link
                  key={a.slug}
                  href={`/artiklar/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all hover:border-brand-300 hover:shadow-md"
                >
                  <span className="article-card-visual aspect-[1.5]">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="medical-card-image h-full w-full object-cover transition duration-500 group-hover:scale-103"
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
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                      {a.excerpt}
                    </span>
                    <span className="mt-4 text-sm font-medium text-brand-700">Läs mer →</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Förtroende / ansvar. Ligger medvetet långt ned, i FAQ-/legal-zonen:
          ansvarsfriskrivningen ska finnas kvar men inte upprepas mitt i
          konverteringsflödet (särskilt inte intill MR-CTA:n ovan). */}
      <section className="bg-ink-100">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
          <span
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm"
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
          <h2 className="text-3xl font-bold text-white">Vad vill du boka?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sky-100/90">
            Direktbokning finns hos vår ortoped i Göteborg. För alla andra specialiteter skickar du
            en kostnadsfri tidsförfrågan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/boka-tid"
              className="inline-block rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Boka ortoped
            </Link>
            <Link
              href="/kontakt"
              className="inline-block rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Hitta annan specialist
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={[faqSchema(homeFaqs), serviceSchema()]} />
    </>
  );
}
