import Image from "next/image";
import Link from "next/link";

import { HeaderAuth } from "@/components/marketlab/header-auth";
import { MainNav } from "@/components/marketlab/main-nav";
import { getAuthState } from "@/lib/auth/queries";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

export async function Header({ className }: HeaderProps) {
  const auth = await getAuthState();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <Link
            href="/markets"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <Image
              src="/logo/logo-marketlab.webp"
              alt="MarketLab"
              width={677}
              height={369}
              className="h-9 w-auto shrink-0 object-contain sm:h-10"
              priority
            />
            <span className="truncate text-base font-semibold tracking-tight sm:text-lg">
              MarketLab
            </span>
          </Link>
          <HeaderAuth auth={auth} />
        </div>
        <div className="border-t border-border/60 pb-3 pt-2 sm:border-t-0 sm:pb-0 sm:pt-0">
          <MainNav />
        </div>
      </div>
    </header>
  );
}
