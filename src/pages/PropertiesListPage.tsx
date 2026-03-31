import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, X, Map as MapIcon, Compass, Waves, Trees, Home, Building2, Flame, Search as SearchIcon } from "lucide-react";
import { properties, formatPrice, areas } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import PropertyCard from "@/components/PropertyCard";

const PropertiesListPage = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialLocation);
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [bedsFilter, setBedsFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // Airbnb Search state
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Derive filters
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
    setShowFiltersMobile(false);
  };

  const hasActiveFilters = search || areaFilter !== "all" || bedsFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 500000;

  // Shared Filter UI for both Desktop Collapsible and Mobile Modal
  const FilterControls = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between lg:hidden mb-4 pb-4 border-b border-border">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={() => setShowFiltersMobile(false)} className="p-2"><X size={20}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location Area</label>
          <Select value={areaFilter} onValueChange={setAreaFilter}>
             <SelectTrigger><SelectValue/></SelectTrigger>
             <SelectContent>
                <SelectItem value="all">Anywhere</SelectItem>
                {areas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
             </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bedrooms</label>
          <Select value={bedsFilter} onValueChange={setBedsFilter}>
             <SelectTrigger><SelectValue/></SelectTrigger>
             <SelectContent>
                <SelectItem value="all">Any numbers</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
             </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
            <span>Price per night</span>
            <span>{formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
          </label>
          <Slider min={0} max={500000} step={10000} value={priceRange} onValueChange={setPriceRange} className="mt-4" />
        </div>
      </div>
      
      <div className="lg:hidden mt-8 pt-4 border-t border-border flex gap-3">
        <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear all</Button>
        <Button className="flex-1 bg-foreground text-background" onClick={() => setShowFiltersMobile(false)}>Show {filtered.length} spaces</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Conditionally hide Navbar when search is active */}
      {!isSearchActive && <Navbar />}
      
      {/* Sticky Header Section - Adjusted with pt to account for fixed Navbar */}
      <div className={`sticky ${isSearchActive ? 'top-0 py-6' : 'top-20 md:top-[88px] pt-4 pb-2 md:pb-4'} z-40 bg-white border-b border-border/40 shadow-sm px-6 md:px-16 lg:px-24 transition-all duration-300 ${!isSearchActive && 'mt-20 md:mt-[88px]'}`}>
        
        {/* Airbnb Style Search Bar */}
        <div className="max-w-[1440px] mx-auto">
           {isSearchActive ? (
             <div className="w-full animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold">Search stays</h2>
                   <button onClick={() => setIsSearchActive(false)} className="p-2 hover:bg-muted rounded-full">
                     <X size={20} />
                   </button>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 bg-[#f7f7f7] p-2 rounded-2xl md:rounded-full border border-border shadow-sm">
                   <div className="flex-1 w-full px-6 py-2 border-b md:border-b-0 md:border-r border-border">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Location</p>
                      <input 
                        className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-muted-foreground/60"
                        placeholder="Where are you going?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                      />
                   </div>
                   <div className="flex-1 w-full px-6 py-2 border-b md:border-b-0 md:border-r border-border">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Check in</p>
                      <p className="text-sm text-muted-foreground/60">Add dates</p>
                   </div>
                   <div className="flex-1 w-full px-6 py-2">
                       <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Who</p>
                       <p className="text-sm text-muted-foreground/60">Add guests</p>
                   </div>
                   <button 
                     onClick={() => setIsSearchActive(false)}
                     className="bg-accent text-accent-foreground p-4 md:p-3 rounded-full flex items-center justify-center gap-2 w-full md:w-auto"
                   >
                     <SearchIcon size={20} className="stroke-[3px]" />
                     <span className="md:hidden font-bold">Search</span>
                   </button>
                </div>
             </div>
           ) : (
             <div className="flex items-center justify-between gap-4">
               <button 
                  onClick={() => setIsSearchActive(true)}
                  className="flex-1 flex items-center gap-4 pl-6 pr-2 py-2 border border-border rounded-full shadow-sm hover:shadow-md transition-shadow bg-white max-w-[420px]"
               >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold truncate">{search || "Start your search"}</p>
                    <p className="text-[11px] text-muted-foreground">Anywhere • Any week • Add guests</p>
                  </div>
                  <div className="bg-accent p-2.5 rounded-full text-accent-foreground">
                     <SearchIcon size={16} className="stroke-[3.5px]" />
                  </div>
               </button>

               <div className="hidden md:flex ml-4">
                 <Button variant="outline" className="h-12 rounded-full gap-2 px-6 text-xs font-bold border-border shadow-sm hover:shadow-md transition-all" onClick={() => setShowFiltersDesktop(!showFiltersDesktop)}>
                   <SlidersHorizontal size={14} /> Filters
                 </Button>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-16 lg:px-24 py-8">
        
        {/* Desktop Filters Expandable pane */}
        {showFiltersDesktop && (
          <div className="hidden md:block mb-10 p-6 bg-[#f7f7f7] rounded-xl border border-border/40 animate-in slide-in-from-top-4 duration-300">
            <FilterControls />
          </div>
        )}

        {/* Mobile Filter Modal Overlay */}
        {showFiltersMobile && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto px-6 py-6 lg:hidden animate-in slide-in-from-bottom duration-300">
            <FilterControls />
          </div>
        )}

        {hasActiveFilters && !isSearchActive && (
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">{filtered.length} stay{filtered.length !== 1 && 's'} in {search || 'all locations'}</h1>
            <Button variant="ghost" onClick={clearFilters} className="text-sm font-semibold underline">Clear selection</Button>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-6 md:gap-y-10 pb-20">
          {filtered.map((p, i) => (
            <PropertyCard
              key={p.id}
              id={p.id}
              images={p.images}
              title={p.title}
              location={p.location}
              price={p.price}
              rating={p.rating}
              beds={p.beds}
              baths={p.baths}
              delay={0.05 * i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-foreground/80">
            <h3 className="text-2xl font-bold mb-3">No exact matches</h3>
            <p className="text-muted-foreground mb-6">Try changing or removing some of your filters.</p>
            <Button variant="outline" className="border-foreground text-foreground px-8 py-6 rounded-lg font-bold" onClick={clearFilters}>Remove all filters</Button>
          </div>
        )}
      </div>

      {/* Floating Action Button (Mobile Only) */}
      {!isSearchActive && (
        <div className="md:hidden fixed bottom-[90px] left-1/2 -translate-x-1/2 z-40">
          <button 
            onClick={() => setShowFiltersMobile(true)}
            className="bg-[#222222] text-white flex items-center gap-2 px-5 py-3.5 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Filters <SlidersHorizontal size={14} className="ml-1" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertiesListPage;
