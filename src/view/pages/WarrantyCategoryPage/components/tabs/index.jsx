import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuCheck, LuX } from "react-icons/lu";
import { LiquidGlass } from "../../../../components/liquidGlass";
import { whatsappLink } from "../../../../../utils/whatsapp";

const tabs = [
  { id: "exclusions", label: "Não passa", icon: LuX },
  { id: "coverage", label: "Passa", icon: LuCheck },
];

/**
 * Toggle "Passa / Não passa" fixo na base da tela.
 * No mobile, o botão do WhatsApp fica na mesma linha, alinhado ao toggle.
 */
export function WarrantyTabs({ active, onChange, whatsappMessage }) {
  const [atFooter, setAtFooter] = useState(false);

  // Sai de cena quando o rodapé aparece, para não cobrir conteúdo
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), {
      rootMargin: "0px 0px -40px 0px",
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  function onKeyDown(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = active === "exclusions" ? "coverage" : "exclusions";
      onChange(next);
      e.currentTarget.parentElement.querySelector(`[data-tab="${next}"]`)?.focus();
    }
  }

  const isCoverage = active === "coverage";

  return (
    <div
      inert={atFooter}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-out md:pb-6 ${
        atFooter ? "translate-y-[140%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <LiquidGlass
        radius="24px"
        blur="lg"
        tint="var(--glass-tint-strong)"
        className="pointer-events-auto min-w-0 flex-1 p-1.5 ring-1 ring-line-strong md:max-w-110"
      >
        <p className="relative z-20 px-3 pb-1 pt-1 text-xs font-medium text-ink-2">Mostrar casos que</p>
        <div role="tablist" aria-label="Filtrar casos de garantia" className="relative z-20 grid grid-cols-2">
          {/* indicador deslizante: sólido, para leitura clara */}
          <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-1/2 rounded-[18px] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.5,1.5,0.5,1)] ${
              isCoverage
                ? "translate-x-full bg-ok shadow-[0_6px_24px_-6px_var(--ok)]"
                : "translate-x-0 bg-no shadow-[0_6px_24px_-6px_var(--no)]"
            }`}
          />
          {tabs.map(({ id, label, icon: Icon }) => {
            const selected = active === id;
            // cor do texto sobre o indicador definida por tema (contraste AA)
            const color = id === "coverage" ? "text-on-ok" : "text-on-no";
            return (
              <button
                key={id}
                data-tab={id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="lista-casos"
                tabIndex={selected ? 0 : -1}
                onClick={() => onChange(id)}
                onKeyDown={onKeyDown}
                className={`relative flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[18px] text-[15px] font-semibold transition-colors duration-300 ${
                  selected ? color : "text-ink hover:bg-ink/5"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-500 ${
                    selected
                      ? "scale-100 bg-black/10"
                      : `scale-90 ${id === "coverage" ? "text-ok" : "text-no"}`
                  }`}
                >
                  <Icon aria-hidden />
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </LiquidGlass>

      {/* WhatsApp alinhado ao toggle (mobile). No desktop usa o botão flutuante padrão. */}
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a assistência no WhatsApp"
        className="pointer-events-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-whatsapp text-[#04210f] shadow-[0_10px_40px_-8px_rgb(37_211_102/0.7)] transition-transform active:scale-95 md:hidden"
      >
        <FaWhatsapp className="text-[28px]" aria-hidden />
      </a>
    </div>
  );
}
