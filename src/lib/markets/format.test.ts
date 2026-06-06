import { describe, expect, it } from "vitest";

import { formatCloseDate, formatMarketStatus } from "@/lib/markets/format";

describe("formatMarketStatus", () => {
  it("formats known statuses", () => {
    expect(formatMarketStatus("open")).toBe("Open");
    expect(formatMarketStatus("closed")).toBe("Closed");
    expect(formatMarketStatus("resolved")).toBe("Resolved");
  });
});

describe("formatCloseDate", () => {
  it("formats close dates for display", () => {
    const formatted = formatCloseDate("2026-12-31T18:30:00.000Z");
    expect(formatted.length).toBeGreaterThan(0);
    expect(formatted).toMatch(/2026/);
  });
});
