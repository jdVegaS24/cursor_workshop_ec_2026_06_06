import { describe, expect, it } from "vitest";

import {
  formatFakeDollarsFromCents,
  getTotalShareCents,
  parseFakeDollarsToCents,
} from "@/lib/fake-money";

describe("parseFakeDollarsToCents", () => {
  it("accepts whole-dollar amounts", () => {
    expect(parseFakeDollarsToCents("1")).toEqual({ ok: true, cents: 100 });
  });

  it("accepts amounts with one or two decimal places", () => {
    expect(parseFakeDollarsToCents("1.5")).toEqual({ ok: true, cents: 150 });
    expect(parseFakeDollarsToCents("10.00")).toEqual({ ok: true, cents: 1000 });
  });

  it("rejects more than two decimal places", () => {
    expect(parseFakeDollarsToCents("1.999").ok).toBe(false);
  });

  it("rejects zero and invalid input", () => {
    expect(parseFakeDollarsToCents("0").ok).toBe(false);
    expect(parseFakeDollarsToCents("abc").ok).toBe(false);
  });
});

describe("formatFakeDollarsFromCents", () => {
  it("formats fake dollars", () => {
    expect(formatFakeDollarsFromCents(1000)).toBe("$10.00 fake");
  });
});

describe("getTotalShareCents", () => {
  it("adds yes and no share cents", () => {
    expect(getTotalShareCents(300, 200)).toBe(500);
  });
});
