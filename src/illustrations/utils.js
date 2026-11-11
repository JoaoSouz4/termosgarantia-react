import { useId } from "react";

/* Paleta fixa das ilustrações: funciona sobre painéis claros e escuros. */
export const C = {
  body: "#1b2232",
  edge: "#3d4a66",
  bezel: "#070b14",
  screenA: "#2f63f2",
  screenB: "#0a1a44",
  ink: "#edf1fa",
  mute: "#8e9bbb",
  red: "#ff6b81",
  amber: "#f6b73c",
  green: "#3ddc97",
  cyan: "#22c3d6",
  violet: "#8b7bff",
  pcb: "#0e4a3a",
  pcbLight: "#17684f",
  gold: "#e0b24e",
  metal: "#c9d2df",
  metalDark: "#6f7d98",
  rust: "#c9731f",
  corrosion: "#58c49a",
  cell: "#2a3142",
  cellEdge: "#4a5470",
};

/** Gerador determinístico: a mesma semente sempre produz a mesma imagem. */
export function rng(seed) {
  let a = (seed * 9301 + 49297) >>> 0;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

export function useSvgId() {
  return useId().replace(/\W/g, "");
}
