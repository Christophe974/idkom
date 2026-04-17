'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

// ============================================================
// Data — Terre'Happy proposition (demo content)
// ============================================================
const PROPOSAL = {
  ref: 'IDK-2026-TH01',
  city: 'Etupes',
  date: '15 avril 2026',
  title: 'Création de site web',
  clientName: "Terre'Happy",
  clientLocation: 'Châtellerault',
  clientBaseline: 'Praticienne bien-être & soins sensoriels',
  intro: `Bonjour, merci pour notre échange ! J'ai adoré découvrir l'univers de Terre'Happy — il y a quelque chose de vraiment singulier dans ce que vous proposez, et ce serait dommage que le digital ne le reflète pas. Je vous prépare ici notre proposition pour créer un site qui vous ressemble vraiment : chaleureux, premium, et pensé pour que vos futurs clients aient envie de pousser la porte avant même de vous avoir rencontrée.`,
  deliverables: [
    {
      n: 1,
      icon: 'solar:globus-linear',
      title: 'Achat et configuration du nom de domaine',
      body: "On enregistre votre nom de domaine directement à votre nom — vous en êtes propriétaire à 100 %. On s'occupe de toute la configuration technique : DNS, certificat SSL, redirections. Vous n'avez rien à toucher, tout fonctionne.",
    },
    {
      n: 2,
      icon: 'solar:rocket-2-linear',
      title: 'Mise en ligne & performance',
      body: "Votre site sera déployé sur votre hébergement existant chez Hostinger et entièrement optimisé par nos soins. Performance, sécurité, fluidité : chaque paramètre est ajusté pour garantir une expérience digitale à la hauteur de votre image.",
    },
    {
      n: 3,
      icon: 'solar:widget-5-linear',
      title: 'Création du site — 5 pages sur-mesure',
      body: "Pas un template qu'on habille en vitesse. Un site pensé pour Terre'Happy, conçu pour que le visiteur ressente quelque chose avant même de réserver.",
      pages: [
        { title: 'Accueil', desc: "Page d'entrée immersive : accroche sensorielle, univers Terre'Happy, soins signatures mis en valeur, appel à l'action réservation. Conçue pour donner envie en 10 secondes." },
        { title: 'Les Rituels', desc: 'Chaque soin présenté comme une expérience : intention, déroulement, durée, tarif. On raconte, on ne liste pas.' },
        { title: 'Les Retraites', desc: "Présentation des retraites spirituelles comme une véritable immersion : intention, cadre, déroulé du séjour, transformation vécue. Mise en avant de l'expérience globale pour susciter l'engagement et le passage à l'action." },
        { title: 'Votre Histoire', desc: 'Votre parcours, votre philosophie, votre approche. La page qui crée la confiance et justifie un positionnement premium — les clients réservent des personnes autant que des prestations.' },
        { title: 'Contact & Réservation', desc: "Formulaire de contact, intégration de votre agenda Planity existant, accès aux bons cadeaux, localisation. Toutes les portes d'entrée au même endroit." },
      ],
    },
    {
      n: 4,
      icon: 'solar:pen-new-square-linear',
      title: 'Rédaction de tous les textes, optimisés SEO',
      body: "On s'occupe de tout écrire. Chaque mot sera travaillé pour deux objectifs à la fois : toucher vos lectrices humainement, et parler correctement à Google. Vous n'avez pas à vous transformer en rédactrice web — c'est notre boulot.",
      bullets: [
        'Textes de toutes les pages rédigés par nos soins',
        'Vocabulaire sensoriel et émotionnel aligné avec votre univers',
        'Mots-clés locaux intégrés naturellement (Châtellerault, Vienne, Nouvelle-Aquitaine…)',
        'Ton chaleureux, professionnel, cohérent de A à Z',
      ],
    },
    {
      n: 5,
      icon: 'solar:chart-square-linear',
      title: 'Bonnes pratiques SEO — incluses nativement',
      body: "Le SEO n'est pas une couche qu'on ajoute à la fin, c'est la structure même du site. Dès la mise en ligne, Terre'Happy sera positionné pour capter des recherches locales qualifiées.",
      seo: [
        { what: 'Balises title & meta description', why: 'Ce que Google lit en premier — et ce que vos futurs clients voient dans les résultats de recherche.' },
        { what: 'Structure H1 / H2 / H3', why: 'La hiérarchie du contenu, lisible autant par Google que par vos visiteurs.' },
        { what: 'URLs propres et lisibles', why: '/massage-pierres-chaudes-chatellerault plutôt que /page?id=42.' },
        { what: 'Attributs alt sur les images', why: "Google ne voit pas vos photos — on lui explique ce qu'il y a dessus." },
        { what: 'Sitemap XML', why: "On soumet le plan du site à Google pour qu'il l'indexe rapidement et complètement." },
        { what: 'Google Search Console', why: 'Paramétrage et déclaration du site — vous pouvez suivre vos positions dès le premier jour.' },
        { what: 'Schema.org LocalBusiness', why: 'Balisage structuré qui renforce votre fiche Google et améliore la visibilité locale.' },
        { what: 'Mobile-first & vitesse', why: "Site ultra-rapide et pensé smartphone — Google pénalise les sites lents, on s'en assure." },
      ],
    },
    {
      n: 6,
      icon: 'solar:calendar-linear',
      title: 'Intégration Planity',
      body: "Votre agenda Planity reste en place — on ne casse rien, on ne migre rien. On l'intègre proprement dans le parcours de réservation du site pour que l'expérience soit fluide de bout en bout.",
    },
  ],
  options: [
    {
      letter: 'A',
      icon: 'solar:gift-linear',
      title: 'Module bons cadeaux avec paiement en ligne',
      price: '+350 € HT',
      body: 'Vente de bons cadeaux directement depuis votre site, avec paiement sécurisé par carte (Stripe). Encaissement immédiat, zéro commission plateforme, disponible 24h/24. Idéal pour les fêtes de fin d\'année, la fête des mères… et toute l\'année.',
    },
    {
      letter: 'B',
      icon: 'solar:graph-up-linear',
      title: 'Accompagnement SEO mensuel',
      price: '150 € HT / mois',
      body: "Un site bien fait, c'est un bon départ. Un site qui progresse dans Google mois après mois, c'est encore mieux. On vous propose un suivi SEO sur 6 mois pour aller chercher les meilleures positions sur votre zone de chalandise.",
      bullets: [
        'Analyse mensuelle de vos positions Google (Search Console)',
        'Optimisation continue des pages existantes',
        "Création d'un article de blog mensuel optimisé SEO",
        'Suivi des mots-clés locaux stratégiques',
        'Rapport simplifié chaque mois pour que vous voyez les progrès',
      ],
      note: "Sans engagement de résultat — le SEO prend du temps et personne ne peut garantir une position Google. Ce qu'on garantit, c'est un travail sérieux, régulier et transparent. Sans engagement de durée au-delà des 6 mois, renouvelable librement.",
    },
  ],
  notIncluded: [
    "Shooting photo / vidéo — on peut vous recommander des prestataires locaux si besoin",
    'Maintenance technique mensuelle — disponible sur devis séparé',
    'Évolutions ou pages supplémentaires après livraison — devisées au cas par cas',
  ],
  ecommerce: {
    title: 'Évolution e-commerce (vente de produits)',
    body: "Dans une logique de développement, le site pourra être amené à intégrer une offre de vente de produits (bien-être, rituels, etc.). Pour garantir performance, simplicité de gestion et évolutivité, nous recommandons l'intégration d'une boutique dédiée via Shopify. Des passerelles et redirections fluides seront mises en place depuis le site principal afin d'offrir une expérience utilisateur cohérente et sans rupture entre les univers.",
  },
  recap: {
    items: [
      { label: 'Achat du nom de domaine (1 an)', ht: 'inclus' },
      { label: 'Hébergement haute performance', ht: 'inclus' },
      { label: 'Création du site — 5 pages sur-mesure', ht: 'inclus' },
      { label: 'Rédaction des textes, optimisés SEO', ht: 'inclus' },
      { label: 'Bonnes pratiques SEO techniques', ht: 'inclus' },
      { label: 'Intégration Planity', ht: 'inclus' },
    ],
    totalHT: 1900,
    tva: 380,
    totalTTC: 2280,
  },
  timeline: [
    { n: 1, title: 'Vous nous confirmez votre accord', desc: 'On vous envoie le bon de commande.' },
    { n: 2, title: 'Acompte de 30 % à la commande', desc: '570 € HT — le projet démarre.' },
    { n: 3, title: 'Entretien de découverte', desc: "On part sur un échange pour bien cerner votre univers avant d'écrire une seule ligne." },
    { n: 4, title: 'Livraison en 3 à 4 semaines', desc: 'Solde de 70 % à la mise en ligne.' },
  ],
  signature: {
    name: 'Katia Menegaux',
    role: 'Développement commercial — iDkom',
    photo: 'https://api.idkom.fr/uploads/vcards/photo_69e293492f16f.webp',
    email: 'katia@idkom.fr',
    phone: '+33 6 46 39 00 93',
    card: 'https://www.idkom.fr/carte/katia-menegaux',
    url: 'www.idkom.fr',
  },
};

