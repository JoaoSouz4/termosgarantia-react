import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Illustration, VARIANTS } from "../../../../../illustrations";

/**
 * Galeria com as 3 versões da ilustração do caso, sobre um fundo
 * com a luz da categoria e legenda técnica.
 */
export function Carrousel({ art, alt = "", index = 1, accent, covered }) {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  const slides = Array.from({ length: VARIANTS }, (_, i) => i);

  function goTo(i) {
    const el = track.current;
    if (!el) return;
    const next = (i + VARIANTS) % VARIANTS;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <figure className="group relative isolate overflow-hidden rounded-[22px] bg-linear-to-b from-panel-2 to-bg-2">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-30"
        style={{ background: `radial-gradient(60% 80% at 50% 100%, ${accent}, transparent 70%)` }}
      />

      <div
        ref={track}
        onScroll={onScroll}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        tabIndex={0}
        aria-label={`Galeria: ${alt}`}
      >
        {slides.map((i) => (
          <div key={i} className="flex w-full shrink-0 snap-center items-center justify-center px-4 pb-12 pt-10 md:px-6">
            <Illustration
              id={art}
              variant={i}
              label={`${alt} — exemplo ${i + 1}`}
              className={`h-56 w-full transition-transform duration-700 ease-out md:h-72 ${
                i === current ? "scale-100 group-hover:scale-[1.03]" : "scale-90"
              }`}
            />
          </div>
        ))}
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
        <span>
          Fig. {String(index).padStart(2, "0")}.{current + 1}
        </span>
        <span className={covered ? "text-ok" : "text-no"}>{covered ? "● coberto" : "● não coberto"}</span>
      </figcaption>

      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label="Exemplo anterior"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/10 text-ink transition hover:bg-ink/20"
        >
          <LuChevronLeft aria-hidden />
        </button>
        <div className="flex gap-1.5">
          {slides.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver exemplo ${i + 1}`}
              aria-current={i === current}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                i === current ? "w-6 bg-ink" : "w-1.5 bg-ink/30"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label="Próximo exemplo"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/10 text-ink transition hover:bg-ink/20"
        >
          <LuChevronRight aria-hidden />
        </button>
      </div>
    </figure>
  );
}
