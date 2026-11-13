export function Description({ text = "" }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-prose space-y-3">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={`leading-relaxed ${i === 0 ? "text-ink" : "text-ink-2"}`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
