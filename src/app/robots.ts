import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/audit/",
          "/p/",
          "/carte/",
          "/demo/",
          "/gestionstock/",
          "/noel-en-bande-organisee/pass/",
        ],
      },
    ],
    sitemap: "https://www.idkom.fr/sitemap.xml",
    host: "https://www.idkom.fr",
  };
}
