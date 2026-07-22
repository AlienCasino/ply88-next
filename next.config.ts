import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sanch9.bet",
      },
      {
        protocol: "https",
        hostname: "**.sanch9.bet",
      },
      {
        protocol: "https",
        hostname: "**.saffa77.co.za",
      },
      {
        protocol: "https",
        hostname: "amaticgame.net",
      },
      {
        protocol: "https",
        hostname: "**.slot7hub.com",
      },
    ],
  },
};

export default nextConfig;
