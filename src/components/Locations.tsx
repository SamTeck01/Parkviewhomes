import property1 from "@/assets/property-1.jpg";
import property3 from "@/assets/property-3.jpg";
import property5 from "@/assets/property-5.jpg";

const locations = [
  { name: "Victoria Island", count: 24, image: property1 },
  { name: "Lekki", count: 18, image: property3 },
  { name: "Ikoyi", count: 12, image: property5 },
];

const Locations = () => {
  return (
    <section id="locations" className="section-pad py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-2">Top Locations</p>
      <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-10 md:mb-14">
        Popular destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {locations.map((loc, i) => (
          <div
            key={loc.name}
            className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/2] opacity-0 animate-fade-up"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          >
            <img
              src={loc.image}
              alt={loc.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <h3 className="font-heading text-xl md:text-2xl text-primary-foreground">{loc.name}</h3>
              <p className="text-xs text-primary-foreground/70 mt-1">{loc.count} properties</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Locations;
