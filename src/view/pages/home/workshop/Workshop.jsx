import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Color,
  DoubleSide,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  Quaternion,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { solveTwoBone } from "./ik";
import { createPatch, createScreen } from "./screenTexture";

/* ------------------------------------------------------------------ */
/* Constantes da cena                                                  */
/* ------------------------------------------------------------------ */

const CYCLE = 14; // segundos por ciclo de trabalho
const UPPER = 0.5; // comprimento do braço
const FORE = 0.47; // comprimento do antebraço
const TOOL_GRIP = 0.3; // distância da ponta da chave até a mão
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
const TRAY_POS = new Vector3(-0.92, 0.02, 0.18);
const REST = new Vector3(0.55, 0.28, 0.2);
const INSPECT = new Vector3(0.72, 0.62, 0.12);
const CHAR_POS = new Vector3(0, 0, -0.7);

// Luminária: base → cotovelo → cabeça apontando para o celular
const LAMP_BASE = new Vector3(0, 0.05, 0);
const LAMP_ELBOW = new Vector3(0.18, 0.95, 0.02);
const LAMP_HEAD = new Vector3(0.78, 1.18, 0.3);
const LAMP_Q = new Quaternion().setFromUnitVectors(
  new Vector3(0, -1, 0),
  new Vector3(1.6 + PHONE_POS.x - 0.78, PHONE_POS.y - 1.18, 0.4 + PHONE_POS.z - 0.3).normalize(),
);

/** Haste cilíndrica entre dois pontos. */
function Rod({ from, to, r, m }) {
  const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5);
  const dir = new Vector3().subVectors(to, from);
  const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.clone().normalize());
  return (
    <mesh position={mid.toArray()} quaternion={q} material={m} castShadow>
      <cylinderGeometry args={[r, r, dir.length(), 10]} />
    </mesh>
  );
}

