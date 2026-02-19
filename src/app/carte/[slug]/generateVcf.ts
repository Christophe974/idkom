import type { VCardData } from '@/lib/api';

/**
 * Télécharge le .vcf via l'API PHP côté serveur.
 * Le serveur embarque la photo en base64 dans le fichier,
 * ce qui permet qu'elle s'enregistre dans le téléphone du contact.
 */
export function downloadVcf(card: VCardData): void {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';
  const downloadUrl = `${apiUrl}/vcards.php?action=download&slug=${encodeURIComponent(card.slug)}`;

  // Ouvrir le lien de téléchargement (le navigateur détecte le Content-Disposition: attachment)
  window.open(downloadUrl, '_blank');
}
