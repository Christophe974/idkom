import type { MetadataRoute } from "next";

const BASE_URL = "https://www.idkom.fr";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.idkom.fr";

async function fetchCityPages(): Promise<{ slug: string; updated_at: string }[]> {
  try {
    const res = await fetch(`${API_URL}/city-pages.php`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data)) return [];
    return data.data.map((item: { slug: string; updated_at: string }) => ({
      slug: item.slug,
      updated_at: item.updated_at,
    }));
  } catch {
    return [];
  }
}

async function fetchSlugs(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data.data || data;
    if (!Array.isArray(items)) return [];
    return items.map((item: { slug: string }) => item.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques — lastModified reflète la dernière mise à jour réelle du contenu
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-03-15"),
      changeFrequency: "weekly",
      priority: 1,
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
      lastModified: new Date("2026-03-10"),
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
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
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

  // Pages dynamiques
  const [projetSlugs, blogSlugs, animationSlugs, cityPages] = await Promise.all([
    fetchSlugs("projets.php"),
    fetchSlugs("blog.php"),
    fetchSlugs("animations.php"),
    fetchCityPages(),
  ]);

  const projetPages: MetadataRoute.Sitemap = projetSlugs.map((slug) => ({
    url: `${BASE_URL}/realisations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
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
      lastModified: new Date("2026-03-27"),
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
