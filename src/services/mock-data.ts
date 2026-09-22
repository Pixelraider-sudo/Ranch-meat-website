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

/* Real online photography (temporary).
   PostgreSQL will store these later. */

export const images = {
  beef: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80",

  lamb: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",

  poultry:
    "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=80",

  farmer1: "https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg",

  farmer2:
    "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5172/image/s1300x1300/LC202403_IllaingarunyoniConservancy_002_581550_reduced.jpg",

  farmer3:
    "https://ilriclippings.wordpress.com/wp-content/uploads/2018/01/17ilri_kapiti_cattleatkapiti04_cropped.jpg",
};

export const categories: Category[] = [
  {
    id: "c1",
    slug: "beef",
    name: "Premium Beef",
    description: "Grass-fed beef from verified Kenyan ranches.",
    productCount: 156,
    image: images.beef,
  },
  {
    id: "c2",
    slug: "lamb",
    name: "Highland Lamb",
    description: "Tender lamb from Kenya's highlands.",
    productCount: 71,
    image: images.lamb,
  },
  {
    id: "c3",
    slug: "poultry",
    name: "Free-range Chicken",
    description: "Pasture-raised birds from trusted farmers.",
    productCount: 98,
    image: images.poultry,
  },
  {
    id: "c4",
    slug: "goat",
    name: "Goat Meat",
    description: "Fresh goat cuts for nyama choma and stews.",
    productCount: 63,
    image: images.beef,
  },
];

export const farmers: Farmer[] = [
  {
    id: "f1",
    slug: "laikipia-highlands",
    name: "Samuel Kiptoo",
    farmName: "Laikipia Highlands Ranch",
    location: "Nanyuki",
    county: "Laikipia",
    verified: true,
    rating: 4.9,
    reviewCount: 864,
    since: 2014,
    story:
      "A family-run cattle ranch producing grass-fed beef using rotational grazing and veterinary-backed livestock management.",
    certifications: ["Vet Verified", "Cold Chain Approved"],
    avatar: images.farmer1,
    metrics: {
      orders: 6200,
      onTimeRate: 99.1,
      repeatRate: 74,
    },
  },
  {
    id: "f2",
    slug: "narok-plains",
    name: "Naserian Ole Saitoti",
    farmName: "Narok Plains Ranch",
    location: "Narok",
    county: "Narok",
    verified: true,
    rating: 4.8,
    reviewCount: 542,
    since: 2016,
    story:
      "Specializing in lamb and goat raised on open grazing land with traditional livestock management practices.",
    certifications: ["Vet Verified"],
    avatar: images.farmer2,
    metrics: {
      orders: 4100,
      onTimeRate: 98.5,
      repeatRate: 69,
    },
  },
  {
    id: "f3",
    slug: "eldoret-pastures",
    name: "Grace Chebet",
    farmName: "Eldoret Green Pastures",
    location: "Eldoret",
    county: "Uasin Gishu",
    verified: true,
    rating: 4.8,
    reviewCount: 487,
    since: 2018,
    story:
      "Free-range poultry farmer supplying chilled chicken to households and restaurants across Kenya.",
    certifications: ["Free Range", "Antibiotic Responsible"],
    avatar: images.farmer3,
    metrics: {
      orders: 3800,
      onTimeRate: 98.8,
      repeatRate: 71,
    },
  },
];

const nutrition = [
  { label: "Protein", value: "26 g" },
  { label: "Fat", value: "12 g" },
  { label: "Calories", value: "212 kcal" },
  { label: "Iron", value: "15%" },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "nyama-choma-beef",
    name: "Nyama Choma Beef",
    categorySlug: "beef",
    categoryName: "Premium Beef",
    farmerId: "f1",
    price: 980,
    compareAtPrice: 1100,
    unit: "kg",
    rating: 4.9,
    reviewCount: 321,
    inStock: true,
    stockKg: 86,
    badges: ["Best Seller", "Grass Fed"],
    origin: "Laikipia",
    image: images.beef,
    description: "Premium grass-fed beef perfect for authentic Kenyan nyama choma.",
    nutrition,
  },
  {
    id: "p2",
    slug: "beef-fillet",
    name: "Beef Fillet",
    categorySlug: "beef",
    categoryName: "Premium Beef",
    farmerId: "f1",
    price: 1450,
    unit: "kg",
    rating: 4.8,
    reviewCount: 184,
    inStock: true,
    stockKg: 42,
    badges: ["Chef Pick"],
    origin: "Laikipia",
    image: images.beef,
    description: "Tender beef fillet ideal for steaks and premium dishes.",
    nutrition,
  },
  {
    id: "p3",
    slug: "lamb-chops",
    name: "Lamb Chops",
    categorySlug: "lamb",
    categoryName: "Highland Lamb",
    farmerId: "f2",
    price: 1350,
    compareAtPrice: 1500,
    unit: "kg",
    rating: 4.9,
    reviewCount: 146,
    inStock: true,
    stockKg: 27,
    badges: ["Highland Raised"],
    origin: "Narok",
    image: images.lamb,
    description: "Tender lamb chops with rich natural flavour.",
    nutrition,
  },
  {
    id: "p4",
    slug: "goat-ribs",
    name: "Goat Ribs",
    categorySlug: "goat",
    categoryName: "Goat Meat",
    farmerId: "f2",
    price: 850,
    unit: "kg",
    rating: 4.7,
    reviewCount: 118,
    inStock: true,
    stockKg: 51,
    badges: ["Nyama Choma"],
    origin: "Narok",
    image: images.beef,
    description: "Goat ribs perfect for grilling and traditional dishes.",
    nutrition,
  },
  {
    id: "p5",
    slug: "chicken-drumsticks",
    name: "Chicken Drumsticks",
    categorySlug: "poultry",
    categoryName: "Free-range Chicken",
    farmerId: "f3",
    price: 520,
    unit: "kg",
    rating: 4.8,
    reviewCount: 294,
    inStock: true,
    stockKg: 118,
    badges: ["Free Range"],
    origin: "Uasin Gishu",
    image: images.poultry,
    description: "Juicy free-range drumsticks for family meals.",
    nutrition,
  },
  {
    id: "p6",
    slug: "whole-free-range-chicken",
    name: "Whole Free-range Chicken",
    categorySlug: "poultry",
    categoryName: "Free-range Chicken",
    farmerId: "f3",
    price: 690,
    unit: "bird",
    rating: 4.7,
    reviewCount: 163,
    inStock: true,
    stockKg: 74,
    badges: ["Whole Bird"],
    origin: "Uasin Gishu",
    image: images.poultry,
    description: "Fresh whole chicken for roasting or stew.",
    nutrition,
  },
];

