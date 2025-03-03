'use client';

import React from "react";
import { Check, Layers } from "lucide-react";
import { useTrustLock } from "../../context/TrustLockContext";

interface AIVerificationResult {
  score: number;
  tests: {
    total: number;
    passed: number;
  };
  vulnerabilities: number;
  coverage: number;
  codeQuality: string;
  suggestions?: string[];
}

const AIVerificationWidget: React.FC = () => {
  const { state, dispatch } = useTrustLock();
  
  
  const verifiedJob = state.jobs.find(job => 
    job.status === 'AI Verified' || (job.status === 'Submitted' && job.aiScore && job.aiScore >= 80)
  );
  
  
  const mockVerificationResult: AIVerificationResult = verifiedJob ? {
    score: verifiedJob.aiScore || 0,
    tests: {
      total: 8,
      passed: verifiedJob.aiScore && verifiedJob.aiScore >= 90 ? 8 : 7
    },
    vulnerabilities: verifiedJob.aiScore && verifiedJob.aiScore >= 90 ? 0 : 1,
    coverage: (verifiedJob.aiScore || 0) + 5,
    codeQuality: verifiedJob.aiScore && verifiedJob.aiScore >= 90 ? 'A+' : verifiedJob.aiScore && verifiedJob.aiScore >= 80 ? 'A' : 'B+'
  } : {
    score: 0,
    tests: { total: 0, passed: 0 },
    vulnerabilities: 0,
    coverage: 0,
    codeQuality: 'N/A'
  };
  
  const handleReleaseFunds = () => {
    if (verifiedJob) {
      dispatch({ type: 'RELEASE_FUNDS', payload: verifiedJob.id });
    }
  };
  
  if (!verifiedJob) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <Layers className="text-blue-400 mr-2" size={20} />
            AI Verification Status
          </h2>
        </div>
        <div className="p-4 md:p-6 text-center text-gray-400">
          <p>No verified jobs available yet.</p>
          <p className="mt-2 text-sm">Once a freelancer submits work, our AI will verify it against your requirements.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Layers className="text-blue-400 mr-2" size={20} />
          AI Verification Status
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-4">
            <div className=" fixed flex  items-center justify-center">
              <div className="text-4xl pt-12 pl-8 font-bold">{mockVerificationResult.score}%</div>
            </div>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#374151" 
                strokeWidth="10" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke={mockVerificationResult.score >= 80 ? "#10B981" : "#FBBF24"} 
                strokeWidth="10" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (mockVerificationResult.score / 100 * 251.2)}
                transform="rotate(-90 50 50)" 
              />
            </svg>
          </div>
          
          <div className="text-center mb-4">
            <div className="font-medium">{verifiedJob.title}</div>
            <div className="text-sm text-gray-400">
              {verifiedJob.status === 'AI Verified' ? 'Verification complete' : 'Verification in progress'}
            </div>
          </div>
          
          {mockVerificationResult.score >= 80 ? (
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 mb-4">
              <h3 className="font-medium flex items-center text-green-400">
                <Check size={16} className="mr-2" />
                AI Verification Passed
              </h3>
              <p className="text-sm mt-1">
                Code matches requirements with {mockVerificationResult.score}% accuracy. Funds are ready to be released.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4">
              <h3 className="font-medium flex items-center text-yellow-400">
                <Layers size={16} className="mr-2" />
                AI Verification In Progress
              </h3>
              <p className="text-sm mt-1">
                Current score: {mockVerificationResult.score}%. Minimum required: 80%.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xl font-medium text-green-400">
                {mockVerificationResult.tests.passed}/{mockVerificationResult.tests.total}
              </div>
              <div className="text-xs text-gray-400">Tests Passed</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xl font-medium">
                {mockVerificationResult.vulnerabilities}
              </div>
              <div className="text-xs text-gray-400">Vulnerabilities</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xl font-medium">{mockVerificationResult.coverage}%</div>
              <div className="text-xs text-gray-400">Code Coverage</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xl font-medium text-blue-400">
                {mockVerificationResult.codeQuality}
              </div>
              <div className="text-xs text-gray-400">Code Quality</div>
            </div>
          </div>
          
          {mockVerificationResult.score >= 80 && (
            <div className="mt-4">
              <button 
                onClick={handleReleaseFunds}
                className="w-full py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Check size={18} className="mr-2" />
                Release Funds to Freelancer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVerificationWidget;