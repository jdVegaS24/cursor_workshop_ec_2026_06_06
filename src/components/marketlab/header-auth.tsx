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
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
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
        <span className="hidden text-xs text-muted-foreground sm:inline sm:text-sm">
          Profile loading...
        </span>
      ) : null}

      {view === "signed-in" && auth.profile ? (
        <div
          className="hidden rounded-xl border border-brand/25 bg-brand/8 px-3 py-1.5 text-sm sm:block"
          title={formatFakeBalance(auth.profile.balance_cents).secondary}
        >
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Fake balance
          </p>
          <p className="font-semibold text-brand-foreground">
            {formatFakeBalance(auth.profile.balance_cents).primary}
          </p>
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
