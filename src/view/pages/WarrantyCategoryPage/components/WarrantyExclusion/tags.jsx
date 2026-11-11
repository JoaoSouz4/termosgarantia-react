export function Tags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <ul aria-label="Também conhecido como" className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-line bg-bg-2 px-2 py-1 font-mono text-[11px] text-ink-2"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
