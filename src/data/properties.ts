import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface PropertyData {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  guests: number;
  sqm: number;
  images: string[];
  videoUrl?: string; // High-performance video hover
  description: string;
  amenities: string[];
  houseRules: string[];
  lat: number;
  lng: number;
}

export const properties: PropertyData[] = [
  {
    id: "1",
    title: "Skyline Loft Suite",
    location: "Victoria Island, Lagos",
    area: "Victoria Island",
    price: 180000,
    rating: 4.9,
    reviews: 28,
    beds: 2,
    baths: 2,
    guests: 6,
    sqm: 85,
    images: [property1, property2, property3, property4, property5],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-34190-large.mp4",
    description: "Experience luxury living in this stunning loft suite perched high above Victoria Island. Floor-to-ceiling windows flood the space with natural light, offering panoramic views of the Lagos lagoon. The apartment features premium finishes throughout, including marble countertops, hardwood floors, and designer furniture. Perfect for business travelers or couples seeking an elevated short-stay experience.",
    amenities: ["High-speed WiFi", "Free parking", "Air conditioning", "Smart TV", "Full kitchen", "24/7 security", "Swimming pool", "Gym access"],
    houseRules: ["Check-in: 2:00 PM — Check-out: 12:00 PM", "No smoking", "No parties or events", "Pets allowed on request"],
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: "2",
    title: "The Amber Retreat",
    location: "Ikoyi, Lagos",
    area: "Ikoyi",
    price: 250000,
    rating: 4.8,
    reviews: 19,
    beds: 3,
    baths: 2,
    guests: 8,
    sqm: 120,
    images: [property2, property3, property1, property5, property6],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-living-room-of-a-modern-apartment-with-white-walls-and-34193-large.mp4",
    description: "A serene sanctuary nestled in the heart of Ikoyi. This beautifully appointed 3-bedroom retreat features a blend of contemporary design and warm African touches. Enjoy spacious living areas, a fully equipped gourmet kitchen, and a private balcony overlooking lush gardens. Ideal for families or groups wanting a luxurious home-away-from-home.",
    amenities: ["High-speed WiFi", "Dedicated workspace", "Air conditioning", "Smart TV", "Full kitchen", "24/7 security", "Balcony", "Laundry"],
    houseRules: ["Check-in: 3:00 PM — Check-out: 11:00 AM", "No smoking", "No parties or events", "No pets"],
    lat: 6.4511,
    lng: 3.4353,
  },
  {
    id: "3",
    title: "Rooftop Oasis",
    location: "Lekki Phase 1, Lagos",
    area: "Lekki",
    price: 320000,
    rating: 5.0,
    reviews: 14,
    beds: 2,
    baths: 2,
    guests: 4,
    sqm: 95,
    images: [property3, property1, property4, property2, property6],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kitchen-and-dining-room-of-a-modern-apartment-34188-large.mp4",
    description: "Perched atop a modern Lekki highrise, this penthouse-level suite offers breathtaking rooftop views and access to an exclusive terrace. Minimalist interiors with curated art pieces, rain showers, and a chef's kitchen make this the ultimate urban escape. Wake up to sunrises over the Atlantic and unwind under city stars.",
    amenities: ["High-speed WiFi", "Rooftop terrace", "Air conditioning", "Smart TV", "Full kitchen", "24/7 security", "Rain shower", "Concierge"],
    houseRules: ["Check-in: 2:00 PM — Check-out: 12:00 PM", "No smoking", "Quiet hours after 10 PM", "Pets allowed on request"],
    lat: 6.4474,
    lng: 3.4734,
  },
  {
    id: "4",
    title: "Chef's Quarters",
    location: "Banana Island, Lagos",
    area: "Banana Island",
    price: 450000,
    rating: 4.9,
    reviews: 31,
    beds: 4,
    baths: 3,
    guests: 10,
    sqm: 200,
    images: [property4, property5, property1, property3, property2],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-34190-large.mp4",
    description: "The pinnacle of Lagos luxury living on exclusive Banana Island. This sprawling 4-bedroom residence features a professional-grade kitchen, private cinema room, and floor-to-ceiling lagoon views. Every detail has been meticulously curated — from Italian marble to bespoke furnishings. Full-time staff available on request.",
    amenities: ["High-speed WiFi", "Free parking", "Air conditioning", "Cinema room", "Professional kitchen", "24/7 security", "Swimming pool", "Private chef available"],
    houseRules: ["Check-in: 3:00 PM — Check-out: 12:00 PM", "No smoking indoors", "Events by arrangement only", "Pets not allowed"],
    lat: 6.4598,
    lng: 3.4254,
  },
  {
    id: "5",
    title: "Palm Villa",
    location: "Ajah, Lagos",
    area: "Ajah",
    price: 200000,
    rating: 4.7,
    reviews: 22,
    beds: 3,
    baths: 2,
    guests: 6,
    sqm: 140,
    images: [property5, property6, property2, property4, property1],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-living-room-of-a-modern-apartment-with-white-walls-and-34193-large.mp4",
    description: "A tropical villa surrounded by palm trees, offering a resort-like experience minutes from the beach. Three generous bedrooms, open-plan living, and a private garden with barbecue area. The perfect weekend getaway or extended stay for those seeking sun, sand, and serenity away from the city buzz.",
    amenities: ["High-speed WiFi", "Free parking", "Air conditioning", "Smart TV", "Full kitchen", "Garden", "BBQ area", "Beach access"],
    houseRules: ["Check-in: 2:00 PM — Check-out: 11:00 AM", "No smoking indoors", "No parties after 11 PM", "Pets welcome"],
    lat: 6.4698,
    lng: 3.5852,
  },
  {
    id: "6",
    title: "Woodland Studio",
    location: "Ikeja GRA, Lagos",
    area: "Ikeja",
    price: 120000,
    rating: 4.6,
    reviews: 35,
    beds: 1,
    baths: 1,
    guests: 2,
    sqm: 45,
    images: [property6, property1, property3, property5, property4],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kitchen-and-dining-room-of-a-modern-apartment-34188-large.mp4",
    description: "A cozy, thoughtfully designed studio in the leafy streets of Ikeja GRA. Compact but feature-rich, with a queen bed, kitchenette, workspace, and rainfall shower. Walking distance to restaurants, malls, and the domestic airport. An unbeatable value for solo travelers and business visitors.",
    amenities: ["High-speed WiFi", "Dedicated workspace", "Air conditioning", "Smart TV", "Kitchenette", "24/7 security", "Airport proximity", "Laundry"],
    houseRules: ["Check-in: 1:00 PM — Check-out: 11:00 AM", "No smoking", "No parties", "No pets"],
    lat: 6.5833,
    lng: 3.3458,
  },
];

export const getProperty = (id: string): PropertyData | undefined => 
  properties.find((p) => p.id === id);

export const formatPrice = (price: number): string =>
  `₦${price.toLocaleString()}`;

export const areas = [...new Set(properties.map((p) => p.area))];
