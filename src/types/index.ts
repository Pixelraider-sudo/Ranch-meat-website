export type UserRole = "customer" | "farmer" | "restaurant" | "wholesaler" | "admin";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
}

export interface Farmer {
  id: string;
  slug: string;
  name: string;
  farmName: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  since: number;
  story: string;
  certifications: string[];
  avatar: string;
  metrics: { orders: number; onTimeRate: number; repeatRate: number };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  farmerId: string;
  price: number;
  compareAtPrice?: number;
  unit: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockKg: number;
  badges: string[];
  origin: string;
  image: string;
  description: string;
  nutrition: { label: string; value: string }[];
}

export interface CartLine {
  productId: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface TraceStage {
  id: string;
  title: string;
  description: string;
  duration: string;
  metric: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface PlatformStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Recipe {
  id: string;
  title: string;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Chef";
  cut: string;
  image: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "rating";

export interface ProductQuery {
  search?: string;
  categories?: string[];
  sort?: ProductSort;
  maxPrice?: number;
}