import { GoShieldCheck } from "react-icons/go";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

export function Header() {
  return (
    <div className="bg-blue-700 p-4 sticky top-0 flex justify-between items-center md:justify-center gap-12 z-100">
      <Link to={"/"} className="flex items-center gap-2">
        <img className="w-12 border-r pr-2 border-white" src={logo} />
        <div className="text-white">
          <div className="flex items-center gap-1">
            <GoShieldCheck />
            <label htmlFor="">
              Termos da
              <strong> garantia</strong>
            </label>
          </div>
        </div>
      </Link>
    </div>
  );
}
