import { formatMarketStatus } from "@/lib/markets/format";
import type { MarketStatus } from "@/lib/markets/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<MarketStatus, string> = {
  open: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  resolved: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
};

type MarketStatusBadgeProps = {
  status: string;
  className?: string;
};

export function MarketStatusBadge({
  status,
  className,
}: MarketStatusBadgeProps) {
  const style =
    status in STATUS_STYLES
      ? STATUS_STYLES[status as MarketStatus]
      : "border-border bg-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        style,
        className,
      )}
    >
      {formatMarketStatus(status)}
    </span>
  );
}
