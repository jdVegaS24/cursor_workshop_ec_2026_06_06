export function FakeMoneyNote() {
  return (
    <p className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground">
        This workshop app does not use real money.
      </span>{" "}
      Spend fake cents to collect Yes or No shares. 1 fake cent spent = 1 share
      cent.
    </p>
  );
}
