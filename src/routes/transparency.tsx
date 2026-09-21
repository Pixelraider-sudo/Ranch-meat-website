import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  QrCode,
  Thermometer,
  Truck,
  Leaf,
  CheckCircle2,
  ScanLine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TraceTimeline } from "@/components/home/trace-timeline";
import { PlatformStats } from "@/components/home/platform-stats";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Supply Chain Transparency | Ranch Meat" },
      {
        name: "description",
        content:
          "Follow every order from verified Kenyan ranches through veterinary inspection, cold-chain transport, processing and delivery.",
      },
      {
        property: "og:title",
        content: "Supply Chain Transparency | Ranch Meat",
      },
      {
        property: "og:description",
        content: "Scan a QR code and replay the complete journey of your order.",
      },
    ],
  }),
  component: TransparencyPage,
});

function TransparencyPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-eyebrow text-primary">Transparency</p>

              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Every order has a story you can verify.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Ranch Meat records every major checkpoint—from verified Kenyan doorstep—so customers
                can scan one QR code and see exactly where their meat came from.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button>
                  <ScanLine className="size-4" />
                  Scan Sample QR
                </Button>

                <Button variant="outline">Learn how tracing works</Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Badge>Veterinary Verified</Badge>
                <Badge>Cold Chain Protected</Badge>
                <Badge>Farm Verified</Badge>
              </div>
            </div>

            <div className="surface-card rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Trace ID</p>

                  <p className="font-display text-xl font-bold">RM-KE-2026-01482</p>
                </div>

                <div className="grid size-16 place-items-center rounded-xl bg-secondary">
                  <QrCode className="size-9" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <span className="flex items-center gap-2">
                    <Leaf className="size-4 text-primary" />
                    Farm Verified
                  </span>

                  <CheckCircle2 className="size-5 text-primary" />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    Vet Approved
                  </span>

                  <CheckCircle2 className="size-5 text-primary" />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <span className="flex items-center gap-2">
                    <Thermometer className="size-4 text-primary" />
                    Cold Chain
                  </span>

                  <span className="font-semibold">2.4°C</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <span className="flex items-center gap-2">
                    <Truck className="size-4 text-primary" />
                    Delivery ETA
                  </span>

                  <span className="font-semibold">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-eyebrow text-primary">Verified Journey</p>

          <h2 className="mt-3 font-display text-3xl font-bold">
            Seven checkpoints before your order arrives.
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every checkpoint records who handled the product, when it happened and whether quality
            standards were maintained.
          </p>
        </div>

        <TraceTimeline />
      </section>

      <section className="border-y bg-secondary/30">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-eyebrow text-primary">What Gets Recorded</p>

            <h2 className="mt-3 font-display text-3xl font-bold">
              Every important detail stays attached to your order.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="surface-card rounded-2xl p-5">
              <ShieldCheck className="size-8 text-primary" />
              <h3 className="mt-4 font-semibold">Veterinary Inspection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Health inspection records and approval before processing.
              </p>
            </div>

            <div className="surface-card rounded-2xl p-5">
              <Thermometer className="size-8 text-primary" />
              <h3 className="mt-4 font-semibold">Cold Chain Monitoring</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Continuous temperature logging during transport and storage.
              </p>
            </div>

            <div className="surface-card rounded-2xl p-5">
              <Truck className="size-8 text-primary" />
              <h3 className="mt-4 font-semibold">Delivery Tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Route updates from dispatch until delivery.
              </p>
            </div>

            <div className="surface-card rounded-2xl p-5">
              <QrCode className="size-8 text-primary" />
              <h3 className="mt-4 font-semibold">QR Verification</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One scan reveals the complete history of your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-eyebrow text-primary">Future Ready</p>

          <h2 className="mt-3 font-display text-3xl font-bold">
            Built for a fully verifiable supply chain.
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            As Ranch Meat grows, every trace record can become a permanent digital record that
            restaurants, wholesalers and customers can verify independently.
          </p>
        </div>

        <PlatformStats />
      </section>
    </>
  );
}
