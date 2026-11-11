import { C, rng, useSvgId } from "./utils";

/* ------------------------------------------------------------------ */
/* Celular                                                             */
/* ------------------------------------------------------------------ */

/**
 * Celular visto de frente. `children` é uma função que recebe a área da
 * tela (x, y, w, h, cx, cy) e desenha o conteúdo dentro dela.
 */
export function Phone({ x = 135, y = 15, w = 130, h = 270, tilt = -6, dark = false, children, after }) {
  const id = useSvgId();
  const cx = x + w / 2;
  const cy = y + h / 2;
  const s = { x: x + 9, y: y + 9, w: w - 18, h: h - 18, cx, cy };
  return (
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      <defs>
        <clipPath id={`c${id}`}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={18} />
        </clipPath>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.screenA} />
          <stop offset="1" stopColor={C.screenB} />
        </linearGradient>
      </defs>
      <rect x={x + 4} y={y + 10} width={w - 8} height={h} rx={26} fill="#000" opacity="0.25" />
      <rect x={x} y={y} width={w} height={h} rx={26} fill={C.body} stroke={C.edge} strokeWidth="2" />
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={18} fill={dark ? C.bezel : `url(#g${id})`} />
      <g clipPath={`url(#c${id})`}>
        {typeof children === "function" ? children(s) : children}
        <path
          d={`M${s.x} ${s.y + s.h * 0.62} L${s.x + s.w} ${s.y + s.h * 0.18} V${s.y} H${s.x} Z`}
          fill="#fff"
          opacity="0.05"
        />
      </g>
      <circle cx={cx} cy={s.y + 13} r="4" fill={C.bezel} />
      <rect x={x + w} y={y + 60} width="3" height="34" rx="1.5" fill={C.edge} />
      {after}
    </g>
  );
}

/** Tela inicial: barra de status, grade de ícones e dock. */
export function HomeGrid({ s, seed = 0, dim = 1 }) {
  const r = rng(seed + 11);
  const colors = [C.amber, C.green, C.cyan, C.violet, "#ff8a65", "#ffffff"];
  const cols = 4;
  const pad = 12;
  const cell = (s.w - pad * 2) / cols;
  const size = cell * 0.6;
  const icons = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < cols; col++) {
      icons.push(
        <rect
          key={`${row}-${col}`}
          x={s.x + pad + col * cell + (cell - size) / 2}
          y={s.y + 34 + row * (cell + 4)}
          width={size}
          height={size}
          rx={size * 0.28}
          fill={colors[Math.floor(r() * colors.length)]}
          opacity="0.9"
        />,
      );
    }
  }
  return (
    <g opacity={dim}>
      <rect x={s.x + 10} y={s.y + 9} width="24" height="4" rx="2" fill={C.ink} opacity="0.7" />
      <rect x={s.x + s.w - 30} y={s.y + 9} width="20" height="4" rx="2" fill={C.ink} opacity="0.5" />
      {icons}
      <rect x={s.x + 10} y={s.y + s.h - 36} width={s.w - 20} height="28" rx="11" fill="#fff" opacity="0.12" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={s.x + 16 + i * ((s.w - 32) / 4) + ((s.w - 32) / 4 - 18) / 2}
          y={s.y + s.h - 31}
          width="18"
          height="18"
          rx="5"
          fill={colors[(i + 2) % colors.length]}
        />
      ))}
    </g>
  );
}

/** Teclado na base da tela. */
export function Keyboard({ s, hot = [] }) {
  const rows = [10, 9, 7];
  const keys = [];
  rows.forEach((n, ri) => {
    const kw = (s.w - 16 - (n - 1) * 3) / n;
    for (let i = 0; i < n; i++) {
      const id = `${ri}-${i}`;
      keys.push(
        <rect
          key={id}
          x={s.x + 8 + (s.w - 16 - (n * kw + (n - 1) * 3)) / 2 + i * (kw + 3)}
          y={s.y + s.h - 86 + ri * 24}
          width={kw}
          height="20"
          rx="3"
          fill={hot.includes(id) ? C.amber : "#fff"}
          opacity={hot.includes(id) ? 1 : 0.22}
        />,
      );
    }
  });
  return (
    <g>
      <rect x={s.x} y={s.y + s.h - 96} width={s.w} height="96" fill="#000" opacity="0.35" />
      {keys}
      <rect x={s.x + 24} y={s.y + s.h - 14} width={s.w - 48} height="8" rx="3" fill="#fff" opacity="0.22" />
    </g>
  );
}

