import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getAuditByToken } from '@/lib/api';
import AmbientBackground from '@/components/AmbientBackground';
import AuditScore from '@/components/AuditScore';
import AuditCategory from '@/components/AuditCategory';

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
  ];

  const salonLabel = [audit.salon?.name, audit.salon?.date].filter(Boolean).join(' — ');

  return (
    <>
      <AmbientBackground />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] flex items-center justify-center font-bold text-white text-sm">
              iD
            </div>
            <span className="text-lg font-semibold text-white">iDkom</span>
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

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16">

        {/* Badge + Header */}
        <div className="text-center mb-12">
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

        {/* Score principal */}
        <div className="flex justify-center mb-12">
          <AuditScore score={audit.score_total} size={220} label="Score iDkom" />
        </div>

        {/* Mini scores grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {categories.map((cat) => {
            const s = audit.scores[cat.key];
            const scoreColor = s >= 70 ? 'text-green-400' : s >= 40 ? 'text-yellow-400' : 'text-red-400';
            return (
              <div key={cat.key} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 text-center backdrop-blur-sm">
                <Icon icon={cat.icon} width={18} className="mx-auto mb-1" style={{ color: cat.color }} />
                <p className={`text-xl font-bold ${scoreColor}`}>{s}</p>
                <p className="text-xs text-zinc-600">{cat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed categories */}
        <div className="space-y-4 mb-16">
          {categories.map((cat) => (
            <AuditCategory
              key={cat.key}
              label={cat.label}
              icon={cat.icon}
              score={audit.scores[cat.key]}
              items={audit.results[cat.key]}
              color={cat.color}
            />
          ))}
        </div>

        {/* Stand photos */}
        {(audit.stand_photo_url || audit.stand_simulation_url) && (
          <div className="mb-16">
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
        )}

        {/* Manager notes */}
        {audit.manager_notes && (
          <div className="bg-gradient-to-br from-[#7928ca]/5 to-transparent border border-[#7928ca]/20 rounded-2xl p-6 mb-16">
            <div className="flex items-start gap-3">
              <Icon icon="solar:notes-linear" width={20} className="text-[#7928ca] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium mb-2">Notes de notre expert</p>
                <p className="text-zinc-400 leading-relaxed">{audit.manager_notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#ff2d55]/5 via-[#7928ca]/5 to-[#00d4ff]/5 border border-zinc-800 rounded-2xl p-10 max-w-2xl mx-auto">
            <Icon icon="solar:chat-round-dots-linear" className="text-[#7928ca] mx-auto mb-4" width={40} />
            <h2 className="text-2xl font-bold text-white mb-3">
              Envie d&apos;aller plus loin ?
            </h2>
            <p className="text-zinc-400 mb-6">
              Nos experts peuvent vous aider à améliorer chaque aspect de votre présence digitale.
              Parlons-en lors d&apos;un rendez-vous gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Icon icon="solar:calendar-mark-linear" width={20} />
                Prendre rendez-vous
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <Icon icon="solar:global-linear" width={20} />
                Découvrir iDkom
              </Link>
            </div>
          </div>
        </div>

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
