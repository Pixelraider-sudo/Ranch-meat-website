import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CategoryGrid, categoriesQuery } from "@/components/home/category-grid";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { Partners } from "@/components/home/partners";
import { PlatformStats } from "@/components/home/platform-stats";
import { RecipesStrip } from "@/components/home/recipes-strip";
import { Testimonials } from "@/components/home/testimonials";
import { TopFarmers } from "@/components/home/top-farmers";
import { TraceTimeline } from "@/components/home/trace-timeline";
import { ValueProps } from "@/components/home/value-props";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(categoriesQuery);
  },

  head: () => ({
    meta: [
      {
        title: "Ranch Meat — Kenya's Premium Meat Marketplace",
      },
      {
        name: "description",
        content:
          "Order premium beef, lamb and poultry from verified Kenyan ranches with cold-chain delivery, transparent sourcing and secure M-Pesa checkout.",
      },
      {
        name: "keywords",
        content:
          "Kenya meat marketplace, beef Nairobi, lamb Kenya, poultry, M-Pesa, ranch meat, farm to table",
      },
      {
        property: "og:title",
        content: "Ranch Meat — Kenya's Premium Meat Marketplace",
      },
      {
        property: "og:description",
        content: "Verified ranches, cold-chain delivery and premium meat across Kenya.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "en_KE",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Ranch Meat",
      },
      {
        name: "twitter:description",
        content: "Premium traceable meat delivered across Kenya.",
      },
    ],
  }),

  component: HomePage,
});

function CategoriesFallback() {
  return (
    <div className="container py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      <Partners />

      <Suspense fallback={<CategoriesFallback />}>
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
