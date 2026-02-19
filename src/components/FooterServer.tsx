import { getMenus } from '@/lib/api';
import Footer from './Footer';

interface FooterServerProps {
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

export default async function FooterServer({ site, social }: FooterServerProps) {
  let footerServices;
  let footerLegal;

  try {
    const allMenus = await getMenus();
    footerServices = allMenus.footer_services;
    footerLegal = allMenus.footer_legal;
  } catch {
    // Fallback si l'API ne répond pas → Footer utilise ses menus hardcodés
  }

  return (
    <Footer
      site={site}
      social={social}
      footerServices={footerServices}
      footerLegal={footerLegal}
    />
  );
}
