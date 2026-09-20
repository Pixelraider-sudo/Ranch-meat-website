import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";

import { CartSheet } from "@/components/marketplace/cart-sheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { selectCartCount, useCartStore } from "@/store/cart.store";

const nav = [
  { label: "Marketplace", to: "/marketplace" },
  { label: "Farmers", to: "/farmers" },
  { label: "Transparency", to: "/transparency" },
  { label: "For Business", to: "/business" },
  { label: "About", to: "/about" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const count = useCartStore(selectCartCount);
  const setCartOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass-panel border-b shadow-xs backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Ranch Meat home" className="flex shrink-0 items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl gradient-canopy text-primary-foreground shadow-sm">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                <path
                  d="M12 3c4 2.2 6 5.2 6 8.7A6 6 0 0 1 6 11.7C6 8.2 8 5.2 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M12 21v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>

            <div className="leading-tight">
              <p className="font-display text-lg font-extrabold tracking-tight">Ranch Meat</p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Verified Kenyan Ranches
              </p>
            </div>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{
                  className: "bg-secondary text-foreground",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Search marketplace"
            >
              <Link to="/marketplace">
                <Search className="size-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Shopping cart with ${count} item${count === 1 ? "" : "s"}`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5" />

              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Account"
            >
              <Link to="/login">
                <User className="size-5" />
              </Link>
            </Button>

            <Button asChild size="sm" className="hidden shadow-xs md:inline-flex">
              <Link to="/marketplace">Shop Now</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 p-0">
                <div className="border-b p-6">
                  <p className="font-display text-xl font-bold">Ranch Meat</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Premium Kenyan Meat Marketplace
                  </p>
                </div>

                <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="my-3 border-t" />

                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
                  >
                    Create Account
                  </Link>

                  <Button asChild className="mt-4 w-full">
                    <Link to="/marketplace" onClick={() => setMobileOpen(false)}>
                      Shop Now
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CartSheet />
    </>
  );
}
