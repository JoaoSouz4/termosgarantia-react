import { C, rng } from "./utils";
import {
  ArrowDown,
  Blob,
  Bolt,
  Check,
  Crack,
  Cross,
  Finger,
  Gear,
  Glow,
  Hatch,
  HomeGrid,
  Keyboard,
  Label,
  Lock,
  Phone as PhoneBase,
  Refresh,
  Ripple,
  Slash,
} from "./primitives";

const tilts = [-6, 4, -10];

/* Passa — toque fantasma */
export function GhostTouch({ v }) {
  const r = rng(40 + v);
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone v={v}>
        {(s) =>
          v === 1 ? (
            <>
              <HomeGrid s={s} seed={v} dim={0.35} />
              <rect x={s.x + 12} y={s.y + 40} width={s.w - 24} height="34" rx="8" fill="#fff" opacity="0.15" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={s.x + 20 + i * 12} y={s.y + 52} width="8" height="10" rx="2" fill={C.ink} opacity={0.5 + (i % 3) * 0.2} />
              ))}
              <Keyboard s={s} hot={["0-3", "1-5", "2-2"]} />
              <Ripple cx={s.x + 46} cy={s.y + s.h - 76} />
              <Ripple cx={s.x + 86} cy={s.y + s.h - 30} />
            </>
          ) : v === 2 ? (
            <>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={s.x + 12} y={s.y + 30 + i * 34} width={s.w - 24} height="26" rx="6" fill="#fff" opacity={i === 2 ? 0.28 : 0.12} />
              ))}
              <ArrowDown cx={s.cx} cy={s.y + s.h - 40} size={34} color={C.amber} />
              <ArrowDown cx={s.cx} cy={s.y + 40} size={34} color={C.amber} />
              <Ripple cx={s.x + 30} cy={s.y + 100} />
              <Ripple cx={s.x + s.w - 30} cy={s.y + 168} />
            </>
          ) : (
            <>
              <HomeGrid s={s} seed={v} />
              {[0, 1, 2].map((i) => (
                <Ripple key={i} cx={s.x + 24 + r() * (s.w - 48)} cy={s.y + 50 + r() * (s.h - 110)} />
              ))}
              <rect x={s.x + 18} y={s.y + 96} width={s.w - 36} height="52" rx="8" fill={C.ink} opacity="0.9" />
              <rect x={s.x + 28} y={s.y + 108} width="40" height="6" rx="3" fill={C.body} />
              <rect x={s.x + 28} y={s.y + 122} width="70" height="6" rx="3" fill={C.body} opacity="0.5" />
            </>
          )
        }
      </Phone>
      <Label x={200} y={292} text="SEM TOQUE DO USUÁRIO" color={C.amber} size={11} />
    </>
  );
}

/* Passa — touch falhando */
export function NoTouch({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone v={v}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={v + 3} dim={0.55} />
            {v === 0 && <Hatch x={s.x} y={s.y} w={s.w} h={s.h * 0.45} />}
            {v === 1 && <Hatch x={s.x} y={s.y + s.h * 0.62} w={s.w} h={s.h * 0.38} />}
            {v === 2 && <Hatch x={s.x} y={s.y} w={s.w} h={s.h} />}
          </>
        )}
      </Phone>
      <Finger cx={v === 1 ? 236 : 210} cy={v === 1 ? 208 : v === 2 ? 150 : 90} rot={v === 2 ? -25 : 22} />
      <Cross cx={v === 1 ? 262 : 250} cy={v === 1 ? 170 : v === 2 ? 110 : 62} size={30} />
    </>
  );
}

