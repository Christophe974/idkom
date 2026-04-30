import { notFound } from 'next/navigation';
import { getBatByToken } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import BatClient from '@/components/BatClient';

export const revalidate = 0; // Pas de cache : tracking de vue à chaque chargement

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;
  try {
    const bat = await getBatByToken(token);
    return {
      title: `${bat.title} | BAT iDkom`,
      description: `Bon a tirer pour ${bat.client.company}. Validez vos maquettes en ligne.`,
      robots: 'noindex, nofollow',
    };
  } catch {
    return { title: 'BAT introuvable | iDkom', robots: 'noindex, nofollow' };
  }
}

export default async function BatPublicPage({ params }: PageProps) {
  const { token } = await params;

  let bat;
  try {
    bat = await getBatByToken(token);
  } catch {
    notFound();
  }

  return (
    <>
      <AmbientBackground />
      <BatClient bat={bat} />
    </>
  );
}
