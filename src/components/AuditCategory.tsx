'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import type { AuditDetail } from '@/lib/api';

interface AuditCategoryProps {
  label: string;
  icon: string;
  score: number;
  items: AuditDetail[];
  color: string;
}

export default function AuditCategory({ label, icon, score, items, color }: AuditCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scoreColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400';
  const scoreBg = score >= 70 ? 'bg-green-400/10' : score >= 40 ? 'bg-yellow-400/10' : 'bg-red-400/10';

  // Count issues
  const criticalCount = items.filter(i => i.severity === 'critical').length;
  const warningCount = items.filter(i => i.severity === 'warning').length;
  const goodCount = items.filter(i => i.severity === 'good').length;

  // Animate items when accordion opens
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const els = listRef.current.querySelectorAll('.audit-item');
    els.forEach((el, i) => {
      (el as HTMLElement).style.setProperty('--item-delay', `${i * 0.06}s`);
      requestAnimationFrame(() => el.classList.add('audit-item-visible'));
    });
  }, [isOpen]);

  if (items.length === 0) return null;

  return (
    <div
      className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm"
      style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon icon={icon} width={20} style={{ color }} />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">{label}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {criticalCount > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-red-400">
                  <Icon icon="solar:close-circle-bold" width={12} />
                  {criticalCount}
                </span>
              )}
              {warningCount > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-yellow-400">
                  <Icon icon="solar:danger-triangle-bold" width={12} />
                  {warningCount}
                </span>
              )}
              {goodCount > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-green-400">
                  <Icon icon="solar:check-circle-bold" width={12} />
                  {goodCount}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Mini progress bar */}
          <div className="hidden sm:block w-20 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${score}%`,
                background: score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444',
              }}
            />
          </div>
          <div className={`${scoreBg} px-3 py-1 rounded-lg`}>
            <span className={`text-xl font-bold ${scoreColor}`}>{score}</span>
            <span className="text-zinc-500 text-xs">/100</span>
          </div>
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={18}
            className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Details */}
      {isOpen && (
        <div ref={listRef} className="px-5 pb-5 space-y-2">
          {items.map((item, i) => {
            const sevIcon = item.severity === 'good'
              ? 'solar:check-circle-bold'
              : item.severity === 'warning'
              ? 'solar:danger-triangle-bold'
              : 'solar:close-circle-bold';
            const sevColor = item.severity === 'good'
              ? 'text-green-400'
              : item.severity === 'warning'
              ? 'text-yellow-400'
              : 'text-red-400';
            const sevBg = item.severity === 'good'
              ? 'bg-green-400/5'
              : item.severity === 'warning'
              ? 'bg-yellow-400/5'
              : 'bg-red-400/5';

            return (
              <div key={i} className={`audit-item ${sevBg} rounded-xl overflow-hidden`}>
                <div className="flex items-start gap-3 p-3">
                  <Icon icon={sevIcon} width={18} className={`${sevColor} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-white font-medium">{item.label}</p>
                      <p className={`text-sm ${sevColor} shrink-0 font-semibold`}>{item.value}</p>
                    </div>
                    {item.description && (
                      <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                    )}
                    {/* Score mini bar */}
                    <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.score}%`,
                          background: item.severity === 'good' ? '#22c55e' : item.severity === 'warning' ? '#eab308' : '#ef4444',
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Recommendation */}
                {item.recommendation && (
                  <div className="mx-3 mb-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                    <div className="flex items-start gap-2">
                      <Icon icon="solar:lightbulb-bolt-linear" width={16} className="text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-300 leading-relaxed">{item.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
