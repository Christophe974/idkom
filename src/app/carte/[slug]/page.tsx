// This route is handled by middleware rewrite to /carte-view
// Keep this file only as a fallback / for local dev without middleware
import VCardLoader from './VCardLoader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateMetadata() {
  return {
    title: 'Carte de visite | iDkom',
    description: 'Carte de visite digitale iDkom',
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <VCardLoader slug={slug} />;
}
