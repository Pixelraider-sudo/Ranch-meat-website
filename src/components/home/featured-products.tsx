import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
        eyebrow="Featured"
        title="This week from the ranches"
        description="Hand-selected cuts with live stock levels and farm provenance."
        action={
          <Button asChild variant="outline">
            <Link to="/marketplace">View all products</Link>
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : data?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
      </div>
    </Section>
  );
}