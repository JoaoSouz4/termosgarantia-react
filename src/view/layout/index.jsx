import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Layout() {
  return (
    <div>
      <Header />
      <div className="mt-6 mx-6">
        <Outlet />
      </div>
    </div>
  );
}
