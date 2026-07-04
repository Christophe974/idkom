'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demo } from './data';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function scoreColor(s: number) {
  if (s >= 70) return '#22c55e';
  if (s >= 50) return '#eab308';
  if (s >= 35) return '#f97316';
  return '#ff2d55';
}

// Compteur animé déclenché au scroll
function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  end: number,
  { decimals = 0, prefix = '', suffix = '', duration = 1.6 } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${obj.v.toLocaleString('fr-FR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, end, decimals, prefix, suffix, duration]);
}

/* ------------------------------------------------------------------ */
/* Jauge de score principale                                          */
/* ------------------------------------------------------------------ */

function ScoreGauge({ score, size = 240 }: { score: number; size?: number }) {
  const r = size / 2 - 18;
  const c = 2 * Math.PI * r;
  const arcRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const color = scoreColor(score);

  useEffect(() => {
    const arc = arcRef.current;
    const num = numRef.current;
    if (!arc || !num) return;
    gsap.set(arc, { strokeDasharray: c, strokeDashoffset: c });
    const obj = { v: 0 };
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(arc, { strokeDashoffset: c - (c * score) / 100, duration: 2, ease: 'power3.out' }, 0);
    tl.to(
      obj,
      {
        v: score,
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => { num.textContent = Math.round(obj.v).toString(); },
      },
      0
    );
    return () => { tl.kill(); };
  }, [c, score]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#27272a" strokeWidth={14} />
        <circle
          ref={arcRef}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 14px ${color}aa)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-end">
          <div ref={numRef} className="text-6xl font-bold tabular-nums" style={{ color }}>0</div>
          <span className="text-2xl font-semibold text-zinc-500 mb-1.5">/100</span>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 mt-1">Score iDkom</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radar                                                              */
/* ------------------------------------------------------------------ */

function Radar({ data }: { data: typeof demo.radar }) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 50;
  const n = data.length;
  const polyRef = useRef<SVGPolygonElement>(null);
  const wrapRef = useRef<SVGSVGElement>(null);

  const point = (i: number, ratio: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * maxR * ratio, cy + Math.sin(angle) * maxR * ratio];
  };

  const dataPoints = data.map((d, i) => point(i, d.score / 100));
  const polyStr = dataPoints.map((p) => p.join(',')).join(' ');

  useEffect(() => {
    const poly = polyRef.current;
    const wrap = wrapRef.current;
    if (!poly || !wrap) return;
    gsap.fromTo(
      poly,
      { scale: 0, transformOrigin: 'center', opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
      }
    );
    return () => { ScrollTrigger.getById('radar')?.kill(); };
  }, []);

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg ref={wrapRef} width={size} height={size} className="overflow-visible">
      {rings.map((ring, i) => (
        <polygon
          key={i}
          points={data.map((_, idx) => point(idx, ring).join(',')).join(' ')}
          fill="none"
          stroke="#27272a"
          strokeWidth={1}
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#27272a" strokeWidth={1} />;
      })}
      <polygon ref={polyRef} points={polyStr} fill="rgba(121,40,202,0.25)" stroke="#7928ca" strokeWidth={2} />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill={data[i].color} />
      ))}
      {data.map((d, i) => {
        const [x, y] = point(i, 1.22);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-400"
            style={{ fontSize: 10, fontWeight: 600 }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Barre de score animée                                              */
/* ------------------------------------------------------------------ */

function ScoreBar({ score, color, delay = 0 }: { score: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { width: '0%' },
      {
        width: `${score}%`, duration: 1.3, ease: 'power3.out', delay,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
  }, [score, delay]);
  return (
    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
      <div ref={ref} className="h-full rounded-full" style={{ background: color, width: 0 }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper (reveal au scroll)                                 */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Compteur                                                           */
/* ------------------------------------------------------------------ */

function Stat({ item }: { item: (typeof demo.constat)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  useCountUp(ref, item.value, {
    decimals: item.decimals,
    prefix: item.prefix ?? '',
    suffix: item.suffix ?? '',
  });
  const toneColor = item.tone === 'bad' ? '#ff2d55' : '#f97316';
  return (
    <Reveal className="relative rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-6 backdrop-blur-sm">
      <div
        className="absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${toneColor}1a` }}
      >
        <Icon icon={item.icon} width={20} style={{ color: toneColor }} />
      </div>
      <div ref={ref} className="text-4xl font-bold tabular-nums" style={{ color: toneColor }}>0</div>
      <div className="mt-2 text-sm font-medium text-white">{item.label}</div>
      <div className="mt-1 text-xs text-zinc-500">{item.sub}</div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function AuditDemoClient() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [openCat, setOpenCat] = useState<string | null>(demo.dimensions[0].key);

  // Barre de progression de lecture
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const maxComp = Math.max(...demo.competitors.map((c) => c.score));

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* glows ambiants */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-0 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,85,0.16), transparent 70%)' }} />
        <div className="absolute -right-24 top-[40%] w-[460px] h-[460px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(121,40,202,0.16), transparent 70%)' }} />
        <div className="absolute left-1/3 bottom-0 w-[420px] h-[420px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)' }} />
      </div>

      {/* barre de progression */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:py-20">

        {/* ---------- 1. HERO ---------- */}
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7928ca]/30 bg-[#7928ca]/10 px-4 py-1.5 text-xs font-medium text-[#c084fc]">
            <Icon icon="solar:wad-of-money-linear" width={15} />
            Audit offert · {demo.salon}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">{demo.company}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            <Icon icon="solar:global-linear" width={14} className="inline mr-1" />
            {demo.url} · {demo.sector}
          </p>

          <div className="mt-10 flex justify-center">
            <ScoreGauge score={demo.scoreTotal} />
          </div>

          <p className="mx-auto mt-10 max-w-xl text-2xl sm:text-3xl font-bold leading-snug">
            <span className="bg-gradient-to-r from-[#ff2d55] to-[#7928ca] bg-clip-text text-transparent">
              {demo.verdict}
            </span>
          </p>
          <p className="mt-4 text-sm text-zinc-500">Faites défiler — on vous montre tout 👇</p>
        </Reveal>

        {/* ---------- 2. LE CONSTAT ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Le constat</h2>
            <p className="mt-2 text-center text-2xl font-bold">3 chiffres qui parlent</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {demo.constat.map((c, i) => <Stat key={i} item={c} />)}
          </div>
        </section>

        {/* ---------- 3. RADAR ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Vue d’ensemble</h2>
            <p className="mt-2 text-center text-2xl font-bold">Vos 7 piliers web passés au crible</p>
          </Reveal>
          <Reveal className="mt-6 flex flex-col items-center gap-8 rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-8 backdrop-blur-sm sm:flex-row sm:justify-around">
            <Radar data={demo.radar} />
            <div className="grid w-full max-w-xs gap-3">
              {demo.radar.map((d) => (
                <div key={d.key} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs text-zinc-400">{d.label}</span>
                  <ScoreBar score={d.score} color={d.color} />
                  <span className="w-8 text-right text-xs font-bold tabular-nums" style={{ color: scoreColor(d.score) }}>
                    {d.score}
                  </span>
                </div>
              ))}
              {/* Nutri-Score éco */}
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff2d55] text-xl font-black text-white">
                  {demo.ecoGrade.grade}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{demo.ecoGrade.label}</p>
                  <p className="text-[11px] text-zinc-500">{demo.ecoGrade.sub}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- 4. TOP 3 PROBLÈMES ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Priorités</h2>
            <p className="mt-2 text-center text-2xl font-bold">Les 3 problèmes qui vous coûtent le plus</p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {demo.topIssues.map((issue, i) => {
              const sevColor = issue.severity === 'critique' ? '#ff2d55' : '#f97316';
              return (
                <Reveal key={i} className="overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 border-b border-zinc-800/60 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${sevColor}1a` }}>
                      <Icon icon={issue.icon} width={22} style={{ color: sevColor }} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: sevColor }}>{issue.severity}</span>
                      <h3 className="text-lg font-semibold leading-tight">{issue.title}</h3>
                    </div>
                    <span className="text-2xl font-bold text-zinc-700">#{i + 1}</span>
                  </div>
                  <div className="grid gap-px bg-zinc-800/60 sm:grid-cols-3">
                    {[
                      { t: 'Ce qu’on voit', v: issue.seen, ic: 'solar:eye-linear', col: '#a1a1aa' },
                      { t: 'Ce que ça coûte', v: issue.cost, ic: 'solar:graph-down-linear', col: '#ff2d55' },
                      { t: 'Le correctif', v: issue.fix, ic: 'solar:check-circle-linear', col: '#22c55e' },
                    ].map((b, j) => (
                      <div key={j} className="bg-zinc-900/60 p-4">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
                          style={{ color: b.col }}>
                          <Icon icon={b.ic} width={13} /> {b.t}
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-400">{b.v}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---------- 4b. SPOTLIGHT H1 ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Sémantique</h2>
            <p className="mt-2 text-center text-2xl font-bold">Le titre que Google lit en premier</p>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-zinc-500">
              C’est l’enseigne de votre vitrine en ligne. Voici le vôtre, mot pour mot.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-[#ff2d55]/30 bg-[#ff2d55]/5 p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#ff2d55]">
                <Icon icon="solar:close-circle-bold" width={16} /> Aujourd’hui
              </div>
              <p className="text-xl font-bold text-white">“{demo.h1Spotlight.current}”</p>
              <ul className="mt-4 space-y-2">
                {demo.h1Spotlight.problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Icon icon="solar:minus-circle-linear" width={15} className="mt-0.5 shrink-0 text-[#ff2d55]" />{p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-green-400">
                <Icon icon="solar:check-circle-bold" width={16} /> Ce qu’on propose
              </div>
              <p className="text-xl font-bold text-white">“{demo.h1Spotlight.ideal}”</p>
              <ul className="mt-4 space-y-2">
                {demo.h1Spotlight.idealPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Icon icon="solar:check-circle-linear" width={15} className="mt-0.5 shrink-0 text-green-400" />{p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- 4c. COMMENT ON VOUS VOIT (Google + partage) ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Première impression</h2>
            <p className="mt-2 text-center text-2xl font-bold">Comment Google et vos clients vous voient</p>
          </Reveal>

          {/* Résultat Google */}
          <Reveal className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <Icon icon="logos:google-icon" width={14} /> Votre résultat dans Google
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {/* avant */}
              <div className="rounded-xl bg-white p-4">
                <div className="text-[11px] text-[#202124]/70">{demo.googlePreview.before.url}</div>
                <div className="text-lg leading-tight text-[#1a0dab]">{demo.googlePreview.before.title}</div>
                <div className="mt-1 text-[13px] leading-snug text-[#4d5156]">{demo.googlePreview.before.desc}</div>
                <div className="mt-2 inline-flex items-center gap-1 rounded bg-[#ff2d55]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ff2d55]">Aujourd’hui — pas d’étoiles, titre vide</div>
              </div>
              {/* après */}
              <div className="rounded-xl bg-white p-4 ring-2 ring-green-500/40">
                <div className="text-[11px] text-[#202124]/70">{demo.googlePreview.after.url}</div>
                <div className="text-lg leading-tight text-[#1a0dab]">{demo.googlePreview.after.title}</div>
                <div className="mt-1 flex items-center gap-1 text-[12px] text-[#4d5156]">
                  <span className="font-bold text-[#e7711b]">{demo.googlePreview.after.rating}</span>
                  <span className="text-[#fbbc04]">★★★★★</span>
                  <span className="text-[#70757a]">{demo.googlePreview.after.reviews}</span>
                </div>
                <div className="mt-1 text-[13px] leading-snug text-[#4d5156]">{demo.googlePreview.after.desc}</div>
                <div className="mt-2 inline-flex items-center gap-1 rounded bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-600">Avec iDkom — étoiles + titre vendeur</div>
              </div>
            </div>
          </Reveal>

          {/* Aperçu de partage */}
          <Reveal className="mt-4 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <Icon icon="solar:chat-round-line-linear" width={15} /> Quand on partage votre lien (WhatsApp, Facebook…)
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {/* avant : vignette grise */}
              <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
                <div className="flex h-28 items-center justify-center bg-zinc-700/60 text-zinc-500">
                  <Icon icon="solar:gallery-remove-linear" width={32} />
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase text-zinc-500">{demo.sharePreview.before.domain}</div>
                  <div className="text-sm font-medium text-zinc-300">{demo.sharePreview.before.title}</div>
                  <p className="mt-1 text-[11px] text-[#ff2d55]">{demo.sharePreview.before.note}</p>
                </div>
              </div>
              {/* après : belle vignette */}
              <div className="overflow-hidden rounded-xl border border-green-500/40 bg-zinc-800">
                <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-[#7928ca] via-[#ff2d55] to-[#f97316]">
                  <Icon icon="solar:welding-bold" width={36} className="text-white/90" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase text-zinc-500">{demo.sharePreview.after.domain}</div>
                  <div className="text-sm font-medium text-zinc-200">{demo.sharePreview.after.title}</div>
                  <div className="text-[11px] text-zinc-400">{demo.sharePreview.after.desc}</div>
                  <p className="mt-1 text-[11px] text-green-400">{demo.sharePreview.after.note}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- 5. ANALYSE DÉTAILLÉE ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Le détail</h2>
            <p className="mt-2 text-center text-2xl font-bold">10 dimensions passées au crible</p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {demo.dimensions.map((cat) => {
              const open = openCat === cat.key;
              return (
                <Reveal key={cat.key} className="overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900/50 backdrop-blur-sm">
                  <button
                    onClick={() => setOpenCat(open ? null : cat.key)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <Icon icon={cat.icon} width={22} style={{ color: cat.color }} />
                    <span className="flex-1 font-semibold">{cat.label}</span>
                    <span className="text-lg font-bold tabular-nums" style={{ color: scoreColor(cat.score) }}>
                      {cat.score}
                    </span>
                    <div className="w-20"><ScoreBar score={cat.score} color={cat.color} /></div>
                    <Icon icon="solar:alt-arrow-down-linear" width={18}
                      className={`text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2 border-t border-zinc-800/60 p-5">
                        {cat.items.map((it, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Icon
                              icon={it.ok ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                              width={18}
                              className={`mt-0.5 shrink-0 ${it.ok ? 'text-green-500' : 'text-[#ff2d55]'}`}
                            />
                            <div>
                              <p className="text-sm font-medium text-white">{it.label}</p>
                              <p className="text-xs text-zinc-500">{it.detail}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---------- 6. VOUS VS CONCURRENTS ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">Comparatif</h2>
            <p className="mt-2 text-center text-2xl font-bold">Vous face à vos concurrents</p>
          </Reveal>
          <Reveal className="mt-8 space-y-4 rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-6 backdrop-blur-sm">
            {demo.competitors.map((c, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className={c.you ? 'font-bold text-[#ff2d55]' : 'text-zinc-400'}>
                    {c.you && <Icon icon="solar:map-arrow-down-bold" width={14} className="mr-1 inline" />}
                    {c.name}
                  </span>
                  <span className="font-bold tabular-nums" style={{ color: c.you ? '#ff2d55' : '#a1a1aa' }}>
                    {c.score}
                  </span>
                </div>
                <ScoreBar score={(c.score / maxComp) * 100} color={c.you ? '#ff2d55' : '#71717a'} delay={i * 0.1} />
              </div>
            ))}
            <p className="pt-2 text-center text-xs text-zinc-500">
              Vos concurrents captent les clients que vous laissez filer.
            </p>
          </Reveal>
        </section>

        {/* ---------- 7. MANQUE À GAGNER ---------- */}
        <section className="mt-24">
          <Reveal className="relative overflow-hidden rounded-3xl border border-[#ff2d55]/25 bg-gradient-to-br from-[#ff2d55]/10 via-zinc-900/40 to-[#7928ca]/10 p-8 text-center backdrop-blur-sm">
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#ff2d55]/15 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.25em] text-zinc-400">Estimation du manque à gagner</p>
            <RevenueNumber value={demo.revenueLoss.monthly} />
            <p className="relative text-sm text-zinc-400">par mois</p>
            <div className="relative mx-auto mt-6 grid max-w-md gap-2 text-left">
              {demo.revenueLoss.breakdown.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-zinc-900/50 px-4 py-2.5 text-sm">
                  <span className="text-zinc-400">{b.label}</span>
                  <span className="font-semibold text-[#ff2d55]">{b.value}</span>
                </div>
              ))}
            </div>
            <p className="relative mx-auto mt-5 max-w-md text-xs text-zinc-500">{demo.revenueLoss.note}</p>
          </Reveal>
        </section>

        {/* ---------- 8. PLAN D'ACTION ---------- */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500">La solution</h2>
            <p className="mt-2 text-center text-2xl font-bold">Notre plan d’action iDkom</p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {demo.plan.map((p, i) => (
              <Reveal key={i} className="flex gap-4 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-5 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7928ca] to-[#00d4ff]">
                    <Icon icon={p.icon} width={24} className="text-white" />
                  </div>
                  {i < demo.plan.length - 1 && <div className="mt-2 w-px flex-1 bg-zinc-800" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#00d4ff]">{p.phase}</span>
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">{p.delay}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                  <ul className="mt-2 space-y-1">
                    {p.items.map((it, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                        <Icon icon="solar:check-circle-bold" width={15} className="text-[#00d4ff]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- 9. CTA + COMMERCIAL ---------- */}
        <section className="mt-24">
          <Reveal className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-7 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-xl font-bold">
                {demo.commercial.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{demo.commercial.name}</h3>
                <p className="text-sm text-[#c084fc]">{demo.commercial.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{demo.commercial.bio}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-8 text-center">
            <h2 className="text-2xl font-bold">On en discute 15 minutes ?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Sans engagement. On vous explique comment transformer ce score en chantiers signés.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              >
                <Icon icon="solar:calendar-mark-linear" width={18} />
                Prendre rendez-vous
              </Link>
              <a
                href="tel:+33000000000"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
              >
                <Icon icon="solar:phone-rounded-linear" width={18} />
                Nous appeler
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-12 flex items-center justify-center gap-3 text-center text-xs text-zinc-600">
            <Icon icon="solar:tag-horizontal-linear" width={16} />
            Audit gravé sur votre porte-clé NFC iDkom — gardez-le, partagez-le.
          </Reveal>
        </section>
      </div>
    </div>
  );
}

function RevenueNumber({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useCountUp(ref, value, { prefix: '− ', suffix: ' €', duration: 2.2 });
  return (
    <div ref={ref} className="relative my-2 text-5xl font-bold tabular-nums text-[#ff2d55] sm:text-6xl">
      − 0 €
    </div>
  );
}
