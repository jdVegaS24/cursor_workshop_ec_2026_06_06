import { StatTile } from "@/components/marketlab/stat-tile";
import { formatFakeDollarsFromCents } from "@/lib/fake-money";
import type { PositionsSummary } from "@/lib/positions/summary";

type PositionsSummaryRowProps = {
  summary: PositionsSummary;
};

export function PositionsSummaryRow({ summary }: PositionsSummaryRowProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile label="Markets held" value={summary.marketCount} tone="brand" />
      <StatTile
        label="Total shares"
        value={formatFakeDollarsFromCents(summary.totalShareCents)}
      />
      <StatTile
        label="Yes exposure"
        value={formatFakeDollarsFromCents(summary.yesExposureCents)}
        tone="yes"
      />
      <StatTile
        label="No exposure"
        value={formatFakeDollarsFromCents(summary.noExposureCents)}
        tone="no"
      />
    </div>
  );
}
