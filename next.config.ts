import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "www.3wisemen.co.nz"],
    // You might want to add other common image hosting domains:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.gstatic.com",
      },
      // Add any other domains you might use for product images
    ],
  },
};

export default nextConfig;
