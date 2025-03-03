export interface Wallet {
  btcBalance: number;
  nearBalance: number;
  stakes: {
    total: number;
    atRisk: number;
    completed: number;
  };
}

export interface SwapRates {
  btcToNear: number;
  nearToBtc: number;
}

export interface PaymentPreferences {
  paymentMethod: "auto-swap" | "btc" | "split";
  autoHedging: boolean;
}

export interface TokenBalance {
  symbol: string;
  amount: number;
  usdValue?: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "stake" | "release" | "swap";
  amount: number;
  currency: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
  txHash?: string;
  description?: string;
}

export interface WalletSettings {
  autoSwap: boolean;
  preferredCurrency: string;
  notificationsEnabled: boolean;
}
