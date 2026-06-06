import { Header } from "@/components/marketlab/header";
import { MarketCard } from "@/components/marketlab/market-card";
import { MarketEmptyState } from "@/components/marketlab/market-empty-state";
import { getMarkets } from "@/lib/markets/queries";

export default async function MarketsPage() {
  const result = await getMarkets();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Markets</h1>
          <p className="max-w-2xl text-muted-foreground">
            Browse fictional Yes/No markets using fake money.
          </p>
        </div>

        {!result.ok ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            {result.message}
          </div>
        ) : result.markets.length === 0 ? (
          <MarketEmptyState />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {result.markets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
