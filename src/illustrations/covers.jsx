import { C, useSvgId } from "./utils";
import {
  BatteryIcon,
  BatteryPack,
  Bolt,
  Cable,
  ChargeBoard,
  Crack,
  HomeGrid,
  Mainboard,
  Phone,
} from "./primitives";

function Backdrop({ from, to, children }) {
  const id = useSvgId();
  return (
    <>
      <defs>
        <linearGradient id={`k${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`l${id}`} cx="0.75" cy="0.2" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#k${id})`} />
      <rect width="400" height="300" fill={`url(#l${id})`} />
      <g opacity="0.08" stroke="#fff">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1={i * 56} y1="0" x2={i * 56} y2="300" />
        ))}
      </g>
      {children}
    </>
  );
}

/* Troca de tela: aparelho trincado atrás, tela nova à frente */
export function CoverScreen({ v }) {
  return (
    <Backdrop from="#1d4ed8" to="#0b1f66">
      {v === 1 ? (
        <>
          <Phone x={92} y={30} w={118} h={250} tilt={-8} dark>
            {(s) => <HomeGrid s={s} seed={2} />}
          </Phone>
          <Phone x={212} y={30} w={118} h={250} tilt={6}>
            {(s) => <HomeGrid s={s} seed={2} dim={0.85} />}
          </Phone>
        </>
      ) : (
        <>
          <Phone x={82} y={40} w={124} h={255} tilt={-14}>
            {(s) => (
              <>
                <HomeGrid s={s} seed={4} dim={0.5} />
                <Crack ox={s.x + 30} oy={s.y + 50} seed={5} len={150} rays={11} />
              </>
            )}
          </Phone>
          <Phone x={196} y={20} w={136} h={275} tilt={6}>
            {(s) => <HomeGrid s={s} seed={1} />}
          </Phone>
        </>
      )}
    </Backdrop>
  );
}

/* Troca de bateria */
export function CoverBattery({ v }) {
  return (
    <Backdrop from="#f6b73c" to="#8a4a0e">
      <Phone x={196} y={20} w={136} h={275} tilt={6}>
        {(s) => <BatteryIcon cx={s.cx} cy={s.cy - 20} w={76} h={36} level={v === 1 ? 0.45 : 1} bolt />}
      </Phone>
      <BatteryPack x={62} y={70} w={130} h={190} rot={-12} />
    </Backdrop>
  );
}

/* Troca do conector */
export function CoverConnector({ v }) {
  return (
    <Backdrop from="#22c3d6" to="#0b3b66">
      <Phone x={70} y={20} w={136} h={275} tilt={-6}>
        {(s) => (
          <>
            <HomeGrid s={s} seed={7} dim={0.7} />
            <Bolt cx={s.cx} cy={s.cy} size={60} color={C.amber} />
          </>
        )}
      </Phone>
      <g transform={`translate(${v === 1 ? 150 : 140} 60) scale(0.8)`}>
        <ChargeBoard x={95} y={110} />
        <Cable x={200} y={198} len={50} />
      </g>
    </Backdrop>
  );
}

/* Reparos na placa */
export function CoverBoard({ v }) {
  return (
    <Backdrop from="#0f4a3a" to="#060a14">
      <Mainboard x={110} y={50} w={180} h={200} rot={v === 1 ? 8 : -12} />
    </Backdrop>
  );
}
