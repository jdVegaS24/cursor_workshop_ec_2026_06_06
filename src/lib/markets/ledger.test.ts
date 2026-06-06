import { describe, expect, it } from "vitest";

import { applyLedgerEntry, parseLedgerSide } from "@/lib/markets/ledger";

describe("parseLedgerSide", () => {
  it("detects yes entries", () => {
    expect(parseLedgerSide("buy_yes", "market trade")).toBe("yes");
  });

  it("detects no entries", () => {
    expect(parseLedgerSide("buy_no", "market trade")).toBe("no");
  });
});

describe("applyLedgerEntry", () => {
  it("updates yes totals for yes-side entries", () => {
    expect(
      applyLedgerEntry(
        { yes: 0, no: 0 },
        { amount_cents: 50, entry_type: "buy_yes", description: "" },
      ),
    ).toEqual({ yes: 50, no: 0 });
  });
});
