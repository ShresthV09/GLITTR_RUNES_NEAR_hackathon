'use client'

import { useState } from 'react';
import { GlittrSDK } from '@glittr-sdk/sdk/dist/client';
import { Account } from '@glittr-sdk/sdk/dist/account';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  error: string | null;
}

export default function WalletConnect() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    error: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      console.log('Initializing Glittr SDK...');
      const glittr = new GlittrSDK({
        network: 'regtest',
        apiKey: 'local-dev',
        glittrApi: 'http://localhost:3001',  // Bitcoin RPC endpoint
        electrumApi: 'http://localhost:3002' // Electrum endpoint
      });
      
      // Add RPC auth headers to all requests
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('user:password')
      };
      
      console.log('Creating wallet account...');
      // Create a new account with P2WPKH address (native segwit)
      const account = new Account({ network: 'regtest' });
      const walletAccount = account.p2wpkh();
      
      console.log('Generated address:', walletAccount.address);
      
      try {
        // Get wallet balance using RPC
        const balance = await fetch('http://localhost:3001/', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'getbalance',
            method: 'getbalance',
            params: []
          })
        }).then(res => res.json());

        console.log('Balance response:', balance);
        
        setWalletState({
          isConnected: true,
          address: walletAccount.address,
          balance: balance.result ? balance.result.toString() : '0',
          error: null,
        });
      } catch (balanceError) {
        console.error('Balance fetch error:', balanceError);
        throw new Error('Failed to fetch balance');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setWalletState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect wallet'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      error: null,
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {walletState.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {walletState.error}
        </div>
      )}

      {!walletState.isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
            <p className="mt-1 text-sm font-mono break-all">{walletState.address}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Balance</h3>
            <p className="mt-1 text-lg font-semibold">
              {walletState.balance} BTC
            </p>
          </div>

          <button
            onClick={disconnectWallet}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
} 