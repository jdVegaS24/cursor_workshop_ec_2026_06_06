import { describe, expect, it } from "vitest";

import { getHeaderAuthView } from "@/lib/auth/header-view";

describe("getHeaderAuthView", () => {
  it("returns signed-out when there is no user", () => {
    expect(getHeaderAuthView({ user: null, profile: null })).toBe("signed-out");
  });

  it("returns signed-in when user and profile exist", () => {
    expect(
      getHeaderAuthView({
        user: { id: "user-1", email: "demo@example.com" },
        profile: {
          id: "user-1",
          balance_cents: 10000,
          first_name: "Ada",
          last_name: "Lovelace",
        },
      }),
    ).toBe("signed-in");
  });

  it("returns signed-in-missing-profile when profile is unavailable", () => {
    expect(
      getHeaderAuthView({
        user: { id: "user-1", email: "demo@example.com" },
        profile: null,
      }),
    ).toBe("signed-in-missing-profile");
  });
});
