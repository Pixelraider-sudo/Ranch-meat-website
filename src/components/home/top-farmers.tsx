import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { getFarmers, queryKeys } from "@/services/catalog.service";

const farmerImages: Record<string, string> = {
  f1: "https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg",
  f2: "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5172/image/s1300x1300/LC202403_IllaingarunyoniConservancy_002_581550_reduced.jpg",
  f3: "https://ilriclippings.wordpress.com/wp-content/uploads/2018/01/17ilri_kapiti_cattleatkapiti04_cropped.jpg",
};

export function TopFarmers() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.farmers,
    queryFn: getFarmers,
  });

  return (
    <Section className="bg-secondary/10">
      <SectionHeader
        eyebrow="Featured Ranches"
        title="Meet the producers behind every order"
        description="Every ranch is inspected, veterinary verified and monitored for delivery performance before joining Ranch Meat."
        action={
          <Button asChild variant="outline">
            <Link to="/farmers">
              View all ranches
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
        align="center"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[560px] rounded-3xl"
            />
          ))
          : data?.slice(0, 3).map((farmer, index) => (
            <Reveal
              key={farmer.id}
              delay={index * 0.08}
              className="h-full"
            >
              <article className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={farmerImages[farmer.id] ?? farmer.avatar}
                    alt={`${farmer.farmName} in ${farmer.county}`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge className="bg-white/90 text-black backdrop-blur">
                      <ShieldCheck className="mr-1 size-3.5 text-primary" />
                      Verified
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-black/40 text-white backdrop-blur"
                    >
                      {farmer.county}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display text-2xl font-bold">
                      {farmer.farmName}
                    </h3>

                    <p className="mt-1 text-sm text-white/85">
                      {farmer.name}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4 text-primary" />
                      {farmer.location}, {farmer.county}
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-semibold">
                      <Star className="size-4 fill-warning text-warning" />
                      {farmer.rating}
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {farmer.story}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {farmer.certifications.map((cert) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3 border-t pt-6 text-center">
                    <div>
                      <Truck className="mx-auto mb-2 size-5 text-primary" />
                      <p className="font-display text-xl font-bold">
                        {farmer.metrics.onTimeRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        On time
                      </p>
                    </div>

                    <div>
                      <Users className="mx-auto mb-2 size-5 text-primary" />
                      <p className="font-display text-xl font-bold">
                        {farmer.metrics.repeatRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Repeat
                      </p>
                    </div>

                    <div>
                      <ShieldCheck className="mx-auto mb-2 size-5 text-primary" />
                      <p className="font-display text-xl font-bold">
                        {Math.round(farmer.metrics.orders / 1000)}k
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Orders
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="mt-8 w-full"
                    variant="outline"
                  >
                    <Link to="/farmers">
                      View Ranch Profile
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
      </div>

      <div className="mt-16 rounded-3xl border bg-card p-8 shadow-sm">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              126+
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified ranch partners
            </p>
          </div>

          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              98.7%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              On-time delivery
            </p>
          </div>

          <div>
            <p className="font-display text-4xl font-extrabold text-primary">
              18,500+
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Orders delivered
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}