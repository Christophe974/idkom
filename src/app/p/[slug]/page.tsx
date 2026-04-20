import { notFound } from 'next/navigation';
import { getPropositionBySlug } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import PropositionPage from '@/components/PropositionPage';
import PropositionAccessCode from '@/components/PropositionAccessCode';
import PropositionExpired from '@/components/PropositionExpired';

// Cache ISR : la page reste servie depuis le cache Vercel edge pendant 5 min,
// puis est revalidée en arrière-plan. La proposition bouge rarement, le compteur
// de vues est géré server-side via le fetch cached.
export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ code?: string; preview?: string }>;
}

// Metadata : zéro appel API — on construit un titre générique (la page est
// noindex de toute façon, le title ne sert qu'à l'onglet navigateur).
// Gain : un round-trip OVH économisé par chargement.
export function generateMetadata() {
  return {
    title: 'Proposition commerciale | iDkom',
    robots: 'noindex, nofollow',
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { code, preview } = await searchParams;

  try {
    const prop = await getPropositionBySlug(slug, code, preview);
    return (
      <>
        <AmbientBackground />
        <PropositionPage proposition={prop} slug={slug} />
      </>
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    const message = err?.message || '';

    // Access code required
    if (message.includes('403') || message.includes('accès')) {
      return (
        <>
          <AmbientBackground />
          <PropositionAccessCode slug={slug} />
        </>
      );
    }

    // Expired
    if (message.includes('410') || message.includes('expiré')) {
      return (
        <>
          <AmbientBackground />
          <PropositionExpired />
        </>
      );
    }

    notFound();
  }
}
