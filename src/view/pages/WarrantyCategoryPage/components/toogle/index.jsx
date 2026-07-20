import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export function Toogle({ onToogle }) {
  const [active, setActive] = useState(false);

  function handleToogle() {
    setActive((prev) => !prev);
    onToogle();
  }

  return (
    <div className="flex justify-between items-center gap-2 shadow-md shadow-blue-950/5  rounded-2xl bg-white px-5 py-4">
      <h1 className="font-bold text-md ml-2">
        {active ? (
          <div>Passa na garantia</div>
        ) : (
          <div>Não passa na garantia </div>
        )}
      </h1>
      <div
        className={`rounded-full w-15 relative shadow-inner ${active ? `bg-green-100 shadow-green-300` : ` shadow-red-300 bg-red-100`}`}
      >
        <div
          className={`bg-white border flex justify-center items-center w-7 h-7 rounded-full transition-all ease-in-out duration-700 ${active ? `translate-x-8 border-green-500 text-green-500` : "translate-x-0 border-red-300 text-red-500"}`}
          onClick={handleToogle}
        >
          {active ? <FaCheck /> : <IoClose />}
        </div>
      </div>
    </div>
  );
}
