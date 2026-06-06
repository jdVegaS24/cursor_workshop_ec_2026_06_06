export function MarketEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">No markets yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Markets will appear here once they are added to Supabase. This workshop
        app uses fake money only.
      </p>
    </div>
  );
}
