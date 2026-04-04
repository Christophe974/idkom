import { notFound } from 'next/navigation';
import { getVCard } from '@/lib/api';
import VCardPageClient from './VCardPageClient';

// Cache for 1 hour, serve stale while revalidating
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Static metadata from slug — no API call, no delay
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${name} - Carte de visite | iDkom`,
    description: `Carte de visite digitale de ${name}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const card = await getVCard(slug);
    return <VCardPageClient card={card} />;
  } catch {
    notFound();
  }
}
