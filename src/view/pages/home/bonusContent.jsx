import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import normalScreen2 from "../../../assets/normalScreen2.webp";

export function BonusContent() {
  return (
    <Link
      to="/bonus1"
      data-reveal
      className="group grid items-center gap-8 overflow-hidden rounded-[28px] border border-line bg-panel p-6 transition-colors hover:border-line-strong md:grid-cols-[1.3fr_1fr] md:p-12"
    >
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Conteúdo extra · #001
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink md:text-4xl">
          Por que existem diferentes qualidades de tela?
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
          Original, OLED, LCD, paralela… Entenda o que muda no dia a dia antes
          de escolher a tela do seu aparelho.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 font-semibold text-ink">
          Ler conteúdo
          <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
        </span>
      </div>
      <div className="specimen relative flex h-64 items-center justify-center overflow-hidden rounded-[22px] md:h-80">
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Fig. OLED × LCD
        </span>
        <img
          src={normalScreen2}
          alt=""
          loading="lazy"
          className="h-[88%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
