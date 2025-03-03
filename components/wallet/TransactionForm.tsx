'use client'

import { useState } from 'react';
import { GlittrSDK } from '@glittr-sdk/sdk/dist/client';
import { txBuilder } from '@glittr-sdk/sdk/dist/transaction';

interface TransactionFormProps {
  senderAddress: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function TransactionForm({ senderAddress, onSuccess, onError }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const glittr = new GlittrSDK();
      
      // Create and send transaction
      const tx = await txBuilder.createTransaction({
        from: senderAddress,
        to: recipientAddress,
        amount: parseFloat(amount),
      });

      await glittr.sendTransaction(tx);
      
      setAmount('');
      setRecipientAddress('');
      onSuccess?.();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to send transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          id="recipient"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter recipient's BTC address"
          required
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (BTC)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="0.00"
            step="0.00000001"
            min="0"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">BTC</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !amount || !recipientAddress}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send BTC'}
      </button>
    </form>
  );
} 