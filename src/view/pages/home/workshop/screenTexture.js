import { CanvasTexture, SRGBColorSpace } from "three";

/** Tela do celular na bancada: mostra o diagnóstico e, ao final, "garantia ok". */
export function createScreen() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;

  let last = "";

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw(progress, done) {
    const key = done ? "done" : `p${Math.round(progress * 40)}`;
    if (key === last) return;
    last = key;

    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, done ? "#06281d" : "#0a1a44");
    g.addColorStop(1, "#050915");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 512);

    // brilho radial
    const rg = ctx.createRadialGradient(128, 200, 10, 128, 200, 170);
    rg.addColorStop(0, done ? "rgba(61,220,151,0.45)" : "rgba(74,125,255,0.45)");
    rg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, 256, 512);

    // escudo
    ctx.save();
    ctx.translate(128, 196);
    ctx.beginPath();
    ctx.moveTo(0, -62);
    ctx.lineTo(50, -42);
    ctx.lineTo(46, 12);
    ctx.quadraticCurveTo(36, 48, 0, 66);
    ctx.quadraticCurveTo(-36, 48, -46, 12);
    ctx.lineTo(-50, -42);
    ctx.closePath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = done ? "#3ddc97" : "#f6b73c";
    ctx.stroke();
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (done) {
      ctx.moveTo(-20, 2);
      ctx.lineTo(-4, 18);
      ctx.lineTo(24, -14);
    } else {
      ctx.moveTo(-18, 0);
      ctx.lineTo(18, 0);
    }
    ctx.stroke();
    ctx.restore();

    ctx.textAlign = "center";
    ctx.fillStyle = "#e9eefb";
    ctx.font = "600 22px Sora, Inter, sans-serif";
    ctx.fillText(done ? "GARANTIA OK" : "DIAGNÓSTICO", 128, 318);
    ctx.font = "500 15px 'JetBrains Mono', monospace";
    ctx.fillStyle = done ? "#3ddc97" : "#9fb2dd";
    ctx.fillText(done ? "reparo concluído" : `${Math.round(progress * 100)}%`, 128, 346);

    // barra de progresso
    roundRect(48, 372, 160, 10, 5);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fill();
    roundRect(48, 372, Math.max(10, 160 * (done ? 1 : progress)), 10, 5);
    ctx.fillStyle = done ? "#3ddc97" : "#4a7dff";
    ctx.fill();

    texture.needsUpdate = true;
  }

  draw(0, false);
  return { texture, draw };
}

/** Selo bordado "BH" para o avental. */
export function createPatch() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f6b73c";
  ctx.beginPath();
  ctx.arc(64, 64, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0b1a4a";
  ctx.font = "800 italic 58px Sora, Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BH", 64, 68);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
