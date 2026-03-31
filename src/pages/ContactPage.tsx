import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 md:pt-32 section-pad pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-2">Get in Touch</p>
            <h1 className="text-display text-3xl md:text-5xl mb-3">Contact Us</h1>
            <p className="text-muted-foreground text-sm max-w-lg">
              Have a question about a property, need help with a booking, or want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-card border border-border rounded-lg p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-display text-2xl mb-2">Thank you!</h2>
                  <p className="text-muted-foreground text-sm mb-6">Your message has been sent. Our team will respond within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" placeholder="+234 800 000 0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Booking inquiry, partnership, general question..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us how we can help..." rows={5} required />
                  </div>
                  <Button type="submit" className="bg-primary text-primary-foreground gap-2 rounded-sm">
                    <Send size={14} /> Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@vemuhomes.com" },
                { icon: Phone, label: "Phone", value: "+234 801 234 5678" },
                { icon: MapPin, label: "Office", value: "14 Admiralty Way, Lekki Phase 1, Lagos" },
                { icon: Clock, label: "Hours", value: "Mon — Sat, 8AM — 8PM WAT" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "Facebook"].map((s) => (
                    <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
