import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, LeafIcon, SunFogIcon, UsersGroupIcon } from './Icons';
import type { Projet } from '@/lib/api';

interface ProjetCardProps {
  projet: Projet;
  index?: number;
}

const colorMap: Record<string, { bg: string; text: string; icon: typeof LeafIcon }> = {
  '#ff2d55': {
    bg: 'from-[#ff2d55]/10',
    text: 'text-[#ff2d55]',
    icon: LeafIcon,
  },
  '#7928ca': {
    bg: 'from-[#7928ca]/10',
    text: 'text-[#7928ca]',
    icon: SunFogIcon,
  },
  '#00d4ff': {
    bg: 'from-[#00d4ff]/10',
    text: 'text-[#00d4ff]',
    icon: UsersGroupIcon,
  },
};

export default function ProjetCard({ projet, index = 0 }: ProjetCardProps) {
  const color = projet.category?.color || '#7928ca';
  const colorConfig = colorMap[color] || colorMap['#7928ca'];
  const FallbackIcon = colorConfig.icon;

  return (
    <Link
      href={`/realisations/${projet.slug}`}
      className="bento-card rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/10 group cursor-pointer"
      style={{ minHeight: '280px' }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        {projet.image?.url ? (
          <Image
            src={projet.image.url}
            alt={projet.image.alt || projet.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${colorConfig.bg} to-zinc-900 flex items-center justify-center`}>
            <FallbackIcon className={`${colorConfig.text} opacity-30`} size={48} />
          </div>
        )}
        {/* Category badge */}
        {projet.category && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{ backgroundColor: `${color}40`, color }}
          >
            {projet.category.name}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white group-hover:text-[#7928ca] transition-colors">
          {projet.title}
        </h3>
        <p className="text-zinc-400 text-sm mt-1">
          {projet.location} • {projet.event_name || projet.surface || 'Projet'}
        </p>
        <div className="flex items-center text-zinc-400 text-sm mt-3 group-hover:text-white group-hover:gap-3 gap-2 transition-all">
          Voir le projet
          <ArrowRightIcon size={16} />
        </div>
      </div>
    </Link>
  );
}
