import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images-residence.summarecon.com", 
      "bandungoke.com", 
      "i.pinimg.com", 
      "placehold.co",
      "catalog-api.humicprototyping.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalog-api.humicprototyping.net",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
