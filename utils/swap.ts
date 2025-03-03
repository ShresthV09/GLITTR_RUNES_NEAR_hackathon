// utils/swap.ts

// Define types for exchange rates
type TokenSymbol = "BTC" | "NEAR" | "ETH" | "USD";

interface ExchangeRate {
  USD: number;
  BTC: number;
  NEAR: number;
  ETH: number;
}

type ExchangeRates = {
  [key in TokenSymbol]: Omit<ExchangeRate, key>;
};

// Mock exchange rates - in a real app, these would come from an API
const EXCHANGE_RATES: ExchangeRates = {
  BTC: {
    USD: 65000,
    NEAR: 30000,
    ETH: 22.5,
  } as Omit<ExchangeRate, "BTC">,
  NEAR: {
    USD: 2.15,
    BTC: 0.000033,
    ETH: 0.00075,
  } as Omit<ExchangeRate, "NEAR">,
  ETH: {
    USD: 2900,
    BTC: 0.044,
    NEAR: 1350,
  } as Omit<ExchangeRate, "ETH">,
  USD: {
    BTC: 0.0000153,
    NEAR: 0.465,
    ETH: 0.000345,
  } as Omit<ExchangeRate, "USD">,
};

/**
 * Calculate the swap rate between two tokens
 */
export const calculateSwapRate = (
  fromToken: TokenSymbol,
  toToken: TokenSymbol
): number => {
  if (fromToken === toToken) return 1;

  // Check if direct rate exists
  if (
    EXCHANGE_RATES[fromToken] &&
    (EXCHANGE_RATES[fromToken] as any)[toToken]
  ) {
    return (EXCHANGE_RATES[fromToken] as any)[toToken];
  }

  // Try to calculate via USD
  if (
    EXCHANGE_RATES[fromToken] &&
    (EXCHANGE_RATES[fromToken] as any).USD &&
    EXCHANGE_RATES.USD &&
    (EXCHANGE_RATES.USD as any)[toToken]
  ) {
    return (
      (EXCHANGE_RATES[fromToken] as any).USD *
      (EXCHANGE_RATES.USD as any)[toToken]
    );
  }

  throw new Error(`Cannot calculate swap rate from ${fromToken} to ${toToken}`);
};

/**
 * Calculate the estimated amount after swap
 */
export const calculateSwapAmount = (
  fromToken: TokenSymbol,
  toToken: TokenSymbol,
  amount: number
): number => {
  const rate = calculateSwapRate(fromToken, toToken);
  return amount * rate;
};

/**
 * Calculate the swap fee (0.5% in this example)
 */
export const calculateSwapFee = (amount: number): number => {
  return amount * 0.005;
};

/**
 * Calculate the final amount after swap (including fee)
 */
export const calculateFinalSwapAmount = (
  fromToken: TokenSymbol,
  toToken: TokenSymbol,
  amount: number
): number => {
  const swapAmount = calculateSwapAmount(fromToken, toToken, amount);
  const fee = calculateSwapFee(swapAmount);
  return swapAmount - fee;
};

/**
 * Get the USD value of a token amount
 */
export const getUSDValue = (token: TokenSymbol, amount: number): number => {
  if (token === "USD") return amount;

  if (EXCHANGE_RATES[token] && (EXCHANGE_RATES[token] as any).USD) {
    return amount * (EXCHANGE_RATES[token] as any).USD;
  }

  throw new Error(`Cannot calculate USD value for ${token}`);
};

/**
 * Calculate BTC to NEAR conversion
 */
export const calculateBTCToNEAR = (amount: number, rate: number): number => {
  return amount * rate;
};

/**
 * Calculate NEAR to BTC conversion
 */
export const calculateNEARToBTC = (amount: number, rate: number): number => {
  return amount * rate;
};
