import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
       // https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446
      },
    ],
  },
};

export default nextConfig;
