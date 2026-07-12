import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/faq";
import { FaqList } from "@/components/FaqList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Vanliga frågor",
  description:
    "Svar på vanliga frågor om Specialistdirekt – hur förmedlingen fungerar, vad det kostar, hur vi hanterar dina uppgifter och mer.",
  alternates: { canonical: "/vanliga-fragor" },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Vanliga frågor", path: "/vanliga-fragor" },
];

export default function FaqPage() {
  return (
    <>
      <div className="bg-section">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900">
            Vanliga frågor
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Här hittar du svar på det som folk oftast undrar. Hittar du inte svaret? Hör av dig så
            hjälper vi dig.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FaqList items={faqs} />

        <div className="mt-10 rounded-2xl border border-ink-200 bg-ink-50 p-6 text-center">
          <p className="text-ink-700">Har du en annan fråga?</p>
          <Link
            href="/kontakt"
            className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Kontakta oss
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
