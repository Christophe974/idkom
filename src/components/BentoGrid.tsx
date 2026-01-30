'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import Counter from './Counter';
import type { HomepageData } from '@/lib/api';

interface BentoGridProps {
  data: HomepageData;
}

export default function BentoGrid({ data }: BentoGridProps) {
  const { site, stats, featured_projets, testimonials, categories } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '140px' }}>
      {/* HERO - 2x3 */}
      <div className="md:col-span-2 row-span-3 bento-card rounded-3xl p-8 bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/5 to-transparent backdrop-blur-sm border border-white/10 relative gradient-border animate-fade-in-up">
        <div className="h-full flex flex-col justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Atelier créatif depuis 1994
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-4">
              L&apos;Atelier<br />
              <span className="gradient-text">Phygital</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
              {site.description.split('.')[0]}.
              <strong className="text-zinc-300"> Des outils, du terrain, et des idées qui marchent.</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/atelier"
              className="group px-6 py-2.5 rounded-full gradient-bg font-medium text-sm text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
            >
              Découvrir l&apos;atelier
              <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={16} />
            </Link>
            <Link
              href="/realisations"
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 font-medium text-sm text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
            >
              <Icon icon="solar:play-circle-linear" className="mr-2" width={18} />
              Voir les projets
            </Link>
          </div>
        </div>
      </div>

      {/* Stat 1 - Années */}
      <div className="bento-card rounded-3xl p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/10 glow-pink animate-fade-in-up delay-100">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <Counter target={stats.years} className="text-5xl font-bold gradient-text" />
          <span className="text-xl gradient-text font-bold">+</span>
          <span className="text-zinc-500 text-sm mt-1">années terrain</span>
        </div>
      </div>

      {/* Stat 2 - Projets */}
      <div className="bento-card rounded-3xl p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/10 glow-purple animate-fade-in-up delay-200">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <Counter target={stats.projects} className="text-5xl font-bold gradient-text" />
          <span className="text-xl gradient-text font-bold">+</span>
          <span className="text-zinc-500 text-sm mt-1">projets montés</span>
        </div>
      </div>

      {/* Service 1 - Stands */}
      <div className="row-span-2 bento-card rounded-3xl p-6 bg-zinc-900/30 backdrop-blur-sm border border-white/10 group animate-fade-in-up delay-300">
        <Link href="/savoir-faire#stands" className="h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center mb-4 group-hover:bg-[#ff2d55] group-hover:border-[#ff2d55] transition-all duration-300">
            <Icon icon="solar:buildings-3-linear" className="text-[#ff2d55] group-hover:text-white transition-colors" width={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Stands BeMatrix</h3>
          <p className="text-zinc-500 text-sm flex-grow leading-relaxed">
            Conception, fabrication et montage de stands modulaires haut de gamme. Partenaire officiel.
          </p>
          <div className="flex items-center text-[#ff2d55] text-sm font-medium mt-4 group-hover:gap-3 gap-2 transition-all">
            En savoir plus
            <Icon icon="solar:arrow-right-linear" width={16} />
          </div>
        </Link>
      </div>

      {/* Service 2 - Digital */}
      <div className="row-span-2 bento-card rounded-3xl p-6 bg-zinc-900/30 backdrop-blur-sm border border-white/10 group animate-fade-in-up delay-400">
        <Link href="/savoir-faire#digital" className="h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center mb-4 group-hover:bg-[#7928ca] group-hover:border-[#7928ca] transition-all duration-300">
            <Icon icon="solar:monitor-smartphone-linear" className="text-[#7928ca] group-hover:text-white transition-colors" width={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Solutions Digitales</h3>
          <p className="text-zinc-500 text-sm flex-grow leading-relaxed">
            Écrans interactifs, bornes tactiles, applications événementielles sur-mesure.
          </p>
          <div className="flex items-center text-[#7928ca] text-sm font-medium mt-4 group-hover:gap-3 gap-2 transition-all">
            En savoir plus
            <Icon icon="solar:arrow-right-linear" width={16} />
          </div>
        </Link>
      </div>

      {/* Video Showcase - 2x2 */}
      <div className="md:col-span-2 row-span-2 bento-card rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 group cursor-pointer animate-fade-in-up delay-300">
        <Link href={`/realisations/${featured_projets[0]?.slug || ''}`} className="relative h-full w-full block">
          {/* Background image or fallback */}
          {featured_projets[0]?.image?.url ? (
            <img
              src={featured_projets[0].image.url}
              alt={featured_projets[0].image.alt || featured_projets[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/80">
              <div className="absolute inset-0 bg-grid opacity-50"></div>
            </div>
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
              <Icon icon="solar:play-bold" className="text-white ml-1" width={32} />
            </div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>

          {/* Project info */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Projet phare 2025</span>
              <h4 className="text-xl font-semibold text-white mt-1">{featured_projets[0]?.title || 'BIO360 — Nantes'}</h4>
              <p className="text-zinc-300 text-sm">
                {featured_projets[0]?.stats?.stands && `${featured_projets[0].stats.stands} stands • `}
                {featured_projets[0]?.stats?.visiteurs && `${featured_projets[0].stats.visiteurs.toLocaleString()} visiteurs`}
              </p>
            </div>
            <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/10 rounded-full text-xs text-zinc-300">
              Voir le projet
            </span>
          </div>
        </Link>
      </div>

      {/* Stat 3 - Clients */}
      <div className="bento-card rounded-3xl p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/10 glow-cyan animate-fade-in-up delay-400">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <Counter target={stats.clients} className="text-5xl font-bold gradient-text" />
          <span className="text-xl gradient-text font-bold">+</span>
          <span className="text-zinc-500 text-sm mt-1">clients fidèles</span>
        </div>
      </div>

      {/* Service 3 - Events */}
      <div className="bento-card rounded-3xl p-6 bg-zinc-900/30 backdrop-blur-sm border border-white/10 group animate-fade-in-up delay-500">
        <Link href="/savoir-faire#events" className="h-full flex flex-col justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mb-3 group-hover:bg-[#00d4ff] group-hover:border-[#00d4ff] transition-all duration-300">
            <Icon icon="solar:calendar-mark-linear" className="text-[#00d4ff] group-hover:text-white transition-colors" width={22} />
          </div>
          <h3 className="text-lg font-semibold text-white">Événementiel</h3>
          <p className="text-zinc-500 text-xs mt-1">Logistique clé en main</p>
        </Link>
      </div>

      {/* Témoignage - 2x1 */}
      {testimonials[0] && (
        <div className="md:col-span-2 bento-card rounded-3xl p-6 bg-zinc-900/30 backdrop-blur-sm border border-white/10 animate-fade-in-up delay-400">
          <div className="h-full flex flex-col justify-center">
            <Icon icon="solar:chat-square-like-linear" className="text-zinc-600 mb-3" width={28} />
            <p className="text-zinc-300 italic text-lg leading-relaxed">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              {testimonials[0].author.avatar ? (
                <img
                  src={testimonials[0].author.avatar}
                  alt={testimonials[0].author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">
                  {testimonials[0].author.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-white">{testimonials[0].author.name}</p>
                <p className="text-xs text-zinc-500">{testimonials[0].author.role} — {testimonials[0].author.company}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Configurateur */}
      <Link
        href="/configurateur"
        className="bento-card rounded-3xl p-6 gradient-bg group cursor-pointer animate-fade-in-up delay-500 hover:shadow-xl hover:shadow-[#7928ca]/20"
      >
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Icon icon="solar:tuning-2-linear" className="text-white" width={24} />
          </div>
          <span className="font-semibold text-white">Configurer mon stand</span>
          <span className="text-xs text-white/70 mt-1">Estimation instantanée</span>
        </div>
      </Link>

      {/* Partenaire BeMatrix */}
      <div className="bento-card rounded-3xl p-6 bg-zinc-900/30 backdrop-blur-sm border border-white/10 animate-fade-in-up delay-600 group">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Partenaire officiel</span>
          <div className="text-2xl font-bold text-zinc-400 group-hover:text-white transition-colors">BeMatrix</div>
          <span className="text-xs text-zinc-600 mt-1">Système modulaire premium</span>
        </div>
      </div>
    </div>
  );
}
