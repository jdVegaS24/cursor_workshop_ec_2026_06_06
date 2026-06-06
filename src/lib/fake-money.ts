export type ParseFakeDollarsResult =
  | { ok: true; cents: number }
  | { ok: false; error: string };

export function parseFakeDollarsToCents(input: string): ParseFakeDollarsResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Enter a fake dollar amount." };
  }

  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
    return {
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    };
  }

  const [wholePart, fractionPart = ""] = trimmed.split(".");

  if (
    !/^\d+$/.test(wholePart) ||
    (fractionPart && !/^\d{1,2}$/.test(fractionPart))
  ) {
    return {
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    };
  }

  const wholeCents = Number(wholePart) * 100;
  const fractionCents =
    fractionPart.length === 0
      ? 0
      : Number(fractionPart.padEnd(2, "0").slice(0, 2));
  const totalCents = wholeCents + fractionCents;

  if (!Number.isSafeInteger(totalCents) || totalCents <= 0) {
    return { ok: false, error: "Amount must be greater than zero." };
  }

  return { ok: true, cents: totalCents };
}

export function formatFakeDollarsFromCents(cents: number): string {
  const dollars = (cents / 100).toFixed(2);
  return `$${dollars} fake`;
}

export function getTotalShareCents(
  yesSharesCents: number,
  noSharesCents: number,
): number {
  return yesSharesCents + noSharesCents;
}
