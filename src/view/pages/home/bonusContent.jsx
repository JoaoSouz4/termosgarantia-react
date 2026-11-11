import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Illustration } from "../../../illustrations";

export function BonusContent() {
  return (
    <Link
      to="/bonus1"
      data-reveal
      className="group grid items-center gap-6 overflow-hidden rounded-[28px] border border-line bg-panel p-5 transition-colors hover:border-line-strong md:grid-cols-[1.3fr_1fr] md:gap-8 md:p-12"
    >
      <div className="px-1 pt-2 md:p-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Conteúdo extra · #001</span>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink md:text-4xl">
          Por que existem diferentes qualidades de tela?
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
          Original, OLED, LCD, paralela… Entenda o que muda no dia a dia antes de escolher a tela do seu aparelho.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink md:mt-8">
          Ler conteúdo
          <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
        </span>
      </div>
      <div className="relative overflow-hidden rounded-[22px]">
        <Illustration
          id="cover-screen"
          variant={1}
          fit="cover"
          className="aspect-4/3 w-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
          Fig. OLED × LCD
        </span>
      </div>
    </Link>
  );
}
