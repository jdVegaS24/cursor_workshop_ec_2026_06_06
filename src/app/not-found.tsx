import Link from "next/link";

import { PageShell } from "@/components/marketlab/page-shell";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell mainClassName="max-w-lg">
      <SurfaceCard className="p-8 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-foreground">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          This workshop route does not exist. Head back to the fake-money
          markets list.
        </p>
        <Button asChild className="mt-6">
          <Link href="/markets">Browse markets</Link>
        </Button>
      </SurfaceCard>
    </PageShell>
  );
}
