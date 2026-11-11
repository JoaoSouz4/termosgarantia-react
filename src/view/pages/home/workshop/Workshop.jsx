import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, Color, MathUtils, MeshStandardMaterial, Quaternion, Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { solveTwoBone } from "./ik";
import { createPatch, createScreen } from "./screenTexture";

/*
 * Cena leve: sem sombras em tempo real, sem mapa de ambiente, materiais
 * padrão e geometria com poucos segmentos. A iluminação é de três pontos
 * e a sombra de contato é uma textura.
 */

const CYCLE = 14;
const UPPER = 0.48;
const FORE = 0.45;
const TOOL_GRIP = 0.3;
const TOOL_DIR = new Vector3(0.42, 1, -0.3).normalize();
const UP = new Vector3(0, 1, 0);

const PHONE_POS = new Vector3(0.05, 0.035, 0.02);
const PHONE_ROT = 0.12;
const SCREWS_LOCAL = [
  [0.12, 0.03, 0.27],
  [-0.12, 0.03, 0.27],
  [0.12, 0.03, -0.24],
  [-0.12, 0.03, -0.24],
];
const CHAR_POS = new Vector3(0, 0, -0.7);
const REST = new Vector3(0.55, 0.28, 0.2);
const INSPECT = new Vector3(0.72, 0.62, 0.12);

const smooth = (x) => {
  const t = MathUtils.clamp(x, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};
const seg = (t, a, b) => smooth((t - a) / (b - a));

function phoneLocalToWorld([x, y, z], out = new Vector3()) {
  const c = Math.cos(PHONE_ROT);
  const s = Math.sin(PHONE_ROT);
  return out.set(PHONE_POS.x + x * c + z * s, PHONE_POS.y + y, PHONE_POS.z - x * s + z * c);
}
const SCREWS_WORLD = SCREWS_LOCAL.map((p) => phoneLocalToWorld(p));

/* ------------------------------------------------------------------ */
/* Materiais                                                           */
/* ------------------------------------------------------------------ */

function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, "rgba(0,0,0,0.5)");
  rg.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = rg;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

