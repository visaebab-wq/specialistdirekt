// Dekorativ stadskarta: en inzoomad, abstrakt neonvy av gatunät och
// vårdpunkter. Den behöver inte föreställa en exakt stad.

const pins = [
  { name: "Mottagning", x: 78, y: 68 },
  { name: "Mottagning", x: 42, y: 92 },
  { name: "Mottagning", x: 86, y: 124 },
  { name: "Mottagning", x: 54, y: 154 },
  { name: "Mottagning", x: 74, y: 178 },
];

export function SwedenMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} role="img" aria-label="Inzoomad stadskarta">
      <defs>
        <filter id="map-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="map-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="map-route" x1="24" x2="96" y1="36" y2="184">
          <stop offset="0" stopColor="#ecfeff" />
          <stop offset="0.46" stopColor="#5eead4" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      <ellipse
        cx="64"
        cy="112"
        rx="54"
        ry="94"
        fill="#5eead4"
        opacity="0.08"
        filter="url(#map-soft-glow)"
      />

      {/* Svag rutnätsstruktur under gatorna. */}
      <path
        d="M18 38h84M14 74h92M18 110h84M14 146h92M22 182h76M28 28v170M60 22v182M92 30v166"
        stroke="#67e8f9"
        strokeLinecap="round"
        strokeOpacity="0.08"
        strokeWidth="0.7"
      />

      {/* Sekundära gator. */}
      <path
        d="M21 55c21-5 35-4 51 3 10 4 20 5 30 2M19 123c14-10 29-13 45-9 18 4 29 1 42-10M26 166c21-3 35 2 47 13 8 8 17 12 28 11M44 22c-3 23 2 42 14 56 11 13 13 27 6 43-7 15-5 32 7 50M87 26c-13 16-18 32-14 49 4 16 1 30-10 43-11 14-13 29-7 47"
        fill="none"
        stroke="#ccfbf1"
        strokeLinecap="round"
        strokeOpacity="0.2"
        strokeWidth="1.1"
      />

      {/* Huvudvägar med tydlig neon-känsla. */}
      <path
        d="M18 192C35 164 56 148 81 140C99 134 108 120 102 104C96 87 72 82 61 67C51 52 56 36 71 21"
        fill="none"
        stroke="url(#map-route)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
        filter="url(#map-glow)"
      />
      <path
        d="M13 82C32 92 49 96 66 90C82 85 94 76 108 58"
        fill="none"
        stroke="url(#map-route)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        filter="url(#map-glow)"
      />
      <path
        d="M28 30C42 47 47 68 44 92C42 113 46 129 58 143C71 158 75 176 70 198"
        fill="none"
        stroke="#67e8f9"
        strokeLinecap="round"
        strokeOpacity="0.42"
        strokeWidth="2"
        filter="url(#map-glow)"
      />

      {/* Små stadsblock برای عمق بصری. */}
      <rect x="22" y="96" width="13" height="9" rx="2" fill="#ccfbf1" opacity="0.08" />
      <rect x="73" y="35" width="16" height="11" rx="2" fill="#ccfbf1" opacity="0.08" />
      <rect x="84" y="150" width="13" height="15" rx="2" fill="#ccfbf1" opacity="0.08" />
      <rect x="36" y="172" width="14" height="10" rx="2" fill="#ccfbf1" opacity="0.08" />

      {pins.map((p) => (
        <g key={p.name} filter="url(#map-glow)">
          <circle cx={p.x} cy={p.y} r="7.6" fill="#5eead4" opacity="0.16" />
          <circle cx={p.x} cy={p.y} r="4.5" fill="#14b8a6" stroke="#ccfbf1" strokeWidth="1" />
          <circle cx={p.x} cy={p.y} r="1.6" fill="#fff" />
          <title>{p.name}</title>
        </g>
      ))}
    </svg>
  );
}
