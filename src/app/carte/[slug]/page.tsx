import VCardLoader from './VCardLoader';

// Static metadata - no API call
export const metadata = {
  title: 'Carte de visite digitale | iDkom',
  description: 'Carte de visite digitale NFC par iDkom',
};

// Force static generation - served from CDN, zero serverless
export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <VCardLoader slug={slug} />;
}
