import Link from "next/link";

import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";
import { formatCloseDate } from "@/lib/markets/format";
import { formatShareAmount, formatTotalShares } from "@/lib/positions/display";
import type { PositionWithMarket } from "@/lib/positions/types";

type PositionCardProps = {
  position: PositionWithMarket;
};

export function PositionCard({ position }: PositionCardProps) {
  const market = position.markets;

  if (!market) {
    return null;
  }

  return (
    <SurfaceCard
      as="article"
      className="flex h-full flex-col p-5 transition-colors hover:border-brand/30"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug">{market.title}</h2>
        <MarketStatusBadge status={market.status} />
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Close date
          </dt>
          <dd className="mt-1 font-medium">
            {formatCloseDate(market.close_date)}
          </dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-3 py-2">
            <dt className="text-xs text-muted-foreground">Yes shares</dt>
            <dd className="font-medium text-emerald-700 dark:text-emerald-300">
              {formatShareAmount(position.yes_shares_cents)}
            </dd>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/8 px-3 py-2">
            <dt className="text-xs text-muted-foreground">No shares</dt>
            <dd className="font-medium text-rose-700 dark:text-rose-300">
              {formatShareAmount(position.no_shares_cents)}
            </dd>
          </div>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Total shares
          </dt>
          <dd className="mt-1 font-medium">
            {formatTotalShares(
              position.yes_shares_cents,
              position.no_shares_cents,
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-border/70 pt-4">
        <Button asChild className="w-full">
          <Link href={`/markets/${market.id}`}>View market</Link>
        </Button>
      </div>
    </SurfaceCard>
  );
}
