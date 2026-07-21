import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
export function Header() {
  const message =
    "Olá. Vim pelo site da garantia. Gostaria de tirar uma dúvida...";

  return (
    <>
      <div className="bg-blue-700 p-4 sticky top-0 flex justify-between items-center md:justify-center gap-12 z-100">
        <Link className=" " to={"/"}>
          <div className="flex items-center gap-2 text-white text-2xl">
            <img className="w-10 " src={logo} alt="logo" />
          </div>
        </Link>

        <a
          href={`https://wa.me/69993116619?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border w-fit border-white rounded-xl p-2 px-4- flex items-center justify-center text-xs text-white gap-2"
        >
          <FaWhatsapp className="text-sm" /> Entre em contato
        </a>
      </div>
    </>
  );
}
