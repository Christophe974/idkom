import type { VCardData } from '@/lib/api';

/**
 * Télécharge le .vcf via l'API PHP côté serveur.
 * Sur iOS : navigation directe pour que Safari propose "Ajouter aux contacts"
 * Sur desktop/Android : téléchargement classique via lien temporaire
 */
export function downloadVcf(card: VCardData): void {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';
  const downloadUrl = `${apiUrl}/vcards.php?action=download&slug=${encodeURIComponent(card.slug)}`;

  // Navigation directe — iOS Safari détecte le .vcf et propose "Ajouter aux contacts"
  window.location.href = downloadUrl;
}
