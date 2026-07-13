export function Tags({ tags = [] }) {
  return (
    <div className="text-xs text-yellow-600 flex flex-wrap gap-2  mt-2">
      {tags.map((tag, i) => {
        return (
          <span
            key={i}
            className="border px-2 py-1 w-fit rounded-lg bg-yellow-200/20"
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
