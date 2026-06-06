import Image from "next/image";
import Link from "next/link";

import { HeaderAuth } from "@/components/marketlab/header-auth";
import { getAuthState } from "@/lib/auth/queries";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

export async function Header({ className }: HeaderProps) {
  const auth = await getAuthState();

  return (
    <header className={cn("border-b border-border bg-background", className)}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/markets" className="flex items-center gap-3">
            <Image
              src="/logo/logo-marketlab.webp"
              alt="MarketLab"
              width={677}
              height={369}
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              MarketLab
            </span>
          </Link>
          <nav aria-label="Main" className="flex items-center gap-4">
            <Link
              href="/markets"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Markets
            </Link>
            <Link
              href="/positions"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              My Positions
            </Link>
          </nav>
        </div>
        <HeaderAuth auth={auth} />
      </div>
    </header>
  );
}
