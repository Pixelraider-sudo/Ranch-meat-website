import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { getCategories, queryKeys } from "@/services/catalog.service";

export const categoriesQuery = {
  queryKey: queryKeys.categories,
  queryFn: getCategories,
};

const categoryOrigins: Record<string, string> = {
  beef: "Laikipia",
  lamb: "Narok",
  poultry: "Uasin Gishu",
  goat: "Narok",
};

export function CategoryGrid() {
  const { data: categories } = useSuspenseQuery(categoriesQuery);

  return (
    <Section>
      <SectionHeader
        eyebrow="Shop by category"
        title="Fresh Kenyan meat from verified ranches"
        description="Browse premium beef, highland lamb, free-range chicken and goat sourced directly from trusted farmers across Kenya."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.06}>
            <Link
              to="/marketplace"
              search={{ category: category.slug }}
              className="group surface-card lift-on-hover relative flex h-full flex-col overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur">
                    {categoryOrigins[category.slug] ?? "Kenya"}
                  </Badge>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-2xl font-bold">
                    {category.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
                    <span>{category.productCount} cuts available</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-semibold text-primary">
                    Explore category
                  </span>

                  <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>

              <span className="absolute inset-0 rounded-3xl ring-0 ring-primary/20 transition-all duration-300 group-hover:ring-2" />
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border bg-secondary/30 p-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-semibold text-primary">
            Verified Kenyan suppliers
          </p>

          <h3 className="mt-1 font-display text-2xl font-bold">
            Every order is linked to its farm of origin.
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse fresh meat from Laikipia, Narok and Uasin Gishu with
            veterinary verification and cold-chain delivery.
          </p>
        </div>

        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Browse Marketplace
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}