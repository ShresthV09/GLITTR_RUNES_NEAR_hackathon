import { Job } from "./escrow";

export interface NavLinkProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface ViewToggleProps {
  activeView: "client" | "freelancer";
  setActiveView: (view: "client" | "freelancer") => void;
}

export interface BalanceChipProps {
  type: string;
  amount: string | number;
}

export interface EscrowItemProps {
  jobId: string;
  title: string;
  amount: number;
  freelancer?: string;
  client?: string;
  daysLeft: number;
  status: Job["status"];
  aiScore: number | null;
  userType?: "client" | "freelancer";
}

export interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export interface JobOfferItemProps {
  id: string;
  title: string;
  amount: number;
  client: string;
  duration: number;
  required: number;
  skills: string[];
  onAccept: () => void;
}
