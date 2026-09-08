import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export function NewsletterCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl gradient-canopy px-6 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
              Ready to buy meat you can actually trace?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85">
              Create an account in under a minute. Business buyers get wholesale tiers, standing
              orders and consolidated invoicing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/register">
                  Create account
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/business">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}