import { notFound } from 'next/navigation';
import { getBatByToken } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import BatClient from '@/components/BatClient';

export const revalidate = 0; // Pas de cache : tracking de vue à chaque chargement

interface PageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { token } = await params;
  const { preview } = await searchParams;
  try {
    const bat = await getBatByToken(token, preview);
    return {
      title: `${bat.title} | BAT iDkom`,
      description: `Bon a tirer pour ${bat.client.company}. Validez vos maquettes en ligne.`,
      robots: 'noindex, nofollow',
    };
  } catch {
    return { title: 'BAT introuvable | iDkom', robots: 'noindex, nofollow' };
  }
}

export default async function BatPublicPage({ params, searchParams }: PageProps) {
  const { token } = await params;
  const { preview } = await searchParams;

  let bat;
  try {
    bat = await getBatByToken(token, preview);
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
