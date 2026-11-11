import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

/**
 * Grade editorial assimétrica:
 * - destaque (tela, o serviço mais comum): coluna larga, ocupa 3 linhas
 * - demais: horizontais, empilhados ao lado (no desktop)
 */
export function ServiceCard({ category, index = 0, featured = false }) {
  const { path, title, cover, summary, coverage, exclusions, code, accent } = category;

  return (
    <Link
      to={path}
      data-reveal
      style={{ "--reveal-delay": `${index * 90}ms`, "--accent-c": accent }}
      className={`group relative isolate flex overflow-hidden rounded-[28px] border border-line bg-panel transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-(--accent-c)/50 ${
        featured ? "flex-col lg:col-span-7 lg:row-span-3" : "flex-col lg:col-span-5 lg:flex-row"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          featured ? "aspect-4/3 lg:aspect-auto lg:grow" : "aspect-16/9 lg:aspect-auto lg:w-[42%]"
        }`}
      >
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        {featured && (
          <div className="absolute inset-0 bg-linear-to-t from-panel via-transparent to-transparent" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {code} · {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={`relative flex flex-col ${featured ? "p-6 md:p-8" : "grow p-5 md:p-6"}`}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-display font-semibold leading-tight tracking-tight text-ink ${
              featured ? "text-3xl md:text-4xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-(--accent-c) group-hover:text-[#0b1224]">
            <LuArrowUpRight aria-hidden />
          </span>
        </div>
        <p className={`mt-3 grow text-sm leading-relaxed text-ink-2 ${featured ? "max-w-md md:text-base" : ""}`}>
          {summary}
        </p>
        <div className="mt-5 flex gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="flex items-center gap-1.5 text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            {coverage.length} cobre
          </span>
          <span className="flex items-center gap-1.5 text-no">
            <span className="h-1.5 w-1.5 rounded-full bg-no" />
            {exclusions.length} não cobre
          </span>
        </div>
      </div>
    </Link>
  );
}
