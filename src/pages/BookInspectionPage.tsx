import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Phone } from "lucide-react";
import { products } from "@/data/products";
import { properties } from "@/data/properties";
import { brand, telHref } from "@/data/brand";

const BookInspectionPage = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  const options = [
    ...products.map((p) => ({ value: p.id, label: `${p.name}, ${p.location}` })),
    ...properties.map((p) => ({ value: `shortlet-${p.id}`, label: `${p.title} (shortlet), ${p.location}` })),
  ];
  const preset = params.get("property") ?? options[0]?.value ?? "";
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Inspection requested", description: "We'll call you to confirm the date and time." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 md:pt-36 section-pad pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Book an inspection</p>
            <h1 className="text-display text-3xl md:text-5xl mb-3">See the property in person</h1>
            <p className="text-muted-foreground text-sm max-w-lg">
              Choose a property and a date that suits you. Our team will call to confirm and meet you on site.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {submitted ? (
              <div className="bg-card border border-border rounded-lg p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CalendarCheck className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-display text-2xl mb-2">Request received</h2>
                <p className="text-muted-foreground text-sm mb-6">We'll call you shortly to confirm your inspection.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Book another inspection</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="property">Property</Label>
                  <select
                    id="property"
                    defaultValue={preset}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="080..." required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred date</Label>
                    <Input id="date" type="date" min={today} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred time</Label>
                    <select id="time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Morning (9AM to 12PM)</option>
                      <option>Afternoon (12PM to 3PM)</option>
                      <option>Evening (3PM to 6PM)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Anything we should know?</Label>
                  <Textarea id="notes" rows={4} placeholder="Unit type you're interested in, number of people coming..." />
                </div>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 rounded-sm">
                  <CalendarCheck size={14} /> Request inspection
                </Button>
              </form>
            )}

            <aside className="bg-secondary rounded-lg p-6 h-fit">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Prefer to call?</p>
              <div className="space-y-3">
                {brand.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center gap-3 text-sm font-semibold hover:text-accent transition-colors">
                    <Phone size={16} className="text-accent" /> {p}
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">{brand.hours}</p>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookInspectionPage;
