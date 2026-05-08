import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // We are hard-coding the path to match your repo name exactly
  basePath: "/personal-professional-portfolio",
  assetPrefix: "/personal-professional-portfolio",
  images: { 
    unoptimized: true 
  },
  trailingSlash: true,
};

export default nextConfig;