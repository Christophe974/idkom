import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.idkom.fr",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://api.iconify.design",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://api.idkom.fr https://*.googleusercontent.com https://lh3.googleusercontent.com",
              "connect-src 'self' https://api.idkom.fr https://api.iconify.design https://www.google-analytics.com https://www.googletagmanager.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/demo/:path*",
        destination: "https://ovh.idkom.fr/demo/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://ovh.idkom.fr/admin/:path*",
        permanent: false,
      },
      {
        source: "/gestionstock/:path*",
        destination: "https://ovh.idkom.fr/gestionstock/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
