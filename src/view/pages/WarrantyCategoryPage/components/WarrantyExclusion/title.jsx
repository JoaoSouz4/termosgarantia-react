export function Title({ index, text, keyword }) {
  return (
    <h1 className="text-xl font-bold text-gray-800 ">
      <div className="flex">
        <div className="border border-blue-600 text-blue-600 mr-4 px-3 rounded-lg text-sm flex items-center justify-center">
          {index}
        </div>
        {text}
      </div>
    </h1>
  );
}
