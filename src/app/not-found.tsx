import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable | iDkom',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold bg-gradient-to-r from-[#ff2d55] to-[#7928ca] bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">
          Page introuvable
        </h1>
        <p className="mt-3 text-gray-400">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
