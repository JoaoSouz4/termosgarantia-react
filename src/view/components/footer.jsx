import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { warrantyCategories } from "../../data/warrantyExclusions";
import { WHATSAPP_DISPLAY, whatsappLink } from "../../utils/whatsapp";

const addresses = ["Av. Calama, 5863", "Av. José Amador dos Reis, 3110"];

export function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-line bg-bg-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <img src={logo} alt="BH Assistência Técnica" className="w-14 invert dark:invert-0" />
          <p className="mt-6 max-w-xs font-display text-xl leading-snug text-ink">
            Transparência em cada reparo.
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-3">
            Garantia de 3 meses em todos os serviços, explicada sem letra
            miúda.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-ink">Serviços</h2>
          <ul className="space-y-1 text-sm">
            {warrantyCategories.map((category) => (
              <li key={category.path}>
                <Link to={category.path} className="inline-flex min-h-11 items-center text-ink-2 transition-colors hover:text-ink md:min-h-9">
                  {category.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/bonus1" className="inline-flex min-h-11 items-center text-ink-2 transition-colors hover:text-ink md:min-h-9">
                Qualidades de tela
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-ink">Contato</h2>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="-my-2 mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-wa-ink transition-opacity hover:opacity-80"
          >
            <FaWhatsapp aria-hidden /> {WHATSAPP_DISPLAY}
          </a>
          <ul className="space-y-3 text-sm text-ink-2">
            {addresses.map((address) => (
              <li key={address}>{address}</li>
            ))}
            <li className="text-ink-3">Porto Velho, Rondônia</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line px-6 py-6 text-center text-xs text-ink-3">
        Desenvolvido por BH Peças, Porto Velho (RO)
      </div>
    </footer>
  );
}
