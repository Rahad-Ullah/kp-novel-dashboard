import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["10.10.7.79", "via.placeholder.com"],
  images: {
    domains: ["via.placeholder.com"],
  },
};

export default nextConfig;
