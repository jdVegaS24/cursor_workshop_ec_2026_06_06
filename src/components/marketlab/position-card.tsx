import Link from "next/link";

import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
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
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-tight">{market.title}</h2>
        <MarketStatusBadge status={market.status} />
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Close date</dt>
          <dd className="font-medium">{formatCloseDate(market.close_date)}</dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Yes shares</dt>
            <dd className="font-medium text-emerald-700 dark:text-emerald-300">
              {formatShareAmount(position.yes_shares_cents)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">No shares</dt>
            <dd className="font-medium text-rose-700 dark:text-rose-300">
              {formatShareAmount(position.no_shares_cents)}
            </dd>
          </div>
        </div>
        <div>
          <dt className="text-muted-foreground">Total shares</dt>
          <dd className="font-medium">
            {formatTotalShares(
              position.yes_shares_cents,
              position.no_shares_cents,
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <Button asChild className="w-full">
          <Link href={`/markets/${market.id}`}>View market</Link>
        </Button>
      </div>
    </article>
  );
}
