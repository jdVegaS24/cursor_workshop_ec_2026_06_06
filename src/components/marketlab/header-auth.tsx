import Link from "next/link";

import { ThemeToggle } from "@/components/marketlab/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/auth/actions";
import { formatFakeBalance } from "@/lib/auth/format-balance";
import { getHeaderAuthView } from "@/lib/auth/header-view";
import type { AuthState } from "@/lib/auth/types";

type HeaderAuthProps = {
  auth: AuthState;
};

export function HeaderAuth({ auth }: HeaderAuthProps) {
  const view = getHeaderAuthView(auth);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {view === "signed-out" ? (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/sign-up">Sign up</Link>
          </Button>
        </>
      ) : null}

      {view === "signed-in-missing-profile" ? (
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Profile loading...
        </span>
      ) : null}

      {view === "signed-in" && auth.profile ? (
        <div
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm"
          title={formatFakeBalance(auth.profile.balance_cents).secondary}
        >
          <span className="font-medium">
            {formatFakeBalance(auth.profile.balance_cents).primary}
          </span>
        </div>
      ) : null}

      {view !== "signed-out" ? (
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      ) : null}

      <ThemeToggle />
    </div>
  );
}