/** Trinca radial a partir de um ponto de impacto. */
export function Crack({ ox, oy, seed = 1, rays = 9, rings = 3, len = 120, color = "#e6ecf7", width = 1.5 }) {
  const r = rng(seed);
  const paths = [];
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + (r() - 0.5) * 0.6;
    const L = len * (0.55 + r() * 0.65);
    const segs = 4 + Math.floor(r() * 3);
    let d = `M${ox} ${oy}`;
    for (let sIdx = 1; sIdx <= segs; sIdx++) {
      const t = sIdx / segs;
      const x = ox + Math.cos(a) * L * t + (r() - 0.5) * 16;
      const y = oy + Math.sin(a) * L * t + (r() - 0.5) * 16;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(d);
  }
  const ringPaths = [];
  for (let k = 1; k <= rings; k++) {
    const rad = len * 0.16 * k;
    const n = 9 + k * 4;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = rad * (0.75 + r() * 0.5);
      d += `${i ? " L" : "M"}${(ox + Math.cos(a) * rr).toFixed(1)} ${(oy + Math.sin(a) * rr).toFixed(1)}`;
    }
    ringPaths.push(d);
  }
  return (
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <path key={i} d={d} strokeWidth={width} opacity="0.9" />
      ))}
      {ringPaths.map((d, i) => (
        <path key={i} d={d} strokeWidth={width * 0.55} opacity="0.55" />
      ))}
      <circle cx={ox} cy={oy} r="3" fill={color} stroke="none" opacity="0.9" />
    </g>
  );
}

/** Luz difusa sob um objeto. */
export function Glow({ cx, cy, rx = 120, ry = 30, color = C.screenA, opacity = 0.35 }) {
  const id = useSvgId();
  return (
    <>
      <defs>
        <radialGradient id={`r${id}`}>
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#r${id})`} />
    </>
  );
}

/** Mancha difusa (manchas de tela, sombras, corrosão). */
export function Blob({ cx, cy, rx, ry = rx, color = "#000", mid = color, opacity = 1, rot = 0 }) {
  const id = useSvgId();
  return (
    <>
      <defs>
        <radialGradient id={`b${id}`}>
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="0.55" stopColor={mid} stopOpacity={opacity * 0.8} />
          <stop offset="1" stopColor={mid} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#b${id})`} transform={`rotate(${rot} ${cx} ${cy})`} />
    </>
  );
}

/** Círculos de toque (toque fantasma). */
export function Ripple({ cx, cy, color = C.amber }) {
  return (
    <g fill="none" stroke={color}>
      <circle cx={cx} cy={cy} r="6" fill={color} stroke="none" />
      <circle cx={cx} cy={cy} r="13" strokeWidth="2" opacity="0.8" />
      <circle cx={cx} cy={cy} r="22" strokeWidth="1.5" opacity="0.4" />
    </g>
  );
}

/** Hachura para regiões inativas. */
export function Hatch({ x, y, w, h, color = C.red }) {
  const id = useSvgId();
  return (
    <>
      <defs>
        <pattern id={`h${id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3" height="8" fill={color} opacity="0.55" />
        </pattern>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#h${id})`} />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

export function BatteryPack({ x = 120, y = 50, w = 160, h = 210, rot = -8, children }) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 4} y={y + 10} width={w} height={h} rx="14" fill="#000" opacity="0.25" />
      <rect x={x} y={y} width={w} height={h} rx="14" fill={C.cell} stroke={C.cellEdge} strokeWidth="2" />
      <rect x={x + 14} y={y + 26} width={w - 28} height={h - 52} rx="6" fill="#fff" opacity="0.06" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={x + 24} y={y + 42 + i * 14} width={w - 48 - i * 14} height="4" rx="2" fill={C.mute} opacity="0.5" />
      ))}
      <path d={`M${x + 40} ${y + h - 46} h${w - 80}`} stroke={C.amber} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <rect x={x + w / 2 - 22} y={y - 10} width="44" height="18" rx="4" fill={C.gold} />
      <rect x={x + w / 2 - 14} y={y - 24} width="28" height="14" rx="2" fill="#ffcf5a" opacity="0.8" />
      {children}
    </g>
  );
}

