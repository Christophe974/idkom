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
  goodies: number;
  lines_of_code: number;
}

export interface Social {
  linkedin: string;
  instagram: string;
  facebook: string;
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
  image?: { url: string; alt?: string };
  featured_image?: { url: string; alt?: string; width?: number; height?: number };
  gallery?: { url: string; alt?: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    image?: string;
    rating?: number;
  };
  meta_title?: string;
  meta_description?: string;
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
  image?: { url: string; alt?: string };
  featured_image?: { url: string; alt?: string; width?: number; height?: number };
  author_name?: string;
  views_count?: number;
  meta_title?: string;
  meta_description?: string;
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

// Fetch helper with error handling and timeout
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const json: ApiResponse<T> = await res.json();

    if (!json.success) {
      throw new Error('API returned unsuccessful response');
    }

    return json.data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`API fetch failed for ${endpoint}:`, error);
    throw error;
  }
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

// Navigation (dynamic navbar from CMS)
export interface NavItem {
  label: string;
  url: string;
}

export async function getNavigation(): Promise<NavItem[]> {
  return fetchApi<NavItem[]>('pages.php?nav=1');
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

// ============================================================
// Animations événementielles
// ============================================================
export interface AnimationStep {
  id: number;
  order: number;
  title: string;
  description: string;
  photos: { url: string; alt: string }[];
}

export interface Animation {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  featured_image?: { url: string; alt: string; width?: number; height?: number } | null;
  image?: { url: string; alt: string } | null;
  steps?: AnimationStep[];
  steps_count?: number;
  seo?: { title: string; description: string };
  is_featured: boolean;
  published_at: string;
}

export async function getAnimations(options?: {
  featured?: boolean;
  limit?: number;
  page?: number;
  per_page?: number;
}): Promise<Animation[]> {
  const params = new URLSearchParams();
  if (options?.featured) params.set('featured', '1');
  if (options?.limit) params.set('limit', options.limit.toString());
  if (options?.page) params.set('page', options.page.toString());
  if (options?.per_page) params.set('per_page', options.per_page.toString());

  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<Animation[]>(`animations.php${query}`);
}

export async function getAnimationBySlug(slug: string): Promise<Animation> {
  return fetchApi<Animation>(`animations.php?slug=${slug}`);
}

// ============================================================
// Booking / Rendez-vous
// ============================================================
export interface BookingSettings {
  enabled: boolean;
  hours_start: string;
  hours_end: string;
  duration: number;
  advance_hours: number;
  max_advance_days: number;
  blocked_dates: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DateAvailability {
  date: string;
  available: boolean;
  slots_count: number;
}

export interface BookingFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  date: string;
  time: string;
  website?: string;
}

export interface BookingResult {
  id: number;
  message: string;
  booking: {
    date: string;
    time: string;
    duration: number;
    meeting_link: string;
  };
}

export async function getBookingSettings(): Promise<BookingSettings> {
  return fetchApi<BookingSettings>('bookings.php?action=settings');
}

export async function getAvailableDates(month: string): Promise<{ month: string; dates: DateAvailability[] }> {
  return fetchApi<{ month: string; dates: DateAvailability[] }>(
    `bookings.php?action=available_dates&month=${month}`
  );
}

export async function getAvailableSlots(date: string): Promise<{ date: string; slots: TimeSlot[] }> {
  return fetchApi<{ date: string; slots: TimeSlot[] }>(
    `bookings.php?action=availability&date=${date}`
  );
}

export async function submitBooking(data: BookingFormData): Promise<BookingResult> {
  return fetchApi<BookingResult>('bookings.php?action=book', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================================
// Audit / Prospection Salon
// ============================================================
export interface AuditDetail {
  label: string;
  value: string;
  score: number;
  severity: 'good' | 'warning' | 'critical';
  description: string;
}

export interface AuditPublic {
  company_name: string;
  website_url: string;
  salon: {
    name: string | null;
    date: string | null;
    location: string | null;
  };
  score_total: number;
  scores: {
    performance: number;
    seo: number;
    mobile: number;
    security: number;
    accessibility: number;
    google: number;
  };
  results: {
    performance: AuditDetail[];
    seo: AuditDetail[];
    mobile: AuditDetail[];
    security: AuditDetail[];
    accessibility: AuditDetail[];
    google: AuditDetail[];
  };
  screenshot_url: string | null;
  stand_photo_url: string | null;
  stand_simulation_url: string | null;
  manager_notes: string | null;
  commercial: {
    first_name: string;
  };
  created_at: string;
}

export async function getAuditByToken(token: string): Promise<AuditPublic> {
  return fetchApi<AuditPublic>(`audits.php?action=public&token=${token}`);
}
