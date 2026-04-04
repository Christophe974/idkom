export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Animated progress circle */}
        <div className="relative mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin-slow">
            {/* Track */}
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="3"
            />
            {/* Progress arc */}
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="url(#loadGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="80 214"
              transform="rotate(-90 40 40)"
            />
            <defs>
              <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2d55" />
                <stop offset="100%" stopColor="#7928ca" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <p className="text-zinc-600 text-sm font-medium tracking-wide">
          Chargement de la carte...
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
