"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Bug,
  MousePointerClick,
  GitBranch,
  BarChart3,
  Layers,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const ICONS = [Bot, Bug, MousePointerClick, GitBranch, BarChart3, Layers, Wrench] as const;

const ICON_COLORS = [
  "from-violet-500 to-purple-500",
  "from-red-400 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-green-500",
  "from-blue-400 to-indigo-500",
  "from-cyan-400 to-teal-500",
  "from-pink-400 to-fuchsia-500",
] as const;

export function Features() {
  const { t } = useTranslations();
  const [expanded, setExpanded] = useState<number | null>(null);

  const features = Array.from({ length: 7 }, (_, i) => ({
    title: t(`feat${i + 1}Title` as Parameters<typeof t>[0]),
    desc: t(`feat${i + 1}Desc` as Parameters<typeof t>[0]),
    Icon: ICONS[i],
  }));

  return (
    <SectionWrapper id="features">
      <SectionHeading title={t("featuresTitle")} subtitle={t("featuresSubtitle")} />

      <div className="space-y-3">
        {features.map((feat, i) => {
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <motion.button
                onClick={() => setExpanded(isOpen ? null : i)}
                whileHover={{ x: 4 }}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border bg-card p-5 text-start shadow-sm transition-all hover:shadow-md",
                  isOpen && "ring-2 ring-primary/30 shadow-md"
                )}
              >
                <motion.span
                  animate={isOpen ? { scale: [1, 1.15, 1], rotate: [0, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                    ICON_COLORS[i]
                  )}
                >
                  <feat.Icon className="size-5" />
                </motion.span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold">{feat.title}</h3>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-2 pt-3">
                      <p className="ms-14 rounded-xl bg-gradient-to-r from-primary/5 to-transparent p-3 text-sm leading-relaxed text-muted-foreground">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
