import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";

const FeaturedProperties = () => {
  return (
    <section id="properties" className="section-pad py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Curated Selection</p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl leading-tight">Featured Stays</h2>
        </div>
        <Link to="/properties" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors">
          View all shortlets →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {properties.map((p, i) => (
          <PropertyCard
            key={p.id}
            id={p.id}
            images={p.images}
            videoUrl={p.videoUrl}
            title={p.title}
            location={p.location}
            price={p.price}
            rating={p.rating}
            beds={p.beds}
            baths={p.baths}
            amenities={p.amenities}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
