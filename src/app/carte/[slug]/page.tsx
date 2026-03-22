import type { Metadata } from 'next';
import { getVCard } from '@/lib/api';
import VCardPageClient from './VCardPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const card = await getVCard(slug);
    const fullName = `${card.first_name} ${card.last_name}`;
    return {
      title: `${fullName} - ${card.company || 'iDkom'}`,
      description: `Carte de visite digitale de ${fullName}${card.job_title ? ` - ${card.job_title}` : ''}`,
    };
  } catch {
    return {
      title: 'Carte de visite digitale | iDkom',
      description: 'Carte de visite digitale NFC par iDkom',
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const card = await getVCard(slug);
    return <VCardPageClient card={card} />;
  } catch {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-white text-lg font-medium">Carte introuvable</p>
          <p className="text-zinc-500 text-sm mt-2">Cette carte de visite n&apos;existe pas ou a été désactivée.</p>
        </div>
      </div>
    );
  }
}
