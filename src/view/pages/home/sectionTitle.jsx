export function SectionTitle({ index, eyebrow, title, text }) {
  return (
    <div data-reveal className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-end">
      <div>
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
          {index && <span className="text-accent">{index}</span>}
          <span className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {text && <p className="max-w-md leading-relaxed text-ink-2 md:justify-self-end md:pb-1">{text}</p>}
    </div>
  );
}
