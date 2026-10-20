import type { Metadata } from "next";

import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "404 – Specialistdirekt",
  alternates: { canonical: null },
  openGraph: {
    type: "website",
    title: "Sidan kunde inte hittas – Specialistdirekt",
    description: "Sidan du letar efter finns inte eller har flyttats.",
    siteName: "Specialistdirekt",
  },
  twitter: {
    card: "summary",
    title: "Sidan kunde inte hittas – Specialistdirekt",
    description: "Sidan du letar efter finns inte eller har flyttats.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return <NotFoundContent locale="sv" />;
}
