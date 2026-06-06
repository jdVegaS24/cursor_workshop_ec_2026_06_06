"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { TextField } from "@/components/marketlab/text-field";
import { Button } from "@/components/ui/button";
import { formatFakeDollarsFromCents } from "@/lib/fake-money";
import type { UserPosition } from "@/lib/positions/types";
import { buySharesAction } from "@/lib/trading/actions";
import { getBuySharePreview } from "@/lib/trading/buy-preview";
import type { BuySharesFormState } from "@/lib/trading/types";
import { cn } from "@/lib/utils";

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
  const [amountInput, setAmountInput] = useState("");
  const [state, formAction, pending] = useActionState(
    buySharesAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setAmountInput("");
      router.refresh();
    }
  }, [state.success, router]);

  const yesShares = position?.yes_shares_cents ?? 0;
  const noShares = position?.no_shares_cents ?? 0;
  const preview = getBuySharePreview(amountInput);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="market_id" value={marketId} />
      <input type="hidden" name="side" value={side} />

      <div className="rounded-xl border border-border/80 bg-muted/25 p-4 text-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Available fake balance
        </p>
        <p className="mt-1 text-xl font-semibold text-brand-foreground">
          {formatFakeDollarsFromCents(balanceCents)}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-3 py-2">
            <p className="text-xs text-muted-foreground">Your Yes shares</p>
            <p className="font-medium text-emerald-700 dark:text-emerald-300">
              {formatFakeDollarsFromCents(yesShares)}
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/8 px-3 py-2">
            <p className="text-xs text-muted-foreground">Your No shares</p>
            <p className="font-medium text-rose-700 dark:text-rose-300">
              {formatFakeDollarsFromCents(noShares)}
            </p>
          </div>
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Choose an outcome</legend>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/80 bg-muted/20 p-1">
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "h-10 w-full rounded-lg border border-transparent",
              side === "yes" &&
                "border-emerald-500/30 bg-emerald-500/12 text-emerald-800 hover:bg-emerald-500/16 dark:text-emerald-200",
            )}
            onClick={() => setSide("yes")}
            disabled={pending}
            aria-pressed={side === "yes"}
          >
            Buy Yes
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "h-10 w-full rounded-lg border border-transparent",
              side === "no" &&
                "border-rose-500/30 bg-rose-500/12 text-rose-800 hover:bg-rose-500/16 dark:text-rose-200",
            )}
            onClick={() => setSide("no")}
            disabled={pending}
            aria-pressed={side === "no"}
          >
            Buy No
          </Button>
        </div>
      </fieldset>

      <TextField
        id="amount_dollars"
        label="Fake dollars to spend"
        name="amount_dollars"
        type="text"
        inputMode="decimal"
        placeholder="10.00"
        required
        disabled={pending}
        value={amountInput}
        onChange={(event) => setAmountInput(event.target.value)}
        hint="1 fake cent spent = 1 share cent."
        error={preview.error}
      />

      <div
        className="rounded-xl border border-border/80 bg-background px-4 py-3 text-sm"
        aria-live="polite"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Share preview
        </p>
        <p className="mt-1 font-medium">
          {preview.shareCents !== null
            ? `${formatFakeDollarsFromCents(preview.shareCents)} of ${side === "yes" ? "Yes" : "No"} shares`
            : "Enter an amount to preview share cents."}
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success && state.message ? (
        <p
          className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200"
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" className="h-11 w-full" disabled={pending}>
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
