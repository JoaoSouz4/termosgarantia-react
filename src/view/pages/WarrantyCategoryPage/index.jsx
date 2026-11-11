import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { WarrantyTabs } from "./components/tabs";
import { WarrantyExclusion } from "./components/WarrantyExclusion";
import { WhatsAppButton } from "../../components/whatsappButton";
import { useReveal } from "../../../hooks/useMotion";
import { Illustration } from "../../../illustrations";

export function WarrantyCategoryPage({ category }) {
  const { title, intro, cover, coverage, exclusions, code, accent } = category;
  const [tab, setTab] = useState("exclusions");
  const items = tab === "coverage" ? coverage : exclusions;
  const listRef = useRef(null);
  const revealRef = useReveal([tab]);

  function changeTab(next) {
    if (next === tab) return;
    setTab(next);
    // se o leitor já passou do topo da lista, volta para o primeiro caso
    const top = listRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) {
      window.scrollTo({ top: window.scrollY + top - 110, behavior: "smooth" });
    }
  }

  return (
    <div ref={revealRef} style={{ "--accent-c": accent }} className="pb-32 md:pb-36">
      {/* cabeçalho */}
      <section className="grain relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="mesh -z-10 opacity-60">
          <span className="m1" />
          <span className="m2" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-bg" aria-hidden />

        <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pb-14 pt-32 md:grid-cols-[1.25fr_1fr] md:px-6 md:pb-20 md:pt-40">
          <div className="animate-fade-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-ink"
            >
              <LuArrowLeft aria-hidden /> Início
            </Link>
            <span className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
              <span style={{ color: accent }}>{code}</span>
              <span className="h-px w-8 bg-line-strong" />
              Termos da garantia
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{intro}</p>
            <dl className="mt-8 flex gap-8 font-mono text-xs uppercase tracking-[0.16em]">
              <div>
                <dt className="text-ink-3">Não passa</dt>
                <dd className="mt-1 font-display text-3xl normal-case tracking-normal text-no">
                  {String(exclusions.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="text-ink-3">Passa</dt>
                <dd className="mt-1 font-display text-3xl normal-case tracking-normal text-ok">
                  {String(coverage.length).padStart(2, "0")}
                </dd>
              </div>
            </dl>
          </div>
          <figure className="relative hidden md:block">
            <Illustration id={cover} fit="cover" className="aspect-4/3 w-full rounded-[28px] shadow-2xl ring-1 ring-line" />
            <figcaption className="absolute -bottom-3 left-6 rounded-full border border-line bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              Serviço · {code}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* casos */}
      <section
        ref={listRef}
        id="lista-casos"
        role="tabpanel"
        aria-label={tab === "coverage" ? "Casos que passam na garantia" : "Casos que não passam na garantia"}
        className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-12 md:px-6 md:pt-16"
      >
        <div key={tab} className="space-y-6 md:space-y-8">
          {items.map((item, i) => (
            <WarrantyExclusion
              key={`${tab}-${item.id}`}
              index={i + 1}
              covered={tab === "coverage"}
              accent={accent}
              flip={i % 2 === 1}
              {...item}
            />
          ))}
        </div>

        <div
          data-reveal
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-line bg-panel p-7 md:flex-row md:items-center md:p-10"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Não encontrou o seu caso?
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">
              Mande fotos. A gente analisa com você.
            </h2>
          </div>
          <WhatsAppButton
            className="shrink-0"
            message={`Olá! Fiz o serviço de ${title.toLowerCase()} e gostaria de tirar uma dúvida sobre a garantia.`}
          >
            Falar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <WarrantyTabs
        active={tab}
        onChange={changeTab}
        whatsappMessage={`Olá! Fiz o serviço de ${title.toLowerCase()} e gostaria de tirar uma dúvida sobre a garantia.`}
      />
    </div>
  );
}
