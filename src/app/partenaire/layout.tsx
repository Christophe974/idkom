'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import PartnerAuthProvider, { usePartnerAuth } from './PartnerAuthProvider';

function PartnerTopBar() {
  const { partner, isAuthenticated, logout } = usePartnerAuth();
  const pathname = usePathname();

  if (!isAuthenticated || !partner) return null;

  const navItems = [
    { href: '/partenaire', label: 'Dashboard', icon: 'solar:chart-square-bold' },
    { href: '/partenaire/porte-cles', label: 'Porte-cles', icon: 'solar:key-bold' },
    { href: '/partenaire/parametres', label: 'Parametres', icon: 'solar:settings-bold' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
        {/* Left: logo + partner name */}
        <Link href="/partenaire" className="flex items-center gap-3 group">
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-8 w-auto rounded-lg"
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {partner.name.charAt(0)}
            </div>
          )}
          <span className="text-white font-semibold text-sm hidden sm:block group-hover:text-pink-400 transition-colors">
            {partner.agency_name || ''}
          </span>
        </Link>

        {/* Center: nav */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/partenaire'
                ? pathname === '/partenaire'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon icon={item.icon} width={18} />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <Icon icon="solar:logout-2-bold" width={18} />
          <span className="hidden sm:inline">Deconnexion</span>
        </button>
      </div>
    </header>
  );
}

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <PartnerAuthProvider>
        <PartnerTopBar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </PartnerAuthProvider>
    </div>
  );
}
