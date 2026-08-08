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
const BOOKING_URL = "/boka/ortoped-goteborg";

export const metadata: Metadata = {
  title: "Private Orthopedist in Gothenburg Without Referral | Specialistdirekt",
  description:
    "See a private orthopedist in Gothenburg without a referral. Self-paying patients can send a free appointment request for back, neck and knee problems via Specialistdirekt.",
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
    title: "Private Orthopedist in Gothenburg Without Referral | Specialistdirekt",
    description:
      "See a private orthopedist in Gothenburg without a referral. Self-paying patients can send a free appointment request via Specialistdirekt.",
    url: PATH,
    locale: "en_SE",
  },
};

const faqs = [
  {
    question: "Who is the doctor?",
    answer:
      "You see Dr. Masoud Sorkhabi, a specialist in orthopedics and spine surgery in Gothenburg with over 20 years of experience in orthopedics and surgery, focusing on neck and back problems, disc herniation, hip and knee pain as well as chronic and unexplained pain. The medical assessment and treatment are provided by the doctor; Specialistdirekt arranges the contact and is not a healthcare provider.",
  },
  {
    question: "Can I see a private orthopedist in Gothenburg without a referral?",
    answer:
      "Yes. As a self-paying patient you do not need a referral (remiss) to book an appointment or send a request to Dr. Masoud Sorkhabi in Gothenburg. Region-funded care may have other requirements, and private health insurance usually goes through the insurer.",
  },
  {
    question: "How much does a visit with Dr. Masoud Sorkhabi cost?",
    answer:
      "An in-person visit in Gothenburg is 2,000 SEK and a digital video visit is 1,000 SEK. The prices are fixed and shown before you book. A digital visit can be booked from anywhere in Sweden.",
  },
  {
    question: "Can I have a digital visit if I don't live in Gothenburg?",
    answer:
      "Yes. Dr. Masoud Sorkhabi offers digital video visits across Sweden for 1,000 SEK. A digital visit suits a first assessment of your problem; some problems may need an in-person visit in Gothenburg, which is 2,000 SEK.",
  },
  {
    question: "Can I see an orthopedist for back or neck pain?",
    answer:
      "Yes. Back and neck problems, including pain radiating into the arm, are within the connected specialist's focus. The orthopedist makes a medical assessment of your current symptoms.",
  },
  {
    question: "Can an orthopedist assess radiating or nerve-related pain?",
    answer:
      "Yes. Disc-related and nerve-related, radiating pain are within the connected specialist's focus. The orthopedist assesses your current symptoms and reasonable next steps. This page does not provide a diagnosis.",
  },
  {
    question: "Can I request an appointment for knee pain?",
    answer:
      "Yes. Knee problems such as pain, swelling, locking or instability are a common reason to see an orthopedist. You describe your symptoms in the request and receive a possible time and price before deciding.",
  },
  {
    question: "Do I need an MRI before seeing an orthopedist?",
    answer:
      "No. You do not need to arrange an MRI or X-ray yourself just to send a first appointment request. If you already have such material, it is good to bring it. The doctor decides what, if anything, is needed.",
  },
  {
    question: "How do I find a highly rated orthopedist in Gothenburg?",
    answer:
      "Look beyond the average score: how recent the reviews are, the doctor's specialist competence and experience, whether the doctor works with your type of problem, and that you get a clear price. Dr. Masoud Sorkhabi had a public rating of 4.9 out of 5 when last checked on 4 August 2026 — a rating that applies to the doctor, not to Specialistdirekt, and that is no guarantee of a medical outcome.",
  },
  {
    question: "Does the orthopedist speak English?",
    answer:
      "State your language preference in the request and we will take it into account and check with the clinic. Many doctors in Sweden speak English, but this varies between clinics and individuals, so we cannot guarantee a specific language in advance.",
  },
  {
    question: "Is Specialistdirekt an orthopedic clinic?",
    answer:
      "No. Specialistdirekt is an intermediary service, not an orthopedic clinic. We connect you with Dr. Masoud Sorkhabi, a specialist in orthopedics and spine surgery in Gothenburg.",
  },
  {
    question: "Who is responsible for my medical care?",
    answer:
      "The medical assessment, treatment and medical responsibility lie with Dr. Masoud Sorkhabi, who conducts the appointment. Specialistdirekt is not a healthcare provider and does not give medical advice.",
  },
];

const quickFacts = [
  { label: "Doctor", value: "Dr. Masoud Sorkhabi, specialist in orthopedics and spine surgery" },
  { label: "Visit", value: "In person in Gothenburg or digital across Sweden" },
  { label: "Price", value: "In person 2,000 SEK · digital video 1,000 SEK" },
  { label: "Specialty", value: "Orthopedics" },
  { label: "Experience", value: "More than 20 years of clinical experience" },
  { label: "Focus", value: "Back, neck, knee and nerve-related problems" },
  { label: "Patient type", value: "Self-paying" },
  { label: "Referral", value: "Not required" },
  { label: "Public rating", value: "4.9 out of 5 for Dr. Masoud Sorkhabi (checked 4 Aug 2026)" },
  { label: "Request", value: "Free and without obligation" },
  { label: "Role", value: "Specialistdirekt is an intermediary – not a healthcare provider" },
];

