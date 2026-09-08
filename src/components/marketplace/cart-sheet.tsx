import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { selectCartSubtotal, useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/format";

export function CartSheet() {
  const { lines, isOpen, setOpen, setQuantity, remove } = useCartStore();
  const subtotal = useCartStore(selectCartSubtotal);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9.5;
  const tax = subtotal * 0.07;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Your basket</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-secondary">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </span>
            <div>
              <p className="font-medium">Your basket is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse the marketplace to add cuts from verified ranches.
              </p>
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/marketplace">Explore marketplace</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-4">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-3">
                  <img
                    src={line.image}
                    alt=""
                    loading="lazy"
                    className="size-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(line.price)} / {line.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        aria-label={`Decrease ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm tabular-nums">{line.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        aria-label={`Increase ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      >
                        <Plus className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-8 text-muted-foreground"
                        aria-label={`Remove ${line.name}`}
                        onClick={() => remove(line.productId)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated tax</span>
                <span className="tabular-nums">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chilled delivery</span>
                <span className="tabular-nums">
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-display text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(subtotal + tax + shipping)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Next-day chilled delivery · Free over {formatCurrency(120)}
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}