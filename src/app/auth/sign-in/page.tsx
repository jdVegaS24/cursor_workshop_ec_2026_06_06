import Link from "next/link";
import { redirect } from "next/navigation";

import { FakeMoneyNote } from "@/components/marketlab/fake-money-note";
import { PageShell } from "@/components/marketlab/page-shell";
import { SignInForm } from "@/components/marketlab/sign-in-form";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { getAuthState } from "@/lib/auth/queries";

export default async function SignInPage() {
  const auth = await getAuthState();
  if (auth.user) {
    redirect("/markets");
  }

  return (
    <PageShell mainClassName="max-w-md">
      <div className="mb-6 space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Access your fake-money balance and workshop account.
          </p>
        </div>
        <FakeMoneyNote />
      </div>
      <SurfaceCard className="p-6 sm:p-7">
        <SignInForm />
      </SurfaceCard>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link href="/markets" className="font-medium text-foreground">
          Back to markets
        </Link>
      </p>
    </PageShell>
  );
}
