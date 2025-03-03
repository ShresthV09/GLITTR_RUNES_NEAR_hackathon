'use client';

import React from 'react';
import ClientDashboard from '../client/ClientDashboard';
import FreelancerDashboard from '../freelancer/FreelancerDashboard';
import Navbar from '../dashboard/Navbar';
import { useTrustLock } from '@/context/TrustLockContext';
import ViewToggle from '../ui/ViewToggle';


const TrustLockPlatform: React.FC = () => {
  const { state, dispatch } = useTrustLock();
  
  // Handle view toggle
  const handleViewToggle = (view: 'client' | 'freelancer') => {
    dispatch({ type: 'SWITCH_VIEW', payload: view });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Page Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">
              AI-Powered Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Escrow</span>
            </h1>
            <ViewToggle activeView={state.userType} setActiveView={handleViewToggle} />
          </div>
          <p className="text-gray-400 mt-2">
            Trustless escrow with AI verification and instant swap payments
          </p>
        </div>
        
        {state.userType === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
      </main>
    </div>
  );
};

export default TrustLockPlatform;