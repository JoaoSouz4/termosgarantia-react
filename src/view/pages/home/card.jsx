import { Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import { Illustration } from "../../../illustrations";

function Counts({ coverage, exclusions }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] font-medium min-[375px]:gap-x-4">
      <span className="flex items-center gap-1.5 text-ok">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok" />
        {coverage} {coverage === 1 ? "passa" : "passam"}
      </span>
      <span className="flex items-center gap-1.5 text-no">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-no" />
        {exclusions} não {exclusions === 1 ? "passa" : "passam"}
      </span>
    </p>
  );
}

/**
 * Mobile: linha compacta (miniatura + texto), fácil de escanear.
 * Desktop: grade editorial, com a troca de tela (serviço mais comum) em destaque.
 */
export function ServiceCard({ category, featured = false }) {
  const { path, title, cover, summary, coverage, exclusions, accent } = category;

  return (
    <Link
      to={path}
      style={{ "--accent-c": accent }}
      className={`group relative flex overflow-hidden rounded-3xl border border-line bg-panel transition-colors duration-300 hover:border-(--accent-c)/60 focus-visible:border-(--accent-c) ${
        featured ? "lg:col-span-7 lg:row-span-3 lg:flex-col" : "lg:col-span-5"
      }`}
    >
      <div
        className={`relative w-20 shrink-0 overflow-hidden min-[375px]:w-28 sm:w-36 ${
          featured ? "lg:aspect-auto lg:w-full lg:grow" : "lg:w-[40%]"
        }`}
      >
        <Illustration
          id={cover}
          fit="cover"
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className={`flex min-w-0 grow flex-col justify-center gap-2 p-3.5 min-[375px]:p-4 sm:p-5 ${featured ? "lg:grow-0 lg:p-8" : "lg:p-6"}`}>
        <div className="flex items-center justify-between gap-3">
          <h3
            className={`font-display text-[1.0625rem] font-semibold leading-tight text-ink text-balance sm:text-lg ${
              featured ? "lg:text-4xl" : "lg:text-xl"
            }`}
          >
            {title}
          </h3>
          <LuChevronRight
            aria-hidden
            className="shrink-0 text-xl text-ink-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>
        <p className={`hidden text-sm leading-relaxed text-ink-2 sm:block ${featured ? "lg:max-w-md lg:text-base" : ""}`}>
          {summary}
        </p>
        <Counts coverage={coverage.length} exclusions={exclusions.length} />
      </div>
    </Link>
  );
}
