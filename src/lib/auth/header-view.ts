import type { AuthState } from "@/lib/auth/types";

export type HeaderAuthView =
  | "signed-out"
  | "signed-in"
  | "signed-in-missing-profile";

export function getHeaderAuthView(auth: AuthState): HeaderAuthView {
  if (!auth.user) {
    return "signed-out";
  }

  if (!auth.profile) {
    return "signed-in-missing-profile";
  }

  return "signed-in";
}
