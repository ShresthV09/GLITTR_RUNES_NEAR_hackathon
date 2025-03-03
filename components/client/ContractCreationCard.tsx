// components/client/ContractCreationCard.tsx
'use client';

import React, { useState } from 'react';
import { Code, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';
import { mockSDKCalls } from '../../lib/glittr-sdk';

const ContractCreationCard: React.FC = () => {
  const { dispatch } = useTrustLock();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createContract = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Call the mock SDK function (in production, this would use the real SDK)
      const newContract = await mockSDKCalls.createContract();
      
      // Update global state with the new contract
      dispatch({
        type: 'CREATE_CONTRACT',
        payload: {
          ...newContract,
          status: newContract.status as "active" | "completed" | "disputed"
        }
      });
      
      setSuccess(`Contract created successfully at ${newContract.address}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Code className="text-blue-400 mr-2" size={20} />
          Create Contract
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 text-red-200 flex items-start">
            <AlertCircle className="shrink-0 mr-2 mt-0.5" size={16} />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-900/50 border border-green-700 rounded-lg p-3 text-green-200 flex items-start">
            <Check className="shrink-0 mr-2 mt-0.5" size={16} />
            <p>{success}</p>
          </div>
        )}
        <button
          onClick={createContract}
          disabled={loading}
          className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin mr-2" size={16} />
              <span>Creating Contract...</span>
            </>
          ) : (
            <>
              <Code size={16} className="mr-2" />
              <span>Create Contract</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContractCreationCard;
