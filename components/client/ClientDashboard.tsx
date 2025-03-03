'use client';

import React from 'react';
import { useTrustLock } from '../../context/TrustLockContext';
import JobPostingCard from './JobPostingCard';
import ContractCreationCard from './ContractCreationCard';
import TrustLockProcessCard from './TrustLockProcessCard';
import AIVerificationWidget from './AIVerificationWidget';
import DisputeCard from './DisputeCard';
import ActiveEscrowsCard from '../shared/ActiveEscrowsCard';
import SwapWidget from '../shared/SwapWidget';

const ClientDashboard: React.FC = () => {
  const { state } = useTrustLock();
  const { jobs } = state;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <JobPostingCard />
       
        <TrustLockProcessCard />
        <ActiveEscrowsCard jobs={jobs} userType="client" />
      </div>
      <div className="space-y-6">
        <AIVerificationWidget />
        <SwapWidget />
        <DisputeCard />
      </div>
    </div>
  );
};

export default ClientDashboard;
