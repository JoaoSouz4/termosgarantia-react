import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { WhatsAppButton } from "../../components/whatsappButton";

const observations = [
  "Diferença no acabamento da peça",
  "Cores menos vivas e saturadas",
  "A biometria na tela não funciona",
  "Maior consumo de bateria",
  "Bordas da tela mais grossas",
  "Aro da tela um pouco mais alto",
];

export function Bonus1() {
  return (
    <div className="pb-8">
      <section className="grain relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="mesh -z-10 opacity-60">
          <span className="m1" />
          <span className="m3" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-bg" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
          <div className="mx-auto flex max-w-3xl animate-fade-up flex-col items-center text-center">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <LuArrowLeft aria-hidden /> Voltar ao início
            </Link>
            <p className="mt-6 text-sm font-medium text-ink-2">Antes de trocar a tela</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Por que existe mais de um tipo de tela?
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Para oferecer uma <strong className="text-ink">opção mais econômica</strong>,
              os fabricantes de peças produzem versões simplificadas das telas
              originais. Antes de escolher, vale conhecer os prós e os contras.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-14 md:px-6 md:pt-20">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-panel p-7 md:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">Paralela / Incell</h2>
            <p className="mt-5 leading-relaxed text-ink">
              "Paralela" é qualquer tela com tecnologia diferente da original do
              aparelho. Se a tela original é OLED, toda tela que não for OLED é
              considerada paralela para aquele modelo.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Por isso, ela não tem exatamente os mesmos recursos e a mesma
              qualidade da original. Na maioria dos casos, as telas paralelas
              são do tipo LCD (como a Incell).
            </p>
          </article>

          <article
            className="rounded-[28px] border border-line bg-panel p-7 md:p-10"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">O que muda na prática</h2>
            <ul className="mt-4">
              {observations.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-b border-line py-3 text-ink-2 last:border-0"
                >
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-ink-3" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside
          className="mt-4 rounded-[28px] border border-accent/30 bg-accent/5 p-7 md:p-10"
        >
          <h2 className="font-display text-lg font-semibold text-ink">Atenção ao modelo do seu aparelho</h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed text-ink">
            Em alguns aparelhos, como o Galaxy A07 e o iPhone 11, a tela
            original já é LCD. Geralmente são modelos de entrada, mais baratos.
            Já os aparelhos com tela OLED, ou superior, contam com uma
            tecnologia de tela mais avançada.
          </p>
        </aside>

        <div
          className="mt-12 md:mt-16 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-line bg-panel p-7 md:flex-row md:items-center md:p-10"
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-ink md:text-3xl">Em dúvida sobre qual tela escolher?</h2>
            <p className="mt-2 text-ink-2">Informe o modelo do aparelho e mostramos as opções disponíveis.</p>
          </div>
          <WhatsAppButton
            className="w-full shrink-0 md:w-auto"
            message="Olá! Gostaria de saber quais opções de tela vocês têm para o meu aparelho."
          >
            Ver opções de tela no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
