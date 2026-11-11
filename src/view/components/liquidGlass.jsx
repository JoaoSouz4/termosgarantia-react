/*
 * Liquid Glass — inspirado em ui-layouts.com/components/liquid-glass:
 * 1. Blur:  backdrop-filter (desfoque + saturação do que está atrás)
 * 2. Tint:  cor do material, adaptada ao tema
 * 3. Face:  sombra externa e brilho
 * 4. Edge:  realces internos nas bordas (espessura do vidro)
 * 5. Sheen: reflexo especular suave
 *
 * Obs.: a referência aplica um filtro SVG de deslocamento na própria camada de
 * blur. Em elementos baixos (cabeçalho, toggle) o deslocamento empurra o fundo
 * desfocado para fora da área e o vidro fica transparente, por isso o blur
 * aqui fica em uma camada limpa.
 */

const blurs = {
  sm: "blur(8px) saturate(160%)",
  md: "blur(14px) saturate(170%)",
  lg: "blur(22px) saturate(180%)",
};

export function LiquidGlass({
  as: Tag = "div",
  children,
  className = "",
  radius = "28px",
  blur = "md",
  tint = "var(--glass-tint)",
  style,
  ...props
}) {
  const r = { borderRadius: radius };
  return (
    <Tag className={`relative isolate ${className}`} style={{ ...r, ...style }} {...props}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ ...r, backdropFilter: blurs[blur], WebkitBackdropFilter: blurs[blur] }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ ...r, background: tint }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          ...r,
          boxShadow:
            "0 10px 30px -10px rgb(0 0 0 / 0.45), 0 2px 6px rgb(0 0 0 / 0.2), 0 0 40px var(--glass-glow)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          ...r,
          boxShadow:
            "inset 1.5px 1.5px 1px 0 var(--glass-edge), inset -1px -1px 1px 0 rgb(255 255 255 / 0.08), inset 0 0 0 1px rgb(255 255 255 / 0.06)",
        }}
      />
      {/* Reflexo sem mix-blend-mode: blend aqui isolaria o grupo e anularia o blur */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          ...r,
          background:
            "radial-gradient(120% 80% at 20% 0%, rgb(255 255 255 / 0.1), transparent 55%)",
        }}
      />
      {children}
    </Tag>
  );
}
