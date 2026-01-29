const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface Stats {
  years: number;
  projects: number;
  clients: number;
}

export interface Social {
  linkedin: string;
  instagram: string;
}

export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon?: string;
  count?: number;
}

export interface Projet {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  client_name: string;
  location: string;
  surface?: string;
  event_name?: string;
  project_date?: string;
  stats?: Record<string, number>;
  category?: Category;
  image?: string;
  gallery?: string[];
  testimonial_text?: string;
  testimonial_author?: string;
  testimonial_role?: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  reading_time: number;
  published_at: string;
  category?: { name: string; color: string };
  image?: string;
  author_name?: string;
  views_count?: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
}

export interface HomepageData {
  site: SiteSettings;
  stats: Stats;
  social: Social;
  colors: Colors;
  featured_projets: Projet[];
  testimonials: Testimonial[];
  latest_blog: BlogArticle;
  categories: Category[];
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  target: '_self' | '_blank';
  icon?: string;
  children?: MenuItem[];
}

export interface MenuData {
  header: MenuItem[];
  footer_services: MenuItem[];
  footer_legal: MenuItem[];
}

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    version: string;
    timestamp: string;
    pagination?: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}

// Fetch helper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error('API returned unsuccessful response');
  }

  return json.data;
}

// Homepage
export async function getHomepageData(): Promise<HomepageData> {
  return fetchApi<HomepageData>('homepage.php');
}

// Projets
export async function getProjets(options?: {
  featured?: boolean;
  category?: string;
  limit?: number;
  page?: number;
  per_page?: number;
}): Promise<Projet[]> {
  const params = new URLSearchParams();
  if (options?.featured) params.set('featured', '1');
  if (options?.category) params.set('category', options.category);
  if (options?.limit) params.set('limit', options.limit.toString());
  if (options?.page) params.set('page', options.page.toString());
  if (options?.per_page) params.set('per_page', options.per_page.toString());

  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<Projet[]>(`projets.php${query}`);
}

export async function getProjetBySlug(slug: string): Promise<Projet> {
  return fetchApi<Projet>(`projets.php?slug=${slug}`);
}

// Blog
export async function getBlogArticles(options?: {
  featured?: boolean;
  category?: string;
  limit?: number;
  page?: number;
  per_page?: number;
}): Promise<BlogArticle[]> {
  const params = new URLSearchParams();
  if (options?.featured) params.set('featured', '1');
  if (options?.category) params.set('category', options.category);
  if (options?.limit) params.set('limit', options.limit.toString());
  if (options?.page) params.set('page', options.page.toString());
  if (options?.per_page) params.set('per_page', options.per_page.toString());

  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<BlogArticle[]>(`blog.php${query}`);
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle> {
  return fetchApi<BlogArticle>(`blog.php?slug=${slug}`);
}

// Menus
export async function getMenus(): Promise<MenuData> {
  return fetchApi<MenuData>('menus.php');
}

// Settings
export async function getSettings(group?: string): Promise<Record<string, unknown>> {
  const query = group ? `?group=${group}` : '';
  return fetchApi<Record<string, unknown>>(`settings.php${query}`);
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  source?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<{ message: string; id: number }> {
  return fetchApi<{ message: string; id: number }>('contact.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
