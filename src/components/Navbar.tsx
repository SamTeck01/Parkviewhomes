import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Shortlets", href: "/properties" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(href.replace("/#", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="section-pad flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-display text-xl md:text-2xl font-heading tracking-tight">
          Vemu<span className="text-amber">.</span>Homes
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Sign In
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="section-pad py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-base font-medium text-foreground py-2 border-b border-border text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <button className="btn-outline-dark text-sm py-2.5">Sign In</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
