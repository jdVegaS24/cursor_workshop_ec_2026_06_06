import { FakeMoneyChips } from "@/components/marketlab/fake-money-chips";
import { MarketCard } from "@/components/marketlab/market-card";
import { MarketEmptyState } from "@/components/marketlab/market-empty-state";
import { PageHeader } from "@/components/marketlab/page-header";
import { PageShell } from "@/components/marketlab/page-shell";
import { getMarkets } from "@/lib/markets/queries";

export default async function MarketsPage() {
  const result = await getMarkets();

  return (
    <PageShell>
      <PageHeader
        title="Markets"
        description="Browse fictional Yes/No markets using fake money."
      >
        <FakeMoneyChips />
      </PageHeader>

      {!result.ok ? (
        <div
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
          role="alert"
        >
          {result.message}
        </div>
      ) : result.markets.length === 0 ? (
        <MarketEmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {result.markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
