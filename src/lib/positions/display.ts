import {
  formatFakeDollarsFromCents,
  getTotalShareCents,
} from "@/lib/fake-money";

export function formatShareAmount(cents: number): string {
  return formatFakeDollarsFromCents(cents);
}

export function formatTotalShares(
  yesSharesCents: number,
  noSharesCents: number,
): string {
  return formatFakeDollarsFromCents(
    getTotalShareCents(yesSharesCents, noSharesCents),
  );
}
