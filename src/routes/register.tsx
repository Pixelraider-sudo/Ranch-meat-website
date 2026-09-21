import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account | Ranch Meat" },
      {
        name: "description",
        content: "Create your Ranch Meat account and join Kenya's premium meat marketplace.",
      },
      { property: "og:title", content: "Create Account | Ranch Meat" },
      {
        property: "og:description",
        content: "Register as a customer, farmer, restaurant or wholesaler.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[1fr_520px]">
        <div className="hidden lg:block">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <ShieldCheck className="size-4" />
              Verified Kenyan marketplace
            </span>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight">
              Create your Ranch Meat account.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Join as a household, farmer, restaurant or wholesaler and access verified sourcing,
              transparent deliveries and upcoming M-Pesa payments.
            </p>

            <div className="mt-10 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Secure account creation
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Dashboard access after sign-up
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Future M-Pesa checkout support
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card rounded-3xl p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold">Create Account</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              It only takes a minute to get started.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();

              toast.info("Registration will connect to PostgreSQL and JWT in the next phase.");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full Name</Label>

              <Input id="reg-name" placeholder="John Kipkirui" autoComplete="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email Address</Label>

              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-phone">Phone Number</Label>

              <Input
                id="reg-phone"
                type="tel"
                placeholder="+254712345678"
                autoComplete="tel"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-role">Account Type</Label>

              <Select defaultValue="customer">
                <SelectTrigger id="reg-role" className="w-full">
                  <SelectValue placeholder="Choose account type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>

              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-confirm">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  required
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
                className="mt-1 size-4 rounded border-border"
              />

              <span className="text-muted-foreground">
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            <Button type="submit" size="lg" className="w-full" disabled={!acceptedTerms}>
              Create Account
            </Button>
          </form>

          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
            Your account will later unlock role-based dashboards and secure M-Pesa payments.
          </div>
        </div>
      </div>
    </section>
  );
}
