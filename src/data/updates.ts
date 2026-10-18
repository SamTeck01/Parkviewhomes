export interface Update {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  link?: string;
}

// Placeholder posts until the client sends real news.
export const updates: Update[] = [
  {
    id: "crystal-residence-launch",
    date: "2026-10-18",
    title: "Crystal Residence, Ilaje Bariga is now selling",
    excerpt:
      "Studio, one bed and two bed apartments on a 15-year lease, with prepaid meters, parking, balconies and fitted kitchen cabinets. Book an inspection to see the units.",
    link: "/products",
  },
  {
    id: "inspections-open",
    date: "2026-10-18",
    title: "Inspections now open every weekday and Saturday",
    excerpt: "Pick a date that suits you and our team will call to confirm and meet you on site.",
    link: "/book-inspection",
  },
];
