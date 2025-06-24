import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5152/api/:path*", // proxy do backendu
      },
    ];
  },
  images: {
    remotePatterns: [new URL("https://k84fneng6k.ufs.sh/**")],
  },
};

export default nextConfig;
