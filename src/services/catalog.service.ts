import { categories, farmers, products, recipes, testimonials } from "./mock-data";
import type { Category, Farmer, Product, ProductQuery, Recipe, Testimonial } from "@/types";

/**
 * Mock transport layer. Every function is async and returns the same shape a
 * real REST/GraphQL endpoint would, so swapping in `fetch` later is a one-file
 * change with no component churn.
 */
const latency = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCategories(): Promise<Category[]> {
  await latency(140);
  return categories;
}

export async function getFarmers(): Promise<Farmer[]> {
  await latency(180);
  return farmers;
}

export async function getFarmer(id: string): Promise<Farmer | undefined> {
  await latency(120);
  return farmers.find((f) => f.id === id || f.slug === id);
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  await latency();
  const { search = "", categories: cats = [], sort = "featured", maxPrice } = query;
  let list = products.filter((p) => {
    const matchesSearch =
      !search ||
      `${p.name} ${p.categoryName} ${p.origin}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = cats.length === 0 || cats.includes(p.categorySlug);
    const matchesPrice = maxPrice === undefined || p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  list = [...list].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return Number(b.badges.includes("Best seller")) - Number(a.badges.includes("Best seller"));
  });

  return list;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await latency(160);
  return products.slice(0, 4);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await latency(150);
  return products.find((p) => p.slug === slug);
}

export async function getRecipes(): Promise<Recipe[]> {
  await latency(120);
  return recipes;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await latency(120);
  return testimonials;
}

export const queryKeys = {
  categories: ["categories"] as const,
  farmers: ["farmers"] as const,
  farmer: (id: string) => ["farmers", id] as const,
  products: (query: ProductQuery) => ["products", query] as const,
  featured: ["products", "featured"] as const,
  product: (slug: string) => ["products", slug] as const,
  recipes: ["recipes"] as const,
  testimonials: ["testimonials"] as const,
};