/** Placa de carga com conector USB-C. */
export function ChargeBoard({ x = 95, y = 110, w = 210, h = 90, children, pins = 8, pinColor = C.gold }) {
  const px = x + w / 2 - 34;
  const py = y + h - 6;
  return (
    <g>
      <rect x={x + 4} y={y + 8} width={w} height={h} rx="10" fill="#000" opacity="0.25" />
      <rect x={x} y={y} width={w} height={h} rx="10" fill={C.pcb} stroke={C.pcbLight} strokeWidth="2" />
      {[
        [x + 16, y + 16],
        [x + w - 16, y + 16],
        [x + 16, y + h - 16],
        [x + w - 16, y + h - 16],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6" fill={C.gold} />
          <circle cx={cx} cy={cy} r="2.5" fill={C.pcb} />
        </g>
      ))}
      <rect x={x + 40} y={y + 14} width="26" height="18" rx="2" fill={C.metal} />
      <rect x={x + w - 70} y={y + 14} width="20" height="12" rx="2" fill="#0b0f1a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={x + 80 + i * 10} y={y + 18} width="5" height="8" rx="1" fill={C.gold} opacity="0.8" />
      ))}
      <path d={`M${x + 20} ${y + h / 2} h${w - 40}`} stroke={C.pcbLight} strokeWidth="1.5" opacity="0.6" />
      {/* porta USB-C */}
      <rect x={px} y={py - 22} width="68" height="30" rx="10" fill={C.metal} stroke={C.metalDark} strokeWidth="2" />
      <rect x={px + 8} y={py - 14} width="52" height="14" rx="7" fill="#0b0f1a" />
      {Array.from({ length: pins }).map((_, i) => (
        <rect key={i} x={px + 13 + i * (42 / (pins - 1))} y={py - 10} width="2" height="6" rx="1" fill={pinColor} />
      ))}
      {children}
    </g>
  );
}

