import { Metadata } from 'next';
import GravureClient from './GravureClient';

export const metadata: Metadata = {
  title: 'Personnalisez votre planche | iDkom',
  description: 'Choisissez le texte à graver sur votre planche apéro personnalisée.',
  robots: { index: false, follow: false },
};

export default async function GravurePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return <GravureClient code={code} />;
}
