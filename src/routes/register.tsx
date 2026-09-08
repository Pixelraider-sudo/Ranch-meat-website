import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account | Ranch Meat" },
      { name: "description", content: "Create a Ranch Meat account to order traceable meat from verified ranches." },
      { property: "og:title", content: "Create Account | Ranch Meat" },
      { property: "og:description", content: "Join Ranch Meat as a household, restaurant or wholesale buyer." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <h1 className="text-3xl font-extrabold">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Households, restaurants and wholesalers all start here.
      </p>
      <form
        className="surface-card mt-8 space-y-5 p-8"
        onSubmit={(event) => {
          event.preventDefault();
          toast.info("Authentication arrives in the next phase");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="reg-name">Full name</Label>
          <Input id="reg-name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-email">Email</Label>
          <Input id="reg-email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <Input id="reg-password" type="password" required autoComplete="new-password" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}