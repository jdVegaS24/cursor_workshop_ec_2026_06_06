export type UserPosition = {
  yes_shares_cents: number;
  no_shares_cents: number;
};

export type PositionMarket = {
  id: string;
  title: string;
  status: string;
  close_date: string;
};

export type PositionWithMarket = {
  id: string;
  market_id: string;
  yes_shares_cents: number;
  no_shares_cents: number;
  updated_at: string;
  markets: PositionMarket | null;
};
