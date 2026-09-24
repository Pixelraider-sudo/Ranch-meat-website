import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPinned, ShieldCheck, Snowflake, Truck } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Counter } from "@/components/animations/counter";
import { Section, SectionHeader } from "@/components/common/section";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { Button } from "@/components/ui/button";

const milestones = [
  {
    year: "2024",
    title: "First verified ranches",
    body: "Laikipia, Narok and Uasin Gishu producers joined the platform.",
  },
  {
    year: "2025",
    title: "Cold-chain monitoring",
    body: "Temperature-controlled delivery became part of every order.",
  },
  {
    year: "2026",
    title: "Restaurant partnerships",
    body: "Hotels, butcheries and restaurants began ordering at scale.",
  },
  {
    year: "Today",
    title: "Growing across Kenya",
    body: "Expanding from Nairobi and Kiambu into more counties.",
  },
];

const values = [
  {
    title: "Verified suppliers",
    body: "Every listed ranch passes document review before selling on the platform.",
    icon: ShieldCheck,
  },
  {
    title: "Cold-chain delivery",
    body: "Products stay chilled from dispatch to delivery.",
    icon: Snowflake,
  },
  {
    title: "Farm transparency",
    body: "Buyers can trace products back to the supplying ranch.",
    icon: MapPinned,
  },
];

const coverage = ["Nairobi", "Kiambu", "Laikipia", "Narok", "Uasin Gishu"];

const impact = [
  { label: "Verified ranches", value: 126, suffix: "+" },
  { label: "Orders delivered", value: 18500, suffix: "+" },
  { label: "On-time delivery", value: 98.7, suffix: "%" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ranch Meat | Kenya's Trusted Meat Marketplace" },
      {
        name: "description",
        content:
          "Learn how Ranch Meat connects verified Kenyan ranches with households, restaurants and wholesalers through a transparent supply chain.",
      },
      {
        property: "og:title",
        content: "About Ranch Meat",
      },
      {
        property: "og:description",
        content: "Kenya's trusted marketplace for traceable meat from verified ranches.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg"
            alt="Kenya cattle ranch Laikipia landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        </div>

        <div className="mx-auto max-w-[88rem] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
                About Ranch Meat
              </p>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl">
                Building a more transparent meat marketplace for Kenya.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                Ranch Meat connects verified Kenyan ranches with households, restaurants and
                wholesalers through trusted sourcing, cold-chain delivery and traceable products.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/marketplace">
                    Browse Marketplace
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link to="/farmers">Meet Our Ranches</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Our mission"
          title="Trust starts at the ranch."
          description="We're building a marketplace where buyers know where their meat comes from and producers can sell through a transparent platform."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                The food supply chain often hides where products originate. Ranch Meat makes
                provenance part of the buying experience by connecting verified producers directly
                with customers.
              </p>

              <p>
                Our platform is designed for households, butcheries, restaurants and wholesalers who
                want consistent quality and greater visibility into sourcing.
              </p>

              <div className="grid gap-4 pt-3 sm:grid-cols-2">
                {[
                  "Verified suppliers",
                  "Cold-chain delivery",
                  "Traceable sourcing",
                  "Restaurant-ready supply",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg"
                alt="Kenyan rancher inspecting cattle Laikipia"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="How it works"
          title="A straightforward journey from ranch to table."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.07}>
              <div className="surface-card h-full p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="size-6" />
                </span>

                <h3 className="mt-5 text-xl font-bold">{value.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="Timeline" title="Growing with Kenyan producers." />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.06}>
              <li className="surface-card h-full p-6">
                <p className="text-3xl font-extrabold text-primary">{milestone.year}</p>

                <p className="mt-4 font-semibold">{milestone.title}</p>

                <p className="mt-3 text-sm text-muted-foreground">{milestone.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader eyebrow="Coverage" title="Expanding from Nairobi into more counties." />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Ranch Meat currently focuses on Nairobi, Kiambu and nearby counties while expanding
                relationships with verified ranches across Kenya.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {coverage.map((county) => (
                  <div
                    key={county}
                    className="flex items-center gap-3 rounded-xl border bg-card p-4"
                  >
                    <MapPinned className="size-5 text-primary" />
                    <span>{county}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg"
                alt="Kenyan cattle ranch in Laikipia"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="Platform impact" title="Growing trust one delivery at a time." />

        <div className="grid gap-6 md:grid-cols-3">
          {impact.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="surface-card p-8 text-center">
                <p className="text-4xl font-extrabold text-primary">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>

                <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="surface-card overflow-hidden p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Join the marketplace
                </p>

                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                  Whether you're buying or supplying, Ranch Meat is built for trusted trade.
                </h2>

                <p className="mt-5 max-w-xl text-muted-foreground">
                  Browse verified products, discover trusted ranches or grow your business through a
                  transparent supply chain.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/marketplace">
                      Shop Now
                      <Truck className="size-4" />
                    </Link>
                  </Button>

                  <Button asChild size="lg" variant="outline">
                    <Link to="/farmers">Explore Ranches</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg"
                  alt="Kenyan cattle ranch in Laikipia"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <NewsletterCta />
    </>
  );
}
