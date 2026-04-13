"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "idea", key: "navIdea" },
  { id: "roi", key: "navROI" },
  { id: "features", key: "navFeatures" },
  { id: "roadmap", key: "navRoadmap" },
  { id: "timeline", key: "navTimeline" },
  { id: "current", key: "navCurrent" },
  { id: "team", key: "navTeam" },
] as const;

export function Header() {
  const { t, locale, setLocale } = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleLocale = () => setLocale(locale === "ar" ? "en" : "ar");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <span className="text-gradient-primary text-sm font-bold tracking-tight">
          {locale === "ar" ? "اختبار آلي ذكي" : "Smart Automation"}
        </span>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ id, key }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground group"
            >
              <span className="relative z-10">
                {t(key as Parameters<typeof t>[0])}
              </span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" onClick={toggleLocale} className="gap-1.5">
              <Globe className="size-4" />
              <span className="text-xs">{t("langToggle")}</span>
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "flex flex-col gap-1 overflow-hidden border-t border-border/50 bg-background/90 backdrop-blur-xl px-4 pb-4 pt-2 md:hidden",
            )}
          >
            {NAV_ITEMS.map(({ id, key }, i) => (
              <motion.button
                key={id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(id)}
                className="rounded-lg px-3 py-2 text-start text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                {t(key as Parameters<typeof t>[0])}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
