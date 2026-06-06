import type { AuthState } from "@/lib/auth/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAuthState(): Promise<AuthState> {
  if (!isSupabaseConfigured) {
    return { user: null, profile: null };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, balance_cents, first_name, last_name")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
  };
}
