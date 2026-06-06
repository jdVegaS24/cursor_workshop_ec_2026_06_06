import type { PositionWithMarket, UserPosition } from "@/lib/positions/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getUserPositionForMarket(
  marketId: string,
): Promise<UserPosition | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("positions")
    .select("yes_shares_cents, no_shares_cents")
    .eq("market_id", marketId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getUserPositions(): Promise<PositionWithMarket[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("positions")
    .select(
      "id, market_id, yes_shares_cents, no_shares_cents, updated_at, markets ( id, title, status, close_date )",
    )
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data
    .filter(
      (position) =>
        position.yes_shares_cents + position.no_shares_cents > 0 &&
        position.markets !== null,
    )
    .map((position) => ({
      ...position,
      markets: position.markets as PositionWithMarket["markets"],
    }));
}
