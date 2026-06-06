import { getTotalShareCents } from "@/lib/fake-money";
import type { PositionWithMarket } from "@/lib/positions/types";

export type PositionsSummary = {
  marketCount: number;
  totalShareCents: number;
  yesExposureCents: number;
  noExposureCents: number;
};

export function summarizePositions(
  positions: PositionWithMarket[],
): PositionsSummary {
  return positions.reduce(
    (summary, position) => ({
      marketCount: summary.marketCount + 1,
      totalShareCents:
        summary.totalShareCents +
        getTotalShareCents(position.yes_shares_cents, position.no_shares_cents),
      yesExposureCents: summary.yesExposureCents + position.yes_shares_cents,
      noExposureCents: summary.noExposureCents + position.no_shares_cents,
    }),
    {
      marketCount: 0,
      totalShareCents: 0,
      yesExposureCents: 0,
      noExposureCents: 0,
    },
  );
}
