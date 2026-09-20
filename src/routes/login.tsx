import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Ranch Meat" },
      {
        name: "description",
        content:
          "Sign in to your Ranch Meat account to manage orders, deliveries and your marketplace dashboard.",
      },
      { property: "og:title", content: "Sign In | Ranch Meat" },
      {
        property: "og:description",
        content: "Access your Ranch Meat account securely.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[1fr_480px]">
        <div className="hidden lg:block">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <ShieldCheck className="size-4" />
              Secure marketplace access
            </span>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight">
              Welcome back to Ranch Meat.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Sign in to track deliveries, manage orders, access verified farmer information and
              prepare for upcoming M-Pesa checkout.
            </p>

            <div className="mt-10 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Verified marketplace accounts
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Secure customer dashboard
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                Order history and delivery tracking
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card rounded-3xl p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold">Sign In</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Continue to your Ranch Meat account.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();

              toast.info(
                "Authentication will be connected to PostgreSQL and JWT in the next phase.",
              );
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">Email Address</Label>

              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>

                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-border"
              />
              Remember me
            </label>

            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
            M-Pesa checkout will be available after authentication is connected to the backend.
          </div>
        </div>
      </div>
    </section>
  );
}
