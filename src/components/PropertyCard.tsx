import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MapPin, Star, Bed, Bath, ChevronLeft, ChevronRight, Wifi, Waves, Wind, Tv } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

interface PropertyCardProps {
  id?: string;
  images: string[];
  videoUrl?: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  beds: number;
  baths: number;
  amenities?: string[];
  delay?: number;
}

const amenityIcons: Record<string, React.ElementType> = {
  "High-speed WiFi": Wifi,
  "Swimming pool": Waves,
  "Air conditioning": Wind,
  "Smart TV": Tv,
};

const PropertyCard = ({ 
  id = "1", 
  images, 
  videoUrl,
  title, 
  location, 
  price, 
  rating, 
  beds, 
  baths, 
  amenities = [],
  delay = 0 
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentImg(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    emblaApi?.scrollNext();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    emblaApi?.scrollPrev();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    emblaApi?.scrollTo(index);
  };

  const goToProperty = () => {
    navigate(`/property/${id}`);
  };

  const visibleAmenities = amenities
    .filter(a => amenityIcons[a])
    .slice(0, 3);

  return (
    <div
      className="property-card group cursor-pointer opacity-0 animate-fade-up flex flex-col"
      style={{ animationDelay: `${delay}s` }}
      onClick={goToProperty}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3 bg-muted">
        {/* Embla Swiping Image Container */}
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((img, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img 
                  src={img} 
                  alt={`${title} - view ${i + 1}`} 
                  className="w-full h-full object-cover" 
                  loading={i === 0 ? "eager" : "lazy"} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Video Hover Overlay (Dribbble Style) */}
        {videoUrl && (
          <div className={`absolute inset-0 z-20 transition-opacity duration-500 overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <video
              ref={videoRef}
              src={videoUrl}
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        )}

        {/* Amenity Reveal Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <div className="flex items-center gap-3">
             {visibleAmenities.map((a) => {
               const Icon = amenityIcons[a];
               return (
                 <div key={a} className="flex items-center gap-1.5 text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">
                   <Icon size={12} className="stroke-[2.5px]" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">{a.split(' ')[0]}</span>
                 </div>
               );
             })}
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full text-white/90 hover:scale-110 active:scale-95 transition-transform z-30"
          aria-label="Save property"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart size={24} className="drop-shadow-md stroke-[1.5px]" />
        </button>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm z-30 transition-opacity group-hover:opacity-0">
          <Star size={12} className="text-accent fill-accent" />
          <span className="text-xs font-bold">{rating}</span>
        </div>

        {/* Carousel Arrows (Hover only on Desktop) */}
        {images.length > 1 && !isHovered && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2">
            <button
              onClick={handlePrev}
              className={`pointer-events-auto w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 active:scale-95 shadow-sm ${currentImg === 0 ? 'pointer-events-none opacity-0' : ''}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className={`pointer-events-auto w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 active:scale-95 shadow-sm ${currentImg === images.length - 1 ? 'pointer-events-none opacity-0' : ''}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && !isHovered && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => handleDotClick(e, i)}
                className={`rounded-full transition-all duration-300 ${
                  currentImg === i ? "bg-white w-2 h-2" : "bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-[15px] leading-tight text-foreground truncate">{location}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star size={13} className="fill-foreground text-foreground" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-[14px] truncate mb-0.5">{title}</p>
        <p className="text-muted-foreground text-[14px] mb-2">{beds} beds · {baths} baths</p>
        
        <p className="text-[15px] font-semibold text-foreground mt-1">
          {price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 })}
          <span className="font-normal text-muted-foreground text-[14px]"> night</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
