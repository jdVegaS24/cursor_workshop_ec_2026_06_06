export function FakeMoneyChips() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Fake money reminders">
      <li className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-3 py-1 text-xs font-medium text-brand-foreground">
        Fake money only
      </li>
      <li className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        1 fake cent = 1 share cent
      </li>
      <li className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        Not real investing
      </li>
    </ul>
  );
}
