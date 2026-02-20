import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getAuditByToken } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import AuditScore from '@/components/AuditScore';
import AuditCategory from '@/components/AuditCategory';
import AuditRadarChart from '@/components/AuditRadarChart';
import AuditBarChart from '@/components/AuditBarChart';
import AuditScrollAnimator from '@/components/AuditScrollAnimator';
import AuditProgressBar from '@/components/AuditProgressBar';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;
  try {
    const audit = await getAuditByToken(token);
    return {
      title: `Audit ${audit.company_name || 'web'} | iDkom`,
      description: `Score iDkom : ${audit.score_total}/100 — Audit de performance, SEO, sécurité et présence Google.`,
      robots: 'noindex, nofollow',
    };
  } catch {
    return { title: 'Audit introuvable | iDkom' };
  }
}

export default async function AuditPublicPage({ params }: PageProps) {
  const { token } = await params;

  let audit;
  try {
    audit = await getAuditByToken(token);
  } catch {
    notFound();
  }

  const categories = [
    { key: 'performance' as const, label: 'Performance', icon: 'solar:rocket-linear', color: '#ff2d55' },
    { key: 'seo' as const, label: 'SEO', icon: 'solar:magnifer-linear', color: '#7928ca' },
    { key: 'mobile' as const, label: 'Mobile', icon: 'solar:smartphone-linear', color: '#00d4ff' },
    { key: 'security' as const, label: 'Sécurité', icon: 'solar:shield-check-linear', color: '#ff2d55' },
    { key: 'accessibility' as const, label: 'Accessibilité', icon: 'solar:accessibility-linear', color: '#7928ca' },
    { key: 'google' as const, label: 'Présence Google', icon: 'solar:map-point-linear', color: '#00d4ff' },
    { key: 'content' as const, label: 'Contenu', icon: 'solar:document-text-linear', color: '#f97316' },
  ];

  // Filter categories that have results
  const activeCategories = categories.filter(
    cat => audit.results[cat.key] && audit.results[cat.key].length > 0
  );

  const salonLabel = [audit.salon?.name, audit.salon?.date].filter(Boolean).join(' — ');

  // Score-based messaging
  const scoreLevel = audit.score_total >= 80 ? 'excellent' : audit.score_total >= 60 ? 'correct' : audit.score_total >= 40 ? 'moyen' : 'critique';
  const ctaTitle = scoreLevel === 'excellent'
    ? 'Votre site est déjà performant !'
    : scoreLevel === 'correct'
    ? 'Quelques améliorations possibles'
    : scoreLevel === 'moyen'
    ? 'Votre site perd des clients'
    : 'Votre site a besoin d\u2019aide urgente';
  const ctaText = scoreLevel === 'excellent'
    ? 'Maintenir un site performant demande un suivi régulier. Discutons de comment garder votre avance.'
    : scoreLevel === 'correct'
    ? 'Des optimisations ciblées pourraient significativement augmenter votre visibilité et vos conversions.'
    : scoreLevel === 'moyen'
    ? 'Chaque jour, des visiteurs quittent votre site à cause de ces problèmes. Un audit approfondi avec nos experts peut tout changer.'
    : 'Chaque jour qui passe, vous perdez des clients potentiels. Un rendez-vous gratuit de 30 minutes peut transformer votre présence en ligne.';

  // Radar chart data
  const radarData = activeCategories.map(cat => ({
    key: cat.key,
    label: cat.label,
    score: audit.scores[cat.key] ?? 0,
    color: cat.color,
  }));

  // Bar chart data
  const barData = activeCategories.map(cat => ({
    key: cat.key,
    label: cat.label,
    score: audit.scores[cat.key] ?? 0,
    color: cat.color,
    icon: cat.icon,
  }));

  return (
    <>
      <AmbientBackground />
      <AuditProgressBar />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-white.svg"
              alt="iDkom"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Icon icon="solar:calendar-mark-linear" width={16} />
            Prendre RDV
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* Badge + Header */}
        <AuditScrollAnimator>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7928ca]/10 text-[#7928ca] text-sm font-medium mb-6">
              <Icon icon="solar:chart-square-linear" width={18} />
              Audit réalisé par iDkom
            </div>

            {salonLabel && (
              <p className="text-zinc-500 text-sm mb-4">
                <Icon icon="solar:shop-linear" width={14} className="inline mr-1" />
                {salonLabel}
              </p>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {audit.company_name || 'Votre site web'}
            </h1>
            <p className="text-zinc-500">
              <Icon icon="solar:global-linear" width={14} className="inline mr-1" />
              {audit.website_url}
            </p>
          </div>
        </AuditScrollAnimator>

        {/* Score principal */}
        <AuditScrollAnimator delay={0.1}>
          <div className="flex justify-center mb-14">
            <AuditScore score={audit.score_total} size={220} label="Score iDkom" />
          </div>
        </AuditScrollAnimator>

        {/* Technologies détectées */}
        {audit.technologies && audit.technologies.length > 0 && (
          <AuditScrollAnimator delay={0.15}>
            <div className="text-center mb-14">
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-3">Technologies détectées</p>
              <div className="flex flex-wrap justify-center gap-2">
                {audit.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/40 rounded-lg text-xs text-zinc-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Commercial profile */}
        {audit.commercial?.bio && (
          <AuditScrollAnimator delay={0.15}>
            <div className="mb-14 max-w-2xl mx-auto">
              <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-start gap-5">
                  {/* Photo */}
                  {audit.commercial.photo_url ? (
                    <Image
                      src={audit.commercial.photo_url}
                      alt={`${audit.commercial.first_name} ${audit.commercial.last_name}`}
                      width={72}
                      height={72}
                      className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full object-cover border-2 border-[#7928ca]/30 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {audit.commercial.first_name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">
                        {audit.commercial.first_name} {audit.commercial.last_name}
                      </h3>
                    </div>
                    <p className="text-[#7928ca] text-sm font-medium mb-3">
                      Votre conseiller iDkom
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {audit.commercial.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-14" />

        {/* Charts section */}
        <AuditScrollAnimator delay={0.1}>
          <div className="mb-14">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
              Vue d&apos;ensemble
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <AuditRadarChart categories={radarData} />
              </div>
              <div>
                <AuditBarChart categories={barData} />
              </div>
            </div>
          </div>
        </AuditScrollAnimator>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-14" />

        {/* Mini scores grid */}
        <AuditScrollAnimator delay={0.1}>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mb-14">
            {activeCategories.map((cat, i) => {
              const s = audit.scores[cat.key] ?? 0;
              const scoreColor = s >= 70 ? 'text-green-400' : s >= 40 ? 'text-yellow-400' : 'text-red-400';
              return (
                <div
                  key={cat.key}
                  className="audit-card bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 text-center backdrop-blur-sm"
                  style={{ '--card-delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <Icon icon={cat.icon} width={18} className="mx-auto mb-1" style={{ color: cat.color }} />
                  <p className={`text-xl font-bold ${scoreColor}`}>{s}</p>
                  <p className="text-xs text-zinc-600">{cat.label}</p>
                </div>
              );
            })}
          </div>
        </AuditScrollAnimator>

        {/* Screenshot */}
        {audit.screenshot_url && (
          <AuditScrollAnimator delay={0.1}>
            <div className="mb-14">
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden max-w-2xl mx-auto">
                <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <p className="text-xs text-zinc-500 font-mono ml-2 truncate">{audit.website_url}</p>
                </div>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={audit.screenshot_url}
                    alt={`Capture de ${audit.company_name || 'votre site'}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Detailed categories */}
        <AuditScrollAnimator delay={0.1}>
          <div className="mb-14">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
              Analyse détaillée
            </h2>
            <div className="space-y-4">
              {activeCategories.map((cat) => (
                <AuditCategory
                  key={cat.key}
                  label={cat.label}
                  icon={cat.icon}
                  score={audit.scores[cat.key] ?? 0}
                  items={audit.results[cat.key] ?? []}
                  color={cat.color}
                />
              ))}
            </div>
          </div>
        </AuditScrollAnimator>

        {/* AI Summary */}
        {audit.ai_summary && (
          <AuditScrollAnimator delay={0.1}>
            <div className="mb-14">
              <div className="relative bg-gradient-to-br from-[#7928ca]/8 via-[#ff2d55]/5 to-[#00d4ff]/8 border border-[#7928ca]/20 rounded-2xl p-8 md:p-10 overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#7928ca]/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#7928ca]/15 flex items-center justify-center">
                      <Icon icon="solar:magic-stick-3-linear" width={22} className="text-[#7928ca]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Notre analyse</h2>
                      <p className="text-xs text-zinc-500">Résumé personnalisé par iDkom</p>
                    </div>
                  </div>
                  <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {audit.ai_summary}
                  </div>
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Stand photos */}
        {(audit.stand_photo_url || audit.stand_simulation_url) && (
          <AuditScrollAnimator delay={0.1}>
            <div className="mb-14">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {audit.stand_simulation_url ? (
                    <>Votre stand, <span className="gradient-text">notre vision</span></>
                  ) : (
                    'Votre stand'
                  )}
                </h2>
                {audit.stand_simulation_url && (
                  <p className="text-zinc-500">Comment nous aurions pu améliorer votre espace.</p>
                )}
              </div>

              <div className={`grid gap-6 ${audit.stand_photo_url && audit.stand_simulation_url ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                {audit.stand_photo_url && (
                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-800/50">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Actuel</p>
                    </div>
                    <div className="relative aspect-video">
                      <Image
                        src={audit.stand_photo_url}
                        alt="Stand actuel"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                {audit.stand_simulation_url && (
                  <div className="bg-zinc-900/50 border border-[#7928ca]/30 rounded-2xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#7928ca]/20 bg-[#7928ca]/5">
                      <p className="text-xs text-[#7928ca] font-medium uppercase tracking-wider">Notre vision iDkom</p>
                    </div>
                    <div className="relative aspect-video">
                      <Image
                        src={audit.stand_simulation_url}
                        alt="Simulation stand"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Manager notes */}
        {audit.manager_notes && (
          <AuditScrollAnimator delay={0.1}>
            <div className="bg-gradient-to-br from-[#7928ca]/5 to-transparent border border-[#7928ca]/20 rounded-2xl p-6 mb-14">
              <div className="flex items-start gap-3">
                <Icon icon="solar:notes-linear" width={20} className="text-[#7928ca] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-2">Notes de notre expert</p>
                  <p className="text-zinc-400 leading-relaxed">{audit.manager_notes}</p>
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-14" />

        {/* CTA */}
        <AuditScrollAnimator delay={0.1}>
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-[#ff2d55]/5 via-[#7928ca]/5 to-[#00d4ff]/5 border border-zinc-800 rounded-2xl p-10 md:p-14 max-w-3xl mx-auto overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff2d55]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl" />

              <div className="relative">
                {scoreLevel === 'critique' ? (
                  <Icon icon="solar:danger-triangle-linear" className="text-red-400 mx-auto mb-4" width={44} />
                ) : scoreLevel === 'moyen' ? (
                  <Icon icon="solar:chart-2-linear" className="text-yellow-400 mx-auto mb-4" width={44} />
                ) : (
                  <Icon icon="solar:chat-round-dots-linear" className="text-[#7928ca] mx-auto mb-4" width={44} />
                )}

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {ctaTitle}
                </h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
                  {ctaText}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/rendez-vous"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg"
                  >
                    <Icon icon="solar:calendar-mark-linear" width={22} />
                    Prendre rendez-vous gratuit
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors"
                  >
                    <Icon icon="solar:global-linear" width={20} />
                    Découvrir iDkom
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AuditScrollAnimator>

        {/* Footer léger */}
        <div className="mt-16 text-center border-t border-zinc-800/50 pt-8">
          <p className="text-zinc-600 text-sm">
            Audit réalisé par <Link href="/" className="text-[#7928ca] hover:underline">iDkom</Link> — L&apos;Atelier Phygital
          </p>
          <p className="text-zinc-700 text-xs mt-1">www.idkom.fr</p>
        </div>
      </main>
    </>
  );
}
