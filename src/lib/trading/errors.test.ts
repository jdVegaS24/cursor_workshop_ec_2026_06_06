import { describe, expect, it } from "vitest";

import { mapBuyErrorMessage } from "@/lib/trading/errors";

describe("mapBuyErrorMessage", () => {
  it("maps overspending errors", () => {
    expect(mapBuyErrorMessage("insufficient_balance")).toBe(
      "You do not have enough fake money for this buy.",
    );
  });

  it("maps invalid side errors", () => {
    expect(mapBuyErrorMessage("invalid_side")).toBe(
      "Choose Yes or No before buying.",
    );
  });

  it("maps signed-out errors", () => {
    expect(mapBuyErrorMessage("not_authenticated")).toBe(
      "Sign in to buy fake-money shares.",
    );
  });
});
