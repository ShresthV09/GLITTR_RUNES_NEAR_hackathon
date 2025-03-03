// components/ui/BalanceChip.tsx
import React from 'react';
import { BalanceChipProps } from '../../types/ui';

const BalanceChip: React.FC<BalanceChipProps> = ({ type, amount }) => {
  const getColorClass = () => {
    switch(type) {
      case 'btc': return 'bg-yellow-400';
      case 'near': return 'bg-green-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${getColorClass()} mr-1`}></div>
      <span className="text-sm font-medium">{amount}</span>
    </div>
  );
};

export default BalanceChip;