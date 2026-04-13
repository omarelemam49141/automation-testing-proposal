"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 360;

export function ScrollToTop() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5, y: 24, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24, rotate: 12 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          whileHover={
            reduceMotion
              ? {}
              : { scale: 1.08, y: -4, rotate: [0, -4, 4, 0] }
          }
          whileTap={{ scale: 0.9 }}
          onClick={goTop}
          aria-label={t("scrollToTop")}
          className={cn(
            "fixed bottom-6 inset-e-6 z-55 flex size-14 flex-col items-center justify-center rounded-full",
            "bg-linear-to-t from-primary via-primary to-accent text-primary-foreground shadow-lg shadow-primary/35",
            "ring-4 ring-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {reduceMotion ? (
            <ChevronUp className="size-7" strokeWidth={2.5} aria-hidden />
          ) : (
            <motion.span
              className="flex flex-col items-center leading-none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <ChevronUp className="size-5 -mb-1 opacity-80" strokeWidth={2.5} />
              <ChevronUp className="size-6" strokeWidth={2.5} />
            </motion.span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
