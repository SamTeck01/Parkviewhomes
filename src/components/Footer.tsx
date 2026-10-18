import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, Shield, Phone, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { brand, navLinks, telHref } from "@/data/brand";

const socials = [
  { icon: Facebook, label: "Facebook", href: brand.socials.facebook },
  { icon: Instagram, label: "Instagram", href: brand.socials.instagram },
  { icon: Linkedin, label: "LinkedIn", href: brand.socials.linkedin },
  { icon: Youtube, label: "YouTube", href: brand.socials.youtube },
];

const Footer = () => {
  return (
    <footer className="section-pad py-12 md:py-16 border-t border-border bg-white" id="contact">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-flex mb-4">
            <Logo />
          </Link>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-[240px]">
            Homes to buy, lease and stay in across Lagos.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="p-2 rounded-full border border-border hover:bg-accent hover:border-accent group transition-colors" aria-label={s.label}>
                <s.icon size={14} className="text-muted-foreground group-hover:text-accent-foreground" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Enquiries</h4>
          <ul className="space-y-3">
            {brand.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Phone size={12} /> {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${brand.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                <Mail size={12} /> {brand.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-3">
            {[
              { label: "Contact us", to: "/contact" },
              { label: "Book an inspection", to: "/book-inspection" },
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
        <p className="text-[11px] font-medium text-muted-foreground">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service"].map((l) => (
            <a key={l} href="#" className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
