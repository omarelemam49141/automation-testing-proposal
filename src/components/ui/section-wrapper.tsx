"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
  alternate?: boolean;
};

export function SectionWrapper({ id, className, children, alternate }: Props) {
  const reduceMotion = useReducedMotionPreference();

  return (
    <motion.section
      id={id}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8",
        alternate && "bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent",
        className
      )}
    >
      {alternate && (
        <div className="pointer-events-none absolute inset-0 pattern-dots opacity-40" aria-hidden />
      )}
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </motion.section>
  );
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  );
}
