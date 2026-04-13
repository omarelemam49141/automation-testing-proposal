"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const VERSIONS = ["v01", "v1", "v2", "v3"] as const;

const PILL_GRADIENTS = [
  "from-slate-500 to-slate-400",
  "from-primary to-primary/80",
  "from-accent to-accent/80",
  "from-glow to-glow/80",
] as const;

export function Roadmap() {
  const { t } = useTranslations();
  const [active, setActive] = useState(0);

  const items = VERSIONS.map((v) => ({
    label: t(`${v}Label` as Parameters<typeof t>[0]),
    title: t(`${v}Title` as Parameters<typeof t>[0]),
    desc: t(`${v}Desc` as Parameters<typeof t>[0]),
  }));

  return (
    <SectionWrapper id="roadmap" alternate>
      <SectionHeading title={t("roadmapTitle")} subtitle={t("roadmapSubtitle")} />

      {/* Version pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {items.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              active === i
                ? cn("bg-gradient-to-r text-white shadow-lg", PILL_GRADIENTS[i])
                : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Active version detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
          className="mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-card p-8 shadow-md gradient-border"
        >
          <div className="mb-1 text-sm font-bold text-gradient-primary">{items[active].label}</div>
          <h3 className="mb-4 text-xl font-bold">{items[active].title}</h3>
          <p className="leading-relaxed text-muted-foreground">{items[active].desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mx-auto mt-10 flex max-w-lg items-center gap-1.5">
        {items.map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-1 items-center"
            initial={false}
            animate={{ scale: i <= active ? 1 : 0.95 }}
          >
            <div
              className={cn(
                "h-2.5 w-full rounded-full transition-all duration-500",
                i <= active
                  ? "bg-gradient-to-r from-primary to-accent shadow-sm shadow-primary/20"
                  : "bg-border"
              )}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
