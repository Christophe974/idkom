import { Icon } from '@iconify/react';

export default function PropositionExpired() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:hourglass-line-linear" className="text-red-400" width={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Proposition expirée</h1>
          <p className="text-zinc-400">
            Cette proposition n&apos;est plus disponible.
            Veuillez contacter votre interlocuteur pour en savoir plus.
          </p>
        </div>

        <p className="mt-8 text-zinc-600 text-xs">
          Propulsé par{' '}
          <a href="https://www.idkom.fr" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
            iDkom
          </a>
        </p>
      </div>
    </main>
  );
}
