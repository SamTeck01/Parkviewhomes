import { Search, CalendarCheck, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    desc: "Explore our curated collection of premium shortlets across prime locations.",
  },
  {
    icon: CalendarCheck,
    title: "Book Instantly",
    desc: "Select your dates, confirm your stay, and receive instant booking confirmation.",
  },
  {
    icon: Key,
    title: "Check In & Enjoy",
    desc: "Seamless self check-in with 24/7 support throughout your stay.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-pad py-16 md:py-24 bg-secondary noise-bg" id="about">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-2">How It Works</p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl">
            See what we offer<br className="hidden md:block" /> and how it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="text-center md:text-left opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto md:mx-0 mb-5">
                <step.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
