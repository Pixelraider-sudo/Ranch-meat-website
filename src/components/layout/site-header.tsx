import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, MapPin, Clock3 } from "lucide-react";
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
  { label: "Business", to: "/business" },
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
      {/* Announcement Bar */}
      <div className="hidden border-b bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Nairobi & Kiambu Delivery
            </span>

            <span className="hidden items-center gap-1.5 lg:flex">
              <Clock3 className="size-3.5" />
              Orders before 2 PM delivered next day
            </span>
          </div>

          <span>100% Traceable Kenyan Meat</span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass-panel border-b shadow-lg backdrop-blur-xl"
            : "border-b border-transparent bg-background/80 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-18 max-w-[88rem] items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Ranch Meat Home"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="grid size-11 place-items-center rounded-2xl gradient-canopy text-primary-foreground shadow-sm">
              <svg viewBox="0 0 24 24" className="size-5" fill="none">
                <path
                  d="M12 3c4 2.2 6 5.2 6 8.7A6 6 0 0 1 6 11.7C6 8.2 8 5.2 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21v-7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="leading-tight">
              <h1 className="font-display text-lg font-extrabold tracking-tight">
                Ranch Meat
              </h1>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Verified Kenyan Ranches
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/about" }}
                activeProps={{
                  className:
                    "bg-primary text-primary-foreground shadow-sm",
                  "aria-current": "page",
                }}
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Link
                to="/marketplace"
                search={{ q: "" }}
                aria-label="Search marketplace"
              >
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
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground shadow">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Link to="/login" aria-label="Sign In">
                <User className="size-5" />
              </Link>
            </Button>

            <Button asChild size="sm" className="hidden md:inline-flex shadow-sm">
              <Link to="/marketplace">Order Now</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 p-0">
                <div className="border-b p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl gradient-canopy text-primary-foreground">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none">
                        <path
                          d="M12 3c4 2.2 6 5.2 6 8.7A6 6 0 0 1 6 11.7C6 8.2 8 5.2 12 3Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 21v-7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="font-display text-xl font-bold">Ranch Meat</p>
                      <p className="text-sm text-muted-foreground">
                        Verified Kenyan Ranches
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col gap-1 p-4">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      activeProps={{
                        className:
                          "bg-primary text-primary-foreground",
                      }}
                      className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="my-4 border-t" />

                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary"
                  >
                    Create Account
                  </Link>

                  <Button asChild className="mt-5 w-full">
                    <Link
                      to="/marketplace"
                      onClick={() => setMobileOpen(false)}
                    >
                      Browse Marketplace
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