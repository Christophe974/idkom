import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | iDkom',
  description: 'Politique de confidentialité et protection des données personnelles du site iDkom.',
  alternates: { canonical: 'https://www.idkom.fr/confidentialite' },
};

export const revalidate = 86400; // 24h

export default async function ConfidentialitePage() {
  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <span className="text-zinc-300">Politique de confidentialité</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Politique de confidentialité
        </h1>

        <p className="text-zinc-400 text-lg mb-12">
          La protection de vos données personnelles est une priorité pour iDkom. Cette politique de confidentialité
          vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations.
        </p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-12">

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:user-id-linear" className="text-[#7928ca]" width={28} />
              Responsable du traitement
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Le responsable du traitement des données personnelles est :
              </p>
              <ul className="text-zinc-400 space-y-1 mt-4 ml-4">
                <li><strong className="text-zinc-200">iDkom SARL</strong></li>
                <li>SIRET : 488 498 361 00044</li>
                <li>Adresse : {homeData.site.address || '[Adresse]'}</li>
                <li>Email : <a href={`mailto:${homeData.site.email}`} className="text-[#00d4ff] hover:underline">{homeData.site.email || 'contact@idkom.fr'}</a></li>
              </ul>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:database-linear" className="text-[#ff2d55]" width={28} />
              Données collectées
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <p className="text-zinc-200 font-medium mb-2">Données que vous nous fournissez directement :</p>
                <ul className="text-zinc-400 space-y-1 ml-4">
                  <li>• Nom et prénom</li>
                  <li>• Adresse email</li>
                  <li>• Numéro de téléphone</li>
                  <li>• Nom de l&apos;entreprise</li>
                  <li>• Message (via formulaire de contact)</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-200 font-medium mb-2">Données collectées automatiquement :</p>
                <ul className="text-zinc-400 space-y-1 ml-4">
                  <li>• Adresse IP (anonymisée)</li>
                  <li>• Type de navigateur et système d&apos;exploitation</li>
                  <li>• Pages visitées et durée de visite</li>
                  <li>• Source de trafic (référent)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalités du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:target-linear" className="text-[#00d4ff]" width={28} />
              Finalités du traitement
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="text-zinc-400 space-y-2 ml-4">
                <li>• <strong className="text-zinc-300">Répondre à vos demandes</strong> : traitement de vos messages via le formulaire de contact</li>
                <li>• <strong className="text-zinc-300">Établir des devis</strong> : préparation de propositions commerciales personnalisées</li>
                <li>• <strong className="text-zinc-300">Améliorer nos services</strong> : analyse statistique anonymisée de la fréquentation du site</li>
                <li>• <strong className="text-zinc-300">Assurer le bon fonctionnement</strong> : maintenance technique et sécurité du site</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:document-text-linear" className="text-[#7928ca]" width={28} />
              Base légale du traitement
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Le traitement de vos données repose sur les bases légales suivantes :
              </p>
              <ul className="text-zinc-400 space-y-2 ml-4">
                <li>• <strong className="text-zinc-300">Votre consentement</strong> : pour l&apos;envoi de communications marketing (si applicable)</li>
                <li>• <strong className="text-zinc-300">L&apos;exécution d&apos;un contrat</strong> : pour répondre à vos demandes de devis ou de prestation</li>
                <li>• <strong className="text-zinc-300">L&apos;intérêt légitime</strong> : pour améliorer nos services et assurer la sécurité du site</li>
              </ul>
            </div>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:users-group-rounded-linear" className="text-[#ff2d55]" width={28} />
              Destinataires des données
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Vos données personnelles sont destinées uniquement à l&apos;équipe iDkom et ne sont jamais vendues à des tiers.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Nous pouvons faire appel à des sous-traitants pour l&apos;hébergement et l&apos;analyse statistique :
              </p>
              <ul className="text-zinc-400 space-y-1 mt-2 ml-4">
                <li>• <strong className="text-zinc-300">OVH</strong> (hébergement - France)</li>
                <li>• <strong className="text-zinc-300">Vercel</strong> (hébergement - USA, conforme Privacy Shield)</li>
              </ul>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:clock-circle-linear" className="text-[#00d4ff]" width={28} />
              Durée de conservation
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Vos données sont conservées pendant une durée proportionnée à leur finalité :
              </p>
              <ul className="text-zinc-400 space-y-2 ml-4">
                <li>• <strong className="text-zinc-300">Demandes de contact</strong> : 3 ans à compter du dernier contact</li>
                <li>• <strong className="text-zinc-300">Données clients</strong> : durée de la relation commerciale + 5 ans (obligations légales)</li>
                <li>• <strong className="text-zinc-300">Données de navigation</strong> : 13 mois maximum</li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:shield-user-linear" className="text-[#7928ca]" width={28} />
              Vos droits
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:eye-linear" className="text-[#00d4ff]" width={18} />
                    Droit d&apos;accès
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Obtenir une copie de vos données</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:pen-linear" className="text-[#ff2d55]" width={18} />
                    Droit de rectification
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Corriger vos données inexactes</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:trash-bin-trash-linear" className="text-[#7928ca]" width={18} />
                    Droit à l&apos;effacement
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Supprimer vos données</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:export-linear" className="text-[#00d4ff]" width={18} />
                    Droit à la portabilité
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Récupérer vos données</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:stop-circle-linear" className="text-[#ff2d55]" width={18} />
                    Droit d&apos;opposition
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Refuser certains traitements</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-200 font-medium flex items-center gap-2">
                    <Icon icon="solar:lock-linear" className="text-[#7928ca]" width={18} />
                    Droit à la limitation
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">Geler l&apos;utilisation de vos données</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed mt-6">
                Pour exercer ces droits, contactez-nous à : <a href={`mailto:${homeData.site.email}`} className="text-[#00d4ff] hover:underline">{homeData.site.email || 'contact@idkom.fr'}</a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:cookie-linear" className="text-[#ff2d55]" width={28} />
              Politique de cookies
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10 space-y-4">
              <p className="text-zinc-300 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre terminal lors de votre visite.
                Nous utilisons différents types de cookies :
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <Icon icon="solar:check-circle-linear" className="text-green-500 mt-0.5" width={20} />
                  <div>
                    <p className="text-zinc-200 font-medium">Cookies strictement nécessaires</p>
                    <p className="text-zinc-500 text-sm">Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <Icon icon="solar:chart-linear" className="text-blue-500 mt-0.5" width={20} />
                  <div>
                    <p className="text-zinc-200 font-medium">Cookies analytiques</p>
                    <p className="text-zinc-500 text-sm">Permettent de mesurer l&apos;audience et améliorer le site. Données anonymisées.</p>
                  </div>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed mt-4">
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
                La suppression des cookies peut affecter votre expérience de navigation.
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:shield-check-linear" className="text-[#00d4ff]" width={28} />
              Sécurité des données
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre la destruction, la perte, l&apos;altération ou l&apos;accès non autorisé :
              </p>
              <ul className="text-zinc-400 space-y-2 mt-4 ml-4">
                <li>• Chiffrement SSL/TLS des communications (HTTPS)</li>
                <li>• Hébergement sécurisé avec sauvegardes régulières</li>
                <li>• Accès restreint aux données personnelles</li>
                <li>• Mise à jour régulière des systèmes</li>
              </ul>
            </div>
          </section>

          {/* Contact & Réclamation */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:letter-linear" className="text-[#7928ca]" width={28} />
              Contact & Réclamation
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits,
                vous pouvez nous contacter :
              </p>
              <ul className="text-zinc-400 space-y-1 mt-4 ml-4">
                <li>• Par email : <a href={`mailto:${homeData.site.email}`} className="text-[#00d4ff] hover:underline">{homeData.site.email || 'contact@idkom.fr'}</a></li>
                <li>• Par téléphone : {homeData.site.phone || '[Téléphone]'}</li>
                <li>• Par courrier : iDkom SARL - {homeData.site.address || '[Adresse]'}</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
                auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">www.cnil.fr</a>
              </p>
            </div>
          </section>

          {/* Date de mise à jour */}
          <section className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </section>

        </div>

        {/* Retour */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width={16} />
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>

      <FooterServer site={homeData.site} social={homeData.social} />
    </>
  );
}
