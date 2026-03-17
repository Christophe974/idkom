import { Metadata } from 'next';
import { getHomepageData } from '@/lib/api';
import ContactPageClient from './ContactPageClient';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contactez-nous — Parlons de votre projet",
  description: "Contactez iDkom pour vos événements sur-mesure, solutions digitales ou projets de stands. Réponse sous 48h. Tél : 06 37 75 40 64.",
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
