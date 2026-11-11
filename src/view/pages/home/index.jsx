import { LuArrowDown, LuCheck, LuX } from "react-icons/lu";
import { warrantyCategories } from "../../../data/warrantyExclusions";
import { usePrefersReducedMotion, useReveal, useScrollProgress } from "../../../hooks/useMotion";
import { WhatsAppButton } from "../../components/whatsappButton";
import { WorkshopStage } from "./workshop";
import { ServiceCard } from "./card";
import { BonusContent } from "./bonusContent";
import { SectionTitle } from "./sectionTitle";

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
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <Hero />

      {/* A próxima seção sobe por cima do herói: transição em camadas */}
      <div className="relative z-10 -mt-[14vh] rounded-t-[40px] border-t border-line bg-bg md:rounded-t-[56px]">
        <section id="servicos" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-16 md:px-6 md:pt-24">
          <SectionTitle
            index="01"
            eyebrow="Serviços"
            title="Qual reparo foi feito no seu aparelho?"
            text="Escolha o serviço para ver, caso a caso, o que a garantia cobre."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {warrantyCategories.map((category, i) => (
              <ServiceCard
                key={category.path}
                category={category}
                index={i}
                featured={i === 0}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-28 md:px-6 md:pt-36">
          <SectionTitle index="02" eyebrow="Como funciona" title="Três passos, sem letra miúda" />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[27px] hidden h-px bg-linear-to-r from-transparent via-line-strong to-transparent md:block"
            />
            {steps.map(({ title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` }}
                className="relative"
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-panel font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-ink-2">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-28 md:px-6 md:pt-36">
          <SectionTitle
            index="03"
            eyebrow="Cobertura"
            title="Garantia não é seguro"
            text="Ela cobre defeitos de fabricação das peças e falhas na mão de obra. Danos que acontecem depois do reparo ficam de fora."
          />

          <div
            data-reveal
            className="mt-12 overflow-hidden rounded-[28px] border border-line bg-panel"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 md:px-8">
              <span>Laudo de cobertura</span>
              <span>Validade · 3 meses</span>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ok-soft text-ok">
                    <LuCheck aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">Passa na garantia</h3>
                </div>
                <ul className="mt-7 space-y-4">
                  {covered.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-2 last:border-0">
                      <LuCheck className="mt-1 shrink-0 text-ok" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line p-6 md:border-l md:border-t-0 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-no-soft text-no">
                    <LuX aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">Não passa na garantia</h3>
                </div>
                <ul className="mt-7 space-y-4">
                  {notCovered.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-2 last:border-0">
                      <LuX className="mt-1 shrink-0 text-no" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t border-line bg-bg-2/60 px-6 py-4 text-sm text-ink-3 md:px-8">
              <span className="font-mono text-accent">*</span> Todo caso passa por
              uma análise técnica na loja antes de ser confirmado como garantia.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-28 md:px-6 md:pt-36">
          <BonusContent />
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-28 md:px-6 md:pt-36">
          <div
            data-reveal
            className="grain relative isolate overflow-hidden rounded-[32px] border border-line px-6 py-16 md:px-16 md:py-24"
          >
            <div className="mesh -z-10 opacity-80" aria-hidden>
              <span className="m1" />
              <span className="m2" />
              <span className="m3" />
            </div>
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Não passou na garantia?
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
                Você não fica sem suporte.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">
                Analisamos cada caso com transparência e buscamos sempre a
                solução mais econômica para você.
              </p>
              <WhatsAppButton
                className="mt-9"
                message="Olá! Meu aparelho apresentou um problema depois do reparo e gostaria de uma avaliação."
              >
                Quero uma avaliação
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
  const { ref, progress } = useScrollProgress(!reduced);

  return (
    <section
      ref={ref}
      className="grain relative isolate h-svh min-h-[640px] w-full overflow-hidden"
      style={{ "--p": 0 }}
    >
      {/* Camada 1 — fundo (mais lento) */}
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
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_55%,transparent,var(--bg)_85%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,var(--ink)_1px,transparent_1px),linear-gradient(to_bottom,var(--ink)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(60%_60%_at_60%_50%,black,transparent)]" />
      </div>

      {/* Camada 2 — personagem 3D (velocidade intermediária + profundidade na câmera) */}
      <div
        className="absolute inset-x-0 bottom-[10vh] -z-10 h-[56%] will-change-transform md:bottom-[12vh] md:left-[28%] md:right-0 md:top-0 md:h-auto"
        style={{
          transform: "translate3d(0, calc(var(--p) * -6%), 0)",
          opacity: "calc(1 - var(--p) * 0.7)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to top, transparent 0%, black 14%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to top, transparent 0%, black 14%)",
          WebkitMaskComposite: "source-in",
        }}
      >
        <WorkshopStage progress={progress} reducedMotion={reduced} />
      </div>

      {/* Camada 3 — conteúdo (mais rápido, sai primeiro) */}
      <div
        className="relative mx-auto flex h-full max-w-6xl flex-col px-5 pt-28 md:justify-center md:px-6 md:pt-16"
        style={{
          transform: "translate3d(0, calc(var(--p) * -30%), 0)",
          opacity: "calc(1 - var(--p) * 1.8)",
        }}
      >
        <div className="max-w-xl animate-fade-up">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
            BH Assistência Técnica <span className="text-accent">/</span> Porto Velho
          </span>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[5.2rem]">
            Garantia
            <br />
            sem letra
            <br />
            <span className="relative inline-block text-accent">
              miúda.
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full text-accent/60"
                preserveAspectRatio="none"
              >
                <path d="M2 9 C 50 2, 120 2, 198 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-2 md:text-lg">
            O que passa e o que não passa na garantia de 3 meses dos nossos
            serviços — explicado caso a caso, com exemplos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#servicos"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-bg transition-all hover:gap-3"
            >
              Ver serviços
              <LuArrowDown className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <WhatsAppButton variant="ghost">Tirar dúvida</WhatsAppButton>
          </div>
        </div>
      </div>

    </section>
  );
}
