import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/common/section";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProductCardSkeleton } from "@/components/marketplace/product-card-skeleton";
import { getFeaturedProducts, queryKeys } from "@/services/catalog.service";

export function FeaturedProducts() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.featured,
    queryFn: getFeaturedProducts,
  });

  return (
    <Section className="bg-secondary/40">
      <SectionHeader
        eyebrow="Featured this week"
        title="Fresh picks from verified Kenyan ranches"
        description="Premium cuts selected for quality, freshness and fast chilled delivery across Nairobi, Kiambu and nearby counties."
        action={
          <Button asChild variant="outline">
            <Link to="/marketplace">
              View all products
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge className="bg-primary/10 text-primary">
          <Sparkles className="mr-1 size-3.5" />
          Best Sellers
        </Badge>

        <Badge variant="secondary">Fresh This Week</Badge>

        <Badge variant="secondary">Cold-Chain Delivery</Badge>

        <Badge variant="secondary">Vet Verified</Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending
          ? Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
          : data?.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
      </div>

      {!isPending && data && data.length > 0 && (
        <div className="mt-12 rounded-3xl border bg-background p-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold text-primary">
                Fresh stock arrives every week
              </p>

              <h3 className="mt-1 font-display text-2xl font-bold">
                Discover more than {data.length} premium cuts
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Browse beef, lamb, goat and free-range chicken from trusted Kenyan ranches with full farm traceability.
              </p>
            </div>

            <Button asChild size="lg">
              <Link to="/marketplace">
                Explore Marketplace
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
