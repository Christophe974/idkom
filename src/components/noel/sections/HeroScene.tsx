/**
 * Composition du hero : nuit bleue, bus arrivant, portail ouvert, silhouettes
 * de la bande, groom en bordeaux, quatre chalets éclairés.
 * SVG pur, généré côté serveur, aucune image externe, aucun JavaScript.
 * Remplaçable plus tard par un visuel clé (photo ou illustration) via <Image>.
 */

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1224);

const STARS = Array.from({ length: 80 }, () => ({
  x: +(rand() * 1600).toFixed(1),
  y: +(rand() * 400).toFixed(1),
  r: +(0.5 + rand() * 1.2).toFixed(2),
  o: +(0.2 + rand() * 0.6).toFixed(2),
}));

const SNOW = Array.from({ length: 110 }, () => ({
  x: +(rand() * 1600).toFixed(1),
  y: +(rand() * 900).toFixed(1),
  r: +(0.8 + rand() * 2.2).toFixed(2),
  o: +(0.12 + rand() * 0.4).toFixed(2),
}));

const TREELINE = (() => {
  const pts = ["M0 900", "L0 556"];
  for (let x = 0; x <= 1600; x += 22) {
    const i = x / 22;
    const y = i % 2 === 0 ? 556 + rand() * 8 : 498 + rand() * 36;
    pts.push(`L${x} ${y.toFixed(1)}`);
  }
  pts.push("L1600 900 Z");
  return pts.join(" ");
})();

const CHALETS = [
  { x: 855, h: 112, chimney: false },
  { x: 1025, h: 120, chimney: true },
  { x: 1195, h: 108, chimney: false },
  { x: 1365, h: 116, chimney: true },
];

const CHALET_W = 145;
const GROUND = 600;

function Chalet({ x, h, chimney }: { x: number; h: number; chimney: boolean }) {
  const top = GROUND - h;
  const apex = top - 58;
  const cx = x + CHALET_W / 2;
  const left = x - 12;
  const right = x + CHALET_W + 12;
  const lights = Array.from({ length: 7 }, (_, k) => k / 6);
  return (
    <g>
      {/* halo au sol et derrière la fenêtre */}
      <ellipse cx={cx} cy={GROUND + 8} rx={115} ry={22} fill="url(#warm)" opacity={0.32} />
      <ellipse cx={x + 46} cy={top + 46} rx={95} ry={62} fill="url(#warm)" opacity={0.42} />
      {chimney && <rect x={x + 104} y={apex + 14} width={13} height={40} fill="#120c10" />}
      {/* corps */}
      <rect x={x} y={top} width={CHALET_W} height={h} fill="#1b1216" />
      <rect x={x} y={top} width={CHALET_W} height={h} fill="url(#wood)" opacity={0.35} />
      {/* bandeau bordeaux */}
      <rect x={x + 12} y={top + 10} width={CHALET_W - 24} height={7} fill="#6b1f2a" />
      {/* toit + neige */}
      <polygon points={`${left},${top + 2} ${cx},${apex} ${right},${top + 2}`} fill="#130d11" />
      <polygon
        points={`${left},${top + 2} ${cx},${apex} ${right},${top + 2} ${right - 9},${top + 2} ${cx},${apex + 8} ${left + 9},${top + 2}`}
        fill="#e8dcc7"
        opacity={0.82}
      />
      {/* fenêtre */}
      <rect x={x + 20} y={top + 26} width={52} height={42} fill="url(#window)" />
      <path d={`M${x + 46} ${top + 26}v42M${x + 20} ${top + 47}h52`} stroke="#3a1f10" strokeWidth={2} />
      {/* porte entrouverte */}
      <rect x={x + 96} y={GROUND - 62} width={38} height={62} fill="#0d0a0c" />
      <rect x={x + 100} y={GROUND - 58} width={30} height={58} fill="url(#window)" opacity={0.5} />
      {/* guirlande le long du toit */}
      {lights.map((t, k) => (
        <circle
          key={`l${k}`}
          cx={left + (cx - left) * t}
          cy={top + 2 + (apex - (top + 2)) * t + 7}
          r={2.3}
          fill="#ffd08a"
        />
      ))}
      {lights.map((t, k) => (
        <circle
          key={`r${k}`}
          cx={cx + (right - cx) * t}
          cy={apex + (top + 2 - apex) * t + 7}
          r={2.3}
          fill="#ffd08a"
        />
      ))}
    </g>
  );
}

