import { LuArrowDown, LuCheck, LuX } from "react-icons/lu";
import { warrantyCategories } from "../../../data/warrantyExclusions";
import { usePrefersReducedMotion, useScrollProgress } from "../../../hooks/useMotion";
import { WhatsAppButton } from "../../components/whatsappButton";
import { ServiceCard } from "./card";
import { BonusContent } from "./bonusContent";
import { SectionTitle } from "./sectionTitle";
import { CircuitBackground } from "./circuitBackground";
import { HeroArt } from "../../../illustrations/hero";

const steps = [
  {
    title: "Escolha o serviço",
    text: "Tela, bateria, conector ou placa: cada reparo tem regras próprias.",
  },
  {
    title: "Compare com o seu caso",
    text: "Cada situação vem com exemplo visual e o motivo de passar ou não.",
  },
  {
    title: "Fale com a bancada",
    text: "Ficou em dúvida? Mande fotos pelo WhatsApp e avaliamos com você.",
  },
];

const covered = [
  "Defeitos de fabricação das peças usadas no serviço",
  "Falhas de mão de obra e de instalação",
  "O mesmo defeito voltando, sem sinais de dano externo",
];

const notCovered = [
  "Quedas, impactos e pressão sobre o aparelho",
  "Contato com líquidos, umidade ou oxidação",
  "Mau uso e desgaste natural",
  "Defeitos que já existiam antes do serviço",
  "Falhas causadas por atualizações de sistema",
];

