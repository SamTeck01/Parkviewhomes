export const brand = {
  name: "Parkview Realty Ltd",
  shortName: "Parkview Realty",
  domain: "parkviewhomes.ng",
  email: "info@parkviewhomes.ng",
  phones: ["09135140089", "09160481691"],
  office: "Lagos, Nigeria",
  hours: "Mon to Sat, 8AM to 6PM WAT",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};

/** Turns a local number like 09135140089 into a tel: link with the +234 code. */
export const telHref = (phone: string) => `tel:+234${phone.replace(/^0/, "")}`;

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Shortlets", href: "/properties" },
  { label: "Book an inspection", href: "/book-inspection" },
  { label: "About us", href: "/about" },
  { label: "Latest updates", href: "/updates" },
];