/* Passa — tela piscando */
export function Flicker({ v }) {
  const r = rng(90 + v);
  return (
    <>
      <Glow cx={200} cy={270} color={C.cyan} />
      <Phone v={v}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={v + 6} dim={v === 1 ? 0.5 : 1} />
            {v === 0 &&
              [0, 1, 2, 3].map((i) => (
                <rect key={i} x={s.x} y={s.y + 30 + i * 60 + r() * 10} width={s.w} height={10 + r() * 10} fill="#fff" opacity="0.5" />
              ))}
            {v === 1 && (
              <>
                <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="#000" opacity="0.55" />
                <Bolt cx={s.cx} cy={s.cy - 10} size={70} color={C.amber} />
              </>
            )}
            {v === 2 &&
              Array.from({ length: 26 }).map((_, i) => (
                <rect key={i} x={s.x} y={s.y + i * 10} width={s.w} height="5" fill={i % 2 ? "#000" : "#fff"} opacity={i % 2 ? 0.45 : 0.22} />
              ))}
          </>
        )}
      </Phone>
      {v !== 1 && <Bolt cx={300} cy={60} size={44} color={C.amber} />}
    </>
  );
}

/* Não passa — vidro quebrado */
export function GlassCracked({ v }) {
  const chip = v === 2;
  return (
    <>
      <Glow cx={200} cy={270} color={C.red} />
      <Phone v={v}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={v + 9} dim={0.85} />
            {v === 0 && <Crack ox={s.x + 26} oy={s.y + 40} seed={3} len={150} rays={10} />}
            {v === 1 && <Crack ox={s.cx} oy={s.cy} seed={7} len={140} rays={12} rings={4} />}
            {v === 2 && (
              <>
                <Crack ox={s.x + s.w - 18} oy={s.y + s.h - 30} seed={11} len={160} rays={9} />
                <path d={`M${s.x + s.w - 40} ${s.y + s.h} L${s.x + s.w} ${s.y + s.h - 52} V${s.y + s.h} Z`} fill={C.bezel} />
              </>
            )}
          </>
        )}
      </Phone>
      {chip && <Crack ox={262} oy={262} seed={13} len={30} rays={5} rings={0} color={C.edge} />}
    </>
  );
}

/* Não passa — listras */
export function Stripes({ v }) {
  const r = rng(120 + v);
  const palette = [C.cyan, C.violet, "#ff8a65", C.green, "#fff", C.amber];
  return (
    <>
      <Glow cx={200} cy={270} color={C.violet} />
      <Phone v={v}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={v + 12} dim={0.6} />
            {v === 0 &&
              Array.from({ length: 16 }).map((_, i) => (
                <rect key={i} x={s.x + r() * s.w} y={s.y} width={1 + r() * 4} height={s.h} fill={palette[i % palette.length]} opacity="0.85" />
              ))}
            {v === 1 &&
              Array.from({ length: 14 }).map((_, i) => (
                <rect key={i} x={s.x} y={s.y + r() * s.h} width={s.w} height={1 + r() * 4} fill={palette[i % palette.length]} opacity="0.85" />
              ))}
            {v === 2 &&
              Array.from({ length: 60 }).map((_, i) => (
                <rect
                  key={i}
                  x={s.x + (i % 6) * (s.w / 6)}
                  y={s.y + Math.floor(i / 6) * (s.h / 10)}
                  width={s.w / 6}
                  height={s.h / 10}
                  fill={palette[(i * 7) % palette.length]}
                  opacity={r() > 0.4 ? 0.55 : 0}
                />
              ))}
          </>
        )}
      </Phone>
    </>
  );
}

/* Não passa — manchas */
export function Spots({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.violet} />
      <Phone v={v}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={v + 15} dim={0.8} />
            {v === 0 && <Blob cx={s.cx + 10} cy={s.y + s.h * 0.62} rx={58} ry={74} color="#000" mid="#5b2bff" rot={-20} />}
            {v === 1 && (
              <>
                <Blob cx={s.x + 30} cy={s.y + 60} rx={22} color="#000" mid="#3a2a8a" />
                <Blob cx={s.x + 92} cy={s.y + 120} rx={16} color="#000" mid="#3a2a8a" />
                <Blob cx={s.x + 50} cy={s.y + 196} rx={26} ry={20} color="#000" mid="#3a2a8a" />
              </>
            )}
            {v === 2 && (
              <>
                <Blob cx={s.x + s.w} cy={s.y + 40} rx={60} ry={50} color="#fff" mid="#dfe6ff" opacity={0.95} />
                <Blob cx={s.x + 30} cy={s.y + s.h - 40} rx={40} ry={30} color="#000" mid="#2a1f6e" />
              </>
            )}
          </>
        )}
      </Phone>
    </>
  );
}

