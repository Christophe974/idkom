import VCardLoader from './VCardLoader';

// Force static generation - no serverless function, served from CDN
export const dynamic = 'force-static';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${name} | Carte de visite`,
    description: `Carte de visite digitale de ${name}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <VCardLoader slug={slug} />;
}
