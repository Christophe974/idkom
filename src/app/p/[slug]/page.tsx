import { notFound } from 'next/navigation';
import { getPropositionBySlug } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import PropositionPage from '@/components/PropositionPage';
import PropositionAccessCode from '@/components/PropositionAccessCode';
import PropositionExpired from '@/components/PropositionExpired';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ code?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const prop = await getPropositionBySlug(slug);
    return {
      title: `${prop.title} | ${prop.reseller.company}`,
      robots: 'noindex, nofollow',
    };
  } catch {
    return {
      title: 'Proposition',
      robots: 'noindex, nofollow',
    };
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { code } = await searchParams;

  try {
    const prop = await getPropositionBySlug(slug, code);
    return (
      <>
        <AmbientBackground />
        <PropositionPage proposition={prop} slug={slug} />
      </>
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    const message = err?.message || '';

    // Access code required
    if (message.includes('403') || message.includes('accès')) {
      return (
        <>
          <AmbientBackground />
          <PropositionAccessCode slug={slug} />
        </>
      );
    }

    // Expired
    if (message.includes('410') || message.includes('expiré')) {
      return (
        <>
          <AmbientBackground />
          <PropositionExpired />
        </>
      );
    }

    notFound();
  }
}
