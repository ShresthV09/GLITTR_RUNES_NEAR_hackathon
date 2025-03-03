// utils/formatters.ts
/**
 * Format a number as BTC with 8 decimal places
 */
export const formatBTC = (amount: number): string => {
  return `${amount.toFixed(8)} BTC`;
};

/**
 * Format a number as NEAR with 2 decimal places
 */
export const formatNEAR = (amount: number): string => {
  return `${amount.toFixed(2)} NEAR`;
};

/**
 * Format a number as USD with 2 decimal places
 */
export const formatUSD = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

/**
 * Format a date as a relative time (e.g. "2 days ago")
 */
export const formatRelativeTime = (date: Date | string | number): string => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
};

/**
 * Format a date as a short date string (e.g. "Jan 1, 2023")
 */
export const formatShortDate = (date: Date | string | number): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Truncate a string to a specified length with ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Format a blockchain address for display (e.g. "0x1234...5678")
 */
export const formatAddress = (
  address: string,
  startChars = 6,
  endChars = 4
): string => {
  if (address.length <= startChars + endChars) return address;
  return `${address.substring(0, startChars)}...${address.substring(
    address.length - endChars
  )}`;
};

/**
 * Get color class based on job status
 */
export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-500";
    case "Submitted":
      return "bg-blue-500";
    case "AI Verified":
      return "bg-green-500";
    case "Disputed":
      return "bg-red-500";
    case "Completed":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

/**
 * Get color class based on AI score
 */
export const getAIScoreColorClass = (score: number | null): string => {
  if (score === null) return "bg-gray-500";
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};
