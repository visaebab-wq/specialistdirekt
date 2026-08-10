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

const nextConfig: NextConfig = {
  // nodemailer ska köras som vanligt Node-paket på servern (inte bundlas).
  serverExternalPackages: ["nodemailer"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
