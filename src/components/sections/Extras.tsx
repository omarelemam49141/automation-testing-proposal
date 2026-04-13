"use client";

import { motion } from "framer-motion";
import { AlertCircle, HandHelping } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

export function Extras() {
  const { t } = useTranslations();

  const risks = [t("extrasRisk1"), t("extrasRisk2"), t("extrasRisk3")];
  const asks = [t("extrasAsk1"), t("extrasAsk2"), t("extrasAsk3")];

  return (
    <SectionWrapper id="extras" alternate>
      <SectionHeading title={t("extrasTitle")} />

      <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          whileHover={{ y: -4 }}
          className="overflow-hidden rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-amber-800/30 dark:from-amber-900/15 dark:to-orange-900/10"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
              <AlertCircle className="size-4" />
            </div>
            <h3 className="font-semibold text-amber-700 dark:text-amber-400">{t("extrasRiskTitle")}</h3>
          </div>
          <ul className="space-y-2">
            {risks.map((risk, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
                {risk}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-sm">
              <HandHelping className="size-4" />
            </div>
            <h3 className="font-semibold text-primary">{t("extrasAskTitle")}</h3>
          </div>
          <ul className="space-y-2">
            {asks.map((ask, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent" />
                {ask}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
