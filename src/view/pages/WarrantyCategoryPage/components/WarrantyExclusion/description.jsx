export function Description({ text }) {
  return (
    <div className="h-full overflow-auto rounded-2xl border border-gray-400 p-6 shadow-lg">
      <p className="text-sm leading-6 text-gray-500">{text}</p>
    </div>
  );
}
