"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { AuthFormState } from "@/lib/auth/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function missingConfigState(): AuthFormState {
  return { error: "Supabase is not configured for this environment." };
}

function readField(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return missingConfigState();
  }

  const email = readField(formData, "email");
  const password = readField(formData, "password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/markets");
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return missingConfigState();
  }

  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const firstName = readField(formData, "first_name");
  const lastName = readField(formData, "last_name");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/markets");
  }

  return {
    needsEmailConfirmation: true,
    message: "Check your email to confirm your account before signing in.",
  };
}

export async function signOutAction(): Promise<void> {
  if (!isSupabaseConfigured) {
    redirect("/markets");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/markets");
}
