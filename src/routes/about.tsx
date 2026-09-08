import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/common/section";
import { Reveal } from "@/components/animations/reveal";
import { NewsletterCta } from "@/components/home/newsletter-cta";

const milestones = [
  { year: "2019", title: "First ranch onboarded", body: "Hollow Creek ships 40 boxes a week." },
  { year: "2021", title: "Cold-chain telemetry", body: "Sensor logs attached to every order." },
  { year: "2023", title: "Wholesale platform", body: "Restaurants and hotels go live on standing orders." },
  { year: "2026", title: "1,240 verified farms", body: "34 metro regions on next-day delivery." },
];

const pillars = [
  { title: "Mission", body: "Give every buyer the same provenance data a wholesale butcher has." },
  { title: "Vision", body: "A food supply where the default answer to 'where is this from?' is precise." },
  { title: "Impact", body: "Farms keep 82% of retail value, versus 31% in conventional distribution." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ranch Meat — Our Mission & Story" },
      {
        name: "description",
        content:
          "Ranch Meat is building traceable infrastructure for the meat supply chain, so farms keep more value and buyers get real provenance.",
      },
      { property: "og:title", content: "About Ranch Meat" },
      {
        property: "og:description",
        content: "Traceable infrastructure for the meat supply chain, from farm to plate.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <div className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">About</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            We rebuilt the meat supply chain around evidence
          </h1>
        </div>
      </div>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.07} className="h-full">
              <div className="surface-card h-full p-7">
                <p className="text-eyebrow text-primary">{pillar.title}</p>
                <p className="mt-4 text-lg leading-relaxed">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="Timeline" title="How we got here" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.06} className="h-full">
              <li className="surface-card h-full p-6">
                <p className="font-display text-3xl font-extrabold text-primary">
                  {milestone.year}
                </p>
                <p className="mt-3 font-semibold">{milestone.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{milestone.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <NewsletterCta />
    </>
  );
}