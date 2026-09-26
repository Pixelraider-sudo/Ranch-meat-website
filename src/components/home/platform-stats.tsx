import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Counter } from "@/components/animations/counter";
import { Reveal } from "@/components/animations/reveal";
import { platformStats } from "@/services/mock-data";

const statIcons = [
  ShieldCheck,
  CheckCircle2,
  Clock3,
  TrendingUp,
];

const statDescriptions = [
  "Trusted ranches supplying verified meat across Kenya.",
  "Successful deliveries completed for homes and businesses.",
  "Orders arriving within their promised delivery window.",
  "Average customer satisfaction across verified purchases.",
];

export function PlatformStats() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-primary-foreground/70">
              Platform Performance
            </p>

            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built to earn trust with every delivery
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
              Ranch Meat combines verified sourcing, reliable logistics and
              transparent delivery records into a marketplace businesses and
              households can depend on.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {platformStats.map((stat, index) => {
            const Icon = statIcons[index] ?? ShieldCheck;

            return (
              <Reveal
                key={stat.id}
                delay={index * 0.08}
                className="h-full"
              >
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/12 hover:shadow-2xl">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white via-white/60 to-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white">
                      <Icon className="size-6" />
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                      Live
                    </span>
                  </div>

                  <div className="mt-8">
                    <div className="font-display text-5xl font-extrabold tracking-tight tabular-nums">
                      <Counter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </div>

                    <h3 className="mt-3 text-lg font-semibold">
                      {stat.label}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                      {statDescriptions[index]}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.35}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-8 backdrop-blur-md">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                  Kenya-first marketplace
                </span>

                <h3 className="mt-5 text-3xl font-extrabold">
                  Every order is backed by verified sourcing and cold-chain
                  delivery.
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/75">
                  Whether you're buying for your home, restaurant or hotel,
                  Ranch Meat keeps quality measurable from the ranch to your
                  doorstep.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-2xl font-bold">Verified Suppliers</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Every partner ranch passes veterinary and compliance checks.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-2xl font-bold">Reliable Logistics</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Chilled deliveries built for Nairobi, Kiambu and expanding
                    counties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}