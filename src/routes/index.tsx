import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { Partners } from "@/components/home/partners";
import { CategoryGrid, categoriesQuery } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ValueProps } from "@/components/home/value-props";
import { TraceTimeline } from "@/components/home/trace-timeline";
import { TopFarmers } from "@/components/home/top-farmers";
import { Testimonials } from "@/components/home/testimonials";
import { PlatformStats } from "@/components/home/platform-stats";
import { RecipesStrip } from "@/components/home/recipes-strip";
import { FaqSection } from "@/components/home/faq-section";
import { NewsletterCta } from "@/components/home/newsletter-cta";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(categoriesQuery);
  },
  head: () => ({
    meta: [
      { title: "Ranch Meat — Traceable Meat, Direct From Verified Ranches" },
      {
        name: "description",
        content:
          "A farm-to-table marketplace with veterinary records, cold-chain telemetry and farm provenance attached to every order.",
      },
      { property: "og:title", content: "Ranch Meat — Traceable Meat From Verified Ranches" },
      {
        property: "og:description",
        content: "Shop grass-fed beef, highland lamb and pasture poultry with full provenance.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <Suspense fallback={<div className="h-96" />}>
        <CategoryGrid />
      </Suspense>
      <FeaturedProducts />
      <ValueProps />
      <TraceTimeline />
      <TopFarmers />
      <PlatformStats />
      <Testimonials />
      <RecipesStrip />
      <FaqSection />
      <NewsletterCta />
    </>
  );
}
