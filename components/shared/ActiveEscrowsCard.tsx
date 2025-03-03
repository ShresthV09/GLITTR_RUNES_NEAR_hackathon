// components/shared/ActiveEscrowsCard.tsx
'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import EscrowItem from './EscrowItem';
import { Job } from '../../types/escrow';

interface ActiveEscrowsCardProps {
  jobs: Job[];
  userType?: 'client' | 'freelancer';
}

const ActiveEscrowsCard: React.FC<ActiveEscrowsCardProps> = ({ jobs, userType = 'client' }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Lock className="text-blue-400 mr-2" size={20} />
        Active Escrows
      </h2>
    </div>
    <div className="divide-y divide-gray-700">
      {jobs.length > 0 ? (
        jobs.map(job => (
          <EscrowItem 
            key={job.id}
            jobId={job.id}
            title={job.title}
            amount={job.amount}
            freelancer={job.freelancer}
            client={job.client}
            daysLeft={job.daysLeft}
            status={job.status}
            aiScore={job.aiScore}
            userType={userType}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-400">
          No active escrows found.
        </div>
      )}
    </div>
  </div>
);

export default ActiveEscrowsCard;