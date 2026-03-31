import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart, Share2, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight,
  Star, Wifi, Car, Wind, Tv, UtensilsCrossed, ShieldCheck, Phone
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const images = [property1, property2, property3, property4, property5];

const amenities = [
  { icon: Wifi, label: "High-speed WiFi" },
  { icon: Car, label: "Free parking" },
  { icon: Wind, label: "Air conditioning" },
  { icon: Tv, label: "Smart TV" },
  { icon: UtensilsCrossed, label: "Full kitchen" },
  { icon: ShieldCheck, label: "24/7 security" },
];

const PropertyDetail = () => {
  const [mainImg, setMainImg] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const navigate = useNavigate();

  const nextImg = () => setMainImg((p) => (p + 1) % images.length);
  const prevImg = () => setMainImg((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Gallery - URBN style */}
      <section className="pt-16 md:pt-20">
        {/* Desktop gallery grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-[480px] lg:h-[540px] section-pad">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-lg cursor-pointer group">
            <img src={images[0]} alt="Main view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${i === 1 ? "rounded-tr-lg" : ""} ${i === 3 ? "rounded-br-lg" : ""}`}
            >
              <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              {i === 3 && (
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-background transition-colors"
                >
                  Show All Photos <span className="text-muted-foreground">{images.length}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile gallery carousel */}
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
          <span>Victoria Island, Lagos</span>
        </div>
      </div>

      {/* Main content - two column layout */}
      <div className="section-pad py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          {/* Left column */}
          <div>
            {/* Price & specs */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <h1 className="text-display text-3xl md:text-5xl mb-1">Skyline Loft Suite</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={14} className="text-amber fill-amber" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-muted-foreground">· 28 reviews</span>
                </div>
              </div>
              <div>
                <p className="text-display text-3xl md:text-4xl">
                  $180<span className="text-base font-body text-muted-foreground">/night</span>
                </p>
              </div>
            </div>

            {/* Specs row */}
            <div className="flex flex-wrap gap-6 md:gap-10 mb-8 pb-8 border-b border-border">
              <div className="text-center">
                <p className="text-display text-2xl">85</p>
                <p className="text-xs text-muted-foreground">m²</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">2</p>
                <p className="text-xs text-muted-foreground">bedrooms</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">2</p>
                <p className="text-xs text-muted-foreground">bathrooms</p>
              </div>
              <div className="text-center">
                <p className="text-display text-2xl">6</p>
                <p className="text-xs text-muted-foreground">guests</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Experience luxury living in this stunning loft suite perched high above Victoria Island. 
                Floor-to-ceiling windows flood the space with natural light, offering panoramic views of the Lagos lagoon. 
                The apartment features premium finishes throughout, including marble countertops, hardwood floors, 
                and designer furniture. Perfect for business travelers or couples seeking an elevated short-stay experience.
              </p>
              <button className="text-sm font-medium underline underline-offset-4 mt-4 hover:text-amber transition-colors">
                Read full description
              </button>
            </div>

            {/* Amenities */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-display text-xl md:text-2xl mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 py-2">
                    <a.icon size={20} className="text-muted-foreground shrink-0" />
                    <span className="text-sm">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-display text-xl md:text-2xl mb-6">House rules</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Check-in: 2:00 PM — Check-out: 12:00 PM</p>
                <p>No smoking</p>
                <p>No parties or events</p>
                <p>Pets allowed on request</p>
              </div>
            </div>

            {/* Location map */}
            <div>
              <h2 className="text-display text-xl md:text-2xl mb-2">Location</h2>
              <p className="text-sm text-muted-foreground mb-4">Victoria Island, Lagos, Nigeria</p>
              <PropertyMap lat={6.4281} lng={3.4219} title="Skyline Loft Suite" height="h-[320px]" />
            </div>
          </div>

          {/* Right column — sticky booking card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Booking card */}
            <div className="border border-border rounded-lg p-6 mb-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <p className="text-display text-2xl">$180<span className="text-sm font-body text-muted-foreground">/night</span></p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber fill-amber" />
                  <span className="text-xs font-medium">4.9</span>
                </div>
              </div>

              <div className="border border-border rounded-md overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-border">
                  <div className="p-3 border-r border-border">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Check-in</p>
                    <p className="text-sm mt-0.5">Add date</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Check-out</p>
                    <p className="text-sm mt-0.5">Add date</p>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Guests</p>
                  <p className="text-sm mt-0.5">1 guest</p>
                </div>
              </div>

              <button className="btn-primary w-full text-sm py-3 rounded-md mb-3">
                Reserve
              </button>
              <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>

              <div className="mt-6 pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground underline">$180 × 5 nights</span>
                  <span>$900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground underline">Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground underline">Service fee</span>
                  <span>$75</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>$1,025</span>
                </div>
              </div>
            </div>

            {/* Agent card */}
            <div className="border border-border rounded-lg p-5 flex items-center gap-4 bg-card">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg shrink-0">
                V
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Property managed by</p>
                <p className="text-sm font-semibold">Vemu Homes <span className="text-amber">★</span></p>
              </div>
              <button className="btn-primary text-xs py-2 px-4 rounded-md whitespace-nowrap">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
