import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    // Keep the existing local-only Vite variable names working during migration.
    NEXT_PUBLIC_TMDB_API_BASE_URL: process.env.VITE_TMDB_API_BASE_URL,
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: process.env.VITE_TMDB_ACCESS_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.VITE_API_BASE_URL,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
