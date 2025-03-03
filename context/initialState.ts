
import {
  Job,
  JobOffer,
  Contract,
  Wallet,
  SwapRates,
  PaymentPreferences,
} from "../types/escrow";

export interface TrustLockState {
  jobs: Job[];
  freelancerJobs: Job[];
  jobOffers: JobOffer[];
  wallet: Wallet;
  swapRates: SwapRates;
  paymentPreferences: PaymentPreferences;
  userType: "client" | "freelancer";
  uploadedFiles: string[];
  contracts: Contract[];
}

export const initialState: TrustLockState = {
  jobs: [
    {
      id: "job-1",
      title: "Marketplace API Integration",
      amount: 0.1,
      client: "you.near",
      freelancer: "alex.near",
      daysLeft: 18,
      status: "In Progress",
      aiScore: null,
      requirements:
        "Build a REST API for marketplace integration with NEAR Protocol.",
      deadline: 30,
      description:
        "The API should handle product listings, purchases, and inventory management.",
      files: [],
    },
    {
      id: "job-2",
      title: "Smart Contract Audit",
      amount: 0.05,
      client: "you.near",
      freelancer: "smartdev.near",
      daysLeft: 7,
      status: "Submitted",
      aiScore: 78,
      requirements:
        "Audit our NEAR smart contract for security vulnerabilities.",
      deadline: 20,
      description:
        "Focus on reentrancy attacks, overflow bugs, and access control issues.",
      files: ["contract.js", "audit_report.md"],
    },
    {
      id: "job-3",
      title: "Web3 Login Component",
      amount: 0.03,
      client: "you.near",
      freelancer: "frontend.near",
      daysLeft: 2,
      status: "AI Verified",
      aiScore: 92,
      requirements:
        "Create a React component for Web3 login with NEAR wallet support.",
      deadline: 15,
      description:
        "Component should support wallet connection, signing, and session management.",
      files: ["login_component.jsx", "wallet.js", "styles.css"],
    },
  ],
  freelancerJobs: [
    {
      id: "job-4",
      title: "NFT Marketplace Backend",
      amount: 0.12,
      client: "cryptocorp.near",
      freelancer: "you.near",
      daysLeft: 21,
      status: "In Progress",
      aiScore: null,
      requirements: "Build backend services for NFT marketplace on NEAR.",
      deadline: 30,
      description:
        "Include minting, trading, and royalty distribution functionality.",
      files: [],
    },
    {
      id: "job-5",
      title: "DeFi Dashboard Widgets",
      amount: 0.04,
      client: "defiproject.near",
      freelancer: "you.near",
      daysLeft: 5,
      status: "Submitted",
      aiScore: 81,
      requirements: "Create React widgets for DeFi analytics dashboard.",
      deadline: 14,
      description:
        "Display TVL, APY, and user position data from NEAR DeFi protocols.",
      files: ["widgets.jsx", "chart_utils.js"],
    },
  ],
  jobOffers: [
    {
      id: "offer-1",
      title: "Cross-Chain Bridge Integration",
      amount: 0.15,
      client: "chainlink.near",
      duration: 30,
      required: 0.075,
      skills: ["Rust", "NEAR SDK", "Cross-chain"],
      description: "Integrate a cross-chain bridge between NEAR and Ethereum.",
    },
    {
      id: "offer-2",
      title: "NFT Marketplace Backend",
      amount: 0.08,
      client: "nftcreator.near",
      duration: 21,
      required: 0.04,
      skills: ["Node.js", "Smart Contracts", "Storage"],
      description: "Build backend services for an NFT marketplace on NEAR.",
    },
    {
      id: "offer-3",
      title: "DeFi Analytics Dashboard",
      amount: 0.06,
      client: "defiprotocol.near",
      duration: 14,
      required: 0.03,
      skills: ["React", "Data Visualization", "Web3"],
      description: "Create a dashboard for DeFi analytics on NEAR protocol.",
    },
  ],
  wallet: {
    btcBalance: 0.42,
    nearBalance: 128.5,
    stakes: {
      total: 0.16,
      atRisk: 0.12,
      locked: 0.04,
    },
  },
  swapRates: {
    btcToNear: 30000,
    nearToBtc: 0.000033,
  },
  paymentPreferences: {
    paymentMethod: "auto-swap",
    autoHedging: true,
  },
  userType: "client",
  uploadedFiles: [],
  contracts: [],
};
