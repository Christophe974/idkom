'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams, useRouter } from 'next/navigation';

// Animated counter component
function AnimatedCounter({ target, duration = 2000, className = '' }: { target: number; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            const updateCounter = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeOut * target));
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            };
            requestAnimationFrame(updateCounter);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target, duration]);

  return (
    <span ref={ref} className={`counter ${className}`}>
      {count.toLocaleString()}
    </span>
  );
}

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

interface CartItem {
  piece: Piece;
  quantity: number;
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

  // Panier pour demande de devis
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showDevisModal, setShowDevisModal] = useState(false);
  const [devisForm, setDevisForm] = useState({
    entreprise: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
  });
  const [devisSubmitting, setDevisSubmitting] = useState(false);
  const [devisSuccess, setDevisSuccess] = useState(false);

  // Filtres
  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const [categorie, setCategorie] = useState(searchParams?.get('categorie') || '');
  const [page, setPage] = useState(parseInt(searchParams?.get('page') || '1'));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
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
      params.set('page', page.toString());
      params.set('per_page', '24');

      const res = await fetch(`${API_URL}/catalogue-bematrix.php?${params.toString()}`);
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message || 'Erreur lors du chargement');
      }

      setData(json.data);
      setPagination(json.meta?.pagination || null);

      // Update URL sans caractères spéciaux problématiques
      const urlParams = new URLSearchParams();
      if (debouncedSearch) urlParams.set('search', debouncedSearch);
      if (categorie) urlParams.set('categorie', categorie);
      if (page > 1) urlParams.set('page', page.toString());
      const queryString = urlParams.toString();
      const newUrl = queryString ? `/catalogue?${queryString}` : '/catalogue';
      window.history.replaceState(null, '', newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categorie, page]);

  useEffect(() => {
    fetchCatalogue();
  }, [fetchCatalogue]);

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setCategorie('');
    setPage(1);
  };

  // Cart functions
  const addToCart = (piece: Piece) => {
    setCart(prev => {
      const existing = prev.find(item => item.piece.id === piece.id);
      if (existing) {
        return prev.map(item =>
          item.piece.id === piece.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { piece, quantity: 1 }];
    });
  };

  const updateCartQuantity = (pieceId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.piece.id !== pieceId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.piece.id === pieceId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (pieceId: number) => {
    setCart(prev => prev.filter(item => item.piece.id !== pieceId));
  };

  const getCartQuantity = (pieceId: number) => {
    const item = cart.find(item => item.piece.id === pieceId);
    return item?.quantity || 0;
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Submit devis
  const submitDevis = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevisSubmitting(true);

    try {
      // Construire le message avec les pièces
      const piecesText = cart
        .map(item => `- ${item.piece.reference} : ${item.piece.designation} (x${item.quantity})`)
        .join('\n');

      const fullMessage = `DEMANDE DE DEVIS BEMATRIX

Entreprise: ${devisForm.entreprise}
Contact: ${devisForm.prenom} ${devisForm.nom}
Email: ${devisForm.email}
Téléphone: ${devisForm.telephone}

PIÈCES DEMANDÉES:
${piecesText}

MESSAGE:
${devisForm.message}`;

      const response = await fetch(`${API_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${devisForm.prenom} ${devisForm.nom}`,
          email: devisForm.email,
          phone: devisForm.telephone,
          company: devisForm.entreprise,
          subject: 'Demande de devis BeMatrix',
          message: fullMessage,
          source: 'catalogue-bematrix',
        }),
      });

      if (response.ok) {
        setDevisSuccess(true);
        setCart([]);
        setTimeout(() => {
          setShowDevisModal(false);
          setDevisSuccess(false);
          setDevisForm({ entreprise: '', nom: '', prenom: '', email: '', telephone: '', message: '' });
        }, 3000);
      }
    } catch (err) {
      console.error('Erreur envoi devis:', err);
    } finally {
      setDevisSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Stats Cards with animated counters */}
      {data?.stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 glow-pink">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center">
                <Icon icon="solar:box-linear" className="text-[#ff2d55]" width={28} />
              </div>
              <div>
                <AnimatedCounter target={data.stats.total_references} className="text-4xl font-bold gradient-text" />
                <p className="text-sm text-zinc-500">Références disponibles</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 glow-purple">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center">
                <Icon icon="solar:layers-linear" className="text-[#7928ca]" width={28} />
              </div>
              <div>
                <AnimatedCounter target={data.stats.total_pieces} className="text-4xl font-bold gradient-text" />
                <p className="text-sm text-zinc-500">Pièces en inventaire</p>
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
          <div className="w-full lg:w-56">
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
        {(search || categorie) && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.pieces.map((piece) => {
            const cartQty = getCartQuantity(piece.id);
            return (
              <div
                key={piece.id}
                className="group rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-[#7928ca]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7928ca]/10"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-zinc-800/30 relative overflow-hidden">
                  {piece.image ? (
                    <img
                      src={piece.image}
                      alt={piece.designation}
                      className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
                      <Icon icon="solar:box-linear" className="text-zinc-700" width={80} />
                    </div>
                  )}
                  {/* Gradient overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-[#7928ca] font-mono mb-2 tracking-wide">{piece.reference}</p>
                  <h3 className="text-white font-semibold text-lg leading-snug mb-4 line-clamp-2 group-hover:text-[#ff2d55] transition-colors">
                    {piece.designation}
                  </h3>
                  {piece.categorie && (
                    <span className="inline-block px-3 py-1.5 rounded-xl bg-zinc-800/80 text-xs text-zinc-400 border border-white/5 mb-4">
                      {piece.categorie}
                    </span>
                  )}

                  {/* Add to cart */}
                  <div className="pt-4 border-t border-white/5">
                    {cartQty === 0 ? (
                      <button
                        onClick={() => addToCart(piece)}
                        className="w-full py-3 rounded-xl bg-[#7928ca]/20 border border-[#7928ca]/30 text-[#7928ca] font-medium hover:bg-[#7928ca] hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Icon icon="solar:add-circle-linear" width={20} />
                        Ajouter au devis
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCartQuantity(piece.id, cartQty - 1)}
                          className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
                        >
                          <Icon icon="solar:minus-linear" width={18} />
                        </button>
                        <span className="flex-1 text-center text-xl font-bold text-white">{cartQty}</span>
                        <button
                          onClick={() => updateCartQuantity(piece.id, cartQty + 1)}
                          className="w-10 h-10 rounded-xl bg-[#7928ca] text-white flex items-center justify-center hover:bg-[#7928ca]/80 transition-colors"
                        >
                          <Icon icon="solar:add-linear" width={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
                <th className="text-center text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Quantité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.pieces.map((piece) => {
                const cartQty = getCartQuantity(piece.id);
                return (
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {cartQty === 0 ? (
                          <button
                            onClick={() => addToCart(piece)}
                            className="px-4 py-2 rounded-lg bg-[#7928ca]/20 border border-[#7928ca]/30 text-[#7928ca] text-sm font-medium hover:bg-[#7928ca] hover:text-white transition-all"
                          >
                            Ajouter
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(piece.id, cartQty - 1)}
                              className="w-8 h-8 rounded-lg bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700"
                            >
                              <Icon icon="solar:minus-linear" width={14} />
                            </button>
                            <span className="w-8 text-center font-bold text-white">{cartQty}</span>
                            <button
                              onClick={() => updateCartQuantity(piece.id, cartQty + 1)}
                              className="w-8 h-8 rounded-lg bg-[#7928ca] text-white flex items-center justify-center hover:bg-[#7928ca]/80"
                            >
                              <Icon icon="solar:add-linear" width={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
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

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowDevisModal(true)}
          className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl gradient-bg text-white font-medium shadow-2xl shadow-[#7928ca]/30 hover:shadow-[#7928ca]/50 transition-all flex items-center gap-3 animate-fade-in-up"
        >
          <Icon icon="solar:document-text-linear" width={24} />
          <span>Demander un devis</span>
          <span className="px-2.5 py-1 rounded-full bg-white/20 text-sm font-bold">{totalCartItems}</span>
        </button>
      )}

      {/* Devis Modal */}
      {showDevisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-white/10 p-8">
            {devisSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Icon icon="solar:check-circle-linear" className="text-green-400" width={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                <p className="text-zinc-400">Nous vous recontacterons rapidement.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Demande de devis</h2>
                  <button
                    onClick={() => setShowDevisModal(false)}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Icon icon="solar:close-circle-linear" className="text-zinc-400" width={24} />
                  </button>
                </div>

                {/* Cart items */}
                <div className="mb-6 space-y-3">
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Pièces sélectionnées</h3>
                  {cart.map((item) => (
                    <div key={item.piece.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/50 border border-white/5">
                      <div className="w-12 h-12 rounded-lg bg-zinc-700 overflow-hidden flex-shrink-0">
                        {item.piece.image ? (
                          <img src={item.piece.image} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon icon="solar:box-linear" className="text-zinc-600" width={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#7928ca] font-mono">{item.piece.reference}</p>
                        <p className="text-sm text-white truncate">{item.piece.designation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.piece.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-zinc-700 text-white flex items-center justify-center hover:bg-zinc-600"
                        >
                          <Icon icon="solar:minus-linear" width={12} />
                        </button>
                        <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.piece.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-[#7928ca] text-white flex items-center justify-center hover:bg-[#7928ca]/80"
                        >
                          <Icon icon="solar:add-linear" width={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.piece.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Icon icon="solar:trash-bin-2-linear" width={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={submitDevis} className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Entreprise *</label>
                    <input
                      type="text"
                      required
                      value={devisForm.entreprise}
                      onChange={(e) => setDevisForm({ ...devisForm, entreprise: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Prénom *</label>
                      <input
                        type="text"
                        required
                        value={devisForm.prenom}
                        onChange={(e) => setDevisForm({ ...devisForm, prenom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Nom *</label>
                      <input
                        type="text"
                        required
                        value={devisForm.nom}
                        onChange={(e) => setDevisForm({ ...devisForm, nom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={devisForm.email}
                        onChange={(e) => setDevisForm({ ...devisForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={devisForm.telephone}
                        onChange={(e) => setDevisForm({ ...devisForm, telephone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white focus:outline-none focus:border-[#7928ca]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message / Dates souhaitées</label>
                    <textarea
                      rows={3}
                      value={devisForm.message}
                      onChange={(e) => setDevisForm({ ...devisForm, message: e.target.value })}
                      placeholder="Précisez vos dates d'événement, lieu de livraison..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#7928ca]/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={devisSubmitting}
                    className="w-full py-4 rounded-xl gradient-bg text-white font-medium hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {devisSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Icon icon="solar:send-linear" width={20} />
                        Envoyer la demande
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
