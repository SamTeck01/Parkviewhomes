import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, ShieldCheck, Award } from "lucide-react";
import heroImg from "@/assets/property-3.jpg";

const values = [
  { icon: Building2, title: "Curated Properties", desc: "Every shortlet is personally vetted for quality, comfort, and location before listing." },
  { icon: ShieldCheck, title: "Verified & Secure", desc: "24/7 security, verified hosts, and transparent pricing with no hidden fees." },
  { icon: Users, title: "Guest-First", desc: "Dedicated support team available around the clock to make your stay seamless." },
  { icon: Award, title: "Premium Standards", desc: "Hotel-grade amenities in every property — from linens to Wi-Fi to fully stocked kitchens." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end">
        <img src={heroImg} alt="About Vemu Homes" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative z-10 section-pad pb-10 md:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Our Story
          </p>
          <h1 className="text-display text-4xl md:text-6xl text-primary-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            About Vemu Homes
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad py-16 md:py-24 max-w-3xl">
        <h2 className="text-display text-2xl md:text-3xl mb-6">
          Redefining short stays in Lagos
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Vemu Homes was born from a simple belief: everyone deserves a beautiful, comfortable place to stay — 
          whether you're in Lagos for a week-long business trip, a family reunion, or a weekend escape. 
          We bridge the gap between impersonal hotels and unreliable short-term rentals.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our team hand-picks every property, ensuring they meet our exacting standards for cleanliness, 
          design, location, and amenities. From cozy studios in Ikeja to sprawling villas on Banana Island, 
          we offer a range of spaces tailored to every traveler's needs and budget.
        </p>
      </section>

      {/* Values */}
      <section className="section-pad py-16 md:py-24 bg-secondary noise-bg">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Why Vemu</p>
          <h2 className="text-display text-2xl md:text-4xl mb-12">What sets us apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {values.map((v, i) => (
              <div key={v.title} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          {[
            { num: "50+", label: "Premium Shortlets" },
            { num: "2,000+", label: "Happy Guests" },
            { num: "4.8", label: "Average Rating" },
            { num: "6", label: "Lagos Locations" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-display text-3xl md:text-4xl text-accent font-extrabold">{s.num}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
