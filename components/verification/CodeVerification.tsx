// components/verification/CodeVerification.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces
interface VerificationResult {
  score: number;
  issues: string[];
  strengths: string[];
  recommendations?: string[];
  security_concerns?: string[];
}

interface CodeVerificationProps {
  jobId: string;
  requirements: string;
}

export default function CodeVerification({ jobId, requirements }: CodeVerificationProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);
    
    try {
      const response = await fetch('/api/verification/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          code
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setVerificationResult(result.verification);
      } else {
        throw new Error(result.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error verifying code: ${error.message}`);
      } else {
        alert('An unexpected error occurred during verification');
      }
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium">Requirements</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto h-96">
            {requirements}
          </pre>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Your Implementation</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-2 p-4 bg-gray-100 rounded w-full h-96 font-mono"
            placeholder="Paste your code here..."
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={isVerifying || !code}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {isVerifying ? 'Verifying...' : 'Verify Code with Claude AI'}
        </button>
      </form>
      
      {verificationResult && (
        <div className="mt-6 p-4 border rounded-md">
          <h3 className="text-lg font-medium">
            Verification Score: {verificationResult.score}/100
          </h3>
          
          <div className="mt-4">
            <h4 className="font-medium">Issues:</h4>
            <ul className="list-disc pl-5 mt-2">
              {verificationResult.issues.map((issue: string, i: number) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium">Strengths:</h4>
            <ul className="list-disc pl-5 mt-2">
              {verificationResult.strengths.map((strength: string, i: number) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
          
          {verificationResult.score >= 80 ? (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              ✅ Verification passed! Funds will be released automatically.
            </div>
          ) : (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              ❌ Verification failed. Please address the issues and try again, or proceed to dispute resolution.
            </div>
          )}
        </div>
      )}
    </div>
  );
}