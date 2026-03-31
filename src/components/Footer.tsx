import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-pad py-12 md:py-16 border-t border-border" id="contact">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="text-display text-xl font-heading">
            Vemu<span className="text-amber">.</span>Homes
          </Link>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xs">
            Premium shortlet apartments across Lagos's finest neighborhoods.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Explore</h4>
          <ul className="space-y-2.5">
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
          <h4 className="text-sm font-semibold mb-4">Locations</h4>
          <ul className="space-y-2.5">
            {["Victoria Island", "Lekki", "Ikoyi", "Banana Island", "Ikeja"].map((l) => (
              <li key={l}>
                <Link to={`/properties?location=${encodeURIComponent(l)}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Support</h4>
          <ul className="space-y-2.5">
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
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Vemu Homes. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Sitemap"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
