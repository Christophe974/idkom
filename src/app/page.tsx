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
    a: "Notre atelier est à Brevilliers, entre Belfort et Montbéliard. Nous animons des séminaires et des soirées d'entreprise à Montbéliard, Belfort, Besançon, Mulhouse, dans toute la Franche-Comté et l'Alsace, et partout en France quand l'événement l'exige.",
  },
  {
    q: "Quelles animations proposez-vous pour un séminaire ou une soirée d'entreprise ?",
    a: "Soirées à thème (western, casino, années 90), team building en équipes mélangées, blind test géant, quiz en direct sur grand écran, escape game écrit pour votre entreprise, bar à goodies où chacun repart avec un cadeau fabriqué sur place.",
  },
  {
    q: 'Animez-vous les assemblées générales ?',
    a: "Oui : quiz en direct sur téléphone, collaborateurs filmés pour jouer les réponses, vote en salle, bar à goodies dans le hall. Nous l'avons fait pour plusieurs caisses du Crédit Mutuel, à Audincourt et au Kinépolis de Belfort.",
  },
  {
    q: 'Quels sont les délais ?',
    a: "Trois à six semaines pour une soirée ou un stand sur mesure, davantage pour les fêtes de fin d'année. Pour une date déjà fixée, parlez-nous-en au plus tôt.",
  },
  {
    q: 'Faites-vous aussi les stands de salon ?',
    a: 'Oui, des stands modulaires BeMatrix livrés et montés, du 9 m² au grand espace, à Montbéliard, Belfort et partout en France.',
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

        {/* Section Séminaires & soirées d'entreprise */}
        <section id="seminaires" className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Séminaires et soirées d&apos;entreprise</h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Deux jours de formation, puis un saloon à la place de la salle de réunion : roulette, duels,
                  blind test, et des enchères à minuit. Soirées à thème, team building, assemblées générales :
                  on écrit le déroulé, on apporte les écrans, le son et les jeux, et on anime jusqu&apos;au bout.
                </p>
                <Link
                  prefetch={false}
                  href="/seminaire-soiree-entreprise"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  Animer mon séminaire ou ma soirée
                  <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'solar:moon-stars-linear', label: 'Soirée à thème', href: '/animations/la-ruee-vers-l-or' },
                  { icon: 'solar:users-group-two-rounded-linear', label: 'Team building', href: '/animations/la-kermesse-2-0' },
                  { icon: 'solar:music-notes-linear', label: 'Blind test géant', href: '/animations/le-blind-test' },
                  { icon: 'solar:gift-linear', label: 'Bar à goodies', href: '/animations/le-bar-goodies' },
                ].map((f) => (
                  <Link
                    key={f.href}
                    prefetch={false}
                    href={f.href}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#ff2d55]/40 hover:bg-white/[0.06]"
                  >
                    <Icon icon={f.icon} className="text-[#ff2d55]" width={26} />
                    <p className="mt-3 font-semibold text-white group-hover:text-[#ff2d55] transition-colors">{f.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nos réalisations événementielles</h2>
              <p className="text-zinc-500 mt-2">Soirées, séminaires, assemblées générales et stands : ce qui s&apos;y est passé</p>
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
                <h2 className="text-3xl md:text-4xl font-bold text-white">Animations d&apos;entreprise près de chez vous</h2>
                <p className="text-zinc-500 mt-2">Soirées, team building, blind test, bar à goodies : de Montbéliard à Strasbourg</p>
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
            <p className="text-zinc-500 mt-2">Animations, séminaires, délais, zone d&apos;intervention : l&apos;essentiel en quelques réponses</p>
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
              { '@type': 'ListItem', position: 1, name: "Séminaires et soirées d'entreprise", url: 'https://www.idkom.fr/seminaire-soiree-entreprise' },
              { '@type': 'ListItem', position: 2, name: 'Animations événementielles', url: 'https://www.idkom.fr/animations' },
              { '@type': 'ListItem', position: 3, name: 'Réalisations', url: 'https://www.idkom.fr/realisations' },
              { '@type': 'ListItem', position: 4, name: 'Animations par ville', url: 'https://www.idkom.fr/animations-evenementielles' },
              { '@type': 'ListItem', position: 5, name: 'Stands BeMatrix', url: 'https://www.idkom.fr/bematrix' },
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
