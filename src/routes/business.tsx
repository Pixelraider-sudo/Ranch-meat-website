import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, FileText, PackageCheck, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/common/section";
import { Reveal } from "@/components/animations/reveal";
import { NewsletterCta } from "@/components/home/newsletter-cta";

const features = [
  { icon: PackageCheck, title: "Bulk pricing tiers", body: "Volume-based rates that update automatically as your monthly spend grows." },
  { icon: CalendarClock, title: "Recurring orders", body: "Standing weekly orders with substitution rules when a cut runs short." },
  { icon: FileText, title: "Consolidated invoicing", body: "One monthly invoice per venue or per group, exportable to your ledger." },
  { icon: Users, title: "Named account team", body: "A dedicated manager plus direct line to the farms you buy from." },
];

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "For Restaurants, Hotels & Wholesalers | Ranch Meat" },
      {
        name: "description",
        content:
          "Wholesale pricing tiers, recurring standing orders, consolidated invoicing and a named account team for professional kitchens.",
      },
      { property: "og:title", content: "Ranch Meat for Business" },
      {
        property: "og:description",
        content: "Wholesale tiers, standing orders and invoicing built for professional kitchens.",
      },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <>
      <div className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">For business</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Procurement tooling for kitchens at scale
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Restaurants, hotel groups and wholesalers run their standing orders, invoices and
            forecasts on Ranch Meat.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeader eyebrow="Capabilities" title="Everything a buyer asks for on day one" />
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06} className="h-full">
              <div className="surface-card flex h-full gap-5 p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <NewsletterCta />
    </>
  );
}