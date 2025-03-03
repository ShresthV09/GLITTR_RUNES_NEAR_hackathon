export interface Job {
  id: string;
  title: string;
  amount: number;
  client: string;
  freelancer: string;
  daysLeft: number;
  status:
    | "In Progress"
    | "Submitted"
    | "AI Verified"
    | "Disputed"
    | "Completed";
  aiScore: number | null;
  requirements: string;
  deadline: number;
  description: string;
  files: string[];
  notes?: string;
}

export interface JobOffer {
  id: string;
  title: string;
  amount: number;
  client: string;
  duration: number;
  required: number;
  skills: string[];
  description: string;
}

export interface Contract {
  id: string;
  address: string;
  createdAt: string;
  status: "active" | "completed" | "disputed";
}

export interface Wallet {
  btcBalance: number;
  nearBalance: number;
  stakes: {
    total: number;
    atRisk: number;
    locked: number;
  };
}

export interface SwapRates {
  btcToNear: number;
  nearToBtc: number;
}

export interface PaymentPreferences {
  paymentMethod: "direct" | "auto-swap";
  autoHedging: boolean;
}