function formatPrice(value: number) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

// ============================================================
// Scroll progress hook
// ============================================================
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

// ============================================================
// Main component
// ============================================================
export default function PropositionDemo() {
  const progress = useScrollProgress();
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="relative z-10 min-h-screen text-zinc-200">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-zinc-900/40">
        <div
          className="h-full bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Sticky ref strip */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-zinc-900/70">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-3 text-zinc-500">
            <Icon icon="solar:document-text-linear" width={16} className="text-[#7928ca]" />
            <span className="font-medium text-zinc-300">Proposition</span>
            <span className="hidden sm:inline text-zinc-600">·</span>
            <span className="hidden sm:inline text-zinc-500">Réf. {PROPOSAL.ref}</span>
          </div>
          <div className="text-zinc-500 hidden md:block">
            {PROPOSAL.city}, {PROPOSAL.date}
          </div>
          <div className="text-zinc-500 md:hidden">{PROPOSAL.date}</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section className="pt-20 md:pt-28 pb-16 md:pb-24">
          {/* Brand mark — logo iDkom */}
          <div className="flex flex-col items-center gap-3 mb-12 md:mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-white.svg"
              alt="iDkom"
              className="h-10 md:h-12 w-auto"
            />
            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.25em]">
              L&apos;Atelier Phygital
            </span>
          </div>

          {/* Kicker */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs md:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse" />
              Proposition commerciale &middot; Spécialement conçue pour vous
            </span>
          </div>

          {/* Client name huge */}
          <h1 className="text-center text-5xl md:text-8xl font-bold leading-[0.95] mb-4">
            <span className="gradient-text">{PROPOSAL.clientName}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-xl md:text-2xl text-zinc-300 font-medium mb-2">
            {PROPOSAL.title}
          </p>
          <p className="text-center text-zinc-500 mb-12">
            {PROPOSAL.clientLocation} &middot; {PROPOSAL.clientBaseline}
          </p>

          {/* Meta card */}
          <div className="max-w-xl mx-auto grid grid-cols-3 gap-px rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
            <div className="bg-black/40 p-4 text-center">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Référence</div>
              <div className="text-zinc-200 font-medium text-sm">{PROPOSAL.ref}</div>
            </div>
            <div className="bg-black/40 p-4 text-center">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Émise le</div>
              <div className="text-zinc-200 font-medium text-sm">{PROPOSAL.date}</div>
            </div>
            <div className="bg-black/40 p-4 text-center">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Valable</div>
              <div className="text-zinc-200 font-medium text-sm">30 jours</div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTRO MESSAGE */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-4 -left-4 text-7xl md:text-9xl text-[#7928ca]/20 font-serif leading-none select-none">
              &ldquo;
            </div>
            <blockquote className="relative pl-6 md:pl-10 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
              {PROPOSAL.intro}
            </blockquote>
            <div className="flex items-center gap-3 mt-6 pl-6 md:pl-10">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROPOSAL.signature.photo}
                  alt={PROPOSAL.signature.name}
                  className="w-full h-full rounded-full object-cover bg-black"
                />
              </div>
              <div className="text-sm">
                <div className="text-white font-medium">{PROPOSAL.signature.name}</div>
                <div className="text-zinc-500 text-xs">{PROPOSAL.signature.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION HEADER: Ce qu'on vous crée */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Le projet</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Ce qu&apos;on vous <span className="gradient-text">crée</span>
          </h2>
        </section>

        {/* ============================================================ */}
        {/* DELIVERABLES */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32 space-y-6 md:space-y-8">
          {PROPOSAL.deliverables.map((d) => (
            <div
              key={d.n}
              className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm overflow-hidden hover:border-zinc-700/80 transition-colors"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ff2d55]/10 via-transparent to-[#00d4ff]/10" />
              </div>

              <div className="relative p-6 md:p-10">
                <div className="flex items-start gap-5 md:gap-8 mb-5">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-5xl md:text-7xl font-bold leading-none">
                      <span className="bg-gradient-to-br from-zinc-700 to-zinc-900 bg-clip-text text-transparent group-hover:from-[#ff2d55] group-hover:via-[#7928ca] group-hover:to-[#00d4ff] transition-all duration-500">
                        {String(d.n).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Title + icon */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-2 text-[#7928ca]">
                      <Icon icon={d.icon} width={22} />
                      <span className="text-xs uppercase tracking-widest text-zinc-500">Étape {d.n}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {d.title}
                    </h3>
                  </div>
                </div>

                <p className="text-zinc-400 text-base md:text-lg leading-relaxed ml-0 md:ml-[calc(5rem+2rem)]">
                  {d.body}
                </p>

                {/* Bullets */}
                {d.bullets && (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3 md:ml-[calc(5rem+2rem)]">
                    {d.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] flex-shrink-0" />
                        <span className="text-sm md:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Pages grid */}
                {d.pages && (
                  <div className="mt-8 md:ml-[calc(5rem+2rem)] grid gap-3">
                    {d.pages.map((p, i) => (
                      <div
                        key={i}
                        className="group/page grid md:grid-cols-[180px_1fr] gap-3 md:gap-6 p-5 rounded-xl bg-black/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/page:text-white transition-colors text-xs font-bold">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="font-semibold text-white">{p.title}</div>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* SEO grid */}
                {d.seo && (
                  <div className="mt-8 md:ml-[calc(5rem+2rem)] grid md:grid-cols-2 gap-3">
                    {d.seo.map((s, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-black/30 border border-zinc-800/60 hover:border-[#7928ca]/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2 text-[#00d4ff]">
                          <Icon icon="solar:check-circle-bold" width={16} />
                          <span className="font-semibold text-white text-sm">{s.what}</span>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed">{s.why}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ============================================================ */}
        {/* OPTIONS */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Pour aller plus loin</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Les options <span className="gradient-text">disponibles</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {PROPOSAL.options.map((o) => (
              <div
                key={o.letter}
                className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#ff2d55]/40 via-[#7928ca]/40 to-[#00d4ff]/40"
              >
                <div className="relative rounded-2xl bg-black/90 backdrop-blur-sm p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] flex items-center justify-center font-bold text-white text-lg">
                        {o.letter}
                      </div>
                      <Icon icon={o.icon} width={28} className="text-[#7928ca]" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Tarif</div>
                      <div className="font-bold text-white whitespace-nowrap text-sm md:text-base">{o.price}</div>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {o.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-5 text-sm md:text-base">{o.body}</p>

                  {o.bullets && (
                    <ul className="space-y-2 mb-5">
                      {o.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                          <Icon icon="solar:arrow-right-linear" width={16} className="text-[#ff2d55] mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {o.note && (
                    <div className="mt-auto pt-5 border-t border-zinc-800/80 text-xs text-zinc-500 italic leading-relaxed">
                      {o.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* NOT INCLUDED */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-7 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Icon icon="solar:info-circle-linear" width={20} className="text-zinc-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Ce qui n&apos;est pas inclus
              </h3>
            </div>
            <ul className="space-y-3">
              {PROPOSAL.notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm md:text-base">
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================ */}
        {/* E-COMMERCE EVOLUTION */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 via-transparent to-[#7928ca]/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative p-7 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Icon icon="solar:bag-4-linear" width={24} className="text-[#00d4ff]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#00d4ff]">Vision long-terme</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {PROPOSAL.ecommerce.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-3xl">
                {PROPOSAL.ecommerce.body}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RECAP PRICING */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Le récap</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Récapitulatif <span className="gradient-text">tarifaire</span>
          </h2>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
            {/* Items */}
            <div className="divide-y divide-zinc-800/60">
              {PROPOSAL.recap.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-6 md:px-8 py-4 hover:bg-zinc-900/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:check-circle-bold" width={18} className="text-[#00d4ff]" />
                    <span className="text-zinc-300 text-sm md:text-base">{item.label}</span>
                  </div>
                  <span className="text-zinc-500 text-sm italic">{item.ht}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-zinc-800 bg-black/40 px-6 md:px-8 py-6">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center md:text-left">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total HT</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{formatPrice(PROPOSAL.recap.totalHT)}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">TVA 20 %</div>
                  <div className="text-2xl md:text-3xl font-bold text-zinc-400">{formatPrice(PROPOSAL.recap.tva)}</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total TTC</div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <span className="gradient-text">{formatPrice(PROPOSAL.recap.totalTTC)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Options recap */}
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {PROPOSAL.options.map((o) => (
              <div key={o.letter} className="flex items-center justify-between px-5 py-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-xs flex-shrink-0">
                    {o.letter}
                  </div>
                  <span className="text-zinc-400 text-sm truncate">Option {o.letter} — {o.title}</span>
                </div>
                <span className="text-zinc-300 font-medium text-sm whitespace-nowrap ml-3">{o.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* TIMELINE — Comment ça se passe */}
        {/* ============================================================ */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Next steps</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Comment ça <span className="gradient-text">se passe</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d55] via-[#7928ca] to-[#00d4ff] opacity-40" />

            <div className="space-y-8 md:space-y-12">
              {PROPOSAL.timeline.map((step, i) => (
                <div
                  key={step.n}
                  className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-start`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#00d4ff] ring-4 ring-black" />

                  {/* Spacer (desktop) */}
                  <div className="hidden md:block flex-1" />

                  {/* Content */}
                  <div className="pl-14 md:pl-0 flex-1">
                    <div className={`rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-5 md:p-6 ${i % 2 === 0 ? 'md:mr-0' : 'md:ml-0'}`}>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                        Étape {step.n}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo note */}
          <div className="mt-12 rounded-xl border border-[#7928ca]/20 bg-[#7928ca]/5 p-5 md:p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center flex-shrink-0">
              <Icon icon="solar:camera-linear" width={20} className="text-[#7928ca]" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm md:text-base mb-1">Un mot sur les photos</div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                On s&apos;occupe des textes, mais les visuels font vraiment la différence pour un site comme le vôtre. Si vous avez de belles photos de votre espace et de vos soins, parfait — sinon, on peut vous aider à organiser un shooting. C&apos;est optionnel, mais vraiment conseillé.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA — Accept */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7928ca]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative p-10 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-black/50 text-zinc-400 text-xs font-medium mb-6">
                <Icon icon="solar:heart-linear" width={14} className="text-[#ff2d55]" />
                Prêt(e) à démarrer ?
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                On <span className="gradient-text">se lance</span> ?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
                Un clic pour nous confirmer votre accord. On vous envoie le bon de commande dans la foulée et le projet démarre.
              </p>

              {accepted ? (
                <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                  <Icon icon="solar:check-circle-bold" width={24} />
                  <span className="font-medium">Merci ! Katia va vous recontacter.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button
                    onClick={() => setAccepted(true)}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold shadow-lg shadow-[#7928ca]/25 hover:shadow-xl hover:shadow-[#7928ca]/40 transition-all"
                  >
                    <span>Je valide cette proposition</span>
                    <Icon icon="solar:arrow-right-linear" width={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="mailto:contact@idkom.fr"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40 transition-colors text-sm font-medium"
                  >
                    <Icon icon="solar:chat-round-linear" width={18} />
                    Une question ?
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SIGNATURE — Katia */}
        {/* ============================================================ */}
        <section className="mb-16">
          <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#ff2d55]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] blur-md opacity-60" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-[2px] bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROPOSAL.signature.photo}
                    alt={PROPOSAL.signature.name}
                    className="w-full h-full rounded-full object-cover bg-black"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                  Votre interlocutrice
                </div>
                <div className="text-white font-bold text-xl md:text-2xl mb-1">
                  {PROPOSAL.signature.name}
                </div>
                <div className="text-zinc-400 text-sm mb-4">
                  {PROPOSAL.signature.role}
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  <a
                    href={`tel:${PROPOSAL.signature.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-black/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors text-sm"
                  >
                    <Icon icon="solar:phone-linear" width={16} className="text-[#ff2d55]" />
                    {PROPOSAL.signature.phone}
                  </a>
                  <a
                    href={`mailto:${PROPOSAL.signature.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-black/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors text-sm"
                  >
                    <Icon icon="solar:letter-linear" width={16} className="text-[#7928ca]" />
                    {PROPOSAL.signature.email}
                  </a>
                  <a
                    href={PROPOSAL.signature.card}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors text-sm"
                  >
                    <Icon icon="solar:card-linear" width={16} />
                    Sa carte de visite
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-zinc-900 text-xs text-zinc-600 space-y-2">
          <div>iDkom — L&apos;Atelier Phygital &middot; Brévilliers, Franche-Comté</div>
          <div>Proposition {PROPOSAL.ref} &middot; valable 30 jours à compter du {PROPOSAL.date}</div>
        </footer>
      </div>
    </main>
  );
}
