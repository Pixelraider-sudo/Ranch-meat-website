import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  QrCode,
  Smartphone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { ProductCard } from "@/components/marketplace/product-card";

import {
  getFarmer,
  getProduct,
  getProducts,
  queryKeys,
} from "@/services/catalog.service";

import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/marketplace/$slug")({
  loader: async ({ params }) => {
    const product = await getProduct(params.slug);
    if (!product) throw notFound();

    return {
      name: product.name,
      description: product.description,
    };
  },

  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} | Ranch Meat Kenya` },
      {
        name: "description",
        content:
          loaderData?.description ??
          "Traceable premium meat from verified Kenyan ranches.",
      },
      {
        property: "og:title",
        content: `${loaderData?.name ?? "Product"} | Ranch Meat`,
      },
      {
        property: "og:description",
        content:
          loaderData?.description ??
          "Premium traceable meat from verified ranches.",
      },
    ],
  }),

  component: ProductPage,
});

/* Temporary real photography.
   PostgreSQL will provide these later. */
const productGallery: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
  ],
};

const farmerImages: Record<string, string> = {
  f1: "https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg",
  f2: "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5172/image/s1300x1300/LC202403_IllaingarunyoniConservancy_002_581550_reduced.jpg",
  f3: "https://ilriclippings.wordpress.com/wp-content/uploads/2018/01/17ilri_kapiti_cattleatkapiti04_cropped.jpg",
};

function ProductPage() {
  const { slug } = Route.useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

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
    queryKey: queryKeys.products({
      categories: [product?.categorySlug ?? ""],
    }),
    queryFn: () =>
      getProducts({
        categories: [product!.categorySlug],
      }),
    enabled: Boolean(product?.categorySlug),
  });

  const images = useMemo(
    () => productGallery[product?.slug ?? ""] ?? productGallery.default,
    [product?.slug],
  );

  if (isPending || !product) {
    return (
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  const stockColor =
    product.stockKg > 25
      ? "text-green-600"
      : product.stockKg > 8
        ? "text-amber-600"
        : "text-red-600";

  return (
    <>
      <nav className="border-b">
        <div className="mx-auto max-w-[88rem] px-4 py-4 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-foreground">
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[88rem] gap-12 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl bg-secondary">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-xl border-2 transition ${selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-border"
                  }`}
              >
                <img
                  src={image}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{product.categoryName}</Badge>
            {product.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl font-extrabold">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Star className="size-4 fill-warning text-warning" />
              {product.rating}
              <span>({product.reviewCount})</span>
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="size-4" />
              {product.origin}
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="surface-card mt-8 rounded-3xl p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-4xl font-extrabold">
                  {formatCurrency(product.price)}
                  <span className="text-base font-normal text-muted-foreground">
                    /{product.unit}
                  </span>
                </p>

                {product.compareAtPrice && (
                  <p className="mt-1 text-sm line-through text-muted-foreground">
                    {formatCurrency(product.compareAtPrice)}
                  </p>
                )}
              </div>

              <p className={`text-sm font-medium ${stockColor}`}>
                {product.stockKg} kg available
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-xl border p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-4" />
                </Button>

                <span className="w-10 text-center">{quantity}</span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <Button
                className="flex-1"
                size="lg"
                onClick={() => {
                  add(product, quantity);
                  toast.success(`${quantity} kg added to basket`);
                }}
              >
                Add to Basket
              </Button>
            </div>

            <Button
              className="mt-4 w-full bg-[#00A651] hover:bg-[#008F46]"
              size="lg"
              onClick={() =>
                toast.info("M-Pesa checkout arrives in the next phase.")
              }
            >
              <Smartphone className="size-4" />
              Buy with M-Pesa
            </Button>

            <Separator className="my-6" />

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="size-4" />
                Same-day dispatch before 2:00 PM.
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                Cold-chain verified throughout delivery.
              </div>

              <div className="flex items-center gap-2">
                <QrCode className="size-4" />
                QR code reveals farm, vet and processing history.
              </div>
            </div>
          </div>

          {farmer && (
            <div className="surface-card mt-6 rounded-3xl p-5">
              <div className="flex gap-4">
                <img
                  src={farmerImages[farmer.id] ?? farmer.avatar}
                  alt={farmer.farmName}
                  className="size-16 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{farmer.farmName}</h3>

                    {farmer.verified && (
                      <BadgeCheck className="size-4 text-green-600" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {farmer.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {farmer.location}, {farmer.county}
                  </p>
                </div>
              </div>

              <Button asChild variant="outline" className="mt-5 w-full">
                <Link to="/farmers">View Farmer Profile</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 pb-16">
        <Tabs defaultValue="nutrition">
          <TabsList>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="pt-6">
            <div className="grid gap-4 sm:grid-cols-4">
              {product.nutrition.map((item) => (
                <div key={item.label} className="surface-card p-5">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Values are per 100g.
            </p>
          </TabsContent>

          <TabsContent value="traceability" className="pt-6">
            <div className="surface-card rounded-3xl p-6">
              <h3 className="font-display text-xl font-bold">
                Farm-to-table journey
              </h3>

              <div className="mt-6 space-y-5">
                {[
                  "Livestock registered",
                  "Veterinary inspection",
                  "Processing",
                  "Cold storage",
                  "Delivery",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-medium">{step}</p>

                      <p className="text-sm text-muted-foreground">
                        Timestamped records become available through the QR code
                        after purchase.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="pt-6">
            <div className="surface-card rounded-3xl p-6">
              <h3 className="font-display text-xl font-bold">
                Delivery across Kenya
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-secondary/50 p-4">
                  <p className="font-semibold">Nairobi</p>
                  <p className="text-sm text-muted-foreground">
                    Same-day delivery available.
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/50 p-4">
                  <p className="font-semibold">Kiambu</p>
                  <p className="text-sm text-muted-foreground">
                    Next-day chilled delivery.
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/50 p-4">
                  <p className="font-semibold">Other Counties</p>
                  <p className="text-sm text-muted-foreground">
                    1–3 business days depending on coverage.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {related && related.length > 1 && (
          <>
            <h2 className="mt-16 font-display text-3xl font-bold">
              More from {product.categoryName}
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {related
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item, index) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    index={index}
                  />
                ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}