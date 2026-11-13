import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuChevronRight } from "react-icons/lu";
import { WarrantyTabs } from "./components/tabs";
import { WarrantyExclusion } from "./components/WarrantyExclusion";
import { WhatsAppButton } from "../../components/whatsappButton";
import { Illustration } from "../../../illustrations";
import { warrantyCategories } from "../../../data/warrantyExclusions";

export function WarrantyCategoryPage({ category }) {
  const { title, intro, cover, coverage, exclusions, accent, path } = category;
  const [tab, setTab] = useState("exclusions");
  const items = tab === "coverage" ? coverage : exclusions;
  const listRef = useRef(null);
  const message = `Olá! Fiz o serviço de ${title.toLowerCase()} e gostaria de tirar uma dúvida sobre a garantia.`;
  const others = warrantyCategories.filter((c) => c.path !== path);

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
    <div style={{ "--accent-c": accent }} className="pb-36">
      {/* cabeçalho */}
      <section className="grain relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="mesh -z-10 opacity-60">
          <span className="m1" />
          <span className="m2" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-bg" aria-hidden />

        <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pb-10 pt-28 md:grid-cols-[1.25fr_1fr] md:px-6 md:pb-20 md:pt-40">
          <div className="animate-fade-up">
            <Link
              to="/"
              className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <LuArrowLeft aria-hidden /> Todos os serviços
            </Link>
            <h1 className="mt-6 font-display text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">{intro}</p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-2 text-no">
                <span aria-hidden className="h-2 w-2 rounded-full bg-no" />
                {exclusions.length} {exclusions.length === 1 ? "caso não passa" : "casos não passam"}
              </span>
              <span className="flex items-center gap-2 text-ok">
                <span aria-hidden className="h-2 w-2 rounded-full bg-ok" />
                {coverage.length} {coverage.length === 1 ? "caso passa" : "casos passam"}
              </span>
            </p>
          </div>
          <Illustration
            id={cover}
            fit="cover"
            className="hidden aspect-4/3 w-full rounded-3xl shadow-2xl ring-1 ring-line md:block"
          />
        </div>
      </section>

      {/* casos */}
      <section
        ref={listRef}
        id="lista-casos"
        role="tabpanel"
        aria-label={tab === "coverage" ? "Casos que passam na garantia" : "Casos que não passam na garantia"}
        className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-8 md:px-6 md:pt-16"
      >
        <div key={tab} className="space-y-4 md:space-y-8">
          {items.map((item, i) => (
            <WarrantyExclusion
              key={`${tab}-${item.id}`}
              covered={tab === "coverage"}
              accent={accent}
              flip={i % 2 === 1}
              {...item}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-panel p-6 md:mt-16 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink md:text-3xl">Não encontrou o seu caso?</h2>
            <p className="mt-2 text-ink-2">Mande fotos do aparelho e analisamos com você.</p>
          </div>
          <WhatsAppButton className="w-full shrink-0 md:w-auto" message={message}>
            Enviar fotos no WhatsApp
          </WhatsAppButton>
        </div>

        <nav aria-labelledby="t-outros" className="mt-12 md:mt-16">
          <h2 id="t-outros" className="font-display text-lg font-semibold text-ink">
            Outros serviços
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {others.map((c) => (
              <li key={c.path}>
                <Link
                  to={c.path}
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-ink transition-colors hover:border-line-strong hover:bg-panel"
                >
                  <span className="font-medium">{c.title}</span>
                  <LuChevronRight aria-hidden className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <WarrantyTabs active={tab} onChange={changeTab} whatsappMessage={message} />
    </div>
  );
}
