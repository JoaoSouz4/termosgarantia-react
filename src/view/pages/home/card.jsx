import { Link } from "react-router-dom";

export function ServiceCard({ serviceName, icon: Icon, path, imagePath }) {
  return (
    <Link to={path}>
      <div className="shadow-md p-6 rounded-2xl border-b-transparent">
        <img src={imagePath} className="w-[300px] h-[200px]" />
        <label className="font-bold flex justify-center">{serviceName}</label>
      </div>
    </Link>
  );
}
