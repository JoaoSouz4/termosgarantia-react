import { BatteryDamaged, BatteryWet, DrainFast, NotCharging } from "./battery";
import { BoardDamaged, SameDefect } from "./board";
import { ConnectorBroken, NoAudio, NoSim, NoWifi, PortOxidized, PortStopped, SlowCharge } from "./connector";
import { CoverBattery, CoverBoard, CoverConnector, CoverScreen } from "./covers";
import { BlackScreen, Flicker, GhostTouch, GlassCracked, NoTouch, Spots, Stripes, TouchAfterUpdate } from "./screen";

/*
 * Ilustrações vetoriais dos casos de garantia.
 * Cada id tem 3 versões (variant 0, 1, 2) com composições diferentes.
 */
const registry = {
  "ghost-touch": GhostTouch,
  "no-touch": NoTouch,
  flicker: Flicker,
  "glass-cracked": GlassCracked,
  stripes: Stripes,
  spots: Spots,
  "black-screen": BlackScreen,
  "touch-after-update": TouchAfterUpdate,
  "drain-fast": DrainFast,
  "not-charging": NotCharging,
  "battery-damaged": BatteryDamaged,
  "battery-wet": BatteryWet,
  "port-stopped": PortStopped,
  "no-wifi": NoWifi,
  "no-sim": NoSim,
  "no-audio": NoAudio,
  "slow-charge": SlowCharge,
  "connector-broken": ConnectorBroken,
  "port-oxidized": PortOxidized,
  "same-defect": SameDefect,
  "board-damaged": BoardDamaged,
  "cover-screen": CoverScreen,
  "cover-battery": CoverBattery,
  "cover-connector": CoverConnector,
  "cover-board": CoverBoard,
};

export const VARIANTS = 3;

export function Illustration({ id, variant = 0, label = "", fit = "contain", className = "" }) {
  const Art = registry[id];
  if (!Art) return null;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      <Art v={variant % VARIANTS} />
    </svg>
  );
}
