import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      }
    ]
  },
  experimental: {
    turbopackFileSystemCacheForDev: true
  }
};

export default nextConfig;
