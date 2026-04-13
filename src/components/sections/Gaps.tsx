"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

export function Gaps() {
  const { t } = useTranslations();

  const gaps = Array.from({ length: 5 }, (_, i) => ({
    title: t(`gap${i + 1}Title` as Parameters<typeof t>[0]),
    desc: t(`gap${i + 1}Desc` as Parameters<typeof t>[0]),
  }));

  return (
    <SectionWrapper id="gaps">
      <SectionHeading title={t("gapsTitle")} subtitle={t("gapsSubtitle")} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gaps.map((gap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-orange-50/30 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-amber-800/30 dark:from-amber-900/15 dark:to-orange-900/10"
          >
            <div className="mb-3 flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.3 }}
                className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm"
              >
                <AlertTriangle className="size-4" />
              </motion.div>
              <h3 className="font-semibold text-amber-700 dark:text-amber-400">{gap.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{gap.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
