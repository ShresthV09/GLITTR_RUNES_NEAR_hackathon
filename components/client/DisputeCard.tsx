
// components/client/DisputeCard.tsx
'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, Shield } from 'lucide-react';

const DisputeCard: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <AlertTriangle className="text-yellow-400 mr-2" size={20} />
          Automated Dispute Resolution
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-3">
          <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
            <h3 className="font-medium flex items-center text-red-400">
              <AlertCircle size={16} className="mr-2" />
              Missed Deadline
            </h3>
            <p className="text-sm mt-1">Smart contract automatically slashes 30% of freelancer's stake. You receive compensation instantly.</p>
          </div>
          
          <div className="p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
            <h3 className="font-medium flex items-center text-yellow-400">
              <AlertCircle size={16} className="mr-2" />
              Low Quality Code
            </h3>
            <p className="text-sm mt-1">If AI verification score is &lt;60%, the entire stake is slashed, and you are fully refunded.</p>
          </div>
          
          <div className="p-3 bg-gray-700 rounded-lg">
            <h3 className="font-medium">No Manual Intervention</h3>
            <p className="text-sm text-gray-400 mt-1">Everything is automated via smart contracts. No need for DAO votes or manual reviews.</p>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">Current Escrow Security:</span>
            <span className="flex items-center text-green-400">
              <Shield size={14} className="mr-1" />
              All funds secured by smart contracts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeCard;