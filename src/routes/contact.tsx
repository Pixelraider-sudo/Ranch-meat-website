import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const contactCards = [
  {
    icon: Users,
    title: "Customer Support",
    body: "Order questions, deliveries and product enquiries.",
    action: "support@ranchmeat.co.ke",
  },
  {
    icon: Building2,
    title: "Business Sales",
    body: "Restaurants, hotels, butcheries and wholesalers.",
    action: "sales@ranchmeat.co.ke",
  },
  {
    icon: Truck,
    title: "Supplier Onboarding",
    body: "Join Ranch Meat as a verified producer.",
    action: "farmers@ranchmeat.co.ke",
  },
];

const coverage = [
  "Nairobi",
  "Kiambu",
  "Laikipia",
  "Narok",
  "Uasin Gishu",
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ranch Meat | Sales, Support & Partnerships" },
      {
        name: "description",
        content:
          "Reach Ranch Meat for customer support, wholesale enquiries or verified ranch partnerships across Kenya.",
      },
      { property: "og:title", content: "Contact Ranch Meat" },
      {
        property: "og:description",
        content:
          "Customer support, business sales and ranch partnerships across Kenya.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
            alt="Refrigerated delivery truck"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
        </div>

        <div className="mx-auto max-w-[88rem] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
                Contact Ranch Meat
              </p>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl">
                Let's get your next delivery moving.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                Whether you're buying for your family, sourcing for a restaurant
                or joining as a verified ranch, our team is ready to help.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Contact channels"
          title="Reach the right team faster."
          description="Different enquiries go directly to the people who handle them."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {contactCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.06}>
              <div className="surface-card h-full p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <card.icon className="size-6" />
                </span>

                <h3 className="mt-5 text-xl font-bold">{card.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>

                <p className="mt-5 text-sm font-semibold text-primary">
                  {card.action}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-eyebrow text-primary">Head office</p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Nairobi operations.
              </h2>

              <p className="mt-5 text-muted-foreground leading-relaxed">
                Our operations team coordinates verified suppliers,
                refrigerated logistics and customer support from Nairobi while
                working with ranches across Kenya.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-primary" />
                  hello@ranchmeat.co.ke
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-primary" />
                  +254 700 123 456
                </li>

                <li className="flex items-center gap-3">
                  <MapPin className="size-5 text-primary" />
                  Westlands, Nairobi, Kenya
                </li>

                <li className="flex items-center gap-3">
                  <Clock3 className="size-5 text-primary" />
                  Daily • 7:00 AM – 9:00 PM
                </li>
              </ul>

              <Button
                asChild
                className="mt-8"
                size="lg"
              >
                <a
                  href="https://wa.me/254700123456"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Support
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              className="surface-card space-y-5 p-8"
              onSubmit={(event) => {
                event.preventDefault();

                toast.success("Message sent", {
                  description: "We'll reply within one business day.",
                });

                event.currentTarget.reset();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+254 700 123 456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Business (optional)</Label>
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label>Enquiry type</Label>

                <Select defaultValue="customer">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose enquiry type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="customer">
                      Customer Support
                    </SelectItem>

                    <SelectItem value="restaurant">
                      Restaurant / Hotel
                    </SelectItem>

                    <SelectItem value="wholesale">
                      Wholesale
                    </SelectItem>

                    <SelectItem value="supplier">
                      Supplier Onboarding
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>

                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Service area"
          title="Currently serving."
          description="We're expanding county by county with verified producers."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {coverage.map((county, index) => (
            <Reveal key={county} delay={index * 0.05}>
              <div className="surface-card flex items-center gap-3 p-5">
                <Store className="size-5 text-primary" />

                <span className="font-medium">{county}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