export function Cable({ x = 200, y = 230, color = C.ink, len = 70, angle = 0 }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <rect x={x - 11} y={y} width="22" height="26" rx="6" fill={C.metal} stroke={C.metalDark} strokeWidth="2" />
      <rect x={x - 7} y={y - 6} width="14" height="8" rx="3" fill={C.metalDark} />
      <path d={`M${x} ${y + 26} c0 ${len * 0.5} 30 ${len * 0.5} 30 ${len}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

/** Placa principal com chips e blindagens. */
export function Mainboard({ x = 110, y = 60, w = 180, h = 190, rot = -10, children }) {
  const r = rng(5);
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 4} y={y + 10} width={w} height={h} rx="12" fill="#000" opacity="0.25" />
      <rect x={x} y={y} width={w} height={h} rx="12" fill={C.pcb} stroke={C.pcbLight} strokeWidth="2" />
      {[
        [x + 14, y + 14],
        [x + w - 14, y + 14],
        [x + 14, y + h - 14],
        [x + w - 14, y + h - 14],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill={C.gold} />
          <circle cx={cx} cy={cy} r="2" fill={C.pcb} />
        </g>
      ))}
      {/* câmeras */}
      <rect x={x + 24} y={y + 28} width="34" height="62" rx="8" fill="#0b0f1a" />
      {[0, 1].map((i) => (
        <circle key={i} cx={x + 41} cy={y + 46 + i * 26} r="9" fill="#1e2a44" stroke={C.metalDark} />
      ))}
      {/* blindagem e chips */}
      <rect x={x + 72} y={y + 30} width="80" height="56" rx="5" fill={C.metal} opacity="0.9" />
      <rect x={x + 60} y={y + 100} width="54" height="46" rx="4" fill="#0b0f1a" />
      <rect x={x + 122} y={y + 100} width="40" height="30" rx="3" fill="#0b0f1a" />
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={i}
          x={x + 24 + r() * (w - 56)}
          y={y + 150 + r() * 26}
          width={4 + r() * 6}
          height="4"
          rx="1"
          fill={i % 3 ? C.gold : C.metal}
          opacity="0.85"
        />
      ))}
      <rect x={x + w - 36} y={y + 50} width="18" height="40" rx="3" fill={C.gold} opacity="0.8" />
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Glifos                                                              */
/* ------------------------------------------------------------------ */

export function Slash({ cx, cy, size = 40, color = C.red }) {
  return <line x1={cx - size / 2} y1={cy + size / 2} x2={cx + size / 2} y2={cy - size / 2} stroke={color} strokeWidth="5" strokeLinecap="round" />;
}

export function Wifi({ cx, cy, size = 60, color = C.ink, off = false }) {
  const s = size / 60;
  return (
    <g fill="none" stroke={color} strokeWidth={5 * s} strokeLinecap="round">
      <path d={`M${cx - 30 * s} ${cy - 6 * s} a 42 42 0 0 1 ${60 * s} 0`} />
      <path d={`M${cx - 19 * s} ${cy + 6 * s} a 27 27 0 0 1 ${38 * s} 0`} />
      <path d={`M${cx - 8 * s} ${cy + 18 * s} a 11 11 0 0 1 ${16 * s} 0`} />
      <circle cx={cx} cy={cy + 28 * s} r={3 * s} fill={color} stroke="none" />
      {off && <Slash cx={cx} cy={cy + 8 * s} size={size * 1.1} />}
    </g>
  );
}

export function Signal({ cx, cy, size = 50, color = C.ink, off = false }) {
  const s = size / 50;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={cx - 24 * s + i * 13 * s} y={cy + 20 * s - (12 + i * 10) * s} width={9 * s} height={(12 + i * 10) * s} rx={2 * s} fill={color} opacity={i < 1 ? 1 : 0.35} />
      ))}
      {off && <Slash cx={cx} cy={cy} size={size * 1.2} />}
    </g>
  );
}

export function Pin({ cx, cy, size = 50, color = C.ink, off = false }) {
  const s = size / 50;
  return (
    <g>
      <path d={`M${cx} ${cy + 24 * s} C ${cx - 20 * s} ${cy} ${cx - 20 * s} ${cy - 10 * s} ${cx} ${cy - 24 * s} C ${cx + 20 * s} ${cy - 10 * s} ${cx + 20 * s} ${cy} ${cx} ${cy + 24 * s} Z`} fill={color} />
      <circle cx={cx} cy={cy - 7 * s} r={7 * s} fill={C.screenB} />
      {off && <Slash cx={cx} cy={cy} size={size * 1.2} />}
    </g>
  );
}

export function Sim({ cx, cy, size = 60, color = C.amber, question = false, off = false }) {
  const s = size / 60;
  const w = 44 * s;
  const h = 58 * s;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <path d={`M${x} ${y + 6 * s} q0 -${6 * s} ${6 * s} -${6 * s} h${w - 20 * s} l${14 * s} ${14 * s} v${h - 20 * s} q0 ${6 * s} -${6 * s} ${6 * s} h${-(w - 12 * s)} q-${6 * s} 0 -${6 * s} -${6 * s} z`} fill={color} />
      <rect x={x + 10 * s} y={y + 22 * s} width={w - 20 * s} height={24 * s} rx={3 * s} fill={C.gold} />
      <path d={`M${x + 10 * s} ${y + 34 * s} h${w - 20 * s} M${cx} ${y + 22 * s} v${24 * s}`} stroke={C.body} strokeWidth={1.5 * s} />
      {question && (
        <text x={cx + 30 * s} y={cy - 14 * s} fontSize={30 * s} fontWeight="700" fill={C.red} fontFamily="Sora, Inter, sans-serif">
          ?
        </text>
      )}
      {off && <Slash cx={cx} cy={cy} size={size * 1.2} />}
    </g>
  );
}

export function Speaker({ cx, cy, size = 60, color = C.ink, off = false }) {
  const s = size / 60;
  return (
    <g>
      <path d={`M${cx - 26 * s} ${cy - 10 * s} h${12 * s} l${16 * s} -${14 * s} v${48 * s} l-${16 * s} -${14 * s} h-${12 * s} z`} fill={color} />
      {!off && (
        <g fill="none" stroke={color} strokeWidth={4 * s} strokeLinecap="round">
          <path d={`M${cx + 10 * s} ${cy - 8 * s} a 12 12 0 0 1 0 ${16 * s}`} />
          <path d={`M${cx + 18 * s} ${cy - 18 * s} a 24 24 0 0 1 0 ${36 * s}`} />
        </g>
      )}
      {off && <Slash cx={cx + 6 * s} cy={cy} size={size * 1.1} />}
    </g>
  );
}

export function Mic({ cx, cy, size = 60, color = C.ink, off = false }) {
  const s = size / 60;
  return (
    <g>
      <rect x={cx - 9 * s} y={cy - 28 * s} width={18 * s} height={36 * s} rx={9 * s} fill={color} />
      <path d={`M${cx - 18 * s} ${cy - 4 * s} a 18 18 0 0 0 ${36 * s} 0 M${cx} ${cy + 14 * s} v${12 * s} M${cx - 10 * s} ${cy + 26 * s} h${20 * s}`} fill="none" stroke={color} strokeWidth={4 * s} strokeLinecap="round" />
      {off && <Slash cx={cx} cy={cy} size={size * 1.1} />}
    </g>
  );
}

export function Bolt({ cx, cy, size = 40, color = C.amber, off = false }) {
  const s = size / 40;
  return (
    <g>
      <path d={`M${cx + 4 * s} ${cy - 24 * s} L${cx - 14 * s} ${cy + 4 * s} h${12 * s} l-${6 * s} ${20 * s} L${cx + 14 * s} ${cy - 4 * s} h-${12 * s} z`} fill={color} />
      {off && <Slash cx={cx} cy={cy} size={size * 1.4} />}
    </g>
  );
}

export function Clock({ cx, cy, size = 40, color = C.ink }) {
  const s = size / 40;
  return (
    <g fill="none" stroke={color} strokeWidth={4 * s} strokeLinecap="round">
      <circle cx={cx} cy={cy} r={18 * s} />
      <path d={`M${cx} ${cy - 10 * s} V${cy} h${8 * s}`} />
    </g>
  );
}

export function Refresh({ cx, cy, size = 50, color = C.green }) {
  const s = size / 50;
  return (
    <g fill="none" stroke={color} strokeWidth={5 * s} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${cx + 20 * s} ${cy - 6 * s} a 21 21 0 1 0 ${0} ${12 * s}`} />
      <path d={`M${cx + 20 * s} ${cy - 20 * s} v${14 * s} h-${14 * s}`} />
    </g>
  );
}

