import PropertyCard from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const properties = [
  { image: property1, title: "Skyline Loft Suite", location: "Victoria Island, Lagos", price: 180, rating: 4.9, beds: 2, baths: 2 },
  { image: property2, title: "The Amber Retreat", location: "Ikoyi, Lagos", price: 250, rating: 4.8, beds: 3, baths: 2 },
  { image: property3, title: "Rooftop Oasis", location: "Lekki Phase 1, Lagos", price: 320, rating: 5.0, beds: 2, baths: 2 },
  { image: property4, title: "Chef's Quarters", location: "Banana Island, Lagos", price: 450, rating: 4.9, beds: 4, baths: 3 },
  { image: property5, title: "Palm Villa", location: "Ajah, Lagos", price: 200, rating: 4.7, beds: 3, baths: 2 },
  { image: property6, title: "Woodland Studio", location: "Ikeja GRA, Lagos", price: 120, rating: 4.6, beds: 1, baths: 1 },
];

const FeaturedProperties = () => {
  return (
    <section id="properties" className="section-pad py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-2">Curated Selection</p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl leading-tight">
            New properties
          </h2>
        </div>
        <a href="#" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-amber transition-colors">
          View all shortlets →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {properties.map((p, i) => (
          <PropertyCard key={p.title} {...p} delay={0.1 + i * 0.1} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
