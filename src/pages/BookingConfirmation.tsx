import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Star, CreditCard, Landmark, CheckCircle2, ShieldCheck, Mail, MessageSquare } from "lucide-react";
import { getProperty, formatPrice } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const propertyId = searchParams.get("property") || "1";
  const property = getProperty(propertyId);
  const checkIn = searchParams.get("checkIn") ? new Date(searchParams.get("checkIn")!) : null;
  const checkOut = searchParams.get("checkOut") ? new Date(searchParams.get("checkOut")!) : null;
  const guests = searchParams.get("guests") || "1";
  const total = searchParams.get("total") || "0";

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!property || !checkIn || !checkOut) {
     return <div className="p-20 text-center">Invalid booking details.</div>;
  }

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center section-pad text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-8">
           <CheckCircle2 size={48} className="stroke-[1.5px]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">You're going to Lagos!</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-10">
          Your reservation at <span className="font-semibold text-foreground">{property.title}</span> is confirmed. 
          We've sent the details to your email.
        </p>
        
        <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-12 w-full max-w-md text-left">
           <div className="flex gap-4 mb-4">
              <img src={property.images[0]} className="w-20 h-20 object-cover rounded-lg" alt="" />
              <div>
                 <p className="font-bold">{property.title}</p>
                 <p className="text-sm text-muted-foreground">{format(checkIn, "MMM d")} — {format(checkOut, "MMM d, yyyy")}</p>
              </div>
           </div>
           <div className="pt-4 border-t border-border flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Confirmation code</span>
              <span className="font-mono font-bold uppercase tracking-wider">VH-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           <Button onClick={() => navigate("/properties")} className="bg-foreground text-background px-10 h-14 rounded-full font-bold">Explore more stays</Button>
           <Button variant="outline" onClick={() => navigate("/")} className="px-10 h-14 rounded-full font-bold border-foreground">Back to home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Mini Header */}
      <header className="h-20 border-b border-border flex items-center px-6 md:px-16 lg:px-24">
         <Link to={`/property/${property.id}`} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ChevronLeft size={24} />
         </Link>
         <div className="ml-4 font-bold uppercase tracking-widest text-xs">Confirm and pay</div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
          
          {/* Left Column: Checkout */}
          <div className="animate-fade-up">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">Confirm and pay</h1>
            
            <section className="mb-12">
               <h2 className="text-xl font-bold mb-6">Your trip</h2>
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="font-bold text-[15px]">Dates</p>
                    <p className="text-muted-foreground text-[15px]">{format(checkIn, "MMM d")} – {format(checkOut, "MMM d, yyyy")}</p>
                  </div>
                  <button className="text-sm font-bold underline underline-offset-4 decoration-2">Edit</button>
               </div>
               <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-[15px]">Guests</p>
                    <p className="text-muted-foreground text-[15px]">{guests} guest{Number(guests) > 1 ? 's' : ''}</p>
                  </div>
                  <button className="text-sm font-bold underline underline-offset-4 decoration-2">Edit</button>
               </div>
            </section>

            <hr className="border-border mb-12" />

            <section className="mb-12">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Choose how to pay</h2>
                  <div className="flex gap-1">
                     <CreditCard size={18} className="text-muted-foreground" />
                     <Landmark size={18} className="text-muted-foreground" />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <label className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-foreground border-2 bg-muted/10' : 'border-border hover:border-foreground/30'}`}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-[15px]">Credit / Debit Card</p>
                           <p className="text-[12px] text-muted-foreground">Visa, Mastercard, AMEX</p>
                        </div>
                     </div>
                     <input type="radio" name="pay" className="w-5 h-5 accent-foreground" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  </label>

                  <label className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-foreground border-2 bg-muted/10' : 'border-border hover:border-foreground/30'}`}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                           <Landmark size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-[15px]">Bank Transfer</p>
                           <p className="text-[12px] text-muted-foreground">Pay via online banking</p>
                        </div>
                     </div>
                     <input type="radio" name="pay" className="w-5 h-5 accent-foreground" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                  </label>
               </div>
            </section>

            <hr className="border-border mb-12" />

            <section className="mb-12">
               <h2 className="text-xl font-bold mb-6">Required for your trip</h2>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-accent/5 text-accent rounded-full flex items-center justify-center shrink-0">
                     <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] mb-1">Message the host</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Share why you're coming and who you're coming with.</p>
                    <textarea 
                      placeholder="Heirloom stays are curated with care. Share a brief intro..."
                      className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-foreground min-h-[120px] transition-colors"
                    />
                  </div>
               </div>
            </section>

            <hr className="border-border mb-12" />

            <section className="mb-12">
               <h2 className="text-xl font-bold mb-4">Ground rules</h2>
               <p className="text-muted-foreground text-sm leading-relaxed mb-6">We ask every guest to remember a few simple things about what makes a great guest.</p>
               <ul className="space-y-3 text-sm font-medium">
                  <li className="flex items-center gap-3">
                     <CheckCircle2 size={16} className="text-muted-foreground" /> Follow the house rules
                  </li>
                  <li className="flex items-center gap-3">
                     <CheckCircle2 size={16} className="text-muted-foreground" /> Treat the space like your own
                  </li>
               </ul>
            </section>

            <div className="pt-6">
               <p className="text-[11px] text-muted-foreground leading-relaxed mb-8">
                  By selecting the button below, I agree to the <span className="underline font-semibold cursor-pointer">Host's House Rules</span>, <span className="underline font-semibold cursor-pointer">Ground rules for guests</span>, <span className="underline font-semibold cursor-pointer">Rebooking and Refund Policy</span>, and that Vemu Homes can charge my payment method if I'm responsible for damage.
               </p>
               <Button 
                onClick={handlePay}
                disabled={loading}
                className="w-full sm:w-auto px-12 h-16 bg-foreground text-background text-lg font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
               >
                 {loading ? "Processing..." : "Confirm and pay"}
               </Button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:sticky lg:top-12 lg:self-start">
             <div className="border border-border rounded-2xl p-6 md:p-8 bg-white shadow-xl shadow-black/5 animate-in slide-in-from-right-10 duration-700">
                <div className="flex gap-4 pb-6 border-b border-border mb-6">
                   <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={property.images[0]} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{property.area}</p>
                        <h3 className="font-bold text-sm leading-snug">{property.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold">
                         <Star size={10} className="fill-foreground" />
                         <span>{property.rating} <span className="text-muted-foreground font-medium">({property.reviews} reviews)</span></span>
                      </div>
                   </div>
                </div>

                <h3 className="font-bold mb-4">Price details</h3>
                <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-[15px]">
                      <span className="text-muted-foreground">{formatPrice(property.price)} × {Math.max(1, Math.round(Number(total) / property.price))} nights</span>
                      <span>{formatPrice(Number(total) * 0.8)}</span>
                   </div>
                   <div className="flex justify-between text-[15px]">
                      <span className="text-muted-foreground">Cleaning fee</span>
                      <span>₦15,000</span>
                   </div>
                   <div className="flex justify-between text-[15px]">
                      <span className="text-muted-foreground">Vemu service fee</span>
                      <span>{formatPrice(Math.round(Number(total) * 0.08))}</span>
                   </div>
                </div>

                <hr className="border-border mb-6" />

                <div className="flex justify-between items-center mb-8">
                   <span className="text-lg font-bold">Total (NGN)</span>
                   <span className="text-lg font-bold">{formatPrice(Number(total))}</span>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 flex gap-4">
                   <ShieldCheck size={24} className="text-accent shrink-0" />
                   <div>
                      <p className="text-[13px] font-bold">Vemu Assurance</p>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">Your payment is protected. If anything goes wrong, we'll help make it right.</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;
