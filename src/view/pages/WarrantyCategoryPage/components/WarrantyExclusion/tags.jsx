/** Outras formas de descrever o problema: ajuda a pessoa a se reconhecer no caso. */
export function Tags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-ink-3">Também conhecido como</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full border border-line bg-bg-2 px-3 py-1 text-[13px] text-ink-2">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
