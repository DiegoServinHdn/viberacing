import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include recipe.md in the serverless function bundle so the
  // /api/buy route can read it from process.cwd() on Vercel.
  outputFileTracingIncludes: {
    "/api/buy": ["./recipe.md"],
  },
};

export default nextConfig;
