import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // allows local /uploads and /img paths with spaces
  },
};

export default nextConfig;
