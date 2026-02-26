import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';

export const metadata: Metadata = {
  title: 'Mentions légales | iDkom',
  description: 'Mentions légales du site iDkom - Informations juridiques, éditeur, hébergeur et politique de confidentialité.',
  alternates: { canonical: 'https://www.idkom.fr/mentions-legales' },
};

export const revalidate = 86400; // 24h

export default async function MentionsLegalesPage() {
  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link prefetch={false} href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <span className="text-zinc-300">Mentions légales</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-12">

          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:buildings-2-linear" className="text-[#7928ca]" width={28} />
              Éditeur du site
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 mb-4">
                Le site <strong className="text-white">www.idkom.fr</strong> est édité par :
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li><strong className="text-zinc-200">Raison sociale :</strong> iDkom SARL</li>
                <li><strong className="text-zinc-200">Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</li>
                <li><strong className="text-zinc-200">Capital social :</strong> 60 000 €</li>
                <li><strong className="text-zinc-200">Siège social :</strong> {homeData.site.address || '[Adresse à compléter]'}</li>
                <li><strong className="text-zinc-200">SIRET :</strong> 488 498 361 00044</li>
                <li><strong className="text-zinc-200">RCS :</strong> Vesoul B 488 498 361</li>
                <li><strong className="text-zinc-200">N° TVA intracommunautaire :</strong> FR 83 488498361</li>
                <li><strong className="text-zinc-200">Téléphone :</strong> {homeData.site.phone || '[À compléter]'}</li>
                <li><strong className="text-zinc-200">Email :</strong> {homeData.site.email || '[À compléter]'}</li>
              </ul>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:user-check-rounded-linear" className="text-[#ff2d55]" width={28} />
              Directeur de la publication
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300">
                Le directeur de la publication est <strong className="text-white">Christophe Bracchini</strong>,
                en qualité de Gérant de la société iDkom SARL.
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:server-linear" className="text-[#00d4ff]" width={28} />
              Hébergement
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10 space-y-4">
              <div>
                <p className="text-zinc-200 font-medium mb-2">Site web (Frontend) :</p>
                <ul className="text-zinc-400 space-y-1 ml-4">
                  <li><strong className="text-zinc-300">Vercel Inc.</strong></li>
                  <li>440 N Barranca Ave #4133</li>
                  <li>Covina, CA 91723, États-Unis</li>
                  <li>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">vercel.com</a></li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-200 font-medium mb-2">API et base de données (Backend) :</p>
                <ul className="text-zinc-400 space-y-1 ml-4">
                  <li><strong className="text-zinc-300">OVH SAS</strong></li>
                  <li>2 rue Kellermann</li>
                  <li>59100 Roubaix, France</li>
                  <li>Site : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">ovhcloud.com</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:copyright-linear" className="text-[#7928ca]" width={28} />
              Propriété intellectuelle
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.)
                est la propriété exclusive de <strong className="text-white">iDkom SARL</strong> ou de ses partenaires
                et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
                du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
                de iDkom SARL.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d&apos;une
                contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de
                la Propriété Intellectuelle.
              </p>
            </div>
          </section>

          {/* Protection des données personnelles */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:shield-check-linear" className="text-[#ff2d55]" width={28} />
              Protection des données personnelles (RGPD)
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10 space-y-4">
              <p className="text-zinc-300 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
                Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="text-zinc-400 space-y-2 ml-4">
                <li>• Droit d&apos;accès à vos données</li>
                <li>• Droit de rectification</li>
                <li>• Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
                <li>• Droit à la limitation du traitement</li>
                <li>• Droit à la portabilité des données</li>
                <li>• Droit d&apos;opposition</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                <strong className="text-white">Responsable du traitement :</strong> iDkom SARL<br />
                Pour exercer vos droits ou pour toute question relative à vos données personnelles, vous pouvez
                nous contacter :
              </p>
              <ul className="text-zinc-400 space-y-1 ml-4">
                <li>• Par email : <a href={`mailto:${homeData.site.email}`} className="text-[#00d4ff] hover:underline">{homeData.site.email || 'contact@idkom.fr'}</a></li>
                <li>• Par courrier : iDkom SARL - {homeData.site.address || '[Adresse]'}</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL
                (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">www.cnil.fr</a>).
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:cookie-linear" className="text-[#00d4ff]" width={28} />
              Cookies
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Le site <strong className="text-white">www.idkom.fr</strong> peut utiliser des cookies pour améliorer
                l&apos;expérience utilisateur et mesurer l&apos;audience. Un cookie est un petit fichier texte stocké
                sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                <strong className="text-white">Types de cookies utilisés :</strong>
              </p>
              <ul className="text-zinc-400 space-y-2 ml-4 mt-2">
                <li>• <strong className="text-zinc-300">Cookies techniques :</strong> nécessaires au fonctionnement du site</li>
                <li>• <strong className="text-zinc-300">Cookies analytiques :</strong> pour mesurer l&apos;audience (anonymisés)</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:danger-triangle-linear" className="text-[#7928ca]" width={28} />
              Limitation de responsabilité
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                iDkom SARL s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
                diffusées sur ce site. Toutefois, iDkom SARL ne peut garantir l&apos;exactitude, la précision
                ou l&apos;exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                iDkom SARL décline toute responsabilité pour toute imprécision, inexactitude ou omission
                portant sur des informations disponibles sur ce site, ainsi que pour tous dommages résultant
                d&apos;une intrusion frauduleuse d&apos;un tiers.
              </p>
            </div>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:link-round-linear" className="text-[#ff2d55]" width={28} />
              Liens hypertextes
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Le site peut contenir des liens hypertextes vers d&apos;autres sites. iDkom SARL n&apos;exerce
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                La création de liens hypertextes vers le site www.idkom.fr est soumise à l&apos;accord préalable
                et écrit de iDkom SARL.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Icon icon="solar:scale-linear" className="text-[#00d4ff]" width={28} />
              Droit applicable
            </h2>
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
              <p className="text-zinc-300 leading-relaxed">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et après
                échec de toute tentative de recherche d&apos;une solution amiable, les tribunaux français seront
                seuls compétents.
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
            prefetch={false}
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
