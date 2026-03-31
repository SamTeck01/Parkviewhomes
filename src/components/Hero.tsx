import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-property.jpg";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

const tabs = ["Daily", "Weekly", "Monthly", "Long Stay"];

const areas = ["All locations", "Victoria Island", "Ikoyi", "Lekki", "Banana Island"];
const typeOptions = ["Property type", "Apartment", "Villa", "Studio", "Penthouse"];
const priceOptions = ["Any price", "₦50k - ₦150k", "₦150k - ₦300k", "₦300k+"];
const sizeOptions = ["All sizes", "1 Bed", "2 Beds", "3+ Beds"];

type SelectFieldProps = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  open: boolean;
  onToggle: () => void;
};

const SelectField = ({ value, onChange, options, open, onToggle }: SelectFieldProps) => (
  <div className="relative flex-1">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full border border-border/60 px-4 py-3 text-[13px] bg-white hover:border-foreground/20 transition-colors text-left"
    >
      <span className="truncate text-foreground font-medium">{value}</span>
      <ChevronDown size={14} className={`text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
    </button>
    {open && (
      <div className="absolute z-50 left-0 top-full mt-1 w-full bg-white border border-border/60 shadow-lg py-1 animate-fade-in">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => { onChange(opt); onToggle(); }}
            className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-muted/50 transition-colors ${value === opt ? "font-semibold text-foreground bg-muted/30" : "text-foreground"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Daily");
  const [area, setArea] = useState(areas[0]);
  const [type, setType] = useState(typeOptions[0]);
  const [price, setPrice] = useState(priceOptions[0]);
  const [size, setSize] = useState(sizeOptions[0]);
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const toggleSelect = (name: string) => setOpenSelect((prev) => (prev === name ? null : name));

  const clearFilters = () => {
    setArea(areas[0]);
    setType(typeOptions[0]);
    setPrice(priceOptions[0]);
    setSize(sizeOptions[0]);
    setOpenSelect(null);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (area !== areas[0]) params.set("location", area);
    if (price !== priceOptions[0]) params.set("price", price);
    params.set("tab", activeTab);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="pt-20 md:pt-28" onClick={() => setOpenSelect(null)}>
      {/* ── Top Text Section ── */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium tracking-[-0.03em] leading-[1.05] mb-8 text-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Find the perfect<br />shortlet stay
            </h1>
            <button className="bg-foreground text-background px-8 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Check the shortlets out
            </button>
          </div>
          <div className="max-w-xs md:pb-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Experience premium, fully serviced apartments with luxury amenities, beautifully tailored for your comfort, business, and leisure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Image ── */}
      <section className="w-full">
        <div className="w-full h-[50vh] sm:h-[60vh] md:h-[75vh] 2xl:h-[800px] opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <img
            src={heroImg}
            alt="Modern luxury house"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Search / Filter Bar Section ── */}
      <section className="bg-[#fafafa] pt-20 pb-24 px-6 md:px-16 lg:px-24 border-b border-border/40">
        <div className="max-w-[1240px] mx-auto">
          {/* Header row side-by-side */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] max-w-lg text-foreground">
              Discover top-tier shortlets tailored to you
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-[320px] leading-relaxed md:mt-2">
              We curate premium spaces designed for productivity, harmony, and an absolutely unforgettable stay.
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mx-auto w-full">
            {/* Segmented Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 items-center max-w-full overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 text-[13px] font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-foreground shadow-[0_2px_10px_rgb(0,0,0,0.06)]"
                      : "bg-[#f4f4f4] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Selects Grid Component - Optimized for Mobile */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4 mb-6" onClick={(e) => e.stopPropagation()}>
              <SelectField value={area} onChange={setArea} options={areas} open={openSelect === "area"} onToggle={() => toggleSelect("area")} />
              <SelectField value={type} onChange={setType} options={typeOptions} open={openSelect === "type"} onToggle={() => toggleSelect("type")} />
              <SelectField value={price} onChange={setPrice} options={priceOptions} open={openSelect === "price"} onToggle={() => toggleSelect("price")} />
              <SelectField value={size} onChange={setSize} options={sizeOptions} open={openSelect === "size"} onToggle={() => toggleSelect("size")} />
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">
              <button className="flex items-center gap-2 text-[13px] font-medium text-foreground hover:opacity-70 transition-opacity w-full sm:w-auto">
                <Plus size={16} /> More options
              </button>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-[13px] font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                  <Trash2 size={16} /> Clear filters
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-foreground text-background px-8 py-3.5 text-[13px] font-medium hover:opacity-90 transition-opacity"
                >
                  Show shortlets
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
