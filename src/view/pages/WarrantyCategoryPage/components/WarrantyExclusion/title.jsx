import { LuCheck, LuX } from "react-icons/lu";

/** O veredito vem antes do título: é a resposta que a pessoa procura. */
export function Title({ text, covered }) {
  return (
    <div>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-sm font-semibold ${
          covered ? "bg-ok text-on-ok" : "bg-no text-on-no"
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
          {covered ? <LuCheck aria-hidden /> : <LuX aria-hidden />}
        </span>
        {covered ? "Passa na garantia" : "Não passa na garantia"}
      </span>
      <h2 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight tracking-tight text-ink md:text-3xl">
        {text}
      </h2>
    </div>
  );
}
