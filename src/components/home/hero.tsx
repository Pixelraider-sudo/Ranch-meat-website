import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BadgeCheck, Snowflake, Truck } from "lucide-react";
import heroImage from "@/assets/hero-ranch.jpg";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/animations/counter";

const trustBadges = [
  { icon: BadgeCheck, label: "Vet-verified farms" },
  { icon: Snowflake, label: "Unbroken cold chain" },
  { icon: Truck, label: "Next-day delivery" },
];

const heroStats = [
  { value: 1240, suffix: "+", label: "Verified farms" },
  { value: 99.2, suffix: "%", label: "On-time delivery" },
  { value: 48, suffix: "h", label: "Farm to door" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Cattle grazing on misty pasture at sunrise"
          width={1600}
          height={1200}
          className="size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, color-mix(in oklab, var(--primary) 92%, transparent) 0%, color-mix(in oklab, var(--primary) 62%, transparent) 46%, transparent 86%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[88rem] px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32 lg:px-8">
        <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-primary-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="size-1.5 rounded-full bg-success" />
              Now serving 34 metro regions
            </span>

            <h1 className="text-hero mt-6">
              Every cut,
              <br />
              traced to the field.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              Ranch Meat connects verified ranches directly with households, restaurants and
              wholesale buyers — with veterinary records, cold-chain telemetry and farm provenance
              attached to every order.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/marketplace">
                  Browse the marketplace
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/transparency">See how tracing works</Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trustBadges.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-primary-foreground/85"
                >
                  <badge.icon className="size-4" aria-hidden="true" />
                  {badge.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-eyebrow text-muted-foreground">Platform at a glance</p>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}