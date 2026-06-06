import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StatTileProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "yes" | "no" | "brand";
  className?: string;
};

const TONE_STYLES = {
  default: "border-border/80 bg-muted/30",
  yes: "border-emerald-500/25 bg-emerald-500/8",
  no: "border-rose-500/25 bg-rose-500/8",
  brand: "border-brand/25 bg-brand/8",
} as const;

const VALUE_TONE_STYLES = {
  default: "text-foreground",
  yes: "text-emerald-700 dark:text-emerald-300",
  no: "text-rose-700 dark:text-rose-300",
  brand: "text-brand-foreground",
} as const;

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3",
        TONE_STYLES[tone],
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-semibold tracking-tight",
          VALUE_TONE_STYLES[tone],
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
