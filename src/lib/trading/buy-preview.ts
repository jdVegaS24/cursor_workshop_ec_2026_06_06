import { parseFakeDollarsToCents } from "@/lib/fake-money";

export type BuySharePreview = {
  shareCents: number | null;
  error: string | null;
};

export function getBuySharePreview(amountInput: string): BuySharePreview {
  const trimmed = amountInput.trim();

  if (!trimmed) {
    return { shareCents: null, error: null };
  }

  const parsed = parseFakeDollarsToCents(trimmed);

  if (!parsed.ok) {
    return { shareCents: null, error: parsed.error };
  }

  return { shareCents: parsed.cents, error: null };
}
