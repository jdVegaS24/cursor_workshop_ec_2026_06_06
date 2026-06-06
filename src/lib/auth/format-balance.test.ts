import { describe, expect, it } from "vitest";

import { formatFakeBalance } from "@/lib/auth/format-balance";

describe("formatFakeBalance", () => {
  it("formats cents as fake dollars and cents label", () => {
    expect(formatFakeBalance(1000)).toEqual({
      primary: "$10.00 fake",
      secondary: "1,000 fake cents",
    });
  });

  it("formats the workshop starting balance", () => {
    expect(formatFakeBalance(10000).primary).toBe("$100.00 fake");
  });
});
