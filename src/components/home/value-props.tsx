import { Leaf, LineChart, ShieldCheck, Thermometer } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";

const values = [
  {
    icon: ShieldCheck,
    title: "Audited supply",
    body: "On-site farm inspections, veterinary sign-off and annual re-audits keep the verified badge honest.",
  },
  {
    icon: Thermometer,
    title: "Sensor-backed cold chain",
    body: "Temperature telemetry travels with the crate — every order carries its own log.",
  },
  {
    icon: LineChart,
    title: "Operations-grade tooling",
    body: "Standing orders, tiered wholesale pricing, invoicing and forecasting for kitchens at scale.",
  },
  {
    icon: Leaf,
    title: "Regenerative by default",
    body: "Rotational grazing, short-haul transit and carbon-neutral last mile on every delivery.",
  },
];

export function ValueProps() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Why Ranch Meat"
        title="Built like infrastructure, not a storefront"
        description="The marketplace is the surface. Underneath sits verification, logistics and data that professional buyers can rely on."
        align="center"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.06} className="h-full">
            <div className="surface-card h-full p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <value.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
