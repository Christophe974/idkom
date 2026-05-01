// ============================================================
// Types boutique iDkom
// ============================================================

export interface Categorie {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  position: number;
  is_active: boolean;
  products_count?: number;
}

export interface Produit {
  id: number;
  category_id: number;
  sku: string;
  slug: string;
  name: string;
  description: string | null;
  base_price: number;
  image: string | null;
  has_nfc_option: boolean;
  nfc_extra_price: number;
  weight_grams: number;
  position: number;
  is_active: boolean;
  is_featured: boolean;
  category?: { slug: string; name: string };
  images_count?: number;
}

export interface ProduitImage {
  id: number;
  url: string;
  alt: string | null;
  position: number;
}

export interface Forme {
  id: number;
  slug: string;
  name: string;
  svg_template: string;
  preview_image: string | null;
  position: number;
  is_active: boolean;
}

export interface Couleur {
  id: number;
  slug: string;
  name: string;
  hex_code: string;
  image_swatch: string | null;
  extra_price: number;
  position: number;
  is_active: boolean;
}

export interface Police {
  id: number;
  slug: string;
  name: string;
  font_family: string;
  font_url: string | null;
  preview_image: string | null;
  position: number;
  is_active: boolean;
}

export interface ProduitDetail extends Produit {
  category: { slug: string; name: string };
  images: ProduitImage[];
  formes: Forme[];
  couleurs: Couleur[];
  polices: Police[];
}

export interface CartItem {
  // Hash unique de la config (pour merger les items identiques)
  id: string;
  produit_slug: string;
  produit_name: string;
  produit_image: string | null;
  forme_slug: string;
  forme_name: string;
  forme_template: string;
  couleur_slug: string;
  couleur_name: string;
  couleur_hex: string;
  police_slug: string;
  police_name: string;
  police_font_family: string;
  police_font_url: string | null;
  gravure_text: string;
  has_nfc: boolean;
  quantity: number;
  // unit_price calculé côté client pour preview, recalculé serveur au checkout
  unit_price: number;
  category_slug: string;
}

export interface CustomerInfo {
  email: string;
  name: string;
  phone?: string;
  address_line1: string;
  address_line2?: string;
  zip: string;
  city: string;
  country: string;
}

export interface CheckoutPayloadItem {
  produit_slug: string;
  forme_slug: string;
  couleur_slug: string;
  police_slug: string;
  gravure_text: string;
  has_nfc: boolean;
  quantity: number;
}

export interface CheckoutResponse {
  order_number: string;
  session_id: string;
  url: string;
}

export interface OrderConfirmationItem {
  produit_name: string;
  forme_name: string | null;
  couleur_name: string | null;
  police_name: string | null;
  gravure_text: string | null;
  has_nfc: boolean;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderConfirmation {
  order_number: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_zip: string;
  shipping_city: string;
  shipping_country: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  currency: string;
  paid_at: string | null;
  created_at: string;
  items: OrderConfirmationItem[];
}

export interface BoutiqueSettings {
  boutique_active?: string | number | boolean;
  shipping_fee?: string | number;
  shipping_free_threshold?: string | number;
  currency?: string;
}

// Pagination meta (selon convention idkom-cms jsonPaginated)
export interface PaginatedProduits {
  data: Produit[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}
