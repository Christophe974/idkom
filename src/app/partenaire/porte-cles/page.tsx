'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { usePartnerAuth } from '../PartnerAuthProvider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface KeychainCard {
  id: number;
  token: string;
  status: 'available' | 'claimed' | 'activated';
  owner_name: string;
  owner_email: string | null;
  owner_photo: string | null;
  view_count: number;
  created_at: string;
}

type StatusFilter = 'all' | 'available' | 'claimed' | 'activated';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  available: { label: 'Disponible', color: 'text-zinc-400', bg: 'bg-zinc-500/10', icon: 'solar:key-bold' },
  claimed: { label: 'Reclame', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: 'solar:hand-stars-bold' },
  activated: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500/10', icon: 'solar:check-circle-bold' },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.available;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.color} ${config.bg}`}>
      <Icon icon={config.icon} width={14} />
      {config.label}
    </span>
  );
}

export default function PorteClesPage() {
  const { token, loading: authLoading, isAuthenticated } = usePartnerAuth();
  const [cards, setCards] = useState<KeychainCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCards = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        action: 'cards',
        page: page.toString(),
        per_page: '12',
      });
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`${API_URL}/partner-portal.php?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || json.error || 'Erreur');

      setCards(json.data as KeychainCard[]);
      const pag = json.meta?.pagination;
      if (pag) {
        setTotalPages(pag.total_pages);
        setTotal(pag.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [token, page, search, statusFilter]);

  useEffect(() => {
    if (isAuthenticated) fetchCards();
  }, [isAuthenticated, fetchCards]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
      </div>
    );
  }

  const filterTabs: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'available', label: 'Disponible' },
    { value: 'claimed', label: 'Reclame' },
    { value: 'activated', label: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Porte-cles
            </span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">{total} porte-cles au total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Icon
            icon="solar:magnifer-bold"
            width={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                statusFilter === tab.value
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <Icon icon="solar:danger-triangle-bold" width={18} className="text-red-400" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Cards grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-4">
            <Icon icon="solar:key-bold" width={32} className="text-zinc-700" />
          </div>
          <p className="text-zinc-500 font-medium">Aucun porte-cle trouve</p>
          <p className="text-zinc-600 text-sm mt-1">Modifiez vos filtres de recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200 group"
            >
              {/* Header: photo + status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {card.owner_photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.owner_photo}
                      alt={card.owner_name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <Icon icon="solar:user-bold" width={20} className="text-zinc-600" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {card.status === 'available'
                        ? 'Non attribue'
                        : card.owner_name || 'Sans nom'}
                    </p>
                    <p className="text-zinc-600 text-xs truncate font-mono">{card.token.slice(0, 8)}...</p>
                  </div>
                </div>
                <StatusBadge status={card.status} />
              </div>

              {/* Info rows */}
              <div className="space-y-2">
                {card.owner_email && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Icon icon="solar:letter-bold" width={14} className="text-zinc-600 flex-shrink-0" />
                    <span className="truncate">{card.owner_email}</span>
                  </div>
                )}
              </div>

              {/* Footer: scans */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Icon icon="solar:qr-code-bold" width={14} className="text-zinc-600" />
                  <span>{card.view_count} scan{card.view_count > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icon icon="solar:arrow-left-linear" width={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | string)[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((item, i) =>
              typeof item === 'string' ? (
                <span key={`dots-${i}`} className="text-zinc-600 px-1">...</span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                    page === item
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ),
            )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icon icon="solar:arrow-right-linear" width={18} />
          </button>
        </div>
      )}
    </div>
  );
}