function Figure({ x, base, h, w, color = "#04070e" }: { x: number; base: number; h: number; w: number; color?: string }) {
  const headR = w * 0.36;
  const headCy = base - h + headR;
  const bodyTop = headCy + headR + 2;
  return (
    <g>
      <circle cx={x} cy={headCy} r={headR} fill={color} />
      <path
        d={`M${x - w / 2} ${base} L${x - w / 2} ${bodyTop + w * 0.45} Q${x - w / 2} ${bodyTop} ${x} ${bodyTop} Q${x + w / 2} ${bodyTop} ${x + w / 2} ${bodyTop + w * 0.45} L${x + w / 2} ${base} Z`}
        fill={color}
      />
    </g>
  );
}

function Pine({ cx, base, h, w }: { cx: number; base: number; h: number; w: number }) {
  const tier = (top: number, bottom: number, half: number) =>
    `${cx - half},${bottom} ${cx},${top} ${cx + half},${bottom}`;
  return (
    <g fill="#050a14">
      <rect x={cx - 5} y={base - h * 0.2} width={10} height={h * 0.2} />
      <polygon points={tier(base - h * 0.55, base - h * 0.05, w / 2)} />
      <polygon points={tier(base - h * 0.8, base - h * 0.35, w * 0.4)} />
      <polygon points={tier(base - h, base - h * 0.6, w * 0.29)} />
    </g>
  );
}

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060b16" />
          <stop offset="0.55" stopColor="#0b1426" />
          <stop offset="1" stopColor="#17294a" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2b49" />
          <stop offset="1" stopColor="#0b1426" />
        </linearGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2027" />
          <stop offset="1" stopColor="#0f0a0c" />
        </linearGradient>
        <radialGradient id="warm">
          <stop offset="0" stopColor="#f2a93b" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="warmSoft">
          <stop offset="0" stopColor="#f2a93b" stopOpacity="0.26" />
          <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6be" />
          <stop offset="1" stopColor="#f2a93b" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd08a" stopOpacity="0.34" />
          <stop offset="1" stopColor="#ffd08a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6eedf" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f6eedf" stopOpacity="0.07" />
          <stop offset="1" stopColor="#f6eedf" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.6" r="0.72">
          <stop offset="0.45" stopColor="#060b16" stopOpacity="0" />
          <stop offset="1" stopColor="#060b16" stopOpacity="0.88" />
        </radialGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1426" stopOpacity="0" />
          <stop offset="1" stopColor="#0b1426" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* ciel */}
      <rect width="1600" height="900" fill="url(#sky)" />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f6eedf" opacity={s.o} />
      ))}
      <ellipse cx="1180" cy="530" rx="600" ry="220" fill="url(#warmSoft)" />

      {/* forêt lointaine et sol enneigé */}
      <path d={TREELINE} fill="#07101d" />
      <rect y="560" width="1600" height="340" fill="url(#ground)" />
      <polygon points="696,660 810,660 980,900 560,900" fill="#25395f" opacity="0.5" />

      {/* les quatre chalets */}
      {CHALETS.map((c) => (
        <Chalet key={c.x} {...c} />
      ))}

      {/* lampadaire devant le premier chalet */}
      <circle cx="940" cy="560" r="46" fill="url(#warm)" opacity="0.7" />
      <line x1="940" y1="568" x2="940" y2="700" stroke="#0a1222" strokeWidth="5" />
      <rect x="932" y="548" width="16" height="22" fill="#ffe6be" />

      {/* portail ouvert */}
      <g>
        <circle cx="678" cy="452" r="40" fill="url(#warm)" opacity="0.65" />
        <circle cx="828" cy="452" r="40" fill="url(#warm)" opacity="0.65" />
        <rect x="654" y="464" width="48" height="10" fill="#0d1628" />
        <rect x="804" y="464" width="48" height="10" fill="#0d1628" />
        <rect x="660" y="470" width="36" height="190" fill="#0a1222" stroke="#b87333" strokeOpacity="0.35" />
        <rect x="810" y="470" width="36" height="190" fill="#0a1222" stroke="#b87333" strokeOpacity="0.35" />
        <rect x="671" y="440" width="14" height="20" fill="#ffd08a" />
        <rect x="821" y="440" width="14" height="20" fill="#ffd08a" />
        <g fill="none" stroke="#b87333" strokeOpacity="0.75" strokeWidth="2">
          <path d="M660 482 L592 500 L592 662 L660 654 Z" />
          <path d="M846 482 L914 500 L914 662 L846 654 Z" />
          <path d="M646 485.6v170.6M632 489.2v169.2M618 492.8v167.8M604 496.4v166.4" />
          <path d="M860 485.6v170.6M874 489.2v169.2M888 492.8v167.8M902 496.4v166.4" />
        </g>
        <path d="M596 528 L656 520 M596 572 L656 566 M596 616 L656 612" stroke="#b87333" strokeOpacity="0.55" strokeWidth="1.5" />
        <path d="M850 520 L910 528 M850 566 L910 572 M850 612 L910 616" stroke="#b87333" strokeOpacity="0.55" strokeWidth="1.5" />
      </g>

      {/* le bus, phares vers le portail */}
      <g>
        <polygon points="560,646 1000,588 1000,780" fill="url(#beam)" />
        <rect x="110" y="555" width="450" height="135" rx="6" fill="#2b1b22" stroke="#4a2f37" />
        <rect x="114" y="551" width="442" height="6" rx="3" fill="#e8dcc7" opacity="0.85" />
        <rect x="392" y="565" width="152" height="18" fill="#f2a93b" opacity="0.9" />
        <text
          x="468"
          y="578.5"
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--font-poster), Impact, sans-serif"
          letterSpacing="1.4"
          fill="#0b1426"
        >
          DOMAINE LES 12 PONTS
        </text>
        {Array.from({ length: 6 }, (_, k) => (
          <rect key={k} x={134 + k * 40} y="594" width="32" height="40" fill="url(#window)" opacity="0.78" />
        ))}
        <rect x="380" y="594" width="34" height="96" fill="#1a0f14" />
        <rect x="386" y="600" width="22" height="40" fill="url(#window)" opacity="0.55" />
        <rect x="430" y="594" width="104" height="48" fill="url(#window)" opacity="0.45" />
        <rect x="110" y="646" width="450" height="10" fill="#6b1f2a" />
        <circle cx="200" cy="692" r="27" fill="#05080f" />
        <circle cx="200" cy="692" r="10" fill="#1f2a3f" />
        <circle cx="470" cy="692" r="27" fill="#05080f" />
        <circle cx="470" cy="692" r="10" fill="#1f2a3f" />
        <circle cx="556" cy="668" r="24" fill="url(#warm)" />
        <circle cx="556" cy="668" r="8" fill="#fff3d6" />
      </g>

      {/* la bande, à contre-jour, et le groom en bordeaux */}
      <g>
        <ellipse cx="760" cy="704" rx="130" ry="10" fill="#04070e" opacity="0.5" />
        <Figure x={700} base={700} h={74} w={26} />
        <Figure x={730} base={700} h={80} w={28} />
        <Figure x={754} base={700} h={46} w={18} />
        <Figure x={778} base={700} h={76} w={26} />
        <Figure x={806} base={700} h={70} w={24} />
        <Figure x={876} base={700} h={84} w={28} color="#6b1f2a" />
        <circle cx="876" cy="626" r="10" fill="#04070e" />
        <rect x="862" y="613" width="28" height="7" fill="#6b1f2a" />
        <rect x="856" y="654" width="11" height="15" fill="#ffd08a" />
        <circle cx="861" cy="661" r="16" fill="url(#warm)" opacity="0.7" />
      </g>

      {/* sapins du premier plan */}
      <Pine cx={40} base={790} h={330} w={150} />
      <Pine cx={118} base={790} h={250} w={120} />
      <Pine cx={1590} base={790} h={350} w={150} />
      <Pine cx={1535} base={790} h={230} w={100} />

      {/* brume, flocons, vignette, fondu vers la page */}
      <rect y="590" width="1600" height="160" fill="url(#fog)" />
      {SNOW.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f6eedf" opacity={s.o} />
      ))}
      <rect width="1600" height="900" fill="url(#vignette)" />
      <rect y="720" width="1600" height="180" fill="url(#fade)" />
    </svg>
  );
}
