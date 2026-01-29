import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Projet } from '@/lib/api';

interface ProjetCardProps {
  projet: Projet;
  index?: number;
}

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  '#ff2d55': {
    bg: 'from-[#ff2d55]/10',
    text: 'text-[#ff2d55]',
    icon: 'solar:leaf-linear',
  },
  '#7928ca': {
    bg: 'from-[#7928ca]/10',
    text: 'text-[#7928ca]',
    icon: 'solar:sun-fog-linear',
  },
  '#00d4ff': {
    bg: 'from-[#00d4ff]/10',
    text: 'text-[#00d4ff]',
    icon: 'solar:users-group-rounded-linear',
  },
};

export default function ProjetCard({ projet, index = 0 }: ProjetCardProps) {
  const color = projet.category?.color || '#7928ca';
  const colorConfig = colorMap[color] || colorMap['#7928ca'];

  return (
    <Link
      href={`/realisations/${projet.slug}`}
      className={`bento-card rounded-3xl p-6 bg-gradient-to-br ${colorConfig.bg} to-transparent backdrop-blur-sm border border-white/10 group cursor-pointer`}
      style={{ minHeight: '280px' }}
    >
      <div className="h-full flex flex-col justify-between">
        <div className={`w-10 h-10 rounded-lg ${colorConfig.bg.replace('from-', 'bg-').replace('/10', '/20')} flex items-center justify-center`}>
          <Icon icon={colorConfig.icon} className={colorConfig.text} width={20} />
        </div>
        <div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            {projet.category?.name || 'Projet'}
          </span>
          <h3 className="text-2xl font-semibold text-white mt-1">{projet.title}</h3>
          <p className="text-zinc-400 text-sm">
            {projet.location} • {projet.event_name || projet.surface || 'Projet'}
          </p>
          <div className="flex items-center text-white/70 text-sm mt-4 group-hover:gap-3 gap-2 transition-all">
            Voir le projet
            <Icon icon="solar:arrow-right-linear" width={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
