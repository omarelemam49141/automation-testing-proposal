"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

export function ROI() {
  const { t } = useTranslations();
  const [showAuto, setShowAuto] = useState(false);

  const metrics = [
    { label: t("roiMetric1Label"), manual: t("roiMetric1Manual"), auto: t("roiMetric1Auto") },
    { label: t("roiMetric2Label"), manual: t("roiMetric2Manual"), auto: t("roiMetric2Auto") },
    { label: t("roiMetric3Label"), manual: t("roiMetric3Manual"), auto: t("roiMetric3Auto") },
    { label: t("roiMetric4Label"), manual: t("roiMetric4Manual"), auto: t("roiMetric4Auto") },
    { label: t("roiMetric5Label"), manual: t("roiMetric5Manual"), auto: t("roiMetric5Auto") },
  ];

  return (
    <SectionWrapper id="roi" alternate>
      <SectionHeading title={t("roiTitle")} subtitle={t("roiSubtitle")} />

      {/* Toggle */}
      <div className="mb-10 flex justify-center">
        <motion.div
          layout
          className="inline-flex rounded-xl border border-border/60 bg-card/80 p-1.5 shadow-md backdrop-blur-sm"
        >
          <button
            onClick={() => setShowAuto(false)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
              !showAuto
                ? "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg shadow-red-500/25"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingDown className="size-4" />
            {t("roiManualLabel")}
          </button>
          <button
            onClick={() => setShowAuto(true)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
              showAuto
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-500/25"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingUp className="size-4" />
            {t("roiAutoLabel")}
          </button>
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={cn(
              "rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg",
              showAuto
                ? "border-emerald-200/40 dark:border-emerald-800/30"
                : "border-red-200/40 dark:border-red-800/30"
            )}
          >
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {m.label}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={showAuto ? "auto" : "manual"}
                initial={{ opacity: 0, x: showAuto ? 20 : -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: showAuto ? -20 : 20, scale: 0.9 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
                className={cn(
                  "text-lg font-bold",
                  showAuto ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                )}
              >
                {showAuto ? m.auto : m.manual}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Savings card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-primary/5 p-5 shadow-sm sm:col-span-2 lg:col-span-1 gradient-border"
        >
          <p className="mb-2 text-sm font-semibold text-gradient-primary">
            {t("roiSavingsTitle")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("roiSavingsDesc")}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
