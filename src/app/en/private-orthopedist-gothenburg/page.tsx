import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getSpecialty } from "@/lib/specialties";
import { getCitySpecialtyVisual, getVisualDimensions } from "@/lib/medical-visuals";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PageVisual } from "@/components/PageVisual";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

const PATH = "/en/private-orthopedist-gothenburg";
const SV_PATH = "/specialiteter/ortoped/goteborg";
const BOOKING_URL = "/boka/ortoped-goteborg?src=/en/private-orthopedist-gothenburg&cta=en-landing";
const TITLE = "Private Orthopedist in Gothenburg Without Referral | Specialistdirekt";
const DESCRIPTION =
  "Book a private orthopedist in Gothenburg without a referral. A 40-minute self-paid visit costs 2,000 SEK and is confirmed by e-mail.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "private orthopedist Gothenburg",
    "orthopedist Gothenburg without referral",
    "private orthopaedic Gothenburg",
    "orthopedist Gothenburg English",
    "self-paying orthopedist Sweden",
  ],
  alternates: {
    canonical: PATH,
    languages: {
      "sv-SE": SV_PATH,
      "en-SE": PATH,
      "x-default": SV_PATH,
    },
  },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    locale: "en_SE",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    question: "Who is the doctor?",
    answer:
      "You see Dr. Masoud Sorkhabi, a specialist in orthopedics and spine surgery in Gothenburg with over 20 years of experience in orthopedics and surgery, focusing on neck and back problems, disc herniation, hip and knee pain as well as chronic and unexplained pain. The medical assessment and treatment are provided by the doctor; Specialistdirekt handles the booking.",
  },
  {
    question: "Can I see a private orthopedist in Gothenburg without a referral?",
    answer:
      "Yes. As a self-paying patient you do not need a referral (remiss) to book an appointment with Dr. Masoud Sorkhabi in Gothenburg. Region-funded care may have different requirements, and private health insurance usually goes through the insurer.",
  },
  {
    question: "How much does a visit with Dr. Masoud Sorkhabi cost?",
    answer:
      "A visit in Gothenburg costs 2,000 SEK, paid at the clinic on the day. The price is fixed and shown before you book.",
  },
  {
    question: "Can I see an orthopedist for back or neck pain?",
    answer:
      "Yes. Back and neck problems, including pain that radiates into the arm, are among Dr. Masoud Sorkhabi's focus areas. The orthopedist makes a medical assessment of your current symptoms.",
  },
  {
    question: "Can an orthopedist assess radiating or nerve-related pain?",
    answer:
      "Yes. Disc-related and nerve-related radiating pain are also among his focus areas. The orthopedist assesses your current symptoms and reasonable next steps. This page does not provide a diagnosis.",
  },
  {
    question: "Can I book an appointment for knee pain?",
    answer:
      "Yes. Knee problems such as pain, swelling, locking or instability are a common reason to see an orthopedist. You select an available time in the calendar and confirm it through the link sent by e-mail.",
  },
  {
    question: "Do I need an MRI before seeing an orthopedist?",
    answer:
      "No. You do not need to arrange an MRI or X-ray yourself before a first appointment. If you already have such material, it is good to bring it. The doctor decides what, if anything, is needed.",
  },
  {
    question: "Does the orthopedist speak English?",
    answer:
      "The booking flow does not guarantee a consultation in English. Contact Specialistdirekt before booking if you need to confirm language availability with the clinic.",
  },
  {
    question: "What is Specialistdirekt's role?",
    answer:
      "Specialistdirekt provides the booking service. Dr. Masoud Sorkhabi, a specialist in orthopedics and spine surgery in Gothenburg, makes the medical assessment.",
  },
  {
    question: "Who is responsible for my medical care?",
    answer:
      "The medical assessment, treatment and medical responsibility lie with Dr. Masoud Sorkhabi, who conducts the appointment. Specialistdirekt does not give medical advice.",
  },
];

const quickFacts = [
  { label: "Doctor", value: "Dr. Masoud Sorkhabi, specialist in orthopedics and spine surgery" },
  { label: "Visit", value: "In person in Gothenburg" },
  { label: "Price", value: "2,000 SEK – paid at the clinic on the day" },
  { label: "Specialty", value: "Orthopedics" },
  { label: "Experience", value: "More than 20 years of clinical experience" },
  { label: "Focus", value: "Back, neck, knee and nerve-related problems" },
  { label: "Patient type", value: "Self-paying" },
  { label: "Referral", value: "Not required" },
  { label: "Booking", value: "Choose a time directly in the calendar" },
  { label: "Role", value: "Specialistdirekt provides the booking service" },
];

