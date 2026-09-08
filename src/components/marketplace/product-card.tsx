import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCartStore((s) => s.add);
  const [wished, setWished] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group surface-card lift-on-hover flex flex-col overflow-hidden"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} className="bg-background/90 text-foreground backdrop-blur">
              {badge}
            </Badge>
          ))}
          {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
        </div>
        <Button
          variant="secondary"
          size="icon"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          onClick={() => setWished((v) => !v)}
          className="absolute right-3 top-3 size-9 rounded-full bg-background/85 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Heart className={cn("size-4", wished && "fill-accent text-accent")} />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-eyebrow text-muted-foreground">{product.categoryName}</span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <Star className="size-3.5 fill-warning text-warning" aria-hidden="true" />
            {product.rating}
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug">
          <Link
            to="/marketplace/$slug"
            params={{ slug: product.slug }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="font-display text-lg font-bold tabular-nums">
              {formatCurrency(product.price)}
              <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
            </p>
            {product.compareAtPrice && (
              <p className="text-xs text-muted-foreground line-through tabular-nums">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          <Button
            size="sm"
            disabled={!product.inStock}
            className="relative z-10"
            onClick={() => {
              add(product);
              toast.success(`${product.name} added`, { description: "Ready in your basket." });
            }}
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}