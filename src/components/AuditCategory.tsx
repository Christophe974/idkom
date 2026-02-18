'use client';

import { useState } from 'react';
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

  const scoreColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400';
  const scoreBg = score >= 70 ? 'bg-green-400/10' : score >= 40 ? 'bg-yellow-400/10' : 'bg-red-400/10';

  if (items.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
            <Icon icon={icon} width={20} style={{ color }} />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">{label}</p>
            <p className="text-xs text-zinc-500">{items.length} critère{items.length > 1 ? 's' : ''} analysé{items.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`${scoreBg} px-3 py-1 rounded-lg`}>
            <span className={`text-xl font-bold ${scoreColor}`}>{score}</span>
            <span className="text-zinc-500 text-xs">/100</span>
          </div>
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={18}
            className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Details */}
      {isOpen && (
        <div className="px-5 pb-5 space-y-2">
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

            return (
              <div key={i} className="flex items-start gap-3 p-3 bg-zinc-800/40 rounded-xl">
                <Icon icon={sevIcon} width={18} className={`${sevColor} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-white font-medium">{item.label}</p>
                    <p className={`text-sm ${sevColor} shrink-0`}>{item.value}</p>
                  </div>
                  {item.description && (
                    <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
