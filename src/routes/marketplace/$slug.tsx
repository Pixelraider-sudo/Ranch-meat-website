import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, MapPin, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/marketplace/product-card";
import { getFarmer, getProduct, getProducts, queryKeys } from "@/services/catalog.service";
import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/marketplace/$slug")({
  loader: async ({ params }) => {
    const product = await getProduct(params.slug);
    if (!product) throw notFound();
    return { name: product.name, description: product.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Ranch Meat` },
      {
        name: "description",
        content:
          loaderData?.description ?? "Traceable cuts from verified ranches on the Ranch Meat marketplace.",
      },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} — Ranch Meat` },
      {
        property: "og:description",
        content: loaderData?.description ?? "Traceable cuts from verified ranches.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const [quantity, setQuantity] = useState(1);
  const add = useCartStore((s) => s.add);

  const { data: product, isPending } = useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => getProduct(slug),
  });
  const { data: farmer } = useQuery({
    queryKey: queryKeys.farmer(product?.farmerId ?? ""),
    queryFn: () => getFarmer(product!.farmerId),
    enabled: Boolean(product?.farmerId),
  });
  const { data: related } = useQuery({
    queryKey: queryKeys.products({ categories: [product?.categorySlug ?? ""] }),
    queryFn: () => getProducts({ categories: [product!.categorySlug] }),
    enabled: Boolean(product?.categorySlug),
  });

  if (isPending || !product) {
    return (
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Skeleton className="aspect-4/3 w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b">
        <div className="mx-auto max-w-[88rem] px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/marketplace" className="transition-colors hover:text-foreground">
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full cursor-pointer rounded-xl object-cover opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{product.categoryName}</Badge>
            {product.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Star className="size-4 fill-warning text-warning" aria-hidden="true" />
              {product.rating}
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" aria-hidden="true" />
              {product.origin}
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="surface-card mt-8 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-3xl font-extrabold tabular-nums">
                  {formatCurrency(product.price)}
                  <span className="text-base font-normal text-muted-foreground">
                    /{product.unit}
                  </span>
                </p>
                {product.compareAtPrice && (
                  <p className="text-sm text-muted-foreground line-through tabular-nums">
                    {formatCurrency(product.compareAtPrice)}
                  </p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.inStock ? `${product.stockKg} kg available` : "Out of stock"}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
                onClick={() => {
                  add(product, quantity);
                  toast.success(`${quantity} kg ${product.name} added`);
                }}
              >
                Add to basket
              </Button>
            </div>

            <Separator className="my-6" />
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Truck className="size-4 shrink-0" aria-hidden="true" />
                Next-day chilled delivery, free over {formatCurrency(120)}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                Cold-chain log and vet certificate attached to your order
              </li>
            </ul>
          </div>

          {farmer && (
            <div className="surface-card mt-6 flex items-center gap-4 p-5">
              <img
                src={farmer.avatar}
                alt=""
                loading="lazy"
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-semibold">
                  <span className="truncate">{farmer.farmName}</span>
                  {farmer.verified && <BadgeCheck className="size-4 shrink-0 text-success" />}
                </p>
                <p className="text-sm text-muted-foreground">
                  {farmer.name} · {farmer.location}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="ml-auto shrink-0">
                <Link to="/farmers">View farm</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-4 pb-16 sm:px-6 lg:px-8">
        <Tabs defaultValue="nutrition">
          <TabsList>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="origin">Origin</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition" className="pt-6">
            <dl className="grid gap-4 sm:grid-cols-4">
              {product.nutrition.map((item) => (
                <div key={item.label} className="surface-card p-5">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="font-display mt-1 text-2xl font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Per 100 g, raw.</p>
          </TabsContent>
          <TabsContent value="origin" className="pt-6 text-sm leading-relaxed text-muted-foreground">
            Raised at {farmer?.farmName ?? "a verified partner farm"} in {product.origin}. Herd
            identity, veterinary sign-off and processing batch are linked to the QR code on the pack.
          </TabsContent>
          <TabsContent
            value="delivery"
            className="pt-6 text-sm leading-relaxed text-muted-foreground"
          >
            Orders placed before 14:00 ship the same day in insulated packaging with live tracking.
            Delivery windows are 30 minutes wide in all served metros.
          </TabsContent>
        </Tabs>

        {related && related.length > 1 && (
          <>
            <h2 className="mt-16 text-2xl font-extrabold">More from {product.categoryName}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {related
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}