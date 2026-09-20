import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  Snowflake,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
] as const;

const groups = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse Products", to: "/marketplace" },
      { label: "Verified Farmers", to: "/farmers" },
      { label: "Traceability", to: "/transparency" },
      { label: "For Business", to: "/business" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Sign In", to: "/login" },
      { label: "Create Account", to: "/register" },
    ],
  },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.success("You're subscribed", {
      description: "We'll send occasional updates about new ranches and product launches.",
    });

    setEmail("");
  };

  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))]">
          <div className="max-w-sm">
            <p className="font-display text-xl font-extrabold">Ranch Meat</p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Connecting verified Kenyan ranches with households, restaurants and wholesale buyers
              through transparent sourcing, cold-chain delivery and secure digital commerce.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                Nairobi & Kiambu
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                Contact coming soon
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                hello@ranchmeat.co.ke
              </div>
            </div>

            <form className="mt-8 flex gap-2" onSubmit={handleSubscribe}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <Input
                id="footer-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <social.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-eyebrow text-muted-foreground">{group.title}</p>

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
            <ShieldCheck className="size-4 text-primary" />
            Verified ranches
          </span>

          <span className="inline-flex items-center gap-2">
            <Snowflake className="size-4 text-primary" />
            Cold-chain protected delivery
          </span>

          <span>M-Pesa payments coming soon</span>
          <span>Launching in Nairobi & Kiambu</span>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ranch Meat. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/contact" className="transition-colors hover:text-foreground">
              Contact
            </Link>

            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>

            <Link to="/" className="transition-colors hover:text-foreground">
              Privacy
            </Link>

            <Link to="/" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
