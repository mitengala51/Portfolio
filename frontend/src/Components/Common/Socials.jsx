import { FaGithub, FaLinkedinIn, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { profile } from "../../data/profile";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  email: Mail,
};

export default function Socials({ showLabels = false, className = "" }) {
  const items = profile.socials.filter((s) => s.url);
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {items.map(({ name, url, icon }) => {
        const Icon = icons[icon];
        const external = !url.startsWith("mailto:");
        return (
          <li key={name}>
            <a
              href={url}
              aria-label={name}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-xl border border-line px-3 text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:scale-95"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {showLabels && <span className="text-sm">{name}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}