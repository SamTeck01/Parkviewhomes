import { Wifi, Home, MapPin, Zap } from "lucide-react";

const benefits = [
  {
    icon: Wifi,
    title: "High-Speed Connectivity",
    desc: "Every shortlet features a dedicated fiber-optic line guaranteed to power your remote work and streaming.",
  },
  {
    icon: Home,
    title: "Hotel-Grade Linens",
    desc: "Experience 5-star comfort with professional cleaning and premium linens before every stay.",
  },
  {
    icon: MapPin,
    title: "Prime Locations Only",
    desc: "We only list properties in the most secure, accessible, and high-value areas of Lagos.",
  },
  {
    icon: Zap,
    title: "Self Check-In",
    desc: "Seamless, contactless access to your apartment with smart keypad entry and digital guides.",
  },
];

const Benefits = () => {
  return (
    <section className="bg-secondary noise-bg py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">The Vemu Standard</p>
            <h2 className="text-display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
              Designed for the modern traveler
            </h2>
          </div>
          <div className="max-w-xs md:pb-4">
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              We go beyond base accommodation to deliver a premium living experience that converts first-time guests into regulars.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center mb-6">
                <benefit.icon size={20} className="text-primary stroke-[1.5px]" />
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
