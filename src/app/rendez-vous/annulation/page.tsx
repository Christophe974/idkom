import AnnulationClient from './AnnulationClient';

export const metadata = {
  title: 'Annulation de rendez-vous — iDkom',
  robots: { index: false, follow: false },
};

export default async function AnnulationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <AnnulationClient token={token ?? ''} />;
}
