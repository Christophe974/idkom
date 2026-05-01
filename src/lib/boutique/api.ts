// ============================================================
// API client boutique
// Réutilise les conventions de src/lib/api.ts (wrapper {success,data,meta},
// timeout 10s, ISR 300s sur GET) en local pour pouvoir gérer les requêtes
// non cachées (POST checkout) et la pagination spécifique aux produits.
// ============================================================

import type {
  Categorie,
  Produit,
  ProduitDetail,
  Forme,
  Couleur,
  Police,
  CheckoutPayloadItem,
  CheckoutResponse,
  CustomerInfo,
  OrderConfirmation,
  PaginatedProduits,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    version?: string;
    timestamp?: string;
    pagination?: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
  error?: string;
  message?: string;
}

interface FetchBoutiqueOptions extends RequestInit {
  /** Surcharge le revalidate par défaut (300s sur GET). 0 ou false = no-store. */
  revalidate?: number | false;
}

async function fetchBoutique<T>(
  endpoint: string,
  options?: FetchBoutiqueOptions,
): Promise<{ data: T; meta?: ApiResponse<T>['meta'] }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const isMutation = options?.method && options.method !== 'GET';
  const { revalidate, ...rest } = options ?? {};

  let nextOptions: RequestInit = {};
  if (isMutation || revalidate === false || revalidate === 0) {
    nextOptions = { cache: 'no-store' };
  } else {
    const ttl = typeof revalidate === 'number' ? revalidate : 300;
    nextOptions = { next: { revalidate: ttl } } as RequestInit;
  }

  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...nextOptions,
      ...rest,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...rest.headers,
      },
    });

    clearTimeout(timeoutId);

    const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (!res.ok || !json) {
      const msg = json?.error || json?.message || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }

    if (!json.success) {
      throw new Error(json.error || json.message || 'API returned unsuccessful response');
    }

    return { data: json.data, meta: json.meta };
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === 'AbortError') {
      throw new Error('La requête a expiré. Réessaie dans un instant.');
    }
    throw error;
  }
}

// ============================================================
// Catégories
// ============================================================

export async function getBoutiqueCategories(): Promise<Categorie[]> {
  const { data } = await fetchBoutique<Categorie[]>('boutique/categories.php');
  return data;
}

export async function getBoutiqueCategory(slug: string): Promise<Categorie> {
  const { data } = await fetchBoutique<Categorie>(
    `boutique/categories.php?slug=${encodeURIComponent(slug)}`,
  );
  return data;
}

// ============================================================
// Produits
// ============================================================

export interface GetBoutiqueProductsOptions {
  category?: string;
  search?: string;
  page?: number;
  per_page?: number;
  featured?: boolean;
}

export async function getBoutiqueProducts(
  opts?: GetBoutiqueProductsOptions,
): Promise<PaginatedProduits> {
  const params = new URLSearchParams();
  if (opts?.category) params.set('category', opts.category);
  if (opts?.search) params.set('search', opts.search);
  if (opts?.page) params.set('page', String(opts.page));
  if (opts?.per_page) params.set('per_page', String(opts.per_page));
  if (opts?.featured) params.set('featured', '1');

  const query = params.toString() ? `?${params.toString()}` : '';
  const { data, meta } = await fetchBoutique<Produit[]>(`boutique/products.php${query}`);
  return { data, pagination: meta?.pagination };
}

export async function getBoutiqueProduct(slug: string): Promise<ProduitDetail> {
  const { data } = await fetchBoutique<ProduitDetail>(
    `boutique/products.php?slug=${encodeURIComponent(slug)}`,
  );
  return data;
}

// ============================================================
// Référentiel options (formes/couleurs/polices)
// ============================================================

export async function getBoutiqueFormes(): Promise<Forme[]> {
  const { data } = await fetchBoutique<Forme[]>('boutique/formes.php');
  return data;
}

export async function getBoutiqueCouleurs(): Promise<Couleur[]> {
  const { data } = await fetchBoutique<Couleur[]>('boutique/couleurs.php');
  return data;
}

export async function getBoutiquePolices(): Promise<Police[]> {
  const { data } = await fetchBoutique<Police[]>('boutique/polices.php');
  return data;
}

// ============================================================
// Checkout / Commande
// ============================================================

export async function createCheckoutSession(payload: {
  items: CheckoutPayloadItem[];
  customer: CustomerInfo;
}): Promise<CheckoutResponse> {
  const { data } = await fetchBoutique<CheckoutResponse>(
    'boutique/checkout.php',
    {
      method: 'POST',
      body: JSON.stringify(payload),
      revalidate: false,
    },
  );
  return data;
}

export async function getOrderConfirmation(
  orderNumber: string,
  email: string,
): Promise<OrderConfirmation> {
  const params = new URLSearchParams({
    order_number: orderNumber,
    email,
  });
  const { data } = await fetchBoutique<OrderConfirmation>(
    `boutique/orders.php?${params.toString()}`,
    { revalidate: false }, // page de confirmation = donnée fraîche
  );
  return data;
}
