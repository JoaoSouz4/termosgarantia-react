/**
 * Classifica o aparelho para ajustar o custo dos efeitos (cena 3D, blur).
 * "low": celulares modestos, poucos núcleos/memória ou economia de dados.
 */
export function deviceTier() {
  if (typeof navigator === "undefined") return "high";
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const saveData = navigator.connection?.saveData;
  if (saveData || memory <= 2 || cores <= 2) return "low";
  if (coarse && (memory <= 4 || cores <= 4)) return "low";
  return "high";
}

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
