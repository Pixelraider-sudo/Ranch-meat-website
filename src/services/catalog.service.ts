import { categories, farmers, products, recipes, testimonials } from "./mock-data";

import type { Category, Farmer, Product, ProductQuery, Recipe, Testimonial } from "@/types";

/**
 * Catalog Service
 *
 * Current: Mock transport layer.
 * Future: Express + PostgreSQL.
 *
 * Components should never know where data comes from.
 */

const MOCK_LATENCY = 160;

const wait = (ms = MOCK_LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  categories: "/api/categories",
  farmers: "/api/farmers",
  products: "/api/products",
  recipes: "/api/recipes",
  testimonials: "/api/testimonials",
};

const normalize = (value: string) => value.trim().toLowerCase();

export async function getCategories(): Promise<Category[]> {
  await wait();
  return [...categories];
}

export async function getFarmers(): Promise<Farmer[]> {
  await wait();
  return [...farmers];
}

export async function getFarmer(idOrSlug: string): Promise<Farmer | undefined> {
  await wait();

  return farmers.find((farmer) => farmer.id === idOrSlug || farmer.slug === idOrSlug);
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  await wait();

  const { search = "", categories: selectedCategories = [], sort = "featured", maxPrice } = query;

  const term = normalize(search);

  let list = products.filter((product) => {
    const searchable = normalize(`${product.name} ${product.categoryName} ${product.origin}`);

    const matchesSearch = term.length === 0 || searchable.includes(term);

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.categorySlug);

    const matchesPrice = maxPrice === undefined || product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  list = [...list].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      default:
        return Number(b.badges.includes("Best seller")) - Number(a.badges.includes("Best seller"));
    }
  });

  return list;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await wait();

  const featured = products.filter((product) => product.badges.includes("Best seller"));

  return featured.length ? featured.slice(0, 4) : products.slice(0, 4);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await wait();

  return products.find((product) => product.slug === slug);
}

export async function getRecipes(): Promise<Recipe[]> {
  await wait();
  return [...recipes];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await wait();
  return [...testimonials];
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
