import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
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
      // --- Anciennes URLs legacy → nouvelles pages ---
      // Pages ?page=xxx (ancien site)
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "com" }],
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "contact" }],
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "stands" }],
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "event" }],
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "blog" }],
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page", value: "gallery" }],
        destination: "/realisations",
        permanent: true,
      },
      // Anciennes pages statiques
      {
        source: "/contacts",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contacts/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/team/:path*",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/stands",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/stands/:path*",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/goodies",
        destination: "/animations",
        permanent: true,
      },
      {
        source: "/goodies/:path*",
        destination: "/animations",
        permanent: true,
      },
      {
        source: "/travaux",
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/travaux/:path*",
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/marketing",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/marketing/:path*",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/reseaux",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/reseaux/:path*",
        destination: "/savoir-faire",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/politique-de-confidentialite",
        destination: "/confidentialite",
        permanent: true,
      },
      {
        source: "/politique-de-confidentialite/:path*",
        destination: "/confidentialite",
        permanent: true,
      },
      // Anciennes pages jeu/animation
      {
        source: "/jeu/:path*",
        destination: "/animations",
        permanent: true,
      },
      // Anciennes pages clients
      {
        source: "/careco/:path*",
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/mojito-co/:path*",
        destination: "/realisations",
        permanent: true,
      },
      {
        source: "/credit-mutuel/:path*",
        destination: "/realisations",
        permanent: true,
      },
      // index.html / index.php legacy
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/homepage-1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/homepage-1/:path*",
        destination: "/",
        permanent: true,
      },
      // --- Redirects infrastructure ---
      {
        source: "/admin/:path*",
        destination: "https://ovh.idkom.fr/admin/:path*",
        permanent: true,
      },
      {
        source: "/gestionstock/:path*",
        destination: "https://ovh.idkom.fr/gestionstock/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
