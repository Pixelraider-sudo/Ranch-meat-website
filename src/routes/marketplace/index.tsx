import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { ProductCard } from "@/components/marketplace/product-card";
import { ProductCardSkeleton } from "@/components/marketplace/product-card-skeleton";

import { getCategories, getProducts, queryKeys } from "@/services/catalog.service";

import { cn } from "@/lib/utils";
import type { ProductSort } from "@/types";

interface MarketplaceSearch {
  category?: string;
  q?: string;
}

export const Route = createFileRoute("/marketplace/")({
  validateSearch: (search: Record<string, unknown>): MarketplaceSearch => ({
    ...(typeof search["category"] === "string" ? { category: search["category"] } : {}),
    ...(typeof search["q"] === "string" ? { q: search["q"] } : {}),
  }),

  head: () => ({
    meta: [
      {
        title: "Marketplace | Premium Kenyan Meat | Ranch Meat",
      },
      {
        name: "description",
        content:
          "Browse premium beef, lamb and poultry from verified Kenyan ranches with transparent sourcing and cold-chain delivery.",
      },
      {
        property: "og:title",
        content: "Ranch Meat Marketplace",
      },
      {
        property: "og:description",
        content: "Premium meat sourced directly from verified Kenyan ranches.",
      },
    ],
  }),

  component: MarketplacePage,
});

function MarketplacePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [query, setQuery] = useState(search.q ?? "");
  const [sort, setSort] = useState<ProductSort>("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [view, setView] = useState<"grid" | "list">("grid");

  const selectedCategories = useMemo(
    () => (search.category ? [search.category] : []),
    [search.category],
  );

  const productQuery = {
    search: query,
    categories: selectedCategories,
    sort,
    maxPrice,
  };

  const { data: categories = [] } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  });

  const { data: products = [], isPending } = useQuery({
    queryKey: queryKeys.products(productQuery),
    queryFn: () => getProducts(productQuery),
  });

  const totalListings = useMemo(
    () => categories.reduce((sum, category) => sum + category.productCount, 0),
    [categories],
  );

  const toggleCategory = (slug: string) => {
    navigate({
      search: (prev: MarketplaceSearch): MarketplaceSearch =>
        prev.category === slug ? { ...(prev.q ? { q: prev.q } : {}) } : { ...prev, category: slug },
    });
  };

  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">Marketplace</p>

          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Premium Kenyan meat, fully traceable.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {totalListings} listings from verified ranches across Nairobi and Kiambu, with fresh
            stock updated daily.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-8" aria-label="Marketplace filters">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            <h2 className="text-sm font-semibold">Filters</h2>
          </div>

          <fieldset className="space-y-3">
            <legend className="mb-3 text-eyebrow text-muted-foreground">Category</legend>

            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={`cat-${category.slug}`}
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={() => toggleCategory(category.slug)}
                />

                <Label
                  htmlFor={`cat-${category.slug}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </fieldset>

          <div>
            <p className="mb-4 text-eyebrow text-muted-foreground">Max Price (KSh/kg)</p>

            <Slider
              value={[maxPrice]}
              min={500}
              max={5000}
              step={100}
              onValueChange={([value]) => setMaxPrice(value ?? 5000)}
            />

            <p className="mt-3 text-sm font-medium tabular-nums text-muted-foreground">
              Up to KSh {maxPrice.toLocaleString()}
            </p>
          </div>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search beef, lamb, poultry..."
                className="pl-9"
              />
            </div>

            <Select value={sort} onValueChange={(value) => setSort(value as ProductSort)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden gap-1 rounded-lg border p-1 sm:flex">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="size-4" />
              </Button>

              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("list")}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>

          {(selectedCategories.length > 0 || query) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategories.map((slug) => (
                <button
                  key={slug}
                  onClick={() => toggleCategory(slug)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  {categories.find((category) => category.slug === slug)?.name}
                  <X className="size-3" />
                </button>
              ))}

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  "{query}"
                  <X className="size-3" />
                </button>
              )}
            </div>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            {isPending ? "Loading products..." : `${products.length} products available`}
          </p>

          <div
            className={cn(
              "mt-4 grid gap-6",
              view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
            )}
          >
            {isPending
              ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>

          {!isPending && products.length === 0 && (
            <div className="surface-card mt-6 p-12 text-center">
              <p className="font-display text-xl font-bold">No products match your search.</p>

              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing your filters or increasing your maximum price.
              </p>

              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setQuery("");
                  setMaxPrice(5000);
                  navigate({ search: {} });
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
