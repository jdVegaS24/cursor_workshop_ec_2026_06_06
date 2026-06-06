import { describe, expect, it } from "vitest";

import {
  buildChartSeries,
  calculateYesChance,
  filterChartPointsByRange,
  isMarketWideAggregate,
  NEUTRAL_YES_CHANCE,
  resolveYesChance,
} from "@/lib/markets/sentiment";

describe("calculateYesChance", () => {
  it("returns 70 when yes totals dominate", () => {
    expect(calculateYesChance(700, 300)).toBe(70);
  });

  it("returns neutral 50% when totals are empty", () => {
    expect(calculateYesChance(0, 0)).toBe(NEUTRAL_YES_CHANCE);
  });
});

describe("resolveYesChance", () => {
  it("uses neutral baseline when aggregate positions are unavailable", () => {
    expect(resolveYesChance(null)).toBe(NEUTRAL_YES_CHANCE);
  });
});

describe("isMarketWideAggregate", () => {
  it("returns null for a single-user partial view under RLS", () => {
    expect(
      isMarketWideAggregate(
        [{ yes_shares_cents: 500, no_shares_cents: 100 }],
        1,
      ),
    ).toBeNull();
  });

  it("aggregates totals when multiple users are visible", () => {
    expect(
      isMarketWideAggregate(
        [
          { yes_shares_cents: 500, no_shares_cents: 100 },
          { yes_shares_cents: 200, no_shares_cents: 300 },
        ],
        2,
      ),
    ).toEqual({ yesTotal: 700, noTotal: 400 });
  });
});

describe("buildChartSeries", () => {
  const now = new Date("2026-06-06T12:00:00.000Z");

  it("renders a flat current-state line when ledger history is unavailable", () => {
    const result = buildChartSeries({
      marketCreatedAt: "2026-06-01T12:00:00.000Z",
      now,
      yesChance: 50,
      ledgerEntries: [],
    });

    expect(result.isFlatFallback).toBe(true);
    expect(result.points).toHaveLength(2);
    expect(result.points[0].yesChance).toBe(50);
    expect(result.points[1].yesChance).toBe(50);
  });

  it("builds history when ledger entries include side information", () => {
    const result = buildChartSeries({
      marketCreatedAt: "2026-06-01T12:00:00.000Z",
      now,
      yesChance: 50,
      ledgerEntries: [
        {
          created_at: "2026-06-02T12:00:00.000Z",
          amount_cents: 100,
          entry_type: "buy_yes",
          description: "yes shares",
        },
        {
          created_at: "2026-06-03T12:00:00.000Z",
          amount_cents: 100,
          entry_type: "buy_no",
          description: "no shares",
        },
      ],
    });

    expect(result.isFlatFallback).toBe(false);
    expect(result.points.length).toBeGreaterThanOrEqual(2);
  });
});

describe("filterChartPointsByRange", () => {
  const points = [
    { timestamp: "2026-05-01T00:00:00.000Z", yesChance: 40 },
    { timestamp: "2026-06-05T00:00:00.000Z", yesChance: 60 },
  ];

  it("keeps all points for the all range", () => {
    expect(filterChartPointsByRange(points, "all").length).toBe(2);
  });
});
