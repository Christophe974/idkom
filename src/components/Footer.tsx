import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

interface FooterProps {
  site?: {
    name: string;
    tagline: string;
    description: string;
    address: string;
  };
  social?: {
    linkedin: string;
    instagram: string;
    facebook: string;
  };
}

export default function Footer({ site, social }: FooterProps) {
  const services = [
    { label: 'Stands BeMatrix', url: '/savoir-faire#stands' },
    { label: 'Solutions Digitales', url: '/savoir-faire#digital' },
    { label: 'Événementiel', url: '/savoir-faire#events' },
    { label: 'Configurateur', url: '/configurateur' },
  ];

  const legal = [
    { label: 'Mentions légales', url: '/mentions-legales' },
    { label: 'Confidentialité', url: '/confidentialite' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/logo-white.svg"
                alt={site?.name || 'iDkom'}
                width={120}
                height={38}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              {site?.tagline || "L'Atelier Phygital"}. {site?.description || 'Stands BeMatrix, solutions digitales et événementiel pour les marques ambitieuses depuis 1994.'}
            </p>
            <div className="flex gap-4 mt-6 text-zinc-500">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Icon icon="mdi:facebook" width={20} />
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Icon icon="mdi:instagram" width={20} />
                </a>
              )}
              {social?.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icon icon="mdi:linkedin" width={20} />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Savoir-faire</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              {services.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Légal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              {legal.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} {site?.name || 'iDkom'} — {site?.tagline || "L'Atelier Phygital"}. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">{site?.address || 'Franche-Comté, France'} 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}
