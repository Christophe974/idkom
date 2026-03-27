import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import { getHomepageData, getCityPageBySlug } from '@/lib/api';
import type { CityPage as CityPageData, CityPageConcept } from '@/lib/api';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const defaultConcepts: CityPageConcept[] = [
  { name: 'Bar Goodies', description: 'Un comptoir premium où vos invités choisissent et personnalisent leurs goodies en direct', icon: 'solar:gift-linear', link: '/animations/le-bar-goodies' },
  { name: 'Photobooth IA', description: 'Cabine photo nouvelle génération avec retouche IA et partage instantané', icon: 'solar:camera-linear', link: '/animations' },
  { name: 'Kermesse 2.0', description: 'La kermesse revisitée avec des activités digitales et interactives', icon: 'solar:gamepad-linear', link: '/animations/la-kermesse-2-0' },
  { name: 'Stands BeMatrix', description: 'Stands modulaires premium en cadres aluminium avec intégration LEDskin', icon: 'solar:widget-linear', link: '/bematrix' },
  { name: 'Roue des Avis', description: 'Roue digitale interactive pour collecter les avis clients', icon: 'solar:star-shine-linear', link: '/animations' },
  { name: 'Quiz Interactif', description: 'Quiz personnalisé sur grand écran pour animer votre audience', icon: 'solar:question-circle-linear', link: '/animations' },
];

const conceptColors = ['#ff2d55', '#7928ca', '#00d4ff', '#22c55e', '#f59e0b', '#ec4899'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const city = await getCityPageBySlug(slug);
    return {
      title: city.seo.title,
      description: city.seo.description,
      alternates: {
        canonical: `https://www.idkom.fr/animations-evenementielles/${slug}`,
        languages: { 'fr': `https://www.idkom.fr/animations-evenementielles/${slug}` },
      },
      openGraph: {
        title: city.seo.title,
        description: city.seo.description,
        url: `https://www.idkom.fr/animations-evenementielles/${slug}`,
        siteName: 'iDkom',
        locale: 'fr_FR',
        type: 'website',
      },
    };
  } catch {
    return { title: 'Page non trouvée', robots: { index: false } };
  }
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;

  let city: CityPageData;
  try {
    city = await getCityPageBySlug(slug);
  } catch {
    notFound();
  }

  const data = await getHomepageData();
  const concepts = city.concepts && city.concepts.length > 0 ? city.concepts : defaultConcepts;
  const faq = city.faq || [];
  const venues = city.venues || [];

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 min-h-screen">
        {/* Breadcrumbs */}
        <nav className="pt-28 px-6" aria-label="Fil d'Ariane">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Icon icon="solar:alt-arrow-right-linear" width={14} /></li>
              <li><Link href="/animations-evenementielles" className="hover:text-white transition-colors">Animations événementielles</Link></li>
              <li><Icon icon="solar:alt-arrow-right-linear" width={14} /></li>
              <li className="text-white">{city.city_name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                <Icon icon="solar:map-point-linear" width={18} />
                {city.department} ({city.department_code}) — {city.region}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Animations <span className="gradient-text">événementielles</span>
                <br />
                à {city.city_name}
              </h1>
              {city.intro_text && (
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                  {city.intro_text}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Concepts */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos <span className="gradient-text">concepts</span> à {city.city_name}
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Des animations événementielles innovantes pour vos salons, séminaires et événements d'entreprise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts.map((concept, index) => (
                <Link
                  key={concept.name}
                  href={concept.link || '/animations'}
                  prefetch={false}
                  className="group p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${conceptColors[index % conceptColors.length]}15` }}
                  >
                    <Icon
                      icon={concept.icon || 'solar:star-shine-linear'}
                      style={{ color: conceptColors[index % conceptColors.length] }}
                      width={28}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ff2d55] transition-colors">
                    {concept.name}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {concept.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Venues */}
        {venues.length > 0 && (
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Lieux <span className="gradient-text">événementiels</span> à {city.city_name}
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                  Nous connaissons les principaux espaces événementiels de la région et leurs contraintes techniques.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <div
                    key={venue.name}
                    className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7928ca]/10 flex items-center justify-center mb-4">
                      <Icon icon="solar:buildings-linear" className="text-[#7928ca]" width={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{venue.name}</h3>
                    <p className="text-zinc-500 text-sm">{venue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Local clients + Transport */}
        {(city.local_clients || city.transport_info) && (
          <section className="py-20 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {city.local_clients && (
                  <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 flex items-center justify-center">
                        <Icon icon="solar:users-group-rounded-linear" className="text-[#ff2d55]" width={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Références locales</h2>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">{city.local_clients}</p>
                  </div>
                )}
                {city.transport_info && (
                  <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center">
                        <Icon icon="solar:routing-linear" className="text-[#00d4ff]" width={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Accès & Transport</h2>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">{city.transport_info}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Questions fréquentes — <span className="gradient-text">{city.city_name}</span>
                </h2>
              </div>

              <div className="space-y-4">
                {faq.map((item, index) => (
                  <details
                    key={index}
                    className="group rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium hover:bg-white/5 transition-colors">
                      <span className="pr-4">{item.question}</span>
                      <Icon
                        icon="solar:alt-arrow-down-linear"
                        className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-zinc-500"
                        width={20}
                      />
                    </summary>
                    <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Cities */}
        {city.other_cities.length > 0 && (
          <section className="py-20 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Nous intervenons aussi à
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {city.other_cities.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/animations-evenementielles/${other.slug}`}
                    prefetch={false}
                    className="px-5 py-3 rounded-full bg-zinc-900/50 border border-white/10 text-white hover:border-[#ff2d55]/30 hover:text-[#ff2d55] transition-all"
                  >
                    {other.city_name} ({other.department_code})
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Un projet événementiel à <span className="gradient-text">{city.city_name}</span> ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Parlons de votre événement. Notre équipe vous accompagne de la conception
              au démontage, avec des animations qui font la différence.
            </p>
            <Link
              prefetch={false}
              href="/contact"
              className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
            >
              Parlons de votre projet
              <Icon icon="solar:arrow-right-linear" className="ml-3 group-hover:translate-x-2 transition-transform" width={24} />
            </Link>
          </div>
        </section>
      </main>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.idkom.fr' },
              { '@type': 'ListItem', position: 2, name: 'Animations événementielles', item: 'https://www.idkom.fr/animations-evenementielles' },
              { '@type': 'ListItem', position: 3, name: city.city_name, item: `https://www.idkom.fr/animations-evenementielles/${city.slug}` },
            ],
          }),
        }}
      />

      {/* FAQPage Schema */}
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Animations événementielles à ${city.city_name}`,
            description: city.seo.description,
            provider: {
              '@type': 'LocalBusiness',
              name: 'iDkom',
              url: 'https://www.idkom.fr',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Brevilliers',
                addressRegion: 'Franche-Comté',
                postalCode: '70400',
                addressCountry: 'FR',
              },
            },
            url: `https://www.idkom.fr/animations-evenementielles/${city.slug}`,
            serviceType: 'Animations événementielles',
            areaServed: {
              '@type': 'City',
              name: city.city_name,
              containedInPlace: {
                '@type': 'AdministrativeArea',
                name: `${city.department} (${city.department_code})`,
              },
            },
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
