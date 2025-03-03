'use client';

import React from 'react';
import { useTrustLock } from '../../context/TrustLockContext';
import JobOfferCard from './JobOfferCard';
import CodeSubmissionCard from './CodeSubmissionCard';
import AIFeedbackWidget from './AIFeedbackWidget';
import PaymentPreferenceWidget from './PaymentPreferenceWidget';
import CommitmentCard from './CommitmentCard';
import ActiveEscrowsCard from '../shared/ActiveEscrowsCard';

const FreelancerDashboard: React.FC = () => {
  const { state } = useTrustLock();
  const { freelancerJobs } = state;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <JobOfferCard />
        <CodeSubmissionCard />
        <ActiveEscrowsCard jobs={freelancerJobs} userType="freelancer" />
      </div>
      <div className="space-y-6">
        <AIFeedbackWidget />
        <PaymentPreferenceWidget />
        <CommitmentCard />
      </div>
    </div>
  );
};

export default FreelancerDashboard;