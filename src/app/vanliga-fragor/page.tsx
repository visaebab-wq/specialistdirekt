import Link from "next/link";
import { faqs } from "@/lib/faq";
import { FaqList } from "@/components/FaqList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { PageVisual } from "@/components/PageVisual";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Vanliga frågor om Specialistdirekt",
  description:
    "Svar på vanliga frågor om Specialistdirekt – hur tjänsten fungerar, vad det kostar, hur vi hanterar dina uppgifter och mer.",
  path: "/vanliga-fragor",
});

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Vanliga frågor", path: "/vanliga-fragor" },
];

const visual = {
  src: "/page-visuals/static-vanliga-fragor.webp",
  alt: "Vanliga frågor om specialistvård - realistisk vårdbild med människa",
};

export default function FaqPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Vanliga frågor</h1>
          <p className="internal-hero-text">
            Här hittar du svar på det som folk oftast undrar. Hittar du inte svaret? Hör av dig så
            hjälper vi dig.
          </p>
          <PageVisual visual={visual} className="mt-10" priority />
        </div>
      </div>

      <div className="content-shell">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FaqList items={faqs} />

        <div className="soft-info-card mt-10 p-6 text-center">
          <p className="text-ink-700">Har du en annan fråga?</p>
          <Link
            href="/kontakt"
            className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Kontakta oss
          </Link>
        </div>
      </section>
      </div>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
