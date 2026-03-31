import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, X, Bed, Star } from "lucide-react";
import { properties, formatPrice, areas, type PropertyData } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const PropertiesListPage = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  const initialGuests = searchParams.get("guests") || "";

  const [search, setSearch] = useState(initialLocation);
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [bedsFilter, setBedsFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const matchesSearch = !search || 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase());
      const matchesArea = areaFilter === "all" || p.area === areaFilter;
      const matchesBeds = bedsFilter === "all" || p.beds === Number(bedsFilter);
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesArea && matchesBeds && matchesPrice;
    });

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [search, areaFilter, bedsFilter, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setAreaFilter("all");
    setBedsFilter("all");
    setPriceRange([0, 500000]);
    setSortBy("featured");
  };

  const hasActiveFilters = search || areaFilter !== "all" || bedsFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 500000;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 md:pt-24 section-pad pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display text-3xl md:text-5xl mb-2">All Shortlets</h1>
          <p className="text-muted-foreground text-sm">
            {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} available
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low → High</SelectItem>
              <SelectItem value="price-high">Price: High → Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={clearFilters}>
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-card border border-border rounded-lg mb-6 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Area</label>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Bedrooms</label>
              <Select value={bedsFilter} onValueChange={setBedsFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Price: {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
              </label>
              <Slider
                min={0}
                max={500000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-3"
              />
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to={`/property/${p.id}`}
              className="property-card group cursor-pointer block opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star size={12} className="text-amber fill-amber" />
                  <span className="text-xs font-medium">{p.rating}</span>
                </div>
              </div>
              <div className="pt-3 pb-1">
                <h3 className="font-heading text-base md:text-lg leading-tight mb-1 group-hover:text-amber transition-colors duration-300">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <MapPin size={13} />
                  <span className="text-xs">{p.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1 text-xs">
                      <Bed size={13} /> {p.beds}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatPrice(p.price)}<span className="text-xs font-normal text-muted-foreground">/night</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-display text-xl mb-2">No shortlets found</p>
            <p className="text-sm">Try adjusting your filters or search terms.</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesListPage;
