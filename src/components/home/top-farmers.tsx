import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { FarmerCard } from "@/components/farmers/farmer-card";
import { getFarmers, queryKeys } from "@/services/catalog.service";

export function TopFarmers() {
  const { data, isPending } = useQuery({ queryKey: queryKeys.farmers, queryFn: getFarmers });

  return (
    <Section>
      <SectionHeader
        eyebrow="The producers"
        title="Farms we've stood on"
        description="Every partner passes document review, veterinary audit and an on-site inspection before listing."
        action={
          <Button asChild variant="outline">
            <Link to="/farmers">Meet all farmers</Link>
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[430px] w-full rounded-2xl" />
            ))
          : data?.map((farmer, index) => (
              <Reveal key={farmer.id} delay={index * 0.08} className="h-full">
                <FarmerCard farmer={farmer} />
              </Reveal>
            ))}
      </div>
    </Section>
  );
}