'use client';

import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';

const PaymentPreferenceWidget: React.FC = () => {
  const { state, dispatch } = useTrustLock();
  const { paymentPreferences } = state;
  
  const [paymentMethod, setPaymentMethod] = useState<'auto-swap' | 'direct'>(
    paymentPreferences?.paymentMethod || 'auto-swap'
  );
  const [isAutoHedgingEnabled, setIsAutoHedgingEnabled] = useState<boolean>(
    paymentPreferences?.autoHedging || true
  );
  
  const handleSavePreferences = () => {
    dispatch({
      type: 'UPDATE_PAYMENT_PREFERENCES',
      payload: {
        paymentMethod,
        autoHedging: isAutoHedgingEnabled
      }
    });
    
    alert('Payment preferences saved successfully!');
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <DollarSign className="text-blue-400 mr-2" size={20} />
          Payment Preferences
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Payment Method</label>
          <div className="space-y-2">
            <div 
              className={`flex items-center p-3 bg-gray-700 rounded-lg ${
                paymentMethod === 'auto-swap' ? 'border border-blue-500' : ''
              }`}
            >
              <input 
                type="radio" 
                id="payment-auto-swap"
                name="payment-method" 
                value="auto-swap"
                checked={paymentMethod === 'auto-swap'}
                onChange={() => setPaymentMethod('auto-swap')}
                className="mr-3" 
              />
              <label htmlFor="payment-auto-swap" className="flex-1 cursor-pointer">
                <div className="font-medium">Auto-swap to NEAR</div>
                <div className="text-xs text-gray-400">Instantly convert BTC payments to NEAR</div>
              </label>
            </div>
            
            <div 
              className={`flex items-center p-3 bg-gray-700 rounded-lg ${
                paymentMethod === 'direct' ? 'border border-blue-500' : ''
              }`}
            >
              <input 
                type="radio" 
                id="payment-direct"
                name="payment-method" 
                value="direct"
                checked={paymentMethod === 'direct'}
                onChange={() => setPaymentMethod('direct')}
                className="mr-3" 
              />
              <label htmlFor="payment-direct" className="flex-1 cursor-pointer">
                <div className="font-medium">Keep as BTC</div>
                <div className="text-xs text-gray-400">Receive payments directly in Bitcoin</div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Auto-Hedging (Optional)</label>
          <div className="p-3 bg-gray-700 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium">Volatility Protection</div>
              <div className="text-xs text-gray-400">Auto-swap to stablecoins if BTC drops 5%+</div>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                id="toggle"
                checked={isAutoHedgingEnabled}
                onChange={(e) => setIsAutoHedgingEnabled(e.target.checked)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div 
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                  isAutoHedgingEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSavePreferences}
          className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PaymentPreferenceWidget;