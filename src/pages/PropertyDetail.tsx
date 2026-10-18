import { useState, useRef, useEffect, useCallback } from "react";
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
import useEmblaCarousel from "embla-carousel-react";
import Logo from "@/components/Logo";

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

// Reviews Data
const reviewScores = [
  { label: "Cleanliness", score: 4.9 },
  { label: "Accuracy", score: 4.8 },
  { label: "Communication", score: 5.0 },
  { label: "Location", score: 4.9 },
  { label: "Check-in", score: 4.9 },
  { label: "Value", score: 4.7 },
];

const mockReviews = [
  { name: "Sarah", date: "October 2025", text: "Absolutely stunning property. The interiors were immaculate, and the views were even better than the pictures. Would highly recommend this space for anyone looking for a premium stay." },
  { name: "David & Emma", date: "September 2025", text: "Parkview provided an exceptional experience. The check-in was seamless, and the concierge was always available to help us with local recommendations." },
  { name: "Michael", date: "August 2025", text: "Great location, incredibly fast WiFi which was perfect for remote working, and the kitchen was fully stocked with everything we needed." },
  { name: "Jessica", date: "July 2025", text: "We spent a full week here and didn't want to leave. The aesthetic is so beautiful and peaceful. The beds were extremely comfortable as well." }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const property = getProperty(id || "1");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [mainImg, setMainImg] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setMainImg(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomThreshold = document.documentElement.scrollHeight - window.innerHeight - 300;
      setIsScrolledToBottom(window.scrollY > bottomThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const videoUrl = property.videoUrl;

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights > 0 ? nights * property.price : property.price;
  const cleaningFee = nights > 0 ? 15000 : 0;
  const serviceFee = nights > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = nights > 0 ? subtotal + cleaningFee + serviceFee : subtotal;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast({ title: "Select dates", description: "Please pick check-in and check-out dates." });
      if (window.innerWidth < 1024) widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    navigate(`/booking-confirmation?property=${property.id}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&guests=${guests}&total=${total}`);
  };

  const scrollToBookingWidget = () => {
    widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Gallery */}
      <section className="pt-20">
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-[480px] lg:h-[540px] section-pad">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-lg cursor-pointer group">
            <img src={images[0]} alt="Main view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className={`relative overflow-hidden cursor-pointer group ${i === 1 ? "rounded-tr-lg" : ""} ${i === 3 ? "rounded-br-lg" : ""}`}>
              <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              {/* Video Overlay on the last image slot (if video exists) */}
              {i === 3 && videoUrl && (
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white transition-opacity duration-300 hover:bg-black/40">
                   <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-2 bg-white/10 backdrop-blur-sm">
                      <ChevronRight className="fill-white translate-x-0.5" size={24} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest">Watch video tour</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile Embla Gallery */}
        <div className="md:hidden relative w-full aspect-[4/3] overflow-hidden bg-muted group">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
               {/* Insert video as the second slide if available */}
               {videoUrl && (
                 <div className="flex-[0_0_100%] min-w-0 h-full relative">
                    <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Video Tour</div>
                 </div>
               )}
               {images.map((img, i) => (
                 <div key={i} className="flex-[0_0_100%] min-w-0 h-full relative">
                    <img src={img} className="w-full h-full object-cover" alt="Property view" />
                 </div>
               ))}
            </div>
          </div>
           
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <button className="w-8 h-8 rounded-full bg-background/90 shadow-sm flex items-center justify-center p-0">
              <Share2 size={16} className="text-foreground" />
            </button>
            <button className="w-8 h-8 rounded-full bg-background/90 shadow-sm flex items-center justify-center p-0">
              <Heart size={16} className="text-foreground" />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  mainImg === i ? "bg-white w-2 h-2" : "bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => {e.stopPropagation(); emblaApi?.scrollPrev()}} className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <button onClick={(e) => {e.stopPropagation(); emblaApi?.scrollNext()}} className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
              <ChevronRight size={18} />
            </button>
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
                  <Star size={14} className="text-accent fill-accent" />
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

            {/* Original content continues below Reviews/Location moved down */}
          </div>

          {/* Right — Booking Widget */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div ref={widgetRef} className="border border-border rounded-lg p-6 mb-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <p className="text-display text-2xl">{formatPrice(property.price)}<span className="text-sm font-body text-muted-foreground">/night</span></p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-accent fill-accent" />
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
                    <PopoverContent className="w-auto p-0 z-[100]" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={(d) => { setCheckIn(d); if (d && checkOut && d >= checkOut) setCheckOut(addDays(d, 1)); }} disabled={(d) => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 text-left hover:bg-muted/50 transition-colors">
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Check-out</p>
                        <p className="text-sm mt-0.5">{checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[100]" align="end">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(d) => d <= (checkIn || new Date())} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Guests</p>
                    <p className="text-sm mt-0.5">{guests} guest{guests > 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors">−</button>
                    <button onClick={() => setGuests(Math.min(property.guests, guests + 1))} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors">+</button>
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
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white border border-border shrink-0">
                 <Logo markOnly className="p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Property managed by</p>
                <p className="text-sm font-bold flex items-center gap-1.5">Parkview Realty <span className="text-accent">★</span></p>
              </div>
              <Link to="/contact" className="btn-primary text-xs py-2 px-4 rounded-md whitespace-nowrap">Contact</Link>
            </div>
          </div>
        </div>

        {/* Reviews & Location - Moved to Bottom per User Request */}
        <div className="mt-16 pt-12 border-t border-border">
            <div className="mb-12">
               <h2 className="text-display text-2xl md:text-3xl mb-8 flex items-center gap-2">
                 <Star className="text-accent fill-accent" size={28}/>
                 {property.rating} · {property.reviews} reviews
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[15%] gap-y-6 mb-12">
                  {reviewScores.map(score => (
                    <div key={score.label} className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">{score.label}</span>
                      <div className="flex items-center gap-4 w-[60%]">
                        <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-foreground" style={{ width: `${(score.score / 5) * 100}%` }}></div>
                        </div>
                        <span className="font-semibold text-xs min-w-[20px]">{score.score}</span>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                 {mockReviews.map((review, i) => (
                   <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                     <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground">
                         {review.name[0]}
                       </div>
                       <div>
                         <p className="font-bold text-base">{review.name}</p>
                         <p className="text-muted-foreground text-sm">{review.date}</p>
                       </div>
                     </div>
                     <p className="text-foreground/80 text-[15px] leading-relaxed line-clamp-3">{review.text}</p>
                   </div>
                 ))}
               </div>
               <Button variant="outline" className="mt-10 border-foreground rounded-lg px-8 font-bold">Show all {property.reviews} reviews</Button>
            </div>

            <div className="mt-16 py-12 border-t border-border/40">
              <h2 className="text-display text-2xl md:text-3xl mb-2">Where you'll be</h2>
              <p className="text-sm text-muted-foreground mb-6 font-medium">{property.location}</p>
              <div className="rounded-2xl overflow-hidden shadow-inner bg-muted">
                <PropertyMap lat={property.lat} lng={property.lng} title={property.title} height="h-[400px] md:h-[480px]" />
              </div>
            </div>
        </div>
      </div>
      
      {/* Injected Mobile Sticky Booking Bar */}
      {!isScrolledToBottom && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 px-6 z-50 flex items-center justify-between shadow-2xl">
          <div>
            <p className="text-base font-semibold text-foreground">{formatPrice(property.price)} <span className="text-xs font-normal text-muted-foreground">night</span></p>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">{nights > 0 ? "Total " + formatPrice(total) : "Add dates for pricing"}</p>
          </div>
          <button onClick={scrollToBookingWidget} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold text-sm shadow-sm hover:bg-accent transition-colors">
            Reserve
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetail;
