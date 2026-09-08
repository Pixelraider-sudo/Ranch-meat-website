import beef from "@/assets/cut-beef.jpg";
import lamb from "@/assets/cut-lamb.jpg";
import poultry from "@/assets/cut-poultry.jpg";
import farmerPortrait from "@/assets/farmer-1.jpg";
import type {
  Category,
  Faq,
  Farmer,
  PlatformStat,
  Product,
  Recipe,
  Testimonial,
  TraceStage,
} from "@/types";

export const images = { beef, lamb, poultry, farmerPortrait };

export const categories: Category[] = [
  {
    id: "c1",
    slug: "beef",
    name: "Grass-fed Beef",
    description: "Dry-aged cuts from regenerative pastures.",
    productCount: 148,
    image: beef,
  },
  {
    id: "c2",
    slug: "lamb",
    name: "Highland Lamb",
    description: "Slow-raised, herb-fed and hand-butchered.",
    productCount: 62,
    image: lamb,
  },
  {
    id: "c3",
    slug: "poultry",
    name: "Free-range Poultry",
    description: "Pasture-roaming birds, zero antibiotics.",
    productCount: 94,
    image: poultry,
  },
  {
    id: "c4",
    slug: "specialty",
    name: "Specialty & Charcuterie",
    description: "Cured, smoked and chef-selected rarities.",
    productCount: 37,
    image: beef,
  },
];

export const farmers: Farmer[] = [
  {
    id: "f1",
    slug: "hollow-creek",
    name: "Martin Ojeda",
    farmName: "Hollow Creek Ranch",
    location: "Boulder County, CO",
    verified: true,
    rating: 4.9,
    reviewCount: 1284,
    since: 1987,
    story:
      "Third-generation ranchers running 900 acres of rotationally grazed pasture with full herd traceability.",
    certifications: ["Animal Welfare Approved", "Regenerative Verified", "USDA Organic"],
    avatar: farmerPortrait,
    metrics: { orders: 18400, onTimeRate: 99.2, repeatRate: 72 },
  },
  {
    id: "f2",
    slug: "stonebridge",
    name: "Aisha Bennet",
    farmName: "Stonebridge Highlands",
    location: "Willow Valley, OR",
    verified: true,
    rating: 4.8,
    reviewCount: 862,
    since: 2004,
    story:
      "Highland lamb raised on wild herb meadows, processed within 40 km to keep the cold chain unbroken.",
    certifications: ["Grass-fed Certified", "Carbon Neutral Delivery"],
    avatar: farmerPortrait,
    metrics: { orders: 9600, onTimeRate: 98.4, repeatRate: 68 },
  },
  {
    id: "f3",
    slug: "northfield",
    name: "Ezra Lindqvist",
    farmName: "Northfield Pastures",
    location: "Cedar Plains, MN",
    verified: true,
    rating: 4.7,
    reviewCount: 543,
    since: 2012,
    story:
      "Mobile-coop poultry operation with daily pasture rotation and same-day chilled dispatch.",
    certifications: ["Pasture Raised", "Antibiotic Free"],
    avatar: farmerPortrait,
    metrics: { orders: 7100, onTimeRate: 97.9, repeatRate: 61 },
  },
];

