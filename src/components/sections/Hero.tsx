"use client";

import { motion } from "framer-motion";
import { ArrowDown, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  x: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 6 + Math.random() * 6,
}));

export function Hero() {
  const { t } = useTranslations();

  const scrollToIdea = () =>
    document.getElementById("idea")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4">
      {/* Animated gradient background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -start-20 -top-20 size-80 rounded-full bg-gradient-to-br from-primary/20 to-glow/10 blur-3xl" />
        <div className="animate-blob-delay absolute -end-20 top-1/3 size-96 rounded-full bg-gradient-to-bl from-accent/15 to-glow-secondary/10 blur-3xl" />
        <div className="animate-blob-delay-2 absolute bottom-10 start-1/3 size-72 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 blur-3xl" />
      </div>

      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 pattern-dots opacity-60" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-gradient-to-r from-primary/40 to-accent/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: "-10px",
          }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) * 1.1],
            opacity: [0, 0.7, 0.4, 0],
            scale: [1, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="size-4 text-accent" />
          </motion.span>
          {t("heroTag")}
        </motion.div>

        {/* Title with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {t("heroTitle").split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-gradient-primary">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              size="lg"
              onClick={scrollToIdea}
              className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-8 py-3 text-base shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
            >
              <Bot className="size-5" />
              {t("heroCta")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Bouncing arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="mx-auto size-5 text-primary/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
