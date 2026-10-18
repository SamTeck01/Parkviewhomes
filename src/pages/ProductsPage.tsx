import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const ProductsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 md:pt-36 section-pad pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Products</p>
          <h1 className="text-display text-3xl md:text-5xl mb-3">Homes for sale and lease</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Apartments you can own outright or hold on a long lease, with clear prices and the rental income each unit can earn.
          </p>
        </div>
        <div className="space-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ProductsPage;
