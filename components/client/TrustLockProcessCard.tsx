// components/client/TrustLockProcessCard.tsx
'use client';

import React from 'react';
import { Shield, Lock, Code, Check, AlertCircle } from 'lucide-react';
import ProcessStep from '../ui/ProcessStep';

const TrustLockProcessCard: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Shield className="text-blue-400 mr-2" size={20} />
          How TrustLock Works
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="relative">
          <div className="absolute left-4 w-0.5 h-full bg-gray-700"></div>
          
          <ProcessStep 
            number={1}
            title="Job Posting & Escrow Funding"
            description="You stake BTC (30-day timelock) into TrustLock's smart contract. Freelancer accepts & stakes 50% of your amount."
            icon={<Lock size={20} />}
          />
          
          <ProcessStep 
            number={2}
            title="Code Submission & AI Verification"
            description="Freelancer uploads code to TrustLock. Claude AI verifies against your requirements.txt using real-time analysis."
            icon={<Code size={20} />}
          />
          
          <ProcessStep 
            number={3}
            title="Automatic Payment Release"
            description="If AI score ≥ 80%, contract auto-releases BTC. Freelancer can receive in BTC or auto-swap to NEAR."
            icon={<Check size={20} />}
          />
          
          <ProcessStep 
            number={4}
            title="Dispute Resolution (No DAOs)"
            description="Missed deadline? 30% of freelancer's stake is slashed. Low quality code (<60%)? Full refund to you."
            icon={<AlertCircle size={20} />}
            isLast
          />
        </div>
      </div>
    </div>
  );
};

export default TrustLockProcessCard;
