export type MarketBuyFormView = "signed-out" | "not-buyable" | "ready";

type GetMarketBuyFormViewInput = {
  signedIn: boolean;
  buyable: boolean;
};

export function getMarketBuyFormView({
  signedIn,
  buyable,
}: GetMarketBuyFormViewInput): MarketBuyFormView {
  if (!signedIn) {
    return "signed-out";
  }

  if (!buyable) {
    return "not-buyable";
  }

  return "ready";
}
