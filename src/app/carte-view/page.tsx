import { Suspense } from 'react';
import VCardLoaderStatic from './VCardLoaderStatic';

// Static page served from CDN - proxy rewrites /carte/[slug] here
export const metadata = {
  title: 'Carte de visite | iDkom',
  description: 'Carte de visite digitale iDkom',
};

// Splash screen shown during Suspense (before searchParams are available)
function SplashFallback() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: '#09090b' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: '#3b82f6', top: '20%', right: '-10%' }} />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <svg width="140" height="45" viewBox="0 0 140 45" className="opacity-90 mb-10">
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
            fill="white" fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="32" fontWeight="700" letterSpacing="3">IDKOM</text>
        </svg>
        <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SplashFallback />}>
      <VCardLoaderStatic />
    </Suspense>
  );
}
