'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Piece {
  id: number;
  reference: string;
  designation: string;
  categorie: string | null;
  image: string | null;
  quantite: number;
  statut: 'stock' | 'faible' | 'rupture';
  dimensions: string | null;
}

interface CatalogueData {
  pieces: Piece[];
  categories: string[];
  stats: {
    total_references: number;
    total_pieces: number;
    ruptures: number;
  };
}

interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

export default function CatalogueBematrix() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // États
  const [data, setData] = useState<CatalogueData | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [categorie, setCategorie] = useState(searchParams.get('categorie') || '');
  const [disponibilite, setDisponibilite] = useState(searchParams.get('disponibilite') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch data
  const fetchCatalogue = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (categorie) params.set('categorie', categorie);
      if (disponibilite) params.set('disponibilite', disponibilite);
      params.set('page', page.toString());
      params.set('per_page', '24');

      const res = await fetch(`${API_URL}/catalogue-bematrix.php?${params.toString()}`);
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message || 'Erreur lors du chargement');
      }

      setData(json.data);
      setPagination(json.meta?.pagination || null);

      // Update URL
      const urlParams = new URLSearchParams();
      if (debouncedSearch) urlParams.set('search', debouncedSearch);
      if (categorie) urlParams.set('categorie', categorie);
      if (disponibilite) urlParams.set('disponibilite', disponibilite);
      if (page > 1) urlParams.set('page', page.toString());
      const newUrl = urlParams.toString() ? `?${urlParams.toString()}` : '/catalogue';
      router.replace(newUrl, { scroll: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categorie, disponibilite, page, router]);

  useEffect(() => {
    fetchCatalogue();
  }, [fetchCatalogue]);

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setCategorie('');
    setDisponibilite('');
    setPage(1);
  };

  // Status badge
  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            En stock
          </span>
        );
      case 'faible':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            Stock faible
          </span>
        );
      case 'rupture':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            Rupture
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Stats Cards */}
      {data?.stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center">
                <Icon icon="solar:box-linear" className="text-[#ff2d55]" width={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{data.stats.total_references.toLocaleString()}</p>
                <p className="text-sm text-zinc-500">Références</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center">
                <Icon icon="solar:layers-linear" className="text-[#7928ca]" width={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{data.stats.total_pieces.toLocaleString()}</p>
                <p className="text-sm text-zinc-500">Pièces en stock</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                <Icon icon="solar:chart-linear" className="text-[#00d4ff]" width={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {Math.round(((data.stats.total_references - data.stats.ruptures) / data.stats.total_references) * 100)}%
                </p>
                <p className="text-sm text-zinc-500">Disponibilité</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                width={20}
              />
              <input
                type="text"
                placeholder="Rechercher par référence ou désignation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#7928ca]/50 focus:ring-1 focus:ring-[#7928ca]/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <Icon icon="solar:close-circle-linear" width={20} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              value={categorie}
              onChange={(e) => {
                setCategorie(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50 focus:ring-1 focus:ring-[#7928ca]/50 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
            >
              <option value="">Toutes catégories</option>
              {data?.categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="w-full lg:w-48">
            <select
              value={disponibilite}
              onChange={(e) => {
                setDisponibilite(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50 focus:ring-1 focus:ring-[#7928ca]/50 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
            >
              <option value="">Toute disponibilité</option>
              <option value="stock">En stock</option>
              <option value="faible">Stock faible</option>
              <option value="rupture">Rupture</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl border transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#7928ca]/20 border-[#7928ca]/50 text-[#7928ca]'
                  : 'bg-zinc-800/50 border-white/10 text-zinc-500 hover:text-white'
              }`}
            >
              <Icon icon="solar:widget-linear" width={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl border transition-all ${
                viewMode === 'list'
                  ? 'bg-[#7928ca]/20 border-[#7928ca]/50 text-[#7928ca]'
                  : 'bg-zinc-800/50 border-white/10 text-zinc-500 hover:text-white'
              }`}
            >
              <Icon icon="solar:list-linear" width={20} />
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(search || categorie || disponibilite) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <span className="text-sm text-zinc-500">Filtres actifs :</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-sm text-zinc-300">
                &ldquo;{search}&rdquo;
                <button onClick={() => setSearch('')} className="hover:text-white">
                  <Icon icon="solar:close-circle-linear" width={16} />
                </button>
              </span>
            )}
            {categorie && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-sm text-zinc-300">
                {categorie}
                <button onClick={() => setCategorie('')} className="hover:text-white">
                  <Icon icon="solar:close-circle-linear" width={16} />
                </button>
              </span>
            )}
            {disponibilite && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-sm text-zinc-300">
                {disponibilite === 'stock' ? 'En stock' : disponibilite === 'faible' ? 'Stock faible' : 'Rupture'}
                <button onClick={() => setDisponibilite('')} className="hover:text-white">
                  <Icon icon="solar:close-circle-linear" width={16} />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-[#ff2d55] hover:text-[#ff2d55]/80 transition-colors ml-2"
            >
              Réinitialiser tout
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      {pagination && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500">
            {pagination.total} résultat{pagination.total > 1 ? 's' : ''}
            {pagination.total_pages > 1 && (
              <> &bull; Page {pagination.page} sur {pagination.total_pages}</>
            )}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full border-2 border-[#7928ca] border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-8 text-center">
          <Icon icon="solar:danger-triangle-linear" className="text-red-400 mx-auto mb-4" width={48} />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchCatalogue}
            className="px-6 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data?.pieces.length === 0 && (
        <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-12 text-center">
          <Icon icon="solar:box-linear" className="text-zinc-600 mx-auto mb-4" width={64} />
          <h3 className="text-xl font-semibold text-white mb-2">Aucune pièce trouvée</h3>
          <p className="text-zinc-500 mb-6">Modifiez vos critères de recherche pour trouver des pièces.</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full gradient-bg text-white font-medium hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Grid View */}
      {!loading && !error && data && data.pieces.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.pieces.map((piece) => (
            <div
              key={piece.id}
              className="group rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-square bg-zinc-800/50 relative overflow-hidden">
                {piece.image ? (
                  <img
                    src={piece.image}
                    alt={piece.designation}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon icon="solar:box-linear" className="text-zinc-700" width={64} />
                  </div>
                )}
                {/* Status badge overlay */}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(piece.statut)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-[#7928ca] font-mono mb-1">{piece.reference}</p>
                <h3 className="text-white font-medium text-sm leading-tight mb-3 line-clamp-2">
                  {piece.designation}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{piece.quantite}</p>
                    <p className="text-xs text-zinc-500">en stock</p>
                  </div>
                  {piece.categorie && (
                    <span className="px-2 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-400">
                      {piece.categorie}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!loading && !error && data && data.pieces.length > 0 && viewMode === 'list' && (
        <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Photo</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Référence</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Désignation</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Catégorie</th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Quantité</th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.pieces.map((piece) => (
                <tr key={piece.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800/50 overflow-hidden">
                      {piece.image ? (
                        <img
                          src={piece.image}
                          alt={piece.designation}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon icon="solar:box-linear" className="text-zinc-700" width={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#7928ca] font-mono text-sm">{piece.reference}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white text-sm">{piece.designation}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {piece.categorie && (
                      <span className="px-2 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-400">
                        {piece.categorie}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xl font-bold text-white">{piece.quantite}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {getStatusBadge(piece.statut)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.has_prev}
            className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800/50 transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width={20} />
          </button>

          {/* Page numbers */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
              let pageNum: number;
              if (pagination.total_pages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= pagination.total_pages - 2) {
                pageNum = pagination.total_pages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-xl border transition-colors ${
                    pageNum === page
                      ? 'bg-[#7928ca] border-[#7928ca] text-white'
                      : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.has_next}
            className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800/50 transition-colors"
          >
            <Icon icon="solar:arrow-right-linear" width={20} />
          </button>
        </div>
      )}
    </div>
  );
}