const nutrition = [
  { label: "Protein", value: "26 g" },
  { label: "Fat", value: "12 g" },
  { label: "Calories", value: "212 kcal" },
  { label: "Iron", value: "15% DV" },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "dry-aged-ribeye",
    name: "Dry-Aged Ribeye",
    categorySlug: "beef",
    categoryName: "Grass-fed Beef",
    farmerId: "f1",
    price: 42.5,
    compareAtPrice: 49,
    unit: "kg",
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    stockKg: 86,
    badges: ["45-day aged", "Best seller"],
    origin: "Boulder County, CO",
    image: beef,
    description:
      "Forty-five days of dry aging concentrate a deep, nutty marbling in every steak. Hand-cut to order.",
    nutrition,
  },
  {
    id: "p2",
    slug: "grass-fed-tenderloin",
    name: "Grass-Fed Tenderloin",
    categorySlug: "beef",
    categoryName: "Grass-fed Beef",
    farmerId: "f1",
    price: 58,
    unit: "kg",
    rating: 4.8,
    reviewCount: 233,
    inStock: true,
    stockKg: 41,
    badges: ["Chef pick"],
    origin: "Boulder County, CO",
    image: beef,
    description: "The leanest, most tender cut on the animal — clean flavour, buttery texture.",
    nutrition,
  },
  {
    id: "p3",
    slug: "highland-lamb-rack",
    name: "Highland Lamb Rack",
    categorySlug: "lamb",
    categoryName: "Highland Lamb",
    farmerId: "f2",
    price: 39.9,
    compareAtPrice: 44,
    unit: "kg",
    rating: 4.9,
    reviewCount: 187,
    inStock: true,
    stockKg: 24,
    badges: ["Herb-fed"],
    origin: "Willow Valley, OR",
    image: lamb,
    description: "French-trimmed rack from herb-meadow lamb, delicate and aromatic.",
    nutrition,
  },
  {
    id: "p4",
    slug: "lamb-shoulder",
    name: "Slow-Roast Lamb Shoulder",
    categorySlug: "lamb",
    categoryName: "Highland Lamb",
    farmerId: "f2",
    price: 26.4,
    unit: "kg",
    rating: 4.6,
    reviewCount: 96,
    inStock: true,
    stockKg: 58,
    badges: [],
    origin: "Willow Valley, OR",
    image: lamb,
    description: "Bone-in shoulder built for six-hour roasts and Sunday tables.",
    nutrition,
  },
  {
    id: "p5",
    slug: "pasture-chicken-breast",
    name: "Pasture Chicken Breast",
    categorySlug: "poultry",
    categoryName: "Free-range Poultry",
    farmerId: "f3",
    price: 18.2,
    unit: "kg",
    rating: 4.7,
    reviewCount: 318,
    inStock: true,
    stockKg: 132,
    badges: ["Antibiotic free"],
    origin: "Cedar Plains, MN",
    image: poultry,
    description: "Skinless breast from birds rotated to fresh pasture every single morning.",
    nutrition,
  },
  {
    id: "p6",
    slug: "whole-heritage-chicken",
    name: "Whole Heritage Chicken",
    categorySlug: "poultry",
    categoryName: "Free-range Poultry",
    farmerId: "f3",
    price: 14.8,
    unit: "kg",
    rating: 4.5,
    reviewCount: 142,
    inStock: false,
    stockKg: 0,
    badges: ["Seasonal"],
    origin: "Cedar Plains, MN",
    image: poultry,
    description: "Slow-growing heritage breed with dense, flavourful meat.",
    nutrition,
  },
  {
    id: "p7",
    slug: "smoked-brisket",
    name: "Cold-Smoked Brisket",
    categorySlug: "specialty",
    categoryName: "Specialty & Charcuterie",
    farmerId: "f1",
    price: 33.7,
    unit: "kg",
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    stockKg: 19,
    badges: ["Limited"],
    origin: "Boulder County, CO",
    image: beef,
    description: "Beechwood cold-smoked over 14 hours, ready for the low-and-slow finish.",
    nutrition,
  },
  {
    id: "p8",
    slug: "wagyu-burger-blend",
    name: "Wagyu Burger Blend",
    categorySlug: "specialty",
    categoryName: "Specialty & Charcuterie",
    farmerId: "f1",
    price: 24.9,
    compareAtPrice: 29.5,
    unit: "kg",
    rating: 4.9,
    reviewCount: 204,
    inStock: true,
    stockKg: 74,
    badges: ["Best seller"],
    origin: "Boulder County, CO",
    image: beef,
    description: "A 70/30 chuck-and-brisket grind with wagyu trim for an unreasonably good patty.",
    nutrition,
  },
];

