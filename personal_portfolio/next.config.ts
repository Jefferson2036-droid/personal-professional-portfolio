import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"],
  images: { unoptimized: true },
  trailingSlash: true,
};

if (process.env.NEXT_PUBLIC_BASE_PATH) {
  nextConfig.basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  nextConfig.assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH;
}

export default nextConfig;
