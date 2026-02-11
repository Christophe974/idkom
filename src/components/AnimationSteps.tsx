'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { AnimationStep } from '@/lib/api';
import MarkdownContent from './MarkdownContent';

const glowColors = ['glow-pink', 'glow-purple', 'glow-cyan'];
const accentColors = ['#ff2d55', '#7928ca', '#00d4ff'];

function StepItem({ step, index, total }: { step: AnimationStep; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 !== 0;
  const colorIndex = index % 3;
  const accentColor = accentColors[colorIndex];
  const glowClass = glowColors[colorIndex];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('step-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`step-item relative ${index < total - 1 ? 'mb-20 md:mb-28' : ''}`}
      data-direction={isReversed ? 'reversed' : 'normal'}
      style={{ '--step-delay': `${index * 0.1}s`, '--accent': accentColor } as React.CSSProperties}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${isReversed ? 'md:direction-reversed' : ''}`}>
        {/* Text side */}
        <div className={`step-text ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
          {/* Step number */}
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-6xl md:text-7xl font-black gradient-text opacity-30"
              style={{ lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent" />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>

          {/* Description (markdown) */}
          {step.description && (
            <div className="text-zinc-400 leading-relaxed">
              <MarkdownContent content={step.description} />
            </div>
          )}
        </div>

        {/* Photos side */}
        <div className={`step-photos ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
          {step.photos.length === 1 && (
            <div className={`relative ${glowClass} rounded-2xl overflow-hidden`}>
              <div className="relative gradient-border rounded-2xl overflow-hidden">
                <img
                  src={step.photos[0].url}
                  alt={step.photos[0].alt || step.title}
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                />
              </div>
            </div>
          )}
          {step.photos.length === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {step.photos.map((photo, i) => (
                <div key={i} className={`relative ${glowColors[(colorIndex + i) % 3]} rounded-2xl overflow-hidden`}>
                  <div className="relative gradient-border rounded-2xl overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt || `${step.title} - ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {step.photos.length >= 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className={`col-span-2 relative ${glowColors[colorIndex]} rounded-2xl overflow-hidden`}>
                <div className="relative gradient-border rounded-2xl overflow-hidden">
                  <img
                    src={step.photos[0].url}
                    alt={step.photos[0].alt || `${step.title} - 1`}
                    className="w-full aspect-video object-cover rounded-2xl"
                  />
                </div>
              </div>
              {step.photos.slice(1, 3).map((photo, i) => (
                <div key={i} className={`relative ${glowColors[(colorIndex + i + 1) % 3]} rounded-2xl overflow-hidden`}>
                  <div className="relative gradient-border rounded-2xl overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt || `${step.title} - ${i + 2}`}
                      className="w-full aspect-square object-cover rounded-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {step.photos.length === 0 && (
            <div className={`relative ${glowClass} rounded-2xl`}>
              <div className="relative gradient-border rounded-2xl bg-zinc-900 aspect-[4/3] flex items-center justify-center">
                <Icon icon="solar:camera-linear" className="text-zinc-700" width={48} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connector line between steps */}
      {index < total - 1 && (
        <div className="step-connector hidden md:flex items-center justify-center mt-12 md:mt-16">
          <div className="w-px h-12 bg-gradient-to-b from-zinc-700 to-transparent" />
          <div className="absolute w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-700" style={{ marginTop: '48px' }} />
        </div>
      )}
    </div>
  );
}

export default function AnimationSteps({ steps }: { steps: AnimationStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add('steps-line-grow');
          observer.unobserve(line);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  if (!steps || steps.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical connecting line */}
      <div
        ref={lineRef}
        className="steps-line absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
      />

      {/* Steps */}
      {steps.map((step, index) => (
        <StepItem key={step.id} step={step} index={index} total={steps.length} />
      ))}
    </div>
  );
}
