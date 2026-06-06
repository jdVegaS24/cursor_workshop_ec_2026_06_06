import { isMarketWideAggregate } from "@/lib/markets/sentiment";
import type {
  LedgerEntryRow,
  Market,
  PositionTotals,
} from "@/lib/markets/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type MarketsQueryResult =
  | { ok: true; markets: Market[] }
  | { ok: false; error: "not_configured" | "query_failed"; message: string };

export type MarketQueryResult =
  | { ok: true; market: Market }
  | {
      ok: false;
      error: "not_configured" | "not_found" | "query_failed";
      message: string;
    };

export async function getMarkets(): Promise<MarketsQueryResult> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      error: "not_configured",
      message: "Supabase is not configured for this environment.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .order("close_date", { ascending: true });

  if (error) {
    return {
      ok: false,
      error: "query_failed",
      message: error.message,
    };
  }

  return { ok: true, markets: data ?? [] };
}

export async function getMarketById(id: string): Promise<MarketQueryResult> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      error: "not_configured",
      message: "Supabase is not configured for this environment.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      error: "query_failed",
      message: error.message,
    };
  }

  if (!data) {
    return {
      ok: false,
      error: "not_found",
      message: "Market not found.",
    };
  }

  return { ok: true, market: data };
}

export async function tryGetMarketPositionTotals(
  marketId: string,
): Promise<PositionTotals | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("positions")
    .select("yes_shares_cents, no_shares_cents, user_id")
    .eq("market_id", marketId);

  if (error || !data || data.length === 0) {
    return null;
  }

  const distinctUsers = new Set(data.map((row) => row.user_id)).size;
  return isMarketWideAggregate(data, distinctUsers);
}

export async function tryGetMarketLedgerEntries(
  marketId: string,
): Promise<LedgerEntryRow[] | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("ledger_entries")
    .select("created_at, amount_cents, entry_type, description, user_id")
    .eq("market_id", marketId)
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return null;
  }

  const distinctUsers = new Set(data.map((row) => row.user_id)).size;
  if (distinctUsers <= 1) {
    return null;
  }

  return data.map(({ created_at, amount_cents, entry_type, description }) => ({
    created_at,
    amount_cents,
    entry_type,
    description,
  }));
}