/* Não passa — sem imagem */
export function BlackScreen({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.red} opacity={0.25} />
      <Phone v={v} dark>
        {(s) => (
          <>
            {v === 2 && <circle cx={s.x + 16} cy={s.y + 13} r="3" fill={C.green} />}
            {v === 0 && (
              <g opacity="0.25">
                <rect x={s.x + 30} y={s.cy - 36} width={s.w - 60} height="60" rx="8" fill="none" stroke={C.ink} strokeWidth="4" />
                <Slash cx={s.cx} cy={s.cy - 6} size={70} color={C.ink} />
              </g>
            )}
          </>
        )}
      </Phone>
      {v === 0 &&
        [-1, 1].map((side) => (
          <g key={side} fill="none" stroke={C.amber} strokeWidth="4" strokeLinecap="round">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${200 + side * (82 + i * 12)} ${100 + i * 8} q${side * 8} ${40 - i * 8} 0 ${80 - i * 16}`} opacity={1 - i * 0.3} />
            ))}
          </g>
        ))}
      {v === 1 && (
        <g fill="none" stroke={C.cyan} strokeWidth="4" strokeLinecap="round">
          <path d="M226 36 a 22 22 0 0 1 20 20" />
          <path d="M232 20 a 38 38 0 0 1 36 36" />
          <path d="M238 4 a 54 54 0 0 1 52 52" opacity="0.5" />
        </g>
      )}
      <Label x={200} y={292} text={v === 2 ? "LED ACESO · TELA APAGADA" : v === 1 ? "TOCA · NÃO MOSTRA IMAGEM" : "VIBRA · TELA APAGADA"} color={C.red} size={11} />
    </>
  );
}

/* Não passa — touch travado após atualização */
export function TouchAfterUpdate({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.cyan} />
      <Phone v={v}>
        {(s) => (
          <>
            {v === 0 && (
              <>
                <Refresh cx={s.cx} cy={s.cy - 50} size={70} color={C.ink} />
                <rect x={s.x + 20} y={s.cy + 10} width={s.w - 40} height="12" rx="6" fill="#fff" opacity="0.2" />
                <rect x={s.x + 20} y={s.cy + 10} width={s.w - 40} height="12" rx="6" fill={C.green} />
                <Check cx={s.cx} cy={s.cy + 56} size={34} />
                <Lock cx={s.cx} cy={s.y + s.h - 40} size={30} color={C.red} />
              </>
            )}
            {v === 1 && (
              <>
                <Gear cx={s.cx} cy={s.cy - 36} size={80} color={C.ink} />
                <Label x={s.cx} y={s.cy + 36} text="ATUALIZANDO" color={C.ink} size={10} />
                <rect x={s.x + 20} y={s.cy + 50} width={s.w - 40} height="10" rx="5" fill="#fff" opacity="0.2" />
                <rect x={s.x + 20} y={s.cy + 50} width={(s.w - 40) * 0.98} height="10" rx="5" fill={C.cyan} />
              </>
            )}
            {v === 2 && (
              <>
                <HomeGrid s={s} seed={v + 18} dim={0.35} />
                <g fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round">
                  <path d={`M${s.cx} ${s.cy - 30} a 30 30 0 1 1 -30 30`} />
                </g>
              </>
            )}
          </>
        )}
      </Phone>
      <Finger cx={v === 2 ? 220 : 244} cy={v === 2 ? 170 : 196} rot={18} />
      <Cross cx={v === 2 ? 258 : 280} cy={v === 2 ? 128 : 160} size={30} />
    </>
  );
}

/* Celular com inclinação variando pela versão */
function Phone({ v, dark, children }) {
  return (
    <PhoneBase tilt={tilts[v % 3]} dark={dark}>
      {children}
    </PhoneBase>
  );
}
