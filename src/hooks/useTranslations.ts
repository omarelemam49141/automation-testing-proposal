"use client";

import { useLocale } from "@/context/LocaleContext";
import { messages, type MessageKey } from "@/lib/messages";

export function useTranslations() {
  const { locale, setLocale } = useLocale();
  const t = (key: MessageKey) => messages[locale][key];
  return { t, locale, setLocale };
}
