"use client";

import { motion } from "framer-motion";
import { ClipboardList, Cpu, Bug } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

const STEP_ICONS = [ClipboardList, Cpu, Bug] as const;
const STEP_GRADIENTS = [
  "from-primary/15 to-primary/5",
  "from-accent/15 to-accent/5",
  "from-glow/15 to-glow/5",
] as const;

export function TheIdea() {
  const { t } = useTranslations();

  const steps = [
    { title: t("ideaStep1Title"), desc: t("ideaStep1Desc") },
    { title: t("ideaStep2Title"), desc: t("ideaStep2Desc") },
    { title: t("ideaStep3Title"), desc: t("ideaStep3Desc") },
  ];

  return (
    <SectionWrapper id="idea">
      <SectionHeading title={t("ideaTitle")} subtitle={t("ideaSubtitle")} />

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${STEP_GRADIENTS[i]} opacity-0 transition-opacity group-hover:opacity-100`} />

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary transition-colors group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground"
                >
                  <Icon className="size-6" />
                </motion.div>
                <div className="mb-1 text-sm font-bold text-gradient-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>

              {i < 2 && (
                <div className="absolute -end-4 top-1/2 z-10 hidden -translate-y-1/2 md:block ltr:rotate-0 rtl:rotate-180">
                  <motion.svg
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-primary/30"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