export const traceStages: TraceStage[] = [
  {
    id: "t1",
    title: "Farm",
    description: "Herd tagged, pasture-rotated and logged daily by the ranch team.",
    duration: "18–24 months",
    metric: "GPS herd ID",
  },
  {
    id: "t2",
    title: "Veterinary Inspection",
    description: "Independent vet sign-off on health, welfare and medication history.",
    duration: "Pre-dispatch",
    metric: "Signed certificate",
  },
  {
    id: "t3",
    title: "Transportation",
    description: "Short-haul, low-stress transit with continuous temperature telemetry.",
    duration: "< 90 min",
    metric: "2–4 °C logged",
  },
  {
    id: "t4",
    title: "Processing",
    description: "Licensed facility, batch-linked to the originating animal.",
    duration: "Same day",
    metric: "Batch ID",
  },
  {
    id: "t5",
    title: "Packaging",
    description: "Vacuum-sealed in food-grade, recyclable barrier film.",
    duration: "2 h",
    metric: "QR trace code",
  },
  {
    id: "t6",
    title: "Cold Storage",
    description: "Chilled holding with 24/7 sensor monitoring and alerting.",
    duration: "0–48 h",
    metric: "0–2 °C",
  },
  {
    id: "t7",
    title: "Delivery",
    description: "Insulated last-mile delivery with live tracking to your door.",
    duration: "Next day",
    metric: "Live ETA",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "Camille Duarte",
    role: "Executive Chef, Maison Verte",
    quote:
      "We replaced three suppliers with Ranch Meat. The traceability data alone changed how we write our menu.",
    rating: 5,
  },
  {
    id: "r2",
    name: "Tomás Herrera",
    role: "Procurement Lead, Northline Hotels",
    quote:
      "Recurring bulk orders arrive within a 30-minute window. Our kitchens stopped planning around delays.",
    rating: 5,
  },
  {
    id: "r3",
    name: "Priya Raman",
    role: "Home cook, Denver",
    quote:
      "I can see the farm, the vet report and the cold-chain log. It feels like buying direct from the ranch.",
    rating: 5,
  },
];

export const platformStats: PlatformStat[] = [
  { id: "s1", label: "Verified farms", value: 1240, suffix: "+" },
  { id: "s2", label: "Orders delivered", value: 486000, suffix: "+" },
  { id: "s3", label: "On-time delivery", value: 99, suffix: "%" },
  { id: "s4", label: "Average rating", value: 4.9, prefix: "" },
];

export const recipes: Recipe[] = [
  { id: "rc1", title: "Reverse-Seared Ribeye", minutes: 45, difficulty: "Medium", cut: "Ribeye", image: beef },
  { id: "rc2", title: "Herb-Crusted Lamb Rack", minutes: 60, difficulty: "Chef", cut: "Lamb rack", image: lamb },
  { id: "rc3", title: "Buttermilk Pasture Chicken", minutes: 35, difficulty: "Easy", cut: "Chicken", image: poultry },
];

export const faqs: Faq[] = [
  {
    id: "q1",
    question: "How does Ranch Meat guarantee freshness?",
    answer:
      "Every order ships within 24 hours of butchery in an unbroken 0–2 °C cold chain, with sensor logs attached to your order record.",
  },
  {
    id: "q2",
    question: "Can restaurants and hotels order at wholesale volume?",
    answer:
      "Yes. Business accounts unlock bulk pricing tiers, recurring standing orders, consolidated invoicing and a dedicated account manager.",
  },
  {
    id: "q3",
    question: "What does verification mean for a farm?",
    answer:
      "Verified farms pass document review, veterinary audit and on-site inspection, and are re-audited annually to keep the badge.",
  },
  {
    id: "q4",
    question: "Where do you deliver?",
    answer:
      "We currently deliver next-day across 34 metropolitan regions, with two-day service to surrounding areas.",
  },
];

export const partners = ["Maison Verte", "Northline Hotels", "Cedar & Salt", "Grovehouse", "Table Nine", "Basalt Group"];