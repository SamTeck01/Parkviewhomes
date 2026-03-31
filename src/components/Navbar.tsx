import { useState } from "react";
import { Menu, X, ChevronDown, CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import logo from "@/assets/Vemo Homes logo.png";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-20 md:h-[88px]">
        {/* Left: Official Logo Branding */}
        <Link to="/" className="flex items-center group flex-row">
          <img 
            src={logo} 
            alt="Vemu Homes" 
            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <div className="text-[13px] md:text-[14px] font-bold leading-[1.1] tracking-wide uppercase flex flex-col items-start pr-12 text-foreground">
            <span>Vemu</span>
            <span>Homes</span>
          </div>
        </Link>

        {/* Center: Desktop Nav with Chevrons and Badges */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => handleNav("/properties")}
            className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Shortlets <ChevronDown size={14} className="text-muted-foreground mt-[1px]" />
          </button>
          <button
            onClick={() => handleNav("/#offers")}
            className="flex items-center gap-2 text-[14px] font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Offers <span className="bg-foreground text-background text-[9px] font-bold px-[5px] py-[1px] rounded-[2px] uppercase tracking-wider">New</span>
          </button>
          <button
            onClick={() => handleNav("/about")}
            className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Company
          </button>
          <button
            onClick={() => handleNav("/#locations")}
            className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Locations <ChevronDown size={14} className="text-muted-foreground mt-[1px]" />
          </button>
          <button
            onClick={() => handleNav("/blog")}
            className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Blog
          </button>
        </div>

        {/* Right: Bordered CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:flex items-center gap-2 border border-border/60 bg-white px-5 py-2.5 rounded-[3px] text-[13px] font-semibold text-foreground hover:border-border transition-colors shadow-sm"
          >
            <CalendarDays size={14} /> Contact us
          </Link>
          
          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      {open && (
        <div className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-background z-[100] flex flex-col animate-in fade-in duration-300">
          <div className="px-6 h-20 md:h-[88px] flex items-center justify-between border-b border-border/40">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center group flex-row">
              <img src={logo} alt="Vemu Homes" className="h-10 w-auto object-contain" />

              <div className="text-[13px] md:text-[14px] font-bold leading-[1.1] tracking-wide uppercase flex flex-col items-start text-foreground">
                <span>Vemu</span>
                <span>Homes</span>
              </div>
            </Link>
            <button onClick={() => setOpen(false)} className="p-2 text-foreground">
              <X size={28} />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center px-8 py-10 gap-8">
            <div className="flex flex-col gap-6">
               {[
                 { label: "Shortlets", href: "/properties" },
                 { label: "Offers", href: "/#offers" },
                 { label: "Company", href: "/about" },
                 { label: "Locations", href: "/#locations" },
                 { label: "Blog", href: "/blog" }
               ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-4xl font-bold tracking-tight text-foreground text-left transition-all hover:translate-x-2"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="mt-12 flex flex-col gap-4 border-t border-border/40 pt-10">
              <Link to="/contact" className="bg-foreground text-background w-full py-4 rounded-sm text-lg font-bold tracking-tight flex items-center justify-center gap-2">
                <CalendarDays size={20} /> Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
