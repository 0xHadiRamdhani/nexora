import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only trusts `localhost` by default; without this, opening
  // http://127.0.0.1:8080 blocks the JS bundles and the page never hydrates.
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
