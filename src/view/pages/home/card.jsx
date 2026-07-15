import { Link } from "react-router-dom";

export function ServiceCard({ serviceName, icon: Icon, path, imagePath }) {
  return (
    <Link to={path} className="shrink-0 w-2/3  pr-6">
      <div className="shadow-md w-full rounded-xl">
        <img
          src={imagePath}
          className="max-w-full object-contain rounded-xl  rounded-b-none"
        />
        <div className="p-4 bg-white rounded-xl">
          <label className="flex justify-start font-bold text-lg text-gray-700">
            <div className="flex flex-col">
              {serviceName}
              <span className="w-1/2 h-0.5 bg-amber-200" />
            </div>
          </label>
          <p className="text-sm text-gray-500 my-4 mb-6 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            libero quis ut reiciendis rerum, fugiat aliquid nam? Maxime deserunt
            nesciunt, voluptatibus magni aspernatur laboriosam cupiditate,
            corrupti placeat tempore praesentium aliquid!
          </p>
        </div>
      </div>
    </Link>
  );
}
