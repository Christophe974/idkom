import type { Metadata } from 'next';
import AmbientBackground from '@/components/AmbientBackground';
import PropositionDemo from './PropositionDemo';

export const metadata: Metadata = {
  title: 'Proposition — Terre\'Happy',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <>
      <AmbientBackground />
      <PropositionDemo />
    </>
  );
}
