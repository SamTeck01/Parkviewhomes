import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-pad py-12 md:py-16 border-t border-border bg-white" id="contact">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="text-xl font-extrabold tracking-tighter uppercase flex flex-col leading-none">
            <span>Vemu</span>
            <span>Homes<span className="text-accent">.</span></span>
          </Link>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-[200px]">
            Premium shortlet apartments across Lagos's finest neighborhoods.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Instagram">
              <Instagram size={14} className="text-muted-foreground" />
            </a>
            <a href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Twitter">
              <Twitter size={14} className="text-muted-foreground" />
            </a>
            <a href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Facebook">
              <Facebook size={14} className="text-muted-foreground" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-3">
            {[
              { label: "All Shortlets", to: "/properties" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Locations</h4>
          <ul className="space-y-3">
            {["Victoria Island", "Lekki", "Ikoyi", "Banana Island", "Ikeja"].map((l) => (
              <li key={l}>
                <Link to={`/properties?location=${encodeURIComponent(l)}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-3">
            {[
              { label: "Help Center", to: "/contact" },
              { label: "Cancellation Policy", to: "/contact" },
              { label: "Safety", to: "/about" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-8">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Shield size={12} /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[11px] font-medium text-muted-foreground">© 2026 Vemu Homes Limited. All rights reserved.</p>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
            <a key={l} href="#" className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

