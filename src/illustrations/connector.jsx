import { C, rng } from "./utils";
import {
  BatteryIcon,
  Blob,
  Bolt,
  Cable,
  ChargeBoard,
  Clock,
  Cross,
  Drop,
  Glow,
  Hourglass,
  Label,
  Mic,
  Phone,
  Pin,
  Signal,
  Sim,
  Speaker,
  Wifi,
} from "./primitives";

/* Passa — parou de carregar, sem avarias */
export function PortStopped({ v }) {
  return (
    <>
      <Glow cx={200} cy={240} color={C.cyan} />
      {v === 2 ? (
        <>
          <Phone tilt={0} x={135} y={-60} h={300}>
            {(s) => <BatteryIcon cx={s.cx} cy={s.y + s.h - 70} w={70} h={32} level={0.3} off />}
          </Phone>
          <Cable x={200} y={246} len={30} color={C.ink} />
          <Bolt cx={296} cy={200} size={44} color={C.amber} off />
        </>
      ) : (
        <>
          <g transform="translate(200 150) scale(1.3) translate(-200 -150)">
            <ChargeBoard y={90} />
            <Cable x={v === 0 ? 200 : 250} y={v === 0 ? 178 : 196} len={60} angle={v === 0 ? 0 : -30} />
          </g>
          <Bolt cx={330} cy={60} size={44} color={C.amber} off />
          <Label x={200} y={292} text="SEM OXIDAÇÃO · SEM IMPACTO" color={C.green} size={11} />
        </>
      )}
    </>
  );
}

/* Passa — Wi-Fi / sinal / GPS */
export function NoWifi({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.cyan} />
      <Phone tilt={v === 1 ? 5 : -6}>
        {(s) => (
          <>
            {v === 0 && <Wifi cx={s.cx} cy={s.cy - 30} size={76} off />}
            {v === 1 && <Signal cx={s.cx} cy={s.cy - 24} size={70} off />}
            {v === 2 && <Pin cx={s.cx} cy={s.cy - 24} size={76} off />}
            <Label x={s.cx} y={s.cy + 60} text={v === 0 ? "SEM WI-FI" : v === 1 ? "SEM REDE" : "SEM GPS"} color={C.red} size={10} />
          </>
        )}
      </Phone>
      <g transform="translate(60 -20) scale(0.5)">
        <ChargeBoard x={420} y={400} w={190} h={80} />
      </g>
    </>
  );
}

/* Passa — chip não reconhecido */
export function NoSim({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone tilt={v === 2 ? 4 : -6}>
        {(s) => (
          <>
            {v === 0 && <Sim cx={s.cx - 8} cy={s.cy - 20} size={80} question />}
            {v === 1 && (
              <>
                <Sim cx={s.cx} cy={s.cy - 30} size={70} off />
                <Label x={s.cx} y={s.cy + 36} text="SEM CHIP" color={C.red} size={10} />
              </>
            )}
            {v === 2 && (
              <>
                <rect x={s.x + 14} y={s.y + 12} width="40" height="10" rx="3" fill="#fff" opacity="0.2" />
                <Signal cx={s.x + 30} cy={s.y + 17} size={16} off />
                <Sim cx={s.cx} cy={s.cy - 10} size={64} color={C.mute} />
              </>
            )}
          </>
        )}
      </Phone>
      {v === 2 && (
        <g>
          <rect x="268" y="110" width="60" height="18" rx="4" fill={C.metal} stroke={C.metalDark} strokeWidth="2" />
          <Sim cx={298} cy={100} size={30} />
        </g>
      )}
    </>
  );
}

/* Passa — áudio */
export function NoAudio({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.violet} />
      <Phone tilt={v === 1 ? 5 : -6}>
        {(s) => (
          <>
            {v === 0 && <Speaker cx={s.cx} cy={s.cy - 24} size={76} off />}
            {v === 1 && <Mic cx={s.cx} cy={s.cy - 24} size={76} off />}
            {v === 2 && (
              <>
                <Speaker cx={s.cx - 22} cy={s.cy - 24} size={48} off />
                <Mic cx={s.cx + 30} cy={s.cy - 24} size={48} off />
              </>
            )}
            <Label x={s.cx} y={s.cy + 60} text={v === 0 ? "SEM SOM" : v === 1 ? "SEM MICROFONE" : "ÁUDIO GERAL"} color={C.red} size={10} />
          </>
        )}
      </Phone>
    </>
  );
}

