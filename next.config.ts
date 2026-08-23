import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["127.0.2.2", "localhost"]
  }
};

export default nextConfig;
