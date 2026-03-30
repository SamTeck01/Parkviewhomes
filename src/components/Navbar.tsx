import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Shortlets", href: "#properties" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="section-pad flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-display text-xl md:text-2xl font-heading tracking-tight">
          Vemu<span className="text-amber">.</span>Homes
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Sign In
          </button>
          <button className="btn-primary text-sm py-2 px-5">
            List Property
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="section-pad py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground py-2 border-b border-border"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <button className="btn-outline-dark text-sm py-2.5">Sign In</button>
              <button className="btn-primary text-sm py-2.5">List Property</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
