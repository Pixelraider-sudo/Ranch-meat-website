import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { formatCurrency } from "@/lib/format";
import { selectCartSubtotal, useCartStore } from "@/store/cart.store";

const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 350;
const VAT_RATE = 0.16;

export function CartSheet() {
  const { lines, isOpen, setOpen, setQuantity, remove } = useCartStore();

  const subtotal = useCartStore(selectCartSubtotal);

  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;

  const vat = Math.round(subtotal * VAT_RATE);

  const total = subtotal + shipping + vat;

  const remainingForFreeDelivery = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Your Basket</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-secondary">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </span>

            <div>
              <p className="font-display text-lg font-bold">Your basket is empty</p>

              <p className="mt-2 text-sm text-muted-foreground">
                Browse premium cuts from verified Kenyan ranches and start your first order.
              </p>
            </div>

            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="px-4 pb-3">
              {shipping === 0 ? (
                <div className="rounded-xl bg-primary/10 p-3 text-sm text-primary">
                  🎉 You've unlocked free chilled delivery.
                </div>
              ) : (
                <div className="rounded-xl bg-secondary p-3 text-sm">
                  Spend{" "}
                  <span className="font-semibold">{formatCurrency(remainingForFreeDelivery)}</span>{" "}
                  more to get free delivery.
                </div>
              )}
            </div>

            <ul className="flex-1 space-y-4 overflow-y-auto px-4">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-3 rounded-xl border p-3">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    decoding="async"
                    className="size-20 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{line.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(line.price)} / {line.unit}
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {formatCurrency(line.price * line.quantity)}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      >
                        <Minus className="size-3.5" />
                      </Button>

                      <span className="w-6 text-center text-sm tabular-nums">{line.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      >
                        <Plus className="size-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-8 text-muted-foreground"
                        onClick={() => {
                          remove(line.productId);

                          toast.success("Removed from basket", {
                            description: line.name,
                          });
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t p-4">
              <div className="rounded-xl bg-secondary/50 p-3">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="size-4 text-primary" />
                  Secure checkout
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="size-3.5" />
                  Chilled next-day delivery
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>

                  <span className="tabular-nums">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (16%)</span>

                  <span className="tabular-nums">{formatCurrency(vat)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Chilled delivery</span>

                  <span className="tabular-nums">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-display text-lg font-bold">
                <span>Total</span>

                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => toast.info("M-Pesa checkout will be connected in the next phase.")}
              >
                Continue to Checkout
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Free chilled delivery on orders above {formatCurrency(FREE_DELIVERY_THRESHOLD)}.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
