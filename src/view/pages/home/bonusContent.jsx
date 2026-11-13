import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Illustration } from "../../../illustrations";

export function BonusContent() {
  return (
    <Link
      to="/bonus1"
      className="group grid items-center gap-6 overflow-hidden rounded-3xl border border-line bg-panel p-5 transition-colors hover:border-line-strong md:grid-cols-[1.3fr_1fr] md:gap-10 md:p-12"
    >
      <div className="px-1 pt-1 md:p-0">
        <p className="text-sm font-medium text-ink-2">Antes de trocar a tela</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink md:text-4xl">
          Por que existem diferentes qualidades de tela?
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
          Original, OLED, LCD, paralela: entenda o que muda no dia a dia antes de escolher a tela do seu aparelho.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink md:mt-8">
          Ler a explicação
          <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl">
        <Illustration
          id="cover-screen"
          variant={1}
          fit="cover"
          className="aspect-4/3 w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}
