import VCardLoaderStatic from './VCardLoaderStatic';

// This page is 100% static - pre-built at build time, served from CDN
// No serverless function, no cold start
// Middleware rewrites /carte/[slug] → /carte-view?slug=[slug]

export const metadata = {
  title: 'Carte de visite | iDkom',
  description: 'Carte de visite digitale iDkom',
};

export default function Page() {
  return <VCardLoaderStatic />;
}
