import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Farmer } from "@/types";

export function FarmerCard({ farmer }: { farmer: Farmer }) {
  return (
    <article className="surface-card lift-on-hover flex h-full flex-col overflow-hidden">
      <div className="aspect-16/10 overflow-hidden bg-secondary">
        <img
          src={farmer.avatar}
          alt={`${farmer.name}, ${farmer.farmName}`}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1.5 text-lg font-semibold">
              <span className="truncate">{farmer.farmName}</span>
              {farmer.verified && (
                <BadgeCheck className="size-4 shrink-0 text-success" aria-label="Verified farm" />
              )}
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {farmer.location}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="size-4 fill-warning text-warning" aria-hidden="true" />
            {farmer.rating}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{farmer.story}</p>

        <div className="flex flex-wrap gap-1.5">
          {farmer.certifications.map((cert) => (
            <Badge key={cert} variant="secondary" className="font-normal">
              {cert}
            </Badge>
          ))}
        </div>

        <dl className="mt-auto grid grid-cols-3 gap-3 border-t pt-4 text-center">
          <div>
            <dd className="font-display text-lg font-bold tabular-nums">
              {farmer.metrics.onTimeRate}%
            </dd>
            <dt className="text-xs text-muted-foreground">On time</dt>
          </div>
          <div>
            <dd className="font-display text-lg font-bold tabular-nums">
              {farmer.metrics.repeatRate}%
            </dd>
            <dt className="text-xs text-muted-foreground">Repeat</dt>
          </div>
          <div>
            <dd className="font-display text-lg font-bold tabular-nums">Since</dd>
            <dt className="text-xs text-muted-foreground">{farmer.since}</dt>
          </div>
        </dl>
      </div>
    </article>
  );
}