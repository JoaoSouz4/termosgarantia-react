import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="m-4 my-12 border-t border-slate-200 pt-8">
      <div className="text-center  text-slate-400 mb-2 text-sm">
        BH Assistência técnica - PVH (RO)
      </div>
      <div className="text-slate-400 text-sm text-center">
        <div>Avenida calama 5863</div>
        <div>Avenida José Amador dos reis 3110</div>
      </div>
      <div className="text-center mt-4 flex justify-center">
        <div className="flex gap-4 text-slate-500 text-xl ">
          <FaInstagram />
          <FaFacebook />
        </div>
      </div>
    </footer>
  );
}
