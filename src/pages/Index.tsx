import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Locations from "@/components/Locations";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <Benefits />
      <Testimonials />
      <HowItWorks />
      <Locations />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
