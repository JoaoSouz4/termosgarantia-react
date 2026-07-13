import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.png";
export function Header() {
  return (
    <div className="bg-blue-900 p-4 sticky top-0">
      <div className="flex items-center gap-2 text-white text-2xl">
        <img className="w-10 " src={logo} alt="logo" />
      </div>
    </div>
  );
}
