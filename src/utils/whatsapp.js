// Número da loja no formato internacional (55 + DDD + número)
export const WHATSAPP_NUMBER = "5569993116619";
export const WHATSAPP_DISPLAY = "(69) 99311-6619";

export const DEFAULT_MESSAGE =
  "Olá! Vim pelo site dos Termos da Garantia e gostaria de tirar uma dúvida.";

export function whatsappLink(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
