import { memo } from "react";

interface PropertyMapProps {
  lat: number;
  lng: number;
  title?: string;
  className?: string;
  height?: string;
}

const PropertyMap = memo(({ lat, lng, title, className = "", height = "h-[300px]" }: PropertyMapProps) => {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.005}%2C${lng + 0.008}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className={`${height} w-full rounded-lg overflow-hidden border border-border ${className}`}>
      <iframe
        title={title || "Property location"}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
});

PropertyMap.displayName = "PropertyMap";

export default PropertyMap;