export function Gear({ cx, cy, size = 50, color = C.ink }) {
  const s = size / 50;
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const rad = (i % 2 ? 22 : 17) * s;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return (
    <g>
      <polygon points={pts.join(" ")} fill={color} />
      <circle cx={cx} cy={cy} r={7 * s} fill={C.screenB} />
    </g>
  );
}

export function Lock({ cx, cy, size = 40, color = C.ink }) {
  const s = size / 40;
  return (
    <g>
      <path d={`M${cx - 10 * s} ${cy - 4 * s} v-${8 * s} a 10 10 0 0 1 ${20 * s} 0 v${8 * s}`} fill="none" stroke={color} strokeWidth={4 * s} />
      <rect x={cx - 16 * s} y={cy - 4 * s} width={32 * s} height={26 * s} rx={5 * s} fill={color} />
      <circle cx={cx} cy={cy + 9 * s} r={3.5 * s} fill={C.screenB} />
    </g>
  );
}

/** Dedo tocando a tela. */
export function Finger({ cx, cy, size = 60, color = "#f1c3a0", rot = 20 }) {
  const s = size / 60;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <rect x={cx - 12 * s} y={cy - 6 * s} width={24 * s} height={70 * s} rx={12 * s} fill={color} />
      <rect x={cx - 12 * s} y={cy + 30 * s} width={24 * s} height={36 * s} rx={10 * s} fill="#e2aa83" />
      <ellipse cx={cx} cy={cy - 2 * s} rx={7 * s} ry={4 * s} fill="#fff" opacity="0.45" />
    </g>
  );
}

