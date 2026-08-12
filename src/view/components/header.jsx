import { GoShieldCheck } from "react-icons/go";
import { Link } from "react-router-dom";
export function Header() {
  return (
    <div className="bg-blue-700 p-4 sticky top-0 flex justify-between items-center md:justify-center gap-12 z-100">
      <Link to={"/"}>
        <div className="text-white border border-white/30 px-4 py-2 bg-linear-to-r from-blue-800 rounded-lg to-blue-600">
          <div className="flex items-center gap-2">
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
