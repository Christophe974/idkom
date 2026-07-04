import Link from 'next/link';
import { Icon } from '@iconify/react';
import { ArrowRightIcon } from '@/components/Icons';
import { getHomepageData, getCityPages } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import BentoGrid from '@/components/BentoGrid';
import ProjetCard from '@/components/ProjetCard';
import CTASection from '@/components/CTASection';

export const revalidate = 300; // Revalidate every 5 minutes

const faqs = [
  {
    q: 'Où intervient iDkom ?',
    a: 'Basés à Montbéliard, nous réalisons des stands et des animations événementielles en Franche-Comté, dans le Grand Est et partout en France.',
  },
  {
    q: 'Quels types de stands proposez-vous ?',
    a: 'Des stands modulaires BeMatrix sur-mesure, du petit stand au grand espace, réutilisables salon après salon et entièrement personnalisables.',
  },
  {
    q: 'Quels sont les délais pour un stand ou une animation ?',
    a: 'Selon le projet, comptez généralement de 3 à 6 semaines. Pour un salon daté, contactez-nous au plus tôt afin de sécuriser la production et le montage.',
  },
  {
    q: 'Proposez-vous des animations digitales ?',
    a: 'Oui : photobooth IA, bar à goodies connecté, kermesse 2.0, bornes et expériences interactives entièrement brandées à vos couleurs.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Décrivez-nous votre projet via notre formulaire de contact ou par téléphone : nous revenons vers vous rapidement avec une proposition adaptée.',
  },
];

export default async function Home() {
  const [data, cities] = await Promise.all([
    getHomepageData(),
    getCityPages(),
  ]);

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Bento Grid Hero */}
        <BentoGrid data={data} />

        {/* Section Projets */}
        <section id="projets" className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nos réalisations événementielles</h2>
              <p className="text-zinc-500 mt-2">Stands BeMatrix, solutions digitales et animations — des projets qui font la différence</p>
            </div>
            <Link
              prefetch={false}
              href="/realisations"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              Voir tous les projets
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.featured_projets.slice(0, 3).map((projet, index) => (
              <ProjetCard key={projet.id} projet={projet} index={index} />
            ))}
          </div>
        </section>

        {/* Section Boutique en ligne */}
        <section id="boutique" className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 md:p-12">
            {/* halos décoratifs */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff2d55]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#7928ca]/20 blur-3xl" />

            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#ff2d55]">
                  <Icon icon="solar:bag-smile-bold" width={14} /> Nouveau · Boutique en ligne
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">La boutique iDkom</h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Des <strong className="text-zinc-200">porte-clés NFC personnalisés</strong>, imprimés en 3D en France :
                  au nom de votre cheval (carnet de bord connecté) ou aux couleurs de votre entreprise
                  (carte de visite connectée). Un scan, et toutes vos infos apparaissent.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><Icon icon="solar:hand-heart-linear" className="text-[#ff2d55]" width={17} /> Fait main en France</li>
                  <li className="flex items-center gap-2"><Icon icon="solar:tag-horizontal-linear" className="text-[#ff2d55]" width={17} /> Puce NFC incluse</li>
                  <li className="flex items-center gap-2"><Icon icon="solar:lock-keyhole-minimalistic-linear" className="text-[#ff2d55]" width={17} /> Paiement sécurisé</li>
                  <li className="flex items-center gap-2"><Icon icon="solar:box-linear" className="text-[#ff2d55]" width={17} /> Livraison en France</li>
                </ul>
                <a
                  href="https://boutique.idkom.fr"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  Découvrir la boutique
                  <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>

              {/* Deux univers */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a href="https://boutique.idkom.fr" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#ff2d55]/40 hover:bg-white/[0.06]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff2d55]/15 text-[#ff2d55]"><Icon icon="solar:magic-stick-3-bold" width={22} /></span>
                  <h3 className="mt-3 font-semibold text-white">Porte-clé cheval</h3>
                  <p className="mt-1 text-sm text-zinc-500">Au nom de votre cheval, sa fiche connectée : santé, contacts, journal de bord.</p>
                </a>
                <a href="https://boutique.idkom.fr" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#7928ca]/40 hover:bg-white/[0.06]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7928ca]/15 text-[#a855f7]"><Icon icon="solar:buildings-2-bold" width={22} /></span>
                  <h3 className="mt-3 font-semibold text-white">Porte-clé entreprise</h3>
                  <p className="mt-1 text-sm text-zinc-500">Votre logo, une puce NFC : carte de visite connectée que l&apos;on scanne d&apos;un geste.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Animations par ville */}
        {cities.length > 0 && (
          <section className="mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Animations événementielles près de chez vous</h2>
                <p className="text-zinc-500 mt-2">Bar goodies, photobooth IA, kermesse 2.0 — nos solutions digitales partout en France</p>
              </div>
              <Link
                prefetch={false}
                href="/animations-evenementielles"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                Toutes nos villes
                <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {cities.slice(0, 6).map((city) => (
                <Link
                  key={city.slug}
                  href={`/animations-evenementielles/${city.slug}`}
                  prefetch={false}
                  className="group p-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ff2d55]/30 transition-all text-center"
                >
                  <Icon icon="solar:map-point-linear" className="text-[#ff2d55] mx-auto mb-2" width={24} />
                  <p className="text-white font-medium text-sm group-hover:text-[#ff2d55] transition-colors">{city.city_name}</p>
                  <p className="text-zinc-600 text-xs">{city.department_code}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Questions fréquentes</h2>
            <p className="text-zinc-500 mt-2">Stands, animations, délais, zone d&apos;intervention — l&apos;essentiel en quelques réponses</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-zinc-900/50 border border-white/10 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-white font-medium">
                  {f.q}
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width={20}
                    className="text-zinc-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="text-zinc-400 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <CTASection phone={data.site.phone} />
      </main>

      {/* WebSite Schema — aide Google à afficher les sitelinks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'iDkom',
            alternateName: 'iDkom — Agence Événementielle & Solutions Digitales',
            url: 'https://www.idkom.fr',
          }),
        }}
      />

      {/* ItemList Schema — pages principales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Services iDkom',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Stands BeMatrix', url: 'https://www.idkom.fr/bematrix' },
              { '@type': 'ListItem', position: 2, name: 'Animations Événementielles', url: 'https://www.idkom.fr/animations' },
              { '@type': 'ListItem', position: 3, name: 'Réalisations', url: 'https://www.idkom.fr/realisations' },
              { '@type': 'ListItem', position: 4, name: 'Savoir-faire', url: 'https://www.idkom.fr/savoir-faire' },
              { '@type': 'ListItem', position: 5, name: 'Catalogue BeMatrix', url: 'https://www.idkom.fr/catalogue' },
              { '@type': 'ListItem', position: 6, name: 'Contact', url: 'https://www.idkom.fr/contact' },
            ],
          }),
        }}
      />

      {/* FAQPage Schema — réponses citables par Google et les IA
          (LocalBusiness/Organization déjà déclarés dans layout.tsx) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
