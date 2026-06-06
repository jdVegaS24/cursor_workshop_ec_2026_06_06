import { describe, expect, it } from "vitest";

import { getBuySharePreview } from "@/lib/trading/buy-preview";

describe("getBuySharePreview", () => {
  it("returns null preview for empty input", () => {
    expect(getBuySharePreview("")).toEqual({
      shareCents: null,
      error: null,
    });
  });

  it("returns share cents for valid amounts", () => {
    expect(getBuySharePreview("1.50")).toEqual({
      shareCents: 150,
      error: null,
    });
  });

  it("returns validation errors for invalid amounts", () => {
    expect(getBuySharePreview("1.999").error).toBeTruthy();
    expect(getBuySharePreview("1.999").shareCents).toBeNull();
  });
});
