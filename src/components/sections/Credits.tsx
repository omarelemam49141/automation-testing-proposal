"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export function Credits() {
  const { t } = useTranslations();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden border-t px-4 py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-30" />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-sm"
        >
          <ShieldCheck className="size-7 text-primary" />
        </motion.div>
        <h3 className="mb-6 text-xl font-bold">{t("creditsTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("creditsLine1")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("creditsLine2")}</p>
        <p className="mt-4 text-xs text-muted-foreground/60">
          &copy; {t("creditsYear")}
        </p>
      </div>
    </motion.footer>
  );
}
