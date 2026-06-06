import { SurfaceCard } from "@/components/marketlab/surface-card";

export function MarketEmptyState() {
  return (
    <SurfaceCard className="border-dashed px-6 py-14 text-center">
      <h2 className="text-lg font-semibold">No markets yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Markets will appear here once they are added to Supabase. This workshop
        app does not use real money.
      </p>
    </SurfaceCard>
  );
}
