import {
  ShieldCheck,
  ThermometerSnowflake,
  Wallet,
  Truck,
  ChevronRight,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Kenyan ranches",
    body: "Every partner ranch goes through veterinary inspection, document verification and ongoing compliance checks before products go live.",
    highlight: "100% verified suppliers",
  },
  {
    icon: ThermometerSnowflake,
    title: "Cold-chain protected",
    body: "Orders travel in temperature-controlled vehicles with live monitoring from dispatch to your doorstep.",
    highlight: "0–2°C monitored delivery",
  },
  {
    icon: Wallet,
    title: "Built for M-Pesa",
    body: "Fast checkout for households today, with secure M-Pesa payments becoming the default payment experience.",
    highlight: "Kenya-first payments",
  },
  {
    icon: Truck,
    title: "Reliable delivery",
    body: "Designed for Nairobi, Kiambu and expanding counties with scheduled delivery windows for homes and businesses.",
    highlight: "Home & wholesale delivery",
  },
];

export function ValueProps() {
  return (
    <Section className="bg-secondary/20">
      <SectionHeader
        eyebrow="Why choose Ranch Meat"
        title="Everything built around trust, freshness and speed"
        description="Buying meat online should feel as trustworthy as buying directly from a ranch. Every order combines verified sourcing, cold-chain delivery and transparent pricing."
        align="center"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08} className="h-full">
            <article className="group surface-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

              <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <value.icon className="size-7" aria-hidden="true" />
              </span>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {value.highlight}
              </p>

              <h3 className="mt-2 text-xl font-bold leading-tight">
                {value.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {value.body}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-70 transition-all duration-300 group-hover:opacity-100">
                Learn more
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-10">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              100%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified ranch partners
            </p>
          </div>

          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              0–2°C
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Cold-chain monitored delivery
            </p>
          </div>

          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              24/7
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Customer support
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}