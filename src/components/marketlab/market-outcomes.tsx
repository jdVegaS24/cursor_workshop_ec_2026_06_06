import { SurfaceCard } from "@/components/marketlab/surface-card";

type MarketOutcomesProps = {
  yesChance: number;
};

export function MarketOutcomes({ yesChance }: MarketOutcomesProps) {
  const noChance = 100 - yesChance;

  return (
    <SurfaceCard className="p-6">
      <h2 className="text-lg font-semibold">Outcomes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Current implied chance based on available market activity.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-4">
          <p className="text-sm font-medium text-muted-foreground">Yes</p>
          <p className="mt-1 text-3xl font-semibold text-emerald-700 dark:text-emerald-300">
            {yesChance}%
          </p>
        </div>
        <div className="rounded-xl border border-rose-500/25 bg-rose-500/8 p-4">
          <p className="text-sm font-medium text-muted-foreground">No</p>
          <p className="mt-1 text-3xl font-semibold text-rose-700 dark:text-rose-300">
            {noChance}%
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}
