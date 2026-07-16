import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Layout() {
  return (
    <div className="md:w-dvw md:h-dvh">
      <Header />
      <div className="md:flex md:justify-center">
        <div className="mt-6 h-full md:max-w-250">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