function useMaterials() {
  return useMemo(() => {
    const std = (color, extra = {}) => new MeshStandardMaterial({ color, roughness: 0.6, metalness: 0, ...extra });
    return {
      skin: std("#f3c9a6", { roughness: 0.75 }),
      hair: std("#3a2418", { roughness: 0.7 }),
      shirt: std("#2f63f2", { roughness: 0.65 }),
      apron: std("#141d38", { roughness: 0.8 }),
      collar: std("#f3f6fc"),
      eyeWhite: std("#ffffff", { roughness: 0.3 }),
      iris: std("#2d6bff", { roughness: 0.3 }),
      pupil: std("#0a0d16", { roughness: 0.2 }),
      highlight: new MeshStandardMaterial({ color: "#fff", emissive: new Color("#fff"), emissiveIntensity: 0.8 }),
      cheek: new MeshStandardMaterial({ color: "#ff8a8a", transparent: true, opacity: 0.3, roughness: 1 }),
      mouth: std("#6b2d2a"),
      patch: new MeshStandardMaterial({ map: createPatch(), roughness: 0.7 }),
      metal: std("#c9d1de", { metalness: 0.9, roughness: 0.3 }),
      darkMetal: std("#2a3142", { metalness: 0.7, roughness: 0.4 }),
      amber: std("#f6b73c", { roughness: 0.5 }),
      wood: std("#3b2a20", { roughness: 0.7 }),
      woodEdge: std("#2b1e17", { roughness: 0.8 }),
      mat: std("#16304f", { roughness: 0.95 }),
      matLine: std("#2a5b8f", { roughness: 0.9 }),
      phoneBody: std("#1a1f2b", { metalness: 0.5, roughness: 0.35 }),
      pcb: std("#0f3d2e", { roughness: 0.6 }),
      chip: std("#11151d", { roughness: 0.4 }),
      gold: std("#d8a43a", { metalness: 0.9, roughness: 0.35 }),
      battery: std("#252a36"),
      lens: new MeshStandardMaterial({ color: "#bfe3ff", roughness: 0.1, transparent: true, opacity: 0.3 }),
      bulb: new MeshStandardMaterial({ color: "#fff1cf", emissive: new Color("#ffcf7a"), emissiveIntensity: 2.5 }),
      led: new MeshStandardMaterial({ color: "#3ddc97", emissive: new Color("#3ddc97"), emissiveIntensity: 2 }),
      shadow: new MeshStandardMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false, roughness: 1 }),
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Bancada                                                             */
/* ------------------------------------------------------------------ */

function Rod({ from, to, r, m }) {
  const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5);
  const dir = new Vector3().subVectors(to, from);
  const q = new Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
  return (
    <mesh position={mid.toArray()} quaternion={q} material={m}>
      <cylinderGeometry args={[r, r, dir.length(), 8]} />
    </mesh>
  );
}

const LAMP_BASE = new Vector3(0, 0.05, 0);
const LAMP_ELBOW = new Vector3(0.18, 0.95, 0.02);
const LAMP_HEAD = new Vector3(0.78, 1.18, 0.3);
const LAMP_Q = new Quaternion().setFromUnitVectors(
  new Vector3(0, -1, 0),
  new Vector3(1.6 + PHONE_POS.x - 0.78, PHONE_POS.y - 1.18, 0.4 + PHONE_POS.z - 0.3).normalize(),
);

function Bench({ m, screwRefs, screenRef }) {
  const screen = useMemo(() => createScreen(), []);
  const phoneGeo = useMemo(() => new RoundedBoxGeometry(0.4, 0.05, 0.78, 2, 0.04), []);
  const displayGeo = useMemo(() => new RoundedBoxGeometry(0.38, 0.76, 0.03, 2, 0.03), []);
  useLayoutEffect(() => {
    screenRef.current = screen;
  }, [screen, screenRef]);

  return (
    <group>
      <mesh position={[0, -0.09, 0.32]} material={m.wood}>
        <boxGeometry args={[4.6, 0.18, 1.6]} />
      </mesh>
      <mesh position={[0, -0.36, 0.32]} material={m.woodEdge}>
        <boxGeometry args={[4.5, 0.4, 1.5]} />
      </mesh>
      <mesh position={[0, -0.05, 1.125]} material={m.amber}>
        <boxGeometry args={[4.56, 0.025, 0.012]} />
      </mesh>

      <mesh position={[0.15, 0.008, 0.28]} material={m.mat}>
        <boxGeometry args={[2.3, 0.016, 1.15]} />
      </mesh>
      {[-0.9, -0.45, 0, 0.45, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.017, 0.28]} material={m.matLine}>
          <boxGeometry args={[0.006, 0.002, 1.05]} />
        </mesh>
      ))}

      {/* sombra de contato das mãos e do celular */}
      <mesh position={[0.1, 0.02, 0.05]} rotation={[-Math.PI / 2, 0, 0]} material={m.shadow}>
        <planeGeometry args={[1.4, 1.0]} />
      </mesh>

      {/* celular aberto */}
      <group position={PHONE_POS.toArray()} rotation={[0, PHONE_ROT, 0]}>
        <mesh geometry={phoneGeo} material={m.phoneBody} />
        <mesh position={[0, 0.026, 0.02]} material={m.pcb}>
          <boxGeometry args={[0.33, 0.006, 0.66]} />
        </mesh>
        <mesh position={[0, 0.04, 0.1]} material={m.battery}>
          <boxGeometry args={[0.26, 0.022, 0.3]} />
        </mesh>
        <mesh position={[0.06, 0.034, -0.15]} material={m.chip}>
          <boxGeometry args={[0.1, 0.012, 0.1]} />
        </mesh>
        <mesh position={[-0.08, 0.032, -0.17]} material={m.gold}>
          <boxGeometry args={[0.07, 0.008, 0.05]} />
        </mesh>
        <mesh position={[0.12, 0.034, -0.3]} material={m.led}>
          <boxGeometry args={[0.012, 0.01, 0.012]} />
        </mesh>
        {SCREWS_LOCAL.map((p, i) => (
          <group key={i} position={p} ref={(el) => (screwRefs.current[i] = el)}>
            <mesh material={m.metal}>
              <cylinderGeometry args={[0.016, 0.016, 0.012, 8]} />
            </mesh>
            <mesh position={[0, 0.007, 0]} material={m.darkMetal}>
              <boxGeometry args={[0.022, 0.003, 0.004]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* display em suporte */}
      <group position={[1.0, 0, 0.18]} rotation={[0, -0.45, 0]}>
        <mesh position={[0, 0.03, 0.05]} material={m.darkMetal}>
          <boxGeometry args={[0.32, 0.06, 0.14]} />
        </mesh>
        <group position={[0, 0.36, 0]} rotation={[-0.2, 0, 0]}>
          <mesh geometry={displayGeo} material={m.phoneBody} />
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.34, 0.7]} />
            <meshBasicMaterial map={screen.texture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* luminária */}
      <group position={[-1.6, 0, -0.4]}>
        <mesh position={[0, 0.03, 0]} material={m.darkMetal}>
          <cylinderGeometry args={[0.2, 0.22, 0.06, 16]} />
        </mesh>
        <Rod from={LAMP_BASE} to={LAMP_ELBOW} r={0.024} m={m.darkMetal} />
        <mesh position={LAMP_ELBOW.toArray()} material={m.amber}>
          <sphereGeometry args={[0.045, 8, 8]} />
        </mesh>
        <Rod from={LAMP_ELBOW} to={LAMP_HEAD} r={0.02} m={m.darkMetal} />
        <group position={LAMP_HEAD.toArray()} quaternion={LAMP_Q}>
          <mesh position={[0, -0.1, 0]} material={m.amber}>
            <cylinderGeometry args={[0.07, 0.19, 0.24, 16, 1, true]} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={m.bulb}>
            <sphereGeometry args={[0.06, 10, 10]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Personagem (estilo cartoon: cabeça redonda, olhos grandes)          */
/* ------------------------------------------------------------------ */

function Arm({ side, m, refs }) {
  return (
    <group ref={refs.shoulder} position={[0.38 * side, 0.3, 0.02]}>
      <mesh position={[0, -UPPER / 2, 0]} material={m.shirt}>
        <capsuleGeometry args={[0.12, UPPER - 0.1, 3, 10]} />
      </mesh>
      <group ref={refs.elbow} position={[0, -UPPER, 0]}>
        <mesh position={[0, -FORE / 2, 0]} material={m.skin}>
          <capsuleGeometry args={[0.09, FORE - 0.12, 3, 10]} />
        </mesh>
        <mesh position={[0, -0.04, 0]} material={m.shirt}>
          <sphereGeometry args={[0.115, 10, 8]} />
        </mesh>
        <group ref={refs.hand} position={[0, -FORE, 0]}>
          <mesh material={m.skin} scale={[1, 1.1, 0.85]}>
            <sphereGeometry args={[0.115, 12, 10]} />
          </mesh>
          <mesh position={[0.07 * -side, 0.03, 0.06]} material={m.skin} scale={[0.7, 1, 0.7]}>
            <sphereGeometry args={[0.055, 8, 6]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Eye({ side, m }) {
  return (
    <group position={[0.22 * side, 0.5, 0.46]}>
      <mesh material={m.eyeWhite} scale={[1, 1.25, 0.7]}>
        <sphereGeometry args={[0.13, 16, 12]} />
      </mesh>
      <mesh position={[0, 0, 0.075]} material={m.iris} scale={[1, 1.1, 0.5]}>
        <sphereGeometry args={[0.085, 14, 10]} />
      </mesh>
      <mesh position={[0, 0, 0.11]} material={m.pupil} scale={[1, 1.1, 0.5]}>
        <sphereGeometry args={[0.05, 12, 8]} />
      </mesh>
      <mesh position={[0.03, 0.035, 0.13]} material={m.highlight}>
        <sphereGeometry args={[0.024, 8, 6]} />
      </mesh>
      <mesh position={[-0.025, -0.03, 0.125]} material={m.highlight}>
        <sphereGeometry args={[0.011, 6, 4]} />
      </mesh>
    </group>
  );
}

function Character({ m, rig }) {
  const apronGeo = useMemo(() => new RoundedBoxGeometry(0.6, 0.62, 0.06, 2, 0.03), []);

  return (
    <group position={CHAR_POS.toArray()}>
      <group ref={rig.torso} position={[0, 0.3, 0]}>
        <group ref={rig.chest}>
          <mesh material={m.shirt} scale={[1, 1, 0.8]}>
            <capsuleGeometry args={[0.37, 0.28, 4, 14]} />
          </mesh>
          <mesh geometry={apronGeo} position={[0, -0.05, 0.3]} rotation={[-0.08, 0, 0]} material={m.apron} />
          <mesh position={[0.14, 0.08, 0.335]} rotation={[-0.08, 0, 0]} material={m.patch}>
            <circleGeometry args={[0.065, 16]} />
          </mesh>
          <mesh position={[0, 0.48, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={m.collar}>
            <torusGeometry args={[0.16, 0.045, 6, 16]} />
          </mesh>
        </group>
        <mesh position={[0, 0.54, 0]} material={m.skin}>
          <cylinderGeometry args={[0.12, 0.14, 0.16, 10]} />
        </mesh>

        <group ref={rig.head} position={[0, 0.58, 0.02]}>
          {/* cabeça redonda */}
          <mesh position={[0, 0.5, 0]} material={m.skin} scale={[1, 1.06, 0.96]}>
            <sphereGeometry args={[0.6, 24, 18]} />
          </mesh>
          {/* cabelo: calota + topete */}
          <mesh position={[0, 0.58, -0.05]} rotation={[-0.3, 0, 0]} material={m.hair} scale={[1.02, 1.04, 1]}>
            <sphereGeometry args={[0.62, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
          <mesh position={[-0.2, 0.98, 0.38]} rotation={[0.3, 0, 0.5]} material={m.hair} scale={[1, 0.45, 0.6]}>
            <sphereGeometry args={[0.26, 12, 8]} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[0.57 * s, 0.46, 0]} scale={[0.5, 1, 0.8]} material={m.skin}>
              <sphereGeometry args={[0.11, 10, 8]} />
            </mesh>
          ))}

          <group ref={rig.eyes}>
            <Eye side={-1} m={m} />
            <Eye side={1} m={m} />
          </group>
          <group ref={rig.brows}>
            {[-1, 1].map((s) => (
              <mesh key={s} position={[0.22 * s, 0.7, 0.49]} rotation={[0, 0, -0.15 * s]} material={m.hair}>
                <boxGeometry args={[0.17, 0.035, 0.03]} />
              </mesh>
            ))}
          </group>
          <mesh position={[0, 0.4, 0.57]} material={m.skin}>
            <sphereGeometry args={[0.05, 10, 8]} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[0.36 * s, 0.36, 0.44]} scale={[1, 0.7, 0.3]} material={m.cheek}>
              <sphereGeometry args={[0.075, 10, 8]} />
            </mesh>
          ))}
          <mesh ref={rig.mouth} position={[0, 0.31, 0.5]} rotation={[0, 0, Math.PI]} material={m.mouth}>
            <torusGeometry args={[0.1, 0.018, 6, 16, Math.PI]} />
          </mesh>

          {/* tiara com lupa */}
          <mesh position={[0, 0.5, 0.02]} material={m.darkMetal}>
            <torusGeometry args={[0.63, 0.03, 6, 28, Math.PI]} />
          </mesh>
          <group ref={rig.loupe} position={[0.24, 0.84, 0.5]}>
            <mesh position={[0, -0.08, 0.02]} material={m.darkMetal}>
              <boxGeometry args={[0.04, 0.18, 0.03]} />
            </mesh>
            <group position={[0, -0.32, 0.08]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} material={m.lens}>
                <cylinderGeometry args={[0.13, 0.13, 0.03, 20]} />
              </mesh>
              <mesh material={m.amber}>
                <torusGeometry args={[0.135, 0.022, 6, 24]} />
              </mesh>
            </group>
          </group>
        </group>

        <Arm side={1} m={m} refs={rig.right} />
        <Arm side={-1} m={m} refs={rig.left} />
      </group>
    </group>
  );
}

function Screwdriver({ m, toolRef, spinRef }) {
  return (
    <group ref={toolRef}>
      <group ref={spinRef}>
        <mesh position={[0, 0.09, 0]} material={m.metal}>
          <cylinderGeometry args={[0.009, 0.006, 0.18, 6]} />
        </mesh>
        <mesh position={[0, 0.29, 0]} material={m.amber}>
          <cylinderGeometry args={[0.034, 0.03, 0.22, 12]} />
        </mesh>
        {[0.22, 0.36].map((y) => (
          <mesh key={y} position={[0, y, 0]} material={m.darkMetal}>
            <cylinderGeometry args={[0.036, 0.036, 0.018, 12]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Animação                                                            */
/* ------------------------------------------------------------------ */

function useRig() {
  const r = () => ({ current: null });
  return useRef({
    torso: r(),
    chest: r(),
    head: r(),
    eyes: r(),
    brows: r(),
    mouth: r(),
    loupe: r(),
    right: { shoulder: r(), elbow: r(), hand: r() },
    left: { shoulder: r(), elbow: r(), hand: r() },
  }).current;
}

const _tmp = new Vector3();
const _tip = new Vector3();
const _rT = new Vector3();
const _lT = new Vector3();
const _S = new Vector3();
const _q = new Quaternion();
const _qs = new Quaternion();
const _pole = new Vector3();

function Scene({ progress, pointer, staticPose }) {
  const m = useMaterials();
  const rig = useRig();
  const tool = useRef(null);
  const spin = useRef(null);
  const screwRefs = useRef([]);
  const screen = useRef(null);
  const root = useRef(null);
  const { camera, size } = useThree();
  const state = useRef({ twist: 0, lastCycle: -1 });

  useFrame((three, delta) => {
    const t = staticPose ? 9.4 : three.clock.elapsedTime + 0.6;
    const dt = staticPose ? 10 : Math.min(delta, 0.05);
    const cycleIdx = Math.floor(t / CYCLE);
    const c = t % CYCLE;
    const st = state.current;

    const pair = cycleIdx % 2 === 0 ? [0, 1] : [2, 3];
    if (cycleIdx !== st.lastCycle) {
      st.lastCycle = cycleIdx;
      screwRefs.current.forEach((s) => s && (s.position.y = 0.045));
    }

    const toA = seg(c, 0, 1.0);
    const screwA = c >= 1.0 && c < 4.0;
    const toB = seg(c, 4.0, 5.0);
    const screwB = c >= 5.0 && c < 8.0;
    const lift = seg(c, 8.0, 9.2) * (1 - seg(c, 11.4, 12.6));
    const working = screwA || screwB;

    const pA = MathUtils.clamp((c - 1.2) / 2.6, 0, 1);
    const pB = MathUtils.clamp((c - 5.2) / 2.6, 0, 1);
    const sA = screwRefs.current[pair[0]];
    const sB = screwRefs.current[pair[1]];
    if (sA) {
      sA.position.y = 0.045 - pA * 0.014;
      sA.rotation.y = pA * 14;
    }
    if (sB) {
      sB.position.y = 0.045 - pB * 0.014;
      sB.rotation.y = pB * 14;
    }
    if (screen.current) screen.current.draw(c > 12.8 ? 0 : (pA + pB) / 2, c >= 8.4 && c < 12.8);

    /* mão direita + ferramenta */
    const screwPA = SCREWS_WORLD[pair[0]];
    const screwPB = SCREWS_WORLD[pair[1]];
    const tip = _tip;
    if (c < 4.0) {
      tip.copy(REST).lerp(screwPA, toA);
      tip.y += Math.sin(toA * Math.PI) * 0.1;
    } else if (c < 8.0) {
      tip.copy(screwPA).lerp(screwPB, toB);
      tip.y += Math.sin(toB * Math.PI) * 0.12;
    } else if (c < 11.4) {
      tip.copy(screwPB).lerp(INSPECT, seg(c, 8.0, 9.2));
    } else {
      tip.copy(INSPECT).lerp(REST, seg(c, 11.4, 12.8));
    }
    if (working) {
      st.twist += dt * 9;
      tip.y += 0.006 + Math.sin(t * 18) * 0.004;
    }
    _rT.copy(TOOL_DIR).multiplyScalar(TOOL_GRIP).add(tip);
    if (tool.current) {
      tool.current.position.copy(tip);
      _q.setFromUnitVectors(UP, TOOL_DIR);
      _qs.setFromAxisAngle(_pole.set(1, 0, 0), -0.5 * lift);
      tool.current.quaternion.copy(_qs).multiply(_q);
    }
    if (spin.current) spin.current.rotation.y = st.twist;

    /* mão esquerda segura o aparelho */
    phoneLocalToWorld([-0.21, 0.06, -0.05], _lT);
    _lT.y += Math.sin(t * 1.3) * 0.01 + lift * 0.05;
    _lT.x += Math.sin(t * 0.7) * 0.015;

    /* tronco */
    const torso = rig.torso.current;
    if (torso) {
      const breath = Math.sin(t * 1.7);
      rig.chest.current.scale.set(1 + breath * 0.012, 1 + breath * 0.02, 1 + breath * 0.012);
      torso.position.y = 0.3 + breath * 0.008;
      const lean = (working ? 0.16 : 0.08) * (1 - lift) + 0.02;
      torso.rotation.x = MathUtils.damp(torso.rotation.x, lean, 3, dt);
      torso.rotation.z = MathUtils.damp(torso.rotation.z, Math.sin(t * 0.35) * 0.03, 3, dt);
      torso.rotation.y = MathUtils.damp(torso.rotation.y, lift * 0.05, 3, dt);
      torso.updateMatrixWorld(true);

      const R = rig.right;
      const L = rig.left;
      if (R.shoulder.current && L.shoulder.current) {
        const rLocal = torso.worldToLocal(_tmp.copy(_rT));
        _S.copy(R.shoulder.current.position);
        solveTwoBone(R.shoulder.current, R.elbow.current, _S, rLocal, _pole.set(1, -0.6, -0.8).normalize(), UPPER, FORE);
        const lLocal = torso.worldToLocal(_tmp.copy(_lT));
        _S.copy(L.shoulder.current.position);
        solveTwoBone(L.shoulder.current, L.elbow.current, _S, lLocal, _pole.set(-1, -0.6, -0.8).normalize(), UPPER, FORE);
      }
    }

    /* cabeça e expressão */
    const head = rig.head.current;
    if (head) {
      const lookCam = lift;
      const targetYaw = MathUtils.lerp((tip.x - CHAR_POS.x) * 0.35, pointer.current.x * 0.25, lookCam);
      const nod = c > 9.6 && c < 10.6 ? Math.sin((c - 9.6) * Math.PI * 2) * 0.12 : 0;
      const targetPitch = MathUtils.lerp(0.42, -0.04 + pointer.current.y * -0.12, lookCam) + nod;
      head.rotation.y = MathUtils.damp(head.rotation.y, targetYaw, 4, dt);
      head.rotation.x = MathUtils.damp(head.rotation.x, targetPitch, 4, dt);
      head.rotation.z = MathUtils.damp(head.rotation.z, Math.sin(t * 0.5) * 0.04 - lookCam * 0.06, 2, dt);

      const loupeDown = 1 - smooth(lift * 1.4);
      rig.loupe.current.rotation.x = MathUtils.lerp(-0.8, 0, loupeDown);

      const blinkPhase = (t % 4.2) / 4.2;
      const blink = blinkPhase > 0.96 ? 0.1 : 1;
      rig.eyes.current.scale.y = MathUtils.damp(rig.eyes.current.scale.y, blink, 30, dt);

      rig.brows.current.position.y = lookCam * 0.035;
      const smile = 1 + lookCam * 0.5;
      rig.mouth.current.scale.set(smile, smile, 1);
    }

    /* câmera: ponteiro + parallax de rolagem */
    const p = progress.current;
    const portrait = size.width / size.height < 1.15;
    const baseZ = portrait ? 5.0 : 7.0;
    const baseY = portrait ? 1.9 : 2.55;
    const lookY = portrait ? 0.95 : 0.78;
    camera.position.x = MathUtils.damp(camera.position.x, pointer.current.x * 0.35 + (portrait ? 0.15 : 0), 2.5, dt);
    camera.position.y = MathUtils.damp(camera.position.y, baseY - pointer.current.y * 0.15 + p * 1.1, 4, dt);
    camera.position.z = MathUtils.damp(camera.position.z, baseZ - p * 2.0, 4, dt);
    camera.lookAt(0, lookY - p * 0.2, 0);
    if (root.current) {
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, -0.32 + p * 0.55, 4, dt);
    }
  });

  return (
    <>
      <hemisphereLight args={["#c4d4ff", "#2a1e10", 0.9]} />
      <directionalLight position={[2.5, 5, 3.5]} intensity={1.7} color="#fff3e0" />
      <directionalLight position={[-3, 3, -4]} intensity={1.8} color="#4a7dff" />
      <pointLight position={[-0.8, 1.0, 0.0]} intensity={1.6} distance={4} decay={2} color="#ffc56b" />

      <group ref={root} rotation={[0, -0.32, 0]} position={[0.1, -0.15, 0]}>
        <Bench m={m} screwRefs={screwRefs} screenRef={screen} />
        <Character m={m} rig={rig} />
        <Screwdriver m={m} toolRef={tool} spinRef={spin} />
      </group>
    </>
  );
}

/** Limita a taxa de quadros em aparelhos modestos. */
function FrameLimiter({ fps }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = setInterval(invalidate, 1000 / fps);
    return () => clearInterval(id);
  }, [fps, invalidate]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function Workshop({ progress, active = true, reducedMotion = false, tier = "high" }) {
  const pointer = useRef({ x: 0, y: 0 });
  const low = tier === "low";

  useEffect(() => {
    if (reducedMotion || low) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion, low]);

  const frameloop = reducedMotion || !active ? "demand" : low ? "demand" : "always";

  return (
    <Canvas
      dpr={low ? 1 : [1, 1.5]}
      frameloop={frameloop}
      camera={{ fov: 30, position: [0, 2.55, 7.0], near: 0.1, far: 30 }}
      gl={{ antialias: !low, alpha: true, powerPreference: low ? "low-power" : "high-performance", stencil: false }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      aria-hidden
    >
      {low && active && !reducedMotion && <FrameLimiter fps={30} />}
      <Scene progress={progress} pointer={pointer} staticPose={reducedMotion} />
    </Canvas>
  );
}
