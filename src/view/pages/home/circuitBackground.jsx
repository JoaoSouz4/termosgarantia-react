import { useMemo } from "react";

/**
 * Trilhas de placa de circuito no fundo do herói, com pulsos de sinal
 * percorrendo algumas trilhas. Determinístico (mesmo desenho a cada carga).
 */

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

const W = 1440;
const H = 900;
const STEP = 40;

/** Trilha ortogonal com curvas de 45°, como em uma PCB. */
function makeTrace(r) {
  const fromLeft = r() < 0.5;
  let x = fromLeft ? -20 : W + 20;
  let y = Math.round((60 + r() * (H - 120)) / STEP) * STEP;
  const dir = fromLeft ? 1 : -1;
  const pts = [[x, y]];
  const segments = 3 + Math.floor(r() * 3);
  for (let i = 0; i < segments; i++) {
    x += dir * (STEP * (2 + Math.floor(r() * 6)));
    pts.push([x, y]);
    if (i < segments - 1) {
      const d = STEP * (1 + Math.floor(r() * 3)) * (r() < 0.5 ? -1 : 1);
      x += dir * Math.abs(d);
      y = Math.min(H - 40, Math.max(40, y + d));
      pts.push([x, y]);
    }
  }
  const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(" ");
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { d, end: pts[pts.length - 1], len };
}

export function CircuitBackground({ className = "" }) {
  const traces = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 22 }, (_, i) => ({ ...makeTrace(r), pulse: i % 3 === 0, delay: r() * 8, dur: 7 + r() * 6 }));
  }, []);

  const chips = useMemo(() => {
    const r = rng(19);
    return Array.from({ length: 5 }, () => ({
      x: Math.round((80 + r() * (W - 160)) / STEP) * STEP,
      y: Math.round((80 + r() * (H - 160)) / STEP) * STEP,
      w: STEP * (1 + Math.floor(r() * 2)),
      h: STEP,
    }));
  }, []);

  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={`circuit ${className}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t, i) => (
          <g key={i}>
            <path d={t.d} className="circuit-trace" strokeWidth="1.5" />
            <circle cx={t.end[0]} cy={t.end[1]} r="4" className="circuit-pad" />
            {t.pulse && (
              <path
                d={t.d}
                className="circuit-pulse"
                strokeWidth="2"
                style={{
                  "--len": t.len,
                  strokeDasharray: `60 ${t.len}`,
                  animationDuration: `${t.dur}s`,
                  animationDelay: `${t.delay}s`,
                }}
              />
            )}
          </g>
        ))}
      </g>
      {chips.map((c, i) => (
        <g key={i} className="circuit-chip">
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="4" />
          {Array.from({ length: c.w / 10 - 1 }, (_, k) => (
            <line key={k} x1={c.x + 10 + k * 10} y1={c.y - 5} x2={c.x + 10 + k * 10} y2={c.y} />
          ))}
        </g>
      ))}
    </svg>
  );
}
