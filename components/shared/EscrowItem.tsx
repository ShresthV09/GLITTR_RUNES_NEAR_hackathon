'use client';

import React from 'react';
import { Clock, Check } from 'lucide-react';
import { EscrowItemProps } from '../../types/ui';
import { getStatusColorClass } from '../../utils/formatters';
import { useTrustLock } from '../../context/TrustLockContext';

const EscrowItem: React.FC<EscrowItemProps> = ({ 
  jobId, 
  title, 
  amount, 
  freelancer, 
  client, 
  daysLeft, 
  status, 
  aiScore, 
  userType = 'client' 
}) => {
  const { dispatch } = useTrustLock();
  
  const handleReleaseClick = () => {
    if (userType === 'client' && (status === 'AI Verified' || status === 'Submitted')) {
      dispatch({ type: 'RELEASE_FUNDS', payload: jobId });
    }
  };
  
  return (
    <div className="p-4 hover:bg-gray-700/30 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
            <span className="text-sm font-medium">{amount} BTC</span>
          </div>
          <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusColorClass(status)} text-white font-medium`}>
            {status}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <div>{userType === 'client' ? `Freelancer: ${freelancer}` : `Client: ${client}`}</div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {daysLeft} days left
        </div>
      </div>
      {(status === 'Submitted' || status === 'AI Verified') && (
        <div className="mt-2 flex items-center">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${aiScore && aiScore >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
              style={{ width: `${aiScore || 0}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium">{aiScore || 0}%</span>
        </div>
      )}
      {userType === 'client' && (status === 'AI Verified' || (status === 'Submitted' && aiScore !== null && aiScore >= 80)) && (
        <div className="mt-2">
          <button 
            onClick={handleReleaseClick}
            className="w-full py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Check size={14} className="mr-1.5" />
            Release Funds
          </button>
        </div>
      )}
    </div>
  );
};

export default EscrowItem;