'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Afficher après un petit délai pour ne pas interrompre le chargement
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    closePopup();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    closePopup();
  };

  const closePopup = () => {
    setIsLeaving(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 transition-all duration-300 ${
        isLeaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
        {/* Glow effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#ff2d55]/20 via-[#7928ca]/20 to-[#00d4ff]/20 rounded-2xl blur-sm -z-10"></div>

        {/* Cookie icon animé */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff2d55] to-[#7928ca] flex items-center justify-center shadow-lg shadow-[#7928ca]/30">
              <span className="text-2xl animate-bounce">🍪</span>
            </div>
            {/* Point rouge qui clignote */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2d55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2d55]"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
              On parle cookies ?
              <span className="text-base">🍪</span>
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pas ceux qu&apos;on mange, malheureusement ! Juste quelques-uns pour améliorer votre visite.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 p-3 bg-zinc-800/50 rounded-xl border border-white/5">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:check-circle-bold" className="text-green-500" width={14} />
              <span>Essentiels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:chart-bold" className="text-blue-400" width={14} />
              <span>Analytiques</span>
            </div>
            <Link
              prefetch={false}
              href="/confidentialite"
              className="ml-auto text-[#00d4ff] hover:underline flex items-center gap-1"
            >
              En savoir +
              <Icon icon="solar:arrow-right-linear" width={12} />
            </Link>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-zinc-400 text-sm font-medium hover:bg-zinc-700 hover:text-white transition-all duration-200"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon icon="solar:check-circle-linear" width={16} />
            Accepter
          </button>
        </div>

        {/* Fun message */}
        <p className="text-center text-[10px] text-zinc-600 mt-3">
          Promis, on ne vous espionne pas. On est juste curieux. 👀
        </p>
      </div>
    </div>
  );
}
