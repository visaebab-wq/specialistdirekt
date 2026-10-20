import type { NextConfig } from "next";

// Säkerhetsheaders för hela sajten. Defensivt djup mot clickjacking, MIME-
// sniffning och referrer-läckage. (CSP utelämnas medvetet – kräver noggrann
// tuning mot inline-script/analytics/JSON-LD och läggs bäst till separat.)
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

// Skärpta headers för de vyer som bär en bokningsnyckel i URL:en
// (/boka-tid/bekrafta och /boka-tid/avboka).
//
// Referrer-Policy: no-referrer – annars följer hela adressen, inklusive id och
// sig, med som Referer när besökaren klickar vidare, och hamnar då i nästa sidas
// page_referrer. Sajtens vanliga policy (strict-origin-when-cross-origin) skickar
// full sökväg till samma origin och räcker alltså inte här.
//
// Cache-Control: private, no-store – svaret innehåller en enskild patients
// boknings- och tidsuppgifter och får inte ligga kvar i delad cache, proxy eller
// i webbläsarens historik-cache (bakåtknappen).
//
// Detta är ett KOMPLEMENT. Det stoppar inte JavaScript från att läsa
// window.location – det gör att taggen inte renderas (se Analytics.tsx).
const sensitiveHeaders = [
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
];

const nextConfig: NextConfig = {
  // nodemailer ska köras som vanligt Node-paket på servern (inte bundlas).
  serverExternalPackages: ["nodemailer"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Efter den generella regeln: samma nyckel (Referrer-Policy) skrivs över
      // för de känsliga vägarna.
      { source: "/boka-tid/bekrafta", headers: sensitiveHeaders },
      { source: "/boka-tid/bekrafta/:path*", headers: sensitiveHeaders },
      { source: "/boka-tid/avboka", headers: sensitiveHeaders },
      { source: "/boka-tid/avboka/:path*", headers: sensitiveHeaders },
    ];
  },
  async redirects() {
    return [
      // Konsoliderat till smärt-clustret (undvik kannibalisering av "smärta Göteborg").
      {
        source: "/smartbehandling/goteborg",
        destination: "/specialiteter/smartlakare/goteborg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
