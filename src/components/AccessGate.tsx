"use client";
/* Client-only gate for static hosting: deters casual access; the expected hash ships in JS and
   prerendered HTML may still contain page copy — not a substitute for server auth or private hosting. */

import { useLayoutEffect, useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";

const STORAGE_KEY = "proposal_access_granted";

function getExpectedHash(): string {
  const v = process.env.NEXT_PUBLIC_PROPOSAL_PASSWORD_SHA256;
  return typeof v === "string" ? v.trim().toLowerCase() : "";
}

async function sha256Hex(plain: string): Promise<string> {
  const data = new TextEncoder().encode(plain);
  const buf = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(buf);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function AccessGate({ children }: { children: React.ReactNode }) {
  const { t } = useTranslations();
  const expectedHash = getExpectedHash();
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">(() =>
    expectedHash ? "checking" : "unlocked"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useLayoutEffect(() => {
    if (!expectedHash) {
      setStatus("unlocked");
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setStatus("unlocked");
      } else {
        setStatus("locked");
      }
    } catch {
      setStatus("locked");
    }
  }, [expectedHash]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectedHash || busy) return;
    setBusy(true);
    setError(false);
    try {
      const hex = (await sha256Hex(password)).toLowerCase();
      if (hex === expectedHash) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setStatus("unlocked");
        setPassword("");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-pulse rounded-full bg-primary/30" aria-hidden />
        <span className="sr-only">{t("accessLoading")}</span>
      </div>
    );
  }

  if (status === "locked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="size-6" aria-hidden />
            </div>
            <h1 className="text-lg font-bold text-foreground">{t("accessTitle")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("accessSubtitle")}</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="proposal-password" className="sr-only">
                {t("accessPlaceholder")}
              </label>
              <input
                id="proposal-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                  setError(false);
                }}
                placeholder={t("accessPlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring/50 transition-[box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px]"
              />
              {error ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                  {t("accessError")}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={busy || !password.trim()}>
              {busy ? t("accessSubmitting") : t("accessSubmit")}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
