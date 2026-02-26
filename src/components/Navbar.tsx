'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightUpIcon, CloseCircleIcon, HamburgerMenuIcon } from './Icons';
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
    { label: 'Réalisations', url: '/realisations' },
    { label: 'Savoir-faire', url: '/savoir-faire' },
    { label: 'Stock BeMatrix', url: '/catalogue' },
    { label: 'Blog', url: '/blog' },
  ];

  const menuItems = menus || defaultMenus;

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/95 md:bg-zinc-950/80 md:backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo-white.svg"
            alt="iDkom"
            width={141}
            height={45}
            className="h-10 w-auto group-hover:scale-95 transition-transform duration-300"
            priority
          />
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
            <ArrowRightUpIcon size={16} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseCircleIcon size={24} /> : <HamburgerMenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-zinc-950/98 md:bg-zinc-950/95 md:backdrop-blur-xl">
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
              <ArrowRightUpIcon size={16} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
