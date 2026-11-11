import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FloatingWhatsApp } from "../components/whatsappButton";
import { warrantyCategories } from "../../data/warrantyExclusions";

function ScrollToTop({ pathname }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  // Nas páginas de serviço o toggle de garantia ocupa a base da tela no mobile
  const hasToggle = warrantyCategories.some((c) => c.path === pathname);

  return (
    <div className="flex min-h-dvh flex-col font-inter">
      <ScrollToTop pathname={pathname} />
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-accent px-4 py-2 font-semibold text-[#0b1224] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp raised={hasToggle} />
    </div>
  );
}
