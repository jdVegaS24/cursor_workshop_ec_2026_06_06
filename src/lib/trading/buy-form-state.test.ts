import { describe, expect, it } from "vitest";

import { getMarketBuyFormView } from "@/lib/trading/buy-form-state";

describe("getMarketBuyFormView", () => {
  it("returns signed-out when user is not authenticated", () => {
    expect(getMarketBuyFormView({ signedIn: false, buyable: true })).toBe(
      "signed-out",
    );
  });

  it("returns not-buyable for closed markets", () => {
    expect(getMarketBuyFormView({ signedIn: true, buyable: false })).toBe(
      "not-buyable",
    );
  });

  it("returns ready for signed-in open markets", () => {
    expect(getMarketBuyFormView({ signedIn: true, buyable: true })).toBe(
      "ready",
    );
  });
});
