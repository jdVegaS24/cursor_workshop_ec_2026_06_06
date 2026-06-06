import Link from "next/link";

import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";
import { formatCloseDate } from "@/lib/markets/format";
import type { Market } from "@/lib/markets/types";

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  return (
    <SurfaceCard
      as="article"
      className="group flex h-full flex-col p-5 transition-colors hover:border-brand/30"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-card-foreground">
          {market.title}
        </h2>
        <MarketStatusBadge status={market.status} />
      </div>
      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
        {market.description || "No description provided."}
      </p>
      <div className="mt-auto space-y-4 border-t border-border/70 pt-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Yes / No market</span>
          <span>Closes {formatCloseDate(market.close_date)}</span>
        </div>
        <Button asChild className="w-full">
          <Link href={`/markets/${market.id}`}>View market</Link>
        </Button>
      </div>
    </SurfaceCard>
  );
}
