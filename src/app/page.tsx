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

      {/* LocalBusiness Schema — carte d'identité de l'entreprise pour Google & les IA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://www.idkom.fr/#organization',
            name: data.site.name || 'iDkom',
            description: data.site.description,
            url: 'https://www.idkom.fr',
            telephone: data.site.phone || undefined,
            email: data.site.email || undefined,
            foundingDate: '1996',
            address: data.site.address
              ? { '@type': 'PostalAddress', streetAddress: data.site.address, addressCountry: 'FR' }
              : undefined,
            areaServed: 'France',
            sameAs: [data.social.linkedin, data.social.instagram, data.social.facebook].filter(Boolean),
          }),
        }}
      />

      {/* FAQPage Schema — réponses citables par Google et les IA */}
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
