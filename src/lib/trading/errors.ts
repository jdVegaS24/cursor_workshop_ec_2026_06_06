const ERROR_MESSAGES: Record<string, string> = {
  not_authenticated: "Sign in to buy fake-money shares.",
  invalid_side: "Choose Yes or No before buying.",
  invalid_amount: "Enter a valid fake dollar amount.",
  market_not_found: "This market could not be found.",
  market_not_buyable: "This market is closed or past its close date.",
  profile_not_found: "Your profile is not ready yet. Try again in a moment.",
  insufficient_balance: "You do not have enough fake money for this buy.",
};

export function mapBuyErrorMessage(error: string | undefined): string {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  for (const [code, message] of Object.entries(ERROR_MESSAGES)) {
    if (error.includes(code)) {
      return message;
    }
  }

  return error;
}
