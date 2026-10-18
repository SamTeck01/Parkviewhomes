import { Link } from "react-router-dom";
import { MapPin, CalendarCheck, Check } from "lucide-react";
import { Product, formatNaira } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => (
  <article className="bg-card border border-border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
    <div className="relative aspect-[16/10] lg:aspect-auto">
      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
        {product.tenure}
      </span>
    </div>

    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1.5">
          <MapPin size={14} className="text-accent" /> {product.location}
        </p>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{product.description}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="py-2 pr-4 font-semibold">Unit</th>
              <th className="py-2 pr-4 font-semibold">Current price</th>
              <th className="py-2 font-semibold">Rental value</th>
            </tr>
          </thead>
          <tbody>
            {product.units.map((u) => (
              <tr key={u.type} className="border-t border-border">
                <td className="py-3 pr-4 font-semibold">{u.type}</td>
                <td className="py-3 pr-4 font-bold text-red-600">{formatNaira(u.price)}</td>
                <td className="py-3 font-medium">{formatNaira(u.rentalValue)}/yr</td>
              </tr>
            ))}
          </tbody>
        </table>
        {product.priceNote && <p className="text-[11px] italic text-muted-foreground mt-2">{product.priceNote}</p>}
      </div>

      <ul className="flex flex-wrap gap-2">
        {product.features.map((f) => (
          <li key={f} className="inline-flex items-center gap-1.5 text-xs bg-secondary px-3 py-1.5 rounded-full">
            <Check size={12} className="text-accent" /> {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <Link
          to={`/book-inspection?property=${product.id}`}
          className="bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <CalendarCheck size={16} /> Book an inspection
        </Link>
        {product.flyer && (
          <a
            href={product.flyer}
            target="_blank"
            rel="noreferrer"
            className="border border-border px-6 py-3 text-sm font-semibold rounded-sm inline-flex items-center justify-center hover:bg-muted transition-colors"
          >
            View flyer
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProductCard;
