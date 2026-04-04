'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { usePartnerAuth } from './PartnerAuthProvider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface DashboardData {
  total_cards: number;
  claimed_cards: number;
  activated_cards: number;
  total_scans: number;
  activation_rate: number;
  recent_scans: {
    id: number;
    card_name: string;
    scanned_at: string;
    city: string | null;
  }[];
}

function StatCard({
  label,
  value,
  icon,
  color,
  subtitle,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon icon={icon} width={22} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value.toLocaleString('fr-FR')}</p>
      <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
      {subtitle && <p className="text-xs text-zinc-600 mt-1">{subtitle}</p>}
    </div>
  );
}

function CircularProgress({ value, size = 120 }: { value: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(value)}%</span>
        <span className="text-xs text-zinc-500">activation</span>
      </div>
    </div>
  );
}

export default function PartnerDashboard() {
  const { token, loading: authLoading, isAuthenticated } = usePartnerAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    async function fetchDashboard() {
      try {
        const res = await fetch(`${API_URL}/partner-portal.php?action=dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Erreur');
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [token, isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon icon="solar:danger-triangle-bold" width={28} className="text-red-400" />
          </div>
          <p className="text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Vue d&apos;ensemble de vos porte-cles connectes</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Porte-cles total"
          value={data.total_cards}
          icon="solar:key-bold"
          color="#ff2d55"
        />
        <StatCard
          label="Reclames"
          value={data.claimed_cards}
          icon="solar:hand-stars-bold"
          color="#7928ca"
        />
        <StatCard
          label="Actives"
          value={data.activated_cards}
          icon="solar:check-circle-bold"
          color="#00d4ff"
        />
        <StatCard
          label="Scans total"
          value={data.total_scans}
          icon="solar:qr-code-bold"
          color="#22c55e"
        />
      </div>

      {/* Activation rate + Recent scans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activation rate */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">Taux d&apos;activation</h3>
          <CircularProgress value={data.activation_rate} />
          <p className="text-xs text-zinc-600 mt-3">
            {data.activated_cards} sur {data.total_cards} porte-cles
          </p>
        </div>

        {/* Recent scans */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2">
            <Icon icon="solar:history-bold" width={16} />
            Scans recents
          </h3>

          {data.recent_scans.length === 0 ? (
            <div className="text-center py-8">
              <Icon icon="solar:qr-code-bold" width={40} className="text-zinc-700 mx-auto mb-2" />
              <p className="text-zinc-600 text-sm">Aucun scan pour le moment</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.recent_scans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <Icon icon="solar:qr-code-bold" width={16} className="text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{scan.card_name}</p>
                      {scan.city && (
                        <p className="text-xs text-zinc-600">{scan.city}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600">
                    {new Date(scan.scanned_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
