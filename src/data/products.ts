import crystalImg from "@/assets/crystal-residence.jpg";
import crystalFlyer from "@/assets/crystal-residence-flyer.jpg";

export interface ProductUnit {
  type: string;
  price: number;
  rentalValue: number;
}

export interface Product {
  id: string;
  name: string;
  location: string;
  tenure: string;
  image: string;
  flyer?: string;
  units: ProductUnit[];
  features: string[];
  priceNote?: string;
  description: string;
}

// Prices come from the client's Crystal Residence flyer. Confirm current prices before launch.
export const products: Product[] = [
  {
    id: "crystal-residence",
    name: "Crystal Residence",
    location: "Ilaje, Bariga, Lagos",
    tenure: "15 years lease",
    image: crystalImg,
    flyer: crystalFlyer,
    units: [
      { type: "Studio", price: 8_000_000, rentalValue: 1_500_000 },
      { type: "One Bed", price: 15_000_000, rentalValue: 2_500_000 },
      { type: "Two Bed", price: 25_000_000, rentalValue: 3_500_000 },
    ],
    features: ["Prepaid meter", "Parking space", "Balcony", "Screeded walls", "Kitchen cabinet"],
    priceNote: "Prices valid till 30th of November, 2025",
    description:
      "Modern studio, one and two bedroom apartments in Ilaje, Bariga on a 15-year lease. A strong option for owners who want a home in mainland Lagos or a unit that earns rental income.",
  },
];

export const formatNaira = (n: number) =>
  n >= 1_000_000 ? `₦${(n / 1_000_000).toLocaleString("en-NG")} million` : `₦${n.toLocaleString("en-NG")}`;
