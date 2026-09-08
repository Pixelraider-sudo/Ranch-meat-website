import { createFileRoute } from "@tanstack/react-router";
import { TraceTimeline } from "@/components/home/trace-timeline";
import { PlatformStats } from "@/components/home/platform-stats";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Supply Chain Transparency | Ranch Meat" },
      {
        name: "description",
        content:
          "Seven signed checkpoints from pasture to plate: farm, veterinary inspection, transport, processing, packaging, cold storage and delivery.",
      },
      { property: "og:title", content: "Supply Chain Transparency | Ranch Meat" },
      {
        property: "og:description",
        content: "Replay the full journey of any pack, timestamped and signed at each stage.",
      },
    ],
  }),
  component: TransparencyPage,
});

function TransparencyPage() {
  return (
    <>
      <div className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary">Transparency</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Provenance is a feature, not a marketing claim
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every pack carries a QR code that replays its journey — herd identity, vet sign-off,
            transit temperatures, processing batch and delivery telemetry.
          </p>
        </div>
      </div>
      <TraceTimeline />
      <PlatformStats />
    </>
  );
}