export default function EnglishOrthopedistGothenburgPage() {
  const specialty = getSpecialty("ortoped");
  const visual = specialty
    ? getCitySpecialtyVisual(specialty, "goteborg", "Gothenburg")
    : { src: "/real-medical/orthopedics.webp", alt: "Private orthopedic care in Gothenburg" };

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Private orthopedist in Gothenburg", path: PATH },
  ];

  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <p className="mt-6">
            <Link
              href={SV_PATH}
              hrefLang="sv"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
            >
              <span aria-hidden>🌐</span>
              På svenska: Privat ortoped i Göteborg
            </Link>
          </p>
          <div className="mt-4">
            <p className="internal-hero-kicker">Orthopedics · Gothenburg</p>
            <h1 className="internal-hero-title">Private orthopedist in Gothenburg</h1>
          </div>
          <p className="internal-hero-text">
            Looking for a private orthopedist in Gothenburg? You can book an appointment with Dr.
            Masoud Sorkhabi, a specialist in orthopedics and spine surgery with over 20 years of
            experience in orthopedics and surgery, or submit a free appointment request via
            Specialistdirekt. No referral is
            required for the current private pathway.
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
                The available specialist competence includes back, neck and knee problems,
                disc-related conditions, nerve-related pain, SI joint problems, sports and overuse
                injuries, and long-term musculoskeletal pain. Dr. Masoud Sorkhabi has more than 20
                years of clinical experience. Visits can be in person in Gothenburg (2,000 SEK) or a
                digital video visit from anywhere in Sweden (1,000 SEK). You receive information
                about a possible appointment and the current price before deciding whether to
                proceed.
              </p>
              <p className="mt-3">
                <strong>Specialistdirekt is an intermediary service, not a healthcare provider.</strong>{" "}
                Medical assessment and treatment are provided by the receiving clinic.
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
                    "joint or back pain together with high fever and a strongly affected general condition",
                  ].map((b) => (
                    <li key={b} className="flex gap-3 text-ink-700">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-600">
                  If in doubt, call <strong>1177</strong> for health care advice (in Swedish),
                  available around the clock.
                </p>
              </section>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Highly rated orthopedists in Gothenburg – how to compare
              </h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi had a public patient rating of 4.9 out of 5 when last checked
                on 4 August 2026. The rating applies to the doctor conducting the appointment, not
                to Specialistdirekt. Patient ratings do not guarantee a particular medical outcome.
                When comparing orthopedists, weigh several
                things at once: the score and how recent it is, specialist competence and
                experience, relevance to your symptoms, a transparent price, and a clear division of
                medical responsibility.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">
                Do I need a referral? Self-paying vs region-funded care
              </h2>
              <p className="mt-3">
                In Sweden, a <em>remiss</em> means a referral. As a self-paying (private) patient you
                generally do not need a referral to request an appointment with the connected
                orthopedic capacity in Gothenburg. Region-funded (public) care usually requires a
                referral from a health centre (vårdcentral), and if you want to use private health
                insurance, the insurer normally needs to approve the case first.
              </p>
              <p className="mt-3">
                Self-paying means you pay for the visit privately; the Swedish high-cost protection
                (högkostnadsskydd) does not normally apply to a private visit. Practical details such
                as payment and whether a Swedish personal number (personnummer) is needed are
                confirmed as part of the booking process with the clinic. You do not need to be a
                Swedish resident to send a request – visitors and newcomers are welcome to ask.
              </p>

              <h2 className="article-section-title mt-10 text-2xl font-bold">Price</h2>
              <p className="mt-3">
                Dr. Masoud Sorkhabi&apos;s prices are fixed and shown before you book: an in-person
                visit in Gothenburg is <strong>2,000 SEK</strong> and a digital video visit is{" "}
                <strong>1,000 SEK</strong>. A digital visit can be booked from anywhere in Sweden
                and suits a first assessment; some problems may need an in-person visit.
              </p>

              <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-ink-900">Book an appointment</h2>
                <p className="mt-2 text-ink-700">
                  Book a physical visit in Gothenburg (2,000 SEK) or a digital video visit from
                  anywhere in Sweden (1,000 SEK) directly in the calendar. You pay when booking, and
                  the amount is refunded if you cancel. The booking calendar is in Swedish.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Book with Dr. Masoud Sorkhabi
                </a>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink-900">Frequently asked questions</h2>
                <div className="mt-6">
                  <FaqList items={faqs} />
                </div>
              </section>

              <div className="soft-info-card mt-8 p-6 text-sm text-ink-600">
                <p>
                  Health information on this page is editorially produced by Specialistdirekt from
                  public primary sources, last checked 5 August 2026, including{" "}
                  <a
                    href="https://www.1177.se/en/other-languages/other-languages/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-700 hover:underline"
                  >
                    1177 (Swedish health care guide)
                  </a>
                  . It is general information and not a substitute for individual medical assessment.
                </p>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="form-panel p-6">
                <h2 className="text-lg font-bold text-ink-900">Book an appointment</h2>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Book with Dr. Masoud Sorkhabi
                </a>
                <p className="mt-2 text-xs text-ink-500">
                  Opens the booking calendar in a new tab (in Swedish). You pay when booking – the
                  amount is refunded if you cancel.
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
            description:
              "See a private orthopedist in Gothenburg without a referral. Self-paying patients can send a free appointment request via Specialistdirekt.",
            inLanguage: "en",
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Appointment request forwarding to a private orthopedist in Gothenburg",
            serviceType: "Healthcare intermediary",
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: "Gothenburg" },
            url: `${site.url}${PATH}`,
            description:
              "Specialistdirekt forwards your appointment request to connected orthopedic specialist capacity in Gothenburg. Specialistdirekt is an intermediary service, not a healthcare provider.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "SEK",
              description: "Free appointment-request forwarding.",
            },
          },
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
