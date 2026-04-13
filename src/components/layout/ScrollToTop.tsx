"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

/** Show after user has scrolled down this far */
const SCROLL_SHOW_PX = 280;
/** Hide when back near top (hysteresis avoids flicker at the threshold) */
const SCROLL_HIDE_PX = 160;

export function ScrollToTop() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible((prev) => {
        if (y > SCROLL_SHOW_PX) return true;
        if (y < SCROLL_HIDE_PX) return false;
        return prev;
      });
    };
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
          initial={{ opacity: 0, scale: 0.5, y: 28, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.45, y: 20, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          whileTap={{ scale: 0.92 }}
          onClick={goTop}
          aria-label={t("scrollToTop")}
          className={cn(
            "group fixed bottom-6 inset-e-6 z-55 size-14 outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {/* Soft glow — fades in smoothly (explicit ms so Tailwind always emits CSS) */}
          <span
            className={cn(
              "pointer-events-none absolute -inset-3 rounded-full bg-linear-to-t from-primary/50 via-accent/35 to-glow/25 blur-xl",
              "opacity-0 transition-opacity ease-out",
              reduceMotion ? "hidden" : "duration-320 group-hover:opacity-100"
            )}
            aria-hidden
          />

          {/* Lift + scale: one layer so bg, shadow, and icon move together */}
          <span
            className={cn(
              "relative flex size-full items-center justify-center",
              !reduceMotion && [
                "transition-[transform,filter] duration-320 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                "group-hover:scale-[1.06] group-hover:-translate-y-1.5 group-hover:brightness-[1.08]",
              ]
            )}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full bg-linear-to-t from-primary via-primary to-accent",
                "shadow-lg shadow-primary/35",
                "transition-shadow duration-320 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                "group-hover:shadow-2xl group-hover:shadow-primary/50"
              )}
              aria-hidden
            />

            {/* Shimmer — translate + opacity with explicit transition */}
            {!reduceMotion && (
              <span
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full rtl:scale-x-[-1]"
                aria-hidden
              >
                <span
                  className={cn(
                    "absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent",
                    "translate-x-[-120%] opacity-0",
                    "transition-[transform,opacity] duration-480 ease-out",
                    "group-hover:translate-x-[220%] group-hover:opacity-100"
                  )}
                />
              </span>
            )}

            <span className="relative z-10 text-primary-foreground drop-shadow-sm">
              {reduceMotion ? (
                <ChevronUp className="size-7" strokeWidth={2.5} aria-hidden />
              ) : (
                <motion.span
                  className="flex flex-col items-center leading-none"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ y: -2, transition: { duration: 0.25, ease: "easeOut" } }}
                  aria-hidden
                >
                  <ChevronUp className="size-5 -mb-1 opacity-85" strokeWidth={2.5} />
                  <ChevronUp className="size-6" strokeWidth={2.5} />
                </motion.span>
              )}
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
