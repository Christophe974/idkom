'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface NavbarProps {
  menus?: {
    label: string;
    url: string;
  }[];
}

export default function Navbar({ menus }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMenus = [
    { label: "L'Atelier", url: '/atelier' },
    { label: 'Savoir-faire', url: '/savoir-faire' },
    { label: 'Réalisations', url: '/realisations' },
    { label: 'Stock BeMatrix', url: '/catalogue' },
    { label: 'Blog', url: '/blog' },
  ];

  const menuItems = menus || defaultMenus;

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-white text-sm group-hover:scale-95 transition-transform duration-300">
            iD
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">iDkom</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Contact
            <Icon icon="solar:arrow-right-up-linear" width={16} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <Icon icon={isOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className="block text-zinc-400 hover:text-white transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 w-fit"
            >
              Contact
              <Icon icon="solar:arrow-right-up-linear" width={16} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
