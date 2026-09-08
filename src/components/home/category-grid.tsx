import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { getCategories, queryKeys } from "@/services/catalog.service";

export const categoriesQuery = {
  queryKey: queryKeys.categories,
  queryFn: getCategories,
};

export function CategoryGrid() {
  const { data: categories } = useSuspenseQuery(categoriesQuery);

  return (
    <Section>
      <SectionHeader
        eyebrow="Categories"
        title="Sourced by cut, not by shelf"
        description="Four curated ranges, each backed by farms we audit on site."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.06}>
            <Link
              to="/marketplace"
              search={{ category: category.slug }}
              className="group surface-card lift-on-hover relative flex h-full flex-col overflow-hidden"
            >
              <div className="aspect-4/5 overflow-hidden bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                <p className="mt-4 text-xs font-medium text-primary">
                  {category.productCount} products
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}