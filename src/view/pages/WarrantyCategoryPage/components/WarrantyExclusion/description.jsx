export function Description({ text = "" }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-6 space-y-4 border-t border-line pt-6">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className={`leading-relaxed ${i === 0 ? "text-[15px] text-ink md:text-base" : "text-[15px] text-ink-2"}`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
