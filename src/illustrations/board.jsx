import { C } from "./utils";
import {
  Blob,
  Check,
  Crack,
  Cross,
  Glow,
  Label,
  Mainboard,
  Refresh,
  Warn,
} from "./primitives";

/* Passa — o mesmo defeito voltou */
export function SameDefect({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.green} />
      <Mainboard rot={v === 1 ? 6 : -10} />
      <circle cx={300} cy={64} r="34" fill={C.body} stroke={C.edge} strokeWidth="2" />
      <Refresh cx={300} cy={64} size={40} />
      {v === 1 && (
        <g transform="translate(66 190) rotate(-30 20 20)">
          <rect x="0" y="14" width="56" height="12" rx="6" fill={C.metal} />
          <circle cx="56" cy="20" r="12" fill="none" stroke={C.metal} strokeWidth="8" strokeDasharray="40 20" />
        </g>
      )}
      {v === 2 && <Check cx={92} cy={236} size={36} />}
      <Label x={200} y={292} text={v === 2 ? "SEM SINAIS EXTERNOS" : v === 1 ? "REPARO REFEITO" : "MESMO DEFEITO"} color={C.green} size={11} />
    </>
  );
}

/* Não passa — placa danificada */
export function BoardDamaged({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.red} />
      {v === 0 && (
        <Mainboard>
          <Crack ox={176} oy={150} seed={21} len={110} rays={7} rings={0} color={C.bezel} width={3} />
          <path d="M120 130 L200 160 L290 120" fill="none" stroke={C.bezel} strokeWidth="4" strokeLinecap="round" />
        </Mainboard>
      )}
      {v === 1 && (
        <g transform="skewY(-8) translate(0 30)">
          <Mainboard rot={0}>
            <path d="M110 60 q90 60 180 0" fill="none" stroke="#000" strokeWidth="0" />
          </Mainboard>
          <g stroke={C.red} strokeWidth="4" strokeLinecap="round">
            <path d="M304 40 l16 -16 M312 56 l22 -2 M296 26 l4 -22" />
          </g>
        </g>
      )}
      {v === 2 && (
        <Mainboard rot={-6}>
          <Blob cx={236} cy={184} rx={34} ry={22} color="#000" mid="#000" opacity={0.6} rot={-15} />
          <path d="M214 172 q22 -10 46 2" fill="none" stroke="#000" strokeWidth="3" opacity="0.5" />
          <polygon points="110,250 110,226 140,250" fill={C.bezel} />
        </Mainboard>
      )}
      {v === 1 ? <Warn cx={300} cy={236} size={44} /> : <Cross cx={310} cy={60} size={34} />}
      <Label x={200} y={292} text={v === 0 ? "TRINCADA" : v === 1 ? "EMPENADA" : "AMASSADA"} color={C.red} size={11} />
    </>
  );
}
