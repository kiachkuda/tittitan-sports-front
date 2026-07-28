import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jwvu9g30koikzzat.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
