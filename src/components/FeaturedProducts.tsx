import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const FeaturedProducts = () => (
  <section id="products" className="section-pad py-16 md:py-24">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Now selling</p>
        <h2 className="text-display text-3xl md:text-4xl lg:text-5xl leading-tight">Our products</h2>
      </div>
      <Link to="/products" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors">
        View all products →
      </Link>
    </div>
    <div className="space-y-10">
      {products.slice(0, 2).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default FeaturedProducts;
