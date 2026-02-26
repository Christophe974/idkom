import { notFound } from 'next/navigation';
import { getVCard } from '@/lib/api';
import VCardPageClient from './VCardPageClient';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const card = await getVCard(slug);
    const fullName = `${card.first_name} ${card.last_name}`;
    return {
      title: `${fullName} - ${card.company || 'iDkom'}`,
      description: card.bio || `Carte de visite digitale de ${fullName}`,
      openGraph: {
        title: `${fullName} - ${card.company || 'iDkom'}`,
        description: card.bio || `Carte de visite digitale de ${fullName}`,
        images: card.photo ? [{ url: card.photo }] : [],
      },
    };
  } catch {
    return {
      title: 'Carte de visite | iDkom',
      robots: { index: false, follow: false },
    };
  }
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
