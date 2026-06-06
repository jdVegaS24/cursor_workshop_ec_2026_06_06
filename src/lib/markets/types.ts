import type { Tables } from "@/lib/supabase/database.types";

export type Market = Tables<"markets">;

export type MarketStatus = "open" | "closed" | "resolved";

export type ChartPoint = {
  timestamp: string;
  yesChance: number;
};

export type PositionTotals = {
  yesTotal: number;
  noTotal: number;
};

export type LedgerEntryRow = {
  created_at: string;
  amount_cents: number;
  entry_type: string;
  description: string;
};
