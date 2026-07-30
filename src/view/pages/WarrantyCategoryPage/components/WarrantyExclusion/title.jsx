export function Title({ index, text, keyword }) {
  return (
    <h1 className="text-smd font-bold text-gray-800 ">
      <div className="flex flex-wrap">
        <div className="border border-blue-600 text-blue-600 mr-3 px-3 rounded-lg text-sm flex items-center justify-center">
          {index}
        </div>
        {text}
      </div>
    </h1>
  );
}
