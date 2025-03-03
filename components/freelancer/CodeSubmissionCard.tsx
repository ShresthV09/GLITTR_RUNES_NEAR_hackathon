// components/freelancer/CodeSubmissionCard.tsx
'use client';

import React, { useState } from 'react';
import { Code, Upload, FileText, Eye, AlertTriangle } from 'lucide-react';
import { useTrustLock } from '../../context/TrustLockContext';
import { mockSDKCalls } from '../../lib/glittr-sdk';
import { gptApiService, CodeAnalysisRequest, CodeAnalysisResponse } from '../../lib/gpt-api';
import CodeAnalysisModal from './CodeAnalysisModal';

const CodeSubmissionCard: React.FC = () => {
  const { state, dispatch } = useTrustLock();
  const [selectedJob, setSelectedJob] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would handle file uploads
    // For this example, we'll just simulate adding file names
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files).map(file => file.name);
    setFiles([...files, ...newFiles]);
  };
  
  const handleSubmit = async () => {
    if (!selectedJob) {
      alert('Please select an escrow');
      return;
    }
    
    if (files.length === 0) {
      alert('Please upload at least one file');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload files to the selected job
      dispatch({
        type: 'UPLOAD_FILES',
        payload: {
          jobId: selectedJob,
          files,
          userType: 'freelancer'
        }
      });
      
      // Call mock SDK for verification
      await mockSDKCalls.submitForVerification(selectedJob, files);
      
      // Open the analysis modal and start analyzing
      setIsAnalyzing(true);
      setIsModalOpen(true);
      
      // In a real implementation, you would read the file contents here
      // For this example, we'll just use mock data
      const mockFileContents = files.map(file => ({
        name: file,
        content: `// Mock content for ${file}`,
        language: file.endsWith('.js') ? 'javascript' : 
                  file.endsWith('.ts') ? 'typescript' : 
                  file.endsWith('.py') ? 'python' : 'text'
      }));
      
      // Get the selected job details
      const jobData = state.freelancerJobs.find(job => job.id === selectedJob);
      
      if (!jobData) {
        throw new Error('Selected job not found');
      }
      
      // Prepare the analysis request
      const analysisRequest: CodeAnalysisRequest = {
        files: mockFileContents,
        requirements: jobData.requirements,
        context: notes,
        metadata: {
          jobId: selectedJob,
          jobTitle: jobData.title
        }
      };
      
      // Call the GPT API
      const result = await gptApiService.analyzeCode(analysisRequest);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      // Update global state with AI verification result
      dispatch({
        type: 'SUBMIT_FOR_VERIFICATION',
        payload: {
          jobToVerify: selectedJob,
          notes
        }
      });
      
      // Reset form but do not close modal
      setFiles([]);
      setNotes('');
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Failed to submit code. Please try again.');
      setIsModalOpen(false);
      setIsAnalyzing(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAnalysisResult(null);
    setSelectedJob('');
  };
  
  const selectedJobData = selectedJob 
    ? state.freelancerJobs.find(job => job.id === selectedJob)
    : null;
  
  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <Code className="text-blue-400 mr-2" size={20} />
            Submit Code for AI Verification
          </h2>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Select Escrow</label>
            <select 
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">-- Select an escrow --</option>
              {state.freelancerJobs
                .filter(job => job.status === 'In Progress')
                .map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} ({job.amount} BTC)
                  </option>
                ))}
            </select>
          </div>
          
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <Upload className="mx-auto text-gray-500 mb-2" size={32} />
            <p className="text-gray-400 mb-2">
              {files.length > 0 
                ? `Selected files: ${files.join(', ')}` 
                : 'Drag code files or click to upload'}
            </p>
            <input
              type="file"
              id="code-files"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              disabled={isSubmitting}
            />
            <label 
              htmlFor="code-files"
              className={`px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors inline-block cursor-pointer ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Select Files
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Implementation Notes (Optional)</label>
            <textarea 
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-16"
              placeholder="Additional context about your implementation..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          {selectedJobData && (
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-gray-400">
                <FileText size={14} className="mr-1" />
                requirements.txt
                <a href="#" className="ml-2 text-blue-400 hover:underline flex items-center">
                  View <Eye size={12} className="ml-1" />
                </a>
              </div>
              <div className="text-yellow-400 flex items-center">
                <AlertTriangle size={14} className="mr-1" />
                AI will verify against these requirements
              </div>
            </div>
          )}
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors flex items-center justify-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Code size={18} className="mr-2" />
                Submit for AI Verification
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Analysis Modal */}
      <CodeAnalysisModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        analysisResult={analysisResult}
        jobId={selectedJob}
        jobTitle={selectedJobData?.title || 'Code Analysis'}
        isLoading={isAnalyzing}
      />
    </>
  );
};

export default CodeSubmissionCard;