import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ClipboardCheck, MapPin, ShieldCheck, Truck, Users } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { FarmerCard } from "@/components/farmers/farmer-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { getFarmers, queryKeys } from "@/services/catalog.service";

export const Route = createFileRoute("/farmers")({
  head: () => ({
    meta: [
      { title: "Verified Farmers & Ranches | Ranch Meat Kenya" },
      {
        name: "description",
        content:
          "Meet the verified Kenyan ranches behind every Ranch Meat order and learn how farmers join our marketplace.",
      },
      {
        property: "og:title",
        content: "Verified Farmers & Ranches | Ranch Meat",
      },
      {
        property: "og:description",
        content:
          "Real Kenyan ranches with verified sourcing, veterinary inspections and annual audits.",
      },
    ],
  }),
  component: FarmersPage,
});

/**
 * Temporary online photography.
 * Later these URLs will come from PostgreSQL.
 */
const heroImage =
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80";

const galleryImages = [
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
];

const farmerImages: Record<string, string> = {
  f1: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80",
  f2: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
  f3: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
};

function FarmersPage() {
  const { data = [], isPending } = useQuery({
    queryKey: queryKeys.farmers,
    queryFn: getFarmers,
  });

  const verifiedCount = data.filter((farmer) => farmer.verified).length;
  const counties = new Set(data.map((farmer) => farmer.county)).size;

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Kenyan cattle ranch"
          className="absolute inset-0 size-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
                Verified Ranches
              </p>

              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Real Kenyan farmers behind every premium cut.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-white/85">
                Every Ranch Meat supplier is verified through documentation, veterinary inspections
                and on-site reviews before selling on the marketplace.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/register">
                    Become a Partner Farmer
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn the Verification Process
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <Badge className="bg-white/15 text-white backdrop-blur">Vet Verified</Badge>
                <Badge className="bg-white/15 text-white backdrop-blur">Annual Audits</Badge>
                <Badge className="bg-white/15 text-white backdrop-blur">Cold Chain Ready</Badge>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/70">Marketplace Snapshot</p>

              <div className="mt-8 grid gap-5">
                <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span className="flex items-center gap-3 text-white">
                    <ShieldCheck className="size-5 text-green-300" />
                    Verified Ranches
                  </span>

                  <span className="text-2xl font-bold text-white">{verifiedCount}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span className="flex items-center gap-3 text-white">
                    <MapPin className="size-5 text-green-300" />
                    Counties
                  </span>

                  <span className="text-2xl font-bold text-white">{counties}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span className="flex items-center gap-3 text-white">
                    <Users className="size-5 text-green-300" />
                    Partner Network
                  </span>

                  <span className="text-2xl font-bold text-white">Growing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-eyebrow text-primary">Verification Process</p>

          <h2 className="mt-3 font-display text-3xl font-bold">
            Every supplier earns trust before selling.
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Customers deserve confidence. Every Ranch Meat partner completes a
            structured verification process before appearing on the marketplace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="surface-card rounded-2xl p-6">
              <ClipboardCheck className="size-8 text-primary" />

              <h3 className="mt-4 font-semibold">Document Review</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Ownership records, livestock documentation and compliance checks are reviewed before
                onboarding.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card rounded-2xl p-6">
              <ShieldCheck className="size-8 text-primary" />

              <h3 className="mt-4 font-semibold">Veterinary Inspection</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Veterinary verification ensures livestock health standards are
                marketplace approval.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="surface-card rounded-2xl p-6">
              <Truck className="size-8 text-primary" />

              <h3 className="mt-4 font-semibold">Delivery Readiness</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Cold-chain handling and transport standards are reviewed before
                suppliers begin selling.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-secondary/30">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-eyebrow text-primary">Life on the Ranch</p>

            <h2 className="mt-3 font-display text-3xl font-bold">
              Authentic ranching across Kenya.
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Real livestock operations, grazing fields and working ranches—not
              stock-looking AI artwork.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {galleryImages.map((image, index) => (
              <Reveal key={image} delay={index * 0.05}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={image}
                    alt="Kenyan ranch"
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-eyebrow text-primary">Meet Our Ranches</p>

          <h2 className="mt-3 font-display text-3xl font-bold">
            Verified farmers across Kenya.
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore our growing network of verified suppliers, their counties,
            certifications and marketplace performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[440px] rounded-2xl"
              />
            ))
            : data.map((farmer, index) => (
              <Reveal
                key={farmer.id}
                delay={index * 0.06}
                className="h-full"
              >
                <FarmerCard
                  farmer={{
                    ...farmer,
                    avatar: farmerImages[farmer.id] ?? farmer.avatar,
                  }}
                />
              </Reveal>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="surface-card rounded-3xl p-10 text-center">
          <p className="text-eyebrow text-primary">Join Ranch Meat</p>

          <h2 className="mt-3 font-display text-3xl font-bold">
            Sell directly to households and businesses.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you're a livestock farmer in Kenya, Ranch Meat will soon provide verified seller
            accounts, transparent payouts and a dedicated farmer dashboard for inventory, orders and
            earnings.
          </p>

          <Button asChild size="lg" className="mt-8">
            <Link to="/register">
              Apply as a Farmer
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
