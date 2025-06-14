import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://k84fneng6k.ufs.sh/**")],
  },
};

export default nextConfig;
