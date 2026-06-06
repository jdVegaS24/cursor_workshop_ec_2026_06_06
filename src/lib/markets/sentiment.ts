import { applyLedgerEntry } from "@/lib/markets/ledger";
import type {
  ChartPoint,
  LedgerEntryRow,
  PositionTotals,
} from "@/lib/markets/types";

export const NEUTRAL_YES_CHANCE = 50;

export function calculateYesChance(yesTotal: number, noTotal: number): number {
  const sum = yesTotal + noTotal;
  if (sum <= 0) {
    return NEUTRAL_YES_CHANCE;
  }
  return Math.round((yesTotal / sum) * 100);
}

export function resolveYesChance(totals: PositionTotals | null): number {
  if (!totals) {
    return NEUTRAL_YES_CHANCE;
  }
  return calculateYesChance(totals.yesTotal, totals.noTotal);
}

export function isMarketWideAggregate(
  rows: Array<{ yes_shares_cents: number; no_shares_cents: number }>,
  distinctUserCount: number | null,
): PositionTotals | null {
  if (rows.length === 0) {
    return null;
  }

  if (distinctUserCount !== null && distinctUserCount > 1) {
    return {
      yesTotal: rows.reduce((sum, row) => sum + row.yes_shares_cents, 0),
      noTotal: rows.reduce((sum, row) => sum + row.no_shares_cents, 0),
    };
  }

  return null;
}

type BuildChartSeriesInput = {
  marketCreatedAt: string;
  now?: Date;
  yesChance: number;
  ledgerEntries?: LedgerEntryRow[];
};

export function buildChartSeries({
  marketCreatedAt,
  now = new Date(),
  yesChance,
  ledgerEntries = [],
}: BuildChartSeriesInput): { points: ChartPoint[]; isFlatFallback: boolean } {
  const sorted = [...ledgerEntries].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  const historyPoints: ChartPoint[] = [];
  let totals = { yes: 0, no: 0 };

  for (const entry of sorted) {
    const nextTotals = applyLedgerEntry(totals, entry);
    if (nextTotals.yes === totals.yes && nextTotals.no === totals.no) {
      continue;
    }
    totals = nextTotals;
    historyPoints.push({
      timestamp: entry.created_at,
      yesChance: calculateYesChance(totals.yes, totals.no),
    });
  }

  if (historyPoints.length >= 2) {
    return { points: historyPoints, isFlatFallback: false };
  }

  const start = new Date(marketCreatedAt).toISOString();
  const end = now.toISOString();

  return {
    points: [
      { timestamp: start, yesChance },
      { timestamp: end, yesChance },
    ],
    isFlatFallback: true,
  };
}

export function filterChartPointsByRange(
  points: ChartPoint[],
  range: "all" | "7d" | "24h",
  now = new Date(),
): ChartPoint[] {
  if (range === "all" || points.length === 0) {
    return points;
  }

  const windowMs =
    range === "7d" ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const cutoff = now.getTime() - windowMs;
  const filtered = points.filter(
    (point) => new Date(point.timestamp).getTime() >= cutoff,
  );

  if (filtered.length >= 2) {
    return filtered;
  }

  return points;
}
