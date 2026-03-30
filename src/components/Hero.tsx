import heroImg from "@/assets/hero-property.jpg";
import { Search, MapPin, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury shortlet apartment"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-pad pb-12 md:pb-20 w-full">
        <div className="max-w-2xl mb-8 md:mb-12">
          <p
            className="text-primary-foreground/70 text-sm md:text-base font-medium mb-3 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Premium Short Stays
          </p>
          <h1
            className="text-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            Find a place you'll love to stay
          </h1>
          <p
            className="text-primary-foreground/70 text-base md:text-lg max-w-lg opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Handpicked luxury shortlets for business trips, vacations, and everything in between.
          </p>
        </div>

        {/* Search bar */}
        <div
          className="bg-background rounded-lg p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-0 md:items-center max-w-3xl opacity-0 animate-fade-up shadow-2xl"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex items-center gap-3 flex-1 px-3 py-2 md:border-r border-border">
            <MapPin size={18} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3 flex-1 px-3 py-2 md:border-r border-border">
            <Calendar size={18} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Check in — Check out"
              className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3 flex-1 px-3 py-2">
            <input
              type="text"
              placeholder="Guests"
              className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          <button className="btn-primary flex items-center justify-center gap-2 text-sm py-3 md:py-2.5 md:ml-2 rounded-md">
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
