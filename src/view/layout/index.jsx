import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function Layout() {
  return (
    <div className="md:w-dvw md:h-dvh font-inter">
      <Header />
      <div className="md:flex md:justify-center">
        <div className="mt-6 h-full md:max-w-250">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