export const traceStages: TraceStage[] = [
  {
    id: "t1",
    title: "Ranch",
    description: "Livestock registered and monitored.",
    duration: "6–24 months",
    metric: "Animal ID",
  },
  {
    id: "t2",
    title: "Veterinary Check",
    description: "Independent veterinary inspection.",
    duration: "Pre-dispatch",
    metric: "Certificate",
  },
  {
    id: "t3",
    title: "Transport",
    description: "Temperature-controlled transport.",
    duration: "<3 hrs",
    metric: "2–4°C",
  },
  {
    id: "t4",
    title: "Processing",
    description: "Licensed processing facility.",
    duration: "Same day",
    metric: "Batch ID",
  },
  {
    id: "t5",
    title: "Packaging",
    description: "Vacuum-sealed packaging.",
    duration: "1 hr",
    metric: "QR Code",
  },
  {
    id: "t6",
    title: "Cold Storage",
    description: "Continuous temperature monitoring.",
    duration: "0–24 hrs",
    metric: "0–2°C",
  },
  {
    id: "t7",
    title: "Delivery",
    description: "Chilled last-mile delivery.",
    duration: "Next day",
    metric: "Live ETA",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "Faith Wanjiku",
    role: "Restaurant Owner • Nairobi",
    quote: "The quality is consistent and deliveries arrive on time every week.",
    rating: 5,
  },
  {
    id: "r2",
    name: "Brian Mwangi",
    role: "Home Customer • Kiambu",
    quote: "I finally know exactly where my meat comes from.",
    rating: 5,
  },
  {
    id: "r3",
    name: "Chef Kevin Otieno",
    role: "Executive Chef • Westlands",
    quote: "The traceability system gives confidence to both our kitchen and our customers.",
    rating: 5,
  },
];

export const platformStats: PlatformStat[] = [
  { id: "s1", label: "Verified Ranches", value: 126, suffix: "+" },
  { id: "s2", label: "Orders Delivered", value: 18500, suffix: "+" },
  { id: "s3", label: "On-Time Delivery", value: 98.7, suffix: "%" },
  { id: "s4", label: "Average Rating", value: 4.8 },
];

export const recipes: Recipe[] = [
  {
    id: "rc1",
    title: "Nyama Choma Beef",
    minutes: 45,
    difficulty: "Medium",
    cut: "Beef",
    image: images.beef,
  },
  {
    id: "rc2",
    title: "Goat Fry",
    minutes: 55,
    difficulty: "Medium",
    cut: "Goat",
    image: images.beef,
  },
  {
    id: "rc3",
    title: "Chicken Pilau",
    minutes: 40,
    difficulty: "Easy",
    cut: "Chicken",
    image: images.poultry,
  },
];

export const faqs: Faq[] = [
  {
    id: "q1",
    question: "How is freshness guaranteed?",
    answer: "Every order travels in a monitored cold chain from the ranch to your doorstep.",
  },
  {
    id: "q2",
    question: "Can businesses order in bulk?",
    answer:
      "Yes. Restaurants, butcheries and hotels receive bulk pricing and recurring deliveries.",
  },
  {
    id: "q3",
    question: "How are farmers verified?",
    answer:
      "Every supplier undergoes document review, veterinary inspection and ongoing compliance checks.",
  },
  {
    id: "q4",
    question: "Where do you deliver?",
    answer: "We currently serve Nairobi, Kiambu and expanding nearby counties.",
  },
];

export const partners = [
  "Carnivore",
  "Java House",
  "Sarova Hotels",
  "Talisman",
  "Artcaffe",
  "Nyama Mama",
];
