import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarClock,
  FileText,
  PackageCheck,
  Users,
  Truck,
  Receipt,
  Store,
  UtensilsCrossed,
  Building2,
  Factory,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: PackageCheck,
    title: "Bulk pricing tiers",
    body: "Automatic volume discounts as your monthly purchasing grows.",
  },
  {
    icon: CalendarClock,
    title: "Standing orders",
    body: "Schedule recurring deliveries with intelligent substitutions.",
  },
  {
    icon: FileText,
    title: "Consolidated invoicing",
    body: "Monthly invoices with downloadable VAT-ready records.",
  },
  {
    icon: Users,
    title: "Dedicated account manager",
    body: "Direct support for procurement teams and kitchen operations.",
  },
];

const businessTypes = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    body: "Premium cuts delivered on predictable schedules.",
  },
  {
    icon: Building2,
    title: "Hotels",
    body: "Centralized procurement across multiple properties.",
  },
  {
    icon: Store,
    title: "Butcheries",
    body: "Reliable wholesale supply with consistent quality.",
  },
  {
    icon: Factory,
    title: "Wholesalers",
    body: "High-volume fulfillment with transparent sourcing.",
  },
];

const workflow = [
  "Create your business account",
  "Choose recurring delivery schedules",
  "Approve procurement requests",
  "Receive chilled deliveries",
  "Track invoices and order history",
];

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      {
        title: "Business Procurement | Ranch Meat Kenya",
      },
      {
        name: "description",
        content:
          "Wholesale meat procurement for restaurants, hotels, butcheries and wholesalers across Kenya.",
      },
      {
        property: "og:title",
        content: "Ranch Meat Business",
      },
      {
        property: "og:description",
        content: "Recurring deliveries, bulk pricing and enterprise procurement tools.",
      },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-eyebrow text-primary">For Business</p>

              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Procurement built for Kenyan food businesses.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Ranch Meat helps restaurants, hotels, butcheries and wholesalers manage recurring
                deliveries, bulk pricing and verified sourcing from trusted ranches.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/register">
                    Create Business Account
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <Badge>Bulk Orders</Badge>
                <Badge>Recurring Deliveries</Badge>
                <Badge>Verified Ranches</Badge>
              </div>
            </div>

            <div className="surface-card rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Business Dashboard</p>

                  <p className="font-display text-xl font-bold">Procurement Overview</p>
                </div>

                <span className="grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Receipt className="size-7" />
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="text-sm text-muted-foreground">Next Delivery</p>

                  <p className="mt-1 font-semibold">Tomorrow · 8:00 AM</p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="text-sm text-muted-foreground">Monthly Orders</p>

                  <p className="mt-1 font-semibold">Standing Weekly Schedule</p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="text-sm text-muted-foreground">Account Status</p>

                  <div className="mt-1 flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    <span className="font-semibold">Verified Business</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Who It's For" title="Built for every professional buyer." />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {businessTypes.map((business, index) => (
            <Reveal key={business.title} delay={index * 0.05}>
              <div className="surface-card rounded-2xl p-6">
                <business.icon className="size-8 text-primary" />

                <h3 className="mt-4 font-semibold">{business.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">{business.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <SectionHeader eyebrow="Capabilities" title="Everything procurement teams expect." />

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <div className="surface-card flex h-full gap-5 rounded-2xl p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>

                <div>
                  <h3 className="font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How It Works" title="From order planning to chilled delivery." />

        <div className="grid gap-6 md:grid-cols-5">
          {workflow.map((step, index) => (
            <Reveal key={step} delay={index * 0.05}>
              <div className="surface-card rounded-2xl p-5 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>

                <p className="mt-4 text-sm font-medium">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <SectionHeader eyebrow="Logistics" title="Built for reliable operations." />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="surface-card rounded-2xl p-6">
            <Truck className="size-8 text-primary" />

            <h3 className="mt-4 font-semibold">Chilled Fleet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Cold-chain deliveries designed for restaurants and wholesale customers.
            </p>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <ShieldCheck className="size-8 text-primary" />

            <h3 className="mt-4 font-semibold">Verified Supply</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Every supplier goes through a verification process before joining the marketplace.
            </p>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <Receipt className="size-8 text-primary" />

            <h3 className="mt-4 font-semibold">Business Records</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Downloadable invoices and complete order history for accounting.
            </p>
          </div>
        </div>
      </Section>

      <NewsletterCta />
    </>
  );
}