/* Passa — carregamento lento */
export function SlowCharge({ v }) {
  return (
    <>
      <Glow cx={200} cy={270} color={C.amber} />
      <Phone tilt={v === 2 ? 4 : -6}>
        {(s) => (
          <>
            {v === 0 && (
              <>
                <BatteryIcon cx={s.cx} cy={s.cy - 40} w={84} h={40} level={0.22} bolt />
                <Clock cx={s.cx} cy={s.cy + 34} size={40} color={C.amber} />
              </>
            )}
            {v === 1 && (
              <>
                <BatteryIcon cx={s.cx} cy={s.cy - 50} w={84} h={40} level={0.12} bolt />
                <Label x={s.cx} y={s.cy} text="12%" color={C.amber} size={22} />
                <Label x={s.cx} y={s.cy + 26} text="6 H RESTANTES" color={C.mute} size={9} />
              </>
            )}
            {v === 2 && (
              <>
                <Hourglass cx={s.cx} cy={s.cy - 40} size={64} />
                <BatteryIcon cx={s.cx} cy={s.cy + 40} w={70} h={32} level={0.18} bolt />
              </>
            )}
          </>
        )}
      </Phone>
      <Cable x={v === 2 ? 215 : 190} y={v === 2 ? 268 : 275} color={C.ink} len={40} angle={v === 2 ? -4 : 6} />
    </>
  );
}

/* Não passa — conector quebrado */
export function ConnectorBroken({ v }) {
  return (
    <>
      <Glow cx={200} cy={240} color={C.red} />
      <g transform="translate(200 150) scale(1.3) translate(-200 -150)">
      <ChargeBoard y={90} pins={v === 1 ? 5 : 8}>
        {v === 0 && (
          <g stroke={C.gold} strokeWidth="2" strokeLinecap="round">
            <path d="M190 162 l-6 10 M198 162 l5 9 M206 162 l-7 8 M214 162 l6 9" />
          </g>
        )}
        {v === 1 && <path d="M172 160 l8 -12 l6 10 l6 -14 l5 12" fill="none" stroke={C.red} strokeWidth="2" />}
        {v === 2 && (
          <>
            <rect x="166" y="150" width="68" height="30" rx="10" fill={C.pcb} />
            <g transform="rotate(14 200 176)">
              <rect x="166" y="152" width="68" height="30" rx="10" fill={C.metal} stroke={C.metalDark} strokeWidth="2" />
              <rect x="174" y="160" width="52" height="14" rx="7" fill="#0b0f1a" />
            </g>
            <path d="M160 150 l-8 -10 M238 182 l10 10" stroke={C.red} strokeWidth="3" strokeLinecap="round" />
          </>
        )}
      </ChargeBoard>
      </g>
      <Cross cx={330} cy={60} size={34} />
      <Label x={200} y={292} text={v === 0 ? "PINOS TORTOS" : v === 1 ? "PINOS FALTANDO" : "CONECTOR SOLTO"} color={C.red} size={11} />
    </>
  );
}

/* Não passa — placa de carga oxidada */
export function PortOxidized({ v }) {
  const r = rng(500 + v);
  const color = v === 1 ? C.rust : C.corrosion;
  const mid = v === 1 ? "#8a4a0e" : "#2a7a5a";
  return (
    <>
      <Glow cx={200} cy={240} color={C.cyan} />
      <g transform="translate(200 150) scale(1.3) translate(-200 -150)">
      <ChargeBoard y={90} pinColor={v === 1 ? C.rust : C.gold}>
        {Array.from({ length: v === 2 ? 10 : 7 }).map((_, i) => (
          <Blob key={i} cx={150 + r() * 100} cy={120 + r() * 60} rx={6 + r() * 12} color={i % 3 === 0 && v === 2 ? C.rust : color} mid={i % 3 === 0 && v === 2 ? "#8a4a0e" : mid} opacity={0.95} />
        ))}
        <Blob cx={200} cy={168} rx={30} ry={10} color={color} mid={mid} opacity={0.8} />
        {v === 2 && [0, 1, 2].map((i) => <Drop key={i} cx={120 + i * 70 + r() * 20} cy={98 + r() * 10} size={14} />)}
      </ChargeBoard>
      </g>
      <Drop cx={330} cy={56} size={34} />
      <Label x={200} y={292} text={v === 1 ? "FERRUGEM" : "OXIDAÇÃO"} color={C.cyan} size={11} />
    </>
  );
}
