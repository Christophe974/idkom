import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/demo/:path*",
        destination: "https://ovh.idkom.fr/demo/:path*",
      },
      {
        source: "/gestionstock/:path*",
        destination: "https://ovh.idkom.fr/gestionstock/:path*",
      },
    ];
  },
};

export default nextConfig;
