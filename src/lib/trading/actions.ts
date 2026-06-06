"use server";

import { revalidatePath } from "next/cache";

import { parseFakeDollarsToCents } from "@/lib/fake-money";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapBuyErrorMessage } from "@/lib/trading/errors";
import type { BuySharesFormState, BuySharesResult } from "@/lib/trading/types";

function readField(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export async function buySharesAction(
  _prevState: BuySharesFormState,
  formData: FormData,
): Promise<BuySharesFormState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase is not configured for this environment." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sign in to buy fake-money shares." };
  }

  const marketId = readField(formData, "market_id");
  const side = readField(formData, "side");
  const amountDollars = readField(formData, "amount_dollars");

  if (!marketId) {
    return { error: "Market not found." };
  }

  if (side !== "yes" && side !== "no") {
    return { error: "Choose Yes or No before buying." };
  }

  const parsedAmount = parseFakeDollarsToCents(amountDollars);
  if (!parsedAmount.ok) {
    return { error: parsedAmount.error };
  }

  const { data, error } = await supabase.rpc("buy_market_shares", {
    p_market_id: marketId,
    p_side: side,
    p_amount_cents: parsedAmount.cents,
  });

  if (error) {
    return { error: mapBuyErrorMessage(error.message) };
  }

  const result = data as BuySharesResult | null;
  if (!result) {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath(`/markets/${marketId}`);
  revalidatePath("/positions");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: `Bought ${side === "yes" ? "Yes" : "No"} shares with fake money.`,
  };
}
