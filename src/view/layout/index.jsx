import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Layout() {
  return (
    <div className="">
      <Header />
      <div className="mt-6 h-full">
        <Outlet />
      </div>
    </div>
  );
}
