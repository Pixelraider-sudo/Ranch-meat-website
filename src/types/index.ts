export type UserRole = "customer" | "farmer" | "restaurant" | "wholesaler" | "admin";

export type OrderStatus =
  "pending" | "confirmed" | "preparing" | "packed" | "out_for_delivery" | "delivered" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "mpesa" | "cash_on_delivery" | "card";

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
  county: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  since: number;
  story: string;
  certifications: string[];
  avatar: string;
  metrics: {
    orders: number;
    onTimeRate: number;
    repeatRate: number;
  };
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
  weightKg?: number;

  rating: number;
  reviewCount: number;

  inStock: boolean;
  stockKg: number;

  badges: string[];

  origin: string;

  image: string;
  description: string;

  nutrition: {
    label: string;
    value: string;
  }[];

  deliveryEta?: string;
}

export interface CartLine {
  productId: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface Address {
  id: string;
  recipient: string;
  phone: string;
  county: string;
  city: string;
  area: string;
  street?: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];

  subtotal: number;
  deliveryFee: number;
  total: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  deliveryAddress: Address;

  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;

  method: PaymentMethod;
  status: PaymentStatus;

  amount: number;

  phone?: string;
  mpesaReceipt?: string;
  checkoutRequestId?: string;

  createdAt: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
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
