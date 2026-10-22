// WhatsApp click-to-chat link. Ten-digit Indian numbers get the +91 prefix.
export function whatsappHref(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const full = digits.length === 10 ? `91${digits}` : digits;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${full}${query}`;
}

export const replyTime = "Most enquiries get a reply within 1 business day.";
