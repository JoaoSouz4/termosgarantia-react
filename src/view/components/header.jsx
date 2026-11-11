import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu";
import logo from "../../assets/logo.webp";
import { warrantyCategories } from "../../data/warrantyExclusions";
import { useTheme } from "../../hooks/useTheme";
import { LiquidGlass } from "./liquidGlass";
import { WhatsAppButton } from "./whatsappButton";

export function Header() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <LiquidGlass
        radius="22px"
        blur="lg"
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 py-2 pl-3 pr-2 transition-all duration-500 md:pl-4 ${
          scrolled ? "" : "md:py-2.5"
        }`}
      >
        <Link to="/" className="relative z-20 flex items-center gap-3">
          <img
            className="w-10 invert dark:invert-0"
            src={logo}
            alt="BH Assistência Técnica"
          />
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold text-ink">
              Termos da garantia
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              BH Assistência
            </span>
          </span>
        </Link>

        <nav aria-label="Serviços" className="relative z-20 hidden items-center gap-1 lg:flex">
          {warrantyCategories.map((c) => (
            <NavLink
              key={c.path}
              to={c.path}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive ? "bg-ink/10 text-ink" : "text-ink-2 hover:text-ink"
                }`
              }
            >
              {c.navLabel}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            {theme === "dark" ? <LuSun aria-hidden /> : <LuMoon aria-hidden />}
          </button>
          <div className="hidden sm:block">
            <WhatsAppButton size="sm">WhatsApp</WhatsAppButton>
          </div>
        </div>
      </LiquidGlass>
    </header>
  );
}
