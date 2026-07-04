import type { Metadata } from 'next';
import AuditDemoClient from './AuditDemoClient';

export const metadata: Metadata = {
  title: 'Audit web — exemple',
  description:
    'Exemple d’audit web iDkom : performance, SEO, mobile, sécurité et présence Google. Un diagnostic visuel, précis et actionnable.',
  robots: 'noindex, nofollow',
};

export default function AuditDemoPage() {
  return <AuditDemoClient />;
}
