import { Metadata } from 'next';
import { getHomepageData } from '@/lib/api';
import ContactPageClient from './ContactPageClient';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact | iDkom - L'Atelier Phygital",
  description: "Contactez iDkom pour vos projets de stands, solutions digitales ou événements. Devis gratuit sous 48h.",
  alternates: { canonical: "https://www.idkom.fr/contact" },
};

export default async function ContactPage() {
  const homeData = await getHomepageData();

  return (
    <ContactPageClient
      site={homeData.site}
      social={homeData.social}
    />
  );
}
