import { Quaternion, Vector3 } from "three";

const DOWN = new Vector3(0, -1, 0);
const _dir = new Vector3();
const _axis = new Vector3();
const _q1 = new Quaternion();
const _qa = new Quaternion();
const _inv = new Quaternion();

/**
 * IK analítico de dois ossos.
 * Os ossos apontam para -Y no espaço local. `S` e `T` estão no espaço do pai
 * do ombro; `pole` indica para onde o cotovelo deve dobrar.
 */
export function solveTwoBone(shoulder, elbow, S, T, pole, a, b) {
  _dir.subVectors(T, S);
  const d = Math.min(Math.max(_dir.length(), 0.001), (a + b) * 0.999);
  _dir.normalize();

  const alpha = Math.acos(
    Math.min(1, Math.max(-1, (a * a + d * d - b * b) / (2 * a * d))),
  );
  const beta = Math.acos(
    Math.min(1, Math.max(-1, (a * a + b * b - d * d) / (2 * a * b))),
  );

  _axis.crossVectors(_dir, pole);
  if (_axis.lengthSq() < 1e-6) _axis.set(1, 0, 0);
  _axis.normalize();

  _q1.setFromUnitVectors(DOWN, _dir);
  _qa.setFromAxisAngle(_axis, alpha);
  shoulder.quaternion.copy(_qa).multiply(_q1);

  _inv.copy(shoulder.quaternion).invert();
  _axis.applyQuaternion(_inv);
  elbow.quaternion.setFromAxisAngle(_axis, -(Math.PI - beta));
}
