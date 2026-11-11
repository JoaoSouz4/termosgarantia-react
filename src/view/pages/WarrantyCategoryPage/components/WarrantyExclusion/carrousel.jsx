import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

/**
 * Placa de "espécime": as fotos (fundo branco) ficam em um fundo de estúdio
 * claro, com a luz de destaque da categoria e legenda técnica.
 */
export function Carrousel({ pathImages = [], alt = "", index = 1, accent, covered }) {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  const hasMany = pathImages.length > 1;

  function goTo(i) {
    const el = track.current;
    if (!el) return;
    const next = (i + pathImages.length) % pathImages.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <figure className="specimen group relative isolate overflow-hidden rounded-[22px]">
      {/* luz da categoria */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 opacity-40"
        style={{ background: `radial-gradient(60% 80% at 50% 100%, ${accent}, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[78%] -z-10 h-6 w-1/2 -translate-x-1/2 rounded-full bg-black/25 blur-xl"
      />

      <div
        ref={track}
        onScroll={onScroll}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        tabIndex={hasMany ? 0 : undefined}
        aria-label={hasMany ? `Galeria: ${alt}` : undefined}
      >
        {pathImages.map((path, i) => (
          <div key={`${path}-${i}`} className="flex w-full shrink-0 snap-center items-center justify-center px-6 pb-14 pt-12">
            <img
              src={path}
              alt={hasMany ? `${alt} — exemplo ${i + 1}` : alt}
              loading="lazy"
              className={`h-60 w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out md:h-80 ${
                i === current ? "scale-100 group-hover:scale-[1.04]" : "scale-90"
              }`}
            />
          </div>
        ))}
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <span>Fig. {String(index).padStart(2, "0")}</span>
        <span className={covered ? "text-emerald-700" : "text-rose-700"}>
          {covered ? "● coberto" : "● não coberto"}
        </span>
      </figcaption>

      {hasMany && (
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Imagem anterior"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur transition hover:bg-slate-900"
          >
            <LuChevronLeft aria-hidden />
          </button>
          <div className="flex gap-1.5">
            {pathImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver imagem ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                  i === current ? "w-6 bg-slate-900" : "w-1.5 bg-slate-900/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Próxima imagem"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur transition hover:bg-slate-900"
          >
            <LuChevronRight aria-hidden />
          </button>
        </div>
      )}
    </figure>
  );
}
