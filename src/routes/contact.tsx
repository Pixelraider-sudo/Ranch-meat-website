import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ranch Meat — Sales & Support" },
      {
        name: "description",
        content: "Reach the Ranch Meat team for wholesale enquiries, farm partnerships or order support.",
      },
      { property: "og:title", content: "Contact Ranch Meat" },
      { property: "og:description", content: "Wholesale enquiries, partnerships and order support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-eyebrow text-primary">Contact</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Talk to the team</h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          Wholesale enquiries are answered within one business day. Order support is available
          07:00–21:00, seven days a week.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <Mail className="size-4 text-primary" aria-hidden="true" /> hello@ranchmeat.example
          </li>
          <li className="flex items-center gap-3">
            <Phone className="size-4 text-primary" aria-hidden="true" /> +1 (555) 018-4420
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="size-4 text-primary" aria-hidden="true" /> 118 Cold Room Way, Denver, CO
          </li>
        </ul>
        <div className="mt-8 aspect-16/10 w-full rounded-2xl border bg-secondary" role="img" aria-label="Map placeholder" />
      </div>

      <form
        className="surface-card h-fit space-y-5 p-8"
        onSubmit={(event) => {
          event.preventDefault();
          toast.success("Message sent", { description: "We'll reply within one business day." });
          event.currentTarget.reset();
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company (optional)</Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea id="message" name="message" rows={6} required />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Send message
        </Button>
      </form>
    </div>
  );
}