import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyMap from "@/components/PropertyMap";
import { getProperty, formatPrice } from "@/data/properties";
import {
  Heart, Share2, MapPin, Bed, Bath, ChevronLeft, ChevronRight,
  Star, Wifi, Car, Wind, Tv, UtensilsCrossed, ShieldCheck, Users,
  Maximize, Dumbbell, Waves, Briefcase, Flame, PlaneTakeoff, WashingMachine, Theater
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays, addDays } from "date-fns";

const amenityIcons: Record<string, React.ElementType> = {
  "High-speed WiFi": Wifi,
  "Free parking": Car,
  "Air conditioning": Wind,
  "Smart TV": Tv,
  "Full kitchen": UtensilsCrossed,
  "24/7 security": ShieldCheck,
  "Swimming pool": Waves,
  "Gym access": Dumbbell,
  "Dedicated workspace": Briefcase,
  "Balcony": Maximize,
  "Laundry": WashingMachine,
  "Garden": Flame,
  "BBQ area": Flame,
  "Beach access": Waves,
  "Rain shower": Waves,
  "Concierge": Users,
  "Rooftop terrace": Maximize,
  "Airport proximity": PlaneTakeoff,
  "Kitchenette": UtensilsCrossed,
  "Cinema room": Theater,
  "Professional kitchen": UtensilsCrossed,
  "Private chef available": UtensilsCrossed,
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const property = getProperty(id || "1");

  const [mainImg, setMainImg] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center section-pad pt-24">
          <div>
            <h1 className="text-display text-3xl mb-3">Property not found</h1>
            <p className="text-muted-foreground mb-6">This listing doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/properties")}>Browse all shortlets</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = property.images;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * property.price;
  const cleaningFee = nights > 0 ? 15000 : 0;
  const serviceFee = nights > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + cleaningFee + serviceFee;

  const nextImg = () => setMainImg((p) => (p + 1) % images.length);
  const prevImg = () => setMainImg((p) => (p - 1 + images.length) % images.length);

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast({ title: "Select dates", description: "Please pick check-in and check-out dates." });
      return;
    }
    navigate(`/booking-confirmation?property=${property.id}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&guests=${guests}&total=${total}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Gallery */}
      <section className="pt-16 md:pt-20">
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-[480px] lg:h-[540px] section-pad">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-lg cursor-pointer group">
            <img src={images[0]} alt="Main view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className={`relative overflow-hidden cursor-pointer group ${i === 1 ? "rounded-tr-lg" : ""} ${i === 3 ? "rounded-br-lg" : ""}`}>
              <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="md:hidden relative">
          <img src={images[mainImg]} alt="Property" className="w-full aspect-[4/3] object-cover" />
          <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
            {mainImg + 1}/{images.length}
          </div>
        </div>
      </section>

      {/* Actions bar */}
      <div className="section-pad py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Heart size={16} /> Save
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Share2 size={16} /> Share
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="section-pad py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          {/* Left */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <h1 className="text-display text-3xl md:text-5xl mb-1">{property.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={14} className="text-amber fill-amber" />
                  <span className="text-sm font-medium">{property.rating}</span>
                  <span className="text-sm text-muted-foreground">· {property.reviews} reviews</span>
                </div>
              </div>
              <p className="text-display text-3xl md:text-4xl">
                {formatPrice(property.price)}<span className="text-base font-body text-muted-foreground">/night</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10 mb-8 pb-8 border-b border-border">
              <div className="text-center">
                <p className="text-display text-2xl">{property.sqm}</p>
                <p className="text-xs text-muted-foreground">m²</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">{property.beds}</p>
                <p className="text-xs text-muted-foreground">bedrooms</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">{property.baths}</p>
                <p className="text-xs text-muted-foreground">bathrooms</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">{property.guests}</p>
                <p className="text-xs text-muted-foreground">guests</p>
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-sm leading-relaxed text-muted-foreground">{property.description}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-display text-xl md:text-2xl mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((a) => {
                  const Icon = amenityIcons[a] || ShieldCheck;
                  return (
                    <div key={a} className="flex items-center gap-3 py-2">
                      <Icon size={20} className="text-muted-foreground shrink-0" />
                      <span className="text-sm">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-display text-xl md:text-2xl mb-6">House rules</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                {property.houseRules.map((r, i) => (
                  <p key={i}>{r}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-display text-xl md:text-2xl mb-2">Location</h2>
              <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
              <PropertyMap lat={property.lat} lng={property.lng} title={property.title} height="h-[320px]" />
            </div>
          </div>

          {/* Right — Booking */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border rounded-lg p-6 mb-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <p className="text-display text-2xl">{formatPrice(property.price)}<span className="text-sm font-body text-muted-foreground">/night</span></p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber fill-amber" />
                  <span className="text-xs font-medium">{property.rating}</span>
                </div>
              </div>

              <div className="border border-border rounded-md overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-border">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 border-r border-border text-left hover:bg-muted/50 transition-colors">
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Check-in</p>
                        <p className="text-sm mt-0.5">{checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(d) => { setCheckIn(d); if (d && checkOut && d >= checkOut) setCheckOut(addDays(d, 1)); }}
                        disabled={(d) => d < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 text-left hover:bg-muted/50 transition-colors">
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Check-out</p>
                        <p className="text-sm mt-0.5">{checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(d) => d <= (checkIn || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Guests</p>
                    <p className="text-sm mt-0.5">{guests} guest{guests > 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                    >−</button>
                    <button
                      onClick={() => setGuests(Math.min(property.guests, guests + 1))}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                    >+</button>
                  </div>
                </div>
              </div>

              <button onClick={handleReserve} className="btn-primary w-full text-sm py-3 rounded-md mb-3">
                {nights > 0 ? "Reserve" : "Check availability"}
              </button>
              {nights > 0 && <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>}

              {nights > 0 && (
                <div className="mt-6 pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{formatPrice(property.price)} × {nights} nights</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning fee</span>
                    <span>{formatPrice(cleaningFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-border rounded-lg p-5 flex items-center gap-4 bg-card">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg shrink-0">V</div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Property managed by</p>
                <p className="text-sm font-semibold">Vemu Homes <span className="text-amber">★</span></p>
              </div>
              <Link to="/contact" className="btn-primary text-xs py-2 px-4 rounded-md whitespace-nowrap">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
