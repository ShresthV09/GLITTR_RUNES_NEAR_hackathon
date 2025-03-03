// components/client/JobPostingCard.tsx
'use client';

import React, { useState } from 'react';
import { useTrustLock } from '../../context/TrustLockContext';

const JobPostingCard: React.FC = () => {
  const { dispatch } = useTrustLock();
  const [formData, setFormData] = useState({
    title: '',
    requirements: '',
    amount: '',
    deadline: '',
    useNear: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.requirements || !formData.amount || !formData.deadline) {
      alert('Please fill all required fields');
      return;
    }
    
    // Create new job
    dispatch({
      type: 'CREATE_JOB',
      payload: {
        title: formData.title,
        requirements: formData.requirements,
        amount: parseFloat(formData.amount),
        daysLeft: parseInt(formData.deadline),
        deadline: parseInt(formData.deadline),
        description: formData.requirements,
        freelancer: 'pending.near'
      }
    });
    
    // Reset form
    setFormData({
      title: '',
      requirements: '',
      amount: '',
      deadline: '',
      useNear: false
    });
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Post a New Job</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Smart Contract Development" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Requirements</label>
          <textarea 
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-20"
            placeholder="Detailed requirements for AI verification..." 
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Escrow Amount (BTC)</label>
            <input 
              type="text" 
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.1" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Deadline (Days)</label>
            <input 
              type="number" 
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="30" 
            />
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="use-near" 
                name="useNear"
                checked={formData.useNear}
                onChange={handleInputChange}
                className="mr-2" 
              />
              <label htmlFor="use-near" className="text-sm">Fund with NEAR instead of BTC</label>
            </div>
            <div className="text-xs text-gray-500">Auto-swap will be applied</div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors"
          >
            Create & Fund Escrow
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingCard;