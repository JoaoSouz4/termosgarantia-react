import { C, useSvgId } from "./utils";
import { Crack, HomeGrid, Phone } from "./primitives";

/**
 * Ilustração do herói: o aparelho reparado (com o selo de garantia na tela)
 * à frente do aparelho trincado, sobre a bancada, com ferramentas.
 */
export function HeroArt({ className = "" }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 440 470" className={className} role="img" aria-label="Celular reparado com selo de garantia, ao lado de um celular com a tela trincada">
      <defs>
        <radialGradient id={`floor${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.screenA} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.screenA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`halo${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.amber} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.amber} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`scr${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#123a9e" />
          <stop offset="1" stopColor="#060f2e" />
        </linearGradient>
      </defs>

      {/* luz no chão e halo */}
      <ellipse cx="225" cy="430" rx="190" ry="34" fill={`url(#floor${id})`} />
      <circle cx="260" cy="210" r="170" fill={`url(#halo${id})`} />

      {/* aparelho trincado, atrás */}
      <Phone x={70} y={70} w={150} h={312} tilt={-14}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={4} dim={0.45} />
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="#000" opacity="0.35" />
            <Crack ox={s.x + 40} oy={s.y + 70} seed={5} len={190} rays={12} rings={3} />
          </>
        )}
      </Phone>

      {/* aparelho reparado, à frente */}
      <g>
        <rect x="186" y="58" width="176" height="362" rx="32" fill="#000" opacity="0.3" transform="rotate(5 274 240) translate(6 12)" />
        <g transform="rotate(5 274 240)">
          <rect x="186" y="50" width="176" height="362" rx="32" fill={C.body} stroke={C.edge} strokeWidth="2.5" />
          <rect x="197" y="61" width="154" height="340" rx="23" fill={`url(#scr${id})`} />
          <circle cx="274" cy="78" r="5" fill={C.bezel} />
          <rect x="362" y="130" width="3.5" height="44" rx="1.75" fill={C.edge} />

          {/* barra de status */}
          <rect x="212" y="74" width="28" height="5" rx="2.5" fill={C.ink} opacity="0.7" />
          <rect x="312" y="74" width="24" height="5" rx="2.5" fill={C.ink} opacity="0.5" />

          {/* selo de garantia */}
          <circle cx="274" cy="190" r="62" fill={C.green} opacity="0.12" />
          <path
            d="M274 140 l40 15 v32 c0 30 -18 50 -40 60 c-22 -10 -40 -30 -40 -60 v-32 z"
            fill={C.green}
            opacity="0.18"
            stroke={C.green}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M256 192 l12 12 l24 -26" fill="none" stroke={C.green} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          <text x="274" y="282" textAnchor="middle" fontFamily="Sora, Inter, sans-serif" fontWeight="700" fontSize="22" fill={C.ink}>
            Garantia
          </text>
          <text x="274" y="306" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" fill={C.green}>
            3 meses
          </text>

          {/* linha do tempo da garantia */}
          <rect x="222" y="328" width="104" height="8" rx="4" fill="#fff" opacity="0.14" />
          <rect x="222" y="328" width="70" height="8" rx="4" fill={C.green} />

          <rect x="244" y="384" width="60" height="5" rx="2.5" fill="#fff" opacity="0.4" />
          {/* reflexo */}
          <path d="M197 300 L351 110 V61 H197 Z" fill="#fff" opacity="0.04" />
        </g>
      </g>

      {/* chave de fenda */}
      <g transform="rotate(-38 360 400)">
        <rect x="352" y="330" width="16" height="58" rx="7" fill={C.amber} />
        <rect x="352" y="344" width="16" height="5" fill="#b9801f" />
        <rect x="352" y="358" width="16" height="5" fill="#b9801f" />
        <rect x="358" y="388" width="4" height="46" rx="2" fill={C.metal} />
      </g>
      {/* parafusos */}
      {[
        [96, 418],
        [118, 428],
        [140, 414],
      ].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="6" fill={C.metal} />
          <path d={`M${cx - 3.5} ${cy} h7`} stroke={C.metalDark} strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  );
}
