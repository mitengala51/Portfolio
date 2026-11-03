import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { profile } from "../../data/profile";

const links = [
  { to: "/#about", label: "About" },
  { to: "/#projects", label: "Projects" },
  { to: "/#experience", label: "Experience" },
  { to: "/#skills", label: "Skills" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line bg-ink" : "bg-transparent"}`}>
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)} className="font-display text-lg font-bold">
            {profile.name}<span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-sm text-muted transition-colors hover:text-text">{l.label}</Link></li>
            ))}
            {/* <li><Link to="/#contact" className="btn btn-primary !min-h-10 !py-2 text-sm">Get a quote</Link></li> */}
          </ul>

          {/* <button
            className="-mr-2 grid h-12 w-12 place-items-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button> */}
        </nav>
      </header>

      {/* <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-24 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-1 flex-col gap-2">
              {links.map((l, i) => (
                <m.li key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.06 }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-3xl font-bold">
                    {l.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <Link to="/#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Get a free quote <ArrowRight className="arrow h-5 w-5" />
            </Link>
          </m.div>
        )}
      </AnimatePresence> */}
    </>
  );
}