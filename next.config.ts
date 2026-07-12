import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nodemailer ska köras som vanligt Node-paket på servern (inte bundlas).
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
