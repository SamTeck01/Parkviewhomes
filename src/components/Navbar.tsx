import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { brand, navLinks, telHref } from "@/data/brand";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-20 md:h-[88px]">
        <Link to="/" className="flex items-center group" aria-label="Parkview Realty home">
          <Logo className="transition-transform group-hover:scale-[1.02]" />
        </Link>

        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors hover:text-accent ${isActive ? "text-accent" : "text-foreground"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden lg:flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-[3px] text-[13px] font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone size={14} /> Contact us
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 w-full h-[100dvh] bg-background z-[100] flex flex-col animate-in fade-in duration-300">
          <div className="px-6 h-20 flex items-center justify-between border-b border-border/40">
            <Link to="/" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
            <button onClick={() => setOpen(false)} className="p-2 text-foreground" aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 py-10 gap-8 overflow-y-auto">
            <div className="flex flex-col gap-5">
              {[...navLinks, { label: "Contact us", href: "/contact" }].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-bold tracking-tight text-foreground transition-all hover:translate-x-2 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-border/40 pt-8">
              {brand.phones.map((p) => (
                <a key={p} href={telHref(p)} className="bg-foreground text-background w-full py-4 rounded-sm text-lg font-bold flex items-center justify-center gap-2">
                  <Phone size={20} /> {p}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
