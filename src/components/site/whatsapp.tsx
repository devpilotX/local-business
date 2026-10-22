import { whatsappHref } from "@/lib/contact";

// WhatsApp logo, from the SVG supplied by the owner (SVG Repo).
// WhatsApp is a trademark of Meta, used here only to link to a chat.
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="512" height="512" rx="77" fill="#25d366" />
      <path
        fill="#25d366"
        stroke="#ffffff"
        strokeWidth="26"
        d="M123 393l14-65a138 138 0 1150 47z"
      />
      <path
        fill="#ffffff"
        d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
      />
    </svg>
  );
}

export function WhatsAppFloat({ number }: { number: string }) {
  const href = whatsappHref(
    number,
    "Hello Techcyme, I would like to discuss a project.",
  );
  if (!href) return null;
  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Techcyme on WhatsApp (opens in a new tab)"
    >
      <WhatsAppIcon size={30} />
      <span className="wa-float-label" aria-hidden="true">
        Chat with us
      </span>
    </a>
  );
}
