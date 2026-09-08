import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/animations/reveal";
import { FarmerCard } from "@/components/farmers/farmer-card";
import { getFarmers, queryKeys } from "@/services/catalog.service";

export const Route = createFileRoute("/farmers")({
  head: () => ({
    meta: [
      { title: "Verified Farmers & Ranches | Ranch Meat" },
      {
        name: "description",
        content:
          "Meet the audited ranches behind Ranch Meat: certifications, on-time performance and the stories behind each herd.",
      },
      { property: "og:title", content: "Verified Farmers & Ranches | Ranch Meat" },
      {
        property: "og:description",
        content: "Audited ranches with certifications, ratings and performance metrics.",
      },
    ],
  }),
  component: FarmersPage,
});

function FarmersPage() {
  const { data, isPending } = useQuery({ queryKey: queryKeys.farmers, queryFn: getFarmers });

  return (
    <>
      <div className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">Producers</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">The farms behind the cuts</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Each partner is document-reviewed, veterinary-audited and inspected on site before their
            first listing goes live — then re-audited every year.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[88rem] gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[430px] w-full rounded-2xl" />
            ))
          : data?.map((farmer, index) => (
              <Reveal key={farmer.id} delay={index * 0.07} className="h-full">
                <FarmerCard farmer={farmer} />
              </Reveal>
            ))}
      </div>
    </>
  );
}