const smooth = (x) => {
  const t = MathUtils.clamp(x, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};
const seg = (t, a, b) => smooth((t - a) / (b - a));

function phoneLocalToWorld([x, y, z], out = new Vector3()) {
  const c = Math.cos(PHONE_ROT);
  const s = Math.sin(PHONE_ROT);
  return out.set(
    PHONE_POS.x + x * c + z * s,
    PHONE_POS.y + y,
    PHONE_POS.z - x * s + z * c,
  );
}
const SCREWS_WORLD = SCREWS_LOCAL.map((p) => phoneLocalToWorld(p));

/* ------------------------------------------------------------------ */
/* Materiais (vinil de colecionável + metais + madeira)               */
/* ------------------------------------------------------------------ */

function useMaterials() {
  return useMemo(() => {
    const vinyl = (color, extra = {}) =>
      new MeshPhysicalMaterial({
        color,
        roughness: 0.42,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
        ...extra,
      });
    const patchTex = createPatch();
    return {
      skin: vinyl("#f1c3a0", { roughness: 0.5, clearcoat: 0.35 }),
      hair: vinyl("#2a1c15", { roughness: 0.55 }),
      shirt: vinyl("#2f63f2"),
      apron: vinyl("#121c36", { roughness: 0.7, clearcoat: 0.15 }),
      collar: vinyl("#eef2fb"),
      eye: new MeshPhysicalMaterial({
        color: "#07090f",
        roughness: 0.1,
        clearcoat: 1,
      }),
      white: new MeshStandardMaterial({ color: "#ffffff", roughness: 0.2 }),
      cheek: new MeshStandardMaterial({
        color: "#ff8a8a",
        transparent: true,
        opacity: 0.35,
        roughness: 0.8,
      }),
      mouth: vinyl("#5b2a22"),
      patch: new MeshStandardMaterial({ map: patchTex, roughness: 0.6 }),
      metal: new MeshStandardMaterial({
        color: "#c9d1de",
        metalness: 1,
        roughness: 0.25,
      }),
      darkMetal: new MeshStandardMaterial({
        color: "#2a3142",
        metalness: 0.8,
        roughness: 0.35,
      }),
      amber: vinyl("#f6b73c"),
      shade: vinyl("#f6b73c", { side: DoubleSide }),
      wood: new MeshStandardMaterial({ color: "#3b2a20", roughness: 0.62 }),
      woodEdge: new MeshStandardMaterial({ color: "#2b1e17", roughness: 0.7 }),
      mat: new MeshStandardMaterial({ color: "#16304f", roughness: 0.95 }),
      matLine: new MeshStandardMaterial({ color: "#2a5b8f", roughness: 0.9 }),
      phoneBody: new MeshPhysicalMaterial({
        color: "#1a1f2b",
        metalness: 0.6,
        roughness: 0.3,
        clearcoat: 1,
      }),
      pcb: new MeshStandardMaterial({ color: "#0f3d2e", roughness: 0.55 }),
      chip: new MeshStandardMaterial({ color: "#11151d", roughness: 0.4 }),
      gold: new MeshStandardMaterial({
        color: "#d8a43a",
        metalness: 1,
        roughness: 0.3,
      }),
      battery: new MeshStandardMaterial({ color: "#252a36", roughness: 0.5 }),
      mug: vinyl("#2f63f2"),
      tray: vinyl("#e7ebf3", { roughness: 0.5 }),
      lens: new MeshPhysicalMaterial({
        color: "#bfe3ff",
        roughness: 0.05,
        metalness: 0,
        transparent: true,
        opacity: 0.32,
        clearcoat: 1,
      }),
      bulb: new MeshStandardMaterial({
        color: "#fff1cf",
        emissive: new Color("#ffcf7a"),
        emissiveIntensity: 3,
      }),
      led: new MeshStandardMaterial({
        color: "#3ddc97",
        emissive: new Color("#3ddc97"),
        emissiveIntensity: 2.5,
      }),
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Ambiente                                                            */
/* ------------------------------------------------------------------ */

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Bancada                                                             */
/* ------------------------------------------------------------------ */

function Bench({ m, screwRefs, screenMatRef }) {
  const screen = useMemo(() => createScreen(), []);
  useLayoutEffect(() => {
    screenMatRef.current = screen;
  }, [screen, screenMatRef]);

  return (
    <group>
      {/* tampo */}
      <mesh position={[0, -0.09, 0.32]} receiveShadow material={m.wood}>
        <primitive object={new RoundedBoxGeometry(4.6, 0.18, 1.6, 3, 0.05)} attach="geometry" />
      </mesh>
      <mesh position={[0, -0.36, 0.32]} material={m.woodEdge}>
        <boxGeometry args={[4.5, 0.4, 1.5]} />
      </mesh>
      {/* friso âmbar na borda frontal */}
      <mesh position={[0, -0.05, 1.125]} material={m.amber}>
        <boxGeometry args={[4.56, 0.025, 0.012]} />
      </mesh>

      {/* manta antiestática */}
      <mesh position={[0.15, 0.008, 0.28]} receiveShadow material={m.mat}>
        <primitive object={new RoundedBoxGeometry(2.3, 0.016, 1.15, 2, 0.008)} attach="geometry" />
      </mesh>
      {[-0.9, -0.45, 0, 0.45, 0.9, 1.35].map((x) => (
        <mesh key={x} position={[x, 0.017, 0.28]} material={m.matLine}>
          <boxGeometry args={[0.006, 0.002, 1.05]} />
        </mesh>
      ))}

      {/* celular aberto */}
      <group position={PHONE_POS.toArray()} rotation={[0, PHONE_ROT, 0]}>
        <mesh castShadow receiveShadow material={m.phoneBody}>
          <primitive object={new RoundedBoxGeometry(0.4, 0.05, 0.78, 3, 0.04)} attach="geometry" />
        </mesh>
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
        <mesh position={[-0.1, 0.034, -0.08]} material={m.metal}>
          <boxGeometry args={[0.08, 0.012, 0.06]} />
        </mesh>
        <mesh position={[0.12, 0.034, -0.3]} material={m.led}>
          <boxGeometry args={[0.012, 0.01, 0.012]} />
        </mesh>
        {SCREWS_LOCAL.map((p, i) => (
          <group key={i} position={p} ref={(el) => (screwRefs.current[i] = el)}>
            <mesh material={m.metal} castShadow>
              <cylinderGeometry args={[0.016, 0.016, 0.012, 12]} />
            </mesh>
            <mesh position={[0, 0.007, 0]} material={m.darkMetal}>
              <boxGeometry args={[0.022, 0.003, 0.004]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* display apoiado em um suporte, virado para o observador */}
      <group position={[1.0, 0, 0.18]} rotation={[0, -0.45, 0]}>
        <mesh position={[0, 0.03, 0.05]} material={m.darkMetal} castShadow>
          <boxGeometry args={[0.32, 0.06, 0.14]} />
        </mesh>
        <group position={[0, 0.36, 0]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow material={m.phoneBody}>
            <primitive object={new RoundedBoxGeometry(0.38, 0.76, 0.03, 3, 0.03)} attach="geometry" />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.34, 0.7]} />
            <meshBasicMaterial map={screen.texture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* bandeja de peças */}
      <group position={TRAY_POS.toArray()}>
        <mesh castShadow receiveShadow material={m.tray}>
          <primitive object={new RoundedBoxGeometry(0.5, 0.06, 0.34, 2, 0.02)} attach="geometry" />
        </mesh>
        {[
          [-0.14, "#c9d1de"],
          [0, "#f6b73c"],
          [0.14, "#4a7dff"],
        ].map(([x, c]) => (
          <group key={x} position={[x, 0.035, 0]}>
            {[...Array(5)].map((_, i) => (
              <mesh
                key={i}
                position={[((i * 37) % 7) / 100 - 0.03, 0, ((i * 53) % 11) / 100 - 0.05]}
              >
                <sphereGeometry args={[0.014, 8, 8]} />
                <meshStandardMaterial color={c} metalness={0.8} roughness={0.3} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* pinça */}
      <group position={[0.62, 0.02, 0.62]} rotation={[0, 0.6, 0]}>
        <mesh position={[0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.metal} castShadow>
          <cylinderGeometry args={[0.008, 0.005, 0.42, 6]} />
        </mesh>
        <mesh position={[-0.012, 0, 0.01]} rotation={[0, 0.05, Math.PI / 2]} material={m.metal} castShadow>
          <cylinderGeometry args={[0.008, 0.005, 0.42, 6]} />
        </mesh>
      </group>

      {/* chave reserva */}
      <group position={[-0.5, 0.03, 0.72]} rotation={[0, -0.9, Math.PI / 2]}>
        <mesh position={[0, 0.12, 0]} material={m.amber} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.18, 12]} />
        </mesh>
        <mesh position={[0, -0.04, 0]} material={m.metal}>
          <cylinderGeometry args={[0.009, 0.009, 0.18, 8]} />
        </mesh>
      </group>

      {/* caneca */}
      <group position={[1.75, 0, -0.18]}>
        <mesh position={[0, 0.16, 0]} material={m.mug} castShadow>
          <cylinderGeometry args={[0.13, 0.12, 0.32, 24]} />
        </mesh>
        <mesh position={[0, 0.25, 0]} material={m.amber}>
          <cylinderGeometry args={[0.132, 0.132, 0.04, 24]} />
        </mesh>
        <mesh position={[0.14, 0.17, 0]} rotation={[0, 0, Math.PI / 2]} material={m.mug}>
          <torusGeometry args={[0.07, 0.02, 8, 16, Math.PI]} />
        </mesh>
      </group>

      {/* luminária articulada */}
      <group position={[-1.6, 0, -0.4]}>
        <mesh position={[0, 0.03, 0]} material={m.darkMetal} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.06, 24]} />
        </mesh>
        <Rod from={LAMP_BASE} to={LAMP_ELBOW} r={0.024} m={m.darkMetal} />
        <mesh position={LAMP_ELBOW.toArray()} material={m.amber}>
          <sphereGeometry args={[0.045, 12, 10]} />
        </mesh>
        <Rod from={LAMP_ELBOW} to={LAMP_HEAD} r={0.02} m={m.darkMetal} />
        <group position={LAMP_HEAD.toArray()} quaternion={LAMP_Q}>
          <mesh position={[0, -0.1, 0]} material={m.shade} castShadow>
            <cylinderGeometry args={[0.07, 0.19, 0.24, 24, 1, true]} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={m.bulb}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Personagem                                                          */
/* ------------------------------------------------------------------ */

function Arm({ side, m, refs }) {
  return (
    <group ref={refs.shoulder} position={[0.4 * side, 0.32, 0.02]}>
      <mesh position={[0, -UPPER / 2, 0]} material={m.shirt} castShadow>
        <capsuleGeometry args={[0.13, UPPER - 0.1, 6, 14]} />
      </mesh>
      <group ref={refs.elbow} position={[0, -UPPER, 0]}>
        <mesh position={[0, -FORE / 2, 0]} material={m.skin} castShadow>
          <capsuleGeometry args={[0.095, FORE - 0.12, 6, 12]} />
        </mesh>
        <mesh position={[0, -0.04, 0]} material={m.shirt}>
          <sphereGeometry args={[0.125, 14, 12]} />
        </mesh>
        <group ref={refs.hand} position={[0, -FORE, 0]}>
          <mesh material={m.skin} castShadow scale={[1, 1.1, 0.85]}>
            <sphereGeometry args={[0.12, 16, 14]} />
          </mesh>
          <mesh position={[0.07 * -side, 0.03, 0.06]} material={m.skin} scale={[0.7, 1, 0.7]}>
            <sphereGeometry args={[0.06, 10, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Character({ m, rig }) {
  const headGeo = useMemo(() => new RoundedBoxGeometry(1.22, 1.04, 1.0, 5, 0.34), []);
  const hairTop = useMemo(() => new RoundedBoxGeometry(1.3, 0.46, 1.08, 4, 0.2), []);
  const hairBack = useMemo(() => new RoundedBoxGeometry(1.28, 0.72, 0.42, 4, 0.18), []);
  const fringe = useMemo(() => new RoundedBoxGeometry(0.78, 0.2, 0.22, 3, 0.09), []);
  const apronGeo = useMemo(() => new RoundedBoxGeometry(0.64, 0.66, 0.06, 3, 0.03), []);

  return (
    <group position={CHAR_POS.toArray()}>
      <group ref={rig.torso} position={[0, 0.3, 0]}>
        {/* corpo (respira) */}
        <group ref={rig.chest}>
          <mesh material={m.shirt} castShadow scale={[1, 1, 0.82]}>
            <capsuleGeometry args={[0.4, 0.3, 8, 20]} />
          </mesh>
          <mesh geometry={apronGeo} position={[0, -0.05, 0.31]} rotation={[-0.08, 0, 0]} material={m.apron} />
          <mesh position={[0.15, 0.08, 0.345]} rotation={[-0.08, 0, 0]} material={m.patch}>
            <circleGeometry args={[0.07, 24]} />
          </mesh>
          {/* gola */}
          <mesh position={[0, 0.5, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={m.collar}>
            <torusGeometry args={[0.17, 0.05, 8, 20]} />
          </mesh>
        </group>
        <mesh position={[0, 0.56, 0]} material={m.skin}>
          <cylinderGeometry args={[0.13, 0.15, 0.16, 14]} />
        </mesh>

        {/* cabeça */}
        <group ref={rig.head} position={[0, 0.6, 0.02]}>
          <mesh geometry={headGeo} position={[0, 0.5, 0]} material={m.skin} castShadow />
          <mesh geometry={hairTop} position={[0, 0.88, -0.03]} material={m.hair} castShadow />
          <mesh geometry={hairBack} position={[0, 0.58, -0.32]} material={m.hair} />
          <mesh geometry={fringe} position={[-0.16, 0.82, 0.43]} rotation={[0.1, 0, 0.22]} material={m.hair} />
          {[-1, 1].map((s) => (
            <mesh key={s} position={[0.62 * s, 0.47, 0]} scale={[0.45, 1, 0.8]} material={m.skin}>
              <sphereGeometry args={[0.12, 14, 12]} />
            </mesh>
          ))}

          {/* olhos */}
          <group ref={rig.eyes}>
            {[-1, 1].map((s) => (
              <group key={s} position={[0.24 * s, 0.46, 0.49]}>
                <mesh material={m.eye} scale={[1, 1.15, 0.45]}>
                  <sphereGeometry args={[0.09, 20, 16]} />
                </mesh>
                <mesh position={[0.028, 0.038, 0.035]} material={m.white}>
                  <sphereGeometry args={[0.022, 10, 8]} />
                </mesh>
              </group>
            ))}
          </group>
          <group ref={rig.brows}>
            {[-1, 1].map((s) => (
              <mesh key={s} position={[0.24 * s, 0.62, 0.5]} rotation={[0, 0, -0.12 * s]} material={m.hair}>
                <boxGeometry args={[0.16, 0.035, 0.03]} />
              </mesh>
            ))}
          </group>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[0.37 * s, 0.32, 0.47]} scale={[1, 0.7, 0.3]} material={m.cheek}>
              <sphereGeometry args={[0.075, 12, 10]} />
            </mesh>
          ))}
          <mesh ref={rig.mouth} position={[0, 0.3, 0.5]} rotation={[0, 0, Math.PI]} material={m.mouth}>
            <torusGeometry args={[0.065, 0.016, 8, 20, Math.PI]} />
          </mesh>

          {/* tiara com lupa articulada */}
          <mesh position={[0, 0.5, 0.02]} material={m.darkMetal}>
            <torusGeometry args={[0.7, 0.035, 8, 40, Math.PI]} />
          </mesh>
          <group ref={rig.loupe} position={[0.24, 0.84, 0.5]}>
            <mesh position={[0, -0.08, 0.02]} material={m.darkMetal}>
              <boxGeometry args={[0.04, 0.18, 0.03]} />
            </mesh>
            <group position={[0, -0.32, 0.08]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} material={m.lens}>
                <cylinderGeometry args={[0.13, 0.13, 0.03, 28]} />
              </mesh>
              <mesh material={m.amber}>
                <torusGeometry args={[0.135, 0.022, 10, 32]} />
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
        <mesh position={[0, 0.09, 0]} material={m.metal} castShadow>
          <cylinderGeometry args={[0.009, 0.006, 0.18, 8]} />
        </mesh>
        <mesh position={[0, 0.29, 0]} material={m.amber} castShadow>
          <cylinderGeometry args={[0.034, 0.03, 0.22, 16]} />
        </mesh>
        {[0.22, 0.36].map((y) => (
          <mesh key={y} position={[0, y, 0]} material={m.darkMetal}>
            <cylinderGeometry args={[0.036, 0.036, 0.018, 16]} />
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
const _tmp2 = new Vector3();
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
  const state = useRef({ twist: 0, lastCycle: -1, look: new Vector3(), blink: 0 });

  useFrame((three, delta) => {
    // Movimento reduzido: pose fixa (personagem olhando para a câmera), resolvida em 1 quadro
    const t = staticPose ? 9.4 : three.clock.elapsedTime + 0.6;
    const dt = staticPose ? 10 : Math.min(delta, 0.05);
    const cycleIdx = Math.floor(t / CYCLE);
    const c = t % CYCLE;
    const st = state.current;

    // novo ciclo: reapresenta os parafusos
    const pair = cycleIdx % 2 === 0 ? [0, 1] : [2, 3];
    if (cycleIdx !== st.lastCycle) {
      st.lastCycle = cycleIdx;
      screwRefs.current.forEach((s) => s && (s.position.y = 0.045));
    }

    /* ---------- fases ---------- */
    const toA = seg(c, 0, 1.0);
    const screwA = c >= 1.0 && c < 4.0;
    const toB = seg(c, 4.0, 5.0);
    const screwB = c >= 5.0 && c < 8.0;
    const lift = seg(c, 8.0, 9.2) * (1 - seg(c, 11.4, 12.6));
    const reachTray = seg(c, 12.0, 12.8) * (1 - seg(c, 13.1, 13.9));
    const working = screwA || screwB;

    // progresso dos parafusos
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

    // tela do celular
    if (screen.current) {
      const done = c >= 8.4 && c < 12.8;
      screen.current.draw(c > 12.8 ? 0 : (pA + pB) / 2, done);
    }

    /* ---------- mão direita / ferramenta ---------- */
    const screwPA = SCREWS_WORLD[pair[0]];
    const screwPB = SCREWS_WORLD[pair[1]];
    const tip = _tmp2;
    if (c < 4.0) {
      tip.copy(REST).lerp(screwPA, toA);
      tip.y += Math.sin(toA * Math.PI) * 0.1;
    } else if (c < 8.0) {
      tip.copy(screwPA).lerp(screwPB, toB);
      tip.y += Math.sin(toB * Math.PI) * 0.12; // arco entre parafusos
    } else if (c < 11.4) {
      tip.copy(screwPB).lerp(INSPECT, seg(c, 8.0, 9.2)); // levanta para conferir
    } else {
      tip.copy(INSPECT).lerp(REST, seg(c, 11.4, 12.8)); // volta ao descanso
    }
    if (working) {
      st.twist += dt * 9;
      tip.y += 0.006 + Math.sin(t * 18) * 0.004; // pressão ao apertar
    }

    _rT.copy(TOOL_DIR).multiplyScalar(TOOL_GRIP).add(tip);

    if (tool.current) {
      tool.current.position.copy(tip);
      _q.setFromUnitVectors(UP, TOOL_DIR);
      _qs.setFromAxisAngle(_pole.set(1, 0, 0), -0.5 * lift); // inclina ao inspecionar
      tool.current.quaternion.copy(_qs).multiply(_q);
    }
    if (spin.current) spin.current.rotation.y = st.twist;

    /* ---------- mão esquerda ---------- */
    const steady = phoneLocalToWorld([-0.21, 0.06, -0.05], _lT);
    steady.y += Math.sin(t * 1.3) * 0.01;
    steady.x += Math.sin(t * 0.7) * 0.015;
    const trayP = _S.copy(TRAY_POS).add(_tmp.set(0.05, 0.12, 0));
    trayP.y += Math.sin(seg(c, 12.0, 13.9) * Math.PI) * 0.1;
    _lT.lerp(trayP, reachTray);

    /* ---------- tronco: respiração e postura ---------- */
    const torso = rig.torso.current;
    if (torso) {
      const breath = Math.sin(t * 1.7);
      rig.chest.current.scale.set(1 + breath * 0.012, 1 + breath * 0.02, 1 + breath * 0.012);
      torso.position.y = 0.3 + breath * 0.008;
      const lean = (working ? 0.16 : 0.08) * (1 - lift) + 0.02;
      torso.rotation.x = MathUtils.damp(torso.rotation.x, lean, 3, dt);
      torso.rotation.z = MathUtils.damp(
        torso.rotation.z,
        Math.sin(t * 0.35) * 0.03 + reachTray * 0.12,
        3,
        dt,
      );
      torso.rotation.y = MathUtils.damp(torso.rotation.y, -reachTray * 0.25 + lift * 0.05, 3, dt);
      torso.updateMatrixWorld(true);

      // IK nos dois braços (espaço local do tronco)
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

    /* ---------- cabeça, olhar, expressão ---------- */
    const head = rig.head.current;
    if (head) {
      // olha para a ponta da ferramenta enquanto trabalha; para a câmera ao inspecionar
      const lookCam = lift;
      const targetYaw = MathUtils.lerp(
        (tip.x - CHAR_POS.x) * 0.35 - reachTray * 0.5,
        pointer.current.x * 0.25,
        lookCam,
      );
      const nod = c > 9.6 && c < 10.6 ? Math.sin((c - 9.6) * Math.PI * 2) * 0.12 : 0;
      const targetPitch = MathUtils.lerp(0.42, -0.04 + pointer.current.y * -0.12, lookCam) + nod;
      head.rotation.y = MathUtils.damp(head.rotation.y, targetYaw, 4, dt);
      head.rotation.x = MathUtils.damp(head.rotation.x, targetPitch, 4, dt);
      head.rotation.z = MathUtils.damp(head.rotation.z, Math.sin(t * 0.5) * 0.04 - lookCam * 0.06, 2, dt);

      // lupa: abaixa para trabalhar, levanta para olhar
      const loupeDown = 1 - smooth(lift * 1.4);
      rig.loupe.current.rotation.x = MathUtils.lerp(-0.8, 0, loupeDown);

      // piscar a cada ~4s
      const blinkPhase = (t % 4.2) / 4.2;
      const blink = blinkPhase > 0.96 ? 0.1 : 1;
      rig.eyes.current.scale.y = MathUtils.damp(rig.eyes.current.scale.y, blink, 30, dt);

      // sobrancelhas e sorriso ao concluir
      rig.brows.current.position.y = lookCam * 0.035;
      const smile = 1 + lookCam * 0.5;
      rig.mouth.current.scale.set(smile, smile, 1);
    }

    /* ---------- câmera: ponteiro + parallax de rolagem ---------- */
    const p = progress.current;
    const portrait = size.width / size.height < 0.9;
    const baseZ = portrait ? 8.4 : 7.0;
    const baseY = portrait ? 2.9 : 2.55;
    camera.position.x = MathUtils.damp(camera.position.x, pointer.current.x * 0.35, 2.5, dt);
    camera.position.y = MathUtils.damp(camera.position.y, baseY - pointer.current.y * 0.15 + p * 1.1, 4, dt);
    camera.position.z = MathUtils.damp(camera.position.z, baseZ - p * 2.0, 4, dt);
    camera.lookAt(0, 0.78 - p * 0.2, 0);
    if (root.current) {
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, -0.32 + p * 0.55, 4, dt);
    }
  });

  return (
    <>
      <Environment />
      <hemisphereLight args={["#bcd0ff", "#1a1208", 0.6]} />
      <directionalLight
        position={[2.5, 5, 3.5]}
        intensity={1.6}
        color="#fff3e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      {/* contraluz azul da marca */}
      <directionalLight position={[-3, 3, -4]} intensity={2.2} color="#4a7dff" />
      {/* luz quente da luminária */}
      <pointLight position={[-0.8, 1.0, 0.0]} intensity={2.2} distance={4} decay={2} color="#ffc56b" />
      {/* brilho da tela */}
      <pointLight position={[0.9, 0.45, 0.5]} intensity={0.6} distance={1.6} color="#7aa2ff" />

      <group ref={root} rotation={[0, -0.32, 0]} position={[0.1, -0.15, 0]}>
        <Bench m={m} screwRefs={screwRefs} screenMatRef={screen} />
        <Character m={m} rig={rig} />
        <Screwdriver m={m} toolRef={tool} spinRef={spin} />
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function Workshop({ progress, active = true, reducedMotion = false }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
      camera={{ fov: 30, position: [0, 2.55, 7.0], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      aria-hidden
    >
      <Scene progress={progress} pointer={pointer} staticPose={reducedMotion} />
    </Canvas>
  );
}
