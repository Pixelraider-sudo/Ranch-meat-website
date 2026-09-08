import { motion } from "motion/react";
import { Section, SectionHeader } from "@/components/common/section";
import { traceStages } from "@/services/mock-data";

export function TraceTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <Section className="bg-secondary/40">
      <SectionHeader
        eyebrow="Transparency"
        title="Seven checkpoints between pasture and plate"
        description={
          compact
            ? undefined
            : "Scan the code on any pack to replay the full journey, timestamped and signed at each stage."
        }
      />

      <ol className="relative space-y-4 border-l pl-6 sm:pl-10">
        {traceStages.map((stage, index) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <span
              className="absolute -left-[1.9rem] top-6 grid size-7 place-items-center rounded-full gradient-canopy text-xs font-semibold text-primary-foreground sm:-left-[3.15rem]"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="surface-card grid gap-3 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">{stage.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
              <div className="flex gap-6 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
                <p className="text-sm font-medium text-primary">
                  {stage.metric}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stage.duration}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
