import Link from "next/link";
import { notFound } from "next/navigation";

import { FakeMoneyNote } from "@/components/marketlab/fake-money-note";
import { MarketBuySection } from "@/components/marketlab/market-buy-section";
import { MarketInfoCard } from "@/components/marketlab/market-info-card";
import { MarketOutcomes } from "@/components/marketlab/market-outcomes";
import { PageShell } from "@/components/marketlab/page-shell";
import { ProbabilityChartSection } from "@/components/marketlab/probability-chart-section";
import { SurfaceCard } from "@/components/marketlab/surface-card";
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
      <PageShell>
        <div
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
          role="alert"
        >
          {result.message}
        </div>
      </PageShell>
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
    <PageShell mainClassName="space-y-6">
      <Link
        href="/markets"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Back to markets
      </Link>

      <FakeMoneyNote />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-6">
          <MarketInfoCard market={market} />
          <MarketOutcomes yesChance={yesChance} />
          <SurfaceCard className="p-6">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-semibold">Yes chance over time</h2>
              <p className="text-sm text-muted-foreground">
                Simple workshop chart based on available market activity.
              </p>
            </div>
            <ProbabilityChartSection
              points={points}
              yesChance={yesChance}
              isFlatFallback={isFlatFallback}
            />
          </SurfaceCard>
        </div>

        <div className="lg:sticky lg:top-28">
          <MarketBuySection market={market} />
        </div>
      </div>
    </PageShell>
  );
}
