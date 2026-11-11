import { C, rng } from "./utils";
import {
  ArrowDown,
  BatteryIcon,
  BatteryPack,
  Blob,
  Bolt,
  Cable,
  Clock,
  Cross,
  Drop,
  Glow,
  Label,
  Phone,
  Warn,
} from "./primitives";

/* Passa — descarregando rápido */
export function DrainFast({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone tilt={v === 1 ? 5 : -6}>
        {(s) => (
          <>
            {v === 0 && (
              <>
                <BatteryIcon cx={s.cx} cy={s.cy - 40} w={84} h={40} level={0.16} />
                <Label x={s.cx} y={s.cy + 6} text="16%" color={C.red} size={22} />
                <ArrowDown cx={s.cx - 26} cy={s.cy + 48} size={30} />
                <Clock cx={s.cx + 22} cy={s.cy + 48} size={32} color={C.ink} />
              </>
            )}
            {v === 1 && (
              <>
                <circle cx={s.cx} cy={s.cy - 24} r="46" fill="none" stroke="#fff" strokeWidth="10" opacity="0.15" />
                <circle cx={s.cx} cy={s.cy - 24} r="46" fill="none" stroke={C.amber} strokeWidth="10" strokeDasharray="167 289" strokeLinecap="round" transform={`rotate(-90 ${s.cx} ${s.cy - 24})`} />
                <Label x={s.cx} y={s.cy - 16} text="58%" color={C.ink} size={22} />
                <Label x={s.cx} y={s.cy + 50} text="SAÚDE DA BATERIA" color={C.mute} size={9} />
              </>
            )}
            {v === 2 && (
              <>
                {[0.9, 0.5, 0.08].map((lvl, i) => (
                  <g key={i}>
                    <BatteryIcon cx={s.cx - 8} cy={s.y + 60 + i * 64} w={70} h={32} level={lvl} />
                    <Label x={s.cx + 50} y={s.y + 65 + i * 64} text={`${Math.round(lvl * 100)}%`} color={C.ink} size={10} anchor="start" />
                  </g>
                ))}
                <Clock cx={s.cx} cy={s.y + s.h - 36} size={28} color={C.amber} />
              </>
            )}
          </>
        )}
      </Phone>
    </>
  );
}

/* Passa — não carrega */
export function NotCharging({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone tilt={v === 2 ? 4 : -6}>
        {(s) => (
          <>
            {v === 0 && <BatteryIcon cx={s.cx} cy={s.cy - 20} w={86} h={42} level={0.04} off />}
            {v === 1 && <Bolt cx={s.cx} cy={s.cy - 20} size={80} color={C.amber} off />}
            {v === 2 && (
              <>
                <BatteryIcon cx={s.cx} cy={s.cy - 40} w={84} h={40} level={0.03} />
                <Label x={s.cx} y={s.cy + 6} text="1%" color={C.red} size={22} />
                <Clock cx={s.cx} cy={s.cy + 48} size={32} color={C.ink} />
              </>
            )}
          </>
        )}
      </Phone>
      <Cable x={v === 2 ? 215 : 190} y={v === 2 ? 268 : 275} color={C.ink} len={40} angle={v === 2 ? -4 : 6} />
    </>
  );
}

/* Não passa — bateria danificada */
export function BatteryDamaged({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.red} />
      {v === 0 && (
        <BatteryPack rot={-8}>
          <Blob cx={208} cy={178} rx={34} ry={22} color="#000" mid="#000" opacity={0.55} rot={-20} />
          <path d="M186 166 q20 -8 44 4" fill="none" stroke="#000" strokeWidth="3" opacity="0.5" />
          <g stroke={C.red} strokeWidth="4" strokeLinecap="round">
            <path d="M262 120 l18 -14 M268 142 l22 -2 M250 104 l6 -22" />
          </g>
        </BatteryPack>
      )}
      {v === 1 && (
        <BatteryPack rot={6}>
          <polygon points="150,120 176,112 168,134 196,128 186,152 214,146 206,170 170,166 178,146 150,150 160,132" fill={C.metal} />
          <polygon points="156,124 174,118 168,132 190,130 184,148 206,146 200,164 172,162 178,148 158,150 164,134" fill="#fff" opacity="0.5" />
          <path d="M150 120 l-10 -16 M206 170 l12 18" stroke={C.red} strokeWidth="3" strokeLinecap="round" />
        </BatteryPack>
      )}
      {v === 2 && (
        <>
          <g transform="rotate(-6 200 155)">
            <path d="M124 70 q-18 85 0 170 q76 26 152 0 q18 -85 0 -170 q-76 -22 -152 0 z" fill={C.cell} stroke={C.cellEdge} strokeWidth="2" />
            <path d="M138 90 q-10 65 0 130 q62 18 124 0 q10 -65 0 -130 q-62 -16 -124 0 z" fill="#fff" opacity="0.06" />
            <rect x="178" y="46" width="44" height="18" rx="4" fill={C.gold} />
          </g>
          <Warn cx={300} cy={70} size={48} />
        </>
      )}
      <Label x={200} y={292} text={v === 2 ? "ESTUFADA · NÃO USE O APARELHO" : v === 1 ? "RASGADA" : "MARCA DE IMPACTO"} color={C.red} size={11} />
    </>
  );
}

/* Não passa — bateria molhada */
export function BatteryWet({ v }) {
  const r = rng(300 + v);
  return (
    <>
      <Glow cx={200} cy={270} color={C.cyan} />
      <BatteryPack rot={v === 1 ? 6 : -8}>
        {v === 0 &&
          Array.from({ length: 9 }).map((_, i) => <Drop key={i} cx={135 + r() * 130} cy={70 + r() * 170} size={14 + r() * 16} />)}
        {v === 1 && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Blob key={i} cx={170 + r() * 60} cy={32 + r() * 30} rx={8 + r() * 10} color={C.rust} mid="#8a4a0e" opacity={0.95} />
            ))}
            <Blob cx={150} cy={120} rx={22} ry={14} color={C.rust} mid="#8a4a0e" opacity={0.7} />
          </>
        )}
        {v === 2 && (
          <>
            <path d="M120 170 q20 -10 40 0 t40 0 t40 0 t40 0 v90 h-160 z" fill={C.cyan} opacity="0.25" />
            <path d="M120 170 q20 -10 40 0 t40 0 t40 0 t40 0" fill="none" stroke={C.cyan} strokeWidth="3" opacity="0.8" />
            {[0, 1, 2, 3].map((i) => (
              <Blob key={i} cx={176 + r() * 48} cy={34 + r() * 24} rx={7 + r() * 8} color={C.corrosion} mid="#2a7a5a" opacity={0.95} />
            ))}
          </>
        )}
      </BatteryPack>
      {v !== 1 && <Drop cx={300} cy={60} size={34} />}
      {v === 1 && <Cross cx={300} cy={64} size={34} />}
      <Label x={200} y={292} text={v === 1 ? "FERRUGEM NOS TERMINAIS" : "CONTATO COM LÍQUIDO"} color={C.cyan} size={11} />
    </>
  );
}
