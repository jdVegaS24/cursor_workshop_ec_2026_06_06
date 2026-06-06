import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";
import type { Market } from "@/lib/markets/types";

type MarketInfoCardProps = {
  market: Market;
};

export function MarketInfoCard({ market }: MarketInfoCardProps) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-foreground">
            Yes / No market
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {market.title}
          </h1>
        </div>
        <MarketStatusBadge status={market.status} />
      </div>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
        {market.description || "No description provided."}
      </p>
      <dl className="mt-6 grid gap-4 border-t border-border/70 pt-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Status
          </dt>
          <dd className="mt-1 text-sm font-medium">
            {formatMarketStatus(market.status)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Close date
          </dt>
          <dd className="mt-1 text-sm font-medium">
            {formatCloseDate(market.close_date)}
          </dd>
        </div>
      </dl>
    </SurfaceCard>
  );
}
