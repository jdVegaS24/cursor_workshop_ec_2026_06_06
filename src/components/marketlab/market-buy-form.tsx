"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatFakeDollarsFromCents } from "@/lib/fake-money";
import type { UserPosition } from "@/lib/positions/types";
import { buySharesAction } from "@/lib/trading/actions";
import type { BuySharesFormState } from "@/lib/trading/types";

type MarketBuyFormProps = {
  marketId: string;
  balanceCents: number;
  position: UserPosition | null;
};

const initialState: BuySharesFormState = {};

export function MarketBuyForm({
  marketId,
  balanceCents,
  position,
}: MarketBuyFormProps) {
  const router = useRouter();
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [state, formAction, pending] = useActionState(
    buySharesAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  const yesShares = position?.yes_shares_cents ?? 0;
  const noShares = position?.no_shares_cents ?? 0;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="market_id" value={marketId} />
      <input type="hidden" name="side" value={side} />

      <div className="rounded-lg border border-border bg-background p-4 text-sm">
        <p className="text-muted-foreground">Available fake balance</p>
        <p className="mt-1 text-lg font-semibold">
          {formatFakeDollarsFromCents(balanceCents)}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p>
            <span className="text-muted-foreground">Your Yes shares: </span>
            <span className="font-medium">
              {formatFakeDollarsFromCents(yesShares)}
            </span>
          </p>
          <p>
            <span className="text-muted-foreground">Your No shares: </span>
            <span className="font-medium">
              {formatFakeDollarsFromCents(noShares)}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Choose an outcome</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant={side === "yes" ? "default" : "outline"}
            className="w-full"
            onClick={() => setSide("yes")}
            disabled={pending}
          >
            Buy Yes
          </Button>
          <Button
            type="button"
            variant={side === "no" ? "default" : "outline"}
            className="w-full"
            onClick={() => setSide("no")}
            disabled={pending}
          >
            Buy No
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="amount_dollars" className="text-sm font-medium">
          Fake dollars to spend
        </label>
        <input
          id="amount_dollars"
          name="amount_dollars"
          type="text"
          inputMode="decimal"
          placeholder="10.00"
          required
          disabled={pending}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <p className="text-xs text-muted-foreground">
          Workshop rule: 1 fake cent spent = 1 share cent. This is play money
          only.
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success && state.message ? (
        <p
          className="text-sm text-emerald-700 dark:text-emerald-300"
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Buying..." : `Buy ${side === "yes" ? "Yes" : "No"} shares`}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        View all holdings on{" "}
        <Link href="/positions" className="font-medium text-foreground">
          My Positions
        </Link>
        .
      </p>
    </form>
  );
}
