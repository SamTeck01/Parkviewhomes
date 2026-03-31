import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Olanrewaju Adeyemi",
    role: "Business Traveler",
    text: "The Lekki Pearl Suite was exactly what I needed for my two-week business trip. Immaculate, fast Wi-Fi, and the 24/7 concierge was incredibly helpful. Vemu Homes has set a new standard for shortlets in Lagos.",
    rating: 5,
  },
  {
    name: "Dr. Amara Okoro",
    role: "University Professor",
    text: "I booked a villa for our family reunion and was blown away by the attention to detail. The space felt curated and luxurious yet incredibly comfortable. The self check-in was seamless and we felt very secure.",
    rating: 5,
  },
  {
    name: "Tunde Bakare",
    role: "Tech Entrepreneur",
    text: "Vemu Homes is my go-to for short-term stays. The properties are always in prime locations and the interior design is world-class. It’s consistent, professional, and honestly better than most 5-star hotels.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Guest Experiences</p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mb-6">
            Hear from our community
          </h2>
          <div className="w-16 h-1 bg-foreground mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="group p-8 border border-border/40 hover:border-foreground/20 transition-all duration-300 relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <Quote size={40} className="text-accent/10 absolute top-6 right-6 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="text-accent fill-accent" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-border/40 pt-6">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-foreground text-sm uppercase">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-[14px] uppercase tracking-wider">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
