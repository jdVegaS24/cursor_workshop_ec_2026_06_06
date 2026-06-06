type MarketOutcomesProps = {
  yesChance: number;
};

export function MarketOutcomes({ yesChance }: MarketOutcomesProps) {
  const noChance = 100 - yesChance;

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Outcomes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Current implied chance based on available market activity.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium text-muted-foreground">Yes</p>
          <p className="mt-1 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            {yesChance}%
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium text-muted-foreground">No</p>
          <p className="mt-1 text-3xl font-semibold text-rose-600 dark:text-rose-400">
            {noChance}%
          </p>
        </div>
      </div>
    </section>
  );
}