export function Home() {
  return (
    <div>
      <Hero />

      {/* A próxima seção sobe por cima do herói */}
      <div className="relative z-10 rounded-t-[32px] border-t border-line bg-bg md:-mt-[14vh] md:rounded-t-[56px]">
        <section aria-labelledby="t-servicos" id="servicos" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-12 md:px-6 md:pt-24">
          <SectionTitle
            id="t-servicos"
            title="Qual reparo foi feito no seu aparelho?"
            text="Escolha o serviço para ver, caso a caso, o que passa e o que não passa na garantia."
          />
          <div className="mt-8 grid auto-rows-fr gap-3 md:mt-12 md:grid-cols-2 md:gap-4 lg:auto-rows-auto lg:grid-cols-12">
            {warrantyCategories.map((category, i) => (
              <ServiceCard key={category.path} category={category} featured={i === 0} />
            ))}
          </div>
        </section>

        <section aria-labelledby="t-como" className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-32">
          <SectionTitle id="t-como" title="Como usar este guia" />
          <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
            {steps.map(({ title, text }, i) => (
              <li key={title} className="flex gap-4 rounded-3xl border border-line p-5 md:flex-col md:p-7">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/8 font-display text-base font-semibold text-ink"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-2">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="t-cobertura" className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-32">
          <SectionTitle
            id="t-cobertura"
            title="Garantia não é seguro"
            text="Ela cobre defeitos de fabricação das peças e falhas na mão de obra. Danos que acontecem depois do reparo ficam de fora."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-panel md:mt-12">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-10">
                <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ok text-on-ok">
                    <LuCheck aria-hidden />
                  </span>
                  Passa na garantia
                </h3>
                <ul className="mt-6 space-y-4">
                  {covered.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-2 last:border-0 last:pb-0">
                      <LuCheck className="mt-1 shrink-0 text-ok" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line p-6 md:border-l md:border-t-0 md:p-10">
                <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-no text-on-no">
                    <LuX aria-hidden />
                  </span>
                  Não passa na garantia
                </h3>
                <ul className="mt-6 space-y-4">
                  {notCovered.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-2 last:border-0 last:pb-0">
                      <LuX className="mt-1 shrink-0 text-no" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t border-line bg-bg-2/60 px-6 py-4 text-sm leading-relaxed text-ink-2 md:px-10">
              A garantia vale por 3 meses. Todo caso passa por uma análise técnica na loja antes de ser confirmado.
            </p>
          </div>
        </section>

        <section aria-label="Leitura complementar" className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-32">
          <BonusContent />
        </section>

        <section aria-labelledby="t-suporte" className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-32">
          <div className="grain relative isolate overflow-hidden rounded-[32px] border border-line px-6 py-12 md:px-16 md:py-24">
            <div className="mesh -z-10 opacity-80" aria-hidden>
              <span className="m1" />
              <span className="m2" />
              <span className="m3" />
            </div>
            <div className="max-w-2xl">
              <h2 id="t-suporte" className="font-display text-[1.75rem] font-semibold leading-tight text-ink md:text-5xl">
                Não passou na garantia? Você não fica sem suporte.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">
                Analisamos cada caso com transparência e buscamos sempre a solução mais econômica para você.
              </p>
              <WhatsAppButton
                className="mt-8 w-full sm:w-auto"
                message="Olá! Meu aparelho apresentou um problema depois do reparo e gostaria de uma avaliação."
              >
                Pedir avaliação no WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Hero() {
  const reduced = usePrefersReducedMotion();
  const { ref } = useScrollProgress(!reduced);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-svh w-full items-center overflow-hidden md:h-svh md:min-h-160"
      style={{ "--p": 0 }}
    >
      {/* Fundo: mesh + trilhas de circuito (parallax mais lento) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--p) * 22%), 0) scale(calc(1 + var(--p) * 0.1))" }}
      >
        <div className="mesh">
          <span className="m1" />
          <span className="m2" />
          <span className="m3" />
          <span className="m4" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,var(--bg)_85%)]" />
        <CircuitBackground />
      </div>

      <div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-12 pt-24 md:-mt-[7vh] lg:grid-cols-[1.1fr_1fr] lg:gap-6 md:px-6 md:pb-0 md:pt-16"
        style={{
          transform: "translate3d(0, calc(var(--p) * -30%), 0)",
          opacity: "calc(1 - var(--p) * 1.8)",
        }}
      >
        <div className="mx-auto max-w-2xl animate-fade-up text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-medium text-ink-2">Guia de garantia da BH Assistência Técnica</p>
          <h1 className="mt-4 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:mt-5 lg:text-[5rem]">
            Garantia sem letra{" "}
            <span className="relative inline-block whitespace-nowrap text-accent">
              <span
                aria-hidden
                className="absolute -inset-x-1.5 bottom-[8%] top-[52%] -z-10 -rotate-1 rounded-md bg-accent/20"
              />
              miúda.
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="underline-draw absolute -bottom-2.5 left-0 h-3 w-full text-accent"
              >
                <path d="M3 10 C 52 3, 124 2, 197 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ink-2 md:text-lg lg:mx-0">
            O que passa e o que não passa na garantia de 3 meses dos nossos
            serviços — explicado caso a caso, com exemplos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#servicos"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-bg transition-all hover:gap-3"
            >
              Ver serviços
              <LuArrowDown className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <WhatsAppButton variant="ghost">Tirar dúvida no WhatsApp</WhatsAppButton>
          </div>
        </div>

        {/* Ilustração + vereditos */}
        {/* Só no desktop: no mobile e no tablet o herói fica só com o texto */}
        <figure className="relative mx-auto hidden w-full max-w-md animate-fade-up [animation-delay:150ms] lg:block">
          <HeroArt className="h-auto w-full" />
          <figcaption className="sr-only">Exemplos de veredito da garantia</figcaption>
          <span className="absolute -left-2 top-[18%] flex items-center gap-2 rounded-full border border-line bg-panel/90 py-1.5 pl-1.5 pr-3 text-[13px] font-semibold text-ink shadow-lg backdrop-blur md:-left-6">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ok text-on-ok">
              <LuCheck aria-hidden />
            </span>
            Defeito de fábrica: passa
          </span>
          <span className="absolute -right-2 bottom-[16%] flex items-center gap-2 rounded-full border border-line bg-panel/90 py-1.5 pl-1.5 pr-3 text-[13px] font-semibold text-ink shadow-lg backdrop-blur md:-right-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-no text-on-no">
              <LuX aria-hidden />
            </span>
            Queda ou líquido: não passa
          </span>
        </figure>
      </div>
    </section>
  );
}
