import Link from "next/link";

import { MarketBuyForm } from "@/components/marketlab/market-buy-form";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";
import { getAuthState } from "@/lib/auth/queries";
import { isMarketBuyable } from "@/lib/markets/is-market-buyable";
import type { Market } from "@/lib/markets/types";
import { getUserPositionForMarket } from "@/lib/positions/queries";
import { getMarketBuyFormView } from "@/lib/trading/buy-form-state";

type MarketBuySectionProps = {
  market: Market;
};

export async function MarketBuySection({ market }: MarketBuySectionProps) {
  const auth = await getAuthState();
  const buyable = isMarketBuyable(market);
  const view = getMarketBuyFormView({
    signedIn: Boolean(auth.user),
    buyable,
  });

  const position =
    auth.user && buyable ? await getUserPositionForMarket(market.id) : null;

  return (
    <SurfaceCard className="p-6">
      <h2 className="text-lg font-semibold">Buy fake-money shares</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Spend fake cents to collect Yes or No shares.
      </p>

      {view === "signed-out" ? (
        <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/30 p-5">
          <p className="text-sm text-muted-foreground">
            Sign in to buy fake-money shares and track your positions.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      ) : null}

      {view === "not-buyable" ? (
        <div
          className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 text-sm text-muted-foreground"
          role="status"
        >
          Buying is unavailable because this market is closed, resolved, or past
          its close date.
        </div>
      ) : null}

      {view === "ready" && auth.profile ? (
        <div className="mt-5">
          <MarketBuyForm
            marketId={market.id}
            balanceCents={auth.profile.balance_cents}
            position={position}
          />
        </div>
      ) : null}

      {view === "ready" && auth.user && !auth.profile ? (
        <p className="mt-5 text-sm text-muted-foreground" role="status">
          Your profile is still loading. Refresh and try again in a moment.
        </p>
      ) : null}
    </SurfaceCard>
  );
}
