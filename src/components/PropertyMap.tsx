import { lazy, Suspense, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyMapProps {
  lat: number;
  lng: number;
  title?: string;
  className?: string;
  height?: string;
}

const LazyMapInner = lazy(() => import("./PropertyMapInner"));

const PropertyMap = memo(({ lat, lng, title, className = "", height = "h-[300px]" }: PropertyMapProps) => {
  return (
    <Suspense fallback={<Skeleton className={`${height} w-full rounded-lg`} />}>
      <LazyMapInner lat={lat} lng={lng} title={title} className={className} height={height} />
    </Suspense>
  );
});

PropertyMap.displayName = "PropertyMap";

export default PropertyMap;
