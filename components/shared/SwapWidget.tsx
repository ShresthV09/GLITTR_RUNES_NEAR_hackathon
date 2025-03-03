// components/shared/SwapWidget.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';
import { calculateBTCToNEAR, calculateNEARToBTC } from '../../utils/swap';

const SwapWidget: React.FC = () => {
  const { state } = useTrustLock();
  const [swapDirection, setSwapDirection] = useState<'btcToNear' | 'nearToBtc'>('btcToNear');
  const [amount, setAmount] = useState(swapDirection === 'btcToNear' ? '0.05' : '1500');
  const [equivalent, setEquivalent] = useState('');
  
  useEffect(() => {
    calculateEquivalent();
  }, [amount, swapDirection]);
  
  const calculateEquivalent = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      setEquivalent('');
      return;
    }
    
    if (swapDirection === 'btcToNear') {
      setEquivalent(calculateBTCToNEAR(amountNum, state.swapRates.btcToNear).toFixed(2));
    } else {
      setEquivalent(calculateNEARToBTC(amountNum, state.swapRates.nearToBtc).toFixed(8));
    }
  };
  
  const handleSwapDirectionToggle = () => {
    const newDirection = swapDirection === 'btcToNear' ? 'nearToBtc' : 'btcToNear';
    setSwapDirection(newDirection);
    setAmount(newDirection === 'btcToNear' ? '0.05' : '1500');
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <ArrowUpDown className="text-blue-400 mr-2" size={20} />
          Swap-Driven Payments
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">From</span>
            <div className="text-xs text-gray-500">
              Balance: {swapDirection === 'btcToNear' 
                ? `${state.wallet.btcBalance} BTC` 
                : `${state.wallet.nearBalance} NEAR`}
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input 
              type="text" 
              className="bg-transparent w-1/2 text-xl font-medium outline-none"
              value={amount} 
              onChange={handleAmountChange}
            />
            <div className="flex items-center bg-gray-700 px-3 py-1.5 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${swapDirection === 'btcToNear' ? 'bg-yellow-400' : 'bg-green-400'} mr-1.5`}></div>
              <span>{swapDirection === 'btcToNear' ? 'BTC' : 'NEAR'}</span>
            </div>
          </div>
          
          <div className="flex justify-center my-2">
            <button 
              onClick={handleSwapDirectionToggle}
              className="bg-gray-700 p-1.5 rounded-full hover:bg-gray-600 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">To</span>
            <div className="text-xs text-gray-500">Estimated value</div>
          </div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              className="bg-transparent w-1/2 text-xl font-medium outline-none"
              value={equivalent} 
              readOnly
            />
            <div className="flex items-center bg-gray-700 px-3 py-1.5 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${swapDirection === 'btcToNear' ? 'bg-green-400' : 'bg-yellow-400'} mr-1.5`}></div>
              <span>{swapDirection === 'btcToNear' ? 'NEAR' : 'BTC'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Exchange Rate</span>
            <span>
              {swapDirection === 'btcToNear' 
                ? `1 BTC = ${state.swapRates.btcToNear} NEAR` 
                : `1 NEAR = ${state.swapRates.nearToBtc} BTC`}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Swap Fee</span>
            <span className="text-green-400">0.5% (via Runes DEX)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Time</span>
            <span>~30 seconds</span>
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors">
          Swap Now
        </button>
        
        <div className="pt-2">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Fund Escrow in NEAR
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Cash Out to BTC
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Enable Auto-Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;