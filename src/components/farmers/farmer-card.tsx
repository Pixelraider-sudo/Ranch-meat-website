import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, Star, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Farmer } from "@/types";

/**
 * Temporary real-world online photography.
 * Later these URLs will come directly from PostgreSQL.
 */
const farmerImages: Record<string, string> = {
  f1: "https://panagrimedia.com/wp-content/uploads/2022/07/livestock-photo-2-1024x577.jpg",
  f2: "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5172/image/s1300x1300/LC202403_IllaingarunyoniConservancy_002_581550_reduced.jpg",
  f3: "https://ilriclippings.wordpress.com/wp-content/uploads/2018/01/17ilri_kapiti_cattleatkapiti04_cropped.jpg",
};

export function FarmerCard({ farmer }: { farmer: Farmer }) {
  const image = farmerImages[farmer.id] ?? farmer.avatar;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="group surface-card flex h-full flex-col overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${farmer.farmName} ranch in ${farmer.county}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {farmer.verified && (
          <div className="absolute left-4 top-4">
            <Badge className="bg-white/90 text-foreground backdrop-blur">
              <ShieldCheck className="mr-1 size-3.5 text-primary" />
              Verified Ranch
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold leading-tight">{farmer.farmName}</h3>

            <p className="mt-1 text-sm text-muted-foreground">{farmer.name}</p>

            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span>
                {farmer.location}, {farmer.county}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-1 text-sm font-semibold">
            <Star className="size-4 fill-warning text-warning" />
            {farmer.rating}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{farmer.story}</p>

        {/* Certifications */}
        <div className="mt-5 flex flex-wrap gap-2">
          {farmer.certifications.map((cert) => (
            <Badge key={cert} variant="secondary">
              {cert}
            </Badge>
          ))}
        </div>

        {/* Performance */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-6 text-center">
          <div>
            <p className="font-display text-lg font-bold">{farmer.metrics.onTimeRate}%</p>
            <p className="text-xs text-muted-foreground">On time</p>
          </div>

          <div>
            <p className="font-display text-lg font-bold">{farmer.metrics.repeatRate}%</p>
            <p className="text-xs text-muted-foreground">Repeat</p>
          </div>

          <div>
            <p className="font-display text-lg font-bold">{farmer.since}</p>
            <p className="text-xs text-muted-foreground">Since</p>
          </div>
        </div>

        {/* CTA */}
        <Button asChild variant="outline" className="mt-6 w-full group/button">
          <Link to="/farmers">
            View Ranch Profile
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