export default function EnglishOrthopedistGothenburgPage() {
  const specialty = getSpecialty("ortoped");
  const baseVisual = specialty
    ? getCitySpecialtyVisual(specialty, "goteborg", "Gothenburg")
    : { src: "/real-medical/orthopedics.webp", alt: "Private orthopedic care in Gothenburg" };
  const visual = { ...baseVisual, alt: "Private orthopedic consultation in Gothenburg" };

  const crumbs = [
    { name: "Home", path: "/en" },
    { name: "Private orthopedist in Gothenburg", path: PATH },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} locale="en" />
          <p className="mt-6">
            <Link
              href={SV_PATH}
              hrefLang="sv"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white hover:underline"
            >
              <span
                aria-hidden
                className="rounded border border-brand-300/50 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide"
              >
                SV
              </span>
              På svenska: Privat ortoped i Göteborg
            </Link>
          </p>
          <div className="mt-4">
            <p className="internal-hero-kicker">Orthopedics · Gothenburg</p>
            <h1 className="internal-hero-title">Private orthopedist in Gothenburg</h1>
          </div>
          <p className="internal-hero-text">
            Looking for a private orthopedist in Gothenburg? You can book a 40-minute appointment
            with Dr. Masoud Sorkhabi, a specialist in orthopedics and spine surgery with over 20
            years of experience in orthopedics and surgery. The visit costs 2,000 SEK and no
            referral is required for this private, self-paid appointment.
          </p>
          <PageVisual visual={visual} className="mt-10 max-w-3xl" priority />
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <article className="article-body readable-card p-6 sm:p-8">
              <section
                aria-label="Quick facts"
                className="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"
              >
                <h2 className="text-lg font-bold text-ink-900">Private orthopedist in Gothenburg – quick facts</h2>
                <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {quickFacts.map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <dt className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                        {f.label}
                      </dt>
                      <dd className="text-sm text-ink-800">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <h2 className="article-section-title text-2xl font-bold">How it works</h2>
              <p className="mt-3">
                Areas of expertise include back, neck and knee problems,
                disc-related conditions, nerve-related pain, SI joint problems, sports and overuse
                injuries, and long-term musculoskeletal pain. Dr. Masoud Sorkhabi has more than 20
                years of clinical experience. Visits are in person in Gothenburg and cost 2,000 SEK,
                paid at the clinic on the day. You choose an available time in the calendar and
                confirm the appointment through the link sent by e-mail.
              </p>
              <p className="mt-3">
                <strong>Specialistdirekt provides the booking service.</strong>{" "}
                The medical assessment and treatment are provided by the doctor.
              </p>

              <section aria-label="When to seek emergency care" className="warning-card mt-10 p-6">
                <h2 className="text-xl font-bold text-ink-900">When to seek emergency care instead</h2>
                <p className="mt-2 text-ink-700">
                  Specialistdirekt is not an emergency service. Call <strong>112</strong> for
                  life-threatening conditions and seek immediate care for, for example:
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "a suspected fracture or major trauma to the head, neck or back",
                    "sudden severe back pain with numbness around the groin, difficulty urinating or loss of bladder or bowel control",
                    "sudden or rapidly increasing weakness or numbness in an arm or leg",
                    "an arm or leg that becomes cold, pale or numb after an injury",
                    "joint or back pain together with a high fever and feeling severely unwell",
                  ].map((b) => (
                    <li key={b} className="flex gap-3 text-ink-700">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-600">
                  If in doubt, call <strong>1177</strong> for healthcare advice (in Swedish),
                  available around the clock.
                </p>
              </section>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Do I need a referral? Self-paying vs region-funded care
              </h2>
              <p className="mt-3">
                In Sweden, a <em>remiss</em> means a referral. As a self-paying (private) patient you
                do not need a referral to book this self-paid appointment with the
                orthopedist in Gothenburg. Region-funded (public) care usually requires a
                referral from a health centre (vårdcentral), and if you want to use private health
                insurance, the insurer normally needs to approve the case first.
              </p>
              <p className="mt-3">
                Self-paying means you pay for the visit privately; the Swedish high-cost protection
                (högkostnadsskydd) does not normally apply to a private visit. If you intend to use
                private health insurance, ask your insurer to confirm the applicable process before
                booking.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Price</h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi&apos;s price is fixed and shown before you book: an in-person
                visit in Gothenburg is <strong>2,000 SEK</strong>, paid at the clinic on the day.
              </p>

              <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Book an appointment</h2>
                <p className="mt-2 text-ink-700">
                  Book a visit in Gothenburg (2,000 SEK) directly in the calendar. You confirm the
                  appointment through a link in the e-mail, and you pay at the clinic on the day.
                  Cancellation is free up to 3 hours before the visit. The booking calendar is in
                  Swedish.
                </p>
                <Link
                  href={BOOKING_URL}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Book with Dr. Masoud Sorkhabi
                </Link>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Frequently asked questions</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <div className="soft-info-card mt-8 p-6 text-sm text-ink-600">
                <p>
                  This is general information and is not a substitute for an individual medical
                  assessment. If you are unsure where to seek care in Sweden, call 1177 for
                  healthcare advice.
                </p>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Book an appointment</h2>
                {/* No target="_blank": the booking lives on this site now. */}
                <a
                  href={BOOKING_URL}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Book with Dr. Masoud Sorkhabi
                </a>
                <p className="mt-2 text-xs text-ink-500">
                  The booking calendar is in Swedish. You confirm the appointment through a link in
                  the e-mail and pay at the clinic on the day. Free cancellation up to 3 hours before.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${site.url}${PATH}#webpage`,
            url: `${site.url}${PATH}`,
            name: "Private orthopedist in Gothenburg",
            description: DESCRIPTION,
            inLanguage: "en",
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
