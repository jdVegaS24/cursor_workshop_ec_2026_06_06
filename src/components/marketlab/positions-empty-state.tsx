import Link from "next/link";

import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";

export function PositionsEmptyState() {
  return (
    <SurfaceCard className="border-dashed px-6 py-14 text-center">
      <h2 className="text-lg font-semibold">No positions yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Buy Yes or No shares in an open market to see your fake-money positions
        here.
      </p>
      <Button asChild className="mt-5">
        <Link href="/markets">Browse markets</Link>
      </Button>
    </SurfaceCard>
  );
}
