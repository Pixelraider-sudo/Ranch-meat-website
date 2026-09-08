import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProductCardSkeleton } from "@/components/marketplace/product-card-skeleton";
import { categories } from "@/services/mock-data";
import { getProducts, queryKeys } from "@/services/catalog.service";
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
      { title: "Marketplace — Grass-Fed Beef, Lamb & Poultry | Ranch Meat" },
      {
        name: "description",
        content:
          "Browse traceable cuts from verified ranches. Filter by category and price, with live stock and farm provenance.",
      },
      { property: "og:title", content: "Ranch Meat Marketplace" },
      {
        property: "og:description",
        content: "Traceable cuts from verified ranches, delivered chilled next day.",
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
  const [maxPrice, setMaxPrice] = useState(60);
  const [view, setView] = useState<"grid" | "list">("grid");

  const selected = useMemo(() => (search.category ? [search.category] : []), [search.category]);

  const productQuery = { search: query, categories: selected, sort, maxPrice };
  const { data, isPending } = useQuery({
    queryKey: queryKeys.products(productQuery),
    queryFn: () => getProducts(productQuery),
  });

  const toggleCategory = (slug: string) => {
    navigate({
      search: (prev: MarketplaceSearch): MarketplaceSearch =>
        prev.category === slug ? {} : { ...prev, category: slug },
    });
  };

  return (
    <>
      <div className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">Marketplace</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Every cut, fully traced</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {categories.reduce((sum, c) => sum + c.productCount, 0)} listings from verified ranches,
            updated as stock leaves the cold room.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-8" aria-label="Filters">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
            </p>
          </div>
          <fieldset className="space-y-3">
            <legend className="text-eyebrow mb-3 text-muted-foreground">Category</legend>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={`cat-${category.slug}`}
                  checked={selected.includes(category.slug)}
                  onCheckedChange={() => toggleCategory(category.slug)}
                />
                <Label htmlFor={`cat-${category.slug}`} className="text-sm font-normal">
                  {category.name}
                </Label>
              </div>
            ))}
          </fieldset>
          <div>
            <p className="text-eyebrow mb-4 text-muted-foreground">Max price / kg</p>
            <Slider
              value={[maxPrice]}
              min={10}
              max={60}
              step={1}
              onValueChange={([value]) => setMaxPrice(value ?? 60)}
              aria-label="Maximum price per kilogram"
            />
            <p className="mt-3 text-sm tabular-nums text-muted-foreground">Up to ${maxPrice}</p>
          </div>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cuts, farms, regions"
                aria-label="Search products"
                className="bg-card pl-9"
              />
            </div>
            <Select value={sort} onValueChange={(value) => setSort(value as ProductSort)}>
              <SelectTrigger className="w-44 bg-card" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden gap-1 rounded-lg border bg-card p-1 sm:flex">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="size-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {isPending ? "Loading products…" : `${data?.length ?? 0} products`}
          </p>

          <div
            className={cn(
              "mt-4 grid gap-6",
              view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
            )}
          >
            {isPending
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : data?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>

          {!isPending && data?.length === 0 && (
            <div className="surface-card mt-4 p-12 text-center">
              <p className="font-display text-lg font-bold">No products match those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the price range or clearing the category filter.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setMaxPrice(60);
                  navigate({ search: {} });
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}