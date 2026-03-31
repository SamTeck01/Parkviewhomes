import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import { getProperty, formatPrice } from "@/data/properties";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BookingConfirmation = () => {
  const [params] = useSearchParams();
  const property = getProperty(params.get("property") || "");
  const checkIn = params.get("checkIn") ? new Date(params.get("checkIn")!) : null;
  const checkOut = params.get("checkOut") ? new Date(params.get("checkOut")!) : null;
  const guests = params.get("guests") || "1";
  const total = params.get("total") || "0";
  const bookingId = `VH-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-32 section-pad pb-16 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-display text-3xl md:text-4xl mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Your reservation has been received. We'll send a confirmation email shortly.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-left mb-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Booking ID</p>
              <p className="font-mono text-sm font-semibold mt-0.5">{bookingId}</p>
            </div>
            <span className="inline-flex px-3 py-1 rounded-sm text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              Confirmed
            </span>
          </div>

          {property && (
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex gap-4">
                <img src={property.images[0]} alt={property.title} className="w-24 h-20 rounded-md object-cover shrink-0" />
                <div>
                  <h3 className="font-heading text-lg">{property.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {property.location}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <CalendarDays size={11} /> Check-in
              </p>
              <p className="text-sm font-medium mt-1">{checkIn ? format(checkIn, "EEE, MMM d, yyyy") : "—"}</p>
              <p className="text-xs text-muted-foreground">From 2:00 PM</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <CalendarDays size={11} /> Check-out
              </p>
              <p className="text-sm font-medium mt-1">{checkOut ? format(checkOut, "EEE, MMM d, yyyy") : "—"}</p>
              <p className="text-xs text-muted-foreground">By 12:00 PM</p>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Users size={11} /> Guests
            </p>
            <p className="text-sm font-medium mt-1">{guests} guest{Number(guests) > 1 ? "s" : ""}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total Paid</p>
            <p className="text-display text-2xl">{formatPrice(Number(total))}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/properties">
            <Button className="gap-2 w-full sm:w-auto bg-primary text-primary-foreground">
              Browse More Shortlets <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
