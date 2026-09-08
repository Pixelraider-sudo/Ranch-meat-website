import { Counter } from "@/components/animations/counter";
import { Reveal } from "@/components/animations/reveal";
import { platformStats } from "@/services/mock-data";

export function PlatformStats() {
  return (
    <section className="gradient-canopy text-primary-foreground">
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.06}>
              <div>
                <dd className="font-display text-4xl font-extrabold tabular-nums sm:text-5xl">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-primary-foreground/80">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}