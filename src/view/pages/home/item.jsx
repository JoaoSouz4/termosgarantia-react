import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export function Item({ text, href }) {
  return (
    <li>
      <Link to={href}>
        <div className=" pl-4 text-sm flex items-center justify-between p-2 py-4 text-blue-900">
          {text}
          <IoIosArrowForward className="text-blue-300" />
        </div>

        <div className="h-px bg-blue-200 w-[90%]" />
      </Link>
    </li>
  );
}
