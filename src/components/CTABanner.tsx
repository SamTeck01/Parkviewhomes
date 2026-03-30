const CTABanner = () => {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="bg-primary rounded-xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-lg">
          <h2 className="text-display text-2xl md:text-4xl text-primary-foreground leading-tight mb-3">
            Smart selection of premium shortlets
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/60">
            List your property with Vemu Homes and reach thousands of guests looking for quality short stays.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="btn-accent text-sm py-3 px-8 rounded-md whitespace-nowrap">
            Find a shortlet
          </button>
          <button className="border border-primary-foreground/30 text-primary-foreground text-sm py-3 px-8 rounded-md whitespace-nowrap hover:bg-primary-foreground/10 transition-colors">
            List your property
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
