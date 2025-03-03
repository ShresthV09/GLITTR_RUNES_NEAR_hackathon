// components/freelancer/AIFeedbackWidget.tsx
'use client';

import React from 'react';
import { BarChart2, AlertCircle } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';

// Interface for AI feedback result that would come from GPT API
interface AIFeedbackResult {
  score: number;
  issues: {
    critical: number;
    important: number;
    minor: number;
  };
  suggestions: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const AIFeedbackWidget: React.FC = () => {
  const { state } = useTrustLock();
  
  // Find a submitted job that needs improvement
  const submittedJob = state.freelancerJobs.find(job => 
    job.status === 'Submitted' && job.aiScore !== null && job.aiScore < 80 && job.aiScore >= 60
  );
  
  // Mock AI feedback result - in a real app, this would come from GPT API
  const mockFeedbackResult: AIFeedbackResult = submittedJob ? {
    score: submittedJob.aiScore || 0,
    issues: {
      critical: 0,
      important: 2,
      minor: 3
    },
    suggestions: [
      {
        title: "Missing Error Handling",
        description: "Add try/catch blocks around API calls in the price feed component.",
        priority: "high"
      },
      {
        title: "Performance Issue",
        description: "Chart rendering needs optimization for large datasets.",
        priority: "medium"
      }
    ]
  } : {
    score: 0,
    issues: { critical: 0, important: 0, minor: 0 },
    suggestions: []
  };
  
  if (!submittedJob) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <BarChart2 className="text-blue-400 mr-2" size={20} />
            AI Feedback
          </h2>
        </div>
        <div className="p-4 md:p-6 text-center text-gray-400">
          <p>No submitted jobs requiring feedback at the moment.</p>
          <p className="mt-2 text-sm">When you submit code that needs improvement, AI feedback will appear here.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart2 className="text-blue-400 mr-2" size={20} />
          AI Feedback
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold">{mockFeedbackResult.score}%</div>
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
                stroke="#FBBF24" 
                strokeWidth="10" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (mockFeedbackResult.score / 100 * 251.2)}
                transform="rotate(-90 50 50)" 
              />
            </svg>
          </div>
          
          <div className="text-center mb-4">
            <div className="font-medium">{submittedJob.title}</div>
            <div className="text-sm text-gray-400">Almost there!</div>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4">
            <h3 className="font-medium flex items-center text-yellow-400">
              <AlertCircle size={16} className="mr-2" />
              Almost passing (threshold: 80%)
            </h3>
            <p className="text-sm mt-1">{mockFeedbackResult.suggestions.length} issues need to be fixed before funds can be released.</p>
          </div>
          
          <div className="space-y-3 mb-4">
            {mockFeedbackResult.suggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
                <p className="text-xs text-gray-400">{suggestion.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
              View Full Report
            </button>
            <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors">
              Fix & Resubmit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeedbackWidget;