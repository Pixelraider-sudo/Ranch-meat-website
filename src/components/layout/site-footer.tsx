import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  Snowflake,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
] as const;

const groups = [
  {
    title: "Marketplace",
    links: [
      { label: "All products", to: "/marketplace" },
      { label: "Farmers", to: "/farmers" },
      { label: "Transparency", to: "/transparency" },
      { label: "For business", to: "/business" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/register" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div className="max-w-sm">
            <p className="font-display text-xl font-extrabold">Ranch Meat</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A traceable farm-to-table marketplace connecting verified ranches
              with households, restaurants and wholesale buyers.
            </p>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success("You're on the list", {
                  description: "Seasonal drops and farm stories, once a month.",
                });
                event.currentTarget.reset();
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>

            <ul className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <social.icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-eyebrow text-muted-foreground">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-8 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Vet-verified farms
          </span>
          <span className="inline-flex items-center gap-2">
            <Snowflake className="size-4 text-primary" aria-hidden="true" />
            Unbroken cold chain
          </span>
          <span>Carbon-neutral delivery</span>
          <span>Est. 2019</span>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ranch Meat. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
