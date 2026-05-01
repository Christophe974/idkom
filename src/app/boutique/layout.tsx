import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getBoutiqueCategories } from '@/lib/boutique/api';
import PanierIcon from '@/components/boutique/PanierIcon';

export const metadata: Metadata = {
  title: {
    default: 'Boutique iDkom — Porte-clés personnalisés NFC',
    template: '%s | Boutique iDkom',
  },
  description:
    "Porte-clés et médailles personnalisés avec puce NFC programmable depuis ton téléphone. Personnalisation forme, couleur, gravure, livraison rapide.",
  alternates: {
    canonical: 'https://www.idkom.fr/boutique',
  },
  openGraph: {
    title: 'Boutique iDkom — Porte-clés personnalisés NFC',
    description: 'Porte-clés et médailles personnalisés avec puce NFC programmable depuis ton téléphone.',
    url: 'https://www.idkom.fr/boutique',
    siteName: 'iDkom Boutique',
    locale: 'fr_FR',
    type: 'website',
  },
};

export const revalidate = 300;

export default async function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Charge catégories pour la nav header. Si l'API plante, on dégrade proprement.
  let categories: Awaited<ReturnType<typeof getBoutiqueCategories>> = [];
  try {
    categories = await getBoutiqueCategories();
  } catch {
    categories = [];
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/boutique"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <span className="text-xl font-bold text-white">
              iDkom
              <span className="ml-1 text-xs font-normal text-zinc-500 align-top">
                Boutique
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center overflow-x-auto">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/boutique/${cat.slug}`}
                prefetch={false}
                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/"
              prefetch={false}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors px-2"
            >
              <Icon icon="solar:arrow-left-linear" width={14} />
              Site iDkom
            </Link>
            <PanierIcon />
          </div>
        </div>

        {/* Nav catégories mobile */}
        {categories.length > 0 && (
          <nav className="md:hidden border-t border-white/5 overflow-x-auto">
            <div className="flex items-center gap-1 px-4 py-2 min-w-max">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/boutique/${cat.slug}`}
                  prefetch={false}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full whitespace-nowrap transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-white/10 mt-20 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div>
            © {new Date().getFullYear()} iDkom — L&apos;Atelier Phygital ·
            <Link href="/" className="ml-1 hover:text-white transition-colors">
              www.idkom.fr
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              prefetch={false}
              className="hover:text-white transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              prefetch={false}
              className="hover:text-white transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
