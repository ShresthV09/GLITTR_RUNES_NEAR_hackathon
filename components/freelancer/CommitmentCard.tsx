
'use client';

import React from 'react';
import { Lock, Shield, Settings } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';

const CommitmentCard: React.FC = () => {
  const { state } = useTrustLock();
  const { stakes } = state.wallet;
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Lock className="text-blue-400 mr-2" size={20} />
          Commitment Stakes
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Total Staked</span>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                <span>{stakes.total} BTC</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Across {state.freelancerJobs.length} active projects
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Stake Allocation</h3>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${(stakes.atRisk / stakes.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(stakes.locked / stakes.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                <span>At risk ({stakes.atRisk} BTC)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span>Completed ({stakes.locked} BTC)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
            <h3 className="font-medium flex items-center text-blue-400">
              <Shield size={16} className="mr-2" />
              Stake Protection
            </h3>
            <div className="flex justify-between text-sm mt-1">
              <span>Volatility Hedge</span>
              <span>Active</span>
            </div>
            <div className="text-xs text-gray-400">Auto-converts to NEAR if BTC drops 5%+</div>
          </div>
          
          <div className="text-center pt-2">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center mx-auto">
              <Settings size={14} className="mr-1" />
              Manage Stake Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentCard;
