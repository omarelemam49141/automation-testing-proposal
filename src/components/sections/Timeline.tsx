"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const PHASES = [1, 2, 3, 4] as const;

const PHASE_GRADIENTS = [
  "from-primary to-primary/70",
  "from-accent to-accent/70",
  "from-glow to-glow/70",
  "from-primary via-accent to-glow-secondary",
] as const;

export function Timeline() {
  const { t } = useTranslations();

  const phases = PHASES.map((n) => ({
    label: t(`phase${n}Label` as Parameters<typeof t>[0]),
    title: t(`phase${n}Title` as Parameters<typeof t>[0]),
    duration: t(`phase${n}Duration` as Parameters<typeof t>[0]),
    desc: t(`phase${n}Desc` as Parameters<typeof t>[0]),
  }));

  return (
    <SectionWrapper id="timeline">
      <SectionHeading title={t("timelineTitle")} subtitle={t("timelineSubtitle")} />

      <div className="relative">
        {/* Gradient vertical line */}
        <div className="absolute start-6 top-0 hidden h-full w-0.5 sm:block">
          <div className="h-full w-full rounded-full bg-gradient-to-b from-primary via-accent to-glow-secondary" />
        </div>

        <div className="space-y-8">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex gap-6"
            >
              {/* Dot with pulse */}
              <div className="relative z-10 hidden sm:block">
                <motion.div
                  whileInView={{
                    scale: [0.8, 1.1, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg",
                    PHASE_GRADIENTS[i]
                  )}
                >
                  <Clock className="size-5" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex-1 rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-gradient-primary">{phase.label}</span>
                  <span className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{phase.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
