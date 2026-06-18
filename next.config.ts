import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores lockfiles higher in the tree.
  turbopack: { root: __dirname },
  images: {
    // Placeholder photography until real project photos arrive (see sprints.md "Known gap").
    // Swap these for a CDN / local assets at launch.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
