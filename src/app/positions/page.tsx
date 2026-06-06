import Link from "next/link";

import { Header } from "@/components/marketlab/header";
import { PositionCard } from "@/components/marketlab/position-card";
import { PositionsEmptyState } from "@/components/marketlab/positions-empty-state";
import { Button } from "@/components/ui/button";
import { getAuthState } from "@/lib/auth/queries";
import { getUserPositions } from "@/lib/positions/queries";

export default async function PositionsPage() {
  const auth = await getAuthState();
  const positions = auth.user ? await getUserPositions() : [];

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            My Positions
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Markets where you hold fake-money Yes or No shares.
          </p>
        </div>

        {!auth.user ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
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
          </div>
        ) : positions.length === 0 ? (
          <PositionsEmptyState />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
