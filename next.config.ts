import type { NextConfig } from "next";

// Fully static marketing site: `next build` emits plain HTML/CSS/JS to /out,
// which is deployed to Cloudflare as static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
