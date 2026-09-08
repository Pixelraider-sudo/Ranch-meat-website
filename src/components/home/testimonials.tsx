import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { testimonials } from "@/services/mock-data";

export function Testimonials() {
  return (
    <Section className="bg-secondary/40">
      <SectionHeader
        eyebrow="Customers"
        title="Chefs, buyers and households"
        align="center"
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08} className="h-full">
            <figure className="surface-card flex h-full flex-col gap-5 p-7">
              <Quote className="size-6 text-primary/40" aria-hidden="true" />
              <blockquote className="flex-1 text-base leading-relaxed">"{item.quote}"</blockquote>
              <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-warning text-warning" aria-hidden="true" />
                ))}
              </div>
              <figcaption className="border-t pt-4">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}