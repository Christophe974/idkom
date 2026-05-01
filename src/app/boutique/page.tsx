import Link from 'next/link';
import { Icon } from '@iconify/react';
import {
  getBoutiqueCategories,
  getBoutiqueProducts,
} from '@/lib/boutique/api';
import CategorieCard from '@/components/boutique/CategorieCard';
import ProduitCard from '@/components/boutique/ProduitCard';

export const revalidate = 300;

export const metadata = {
  title: 'Porte-clés personnalisés NFC',
  description:
    'Crée ton porte-clé sur-mesure : choisis la forme, la couleur, la police, grave ton message. Option puce NFC programmable depuis ton téléphone.',
};

export default async function BoutiqueHomePage() {
  const [categories, productsResult] = await Promise.all([
    getBoutiqueCategories().catch(() => []),
    getBoutiqueProducts({ featured: true, per_page: 8 }).catch(() => ({
      data: [],
    })),
  ]);
  const featured = productsResult.data ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 md:p-14">
        <div
          className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ff2d55]/20 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#00d4ff]/20 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            Nouvelle boutique iDkom
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight">
            Crée ton porte-clé{' '}
            <span className="gradient-text">100% perso</span>
            <br />
            avec puce NFC.
          </h1>
          <p className="mt-5 text-lg text-zinc-400 max-w-2xl">
            Forme, couleur, police, gravure : tout est ajustable. Active la puce
            NFC pour transformer ton porte-clé en carte de visite digitale,
            programmable depuis ton téléphone.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] transition-all"
            >
              <Icon icon="solar:bag-3-linear" width={18} />
              Découvrir les catégories
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              Comment ça marche ?
            </Link>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section id="categories" className="mt-16 md:mt-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Choisis ta catégorie
            </h2>
            <p className="text-zinc-500 mt-2">
              Pour chien, chat, prénom, entreprise, mariage…
            </p>
          </div>
        </div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategorieCard key={cat.id} categorie={cat} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 text-center text-zinc-400">
            Les catégories arrivent très bientôt.
          </div>
        )}
      </section>

      {/* PRODUITS FEATURED */}
      {featured.length > 0 && (
        <section className="mt-16 md:mt-24">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Mis en avant
              </h2>
              <p className="text-zinc-500 mt-2">
                Nos best-sellers, prêts à être personnalisés.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProduitCard key={p.id} produit={p} />
            ))}
          </div>
        </section>
      )}

      {/* COMMENT ÇA MARCHE */}
      <section id="how" className="mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Trois étapes, c&apos;est tout
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: 'solar:hand-shake-linear',
              title: 'Choisis ton produit',
              text: 'Parcours les catégories et trouve le porte-clé qui te ressemble.',
              color: 'from-[#ff2d55] to-[#7928ca]',
            },
            {
              icon: 'solar:pen-new-square-linear',
              title: 'Personnalise',
              text: 'Forme, couleur, police, gravure. Tu vois le rendu en direct.',
              color: 'from-[#7928ca] to-[#00d4ff]',
            },
            {
              icon: 'solar:box-minimalistic-linear',
              title: 'Reçois & active',
              text: 'On le fabrique et l’expédie. Active la puce NFC depuis ton téléphone.',
              color: 'from-[#00d4ff] to-[#ff2d55]',
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color} text-white mb-4`}
              >
                <Icon icon={step.icon} width={24} />
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                Étape {i + 1}
              </div>
              <h3 className="mt-1 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
