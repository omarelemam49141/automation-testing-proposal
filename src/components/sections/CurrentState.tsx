"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

export function CurrentState() {
  const { t } = useTranslations();

  const items = Array.from({ length: 8 }, (_, i) =>
    t(`currentItem${i + 1}` as Parameters<typeof t>[0])
  );

  return (
    <SectionWrapper id="current" alternate>
      <SectionHeading title={t("currentTitle")} subtitle={t("currentSubtitle")} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-card/80"
            >
              <motion.div
                whileInView={{ scale: [0, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 + 0.2 }}
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
              </motion.div>
              <span className="text-sm leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-primary/5 p-8 gradient-border"
        >
          <motion.div
            whileInView={{ rotate: [0, -10, 10, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/70 text-white shadow-lg shadow-accent/20"
          >
            <Zap className="size-6" />
          </motion.div>
          <h3 className="mb-3 text-lg font-bold">{t("currentBenefitTitle")}</h3>
          <p className="leading-relaxed text-muted-foreground">
            {t("currentBenefitDesc")}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
