import { motion } from "motion/react";
import {
  Tractor,
  Stethoscope,
  Truck,
  Factory,
  Package,
  Snowflake,
  MapPin,
  QrCode,
  CheckCircle2,
} from "lucide-react";

import { Section, SectionHeader } from "@/components/common/section";
import { traceStages } from "@/services/mock-data";

const stageIcons = [
  Tractor,
  Stethoscope,
  Truck,
  Factory,
  Package,
  Snowflake,
  MapPin,
];

export function TraceTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <Section className="bg-secondary/20">
      <SectionHeader
        eyebrow="Full Traceability"
        title="Every order carries a complete supply-chain record"
        description={
          compact
            ? undefined
            : "Every Ranch Meat package includes a QR code that reveals veterinary verification, transport history, processing records and delivery checkpoints."
        }
        align="center"
      />

      <div className="relative mt-12">
        <div className="absolute left-[23px] top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20 md:block" />

        <div className="space-y-8">
          {traceStages.map((stage, index) => {
            const Icon = stageIcons[index] ?? CheckCircle2;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div className="grid gap-5 md:grid-cols-[48px_minmax(0,1fr)] md:items-start">
                  <div className="relative hidden md:block">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>

                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border-2 border-background bg-card text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>

                  <div className="surface-card relative overflow-hidden rounded-3xl border border-border/70 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-xl">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                    <div className="flex items-start gap-4 md:hidden">
                      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Step {index + 1}
                        </span>

                        <h3 className="mt-1 text-xl font-bold">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Step {index + 1}
                      </span>

                      <h3 className="mt-1 text-xl font-bold">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {stage.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {stage.metric}
                      </div>

                      <div className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                        {stage.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-16"
        >
          <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <QrCode className="size-4" />
                  QR Trace Code
                </div>

                <h3 className="mt-5 text-3xl font-extrabold tracking-tight">
                  Scan your package and replay its journey.
                </h3>

                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  Every order includes a unique QR code linking you to ranch
                  details, veterinary certification, cold-chain records,
                  processing batches and delivery checkpoints.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <p className="text-2xl font-bold text-primary">7</p>
                    <p className="text-xs text-muted-foreground">
                      verified checkpoints
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-xs text-muted-foreground">
                      traceable sourcing
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <p className="text-2xl font-bold text-primary">0–2°C</p>
                    <p className="text-xs text-muted-foreground">
                      monitored delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-8 shadow-2xl">
                  <div className="rounded-3xl bg-white p-6 shadow-lg">
                    <QrCode className="size-32 text-black" />
                  </div>

                  <div className="absolute -bottom-4 rounded-full bg-card px-4 py-2 shadow-lg">
                    <span className="text-sm font-semibold text-primary">
                      Verified Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Section>
  );
}