import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
export function Header() {
  return (
    <Link
      className="bg-blue-700 p-4 sticky top-0 flex justify-between md:justify-center z-100 "
      to={"/"}
    >
      <div className="md:w-250 md:flex md:justify-between md:px-6 flex justify-between w-full">
        <div className="flex items-center gap-2 text-white text-2xl">
          <img className="w-10 " src={logo} alt="logo" />
        </div>

        <div className="border w-fit border-white rounded-xl p-2 px-4- flex items-center justify-center text-xs text-white gap-2">
          <FaWhatsapp className="text-sm" /> Entre em contato
        </div>
      </div>
    </Link>
  );
}
