import { LuCheck, LuX } from "react-icons/lu";

export function Title({ index, text, covered }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
          Caso {String(index).padStart(2, "0")}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
            covered ? "bg-ok-soft text-ok" : "bg-no-soft text-no"
          }`}
        >
          {covered ? <LuCheck aria-hidden /> : <LuX aria-hidden />}
          {covered ? "Passa" : "Não passa"}
        </span>
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
        {text}
      </h2>
    </div>
  );
}
