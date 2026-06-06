import Link from "next/link";

import { FakeMoneyChips } from "@/components/marketlab/fake-money-chips";
import { PageHeader } from "@/components/marketlab/page-header";
import { PageShell } from "@/components/marketlab/page-shell";
import { PositionCard } from "@/components/marketlab/position-card";
import { PositionsEmptyState } from "@/components/marketlab/positions-empty-state";
import { PositionsSummaryRow } from "@/components/marketlab/positions-summary-row";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";
import { getAuthState } from "@/lib/auth/queries";
import { getUserPositions } from "@/lib/positions/queries";
import { summarizePositions } from "@/lib/positions/summary";

export default async function PositionsPage() {
  const auth = await getAuthState();
  const positions = auth.user ? await getUserPositions() : [];
  const summary = summarizePositions(positions);

  return (
    <PageShell>
      <PageHeader
        title="My Positions"
        description="Spend fake cents to collect Yes or No shares."
      >
        <FakeMoneyChips />
      </PageHeader>

      {!auth.user ? (
        <SurfaceCard className="p-8 text-center">
          <h2 className="text-lg font-semibold">Sign in required</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Sign in to view your private fake-money positions.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </div>
        </SurfaceCard>
      ) : positions.length === 0 ? (
        <PositionsEmptyState />
      ) : (
        <div className="space-y-6">
          <PositionsSummaryRow summary={summary} />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
