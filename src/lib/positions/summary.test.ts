import { describe, expect, it } from "vitest";

import { summarizePositions } from "@/lib/positions/summary";
import type { PositionWithMarket } from "@/lib/positions/types";

function makePosition(
  overrides: Partial<PositionWithMarket> = {},
): PositionWithMarket {
  return {
    id: "pos-1",
    market_id: "market-1",
    yes_shares_cents: 100,
    no_shares_cents: 50,
    updated_at: "2026-01-01T00:00:00.000Z",
    markets: {
      id: "market-1",
      title: "Test market",
      status: "open",
      close_date: "2026-12-31T00:00:00.000Z",
    },
    ...overrides,
  };
}

describe("summarizePositions", () => {
  it("returns zeroed summary for an empty list", () => {
    expect(summarizePositions([])).toEqual({
      marketCount: 0,
      totalShareCents: 0,
      yesExposureCents: 0,
      noExposureCents: 0,
    });
  });

  it("totals markets held and share exposure", () => {
    expect(
      summarizePositions([
        makePosition({ yes_shares_cents: 200, no_shares_cents: 100 }),
        makePosition({
          id: "pos-2",
          market_id: "market-2",
          yes_shares_cents: 50,
          no_shares_cents: 25,
        }),
      ]),
    ).toEqual({
      marketCount: 2,
      totalShareCents: 375,
      yesExposureCents: 250,
      noExposureCents: 125,
    });
  });
});
