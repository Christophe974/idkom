// Titres SEO : le layout racine applique le gabarit « %s | iDkom ». Un titre qui
// porte déjà le suffixe (saisi dans le CMS, hérité de l'ancien site ou écrit en dur)
// ressortait en « … | iDkom | iDkom » dans Google. On retire le suffixe AVANT le gabarit.
const BRAND_SUFFIX = /\s*[|\-–—]\s*iDkom(?:\s*[|\-–—]\s*L['’]Atelier Phygital)?\s*$/i;

/** Nettoie un titre de page (CMS ou en dur) de tout suffixe de marque. */
export function pageTitle(raw: string | null | undefined): string {
  return (raw ?? '').trim().replace(BRAND_SUFFIX, '').trim();
}
