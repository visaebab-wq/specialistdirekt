import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// metadataBase gör att alla relativa OG-/canonical-URL:er blir absoluta.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Kort startsidetitel (≤60 tecken så Google inte kapar den).
    default: "Specialistdirekt – Hitta rätt specialistläkare",
    // Ingen varumärkessuffix – sidtitlarna leder redan med sökord och håller
    // sig under Googles ~60-teckengräns (varumärket finns i og:site_name).
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  generator: "Next.js",
  keywords: [
    "specialistläkare",
    "hitta specialist",
    "privat specialist",
    "boka specialistläkare",
    "specialistvård Sverige",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
  // Verifiering för sökmotorer. Google via env (GOOGLE_SITE_VERIFICATION).
  // Bing via msvalidate.01 – publik token, renderas som <meta> i <head>.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    other: { "msvalidate.01": "728830EC2862A9E1E45CD2285B684A25" },
  },
};

// Färgtema för webbläsarens UI + korrekt mobilskalning.
export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-ink-800">
        {/* Hoppa-till-innehåll för tangentbords- och skärmläsaranvändare. */}
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Hoppa till innehåll
        </a>
        <Header />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Global strukturerad data – beskriver organisationen för Google & AI. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
