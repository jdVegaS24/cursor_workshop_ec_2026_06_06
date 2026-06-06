"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthField } from "@/components/marketlab/auth-field";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};

export function SignInForm() {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <AuthField
        id="sign-in-email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <AuthField
        id="sign-in-password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Need an account?{" "}
        <Link href="/auth/sign-up" className="font-medium text-foreground">
          Sign up
        </Link>
      </p>
    </form>
  );
}
