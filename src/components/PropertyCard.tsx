import { Heart, MapPin, Star, Bed, Bath } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  beds: number;
  baths: number;
  delay?: number;
}

const PropertyCard = ({ image, title, location, price, rating, beds, baths, delay = 0 }: PropertyCardProps) => {
  return (
    <Link
      to="/property/1"
      className="property-card group cursor-pointer opacity-0 animate-fade-up block"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
          width={800}
          height={600}
        />
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Save property"
        >
          <Heart size={16} className="text-foreground" />
        </button>
        <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star size={12} className="text-amber fill-amber" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      <div className="pt-3 pb-1">
        <h3 className="font-heading text-base md:text-lg leading-tight mb-1 group-hover:text-amber transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin size={13} />
          <span className="text-xs">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <Bed size={13} /> {beds}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Bath size={13} /> {baths}
            </span>
          </div>
          <p className="text-sm font-semibold">
            ${price.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
