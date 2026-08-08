import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nodemailer ska köras som vanligt Node-paket på servern (inte bundlas).
  serverExternalPackages: ["nodemailer"],
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
