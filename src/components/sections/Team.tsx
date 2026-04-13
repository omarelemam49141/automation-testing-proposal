"use client";

import { motion } from "framer-motion";
import { Code2, TestTube } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/section-wrapper";
import { useTranslations } from "@/hooks/useTranslations";

export function Team() {
  const { t } = useTranslations();

  const members = [
    {
      name: t("omarName"),
      role: t("omarRole"),
      desc: t("omarDesc"),
      initials: "OE",
      Icon: Code2,
      gradient: "from-primary via-primary/80 to-accent",
    },
    {
      name: t("yaraName"),
      role: t("yaraRole"),
      desc: t("yaraDesc"),
      initials: "YS",
      Icon: TestTube,
      gradient: "from-accent via-accent/80 to-primary",
    },
  ];

  return (
    <SectionWrapper id="team">
      <SectionHeading title={t("teamTitle")} subtitle={t("teamSubtitle")} />

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-sm transition-all hover:shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              className={`mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-2xl font-bold text-white shadow-lg shadow-primary/20`}
            >
              {member.initials}
            </motion.div>
            <h3 className="text-lg font-bold">{member.name}</h3>
            <div className="mb-3 flex items-center justify-center gap-1.5 text-sm font-medium text-gradient-primary">
              <member.Icon className="size-4 text-accent" />
              {member.role}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{member.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
