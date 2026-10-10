import type { MetadataRoute } from "next";
import { getAnimations, getBlogArticles, getCityPages, getProjets } from "@/lib/api";

const BASE_URL = "https://www.idkom.fr";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques — lastModified reflète la dernière mise à jour réelle du contenu
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/seminaire-soiree-entreprise`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/noel-en-bande-organisee`,
      lastModified: new Date("2026-09-21"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mariage`,
      lastModified: new Date("2026-10-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/atelier`,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/savoir-faire`,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/animations`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date("2026-03-25"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/catalogue`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/bematrix`,
      lastModified: new Date("2026-03-28"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/location-stand-montbeliard-belfort`,
      lastModified: new Date("2026-09-04"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/porte-cles-nfc`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // /boutique retiré : redirigé en 301 vers boutique.idkom.fr (voir next.config.ts).
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/rendez-vous`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date("2025-12-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: new Date("2025-12-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Pages dynamiques : tout est lu depuis Supabase (source réelle). Les anciens endpoints
  // PHP (projets.php, animations.php, city-pages.php) ne voyaient pas les contenus créés
  // depuis la migration : la Ruée vers l'Or, le blind test, l'AG au Kinépolis… manquaient.
  const [projets, blogArticles, animations, cityPages] = await Promise.all([
    getProjets().catch((error) => {
      console.error('sitemap: réalisations indisponibles', error);
      return [];
    }),
    getBlogArticles().catch((error) => {
      console.error('sitemap: articles de blog indisponibles', error);
      return [];
    }),
    getAnimations().catch((error) => {
      console.error('sitemap: animations indisponibles', error);
      return [];
    }),
    getCityPages(),
  ]);
  const projetSlugs = projets.map((p) => p.slug).filter(Boolean);
  const animationSlugs = animations.map((a) => a.slug).filter(Boolean);

  const projetPages: MetadataRoute.Sitemap = projetSlugs.map((slug) => ({
    url: `${BASE_URL}/realisations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.published_at ? new Date(article.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const animationPages: MetadataRoute.Sitemap = animationSlugs.map((slug) => ({
    url: `${BASE_URL}/animations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Page index des villes
  const cityIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/animations-evenementielles`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Pages villes individuelles
  const cityDetailPages: MetadataRoute.Sitemap = cityPages.map((city) => ({
    url: `${BASE_URL}/animations-evenementielles/${city.slug}`,
    lastModified: city.updated_at ? new Date(city.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projetPages, ...blogPages, ...animationPages, ...cityIndexPage, ...cityDetailPages];
}
