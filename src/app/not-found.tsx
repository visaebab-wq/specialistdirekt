import type { Metadata } from "next";

import { LocalizedNotFound } from "@/components/LocaleShell";

export const metadata: Metadata = {
  title: "404 – Specialistdirekt",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return <LocalizedNotFound />;
}
