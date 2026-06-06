"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthField } from "@/components/marketlab/auth-field";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  if (state.needsEmailConfirmation) {
    return (
      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Check your email</p>
        <p className="mt-2 text-muted-foreground">
          {state.message ??
            "Confirm your email address, then sign in to browse markets with fake money."}
        </p>
        <Button asChild variant="outline" className="mt-4 w-full">
          <Link href="/auth/sign-in">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          id="sign-up-first-name"
          label="First name"
          name="first_name"
          autoComplete="given-name"
        />
        <AuthField
          id="sign-up-last-name"
          label="Last name"
          name="last_name"
          autoComplete="family-name"
        />
      </div>
      <AuthField
        id="sign-up-email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <AuthField
        id="sign-up-password"
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
      />

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-medium text-foreground">
          Sign in
        </Link>
      </p>
    </form>
  );
}
