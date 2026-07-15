import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
export function Header() {
  return (
    <Link
      className="bg-blue-700 p-4 sticky top-0 flex justify-between z-100"
      to={"/"}
    >
      <div className="flex items-center gap-2 text-white text-2xl">
        <img className="w-10 " src={logo} alt="logo" />
      </div>

      <div className="border border-white rounded-md p-2 flex items-center justify-center text-xs text-white">
        <FaWhatsapp /> Entre em contato
      </div>
    </Link>
  );
}
