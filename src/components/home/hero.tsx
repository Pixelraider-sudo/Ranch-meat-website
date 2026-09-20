import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BadgeCheck, Snowflake, Truck } from "lucide-react";

import heroImage from "@/assets/hero-ranch.jpg";

import { Counter } from "@/components/animations/counter";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: BadgeCheck, label: "Veterinary verified ranches" },
  { icon: Snowflake, label: "Cold-chain protected delivery" },
  { icon: Truck, label: "Nairobi & Kiambu delivery" },
];

const heroStats = [
  { value: 100, suffix: "%", label: "Traceable sourcing" },
  { value: 24, suffix: "/7", label: "Order support" },
  { value: 48, suffix: "h", label: "Fresh delivery window" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Kenyan cattle grazing on a green ranch at sunrise"
          width={1600}
          height={1200}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(102deg, color-mix(in oklab, var(--primary) 94%, transparent) 0%, color-mix(in oklab, var(--primary) 72%, transparent) 42%, color-mix(in oklab, black 20%, transparent) 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[88rem] px-4 pt-24 pb-24 sm:px-6 sm:pt-32 sm:pb-32 lg:px-8">
        <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl text-primary-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="size-1.5 rounded-full bg-success" />
              Launching across Nairobi & Kiambu
            </span>

            <h1 className="text-hero mt-6">
              Premium Kenyan meat,
              <br />
              fully traceable from ranch to table.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              Ranch Meat connects verified Kenyan ranches directly with households, restaurants and
              wholesale buyers through transparent sourcing, cold-chain delivery and secure M-Pesa
              checkout.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/marketplace">
                  Browse Marketplace
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/transparency">How Traceability Works</Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trustBadges.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-primary-foreground/85"
                >
                  <badge.icon className="size-4" aria-hidden="true" />
                  <span>{badge.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-eyebrow text-muted-foreground">Why Ranch Meat</p>

            <dl className="mt-6 space-y-6">
              {heroStats.map((stat) => (
                <div key={stat.label} className="border-b pb-5 last:border-b-0 last:pb-0">
                  <dd className="font-display text-4xl font-extrabold tabular-nums">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>

                  <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl bg-muted/60 p-4">
              <p className="text-sm font-medium text-foreground">Coming soon</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Real-time order tracking, verified farmer profiles and secure M-Pesa payments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
