import { Clock, Flame } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { recipes } from "@/services/mock-data";

export function RecipesStrip() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Kitchen"
        title="Cook it like the ranch does"
        description="Short, tested methods matched to the cuts we ship."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {recipes.map((recipe, index) => (
          <Reveal key={recipe.id} delay={index * 0.07} className="h-full">
            <article className="group surface-card lift-on-hover h-full overflow-hidden">
              <div className="aspect-16/10 overflow-hidden bg-secondary">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-eyebrow text-muted-foreground">{recipe.cut}</p>
                <h3 className="mt-2 text-lg font-semibold">{recipe.title}</h3>
                <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    {recipe.minutes} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="size-4" aria-hidden="true" />
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}