import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Ranch Meat" },
      { name: "description", content: "Sign in to your Ranch Meat account to track orders and manage standing deliveries." },
      { property: "og:title", content: "Sign In | Ranch Meat" },
      { property: "og:description", content: "Access your Ranch Meat orders and deliveries." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <h1 className="text-3xl font-extrabold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to track orders, manage standing deliveries and view farm records.
      </p>
      <form
        className="surface-card mt-8 space-y-5 p-8"
        onSubmit={(event) => {
          event.preventDefault();
          toast.info("Authentication arrives in the next phase");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" required autoComplete="current-password" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}