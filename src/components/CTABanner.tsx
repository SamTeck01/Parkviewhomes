import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="bg-primary rounded-xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-lg">
          <h2 className="text-display text-2xl md:text-4xl text-primary-foreground leading-tight mb-3">
            Ready to see a property?
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/60">
            Book an inspection and our team will show you around, or call us on 09135140089.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link to="/book-inspection" className="btn-accent text-sm py-3 px-8 rounded-md whitespace-nowrap text-center">
            Book an inspection
          </Link>
          <Link to="/contact" className="border border-primary-foreground/30 text-primary-foreground text-sm py-3 px-8 rounded-md whitespace-nowrap hover:bg-primary-foreground/10 transition-colors text-center">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
