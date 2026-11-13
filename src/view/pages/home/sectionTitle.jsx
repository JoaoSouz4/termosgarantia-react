export function SectionTitle({ title, text, id }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-6">
      <h2 id={id} className="font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-ink md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {text && <p className="max-w-md leading-relaxed text-ink-2 md:justify-self-end md:pb-1">{text}</p>}
    </div>
  );
}
