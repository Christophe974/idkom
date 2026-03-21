import ScanPageClient from './ScanPageClient';

export const metadata = {
  title: 'Activez votre porte-clé | iDkom',
  description: 'Créez votre carte de visite digitale en quelques secondes',
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function Page({ params }: PageProps) {
  const { token } = await params;
  return <ScanPageClient token={token} />;
}
