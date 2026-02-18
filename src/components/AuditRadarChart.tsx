'use client';

import { useEffect, useRef, useState } from 'react';

interface CategoryScore {
  key: string;
  label: string;
  score: number;
  color: string;
}

interface Props {
  categories: CategoryScore[];
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function AuditRadarChart({ categories }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const hasAnimated = useRef(false);

  const cx = 150, cy = 150, maxR = 110;
  const n = categories.length;
  const angleStep = 360 / n;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 1800;
          function tick(now: number) {
            const elapsed = now - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setAnimProgress(eased);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Grid polygons (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = gridLevels.map((level) =>
    categories.map((_, i) => {
      const p = polarToXY(cx, cy, maxR * level, i * angleStep);
      return `${p.x},${p.y}`;
    }).join(' ')
  );

  // Data polygon
  const dataPoints = categories.map((cat, i) => {
    const r = (cat.score / 100) * maxR * animProgress;
    return polarToXY(cx, cy, r, i * angleStep);
  });
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Axis lines
  const axisEnds = categories.map((_, i) => polarToXY(cx, cy, maxR, i * angleStep));

  // Labels
  const labelPositions = categories.map((_, i) => polarToXY(cx, cy, maxR + 22, i * angleStep));

  return (
    <div ref={ref}>
      <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7928ca" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2d55" />
            <stop offset="50%" stopColor="#7928ca" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#27272a"
            strokeWidth={i === gridLevels.length - 1 ? 1 : 0.5}
          />
        ))}

        {/* Axes */}
        {axisEnds.map((end, i) => (
          <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#27272a" strokeWidth={0.5} />
        ))}

        {/* Data polygon */}
        {animProgress > 0 && (
          <>
            <polygon points={dataPolygon} fill="url(#radarGrad)" stroke="url(#radarStroke)" strokeWidth={2} />
            {/* Data points */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={3} fill={categories[i].color} />
            ))}
          </>
        )}

        {/* Labels */}
        {labelPositions.map((pos, i) => {
          const score = Math.round(categories[i].score * animProgress);
          const scoreColor = categories[i].score >= 70 ? '#22c55e' : categories[i].score >= 40 ? '#eab308' : '#ef4444';
          return (
            <g key={i}>
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor="middle"
                fill="#71717a"
                fontSize="9"
                fontFamily="Space Grotesk, sans-serif"
              >
                {categories[i].label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 7}
                textAnchor="middle"
                fill={scoreColor}
                fontSize="11"
                fontWeight="700"
                fontFamily="Space Grotesk, sans-serif"
              >
                {score}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
