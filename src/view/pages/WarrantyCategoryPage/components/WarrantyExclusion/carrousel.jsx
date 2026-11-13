import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Illustration, VARIANTS } from "../../../../../illustrations";

/** Galeria com as 3 versões da ilustração do caso. */
export function Carrousel({ art, alt = "", accent }) {
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
    <figure className="relative isolate overflow-hidden rounded-2xl bg-linear-to-b from-panel-2 to-bg-2 md:rounded-[22px]">
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
        role="group"
        aria-roledescription="galeria"
        aria-label={`Exemplos: ${alt}`}
      >
        {slides.map((i) => (
          <div key={i} className="flex w-full shrink-0 snap-center items-center justify-center px-3 pb-16 pt-6 md:px-6">
            <Illustration
              id={art}
              variant={i}
              label={`${alt}, exemplo ${i + 1} de ${VARIANTS}`}
              className="h-52 w-full md:h-72"
            />
          </div>
        ))}
      </div>

      <figcaption className="absolute inset-x-0 bottom-2 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label="Exemplo anterior"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
        >
          <LuChevronLeft aria-hidden className="text-xl" />
        </button>
        <div className="flex items-center gap-1">
          {slides.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver exemplo ${i + 1}`}
              aria-current={i === current}
              className="flex h-6 w-6 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-ink" : "w-1.5 bg-ink/35"
                }`}
              />
            </button>
          ))}
          <span className="sr-only" aria-live="polite">
            Exemplo {current + 1} de {VARIANTS}
          </span>
        </div>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label="Próximo exemplo"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
        >
          <LuChevronRight aria-hidden className="text-xl" />
        </button>
      </figcaption>
    </figure>
  );
}
