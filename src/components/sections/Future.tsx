"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  MousePointerClick,
  Camera,
  BarChart3,
  Layers,
  Wrench,
} from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

const ICONS = [Monitor, MousePointerClick, Camera, BarChart3, Layers, Wrench] as const;

const CARD_GRADIENTS = [
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
] as const;

export function Future() {
  const { t } = useTranslations();

  const items = Array.from({ length: 6 }, (_, i) => ({
    title: t(`future${i + 1}Title` as Parameters<typeof t>[0]),
    benefit: t(`future${i + 1}Benefit` as Parameters<typeof t>[0]),
    Icon: ICONS[i],
  }));

  return (
    <SectionWrapper id="future" alternate>
      <SectionHeading title={t("futureTitle")} subtitle={t("futureSubtitle")} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
              className={`mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${CARD_GRADIENTS[i]} text-white shadow-md`}
            >
              <item.Icon className="size-5" />
            </motion.div>
            <h3 className="mb-2 font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.benefit}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
