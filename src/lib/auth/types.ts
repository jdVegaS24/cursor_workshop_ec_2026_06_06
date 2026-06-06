import type { Tables } from "@/lib/supabase/database.types";

export type Profile = Pick<
  Tables<"profiles">,
  "id" | "balance_cents" | "first_name" | "last_name"
>;

export type AuthUser = {
  id: string;
  email?: string;
};

export type AuthState = {
  user: AuthUser | null;
  profile: Profile | null;
};

export type AuthFormState = {
  error?: string;
  needsEmailConfirmation?: boolean;
  message?: string;
};
