import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/marketlab/header";
import { MarketBuySection } from "@/components/marketlab/market-buy-section";
import { MarketInfoCard } from "@/components/marketlab/market-info-card";
import { MarketOutcomes } from "@/components/marketlab/market-outcomes";
import { ProbabilityChartSection } from "@/components/marketlab/probability-chart-section";
import {
  getMarketById,
  tryGetMarketLedgerEntries,
  tryGetMarketPositionTotals,
} from "@/lib/markets/queries";
import { buildChartSeries, resolveYesChance } from "@/lib/markets/sentiment";

type MarketDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MarketDetailPage({
  params,
}: MarketDetailPageProps) {
  const { id } = await params;
  const result = await getMarketById(id);

  if (!result.ok) {
    if (result.error === "not_found") {
      notFound();
    }

    return (
      <div className="min-h-svh bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            {result.message}
          </div>
        </main>
      </div>
    );
  }

  const market = result.market;
  const positionTotals = await tryGetMarketPositionTotals(market.id);
  const yesChance = resolveYesChance(positionTotals);
  const ledgerEntries = await tryGetMarketLedgerEntries(market.id);
  const { points, isFlatFallback } = buildChartSeries({
    marketCreatedAt: market.created_at,
    yesChance,
    ledgerEntries: ledgerEntries ?? [],
  });

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <Link
          href="/markets"
          className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to markets
        </Link>

        <MarketInfoCard market={market} />
        <MarketOutcomes yesChance={yesChance} />
        <ProbabilityChartSection
          points={points}
          yesChance={yesChance}
          isFlatFallback={isFlatFallback}
        />
        <MarketBuySection market={market} />
      </main>
    </div>
  );
}
