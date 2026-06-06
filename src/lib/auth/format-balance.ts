import { formatFakeDollarsFromCents } from "@/lib/fake-money";

export function formatFakeBalance(balanceCents: number): {
  primary: string;
  secondary: string;
} {
  return {
    primary: formatFakeDollarsFromCents(balanceCents),
    secondary: `${balanceCents.toLocaleString("en-US")} fake cents`,
  };
}
