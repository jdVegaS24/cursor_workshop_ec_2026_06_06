import type { LedgerEntryRow } from "@/lib/markets/types";

export type LedgerSide = "yes" | "no";

export function parseLedgerSide(
  entryType: string,
  description: string,
): LedgerSide | null {
  const haystack = `${entryType} ${description}`.toLowerCase();

  if (/\b(yes|buy_yes|trade_yes|yes_share)\b/.test(haystack)) {
    return "yes";
  }

  if (/\b(no|buy_no|trade_no|no_share)\b/.test(haystack)) {
    return "no";
  }

  return null;
}

export function applyLedgerEntry(
  totals: { yes: number; no: number },
  entry: Pick<LedgerEntryRow, "amount_cents" | "entry_type" | "description">,
): { yes: number; no: number } {
  const side = parseLedgerSide(entry.entry_type, entry.description);
  const amount = Math.abs(entry.amount_cents);

  if (side === "yes") {
    return { yes: totals.yes + amount, no: totals.no };
  }

  if (side === "no") {
    return { yes: totals.yes, no: totals.no + amount };
  }

  return totals;
}
