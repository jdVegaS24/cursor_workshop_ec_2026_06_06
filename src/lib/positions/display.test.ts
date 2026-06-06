import { describe, expect, it } from "vitest";

import { formatShareAmount, formatTotalShares } from "@/lib/positions/display";

describe("positions display", () => {
  it("formats yes and no share amounts", () => {
    expect(formatShareAmount(250)).toBe("$2.50 fake");
    expect(formatShareAmount(100)).toBe("$1.00 fake");
  });

  it("formats total shares from yes plus no", () => {
    expect(formatTotalShares(300, 200)).toBe("$5.00 fake");
  });
});
