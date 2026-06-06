import Link from "next/link";
import { redirect } from "next/navigation";

import { Header } from "@/components/marketlab/header";
import { SignUpForm } from "@/components/marketlab/sign-up-form";
import { getAuthState } from "@/lib/auth/queries";

export default async function SignUpPage() {
  const auth = await getAuthState();
  if (auth.user) {
    redirect("/markets");
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
          <p className="text-sm text-muted-foreground">
            Create a workshop account with fake starting balance.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <SignUpForm />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/markets" className="font-medium text-foreground">
            Back to markets
          </Link>
        </p>
      </main>
    </div>
  );
}
