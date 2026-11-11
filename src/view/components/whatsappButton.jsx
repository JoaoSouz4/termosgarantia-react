import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../utils/whatsapp";

const variants = {
  solid:
    "bg-whatsapp text-[#04210f] shadow-[0_8px_30px_-8px_rgb(37_211_102/0.6)] hover:bg-[#3be37a]",
  ghost:
    "border border-line-strong text-ink hover:bg-ink/5 hover:border-ink/30",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
};

export function WhatsAppButton({
  message,
  children = "Falar no WhatsApp",
  variant = "solid",
  size = "md",
  className = "",
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <FaWhatsapp
        className="shrink-0 text-lg transition-transform duration-300 group-hover:-rotate-12"
        aria-hidden
      />
      {children}
    </a>
  );
}

export function FloatingWhatsApp({ message, raised = false }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a assistência no WhatsApp"
      className={`group fixed right-4 z-50 items-center rounded-full bg-whatsapp p-3.5 text-[#04210f] shadow-[0_10px_40px_-8px_rgb(37_211_102/0.7)] transition-all duration-300 hover:scale-105 md:right-6 ${
        // com o toggle de garantia, no mobile o botão vai para a barra do toggle
        raised ? "bottom-6 hidden md:flex" : "bottom-4 flex md:bottom-6"
      }`}
    >
      <FaWhatsapp className="text-[28px]" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:ml-2 group-hover:max-w-40 group-focus-visible:ml-2 group-focus-visible:max-w-40">
        Tire sua dúvida
      </span>
    </a>
  );
}
