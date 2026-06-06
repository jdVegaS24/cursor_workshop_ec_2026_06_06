export type BuySharesFormState = {
  error?: string;
  success?: boolean;
  message?: string;
};

export type BuySharesResult = {
  balance_cents: number;
  yes_shares_cents: number;
  no_shares_cents: number;
};
