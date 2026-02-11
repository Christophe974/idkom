'use client';

import { useEffect, useRef } from 'react';

interface Milestone {
  year: string;
  title: string;
  text: string;
  color: string; // hex color
  side: 'left' | 'right';
  isFinal?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '1996',
    title: 'Les débuts à Besançon',
    text: "Création de <strong class='text-zinc-300'>Krystal Communication</strong> (entreprise individuelle). À l'origine, notre métier est le graphisme : conception d'affiches, flyers et supports de communication pour des établissements locaux.",
    color: '#ff2d55',
    side: 'left',
  },
  {
    year: '1998',
    title: "Le digital avant l'heure",
    text: "Lancement de notre première <strong class='text-zinc-300'>plateforme d'envoi de SMS</strong> pour annoncer des soirées et événements. Mêler créativité et outils — c'est l'ADN d'iDkom qui se dessine.",
    color: '#ff2d55',
    side: 'right',
  },
  {
    year: 'Années 2000',
    title: "Une offre qui s'élargit",
    text: "Communication ciblée, newsletters, sites web, réseaux sociaux, signalétique, communication événementielle… L'accompagnement s'étend et <strong class='text-zinc-300'>l'événementiel prend une place centrale</strong>.",
    color: '#7928ca',
    side: 'left',
  },
  {
    year: '2004',
    title: "Naissance d'iDkom (SARL)",
    text: "Krystal Communication devient <strong class='text-zinc-300'>iDkom</strong>. Structuration forte : plus de projets, une organisation robuste, et une ambition claire — accompagner les marques avec une production fiable et une exécution maîtrisée.",
    color: '#7928ca',
    side: 'right',
  },
  {
    year: '2010',
    title: 'Accélération',
    text: "Augmentation de capital à <strong class='text-zinc-300'>60 000 €</strong>. Objectif : renforcer les moyens, développer l'outil de production et répondre à des dispositifs plus ambitieux.",
    color: '#7928ca',
    side: 'left',
  },
  {
    year: '2016',
    title: 'Premier très grand stand',
    text: "Un stand de <strong class='text-zinc-300'>120 m² pour CARECO</strong>. Gestion de volumes importants, coordination, fabrication, logistique — et une nouvelle exigence dans la mise en scène de marque.",
    color: '#00d4ff',
    side: 'right',
  },
  {
    year: '2017',
    title: "L'événementiel grande échelle",
    text: "Premier gros salon <strong class='text-zinc-300'>BIO360</strong>, qui confirme notre capacité à gérer des opérations d'envergure. Et l'achat de notre <strong class='text-zinc-300'>second bâtiment</strong> pour renforcer nos capacités de préparation, stockage et production.",
    color: '#00d4ff',
    side: 'left',
  },
  {
    year: "Aujourd'hui",
    title: "L'Atelier Phygital",
    text: "Nous concevons et produisons des <strong class='text-zinc-300'>stands modulaires BeMatrix</strong>, de la signalétique, et des <strong class='text-zinc-300'>expériences digitales interactives</strong>. Notre objectif reste le même depuis le premier jour : créer des présences qui attirent, engagent et marquent.",
    color: 'gradient',
    side: 'right',
    isFinal: true,
  },
];

function TimelineItem({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('timeline-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = milestone.side === 'left';
  const dotColor = milestone.isFinal
    ? 'bg-gradient-to-r from-[#ff2d55] to-[#00d4ff]'
    : '';

  return (
    <div
      ref={ref}
      className={`timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${index < milestones.length - 1 ? 'mb-16' : ''}`}
      data-side={milestone.side}
      style={{ '--item-color': milestone.color, '--item-delay': `${index * 0.05}s` } as React.CSSProperties}
    >
      {/* Content */}
      {isLeft ? (
        <>
          <div className="timeline-content md:text-right md:pr-12 pl-12 md:pl-0">
            <span className="timeline-year inline-block font-bold text-lg mb-1" style={{ color: milestone.color === 'gradient' ? undefined : milestone.color }}>
              {milestone.color === 'gradient' ? (
                <span className="gradient-text">{milestone.year}</span>
              ) : (
                milestone.year
              )}
            </span>
            <h3 className="timeline-title text-xl font-semibold text-white mt-1 mb-3">{milestone.title}</h3>
            <p className="timeline-text text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: milestone.text }} />
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="timeline-content md:pl-12 pl-12">
            <span className="timeline-year inline-block font-bold text-lg mb-1" style={{ color: milestone.color === 'gradient' ? undefined : milestone.color }}>
              {milestone.color === 'gradient' ? (
                <span className="gradient-text">{milestone.year}</span>
              ) : (
                milestone.year
              )}
            </span>
            <h3 className="timeline-title text-xl font-semibold text-white mt-1 mb-3">{milestone.title}</h3>
            <p className="timeline-text text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: milestone.text }} />
          </div>
        </>
      )}

      {/* Dot */}
      <div className={`timeline-dot absolute left-4 md:left-1/2 top-1 ${milestone.isFinal ? 'w-4 h-4' : 'w-3 h-3'} rounded-full ${dotColor} ring-4 ring-zinc-950`}
        style={{
          ...(milestone.isFinal ? {} : { backgroundColor: milestone.color }),
          marginLeft: milestone.isFinal ? '-8px' : '-6px',
        }}
      />
    </div>
  );
}

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add('timeline-line-grow');
          observer.unobserve(line);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mb-20">
      <div className="relative">
        {/* Ligne verticale animée */}
        <div
          ref={lineRef}
          className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
        />

        {/* Milestones */}
        {milestones.map((m, i) => (
          <TimelineItem key={m.year} milestone={m} index={i} />
        ))}
      </div>
    </div>
  );
}
