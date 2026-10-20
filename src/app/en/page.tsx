import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

const PATH = "/en";
const TITLE = "Specialistdirekt in English";
const DESCRIPTION =
  "English information and direct booking for a private orthopedist in Gothenburg. Other Specialistdirekt services are available in Swedish.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "private specialist care Sweden",
    "private specialist doctor Sweden",
    "specialist without referral Sweden",
  ],
  alternates: {
    canonical: PATH,
    languages: { "sv-SE": "/", "en-SE": PATH, "x-default": "/" },
  },
  openGraph: {
    title: `${site.name} – private specialist care`,
    description: DESCRIPTION,
    url: PATH,
    locale: "en_SE",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function HomeEn() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="internal-hero-title">Specialistdirekt in English</h1>
          <p className="internal-hero-text">
            This English section provides information and direct booking for a private
            orthopedist in Gothenburg. The rest of the website, including other appointment
            request forms, is currently available in Swedish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/en/private-orthopedist-gothenburg"
              className="rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
            >
              Private orthopedist in Gothenburg
            </Link>
          </div>
          <p className="mt-6 text-sm text-sky-100/90">
            Not an emergency service – call 112 in an emergency. For healthcare advice, call 1177.
          </p>
        </div>
      </div>

      <div className="content-shell">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-16">
          <h2 className="text-2xl font-bold text-ink-900">More services in Swedish</h2>
          <p className="mt-4 text-ink-700">
            The full site is available in Swedish at{" "}
            <Link href="/" hrefLang="sv" className="font-medium text-brand-700 underline">
              specialistdirekt.se
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