export function Hourglass({ cx, cy, size = 44, color = C.amber }) {
  const s = size / 44;
  return (
    <g>
      <path d={`M${cx - 14 * s} ${cy - 20 * s} h${28 * s} v${6 * s} l-${12 * s} ${14 * s} l${12 * s} ${14 * s} v${6 * s} h-${28 * s} v-${6 * s} l${12 * s} -${14 * s} l-${12 * s} -${14 * s} z`} fill="none" stroke={color} strokeWidth={4 * s} strokeLinejoin="round" />
      <path d={`M${cx - 7 * s} ${cy + 16 * s} h${14 * s} l-${7 * s} -${9 * s} z`} fill={color} />
    </g>
  );
}

export function Warn({ cx, cy, size = 44, color = C.amber }) {
  const s = size / 44;
  return (
    <g>
      <path d={`M${cx} ${cy - 20 * s} L${cx + 22 * s} ${cy + 18 * s} H${cx - 22 * s} Z`} fill={color} strokeLinejoin="round" stroke={color} strokeWidth={4 * s} />
      <path d={`M${cx} ${cy - 6 * s} v${12 * s}`} stroke={C.body} strokeWidth={4 * s} strokeLinecap="round" />
      <circle cx={cx} cy={cy + 12 * s} r={2.2 * s} fill={C.body} />
    </g>
  );
}

export function Check({ cx, cy, size = 40, color = C.green }) {
  const s = size / 40;
  return (
    <g>
      <circle cx={cx} cy={cy} r={20 * s} fill={color} />
      <path d={`M${cx - 9 * s} ${cy} l${6 * s} ${6 * s} l${12 * s} -${13 * s}`} fill="none" stroke={C.body} strokeWidth={4.5 * s} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function Cross({ cx, cy, size = 40, color = C.red }) {
  const s = size / 40;
  return (
    <g>
      <circle cx={cx} cy={cy} r={20 * s} fill={color} />
      <path d={`M${cx - 7 * s} ${cy - 7 * s} l${14 * s} ${14 * s} M${cx + 7 * s} ${cy - 7 * s} l-${14 * s} ${14 * s}`} stroke={C.body} strokeWidth={4.5 * s} strokeLinecap="round" />
    </g>
  );
}

export function ArrowDown({ cx, cy, size = 40, color = C.red }) {
  const s = size / 40;
  return <path d={`M${cx} ${cy - 18 * s} v${34 * s} m-${12 * s} -${12 * s} l${12 * s} ${12 * s} l${12 * s} -${12 * s}`} fill="none" stroke={color} strokeWidth={5 * s} strokeLinecap="round" strokeLinejoin="round" />;
}

export function Drop({ cx, cy, size = 24, color = "#7cc8ff" }) {
  const s = size / 24;
  return (
    <g>
      <path d={`M${cx} ${cy - 12 * s} C ${cx + 10 * s} ${cy} ${cx + 9 * s} ${cy + 6 * s} ${cx + 9 * s} ${cy + 6 * s} a 9 9 0 0 1 -${18 * s} 0 C ${cx - 9 * s} ${cy + 6 * s} ${cx - 10 * s} ${cy} ${cx} ${cy - 12 * s} z`} fill={color} opacity="0.9" />
      <circle cx={cx - 3 * s} cy={cy + 4 * s} r={2 * s} fill="#fff" opacity="0.7" />
    </g>
  );
}

/** Ícone de bateria com nível. */
export function BatteryIcon({ cx, cy, w = 90, h = 42, level = 0.5, color, off = false, bolt = false }) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  const fill = color ?? (level < 0.25 ? C.red : level < 0.6 ? C.amber : C.green);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="none" stroke={C.ink} strokeWidth="4" />
      <rect x={x + w + 3} y={cy - 9} width="7" height="18" rx="2" fill={C.ink} />
      <rect x={x + 6} y={y + 6} width={Math.max(4, (w - 12) * level)} height={h - 12} rx="4" fill={fill} />
      {bolt && <Bolt cx={cx} cy={cy} size={h * 0.9} color={C.ink} />}
      {off && <Slash cx={cx} cy={cy} size={w * 0.7} />}
    </g>
  );
}

export function Label({ x, y, text, color = C.ink, size = 13, anchor = "middle" }) {
  return (
    <text x={x} y={y} fontSize={size} fontFamily="'JetBrains Mono', ui-monospace, monospace" fontWeight="600" fill={color} textAnchor={anchor} letterSpacing="1">
      {text}
    </text>
  );
}
