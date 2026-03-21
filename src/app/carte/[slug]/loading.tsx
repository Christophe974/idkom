export default function Loading() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: '#09090b' }}>
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: '#3b82f6',
            top: '20%',
            right: '-10%',
            animation: 'splashPulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #7928ca, #ff2d55)',
            bottom: '10%',
            left: '-10%',
            animation: 'splashPulse 3s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Splash content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 animate-[fadeIn_0.3s_ease-out]">
          {/* Inline SVG iDkom logo for zero network latency */}
          <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-80">
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
              fill="white" fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="28" fontWeight="700" letterSpacing="2">
              IDKOM
            </text>
          </svg>
        </div>

        {/* Loading ring with counter effect */}
        <div className="relative mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: '2s' }}>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="url(#gradient)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="160 214"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#7928ca" />
                <stop offset="100%" stopColor="#ff2d55" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pulsing dot in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: '#3b82f6',
                animation: 'splashDot 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Loading text */}
        <p
          className="text-zinc-500 text-sm font-medium tracking-wider"
          style={{ animation: 'fadeIn 0.5s ease-out 0.2s both' }}
        >
          Chargement de la carte...
        </p>

        {/* Subtle progress bar */}
        <div
          className="w-48 h-0.5 rounded-full overflow-hidden mt-4 bg-white/5"
          style={{ animation: 'fadeIn 0.5s ease-out 0.4s both' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #7928ca, #ff2d55)',
              animation: 'splashProgress 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes splashDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes splashProgress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
